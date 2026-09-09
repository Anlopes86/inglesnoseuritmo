const AURA_CLASS_ID = "7ano-2026";
const AURA_CLASS_NAME = "7º Ano";
let students = [
  { id: 1, name: "Ana Maria Scheer", initials: "AM", score: 420, week: 225 },
  { id: 2, name: "Bianca Urnau Vivian", initials: "BU", score: 285, week: 200 },
  { id: 3, name: "Caio Kruger Leopoldo", initials: "CK", score: 5, week: 0 },
  { id: 4, name: "Catarina Quednau Weber", initials: "CQ", score: 325, week: 225 },
  { id: 5, name: "Cecilia Hart Graff", initials: "CH", score: 325, week: 200 },
  { id: 6, name: "Cecilia Rigodanzo Busanello", initials: "CR", score: 75, week: 0 },
  { id: 7, name: "Daniel Gulko Volino", initials: "DG", score: 360, week: 225 },
  { id: 8, name: "Flávia Antoniely Tiecker", initials: "FA", score: 90, week: 0 },
  { id: 9, name: "Gabriela Hübner Lopes", initials: "GH", score: 325, week: 200 },
  { id: 10, name: "Gabriela Turra Rech", initials: "GT", score: 250, week: 200 },
  { id: 11, name: "Gianlucca Kerpel da Silveira", initials: "GK", score: 45, week: 0 },
  { id: 12, name: "Guilherme Sala", initials: "GS", score: 145, week: 0 },
  { id: 13, name: "Isabela Franke", initials: "IF", score: 90, week: 0 },
  { id: 14, name: "Isabella dos Santos Kusiak", initials: "ID", score: 435, week: 200 },
  { id: 15, name: "Isadora de Moura e Silva Braucks", initials: "ID", score: 295, week: 200 },
  { id: 16, name: "Julia Leonhardt Watthier", initials: "JL", score: 270, week: 200 },
  { id: 17, name: "Julia Schneider", initials: "JS", score: 195, week: 200 },
  { id: 18, name: "Luis Henrique Reginatto", initials: "LH", score: 220, week: 0 },
  { id: 19, name: "Maria Antonia Cassol Motta", initials: "MA", score: 185, week: 25 },
  { id: 20, name: "Maria Valentina Muller", initials: "MV", score: 90, week: 0 },
  { id: 21, name: "Miguel Vargas Andrighetto", initials: "MV", score: 215, week: 0 },
  { id: 22, name: "Murilo Kerber Binkowski", initials: "MK", score: 240, week: 0 },
  { id: 23, name: "Otavio Filiheiro Cerutti", initials: "OF", score: 90, week: 0 }
];

