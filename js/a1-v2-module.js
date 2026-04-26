document.addEventListener('DOMContentLoaded', () => {
  const db = typeof window.db !== 'undefined' ? window.db : firebase.firestore();
  const platformAccess = window.PlatformAccess;
  const loadingDiv = document.getElementById('loading');
  const grid = document.getElementById('lessons-grid');
  const lessonTitles = [
  "Greetings and Introductions",
  "Personal Information",
  "Family and Relationships",
  "Review 1",
  "Daily Routine",
  "Time and Schedules",
  "Food and Drinks",
  "Review 2",
  "Describing People",
  "Places in Town",
  "Directions and Instructions",
  "Review 3",
  "Weather and Seasons",
  "Hobbies and Free Time",
  "Clothes and Shopping",
  "Review 4",
  "Health and Body",
  "Home and Furniture",
  "School and Work",
  "Review 5",
  "Travel and Transportation",
  "Holidays and Festivals",
  "Sports and Activities",
  "Review 6",
  "Animals and Nature",
  "Technology and Communication",
  "Culture and Nationalities",
  "Review 7",
  "Past Simple: Life Stories",
  "Comparatives and Superlatives",
  "Future: Plans and Predictions",
  "Final Review and Project"
];
  const unitLabels = [
  "Foundations",
  "Foundations",
  "Foundations",
  "Review",
  "Daily Life",
  "Daily Life",
  "Daily Life",
  "Review",
  "People",
  "Places",
  "Places",
  "Review",
  "Nature",
  "Life",
  "Life",
  "Review",
  "Health",
  "Home",
  "Work",
  "Review",
  "Travel",
  "Culture",
  "Activities",
  "Review",
  "Nature",
  "Technology",
  "Culture",
  "Review",
  "Past & Future",
  "Past & Future",
  "Past & Future",
  "Review"
];
  function buildLessonCard(title, lessonNumber, state, isProfessor) {
    const padded = String(lessonNumber).padStart(2, '0');
    const canOpen = isProfessor || state !== 'locked';
    const iconClass = state === 'completed' ? 'fa-check-circle text-green-500' : state === 'next' ? 'fa-play-circle text-blue-500' : 'fa-lock text-slate-400';
    const stateText = state === 'completed' ? 'Concluída' : state === 'next' ? 'Disponível agora' : 'Bloqueada';
    const card = document.createElement('a');
    card.href = canOpen ? `licao-${padded}.html` : '#';
    card.className = `lesson-card ${state}`;
    card.dataset.lesson = String(lessonNumber);
    card.setAttribute('aria-disabled', canOpen ? 'false' : 'true');
    card.innerHTML = `<div class="lesson-card-top"><span class="lesson-unit text-emerald-700">${unitLabels[lessonNumber - 1]}</span><i class="fas ${iconClass} text-2xl"></i></div><div><h3 class="lesson-title">${title}</h3><p class="lesson-meta mt-2">Lição ${lessonNumber}</p></div><div class="lesson-state"><i class="fas ${state === 'locked' ? 'fa-lock' : state === 'completed' ? 'fa-award' : 'fa-forward'} text-emerald-600"></i>${stateText}</div>`;
    if (!canOpen) card.addEventListener('click', (event) => event.preventDefault());
    return card;
  }
  async function resolveViewerContext() {
    const user = firebase.auth().currentUser;
    if (!user) return { role: 'aluno', studentId: null };
    const viewerDoc = await db.collection('students').doc(user.uid).get();
    const viewerData = viewerDoc.exists ? viewerDoc.data() : {};
    const role = viewerData.role || localStorage.getItem('loggedInUserRole') || 'aluno';
    if (role === 'professor' || role === 'admin') {
      const studentId = localStorage.getItem('selectedStudentId');
      if (!studentId) return { role, studentId: null };
      const studentDoc = await db.collection('students').doc(studentId).get();
      if (!studentDoc.exists) return { role, studentId: null };
      if (role === 'professor' && studentDoc.data().teacherId !== user.uid) throw new Error('Acesso negado ao aluno selecionado.');
      return { role, studentId };
    }
    if (role !== 'aluno') throw new Error('Perfil sem acesso ao módulo.');
    return { role, studentId: user.uid };
  }
  async function loadLessons() {
    try {
      const { role, studentId } = await resolveViewerContext();
      if (!studentId) throw new Error('Usuário não identificado.');
      const isProfessor = role === 'professor' || role === 'admin';
      const doc = await db.collection('students').doc(studentId).get();
      const studentData = doc.exists ? doc.data() : {};
      const progress = (studentData.progress || {})['a1-v2'] || {};
      const allowedProducts = platformAccess?.getStudentAccessibleProducts ? platformAccess.getStudentAccessibleProducts(studentData) : [...(Array.isArray(studentData.accessibleProducts) ? studentData.accessibleProducts : []), ...(Array.isArray(studentData.modules) ? studentData.modules : []), ...(studentData.studentType ? [studentData.studentType] : [])];
      if (platformAccess && !platformAccess.canAccessModule(allowedProducts, 'a1')) { loadingDiv.textContent = 'Este aluno não possui acesso ao módulo A1.'; return; }
      let firstUncompleted = lessonTitles.findIndex((_, index) => progress[`lesson_${index + 1}`] !== true) + 1;
      if (firstUncompleted === 0) firstUncompleted = lessonTitles.length + 1;
      grid.innerHTML = '';
      lessonTitles.forEach((title, index) => {
        const lessonNumber = index + 1;
        const isCompleted = progress[`lesson_${lessonNumber}`] === true;
        const state = isCompleted ? 'completed' : lessonNumber === firstUncompleted ? 'next' : 'locked';
        grid.appendChild(buildLessonCard(title, lessonNumber, state, isProfessor));
      });
      loadingDiv.classList.add('hidden');
      grid.classList.remove('hidden');
    } catch (error) {
      console.error('Erro ao carregar lições A1 V2:', error);
      loadingDiv.textContent = 'Erro ao carregar lições.';
    }
  }
  firebase.auth().onAuthStateChanged((user) => { if (user) loadLessons(); else loadingDiv.textContent = 'Faça login para ver as lições.'; });
});