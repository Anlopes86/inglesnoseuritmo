const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');

admin.initializeApp();

const app = express();
const webhookSecret = defineSecret('WEBHOOK_SECRET');

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const ROLES = {
  ADMIN: 'admin',
  PROFESSOR: 'professor',
  ALUNO: 'aluno'
};

const DEFAULT_PLAN_BY_PRODUCT = {
  starter: {
    planId: 'starter',
    studentLimit: 10,
    billingCycle: 'monthly',
    accessibleProducts: ['conversation']
  },
  pro: {
    planId: 'pro',
    studentLimit: 40,
    billingCycle: 'monthly',
    accessibleProducts: ['conversation', 'a1', 'a2', 'prepb1', 'b1', 'business', 'vestibular', 'essentials']
  },
  scale: {
    planId: 'scale',
    studentLimit: null,
    billingCycle: 'monthly',
    accessibleProducts: ['conversation', 'a1', 'a2', 'prepb1', 'b1', 'business', 'vestibular', 'essentials', 'b2', 'c1', 'c2']
  }
};

function getConfig() {
  return {
    webhookSecret: webhookSecret.value(),
    appUrl: process.env.APP_URL || '',
    defaultPlanId: process.env.DEFAULT_TEACHER_PLAN || 'starter',
    defaultBillingCycle: process.env.DEFAULT_BILLING_CYCLE || 'monthly',
    defaultStudentLimit: process.env.DEFAULT_STUDENT_LIMIT || '10'
  };
}

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeName(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function asText(...values) {
  return values.find((value) => typeof value === 'string' && value.trim()) || '';
}

function detectStatus(payload) {
  const raw = asText(payload?.status, payload?.order?.status, payload?.subscription?.status, payload?.event, payload?.data?.status).toLowerCase();
  if (!raw) return 'approved';
  if (['approved', 'paid', 'pago', 'completed', 'complete', 'success', 'active'].includes(raw)) return 'approved';
  return raw;
}

function detectPlanId(payload) {
  const candidate = asText(
    payload?.planId,
    payload?.productId,
    payload?.product?.id,
    payload?.product?.slug,
    payload?.product?.name,
    payload?.order?.product_id,
    payload?.order?.product_name,
    payload?.subscription?.plan_id
  ).toLowerCase();

  if (candidate.includes('scale')) return 'scale';
  if (candidate.includes('pro')) return 'pro';
  if (candidate.includes('starter')) return 'starter';
  return getConfig().defaultPlanId || 'starter';
}

function extractWebhookPayload(body) {
  const root = body?.data || body?.payload || body?.eventData || body;
  const customer = root?.customer || root?.buyer || root?.payer || root?.user || {};
  const order = root?.order || root?.transaction || root?.sale || root?.subscription || {};
  const product = root?.product || root?.plan || {};

  const email = normalizeEmail(asText(
    customer?.email,
    root?.email,
    order?.customer_email,
    order?.buyer_email,
    order?.email,
    body?.email
  ));

  const name = normalizeName(asText(
    customer?.name,
    customer?.full_name,
    root?.name,
    order?.buyer_name,
    body?.name
  ));

  const planId = detectPlanId({
    ...root,
    customer,
    order,
    product,
    status: root?.status || order?.status || body?.status
  });

  const eventId = asText(
    body?.eventId,
    body?.id,
    root?.id,
    order?.id,
    order?.transaction_id,
    order?.order_id
  ) || crypto.createHash('sha1').update(JSON.stringify(body || {})).digest('hex');

  return {
    email,
    name,
    planId,
    status: detectStatus({ ...root, order, body }),
    externalId: asText(order?.id, order?.transaction_id, order?.order_id, body?.id),
    eventId,
    raw: body || {}
  };
}

function resolveSubscriptionPayload(planId) {
  const plan = DEFAULT_PLAN_BY_PRODUCT[planId] || DEFAULT_PLAN_BY_PRODUCT.starter;

  return {
    platformPlan: plan.planId,
    subscriptionStatus: 'active',
    billingCycle: getConfig().defaultBillingCycle || plan.billingCycle,
    studentLimit: plan.studentLimit,
    accessibleProducts: [...plan.accessibleProducts],
    teacherType: 'auto'
  };
}

async function upsertTeacherProfile({ email, name, planId, eventId, externalId }) {
  if (!email) {
    const error = new Error('E-mail do professor nao encontrado no webhook.');
    error.statusCode = 400;
    throw error;
  }

  const payload = resolveSubscriptionPayload(planId);
  const db = admin.firestore();

  let userRecord = null;
  try {
    userRecord = await admin.auth().getUserByEmail(email);
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      throw error;
    }
  }

  if (!userRecord) {
    const tempPassword = crypto.randomBytes(12).toString('base64url');
    userRecord = await admin.auth().createUser({
      email,
      password: tempPassword,
      displayName: name || email,
      emailVerified: false
    });
  } else if (name && userRecord.displayName !== name) {
    await admin.auth().updateUser(userRecord.uid, { displayName: name });
  }

  await admin.auth().setCustomUserClaims(userRecord.uid, {
    role: ROLES.PROFESSOR,
    source: 'purchase-webhook'
  });

  const profileRef = db.collection('students').doc(userRecord.uid);
  const profileSnap = await profileRef.get();
  const profileData = {
    name: name || userRecord.displayName || email,
    email,
    role: ROLES.PROFESSOR,
    tenantId: userRecord.uid,
    teacherId: userRecord.uid,
    onboardingStatus: 'created',
    onboardingSource: 'kiwify-webhook',
    purchaseEventId: eventId,
    providerOrderId: externalId || null,
    platformPlan: payload.platformPlan,
    subscriptionStatus: payload.subscriptionStatus,
    billingCycle: payload.billingCycle,
    studentLimit: payload.studentLimit,
    accessibleProducts: payload.accessibleProducts,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  if (!profileSnap.exists) {
    profileData.createdAt = admin.firestore.FieldValue.serverTimestamp();
  }

  await profileRef.set(profileData, { merge: true });

  return {
    uid: userRecord.uid,
    email,
    name: name || userRecord.displayName || email,
    role: ROLES.PROFESSOR,
    planId: payload.platformPlan
  };
}

async function registerWebhookEvent(provider, payload) {
  const db = admin.firestore();
  const eventRef = db.collection('purchase_events').doc(payload.eventId);
  const eventSnap = await eventRef.get();

  if (eventSnap.exists && eventSnap.data()?.processedAt) {
    return { alreadyProcessed: true, id: payload.eventId };
  }

  await eventRef.set({
    provider,
    eventId: payload.eventId,
    externalId: payload.externalId || null,
    email: payload.email || null,
    name: payload.name || null,
    planId: payload.planId,
    status: payload.status,
    rawPayload: payload.raw,
    receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    processedAt: null
  }, { merge: true });

  const teacher = await upsertTeacherProfile(payload);

  await eventRef.set({
    processedAt: admin.firestore.FieldValue.serverTimestamp(),
    processedTeacherUid: teacher.uid,
    processedTeacherEmail: teacher.email
  }, { merge: true });

  return {
    alreadyProcessed: false,
    teacher
  };
}

function requireWebhookSecret(req) {
  const config = getConfig();
  if (!config.webhookSecret) {
    return { ok: false, reason: 'webhook-secret-not-configured' };
  }

  const candidate = asText(
    req.get('x-webhook-secret'),
    req.get('x-shared-secret'),
    req.query.secret,
    req.get('authorization')?.replace(/^Bearer\s+/i, '')
  );

  if (candidate !== config.webhookSecret) {
    return { ok: false, reason: 'invalid-webhook-secret' };
  }

  return { ok: true };
}

async function handlePurchaseWebhook(provider, req, res) {
  try {
    const secretCheck = requireWebhookSecret(req);
    if (!secretCheck.ok) {
      return res.status(401).json({ ok: false, error: secretCheck.reason });
    }

    const payload = extractWebhookPayload(req.body);
    if (!payload.email) {
      return res.status(400).json({ ok: false, error: 'missing-email' });
    }

    if (payload.status !== 'approved') {
      return res.json({
        ok: true,
        provider,
        ignored: true,
        reason: `status:${payload.status}`
      });
    }

    const result = await registerWebhookEvent(provider, payload);
    return res.json({ ok: true, provider, ...result });
  } catch (error) {
    console.error(`Webhook ${provider} falhou:`, error);
    return res.status(error.statusCode || 500).json({
      ok: false,
      error: error.message || 'internal-error'
    });
  }
}

app.get('/healthz', (_req, res) => {
  res.json({
    ok: true,
    service: 'ingles-no-seu-ritmo-functions',
    timestamp: new Date().toISOString()
  });
});

app.post('/webhooks/kiwify', (req, res) => handlePurchaseWebhook('kiwify', req, res));
app.post('/webhooks/hotmart', (req, res) => handlePurchaseWebhook('hotmart', req, res));
app.post('/webhooks/:provider', (req, res) => {
  const provider = String(req.params.provider || '').toLowerCase();
  if (!['kiwify', 'hotmart'].includes(provider)) {
    return res.status(404).json({ ok: false, error: 'unsupported-provider' });
  }

  return handlePurchaseWebhook(provider, req, res);
});

app.post('/internal/professors', async (req, res) => {
  try {
    const config = getConfig();
    const providedSecret = asText(
      req.get('x-admin-secret'),
      req.get('authorization')?.replace(/^Bearer\s+/i, ''),
      req.query.secret
    );

    if (!config.webhookSecret || providedSecret !== config.webhookSecret) {
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }

    const payload = {
      email: normalizeEmail(req.body?.email),
      name: normalizeName(req.body?.name),
      planId: detectPlanId(req.body || {}),
      status: 'approved',
      externalId: asText(req.body?.externalId, req.body?.orderId),
      eventId: asText(req.body?.eventId) || crypto.randomUUID(),
      raw: req.body || {}
    };

    const result = await registerWebhookEvent('manual', payload);
    return res.json({ ok: true, ...result });
  } catch (error) {
    console.error('Provisionamento manual falhou:', error);
    return res.status(error.statusCode || 500).json({
      ok: false,
      error: error.message || 'internal-error'
    });
  }
});

exports.api = onRequest({ secrets: [webhookSecret] }, app);
