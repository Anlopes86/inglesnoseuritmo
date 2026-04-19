const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

function initializeFirebaseAdmin() {
  if (admin.apps.length) {
    return;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID
    });
    return;
  }

  const candidateFiles = [
    process.env.FIREBASE_SERVICE_ACCOUNT_FILE,
    '/etc/secrets/firebase-service-account.json',
    path.join(process.cwd(), 'firebase-service-account.json')
  ].filter(Boolean);

  for (const filePath of candidateFiles) {
    if (!fs.existsSync(filePath)) continue;
    const serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID
    });
    return;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin nao configurado. Defina FIREBASE_SERVICE_ACCOUNT_JSON ou FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY.');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n')
    })
  });
}

initializeFirebaseAdmin();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const ROLES = {
  ADMIN: 'admin',
  PROFESSOR: 'professor',
  ALUNO: 'aluno'
};

const PLAN_CATALOG = {
  starter: {
    id: 'starter',
    label: 'Starter',
    studentLimit: 10,
    lessonCount: 16,
    products: ['conversation', 'starter', 'pack-16', '16', '16-aulas']
  },
  pro: {
    id: 'pro',
    label: 'Teacher Pro',
    studentLimit: 40,
    lessonCount: 32,
    products: ['conversation', 'a1', 'a2', 'prepb1', 'b1', 'business', 'vestibular', 'essentials', 'pro', 'pack-32', '32', '32-aulas']
  },
  scale: {
    id: 'scale',
    label: 'Teacher Scale',
    studentLimit: null,
    lessonCount: 48,
    products: ['conversation', 'a1', 'a2', 'prepb1', 'b1', 'business', 'vestibular', 'essentials', 'b2', 'c1', 'c2', 'scale', 'pack-48', '48', '48-aulas', 'master']
  }
};

function asText(...values) {
  return values.find((value) => typeof value === 'string' && value.trim()) || '';
}

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeName(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeUrl(value) {
  return typeof value === 'string' ? value.trim().replace(/\/+$/, '') : '';
}

function isTruthyEnv(value) {
  return ['1', 'true', 'yes', 'on'].includes(String(value || '').trim().toLowerCase());
}

function joinUrl(base, ...segments) {
  const normalizedBase = normalizeUrl(base);
  const normalizedSegments = segments
    .flatMap((segment) => String(segment || '').split('/'))
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (!normalizedBase) {
    return normalizedSegments.join('/');
  }

  if (!normalizedSegments.length) {
    return normalizedBase;
  }

  return `${normalizedBase}/${normalizedSegments.join('/')}`;
}

function getAppUrl() {
  return normalizeUrl(process.env.APP_URL || 'https://anlopes86.github.io/inglesnoseuritmo');
}

function getLoginUrl() {
  return joinUrl(getAppUrl(), 'login.html');
}

function createMailTransport() {
  const host = normalizeName(process.env.MAIL_HOST);
  const user = normalizeName(process.env.MAIL_USER);
  const pass = typeof process.env.MAIL_PASS === 'string' ? process.env.MAIL_PASS : '';

  if (!host || !user || !pass) {
    return null;
  }

  const port = parseInt(process.env.MAIL_PORT || '587', 10);
  const secure = process.env.MAIL_SECURE ? isTruthyEnv(process.env.MAIL_SECURE) : port === 465;
  const tls = isTruthyEnv(process.env.MAIL_TLS_ALLOW_INVALID_CERTS)
    ? { rejectUnauthorized: false }
    : undefined;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    ...(tls ? { tls } : {})
  });
}

function getMailFromAddress() {
  const from = normalizeName(process.env.MAIL_FROM);
  if (from) {
    return from;
  }

  const user = normalizeName(process.env.MAIL_USER);
  const displayName = normalizeName(process.env.MAIL_FROM_NAME) || 'Ingles no Seu Ritmo';
  return user ? `${displayName} <${user}>` : displayName;
}

function sanitizeErrorMessage(error) {
  return normalizeName(error?.message || error?.toString?.() || 'unknown-error').slice(0, 240);
}

