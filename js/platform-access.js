(function attachPlatformAccess(globalScope) {
    const ROLES = {
        ADMIN: 'admin',
        PROFESSOR: 'professor',
        ALUNO: 'aluno'
    };

    const STORAGE_KEYS = {
        ADMIN_SELECTED_TEACHER_ID: 'adminSelectedTeacherId'
    };

    const PLAN_CATALOG = {
        starter: {
            id: 'starter',
            label: 'Pack 16',
            studentLimit: 10,
            lessonCount: 16,
            products: ['conversation'],
            billingCycle: 'monthly'
        },
        pro: {
            id: 'pro',
            label: 'Pack 32',
            studentLimit: 40,
            lessonCount: 32,
            products: ['conversation', 'a1', 'a2', 'prepb1', 'b1', 'business', 'vestibular', 'essentials'],
            billingCycle: 'monthly'
        },
        scale: {
            id: 'scale',
            label: 'Pack 48',
            studentLimit: null,
            lessonCount: 48,
            products: ['conversation', 'a1', 'a2', 'prepb1', 'b1', 'business', 'vestibular', 'essentials', 'b2', 'c1', 'c2'],
            billingCycle: 'monthly'
        },
        admin: {
            id: 'admin',
            label: 'Admin',
            studentLimit: null,
            lessonCount: 48,
            products: ['*'],
            billingCycle: 'internal'
        }
    };

    function getPlanCatalogEntry(planId) {
        return PLAN_CATALOG[planId] || PLAN_CATALOG.starter;
    }

    function getEffectivePlan(userData) {
        const safeUser = userData || {};
        const fallbackPlanId = safeUser.role === ROLES.ADMIN ? 'admin' : 'starter';
        const configuredPlanId = safeUser.platformPlan || fallbackPlanId;
        const catalogPlan = getPlanCatalogEntry(configuredPlanId);
        const studentLimit = Number.isFinite(safeUser.studentLimit)
            ? safeUser.studentLimit
            : catalogPlan.studentLimit;
        const lessonCount = safeUser.platformPlan
            ? catalogPlan.lessonCount
            : (Number.isFinite(safeUser.lessonCount)
                ? safeUser.lessonCount
                : catalogPlan.lessonCount);

        return {
            id: catalogPlan.id,
            label: catalogPlan.label,
            studentLimit,
            lessonCount,
            products: Array.isArray(safeUser.accessibleProducts) && safeUser.accessibleProducts.length
                ? [...safeUser.accessibleProducts]
                : [...catalogPlan.products],
            billingCycle: safeUser.billingCycle || catalogPlan.billingCycle,
            subscriptionStatus: safeUser.subscriptionStatus || 'active',
            cancelAtPeriodEnd: safeUser.cancelAtPeriodEnd === true
        };
    }

    function getProductList(source) {
        if (Array.isArray(source)) {
            return [...source];
        }

        if (Array.isArray(source?.products) && source.products.length) {
            return [...source.products];
        }

        if (Array.isArray(source?.accessibleProducts) && source.accessibleProducts.length) {
            return [...source.accessibleProducts];
        }

        return [];
    }

    function getStudentAccessibleProducts(studentData) {
        const safeStudent = studentData || {};
        const explicitProducts = getProductList(safeStudent);
        const assignedModules = Array.isArray(safeStudent.modules) ? safeStudent.modules : [];
        const primaryModule = safeStudent.studentType ? [safeStudent.studentType] : [];

        if (assignedModules.length) {
            return [...new Set([...assignedModules, ...primaryModule])];
        }

        if (primaryModule.length) {
            return [...primaryModule];
        }

        return [...new Set(explicitProducts)];
    }

    function getManagerModuleProducts(profile) {
        if (isAdmin(profile)) {
            return ['*'];
        }

        if (isProfessor(profile)) {
            return [...PLAN_CATALOG.scale.products];
        }

        return getProductList(profile?.plan);
    }

    function canAccessModule(source, moduleId) {
        if (!moduleId) return false;
        if (moduleId === 'nivelamento') return true;

        const products = getProductList(source);
        if (!products.length) return false;
        if (products.includes('*')) return true;

        return products.includes(moduleId);
    }

    function getModuleRequirementLabel(moduleId) {
        const map = {
            nivelamento: 'Disponível para todos',
            conversation: 'Pack 16',
            a1: 'Pack 32',
            a2: 'Pack 32',
            prepb1: 'Pack 32',
            b1: 'Pack 32',
            business: 'Pack 32',
            essentials: 'Pack 32',
            vestibular: 'Pack 32',
            b2: 'Pack 48',
            c1: 'Pack 48',
            c2: 'Pack 48'
        };

        return map[moduleId] || 'Pack indisponível';
    }

    function getLessonLimit(source) {
        if (Number.isFinite(source)) {
            return source;
        }

        const planId = source?.platformPlan || source?.plan?.id;
        if (planId) {
            const plan = getPlanCatalogEntry(planId);
            if (Number.isFinite(plan.lessonCount)) {
                return plan.lessonCount;
            }
        }

        if (Number.isFinite(source?.lessonCount)) {
            return source.lessonCount;
        }

        if (Number.isFinite(source?.plan?.lessonCount)) {
            return source.plan.lessonCount;
        }

        return null;
    }

    function buildProfile(uid, userData) {
        const safeUser = userData || {};
        const role = safeUser.role || ROLES.ALUNO;
        const plan = getEffectivePlan(safeUser);
        const tenantId = role === ROLES.PROFESSOR
            ? uid
            : safeUser.teacherId || safeUser.tenantId || uid;

        return {
            uid,
            role,
            data: safeUser,
            plan,
            tenantId,
            displayName: safeUser.name || safeUser.email || 'Usuario'
        };
    }

    async function fetchProfileById(db, uid) {
        if (!uid) return null;

        const doc = await db.collection('students').doc(uid).get();
        return buildProfile(uid, doc.exists ? doc.data() : {});
    }

    async function getCurrentProfile(auth, db) {
        const currentUser = auth.currentUser;
        if (!currentUser) return null;
        return fetchProfileById(db, currentUser.uid);
    }

    function isAdmin(profileOrRole) {
        const role = typeof profileOrRole === 'string' ? profileOrRole : profileOrRole?.role;
        return role === ROLES.ADMIN;
    }

    function isProfessor(profileOrRole) {
        const role = typeof profileOrRole === 'string' ? profileOrRole : profileOrRole?.role;
        return role === ROLES.PROFESSOR;
    }

    function isManager(profileOrRole) {
        return isAdmin(profileOrRole) || isProfessor(profileOrRole);
    }

    function canManageStudent(profile, studentData) {
        if (!profile || !studentData) return false;
        if (isAdmin(profile)) return true;
        if (!isProfessor(profile)) return false;
        return studentData.teacherId === profile.uid;
    }

    function getManagedTeacherId(profile) {
        if (isAdmin(profile)) {
            return localStorage.getItem(STORAGE_KEYS.ADMIN_SELECTED_TEACHER_ID) || '';
        }

        if (isProfessor(profile)) {
            return profile.uid;
        }

        return '';
    }

    function setAdminManagedTeacherId(teacherId) {
        if (teacherId) {
            localStorage.setItem(STORAGE_KEYS.ADMIN_SELECTED_TEACHER_ID, teacherId);
            return;
        }

        localStorage.removeItem(STORAGE_KEYS.ADMIN_SELECTED_TEACHER_ID);
    }

    function buildManagedStudentsQuery(db, profile, teacherIdOverride) {
        let query = db.collection('students').where('role', '==', ROLES.ALUNO);

        if (isProfessor(profile)) {
            return query.where('teacherId', '==', profile.uid);
        }

        if (isAdmin(profile) && teacherIdOverride) {
            return query.where('teacherId', '==', teacherIdOverride);
        }

        return query;
    }

    async function countManagedStudents(db, profile, teacherIdOverride) {
        const snapshot = await buildManagedStudentsQuery(db, profile, teacherIdOverride).get();
        return snapshot.size;
    }

    async function maybeMigrateLegacyStudents(db, profile) {
        if (!isProfessor(profile)) return 0;

        const teachersSnapshot = await db.collection('students').where('role', '==', ROLES.PROFESSOR).get();
        if (teachersSnapshot.size !== 1 || teachersSnapshot.docs[0].id !== profile.uid) {
            return 0;
        }

        const studentsSnapshot = await db.collection('students').where('role', '==', ROLES.ALUNO).get();
        const orphanStudents = studentsSnapshot.docs.filter((doc) => !doc.data().teacherId);
        if (!orphanStudents.length) return 0;

        const batch = db.batch();
        orphanStudents.forEach((doc) => {
            batch.update(doc.ref, {
                teacherId: profile.uid,
                tenantId: profile.uid,
                teacherName: profile.displayName,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        await batch.commit();
        return orphanStudents.length;
    }

    async function ensureInitialAdmin(db, profile) {
        if (!profile || profile.role !== ROLES.PROFESSOR) return profile;

        const adminsSnapshot = await db.collection('students').where('role', '==', ROLES.ADMIN).get();
        if (!adminsSnapshot.empty) return profile;

        const professorsSnapshot = await db.collection('students').where('role', '==', ROLES.PROFESSOR).get();
        const isSingleProfessor = professorsSnapshot.size === 1 && professorsSnapshot.docs[0].id === profile.uid;
        if (!isSingleProfessor) return profile;

        await db.collection('students').doc(profile.uid).set({
            role: ROLES.ADMIN,
            previousRole: profile.role,
            platformPlan: 'admin',
            subscriptionStatus: 'active',
            billingCycle: 'internal',
            studentLimit: null,
            accessibleProducts: ['*'],
            promotedToAdminAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        return fetchProfileById(db, profile.uid);
    }

    async function assertStudentAccess(db, profile, studentId) {
        if (!studentId) {
            return { ok: false, reason: 'missing-student-id' };
        }

        const studentDoc = await db.collection('students').doc(studentId).get();
        if (!studentDoc.exists) {
            return { ok: false, reason: 'not-found' };
        }

        if (!canManageStudent(profile, studentDoc.data())) {
            return { ok: false, reason: 'forbidden', doc: studentDoc };
        }

        return { ok: true, doc: studentDoc };
    }

    function isStudentLimitReached(plan, currentCount) {
        const limit = plan?.studentLimit;
        if (limit === null || typeof limit === 'undefined') return false;
        return currentCount >= limit;
    }

    function formatStudentLimit(limit) {
        return limit === null ? 'ilimitado' : String(limit);
    }

    function getSubscriptionBadge(status) {
        const map = {
            active: 'Ativa',
            trial: 'Trial',
            past_due: 'Pagamento pendente',
            canceled: 'Cancelada',
            paused: 'Pausada'
        };
        return map[status] || 'Ativa';
    }

    globalScope.PlatformAccess = {
        ROLES,
        PLAN_CATALOG,
        STORAGE_KEYS,
        buildProfile,
        fetchProfileById,
        getCurrentProfile,
        getEffectivePlan,
        getProductList,
        getStudentAccessibleProducts,
        getManagerModuleProducts,
        canAccessModule,
        getModuleRequirementLabel,
        getLessonLimit,
        isAdmin,
        isProfessor,
        isManager,
        canManageStudent,
        getManagedTeacherId,
        setAdminManagedTeacherId,
        buildManagedStudentsQuery,
        countManagedStudents,
        maybeMigrateLegacyStudents,
        ensureInitialAdmin,
        assertStudentAccess,
        isStudentLimitReached,
        formatStudentLimit,
        getSubscriptionBadge
    };
})(window);