let activities = [
  { studentId: 19, delta: 25, reason: "Lançamento importado — Setembro, semana 2", time: "Set • S2" },
  { studentId: 7, delta: 25, reason: "Lançamento importado — Setembro, semana 2", time: "Set • S2" },
  { studentId: 4, delta: 25, reason: "Lançamento importado — Setembro, semana 2", time: "Set • S2" },
  { studentId: 1, delta: 25, reason: "Lançamento importado — Setembro, semana 2", time: "Set • S2" },
  { studentId: 17, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" },
  { studentId: 16, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" },
  { studentId: 15, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" },
  { studentId: 14, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" },
  { studentId: 10, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" },
  { studentId: 9, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" },
  { studentId: 7, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" },
  { studentId: 5, delta: 200, reason: "Lançamento importado — Setembro, semana 1", time: "Set • S1" }
];

const levels = [
  { id: "corrupted", min: -Infinity, max: -1, label: "Corrompida", full: "Aura Corrompida", icon: "◌" },
  { id: "civil", min: 0, max: 199, label: "Civil", full: "Civil em Treinamento", icon: "◇" },
  { id: "apprentice", min: 200, max: 399, label: "Aprendiz", full: "Aprendiz de Herói", icon: "✦" },
  { id: "suit", min: 400, max: 599, label: "Supertraje", full: "Supertraje", icon: "⚡" },
  { id: "guardian", min: 600, max: 799, label: "Guardião", full: "Guardião da Sala", icon: "◆" },
  { id: "legend", min: 800, max: 999, label: "Lenda", full: "Lenda da Turma", icon: "♛" },
  { id: "supreme", min: 1000, max: Infinity, label: "Suprema", full: "Aura Suprema", icon: "✺" }
];

let primarySelectedId = students[0].id;
const selectedIds = new Set([primarySelectedId]);
let sign = 1;
let lastAction = null;
let toastTimer;
let eventTimer;
let currentUser = null;
let currentProfile = null;
let studentsUnsubscribe = null;
let activitiesUnsubscribe = null;
let isPersisting = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const getStudent = (id = primarySelectedId) => students.find(student => student.id === id);
const levelFor = score => levels.find(level => score >= level.min && score <= level.max);
const signed = value => `${value >= 0 ? "+" : "−"}${Math.abs(value)}`;
const arenaName = name => {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts.at(-1)}` : name;
};
const classRef = () => db.collection("auraClasses").doc(AURA_CLASS_ID);
const studentRef = id => classRef().collection("students").doc(String(id).padStart(2, "0"));
const setSyncStatus = (label, online = true) => {
  const pill = $("#sync-pill");
  if (!pill) return;
  pill.lastChild.textContent = ` ${label}`;
  pill.classList.toggle("offline", !online);
};

function renderStudents(filter = "") {
  const list = $("#student-list");
  const normalized = filter.trim().toLocaleLowerCase("pt-BR");
  const visible = students.filter(student => student.name.toLocaleLowerCase("pt-BR").includes(normalized));
  list.innerHTML = visible.map(student => {
    const level = levelFor(student.score);
    const selected = selectedIds.has(student.id);
    return `<button class="student-item ${selected ? "active" : ""}" role="option" aria-selected="${selected}" data-id="${student.id}">
      <span class="student-check">${selected ? "✓" : ""}</span>
      <span class="student-avatar">${student.initials}</span>
      <span class="student-copy"><strong>${student.name}</strong><small>${level.full}</small></span>
      <span class="student-score"><strong>${student.score}</strong><small>AURA</small></span>
    </button>`;
  }).join("");
  $("#student-count").textContent = visible.length;
  list.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    const id = Number(button.dataset.id);
    if (selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    primarySelectedId = id;
    renderStudents($("#student-search").value);
    renderSelected();
  }));
  $("#selection-count").textContent = selectedIds.size;
  $("#selection-count").parentElement.lastChild.textContent = selectedIds.size === 1 ? " selecionado" : " selecionados";
}

function currentDelta() {
  const magnitude = Math.abs(Number($("#aura-value").value) || 0);
  return magnitude * sign;
}

function renderSelected() {
  const selected = students.filter(student => selectedIds.has(student.id));
  const count = selected.length;
  $("#input-sign").textContent = sign > 0 ? "+" : "−";
  $("#toggle-sign").textContent = sign > 0 ? "−" : "+";
  $("#toggle-sign").classList.toggle("is-positive", sign < 0);
  $("#energy-preview").classList.toggle("negative", sign < 0);
  $("#apply-aura").disabled = count === 0;
  $("#apply-label").textContent = count > 1 ? `Aplicar a ${count} alunos` : "Confirmar Aura";

  if (!count) {
    $("#selected-initials").textContent = "0";
    $("#selected-kicker").textContent = "SELEÇÃO EM LOTE";
    $("#selected-name").textContent = "Selecione os alunos";
    $("#selected-level").textContent = "nenhum selecionado";
    $("#selected-level").className = "level-chip civil";
    $("#score-label").textContent = "SELECIONADOS";
    $("#selected-score").textContent = "0";
    $("#preview-score").textContent = "—";
    $("#summary-before").textContent = "0 alunos";
    $("#summary-after").textContent = "—";
    $("#level-message").textContent = "escolha um ou vários nomes na lista";
    return;
  }

  if (count > 1) {
    const delta = currentDelta();
    $("#selected-initials").textContent = count;
    $("#selected-kicker").textContent = "LANÇAMENTO EM GRUPO";
    $("#selected-name").textContent = `${count} alunos selecionados`;
    $("#selected-level").textContent = "mesmo valor para todos";
    $("#selected-level").className = "level-chip apprentice";
    $("#score-label").textContent = "SELECIONADOS";
    $("#selected-score").textContent = `${count}×`;
    $("#preview-score").textContent = `${count} atualizações`;
    $("#summary-before").textContent = `${count} alunos`;
    $("#summary-after").textContent = signed(delta);
    $("#summary-after").style.color = sign > 0 ? "var(--green)" : "var(--pink)";
    $("#level-message").textContent = `${signed(delta * count)} Aura distribuída no total`;
    return;
  }

  const student = selected[0];
  const beforeLevel = levelFor(student.score);
  const afterScore = student.score + currentDelta();
  const afterLevel = levelFor(afterScore);
  $("#selected-initials").textContent = student.initials;
  $("#selected-kicker").textContent = "HERÓI SELECIONADO";
  $("#selected-name").textContent = student.name;
  $("#score-label").textContent = "AURA ATUAL";
  $("#selected-score").textContent = student.score;
  $("#selected-level").textContent = beforeLevel.full;
  $("#selected-level").className = `level-chip ${beforeLevel.id}`;
  $("#preview-score").textContent = afterScore;
  $("#summary-before").textContent = student.score;
  $("#summary-after").textContent = afterScore;
  $("#summary-after").style.color = sign > 0 ? "var(--green)" : "var(--pink)";
  $("#level-message").textContent = beforeLevel.id === afterLevel.id
    ? `continua em ${afterLevel.full}`
    : `${sign > 0 ? "level up" : "novo nível"}: ${afterLevel.full}`;
}

function renderActivities() {
  const visibleActivities = activities.slice(0, 6);
  $("#activity-list").innerHTML = visibleActivities.map(activity => {
    const student = getStudent(activity.studentId);
    const loss = activity.delta < 0;
    return `<div class="activity-item">
      <span class="activity-icon ${loss ? "loss" : ""}">${loss ? "−" : "+"}</span>
      <span class="activity-copy"><strong>${student.name}</strong><small>${activity.reason || "Ajuste livre"}</small></span>
      <span class="activity-value ${loss ? "loss" : ""}">${signed(activity.delta)}<small>${activity.time}</small></span>
    </div>`;
  }).join("");
  const total = visibleActivities.reduce((sum, item) => sum + item.delta, 0);
  $("#today-total").textContent = signed(total);
}

function renderArena() {
  const average = Math.round(students.reduce((sum, student) => sum + student.score, 0) / students.length);
  const week = students.reduce((sum, student) => sum + student.week, 0);
  $("#team-average").textContent = average;
  $("#giant-average").textContent = average;
  $("#team-progress-bar").style.width = `${Math.min(100, average / 10)}%`;
  $("#week-total").textContent = signed(week);
  const levelUps = students.filter(student => levelFor(student.score - student.week).id !== levelFor(student.score).id).length;
  $("#level-up-count").textContent = String(levelUps).padStart(2, "0");

  const biggestGrowth = [...students].sort((a, b) => b.week - a.week || b.score - a.score)[0];
  $("#growth-name").textContent = arenaName(biggestGrowth.name);
  $("#growth-value").textContent = signed(biggestGrowth.week);

  const nextStudent = students
    .map(student => {
      const nextLevel = levels.find(level => Number.isFinite(level.min) && level.min > student.score);
      return nextLevel ? { student, nextLevel, distance: nextLevel.min - student.score } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance || b.student.score - a.student.score)[0];
  if (nextStudent) {
    $("#unlock-name").textContent = arenaName(nextStudent.student.name);
    $("#next-unlock").innerHTML = `${nextStudent.distance} <i>ATÉ ${nextStudent.nextLevel.min}</i>`;
    $("#unlock-note").textContent = `${nextStudent.nextLevel.full} está quase desbloqueado`;
  }
  const augustAverage = 116.3043478261;
  const monthGrowth = Math.round(((average - augustAverage) / augustAverage) * 100);
  $("#month-growth").textContent = signed(monthGrowth) + "%";

  const mapLevels = levels.filter(level => level.id !== "corrupted");
  $("#level-map").innerHTML = mapLevels.map(level => {
    const count = students.filter(student => levelFor(student.score).id === level.id).length;
    return `<div class="level-node ${count ? "active" : ""}"><span class="level-symbol">${level.icon}</span><strong>${level.label}</strong><small>${level.min}${Number.isFinite(level.max) ? `–${level.max}` : "+"}</small><b>${count}</b></div>`;
  }).join("");

  const ranked = [...students].sort((a, b) => b.score - a.score);
  $("#leaderboard").innerHTML = ranked.map((student, index) => `<div class="full-rank-row ${index < 3 ? "top-three" : ""}">
    <span class="rank-position">${String(index + 1).padStart(2, "0")}</span>
    <span class="rank-avatar">${student.initials}</span>
    <span class="rank-copy" title="${student.name}"><strong>${arenaName(student.name)}</strong><small>posição ${index + 1} de ${students.length}</small></span>
    <span class="rank-level">${levelFor(student.score).full}</span>
    <span class="rank-week">${signed(student.week)}</span>
    <span class="rank-score"><strong>${student.score}</strong><small>AURA</small></span>
  </div>`).join("");
}

function switchView(name) {
  $$(".view-button").forEach(button => {
    const active = button.dataset.view === name;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active);
  });
  $$(".view").forEach(view => view.classList.toggle("active", view.id === `${name}-view`));
  if (name === "arena") renderArena();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showLiveEvent(student, delta, reason, levelChanged) {
  $("#event-delta").textContent = signed(delta);
  $("#event-delta").style.color = delta >= 0 ? "white" : "var(--pink)";
  $("#event-name").textContent = student.name;
  $("#event-reason").textContent = levelChanged ? `⚡ LEVEL UP — ${levelFor(student.score).full}` : (reason || "Energia atualizada");
  $("#live-event").classList.add("show");
  clearTimeout(eventTimer);
  eventTimer = setTimeout(() => $("#live-event").classList.remove("show"), 3400);
}

function showToast() {
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 5000);
}

async function applyAuraBatch(studentIdList, delta, reason) {
  if (!delta) {
    $("#aura-value").focus();
    throw new Error("O valor da Aura não pode ser zero.");
  }
  const targets = studentIdList.map(id => getStudent(id));
  if (!targets.length || targets.some(student => !student)) throw new Error("Seleção de alunos inválida.");
  const safeReason = String(reason || "Ajuste livre").trim().slice(0, 120) || "Ajuste livre";
  if (!currentUser || currentProfile?.role !== "professor") throw new Error("Somente o professor pode alterar a Aura.");
  if (isPersisting) return { studentsUpdated: 0, ignored: true };
  isPersisting = true;
  $("#apply-aura").disabled = true;
  setSyncStatus("salvando…");
  const batch = db.batch();
  const eventRefs = [];
  const now = firebase.firestore.FieldValue.serverTimestamp();
  targets.forEach(student => {
    const eventRef = classRef().collection("events").doc();
    eventRefs.push(eventRef);
    batch.update(studentRef(student.id), {
      score: firebase.firestore.FieldValue.increment(delta),
      week: firebase.firestore.FieldValue.increment(delta),
      updatedAt: now,
      updatedBy: currentUser.uid
    });
    batch.set(eventRef, {
      studentId: student.id,
      studentName: student.name,
      delta,
      reason: safeReason,
      previousScore: student.score,
      resultingScore: student.score + delta,
      createdAt: now,
      createdBy: currentUser.uid
    });
  });
  try {
    await batch.commit();
  } catch (error) {
    setSyncStatus("erro ao salvar", false);
    isPersisting = false;
    $("#apply-aura").disabled = false;
    throw error;
  }
  const entries = targets.map((student, index) => {
    const previousScore = student.score;
    const previousLevel = levelFor(previousScore).id;
    return { studentId: student.id, previousScore, previousLevel, eventId: eventRefs[index].id };
  });
  lastAction = { entries, delta };
  isPersisting = false;
  setSyncStatus("sincronizado");
  showToast();
  if (targets.length === 1) {
    const student = targets[0];
    const projected = { ...student, score: student.score + delta };
    showLiveEvent(projected, delta, safeReason, entries[0].previousLevel !== levelFor(projected.score).id);
  } else {
    showLiveEvent({ name: `${targets.length} HERÓIS`, score: 0 }, delta, `${safeReason} • ${signed(delta)} para cada`, false);
  }
  return { studentsUpdated: targets.length, studentIds: targets.map(student => student.id), delta, totalDelta: delta * targets.length };
}

function applyAuraFor(studentId, delta, reason) {
  return applyAuraBatch([studentId], delta, reason);
}

async function applyAura() {
  const delta = currentDelta();
  if (!delta) {
    $("#aura-value").focus();
    return;
  }
  if (!selectedIds.size) return;
  try {
    await applyAuraBatch([...selectedIds], delta, $("#aura-reason").value);
  } catch (error) {
    alert(error.message || "Não foi possível salvar a Aura.");
  }
}

async function undoLast() {
  if (!lastAction) return;
  const batch = db.batch();
  lastAction.entries.forEach(entry => {
    batch.update(studentRef(entry.studentId), {
      score: firebase.firestore.FieldValue.increment(-lastAction.delta),
      week: firebase.firestore.FieldValue.increment(-lastAction.delta),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: currentUser.uid
    });
    if (entry.eventId) batch.delete(classRef().collection("events").doc(entry.eventId));
  });
  try {
    setSyncStatus("desfazendo…");
    await batch.commit();
    setSyncStatus("sincronizado");
  } catch (error) {
    setSyncStatus("erro ao desfazer", false);
    alert("Não foi possível desfazer esta ação.");
    return;
  }
  lastAction = null;
  $("#toast").classList.remove("show");
}

function updateClock() {
  $("#clock").textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

$$(".view-button").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
$("#open-arena").addEventListener("click", () => switchView("arena"));
$("#student-search").addEventListener("input", event => renderStudents(event.target.value));
$("#select-visible").addEventListener("click", () => {
  const normalized = $("#student-search").value.trim().toLocaleLowerCase("pt-BR");
  students.filter(student => student.name.toLocaleLowerCase("pt-BR").includes(normalized)).forEach(student => selectedIds.add(student.id));
  primarySelectedId = [...selectedIds][0] || students[0].id;
  renderStudents($("#student-search").value);
  renderSelected();
});
$("#clear-selection").addEventListener("click", () => {
  selectedIds.clear();
  renderStudents($("#student-search").value);
  renderSelected();
});
$("#aura-value").addEventListener("input", renderSelected);
$("#toggle-sign").addEventListener("click", () => { sign *= -1; renderSelected(); });
$("#quick-actions").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  const value = Number(button.dataset.value);
  sign = value >= 0 ? 1 : -1;
  $("#aura-value").value = Math.abs(value);
  $("#aura-reason").value = button.dataset.reason;
  renderSelected();
});
$("#apply-aura").addEventListener("click", applyAura);
$("#undo-action").addEventListener("click", undoLast);
$("#close-event").addEventListener("click", () => $("#live-event").classList.remove("show"));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") $("#live-event").classList.remove("show");
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") applyAura();
});

renderStudents();
renderSelected();
renderActivities();
renderArena();
updateClock();
setInterval(updateClock, 30000);

async function seedClassIfNeeded() {
  const snapshot = await classRef().get();
  if (snapshot.exists) return;
  if (currentProfile?.role !== "professor") throw new Error("A turma Aura ainda não foi inicializada.");
  const batch = db.batch();
  const now = firebase.firestore.FieldValue.serverTimestamp();
  batch.set(classRef(), {
    name: AURA_CLASS_NAME,
    schoolYear: 2026,
    ownerId: currentUser.uid,
    viewerUids: [],
    createdAt: now,
    updatedAt: now
  });
  students.forEach(student => batch.set(studentRef(student.id), {
    id: student.id,
    name: student.name,
    initials: student.initials,
    score: student.score,
    week: student.week,
    active: true,
    createdAt: now,
    updatedAt: now
  }));
  await batch.commit();
}

function subscribeToAura() {
  studentsUnsubscribe?.();
  activitiesUnsubscribe?.();
  studentsUnsubscribe = classRef().collection("students").where("active", "==", true).onSnapshot(snapshot => {
    const loaded = snapshot.docs.map(doc => ({ ...doc.data(), id: Number(doc.data().id ?? doc.id) }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    if (loaded.length) students = loaded;
    if (!students.some(student => student.id === primarySelectedId)) primarySelectedId = students[0]?.id;
    [...selectedIds].forEach(id => { if (!students.some(student => student.id === id)) selectedIds.delete(id); });
    if (!selectedIds.size && primarySelectedId) selectedIds.add(primarySelectedId);
    renderStudents($("#student-search").value);
    renderSelected();
    renderArena();
    setSyncStatus("sincronizado");
  }, error => {
    console.error(error);
    setSyncStatus("sem acesso", false);
  });
  activitiesUnsubscribe = classRef().collection("events").orderBy("createdAt", "desc").limit(20).onSnapshot(snapshot => {
    if (!snapshot.empty) {
      activities = snapshot.docs.map(doc => {
        const data = doc.data();
        const date = data.createdAt?.toDate?.();
        return { ...data, eventId: doc.id, time: date ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "agora" };
      });
      renderActivities();
    }
  }, error => console.error(error));
}

auth.onAuthStateChanged(async user => {
  if (!user) {
    window.location.replace(`../login.html?redirect=${encodeURIComponent("aura/aura.html")}`);
    return;
  }
  currentUser = user;
  try {
    const profile = await db.collection("students").doc(user.uid).get();
    currentProfile = profile.exists ? profile.data() : null;
    if (!["professor", "admin", "aluno"].includes(currentProfile?.role)) throw new Error("Perfil sem acesso à Aura.");
    await seedClassIfNeeded();
    subscribeToAura();
    if (currentProfile.role !== "professor") {
      document.querySelector('[data-view="admin"]').hidden = true;
      switchView("arena");
    }
  } catch (error) {
    console.error(error);
    setSyncStatus("acesso restrito", false);
    document.querySelector('[data-view="admin"]').hidden = true;
    switchView("arena");
  }
});

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();

  const singleRegistration = context.registerTool({
    name: "apply_aura_event",
    title: "Registrar Aura",
    description: "Registra um ganho ou uma perda livre de Aura para um aluno da demonstração e atualiza a página visível.",
    inputSchema: {
      type: "object",
      properties: {
        studentId: { type: "integer", minimum: 1, description: "ID do aluno exibido na demonstração." },
        delta: { type: "integer", minimum: -1000, maximum: 1000, description: "Valor positivo para ganhar Aura ou negativo para perder Aura." },
        reason: { type: "string", maxLength: 120, description: "Motivo ou observação opcional." }
      },
      required: ["studentId", "delta"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || !Number.isInteger(input.studentId) || !Number.isInteger(input.delta) || input.delta === 0 || Math.abs(input.delta) > 1000) {
        throw new Error("Informe studentId válido e delta inteiro entre -1000 e 1000, diferente de zero.");
      }
      primarySelectedId = input.studentId;
      selectedIds.clear();
      selectedIds.add(input.studentId);
      return applyAuraFor(input.studentId, input.delta, input.reason);
    }
  }, { signal: lifecycle.signal });

  const batchRegistration = context.registerTool({
    name: "apply_aura_batch",
    title: "Registrar Aura em grupo",
    description: "Aplica o mesmo ganho ou perda livre de Aura a vários alunos da demonstração em uma única ação.",
    inputSchema: {
      type: "object",
      properties: {
        studentIds: { type: "array", minItems: 1, uniqueItems: true, items: { type: "integer", minimum: 1 }, description: "IDs dos alunos selecionados." },
        delta: { type: "integer", minimum: -1000, maximum: 1000, description: "Valor aplicado igualmente a cada aluno." },
        reason: { type: "string", maxLength: 120, description: "Motivo ou observação opcional." }
      },
      required: ["studentIds", "delta"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      const idsValid = input && Array.isArray(input.studentIds) && input.studentIds.length > 0 && input.studentIds.every(Number.isInteger) && new Set(input.studentIds).size === input.studentIds.length;
      if (!idsValid || !Number.isInteger(input.delta) || input.delta === 0 || Math.abs(input.delta) > 1000) {
        throw new Error("Informe uma lista de studentIds válidos e delta inteiro entre -1000 e 1000, diferente de zero.");
      }
      selectedIds.clear();
      input.studentIds.forEach(id => selectedIds.add(id));
      primarySelectedId = input.studentIds[0];
      return applyAuraBatch(input.studentIds, input.delta, input.reason);
    }
  }, { signal: lifecycle.signal });

  Promise.all([Promise.resolve(singleRegistration), Promise.resolve(batchRegistration)]).catch(() => lifecycle.abort());
}

registerWebMcpTools();
