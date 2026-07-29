(function buildAdvancedV3Lessons(globalScope) {
    'use strict';

    const curriculum = globalScope.V3Curriculum;
    if (!curriculum) return;

    const blueprints = {
        'b2-v3': [
            {
                domain: 'A witness account with conflicting camera footage',
                reading: ['Three witnesses described the same platform incident from different positions. The first focused on the passenger who dropped a bag; the second noticed the announcement that had just ended; the third only saw what happened after a guard arrived.', 'The security team rebuilt the account by separating background actions, completed events and earlier causes. When the viewpoint changed, some details became more prominent, but the core sequence remained stable.'],
                chunks: ['from my perspective', 'by the time', 'what stood out was', 'the account shifts to', 'had been waiting', 'was about to']
            },
            {
                domain: 'A delayed product launch and its measurable results',
                reading: ['A software team has completed the safety tests, but it has been monitoring one unstable feature for three weeks. The delay has protected customers from a faulty release, although it has also increased support costs.', 'In the update, the project lead distinguishes finished results from ongoing effort. She supports every claim with dates, numbers or visible evidence instead of using vague progress language.'],
                chunks: ['has resulted in', 'has been affecting', 'over the past', 'so far', 'measurable outcome', 'ongoing concern']
            },
            {
                domain: 'An investigation into a failed delivery',
                reading: ['The package may have been sent to the wrong depot, but it cannot have left the regional center before Tuesday because its scan appeared there that morning. A damaged label might explain the missing destination.', 'The investigator ranks each explanation by evidence. She avoids presenting possibility as fact and revises her conclusion when a new timestamp becomes available.'],
                chunks: ['may have been', 'cannot have', 'must have', 'there is little doubt', 'the evidence suggests', 'a plausible explanation']
            },
            {
                domain: 'A city deciding how to respond to extreme heat',
                reading: ['If the city opens cooling centers earlier, vulnerable residents will have safer options. If officials had invested in shade ten years ago, some neighborhoods would now be better prepared.', 'The committee compares immediate, hypothetical and mixed-time consequences. Members must decide which action remains useful even if the forecast changes.'],
                chunks: ['were the city to', 'if it had not been for', 'would now be', 'otherwise', 'long-term consequence', 'low-risk option']
            },
            {
                domain: 'A newsroom explaining how a public report was produced',
                reading: ['The figures were checked by two editors before publication. Several charts had to be redesigned, and an external specialist was asked to verify the methodology. The newsroom also had the source files examined for hidden personal data.', 'The final report focuses on processes and accountability. Reporting structures distinguish confirmed findings from claims that remain under investigation.'],
                chunks: ['is believed to', 'has been reported', 'had the data checked', 'was carried out', 'accountability rests with', 'according to']
            },
            {
                domain: 'Two sources describing the same workplace policy',
                reading: ['Management described the policy as a flexibility measure, whereas employee representatives said it transferred costs to staff. Neither source used neutral language.', 'A mediator reports both positions, marks the source of each claim and separates direct evidence from interpretation. Distancing language keeps the briefing accurate without implying agreement.'],
                chunks: ['the report claims that', 'according to', 'is said to have', 'the source acknowledges', 'by contrast', 'cannot be independently verified']
            },
            {
                domain: 'A museum catalogue resolving an ambiguous description',
                reading: ['The original note referred to “a portrait of the collector with a damaged frame.” It was unclear whether the collector or the frame was damaged.', 'The editor reorganized determiners and noun groups so each modifier had one clear target. Precision improved without turning the catalogue into a list of short, disconnected sentences.'],
                chunks: ['a previously undocumented', 'the only surviving', 'a series of', 'the extent of the damage', 'both of these', 'little reliable evidence']
            },
            {
                domain: 'An editor shortening a technical briefing',
                reading: ['The first draft repeated full relative clauses in almost every sentence. The revised version used defining clauses where identification mattered and participle clauses where the relationship was already clear.', 'Information became more compact, but the editor restored full clauses whenever compression created ambiguity about time or responsibility.'],
                chunks: ['data collected in May', 'participants living nearby', 'the device, which was tested', 'having reviewed', 'the team responsible for', 'whose findings']
            },
            {
                domain: 'A professional rewriting an unnatural email',
                reading: ['The email was grammatically accurate but sounded translated. It said the team “made a decision of postponing” and “discussed about” the schedule.', 'The editor improved verb patterns, dependent prepositions and collocations: the team decided to postpone, discussed the schedule and took responsibility for notifying clients.'],
                chunks: ['take responsibility for', 'raise a concern', 'committed to improving', 'object to changing', 'reach a decision', 'account for']
            },
            {
                domain: 'A report reconstructed after its paragraphs were shuffled',
                reading: ['Readers could understand each paragraph, yet they could not follow the overall argument. Pronouns referred to several possible nouns, and connectors did not match the logical relationships.', 'The writers restored the text by tracking reference chains, replacing repeated phrases and choosing connectors for contrast, cause and concession.'],
                chunks: ['the former / the latter', 'this outcome', 'do so', 'nevertheless', 'in turn', 'with this in mind']
            },
            {
                domain: 'A public consultation about late-night transport',
                reading: ['Survey data appears to support later service, although the sample may underrepresent older passengers. The strongest demand clearly comes from hospital staff and students.', 'Speakers use hedging when evidence is limited and emphasis when a conclusion is well supported. The goal is calibrated confidence, not weak language.'],
                chunks: ['appears to', 'to some extent', 'the evidence strongly indicates', 'what matters most', 'arguably', 'there is a clear case for']
            },
            {
                domain: 'A forum choosing a location for a community center',
                reading: ['One proposal is cheaper, another is more accessible, and a third offers more space. Participants must defend priorities without treating preference as fact.', 'During the forum, each speaker responds to an objection and adjusts one claim. The final position states both the recommendation and the trade-off it accepts.'],
                chunks: ['I would argue that', 'a fair point, however', 'the main trade-off', 'on balance', 'I take your point', 'the evidence outweighs']
            },
            {
                domain: 'A debate about regulating short-term rentals',
                reading: ['Supporters argue that rentals bring income to local businesses. Critics counter that housing supply becomes less stable. Both sides cite data, but their evidence covers different time periods.', 'The chair requires every claim to be linked to evidence and every rebuttal to address the previous argument. Participants finish by identifying one area of common ground.'],
                chunks: ['the central claim', 'this is supported by', 'a possible objection', 'that argument overlooks', 'a stronger interpretation', 'common ground']
            },
            {
                domain: 'A cross-department meeting with competing priorities',
                reading: ['The design team wanted more testing time, sales wanted an earlier launch, and support requested clearer documentation. Informal language initially made two proposals sound more dismissive than intended.', 'Participants adjusted register, made conditional concessions and recorded a decision with owners and deadlines. Consensus did not mean that every preference was satisfied.'],
                chunks: ['could we explore', 'I can agree provided that', 'to put that more formally', 'our shared priority', 'shall we settle on', 'action owner']
            },
            {
                domain: 'A briefing combining a survey, a chart and two interviews',
                reading: ['The chart shows a steady rise in remote appointments, while the interviews reveal why some patients still prefer face-to-face visits. The survey adds scale but does not explain individual motives.', 'The analyst synthesizes rather than lists sources. She highlights convergence, explains a contradiction and adapts the final briefing for decision-makers.'],
                chunks: ['taken together', 'the data indicates', 'this contrasts with', 'a recurring theme', 'the sources converge', 'for this audience']
            },
            {
                domain: 'A capstone presentation followed by online and live questions',
                reading: ['The presenter must explain a proposal, integrate two sources and respond to a skeptical question. An online participant then adds information that changes one assumption.', 'Success depends on signposting, flexible reformulation and transparent use of evidence. The second attempt should be shorter, clearer and more responsive than the rehearsal.'],
                chunks: ['I will begin by', 'as the data shows', 'to address that concern', 'let me reframe', 'the updated assumption', 'my recommendation remains']
            }
        ],
        'c1-v3': [
            {
                domain: 'A memoir that moves between remembered and reconstructed time',
                reading: ['The narrator first presents the event as it felt at the time, then interrupts the account with what she has since learned. Aspect signals whether she is reliving, evaluating or distancing herself from the memory.', 'A final shift to the present reframes the episode as evidence for a broader claim. The chronology remains recoverable even when the perspective changes.'],
                chunks: ['at the time', 'would later come to', 'had been assuming', 'in retrospect', 'as I now understand it', 'the narrative lens']
            },
            {
                domain: 'An expert panel evaluating incomplete scientific evidence',
                reading: ['One finding would appear to support the hypothesis, though the sampling method may have amplified the effect. Another result is reportedly being replicated.', 'Panelists distinguish direct observation, inference and second-hand evidence. Their conclusions remain decisive enough to guide action without overstating certainty.'],
                chunks: ['would appear to', 'is reportedly', 'the evidence is consistent with', 'cannot be ruled out', 'on balance', 'warrants further scrutiny']
            },
            {
                domain: 'A keynote using marked word order to control emphasis',
                reading: ['Rarely had the organization faced such a rapid shift, and only after the pilot did leaders understand the scale of the opportunity. The speaker fronts key constraints before presenting solutions.', 'Inversion creates deliberate emphasis; it is not used merely to sound formal. Each marked structure serves the information flow and the audience’s attention.'],
                chunks: ['rarely had', 'only then did', 'not until', 'what we cannot ignore', 'at the heart of', 'under no circumstances']
            },
            {
                domain: 'A policy explanation reorganized around audience questions',
                reading: ['What residents wanted was a clear account of the trade-offs. It was the lack of consultation that had damaged trust, not the technical change itself.', 'Cleft structures place contrast where listeners expect it. The writer alternates neutral word order and marked focus to avoid theatrical repetition.'],
                chunks: ['what matters is', 'it was...that', 'the reason why', 'what the proposal does not do', 'the point at issue', 'all we are asking']
            },
            {
                domain: 'A formal report converting actions into analysable concepts',
                reading: ['The team repeatedly failed to disclose delays. In the formal version, repeated failure to disclose delays becomes a factor in the deterioration of trust.', 'Nominalisation increases density and supports abstraction, but the editor restores verbs where agency would otherwise disappear. Formality is balanced with accountability.'],
                chunks: ['the implementation of', 'a failure to', 'the gradual erosion of', 'evidence of non-compliance', 'the allocation of resources', 'responsibility for']
            },
            {
                domain: 'A research summary compressed for an executive audience',
                reading: ['Having reviewed the longitudinal data, the authors revised their initial claim. Participants recruited after the policy change showed a different pattern, the earlier sample having been less diverse.', 'Reduced and absolute clauses compress relationships that are already inferable. The editor expands them whenever subject reference or chronology could be misread.'],
                chunks: ['having examined', 'given the constraints', 'participants selected', 'the data permitting', 'all factors considered', 'when interpreted alongside']
            },
            {
                domain: 'A risk exercise with unstated conditions',
                reading: ['Were funding to be withdrawn, the pilot would have to contract. But for the volunteer network, the service would already have closed. The team also discusses consequences that follow only under tacit assumptions.', 'Participants surface those assumptions, test counterfactual chains and identify which conclusion remains robust across scenarios.'],
                chunks: ['were it to', 'had it not been for', 'but for', 'otherwise', 'assuming that', 'in the unlikely event']
            },
            {
                domain: 'A long discussion repaired through reference and omission',
                reading: ['Several speakers repeat proposals in full, while others omit so much that their replies become opaque. The chair uses substitution and reference to connect turns without unnecessary repetition.', 'Ellipsis is retained only when the missing material is easily recoverable. Cohesion supports interaction rather than showcasing compression.'],
                chunks: ['so do I', 'if necessary', 'the same applies to', 'those who do not', 'the former proposal', 'as such']
            },
            {
                domain: 'A critical review comparing incompatible source traditions',
                reading: ['One author contends that the reform was inevitable; another concedes economic pressure but disputes the timeline. A later study complicates both accounts.', 'The reviewer selects reporting verbs that represent stance accurately and builds intertextual links without flattening disagreement into a false consensus.'],
                chunks: ['contends that', 'concedes that', 'calls into question', 'builds on', 'is at odds with', 'complicates this account']
            },
            {
                domain: 'A diplomatic response to a high-stakes proposal',
                reading: ['The chair acknowledges the proposal’s ambition, narrows an overconfident claim and strengthens the one conclusion supported by all datasets.', 'Hedges calibrate uncertainty; boosters mark justified confidence. Diplomatic framing protects relationships while making disagreement unmistakable.'],
                chunks: ['there may be scope to', 'I am not entirely convinced', 'the evidence clearly demonstrates', 'with respect', 'a more measured claim', 'we strongly recommend']
            },
            {
                domain: 'An editorial choosing words for their connotations',
                reading: ['Calling a change bold can suggest courage; calling it abrupt can suggest poor judgment. Both may describe speed, but they position the reader differently.', 'Editors compare collocation, register and connotation before choosing language. Idiomaticity is treated as precise meaning in context, not decoration.'],
                chunks: ['pose a threat', 'draw a distinction', 'deeply entrenched', 'broadly consistent', 'a telling contrast', 'carry implications']
            },
            {
                domain: 'One message adapted for a colleague, a board and the public',
                reading: ['The factual core remains the same, but the internal message can be direct, the board paper must be explicit about risk, and the public notice needs accessible language.', 'The writer changes tone, density, terminology and interpersonal distance while preserving commitments and limitations.'],
                chunks: ['for your awareness', 'the board is invited to', 'in plain terms', 'subject to approval', 'we regret to inform', 'please be assured']
            },
            {
                domain: 'A complex discussion evaluating policy impact',
                reading: ['The proposal is effective by one measure and inequitable by another. Participants evaluate criteria before arguing for a conclusion, then respond to the strongest counterposition rather than an easy version of it.', 'The discussion ends with a qualified recommendation and a statement of what new evidence could change it.'],
                chunks: ['judged against', 'a compelling counterargument', 'this presupposes that', 'even so', 'a qualified endorsement', 'would alter my position']
            },
            {
                domain: 'A report combining dense legal, statistical and testimonial sources',
                reading: ['The legal text defines the permitted action, the statistics show its distribution, and interviews reveal consequences that the aggregate data obscures.', 'The mediator restructures the material around the audience’s decisions. Source boundaries remain visible, and uncertainty is not silently resolved.'],
                chunks: ['the statute provides', 'the dataset captures', 'testimony highlights', 'read in conjunction', 'a point of divergence', 'the practical implication']
            },
            {
                domain: 'A professional seminar that shifts into negotiation',
                reading: ['After presenting their findings, participants answer methodological questions, challenge assumptions and negotiate a joint next step. One remote attendee introduces a constraint that changes the proposed timeline.', 'Speakers manage turns, signal partial agreement and reformulate complex points for colleagues outside their specialty.'],
                chunks: ['may I come in here', 'to pick up on that point', 'I share the premise but', 'could you unpack', 'from an operational standpoint', 'shall we formulate']
            },
            {
                domain: 'A multiregister capstone defended before two audiences',
                reading: ['The candidate produces an analytical brief, an accessible public explanation and a live defence. Each product draws on the same sources but makes different choices about density, stance and terminology.', 'During the defence, the candidate acknowledges limitations, mediates a source conflict and revises one recommendation after a challenging question.'],
                chunks: ['the brief demonstrates', 'for a non-specialist audience', 'a limitation worth noting', 'to reconcile these accounts', 'I would revise', 'the defensible conclusion']
            }
        ]
    };

    const escapeSeed = text => String(text || '').replace(/\s+/g, ' ').trim();
    const sentenceStem = focus => focus.split(',')[0].split(' e ')[0].trim();

    function contentLesson(entry, blueprint, index) {
        const examples = blueprint.chunks.map((chunk, chunkIndex) => {
            const models = [
                `${chunk.charAt(0).toUpperCase() + chunk.slice(1)}, the team should verify the evidence before deciding.`,
                `The speaker used “${chunk}” to connect the claim to the situation.`,
                `Reframe the conclusion with ${chunk} and add one precise qualification.`
            ];
            return models[chunkIndex % models.length];
        });
        const practice = blueprint.chunks.slice(0, 6).map((chunk, itemIndex) => ({
            label: ['Complete', 'Reformulate', 'Choose by meaning'][itemIndex % 3],
            prompt: itemIndex % 3 === 0
                ? `Complete a defensible sentence using “${chunk}”.`
                : itemIndex % 3 === 1
                    ? `Reformulate this idea with “${chunk}”: The conclusion needs greater precision.`
                    : `Explain when “${chunk}” is more appropriate than a neutral alternative.`,
            answer: examples[itemIndex]
        }));
        const dialogue = [
            ['Facilitator', `What is the central issue in ${blueprint.domain.toLowerCase()}?`],
            ['Analyst', `From my perspective, the first step is to separate evidence from interpretation.`],
            ['Facilitator', `Could you make that distinction more explicit?`],
            ['Analyst', `Certainly. I would use ${blueprint.chunks[0]} to frame the claim and ${blueprint.chunks[1]} to locate the evidence.`],
            ['Facilitator', `What would change your conclusion?`],
            ['Analyst', `A reliable contradictory source would make me qualify it and explain the limitation.`]
        ];

        return {
            ...entry,
            domain: blueprint.domain,
            scenario: `You are preparing a professional response to ${blueprint.domain.toLowerCase()}.`,
            objectives: [
                `Controlar ${entry.linguisticFocus} em recepção e produção.`,
                'Recuperar colocações do contexto e reformular com precisão.',
                'Mediar informação e sustentar interação com perguntas de acompanhamento.'
            ],
            input: {
                title: blueprint.domain,
                paragraphs: blueprint.reading,
                questions: [
                    ['What is the communicative problem?', 'Separate the main facts, perspectives and purpose in the case.'],
                    ['Which language choice changes interpretation?', `The use of ${blueprint.chunks[0]} and related framing language.`],
                    ['What should the speaker do next?', 'Give a justified response and acknowledge a limitation.']
                ]
            },
            dialogue,
            language: {
                focus: entry.linguisticFocus,
                explanation: [
                    `Meaning first: identify the relationship or stance required before selecting a form related to ${sentenceStem(entry.linguisticFocus)}.`,
                    'Information flow: place familiar information where the listener can retrieve it and mark new or contrastive information deliberately.',
                    'Control check: test time reference, agency, scope and register; a grammatical sentence can still misrepresent the intended relationship.'
                ],
                examples
            },
            chunks: blueprint.chunks.map((chunk, chunkIndex) => ({
                term: chunk,
                meaning: `bloco para ${['enquadrar', 'relacionar', 'qualificar', 'contrastar', 'atribuir', 'concluir'][chunkIndex % 6]} informação`,
                example: examples[chunkIndex]
            })),
            practice,
            listening: {
                setup: 'O professor lê duas vezes. Na primeira, identifique posição e resultado; na segunda, registre evidência, ressalva e próxima ação.',
                script: `${escapeSeed(blueprint.reading[0])} The speaker then qualifies the conclusion, explains which evidence carries most weight, and proposes one action that can be revised if new information appears.`,
                questions: [
                    ['Which conclusion is presented?', 'State the conclusion in one sentence.'],
                    ['Which qualification limits it?', 'Identify the limitation or competing perspective.'],
                    ['What is the proposed next action?', 'Report the action and its condition.']
                ]
            },
            mediation: {
                sourceA: blueprint.reading[0],
                sourceB: blueprint.reading[1],
                task: 'Prepare a 75-second briefing that combines the sources, marks one contrast and preserves uncertainty.'
            },
            speaking: {
                scenario: `Respond to ${blueprint.domain.toLowerCase()} and defend a practical recommendation.`,
                rounds: ['State the issue and your initial position.', 'Respond to a skeptical question with evidence.', 'Reformulate the recommendation for a non-specialist audience.'],
                teacherFocus: `Observe controle de ${entry.linguisticFocus}, precisão lexical, coesão e capacidade de responder à contribuição do interlocutor.`
            },
            online: {
                prompt: 'Write a 90–120 word forum contribution: acknowledge one previous point, add evidence, qualify your position and ask a focused question.'
            },
            homework: `Produce a 180–230 word response to “${blueprint.domain}”. Include two target chunks, one explicit limitation and a short source-mediation note.`,
            uniquenessKey: `${entry.moduleId}-${index + 1}-${blueprint.domain}`
        };
    }

    function reviewLesson(entry, content, cumulative) {
        const chunks = [...content.chunks.slice(0, 4), ...cumulative.flatMap(item => item.chunks.slice(0, 1)).slice(-2)];
        return {
            ...entry,
            scenario: `A stakeholder needs a usable response to ${content.domain.toLowerCase()}, but you receive incomplete information and must negotiate the final outcome.`,
            input: {
                title: `Mission file: ${entry.title}`,
                paragraphs: [
                    content.input.paragraphs[0],
                    `New constraint: one source is incomplete, the deadline has moved forward, and the audience challenges the original framing. Decide what can still be stated and what must be qualified.`
                ],
                questions: content.input.questions
            },
            chunks,
            controlledPractice: content.practice.slice(0, 4),
            listening: content.listening,
            rounds: [
                {
                    title: 'Round 1 · Attempt',
                    condition: 'Use the initial brief. Ask for missing information, choose a position and present a workable response.',
                    target: '2-minute interaction with a clear outcome.'
                },
                {
                    title: 'Round 2 · Unexpected condition',
                    condition: 'The teacher changes one source, stakeholder priority or deadline. Negotiate the consequences.',
                    target: 'Acknowledge the change, test an alternative and confirm what remains valid.'
                },
                {
                    title: 'Round 3 · Second attempt',
                    condition: 'After one focused correction, repeat the performance for a different audience or register.',
                    target: 'More concise, accurate and responsive delivery.'
                }
            ],
            teacherFocus: `Record one successful strategy and one priority connected to ${content.linguisticFocus}. Correct after the first attempt, then compare the second attempt.`,
            cefrEvidence: entry.cefrObjectives.map(item => `${item.skill}: ${item.descriptor}`),
            cumulativeRecycling: cumulative.slice(-3).map(item => item.title),
            online: {
                prompt: 'Post the negotiated outcome, respond to one objection and state which point still requires verification.'
            },
            homework: 'Submit the final response plus a short reflection naming the feedback applied between attempts.'
        };
    }

    const built = {};
    Object.entries(blueprints).forEach(([moduleId, specs]) => {
        const contentById = new Map();
        const lessons = [];
        curriculum.getModule(moduleId).forEach(entry => {
            const blueprint = specs[Math.floor((entry.number - 1) / 2)];
            if (entry.number % 2 === 1) {
                const lesson = contentLesson(entry, blueprint, Math.floor((entry.number - 1) / 2));
                contentById.set(entry.id, lesson);
                lessons.push(lesson);
                return;
            }

            const reviewedContent = entry.reviewOf.map(id => contentById.get(id)).find(Boolean)
                || lessons.filter(item => item.type !== 'review').at(-1);
            lessons.push(reviewLesson(entry, reviewedContent, [...contentById.values()]));
        });
        built[moduleId] = lessons;
    });

    globalScope.AdvancedV3Lessons = built;
}(window));
