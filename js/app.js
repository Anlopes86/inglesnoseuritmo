document.addEventListener('DOMContentLoaded', () => {
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyA4srp5nACEhOLLD8Yd4cwe5_rZ8izcm1Y",
        authDomain: "inglesnoseuritmo-bae14.firebaseapp.com",
        projectId: "inglesnoseuritmo-bae14",
        storageBucket: "inglesnoseuritmo-bae14.appspot.com",
        messagingSenderId: "112615489735",
        appId: "1:112615489735:web:9ee215ab9a2246f3a13ee2"
    };

    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    // --- Seletores do DOM ---
    const logoutBtn = document.getElementById('logout-btn');
    const studentSelect = document.getElementById('student-select');
    const noStudentSelectedDiv = document.getElementById('no-student-selected');
    const studentDashboardDiv = document.getElementById('student-dashboard');
    const studentActionButtons = document.getElementById('student-action-buttons');
    
    // Elementos do Controle de Pacote
    const classCountDisplay = document.getElementById('class-count-display');
    const addClassBtn = document.getElementById('add-class-btn');
    const removeClassBtn = document.getElementById('remove-class-btn');
    const packageProgressBar = document.getElementById('package-progress-bar');
    const packageProgressText = document.getElementById('package-progress-text');
    const packageValueDisplay = document.getElementById('package-value-display');
    const packageDateDisplay = document.getElementById('package-date-display');
    const noPackageMessage = document.getElementById('no-package-message');
    const packageDetails = document.getElementById('package-details');

    // Elementos do Modal de Novo Pacote
    const newPackageBtn = document.getElementById('new-package-btn');
    const newPackageModal = document.getElementById('new-package-modal');
    const newPackageForm = document.getElementById('new-package-form');
    const cancelPackageBtn = document.getElementById('cancel-package-btn');
    const confirmPackageBtn = document.getElementById('confirm-package-btn');
    
    // Módulos
    const modulesContainer = document.querySelector('#modules .grid');

    // --- DADOS DOS MÓDULOS (LISTA COMPLETA) ---
    const modulesData = [
        // *** CORREÇÃO APLICADA AQUI: O link agora aponta direto para a lição ***
        { id: 'nivelamento', href: 'nivelamento/licao-01.html', title: 'Teste de Nivelamento', lessons: 0, buttonText: 'Iniciar Teste', icon: 'fa-clipboard-check', color: 'blue', theme: 'from-blue-600 to-indigo-600', description: 'Descubra o ponto de partida ideal para a jornada de aprendizado do aluno.' },
        { id: 'vestibular', href: 'vestibular/vestibular.html', title: 'Dicas para Vestibular', lessons: 0, buttonText: 'Acessar Dicas', icon: 'fa-university', color: 'amber', theme: 'from-yellow-500 to-amber-500', description: 'Conteúdo focado nas principais provas e dicas para maximizar a nota.' },
        { id: 'business', href: 'business/business.html', title: 'Inglês para Negócios', lessons: 0, buttonText: 'Ver Tópicos', icon: 'fa-briefcase', color: 'cyan', theme: 'from-cyan-600 to-blue-600', description: 'Prepare-se para reuniões, apresentações e negociações com confiança.' },
        { id: 'essentials', href: 'essentials/essentials.html', title: 'English Essentials', lessons: 16, buttonText: 'Ver Aulas', icon: 'fa-key', color: 'rose', theme: 'from-rose-600 to-red-600', description: 'Um curso intensivo focado nos pilares fundamentais da língua inglesa.' },
        { id: 'conversation', href: 'conversation/conversation.html', title: 'Conversation Classes', lessons: 20, buttonText: 'Ver Aulas', icon: 'fa-comments', color: 'purple', theme: 'from-purple-600 to-pink-600', description: 'Aulas temáticas para destravar sua fala e ganhar confiança na conversação.' },
        { id: 'a1', href: 'a1/a1.html', title: 'A1 Elementary', lessons: 32, buttonText: 'Ver Aulas', icon: 'fa-star', color: 'green', theme: 'from-green-600 to-teal-600', description: 'Os primeiros passos na sua jornada no inglês. Fundamentos essenciais.' },
        { id: 'a2', href: 'a2/a2.html', title: 'A2 Pre-Intermediate', lessons: 32, buttonText: 'Ver Aulas', icon: 'fa-rocket', color: 'orange', theme: 'from-orange-600 to-yellow-600', description: 'Expandindo vocabulário e estruturas para uma comunicação mais elaborada.' },
        { id: 'b1', href: 'b1/b1.html', title: 'B1 Intermediate', lessons: 32, buttonText: 'Ver Aulas', icon: 'fa-chart-line', color: 'rose', theme: 'from-rose-600 to-red-600', description: 'Domine o essencial para se comunicar de forma independente e com mais fluidez.' },
        { id: 'b2', href: 'b2/b2.html', title: 'B2 Upper-Intermediate', lessons: 32, buttonText: 'Ver Aulas', icon: 'fa-magnifying-glass-chart', color: 'amber', theme: 'from-amber-600 to-orange-600', description: 'Desenvolva argumentação e compreensão de temas complexos e abstratos.' },
        { id: 'c1', href: 'c1/c1.html', title: 'C1 Advanced', lessons: 32, buttonText: 'Ver Aulas', icon: 'fa-trophy', color: 'sky', theme: 'from-sky-600 to-cyan-600', description: 'Comunicação eficaz para âmbitos sociais, acadêmicos e profissionais.' },
        { id: 'c2', href: 'c2/c2.html', title: 'C2 Proficiency', lessons: 32, buttonText: 'Ver Aulas', icon: 'fa-crown', color: 'slate', theme: 'from-slate-600 to-gray-600', description: 'Maestria total do idioma, com expressão próxima a de um nativo.' },
    ];


    // --- Autenticação e Carregamento Inicial ---
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('students').doc(user.uid).get().then(doc => {
                if (doc.exists && doc.data().role === 'professor') {
                    loadStudentsIntoSelect();
                } else {
                    alert("Acesso restrito a professores."); auth.signOut();
                }
            });
        } else {
            localStorage.clear(); window.location.href = 'login.html';
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                localStorage.clear(); window.location.href = 'login.html';
            });
        });
    }

    // --- Funções Principais ---
    function loadStudentsIntoSelect() {
        studentSelect.innerHTML = '<option value="">Carregando...</option>';
        db.collection('students').where('role', '==', 'aluno').onSnapshot(snapshot => {
            const students = [];
            snapshot.forEach(doc => students.push({ id: doc.id, name: doc.data().name }));
            students.sort((a, b) => a.name.localeCompare(b.name));
            
            let options = '<option value="">Selecione um aluno...</option>';
            students.forEach(s => { options += `<option value="${s.id}">${s.name}</option>`; });
            
            const selectedId = localStorage.getItem('selectedStudentId');
            studentSelect.innerHTML = options;
            
            if (selectedId && students.some(s => s.id === selectedId)) {
                studentSelect.value = selectedId;
                studentSelect.dispatchEvent(new Event('change'));
            } else {
                displayNoStudentSelected();
            }
        }, error => {
            console.error("Erro ao buscar alunos: ", error);
            studentSelect.innerHTML = '<option value="">Erro ao carregar</option>';
        });
    }

    studentSelect.addEventListener('change', () => {
        const studentId = studentSelect.value;
        const studentName = studentSelect.options[studentSelect.selectedIndex].text;

        if (studentId) {
            localStorage.setItem('selectedStudentId', studentId);
            localStorage.setItem('selectedStudentName', studentName);
            displayStudentDashboard(studentId, studentName);
        } else {
            localStorage.removeItem('selectedStudentId');
            localStorage.removeItem('selectedStudentName');
            displayNoStudentSelected();
        }
    });
    
    function displayNoStudentSelected() {
        studentDashboardDiv.classList.add('hidden');
        noStudentSelectedDiv.classList.remove('hidden');
        studentActionButtons.classList.add('hidden');
    }
    
    async function displayStudentDashboard(studentId, studentName) {
        noStudentSelectedDiv.classList.add('hidden');
        studentDashboardDiv.classList.remove('hidden');
        studentActionButtons.classList.remove('hidden');
        
        document.getElementById('student-portal-btn').href = `aluno.html?studentId=${studentId}`;
        document.getElementById('selected-student-name-header').textContent = studentName;
        
        await updatePackageInfo(studentId);
        await updateModuleProgress(studentId);
    }

    async function updatePackageInfo(studentId) {
        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            if (studentDoc.exists) {
                const data = studentDoc.data();
                const classCount = data.classCount || 0;
                const packageSize = data.pacoteContratado || 0;
                
                classCountDisplay.textContent = classCount;

                if (packageSize > 0) {
                    noPackageMessage.classList.add('hidden');
                    packageDetails.classList.remove('hidden');
                    const percentage = Math.round((classCount / packageSize) * 100);
                    packageProgressBar.style.width = `${Math.min(100, percentage)}%`;
                    packageProgressText.textContent = `${classCount} / ${packageSize} horas`;
                    packageValueDisplay.textContent = `R$ ${data.valorPacote ? data.valorPacote.toFixed(2).replace('.', ',') : '0,00'}`;
                    packageDateDisplay.textContent = data.dataInicioPacote || '--/--/----';
                } else {
                    noPackageMessage.classList.remove('hidden');
                    packageDetails.classList.add('hidden');
                    packageProgressBar.style.width = '0%';
                    packageProgressText.textContent = 'Nenhum pacote ativo';
                }
            }
        } catch (error) {
            console.error("Erro ao buscar dados do pacote:", error);
        }
    }

    async function updateModuleProgress(studentId) {
        if (!modulesContainer) return;
        modulesContainer.innerHTML = '';
    
        try {
            const studentDoc = await db.collection('students').doc(studentId).get();
            const progressData = studentDoc.exists ? studentDoc.data().progress || {} : {};
    
            modulesData.forEach(module => {
                const themeClasses = module.theme.split(' ').join(' ');
                let cardHTML = '';
                
                if (module.lessons > 0) {
                    const moduleProgress = progressData[module.id] || {};
                    const completedLessons = Object.keys(moduleProgress).length;
                    const totalLessons = module.lessons;
                    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

                    cardHTML = `
                        <div class="enhanced-card module-card-enhanced p-5 flex flex-col h-full">
                            <div class="flex-grow">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="p-3 rounded-lg bg-${module.color}-100"><i class="fas ${module.icon} icon-md text-${module.color}-600"></i></div>
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-800">${module.title}</h3>
                                        <p class="text-sm text-${module.color}-600 font-medium">${module.lessons} lições</p>
                                    </div>
                                </div>
                                <p class="text-gray-600 text-sm mb-4">${module.description}</p>
                            </div>
                            <div class="mt-auto">
                                <div class="flex justify-between items-center mb-1 text-xs font-medium">
                                    <span class="text-gray-600">Progresso</span>
                                    <span class="text-${module.color}-600 font-bold">${percentage}%</span>
                                </div>
                                <div class="enhanced-progress mb-4">
                                    <div class="enhanced-progress-bar bg-gradient-to-r ${themeClasses}" style="width: ${percentage}%;"></div>
                                </div>
                                <a href="${module.href}" class="enhanced-btn w-full block text-center bg-gradient-to-r ${themeClasses} text-white font-bold py-2 px-4 rounded-lg">
                                    <i class="fas fa-book-open mr-2"></i>${module.buttonText}
                                </a>
                            </div>
                        </div>`;
                } else { 
                    cardHTML = `
                        <div class="enhanced-card module-card-enhanced p-5 flex flex-col h-full">
                            <div class="flex-grow">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="p-3 rounded-lg bg-${module.color}-100"><i class="fas ${module.icon} icon-md text-${module.color}-600"></i></div>
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-800">${module.title}</h3>
                                        <p class="text-sm text-${module.color}-600 font-medium">Acesso direto</p>
                                    </div>
                                </div>
                                <p class="text-gray-600 text-sm mb-4">${module.description}</p>
                            </div>
                            <div class="mt-auto">
                                <a href="${module.href}" class="enhanced-btn w-full block text-center bg-gradient-to-r ${themeClasses} text-white font-bold py-2 px-4 rounded-lg">
                                    <i class="fas fa-play mr-2"></i>${module.buttonText}
                                </a>
                            </div>
                        </div>`;
                }
                modulesContainer.innerHTML += cardHTML;
            });
        } catch (error) {
            console.error("Erro ao atualizar progresso dos módulos: ", error);
            modulesContainer.innerHTML = '<p class="text-red-500 col-span-full">Não foi possível carregar os módulos.</p>';
        }
    }

    // --- Lógica do Contador de Aulas ---
    async function changeClassCount(amount) {
        const studentId = localStorage.getItem('selectedStudentId');
        if (!studentId) return;

        const studentRef = db.collection('students').doc(studentId);
        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(studentRef);
                if (!doc.exists) throw "Aluno não encontrado!";
                const currentCount = doc.data().classCount || 0;
                const newCount = currentCount + amount;
                if (newCount >= 0) {
                    transaction.update(studentRef, { classCount: newCount });
                }
            });
            await updatePackageInfo(studentId);
        } catch (error) {
            console.error("Erro ao atualizar contador: ", error);
        }
    }
    addClassBtn.addEventListener('click', () => changeClassCount(1));
    removeClassBtn.addEventListener('click', () => changeClassCount(-1));

    // --- Lógica do Modal de Novo Pacote ---
    newPackageBtn.addEventListener('click', () => {
        if (!localStorage.getItem('selectedStudentId')) return;
        newPackageModal.classList.remove('hidden');
    });
    cancelPackageBtn.addEventListener('click', () => newPackageModal.classList.add('hidden'));

    newPackageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = localStorage.getItem('selectedStudentId');
        const packageSize = parseInt(document.getElementById('package-type').value, 10);
        const packageValue = parseFloat(document.getElementById('package-value-input').value);
        const packageDateValue = document.getElementById('package-date-input').value;

        if (!studentId || !packageSize || isNaN(packageValue) || !packageDateValue) {
            return alert("Preencha todos os campos.");
        }
        
        const [year, month, day] = packageDateValue.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        
        confirmPackageBtn.classList.add('btn-loading');
        confirmPackageBtn.disabled = true;

        try {
            await db.collection('students').doc(studentId).update({
                pacoteContratado: packageSize,
                valorPacote: packageValue,
                dataInicioPacote: formattedDate,
                classCount: 0
            });
            newPackageModal.classList.add('hidden');
            newPackageForm.reset();
            await updatePackageInfo(studentId);
        } catch (error) {
            console.error("Erro ao salvar novo pacote: ", error);
        } finally {
            confirmPackageBtn.classList.remove('btn-loading');
            confirmPackageBtn.disabled = false;
        }
    });
});