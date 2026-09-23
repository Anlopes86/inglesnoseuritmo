(function () {
'use strict';
const lexical=window.A2V3PremiumCurriculum.lessons,conversations=window.A2V3ConversationCurriculum.lessons;
const slide=(id,type,title,instruction,rest={})=>({id,type,title,kicker:type==='conversation'?'Conversation Activities':title,instruction,...rest});
const textItems=items=>(items||[]).map(x=>Array.isArray(x)?x:[x.question,x.answer]);
const expressionCards=l=>l.expressions.map(([term,pt,note,example])=>[term,pt,example||note]);
const expressionOheCards=l=>l.expressions.map(([term,meaning,note,example])=>{
 const lab=l.expressionLab?.[term];
 if(!lab)throw Error('A2 OHE expression lab missing: '+term);
 return {term,meaning,note,examples:[example,...lab.examples].filter(Boolean),promptPt:lab.promptPt,answer:lab.answer};
});
const reading=(id,title,paragraphs,items,instruction='O professor lê; depois leia e responda. Use o texto para justificar suas respostas.')=>slide(id,'reading',title,instruction,{paragraphs,items:textItems(items),translations:[]});
const hw=options=>slide('homework','homework','Take it with you.','Escolha uma opção para praticar antes do próximo encontro.',{options});
function lexicalSlides(l){
 const examples=[...l.examples,...l.vocab.map(x=>x[2]),...l.expressions.map(x=>x[3]),...l.introDialogue.map(x=>x[1]),...l.dialogues.flat().map(x=>x[1])].filter(Boolean);
 const verbCards=l.verbRows.map(([base,past,participle,pt])=>[base,pt,examples.find(s=>[base,past,participle].some(v=>s.toLowerCase().split(/[^a-z'-]+/).includes(v.toLowerCase())))||'',past+' · '+participle]);
 const groups=[{title:l.grammarTable.title,cards:l.grammarTable.rows.map(([use,form,example])=>[form,use,example])},{title:'Como usar',cards:l.grammar.map(([title,rule],i)=>[title,rule,l.examples[i]||''])},{title:'Observe estes detalhes',cards:l.helpingYou}];
 const translationPractice=slide('practice','drill',l.expressionLab?'Transfer · Say it in English':'Say it in English','Traduza as novas situações em voz alta. Elas retomam a estrutura da aula sem copiar os modelos dos flashcards.',{items:l.translations.map(x=>[x.pt,x.en])});
 const dialogueSamples=slide('dialogues','dialogue','Dialog Samples','Leiam os papéis. Depois troquem pelo menos dois detalhes da situação para criar uma nova versão do diálogo.',{lines:l.dialogues.flat(),lineTitles:Object.fromEntries(l.dialogues.map((d,i)=>[l.dialogues.slice(0,i).reduce((a,x)=>a+x.length,0),'Situation '+(i+1)]))});
 const expressionSequence=l.expressionLab
  ? [
   slide('expressions','ohe-flashcards','Key Phrases & Expressions','Observe a expressão no exemplo e formule uma hipótese. Depois vire o card, confira a explicação e experimente traduzir uma nova frase.',{kicker:'OHE · Observe · Hypothesize · Experiment',cards:expressionOheCards(l)}),
   dialogueSamples,
   translationPractice
  ]
  : [
   translationPractice,
   slide('expressions','cards','Key Phrases & Expressions','Leia os blocos completos e use dois deles em uma situação sua.',{cards:expressionCards(l)}),
   slide('expression-notes','patterns','Expressions in context','Observe as combinações e os detalhes de uso.',{cards:l.expressions.map(([front,pt,note,example])=>[front,note||pt,example||''])}),
   dialogueSamples
  ];
 return [
 slide('opening','dialogue',l.title,'Acompanhe a leitura do professor. Depois leia um dos papéis e identifique o assunto.',{lines:l.introDialogue}),
 slide('vocabulary','cards','Vocabulary Expansion','Veja os significados e os exemplos. Escolha palavras úteis para sua vida e salve as que quiser praticar.',{cards:l.vocab}),
 slide('verbs','verbs','Verb bank','Observe as formas e o uso nas frases. Ouça ou salve o verbo para praticar depois.',{cards:verbCards}),
 slide('helping','patterns','Helping You','Leia os exemplos e observe como a forma muda o sentido.',{groups}),
 ...expressionSequence,
 reading('reading',l.readingTitle,[l.reading],l.readingQuestions),
 slide('personal','conversation','Now it is about you.','Responda e explique um motivo ou exemplo. Depois faça uma pergunta ao professor.',{tasks:l.guidedConversation.questions.map((q,i)=>['Question '+(i+1),q]),goal:'Keep the conversation going.',challenge:l.guidedConversation.support.join(' · ')}),
 slide('exit','exit','What can you do now?','Escolha quanto apoio precisou. Retome uma resposta com uma dica do professor.',{checks:l.objectives.slice(0,3).map(x=>x[0].toUpperCase()+x.slice(1))}),
 hw(l.homework.map(x=>[x.option,x.kind==='writing'?'Write':x.kind==='speaking'?'Speak':'Use it in real life',x.instruction]))
 ];
}
function communicativeSlides(l){
 if(l.activities) return l.activities;
 const source=lexical[l.sourceLesson],cards=[...source.vocab,...expressionCards(source)].filter(x=>l.recycle.includes(x[0]));
 const docs=l.realWorld.documents.map(d=>d.heading+'\n'+d.body);
 const opening=slide('opening','conversation',l.title,'Observe as situações e escolha uma resposta pessoal para começar.',{tasks:l.quickStart,goal:l.outcome,challenge:l.mission});
 const recycle=slide('recycle','cards','Words you can use today','Retome as palavras da aula anterior. Use-as nas tarefas e salve as que quiser revisar.',{cards});
 const input=reading('documents',l.realWorld.title,docs,l.realWorld.questions,l.realWorld.instruction);
 const model=slide('model','dialogue',l.model.title,'O professor lê e você acompanha. Depois leiam os papéis e mudem um detalhe.',{lines:l.model.lines});
 const understanding=slide('understanding','questions','Check the conversation','Responda com as informações do diálogo e explique como encontrou a resposta.',{items:textItems(l.model.questions)});
 const roleplay=slide('roleplay','roleplay',l.rolePlay.title,l.rolePlay.instruction,{roles:l.rolePlay.roles,steps:[l.rolePlay.outcome],support:l.frames.map(x=>x[1]),model:l.challenge.model});
 const toolbox=slide('toolbox','cards','Useful phrases for the task','Consulte estes apoios durante a interação. Use-os com informações novas.',{cards:l.frames.map(([label,en,pt])=>[en,pt,label])});
 const guided=slide('follow-up','conversation','Ask, answer, follow up','Escolha perguntas que façam sentido na conversa. Troquem os papéis.',{tasks:l.guided.questions.map((q,i)=>['Question '+(i+1),q]),goal:'Develop your answer.',challenge:l.guided.followUps.join(' · ')});
 const update=l.followUp;
 const transfer=reading('new-information',update[0],[update[1]],update[2].map((q,i)=>[q,update[3][i]]),'Leia a nova mensagem e explique como ela muda a situação.');
 const final=slide('challenge','mission',l.challenge.title,l.challenge.prompt,{board:[['Your goal',l.rolePlay.outcome]],steps:l.challenge.steps,support:l.challenge.mustUse,model:l.challenge.model,surprise:update[4]});
 const exit=slide('exit','exit','Try once more.','Refaça uma parte da conversa usando o feedback do professor.',{checks:['Cumpri o objetivo da situação.','Usei palavras da aula anterior com informações novas.','Fiz uma pergunta e confirmei uma informação.']});
 // Variation follows the authored genre: documents first for decisions, conversation first for narratives.
 const narrative=[2,14,16,22,30].includes(l.sourceLesson+1);
 return [opening,recycle,...(narrative?[model,understanding,input]:[input,model,understanding]),toolbox,roleplay,transfer,guided,final,exit,hw(l.homework.map((task,i)=>[['A','B','C'][i],['Create','Prepare','Speak'][i],task]))];
}
const lessons={};
for(const m of window.V3Curriculum.getModule('a2-v3')){
 const l=m.lessonKind==='lexical'?lexical[m.number]:conversations[m.number];
 const slides=l?(m.lessonKind==='lexical'?lexicalSlides(l):communicativeSlides(l)):window.A2V3ConsolidationCurriculum.lessons[m.number];
 if(!slides)throw Error('A2 presentation missing '+m.id);
 lessons[m.number]={...m,summary:l?.outcome||m.linguisticFocus,editorialRevision:l?.editorialRevision,slides};
}
window.V3PresentationRegistry={get:n=>lessons[n]};
window.A2V3PresentationRegistry=window.V3PresentationRegistry;
}());