function buildWelcomeEmail({ name, email, resetLink, planLabel }) {
  const safeName = normalizeName(name) || email;
  const portalUrl = getLoginUrl();
  const subject = 'Seu acesso ao Ingles no Seu Ritmo';

  return {
    subject,
    text: [
      `Ola, ${safeName}.`,
      '',
      'Sua conta foi criada e seu acesso ja esta liberado.',
      `Plano: ${planLabel || 'Pack de Conversacao'}.`,
      '',
      `Defina sua senha aqui: ${resetLink}`,
      '',
      `Portal: ${portalUrl}`,
      '',
      'Se voce nao solicitou este acesso, ignore esta mensagem.'
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
        <p>Ola, ${safeName}.</p>
        <p>Sua conta foi criada e seu acesso ja esta liberado.</p>
        <p>Plano: ${planLabel || 'Pack de Conversacao'}</p>
        <p>Defina sua senha: <a href="${resetLink}">${resetLink}</a></p>
        <p>Portal: <a href="${portalUrl}">${portalUrl}</a></p>
      </div>
    `
  };
}

async function sendWelcomeEmail({ name, email, resetLink, planLabel }) {
  const transport = createMailTransport();
  if (!transport) {
    return { status: 'skipped', reason: 'smtp-not-configured' };
  }

  const from = getMailFromAddress();
  const message = buildWelcomeEmail({ name, email, resetLink, planLabel });
  const info = await transport.sendMail({
    from,
    to: email,
    subject: message.subject,
    text: message.text,
    html: message.html
  });

  return {
    status: 'sent',
    messageId: info.messageId || null
  };
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
    payload?.subscription?.plan_id,
    payload?.checkout?.name,
    payload?.checkout?.title
  ).toLowerCase();

  if (candidate.includes('48') || candidate.includes('master')) return 'scale';
  if (candidate.includes('32') || candidate.includes('pro')) return 'pro';
  if (candidate.includes('16') || candidate.includes('starter')) return 'starter';
  if (candidate.includes('scale')) return 'scale';
  if (candidate.includes('pro')) return 'pro';
  if (candidate.includes('starter')) return 'starter';
  return process.env.DEFAULT_TEACHER_PLAN || 'starter';
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

function resolvePlan(planId) {
  return PLAN_CATALOG[planId] || PLAN_CATALOG.starter;
}

function resolveAccessPack(planId) {
  const plan = resolvePlan(planId);
  return {
    packId: plan.id,
    lessonCount: plan.lessonCount,
    label: plan.label,
    includesStudentManagement: true
  };
}

function requireWebhookSecret(req) {
  const secret = process.env.WEBHOOK_SECRET || '';
  if (!secret) {
    return { ok: false, reason: 'webhook-secret-not-configured' };
  }

  const candidate = asText(
    req.get('x-webhook-secret'),
    req.get('x-shared-secret'),
    req.query.secret,
    req.get('authorization')?.replace(/^Bearer\s+/i, '')
  );

  if (candidate !== secret) {
    return { ok: false, reason: 'invalid-webhook-secret' };
  }

  return { ok: true };
}

function buildProfilePayload({ email, name, planId, eventId, externalId }) {
  const plan = resolvePlan(planId);
  const accessPack = resolveAccessPack(planId);

  return {
    name: name || email,
    email,
    role: ROLES.PROFESSOR,
    tenantId: '',
    teacherId: '',
    onboardingStatus: 'created',
    onboardingSource: 'render-webhook',
    purchaseEventId: eventId,
    providerOrderId: externalId || null,
    platformPlan: plan.id,
    accessPackId: accessPack.packId,
    accessPackLabel: accessPack.label,
    lessonCount: accessPack.lessonCount,
    subscriptionStatus: 'active',
    billingCycle: 'monthly',
    studentLimit: plan.studentLimit,
    accessibleProducts: [...plan.products],
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
}

async function upsertTeacherProfile(payload) {
  if (!payload.email) {
    const error = new Error('E-mail do professor nao encontrado no webhook.');
    error.statusCode = 400;
    throw error;
  }

  const db = admin.firestore();
  const auth = admin.auth();

  let userRecord = null;
  try {
    userRecord = await auth.getUserByEmail(payload.email);
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      throw error;
    }
  }

  if (!userRecord) {
    userRecord = await auth.createUser({
      email: payload.email,
      displayName: payload.name || payload.email,
      emailVerified: false
    });
  } else if (payload.name && userRecord.displayName !== payload.name) {
    await auth.updateUser(userRecord.uid, { displayName: payload.name });
  }

  await auth.setCustomUserClaims(userRecord.uid, {
    role: ROLES.PROFESSOR,
    source: 'purchase-webhook'
  });

  const profileRef = db.collection('students').doc(userRecord.uid);
  const existingSnap = await profileRef.get();
  const existingProfile = existingSnap.exists ? (existingSnap.data() || {}) : {};
  const profileData = buildProfilePayload({ ...payload, eventId: payload.eventId });
  profileData.tenantId = userRecord.uid;
  profileData.teacherId = userRecord.uid;
  if (!existingSnap.exists) {
    profileData.createdAt = admin.firestore.FieldValue.serverTimestamp();
  }

  await profileRef.set(profileData, { merge: true });

  const shouldSendWelcomeEmail = !existingProfile.welcomeEmailSentAt;
  let welcomeEmailResult = {
    status: shouldSendWelcomeEmail ? 'pending' : 'skipped',
    reason: shouldSendWelcomeEmail ? null : 'already-sent'
  };

  if (shouldSendWelcomeEmail) {
    try {
      const resetLink = await auth.generatePasswordResetLink(payload.email, {
        url: getLoginUrl(),
        handleCodeInApp: false
      });

      welcomeEmailResult = await sendWelcomeEmail({
        name: payload.name || userRecord.displayName || payload.email,
        email: payload.email,
        resetLink,
        planLabel: profileData.accessPackLabel
      });

      const updateData = {
        welcomeEmailStatus: welcomeEmailResult.status,
        welcomeEmailLastAttemptAt: admin.firestore.FieldValue.serverTimestamp(),
        welcomeEmailProvider: welcomeEmailResult.status === 'sent' ? 'smtp' : null,
        onboardingStatus: welcomeEmailResult.status === 'sent' ? 'welcome-email-sent' : 'welcome-email-pending'
      };

      if (welcomeEmailResult.status === 'sent') {
        updateData.welcomeEmailSentAt = admin.firestore.FieldValue.serverTimestamp();
        updateData.welcomeEmailMessageId = welcomeEmailResult.messageId || null;
      } else if (welcomeEmailResult.status === 'skipped') {
        updateData.welcomeEmailProvider = null;
      }

      await profileRef.set(updateData, { merge: true });
    } catch (error) {
      welcomeEmailResult = {
        status: 'failed',
        reason: sanitizeErrorMessage(error)
      };

      await profileRef.set({
        welcomeEmailStatus: 'failed',
        welcomeEmailLastAttemptAt: admin.firestore.FieldValue.serverTimestamp(),
        welcomeEmailError: welcomeEmailResult.reason,
        onboardingStatus: 'welcome-email-failed'
      }, { merge: true });
    }
  }

  return {
    uid: userRecord.uid,
    email: payload.email,
    name: payload.name || userRecord.displayName || payload.email,
    role: ROLES.PROFESSOR,
    planId: profileData.platformPlan,
    welcomeEmailStatus: welcomeEmailResult.status
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
    processedTeacherEmail: teacher.email,
    welcomeEmailStatus: teacher.welcomeEmailStatus || null
  }, { merge: true });

  return {
    alreadyProcessed: false,
    teacher
  };
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
    service: 'ingles-no-seu-ritmo-render-webhook',
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
    const secret = process.env.WEBHOOK_SECRET || '';
    const providedSecret = asText(
      req.get('x-admin-secret'),
      req.get('authorization')?.replace(/^Bearer\s+/i, ''),
      req.query.secret
    );

    if (!secret || providedSecret !== secret) {
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

const port = parseInt(process.env.PORT || '10000', 10);
app.listen(port, () => {
  console.log(`Webhook server ouvindo na porta ${port}`);
});
