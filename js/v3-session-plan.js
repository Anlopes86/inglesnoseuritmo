(() => {
    const TOTAL_MINUTES = 60;
    const reviewNumbers = {
        'a1-v3': new Set([4, 8, 12, 16, 20, 24, 28, 32]),
        'a2-v3': new Set([8, 16, 24, 32]),
        'b1-v3': new Set([8, 16, 24, 32])
    };

    const missions = {
        'a1-v3': {
            1: ['Guided exchange', 'Conheça uma pessoa nova, apresente-se e faça duas perguntas sem ler o diálogo-modelo.'],
            2: ['Registration desk', 'Complete oralmente um cadastro; peça repetição ou soletração quando uma informação não estiver clara.'],
            3: ['Who is who?', 'Apresente três pessoas de uma família e faça o professor identificar cada relação.'],
            5: ['Routine timeline', 'Organize uma rotina real e responda a duas perguntas inesperadas sobre horários.'],
            6: ['Schedule conflict', 'Compare duas agendas e encontre um horário possível para uma aula.'],
            7: ['Café order', 'Faça um pedido completo, responda a uma pergunta do atendente e ajuste um item indisponível.'],
            9: ['Identity challenge', 'Descreva uma pessoa sem dizer o nome; o professor deve identificá-la.'],
            10: ['Neighborhood check', 'Explique o que existe perto de casa e onde ficam três lugares.'],
            11: ['Map mission', 'Guie o professor até um destino e corrija uma curva tomada no lugar errado.'],
            13: ['Weather decision', 'Escolha uma atividade adequada para a previsão e explique a decisão.'],
            14: ['Find a match', 'Compare hábitos de lazer e descubra uma atividade que os dois participantes gostam de fazer.'],
            15: ['Shopping role-play', 'Peça tamanho e cor, experimente uma peça e conclua ou recuse a compra.'],
            17: ['Health desk', 'Explique dois sintomas, responda a perguntas e escolha um conselho possível.'],
            18: ['Missing object', 'Descreva um cômodo e ajude o professor a localizar um objeto perdido.'],
            19: ['Ability and duty', 'Explique o que você consegue fazer e o que precisa fazer em uma rotina de estudo ou trabalho.'],
            21: ['Travel counter', 'Peça uma passagem, confirme horário e plataforma e reaja a um atraso.'],
            22: ['Invitation plan', 'Convide alguém, combine data e horário e responda educadamente a uma mudança.'],
            23: ['Live scene', 'Descreva ações simultâneas em uma cena e responda ao que muda durante a observação.'],
            25: ['Nature guide', 'Apresente um animal, diga o que ele faz e dê uma orientação simples de cuidado.'],
            26: ['Tech support', 'Explique um problema simples e dê instruções em ordem até chegar a uma solução.'],
            27: ['International introduction', 'Apresente origem, nacionalidade e idiomas de duas pessoas e faça uma comparação.'],
            29: ['Yesterday interview', 'Conte um acontecimento concluído e responda a três perguntas de acompanhamento.'],
            30: ['Compare and choose', 'Compare duas opções reais e tome uma decisão com pelo menos duas justificativas.'],
            31: ['Plan with details', 'Apresente um plano decidido incluindo atividade, dia, horário, lugar e preparação.']
        },
        'a2-v3': {
            1: ['Past-event interview', 'Relate um acontecimento concluído; o professor investiga quando, onde, com quem e por quê.'],
            2: ['Story reconstruction', 'Reconstrua uma história em ordem e conecte causa, consequência e desfecho.'],
            3: ['Decision matrix', 'Compare duas opções por preço, praticidade e qualidade antes de escolher.'],
            4: ['Evidence ranking', 'Escolha a melhor e a pior opção de um grupo e sustente cada avaliação com evidência.'],
            5: ['Resource planning', 'Planeje materiais para um pequeno evento sem faltar e sem comprar em excesso.'],
            6: ['Scene reporter', 'Descreva o que estava acontecendo em uma cena antes do evento principal.'],
            7: ['Interrupted story', 'Conte uma situação interrompida e responda a perguntas com when e while.'],
            9: ['Plan under evidence', 'Apresente um plano detalhado e uma previsão baseada em evidência visível.'],
            10: ['Instant-response round', 'Reaja a quatro situações com decisão imediata, oferta, promessa ou previsão.'],
            11: ['Calendar negotiation', 'Combine um compromisso com data, horário, lugar e uma alternativa.'],
            12: ['Future form challenge', 'Escolha a forma de futuro adequada em três situações e explique a intenção.'],
            13: ['Permission ladder', 'Faça o mesmo pedido em dois graus de formalidade e responda com clareza.'],
            14: ['Rules or necessities?', 'Separe regras, obrigações externas e necessidades práticas em um cenário real.'],
            15: ['Advice clinic', 'Priorize três conselhos e adapte o tom depois de uma objeção do interlocutor.'],
            17: ['Experience map', 'Troque experiências, faça follow-up e evite datas terminadas com Present Perfect.'],
            18: ['Progress update', 'Informe o que já aconteceu, o que nunca aconteceu e o que ainda não aconteceu.'],
            19: ['Time detective', 'Decida entre Present Perfect e Past Simple usando as pistas temporais do contexto.'],
            20: ['Where are they now?', 'Explique quem foi, quem voltou e quem ainda está fora usando been e gone.'],
            21: ['Recovery update', 'Descreva mudanças de saúde, duração e o próximo passo necessário.'],
            22: ['Medical consultation', 'Responda a uma consulta com sintoma, duração, mudança e impacto na rotina.'],
            23: ['Precision location', 'Localize quatro pontos em um prédio ou rua sem depender de gestos.'],
            25: ['Route reconstruction', 'Descreva um deslocamento completo usando origem, caminho, passagem e destino.'],
            26: ['Deadline negotiation', 'Confirme prazos, duração e uma janela alternativa para concluir uma tarefa.'],
            27: ['Lost visitor', 'Dê uma rota em etapas, verifique entendimento e reformule um ponto confuso.'],
            28: ['Hotel recovery', 'Explique um problema no quarto, peça uma solução e responda à alternativa oferecida.'],
            29: ['Habit and goal', 'Explique hábitos, decisões e planos usando os padrões verbais como blocos completos.'],
            30: ['Condition planner', 'Relacione hábitos previsíveis e consequências futuras em um plano real.'],
            31: ['Hope or imagined change?', 'Diferencie condição real, esperança e situação imaginada em três respostas pessoais.']
        }
    };

    function moduleId() {
        const bodyModule = document.body?.dataset.module;
        if (bodyModule && reviewNumbers[bodyModule]) return bodyModule;
        const path = location.pathname.toLowerCase();
        return Object.keys(reviewNumbers).find(id => path.includes(`/${id}/`)) || '';
    }

    function lessonNumber() {
        const bodyValue = Number(document.body?.dataset.lessonNumber);
        if (bodyValue) return bodyValue;
        const match = location.pathname.match(/licao-(\d+)\.html$/i);
        return match ? Number(match[1]) : 0;
    }

    function slideWeight(slide) {
        const label = `${slide.dataset.title || ''} ${slide.dataset.slideType || ''} ${slide.querySelector('h2')?.textContent || ''}`.toLowerCase();
        if (/practice|station|drill|clinic/.test(label)) return 13;
        if (/speaking|dialog|role|oral test/.test(label)) return 10;
        if (/translation/.test(label)) return 9;
        if (/listening|skill lab/.test(label)) return 8;
        if (/grammar/.test(label)) return 8;
        if (/reading|case file/.test(label)) return 6;
        if (/vocab|flashcard|language bank|express/.test(label)) return 5;
        if (/opening|intro|objetivo|review mission/.test(label)) return 4;
        if (/assessment|can-do/.test(label)) return 5;
        if (/music/.test(label)) return 3;
        if (/homework|portfolio/.test(label)) return 2;
        return 5;
    }

    function allocateMinutes(slides) {
        const minimum = 2;
        const remaining = TOTAL_MINUTES - (slides.length * minimum);
        const weights = slides.map(slideWeight);
        const totalWeight = weights.reduce((sum, value) => sum + value, 0);
        const raw = weights.map(weight => (remaining * weight) / totalWeight);
        const minutes = raw.map(value => minimum + Math.floor(value));
        let missing = TOTAL_MINUTES - minutes.reduce((sum, value) => sum + value, 0);
        raw.map((value, index) => ({ index, fraction: value - Math.floor(value) }))
            .sort((a, b) => b.fraction - a.fraction)
            .forEach(item => {
                if (missing > 0) {
                    minutes[item.index] += 1;
                    missing -= 1;
                }
            });
        return minutes;
    }

    function injectMission(module, number) {
        const mission = missions[module]?.[number];
        if (module === 'a1-v3' && number < 9) return;
        if (!mission || document.querySelector('.v3-speaking-structure')) return;
        const target = module === 'a1-v3'
            ? [...document.querySelectorAll('.slide')].find(slide => /mini diálogos/i.test(slide.dataset.title || ''))
            : [...document.querySelectorAll('.slide')].find(slide => /mini dialogues/i.test(slide.dataset.title || ''));
        const heading = target?.querySelector('.slide-heading, h2')?.parentElement || target?.querySelector('section');
        if (!heading) return;
        const panel = document.createElement('div');
        const isA1 = module === 'a1-v3';
        const focus = isA1
            ? ['Cumpriu a tarefa', 'Usou o bloco-alvo', 'Fala compreensível']
            : ['Desenvolveu a resposta', 'Fez follow-up', 'Usou a forma-alvo', 'Fala compreensível'];
        panel.className = 'v3-live-mission v3-speaking-structure';
        panel.innerHTML = `
            <strong>${mission[0]}</strong>
            <span>${mission[1]}</span>
            <div class="v3-speaking-rounds" aria-label="Três rodadas de produção oral">
                <div><b>1</b><p><em>Primeira tentativa</em>Use o modelo e o apoio visual da tela.</p></div>
                <div><b>2</b><p><em>Nova condição</em>O professor muda um detalhe ou faz uma pergunta adicional.</p></div>
                <div><b>3</b><p><em>Segunda tentativa</em>Repita a missão incorporando uma correção prioritária.</p></div>
            </div>
            <div class="v3-teacher-focus"><small>Foco do professor</small>${focus.map(item => `<span>${item}</span>`).join('')}</div>
            <label class="v3-attempt-notes">Notas da tentativa ao vivo<textarea rows="2" placeholder="Registre evidência, correção prioritária e próximo passo."></textarea></label>`;
        heading.appendChild(panel);
    }

    function speakEnglish(text) {
        if (!text || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
        const utterance = new SpeechSynthesisUtterance(String(text));
        utterance.lang = 'en-US';
        utterance.rate = 0.88;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    function wireSpeech() {
        if (document.body.dataset.v3SpeechWired) return;
        document.body.dataset.v3SpeechWired = 'true';
        document.addEventListener('click', event => {
            const button = event.target.closest('[data-v3-speak]');
            if (!button) return;
            event.preventDefault();
            event.stopPropagation();
            speakEnglish(button.dataset.v3Speak || '');
        });
        document.addEventListener('keydown', event => {
            if (!['Enter', ' '].includes(event.key)) return;
            const card = event.target.closest('[data-flashcard], .b1-vocab-card');
            if (!card || event.target !== card) return;
            event.preventDefault();
            card.click();
        });
    }

    function ensureHelperScript(filename) {
        const existing = [...document.scripts].some(script => (script.getAttribute('src') || '').endsWith(`/js/${filename}`));
        if (existing) return;
        const script = document.createElement('script');
        script.src = `../js/${filename}`;
        script.defer = true;
        document.body.appendChild(script);
    }

    function annotate() {
        const module = moduleId();
        const number = lessonNumber();
        if (!module || !number) return false;
        const slides = [...document.querySelectorAll('.slide')];
        if (!slides.length || slides.every(slide => slide.dataset.v3Minutes)) return false;
        const minutes = allocateMinutes(slides);
        slides.forEach((slide, index) => {
            slide.dataset.v3Minutes = String(minutes[index]);
            const heading = slide.querySelector('h2');
            if (heading && !heading.querySelector('.v3-time-chip')) {
                heading.insertAdjacentHTML('beforeend', `<span class="v3-time-chip"><i class="fas fa-clock" aria-hidden="true"></i> ${minutes[index]} min</span>`);
            }
        });
        const header = document.querySelector('header .header-actions, header .container, header .header-inner');
        if (header && !header.querySelector('.v3-session-badge')) {
            const badge = document.createElement('span');
            badge.className = 'v3-session-badge';
            badge.innerHTML = `<i class="fas fa-stopwatch" aria-hidden="true"></i> 60 min`;
            header.appendChild(badge);
        }
        if (!reviewNumbers[module].has(number)) injectMission(module, number);
        wireSpeech();
        ensureHelperScript('v3-pt-translations.js');
        ensureHelperScript('flashcard-pronunciation.js');
        ensureHelperScript('lesson-flashcard-save.js');
        document.body.dataset.v3Review = reviewNumbers[module].has(number) ? 'true' : 'false';
        document.body.classList.add('v3-session-ready');
        return true;
    }

    function init() {
        if (annotate()) return;
        const observer = new MutationObserver(() => {
            if (annotate()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.V3SessionPlan = { TOTAL_MINUTES, reviewNumbers, missions, allocateMinutes, speakEnglish };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
