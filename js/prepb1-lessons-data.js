window.PREPB1_LESSONS = [
    {
        number: 1,
        unit: "Bridge 1",
        title: "Daily Life, Preferences and Longer Answers",
        objective: "Review A1/A2 daily life language while training fuller spoken answers and basic reading interpretation.",
        cefr: "Can describe routine, preferences and simple reasons in connected everyday language.",
        focus: "Present simple, adverbs of frequency and because",
        warmup: "How does your weekday usually go, and which part of the day do you enjoy most?",
        checkpoint: [
            "Expand answers beyond one short sentence.",
            "Connect routine and preference with a reason."
        ],
        dialogueTitle: "Talking about a normal weekday",
        dialogue: [
            ["Teacher", "What does your morning usually look like?"],
            ["Student", "I usually wake up at 6:30, make coffee and check my schedule before work."],
            ["Teacher", "Do you enjoy mornings?"],
            ["Student", "Sometimes, yes. I like them because I feel more focused early in the day."]
        ],
        languageBank: [
            "I usually...",
            "Most days, I...",
            "I like it because...",
            "In the evening, I normally..."
        ],
        readingTitle: "Camila's weekday routine",
        reading: [
            "Camila works at a small clinic and studies English three evenings a week. On weekdays, she usually wakes up before 7 a.m. and leaves home at 8. Her job starts at 9, but she likes to arrive a little early because she feels calmer when she has time to organize her desk.",
            "At lunchtime, Camila often eats with two coworkers. They usually talk about patients, family plans or weekend ideas. After work, she does not go home immediately on Mondays, Wednesdays and Fridays. On those days, she stays in a quiet room at the clinic for her online English class.",
            "Camila says the classes are tiring after a full day of work, but they are also motivating. She can already understand more short texts and answer simple questions with more confidence. Her next goal is to speak for longer without stopping so much."
        ],
        comprehension: [
            {
                question: "Why does Camila like to arrive early at work?",
                options: [
                    "Because her coworkers always arrive late.",
                    "Because she feels calmer when she has time to organize.",
                    "Because she starts work before 8 a.m."
                ],
                correctIndex: 1,
                feedback: "The text says she likes to arrive early because she feels calmer when she can organize her desk first."
            },
            {
                question: "What does Camila do three evenings a week?",
                options: [
                    "She takes online English classes.",
                    "She visits her family.",
                    "She works extra hours at the clinic."
                ],
                correctIndex: 0,
                feedback: "The reading explains that on Mondays, Wednesdays and Fridays she stays for her online English class."
            },
            {
                question: "What is Camila's next goal?",
                options: [
                    "To change jobs soon.",
                    "To stop studying at night.",
                    "To speak for longer with fewer pauses."
                ],
                correctIndex: 2,
                feedback: "At the end, the text says her next goal is to speak for longer without stopping so much."
            }
        ],
        responseBuilder: [
            {
                prompt: "Compare your routine with Camila's. What is similar and what is different?",
                tip: "Use at least one sentence with usually and one with but.",
                placeholder: "Write 3-4 sentences comparing your routine with hers.",
                model: "My routine is similar because I also start my day early and I like to organize my tasks before work. However, I do not study after work three times a week. I usually study at home, but I also want to speak more confidently."
            },
            {
                prompt: "Why is it important to answer questions with more detail at this level?",
                tip: "Mention communication, clarity or confidence.",
                placeholder: "Explain your idea in 2-3 complete sentences.",
                model: "It is important because longer answers help the other person understand me better. They also show that I can connect ideas, not only say isolated words or very short sentences."
            }
        ],
        speakingTask: {
            title: "Describe your real weekday",
            steps: [
                "Describe your morning, afternoon and evening.",
                "Say one part you enjoy and one part that is difficult.",
                "Give at least two reasons using because, so or but."
            ],
            model: "On weekdays, I usually start early because I like calm mornings. In the afternoon, I feel busy, but in the evening I try to study or relax for a while. This routine is not perfect, but it helps me stay organized."
        },
        homework: "Prepare a short spoken routine report with 6 to 8 sentences about a normal weekday and a normal weekend day.",
        celebration: "This first bridge lesson pushes the learner to turn familiar A1 routine language into fuller, more natural A2-style communication."
    },
    {
        number: 2,
        unit: "Bridge 1",
        title: "Past Events, Experiences and Personal Stories",
        variant: "compare_lab",
        objective: "Review past simple and basic experience language from A2 while practicing longer retelling and reading comprehension.",
        cefr: "Can describe past events and simple experiences in a connected sequence.",
        focus: "Past simple, time markers and simple experience talk",
        warmup: "Tell me about a day that was different from your normal routine.",
        checkpoint: [
            "Organize a short story in a clear order.",
            "Use past markers like first, then, after that and finally."
        ],
        dialogueTitle: "Remembering an unusual day",
        dialogue: [
            ["Teacher", "What happened on your most stressful day last month?"],
            ["Student", "I missed the bus, arrived late to work and had three urgent tasks before lunch."],
            ["Teacher", "How did the day finish?"],
            ["Student", "It finished better than I expected because I solved the main problem before the end of the day."]
        ],
        languageBank: [
            "First...",
            "Then...",
            "After that...",
            "In the end..."
        ],
        compareTitle: "Two ways to tell a past event",
        compareCards: [
            {
                label: "Version A",
                summary: "A clearer story with order, feeling and result.",
                points: [
                    "Uses time markers like first, then and in the end.",
                    "Includes one problem and how it changed.",
                    "Feels easier for the listener to follow."
                ]
            },
            {
                label: "Version B",
                summary: "A less clear story with missing order and fewer links.",
                points: [
                    "Jumps between ideas too quickly.",
                    "Does not explain the result very well.",
                    "Needs more connectors and better sequence."
                ]
            }
        ],
        readingTitle: "Rafael's first day in a new job",
        reading: [
            "Last month, Rafael started a new job at a language school. He felt nervous on the first day because he did not know the team well and the school was larger than he expected. He arrived early, but he still got confused when he tried to find the teachers' room.",
            "A receptionist helped him, and after a few minutes he finally met the coordinator. During the morning, Rafael observed two classes, took notes and introduced himself to some students. At lunchtime, he sat with other teachers and felt more relaxed because everyone was friendly and open.",
            "In the afternoon, Rafael taught a short conversation activity for the first time. He made one small mistake with the instructions, but he corrected it quickly and the class went well. When he went home, he still felt tired, but he also felt proud because the day was difficult and successful at the same time."
        ],
        comprehension: [
            {
                question: "Why was Rafael nervous at the beginning of the day?",
                options: [
                    "Because he had to teach a full class immediately.",
                    "Because he did not know the team and the school was bigger than expected.",
                    "Because the receptionist was not helpful."
                ],
                correctIndex: 1,
                feedback: "The text explains that he felt nervous because he did not know the team well and the school was larger than he expected."
            },
            {
                question: "What helped Rafael feel more relaxed?",
                options: [
                    "Lunch with the other teachers.",
                    "Leaving work early.",
                    "Teaching the whole afternoon alone."
                ],
                correctIndex: 0,
                feedback: "At lunchtime he sat with other teachers, and that made him feel more relaxed."
            },
            {
                question: "How does the text describe the end of the day?",
                options: [
                    "Only negative.",
                    "Easy and calm.",
                    "Difficult but also successful."
                ],
                correctIndex: 2,
                feedback: "The final paragraph says he felt proud because the day was difficult and successful at the same time."
            }
        ],
        responseBuilder: [
            {
                prompt: "Why is Rafael's story a good example of an A2 learner text?",
                tip: "Think about sequence, feelings and simple detail.",
                placeholder: "Write 3 sentences about how the story is organized.",
                model: "It is a good A2 text because the story is clear and follows a simple order. It includes feelings, actions and details without becoming too complex. The reader can understand what happened and why it mattered."
            },
            {
                prompt: "Describe a first day, first class or first experience in your own life.",
                tip: "Use at least four time markers.",
                placeholder: "Write a short personal story here.",
                model: "First, I felt very nervous because everything was new. Then I met the people around me and started to feel calmer. After that, I understood what I needed to do. In the end, I was tired but happy because I learned a lot."
            }
        ],
        voiceNoteTitle: "Build a short audio story step by step",
        voiceNoteSteps: [
            {
                prompt: "Part 1: Start the story clearly.",
                placeholder: "Last month / last year / one day..."
            },
            {
                prompt: "Part 2: Explain the main event or problem.",
                placeholder: "First..., then..., after that..."
            },
            {
                prompt: "Part 3: Finish with the result and feeling.",
                placeholder: "In the end..., I felt..."
            }
        ],
        speakingTask: {
            title: "Tell a short personal story",
            steps: [
                "Choose one real event from school, work, family or travel.",
                "Tell it in order with 5 to 7 sentences.",
                "Include one problem, one feeling and one result."
            ],
            model: "Last year, I had my first online presentation. First, I prepared my notes and checked my internet connection. Then, I felt nervous when I started speaking, but after a minute I felt more comfortable. In the end, the presentation went well and I felt proud."
        },
        homework: "Write and practice one short story called A difficult day that ended well.",
        celebration: "This review helps the learner move from isolated past tense sentences to a clearer mini narrative."
    },
    {
        number: 3,
        unit: "Bridge 1",
        title: "Plans, Invitations and Future Arrangements",
        objective: "Review invitations, plans and future language from A2 in more realistic conversation and reading tasks.",
        cefr: "Can discuss near-future plans, arrangements and invitations in practical contexts.",
        focus: "Going to, present continuous and invitation language",
        warmup: "What are you doing this week, and what are you going to do next month?",
        checkpoint: [
            "Distinguish a clear arrangement from a personal intention.",
            "Accept or refuse an invitation politely."
        ],
        dialogueTitle: "Making and changing plans",
        dialogue: [
            ["Teacher", "Are you doing anything after class on Friday?"],
            ["Student", "Yes, I am meeting a friend for dinner, but I am free earlier."],
            ["Teacher", "Great. We are going to review speaking questions at 5. Do you want to join?"],
            ["Student", "Yes, that sounds good. If possible, I will stay for about an hour."]
        ],
        languageBank: [
            "Are you free...?",
            "I am meeting...",
            "I am going to...",
            "That sounds good."
        ],
        readingTitle: "A message about weekend plans",
        reading: [
            "Hi Laura, I hope you are well. I am writing because our plans for Saturday need a small change. We are still going to visit the outdoor market in the morning, but we are meeting a little later than before. Instead of 9:00, we are meeting at 10:30 near the main entrance.",
            "After that, we are probably going to have lunch at the new cafe across the street. I checked the menu online, and it looks simple and affordable. In the afternoon, I am helping my sister move to a new apartment, so I cannot stay out too long.",
            "If you are still interested, please send me a message tonight. If Saturday is difficult for you now, no problem. We can reschedule and do the same plan next weekend."
        ],
        comprehension: [
            {
                question: "What changed in the original plan?",
                options: [
                    "The place changed completely.",
                    "The meeting time became later.",
                    "The lunch was cancelled."
                ],
                correctIndex: 1,
                feedback: "The message says they are still going to the market, but they are meeting later than before."
            },
            {
                question: "Why can't the writer stay out too long?",
                options: [
                    "Because there is another family plan in the afternoon.",
                    "Because the cafe is expensive.",
                    "Because the market closes early."
                ],
                correctIndex: 0,
                feedback: "In the afternoon, the writer is helping a sister move to a new apartment."
            },
            {
                question: "What solution does the writer offer if Saturday is difficult?",
                options: [
                    "Meet on Sunday morning.",
                    "Cancel everything.",
                    "Reschedule for next weekend."
                ],
                correctIndex: 2,
                feedback: "The final paragraph offers to reschedule and do the same plan next weekend."
            }
        ],
        responseBuilder: [
            {
                prompt: "Write a short reply to accept the invitation but ask one question.",
                tip: "Keep your tone friendly and practical.",
                placeholder: "Write your reply here.",
                model: "Hi, thanks for the update. Saturday at 10:30 works for me, and I would love to join you. Should I meet you exactly at the main entrance or near the cafe?"
            },
            {
                prompt: "Write a different reply to refuse politely and suggest a new day.",
                tip: "Use sorry, but and can we...?",
                placeholder: "Write your reply here.",
                model: "Hi, thanks for inviting me. I am sorry, but I already have plans on Saturday morning. Can we do the same plan next Sunday or next weekend instead?"
            }
        ],
        speakingTask: {
            title: "Plan something with a partner",
            steps: [
                "Invite someone to a simple activity.",
                "Mention one arrangement and one intention.",
                "Change one detail and solve the new plan together."
            ],
            model: "I am meeting a friend on Saturday, but I am going to finish early. Do you want to have coffee after that? If 5 is too early, we can meet at 6 instead."
        },
        homework: "Prepare one invitation, one polite refusal and one rescheduling message for class.",
        celebration: "The learner is now reviewing familiar future language in a more flexible, real-life way."
    },
    {
        number: 4,
        unit: "Bridge 1",
        title: "Around Town, Directions and Small Problems",
        variant: "service_lab",
        objective: "Review places in town, directions, requests and practical problem-solving with longer reading and response tasks.",
        cefr: "Can ask for help, describe location and deal with simple practical problems in everyday settings.",
        focus: "There is/are, imperatives, requests and directions",
        warmup: "What do you usually say when you are lost or cannot find a place?",
        checkpoint: [
            "Use location language clearly.",
            "Explain a problem and ask for practical help."
        ],
        dialogueTitle: "Finding the right place",
        dialogue: [
            ["Teacher", "Excuse me, is there a bank near here?"],
            ["Student", "Yes, there is one on the next street, across from the pharmacy."],
            ["Teacher", "How do I get there?"],
            ["Student", "Go straight, turn left at the corner and walk for about two minutes."]
        ],
        languageBank: [
            "Go straight",
            "Turn left/right",
            "next to / across from",
            "Could you help me?"
        ],
        serviceMovesTitle: "Four useful moves when you are lost or confused",
        serviceMoves: [
            {
                step: "Say where you want to go",
                use: "Start with the place you need to find.",
                example: "Excuse me, I am trying to find the language school."
            },
            {
                step: "Explain the problem briefly",
                use: "Say what is confusing or what went wrong.",
                example: "I think I am on the wrong street."
            },
            {
                step: "Ask for clear help",
                use: "Use a direct but polite request.",
                example: "Could you tell me how to get there, please?"
            },
            {
                step: "Confirm what you heard",
                use: "Repeat the main steps so you can check them.",
                example: "So I cross the avenue and go straight for one block, right?"
            }
        ],
        readingTitle: "A problem on the way to class",
        reading: [
            "On Tuesday evening, Bruno was on his way to an English class in a new part of the city. He left work on time and checked the address on his phone before getting on the bus. At first, everything seemed easy. However, when he got off, he noticed that the street names around him were different from the names on the map.",
            "Bruno walked for ten minutes and became more confused. He finally stopped near a bakery and asked a woman for help. She explained that he was close, but on the wrong side of the avenue. She told him to cross at the traffic light, go straight for one block and look for a blue building next to a gym.",
            "Bruno followed the directions and found the building. He arrived a few minutes late, but he still entered the class. Later, he said that the situation was stressful, but useful, because he had to listen carefully, ask questions and confirm information in a real context."
        ],
        comprehension: [
            {
                question: "Why did Bruno become confused?",
                options: [
                    "Because his phone battery died immediately.",
                    "Because the street names around him did not match what he expected.",
                    "Because the bakery was closed."
                ],
                correctIndex: 1,
                feedback: "The reading says he saw different street names around him, which made him confused."
            },
            {
                question: "What helped Bruno solve the problem?",
                options: [
                    "He asked someone nearby and followed detailed directions.",
                    "He took another bus home.",
                    "He called the teacher and cancelled."
                ],
                correctIndex: 0,
                feedback: "He asked a woman for help, listened to her directions and then found the building."
            },
            {
                question: "Why does the text call the situation useful?",
                options: [
                    "Because it gave Bruno real practice with listening and asking for help.",
                    "Because Bruno decided to move to that area.",
                    "Because the class finished early."
                ],
                correctIndex: 0,
                feedback: "The last paragraph says it was useful because he had to listen carefully, ask questions and confirm information."
            }
        ],
        responseBuilder: [
            {
                prompt: "What should Bruno say if he wants to confirm the directions before walking away?",
                tip: "Use So I..., right? or Let me check...",
                placeholder: "Write 2-3 confirmation questions.",
                model: "Let me check if I understood. I cross at the traffic light, go straight for one block and then look for a blue building next to a gym, right?"
            },
            {
                prompt: "Describe a time when you needed help to find a place or solve a small problem.",
                tip: "Mention the place, the problem and the solution.",
                placeholder: "Write your short description here.",
                model: "Once I needed to find a clinic in a part of town I did not know. I got confused near the bus stop, so I asked a shop assistant for help. She explained the route clearly, and I arrived a little late but without bigger problems."
            }
        ],
        scriptTitle: "Build two short help-seeking scripts",
        scriptPrompts: [
            {
                prompt: "Write a script for asking directions to a school, clinic or bank.",
                tip: "Include the place and one question.",
                placeholder: "Excuse me, I need to find...",
                model: "Excuse me, I need to find the language school near this avenue. Could you tell me how to get there, please?"
            },
            {
                prompt: "Write a script for confirming directions after someone helps you.",
                tip: "Repeat the route in a short, clear way.",
                placeholder: "So I go..., then...",
                model: "So I go straight to the traffic light, turn left and look for the blue building next to the gym, right?"
            }
        ],
        speakingTask: {
            title: "Explain a route and a problem",
            steps: [
                "Describe where a place is.",
                "Give clear directions with at least three steps.",
                "Add one problem and explain how to solve it."
            ],
            model: "The language school is near the library, across from a small cafe. Go straight from the station, turn right at the second corner and walk until you see the blue building. If you reach the supermarket, you went too far, so go back one block."
        },
        homework: "Create a mini map description of your neighborhood with one place, one route and one possible problem.",
        celebration: "This lesson turns classic A1/A2 city vocabulary into more useful problem-solving communication."
    },
    {
        number: 5,
        unit: "Bridge 2",
        title: "Food, Health and Everyday Advice",
        objective: "Review food, habits, health vocabulary and simple advice while asking for more complete responses.",
        cefr: "Can describe habits, basic health situations and simple advice in connected everyday language.",
        focus: "Should, some/any, habits and health language",
        warmup: "What do you do when you feel tired, stressed or unhealthy for a few days?",
        checkpoint: [
            "Describe a habit and its effect.",
            "Give practical advice with simple reasons."
        ],
        dialogueTitle: "Talking about small health habits",
        dialogue: [
            ["Teacher", "What do you usually do when you feel low on energy?"],
            ["Student", "I try to sleep earlier, drink more water and eat something lighter."],
            ["Teacher", "Do those changes help?"],
            ["Student", "Yes, they usually help because my routine becomes more balanced."]
        ],
        languageBank: [
            "You should...",
            "I usually try to...",
            "It helps because...",
            "I need to improve..."
        ],
        readingTitle: "A short blog post about healthier routines",
        reading: [
            "Many people think healthy routines need to be perfect, but that idea often causes frustration. In reality, small habits are usually easier to keep. For example, drinking more water, preparing simple meals at home and walking for twenty minutes can already make a difference in daily energy.",
            "One office worker named Daniela decided to change only three things for one month. First, she stopped skipping breakfast. Second, she prepared lunch at home three times a week. Third, she walked after dinner when possible. She said the changes were not dramatic, but they helped her feel more active and less stressed.",
            "Daniela also learned an important lesson: progress is easier when the plan is realistic. She did not try to change everything at once. Instead, she chose habits that fit her real schedule. Because of that, the routine became more stable and less stressful."
        ],
        comprehension: [
            {
                question: "What is the main idea of the text?",
                options: [
                    "Healthy routines only work with strict rules.",
                    "Small realistic habits can be more effective than big perfect plans.",
                    "People should always cook every meal at home."
                ],
                correctIndex: 1,
                feedback: "The reading argues that small, realistic habits are easier to keep and can still help a lot."
            },
            {
                question: "Which change was NOT one of Daniela's three habits?",
                options: [
                    "Stopping skipping breakfast.",
                    "Going to the gym every day.",
                    "Walking after dinner when possible."
                ],
                correctIndex: 1,
                feedback: "She changed breakfast, lunch and walking habits. The text does not say she went to the gym every day."
            },
            {
                question: "Why did Daniela's plan become more stable?",
                options: [
                    "Because it matched her real schedule.",
                    "Because it was very strict.",
                    "Because a doctor created it for her."
                ],
                correctIndex: 0,
                feedback: "The final paragraph says her routine became more stable because she chose habits that fit her real schedule."
            }
        ],
        responseBuilder: [
            {
                prompt: "Give Daniela one more realistic suggestion.",
                tip: "Use should and keep it practical.",
                placeholder: "Write one suggestion with a reason.",
                model: "Daniela should prepare a short shopping list before the week starts because that can make healthy meals easier to organize."
            },
            {
                prompt: "Which small health habit would be easiest for you to improve now?",
                tip: "Name the habit and explain why it is realistic.",
                placeholder: "Write 3-4 sentences.",
                model: "For me, the easiest habit to improve would be drinking more water during the day. It is realistic because I can keep a bottle near me at work. It is a small change, but I think it would help my energy and focus."
            }
        ],
        speakingTask: {
            title: "Talk about one realistic healthy change",
            steps: [
                "Describe your current habit.",
                "Say what you want to improve.",
                "Give one realistic plan and one reason."
            ],
            model: "Right now, I often eat too quickly during busy days. I want to improve that because I feel better when my meals are calmer. A realistic plan is to prepare something simple at home two or three times a week."
        },
        homework: "Write a simple one-week health plan with three realistic actions and short reasons.",
        celebration: "This review keeps the language accessible while pushing the learner to justify advice and habits more clearly."
    },
    {
        number: 6,
        unit: "Bridge 2",
        title: "Study, Work and Communication Routines",
        variant: "compare_lab",
        objective: "Review A2 language for study, work, ability and obligation with more detailed speaking and reading tasks.",
        cefr: "Can describe study and work routines, obligations and preferences in familiar contexts.",
        focus: "Can, have to, comparative ideas and work-study vocabulary",
        warmup: "What makes a study or work routine productive for you?",
        checkpoint: [
            "Describe what you can do and what you have to do.",
            "Compare routines and explain what works better."
        ],
        dialogueTitle: "Talking about study and work balance",
        dialogue: [
            ["Teacher", "What do you have to do every week for work or study?"],
            ["Student", "I have to answer messages, organize my schedule and review materials before meetings."],
            ["Teacher", "What helps you work better?"],
            ["Student", "A clear plan helps because I can focus more and waste less time."]
        ],
        languageBank: [
            "I have to...",
            "I can...",
            "It works better because...",
            "Compared with..."
        ],
        compareTitle: "Two ways to study and work",
        compareCards: [
            {
                label: "Routine A",
                summary: "Short daily study with more regular contact.",
                points: [
                    "Helps create consistency during the week.",
                    "Feels easier to include in busy schedules.",
                    "May be better for memory and habit-building."
                ]
            },
            {
                label: "Routine B",
                summary: "Longer weekend sessions with fewer interruptions.",
                points: [
                    "Creates more time for long reading or projects.",
                    "May feel calmer for some learners.",
                    "Needs discipline to avoid skipping the session."
                ]
            }
        ],
        readingTitle: "Two students, two routines",
        reading: [
            "Marcos and Julia are both studying English while working full time, but their routines are very different. Marcos studies for forty minutes every night from Monday to Friday. He likes this plan because it is regular, and he says short daily practice helps him remember more.",
            "Julia does not study every day. Instead, she prefers two long sessions on Saturday and Sunday. During the week, she only reviews flashcards for a few minutes when she has free time. She likes weekend study because she feels less rushed and can read longer texts more calmly.",
            "Both routines have strong points. Marcos has more consistency during the week, while Julia has more time for deeper practice at the weekend. Their teacher says the best routine depends on the student's energy, schedule and ability to stay consistent over time."
        ],
        comprehension: [
            {
                question: "What is one advantage of Marcos's routine?",
                options: [
                    "He can read longer texts every night.",
                    "He studies with more regularity.",
                    "He has more free weekends."
                ],
                correctIndex: 1,
                feedback: "The text says Marcos likes his routine because it is regular and helps him remember more."
            },
            {
                question: "Why does Julia prefer weekend study?",
                options: [
                    "Because she feels less rushed and can read longer texts.",
                    "Because she does not work on weekends.",
                    "Because she dislikes flashcards."
                ],
                correctIndex: 0,
                feedback: "The text explains that Julia likes weekend study because she feels less rushed and can read more calmly."
            },
            {
                question: "What is the teacher's main conclusion?",
                options: [
                    "Daily study is always better.",
                    "Weekend study is always more efficient.",
                    "The best routine depends on the learner's real situation."
                ],
                correctIndex: 2,
                feedback: "The teacher says the best routine depends on energy, schedule and consistency."
            }
        ],
        responseBuilder: [
            {
                prompt: "Which routine is closer to yours: Marcos's or Julia's?",
                tip: "Compare your reality with one of them.",
                placeholder: "Write 3-4 sentences.",
                model: "My routine is closer to Marcos's because I prefer shorter and more regular study sessions. They are easier to include during the week, even when I am busy. However, I also need some longer reading practice like Julia's plan."
            },
            {
                prompt: "What do you have to do to keep your routine working?",
                tip: "Use have to at least twice.",
                placeholder: "Write your answer here.",
                model: "I have to plan my week in advance, and I have to protect a small study time from other tasks. I also have to keep the routine realistic, or I stop following it after a few days."
            }
        ],
        voiceNoteTitle: "Build a short voice message about your ideal routine",
        voiceNoteSteps: [
            {
                prompt: "Open your message: describe your current reality.",
                placeholder: "Right now, my routine is..."
            },
            {
                prompt: "Compare two possibilities for yourself.",
                placeholder: "Compared with..., I think..."
            },
            {
                prompt: "Close with a realistic decision.",
                placeholder: "For me, the best plan is..."
            }
        ],
        speakingTask: {
            title: "Explain your ideal study routine",
            steps: [
                "Say what you can do well now.",
                "Say what you still have to improve.",
                "Explain which routine would work best for you and why."
            ],
            model: "I can understand more than before, but I still have to improve my speaking speed. For me, a short routine during the week works best because it fits my schedule better. I also need one longer session at the weekend for reading and review."
        },
        homework: "Create your own balanced study plan for one week and bring it to class to explain it.",
        celebration: "This lesson prepares the learner to talk about responsibilities and strategies more clearly before B1."
    },
    {
        number: 7,
        unit: "Bridge 2",
        title: "Travel, Service Situations and Practical English",
        objective: "Review common A1/A2 travel and service language in more connected reading and speaking tasks.",
        cefr: "Can manage simple travel, hotel and service situations with enough clarity for practical needs.",
        focus: "Requests, past travel description and practical problem-solving",
        warmup: "What do you usually need when you travel or stay in a new place?",
        checkpoint: [
            "Ask clearly for information or help.",
            "Explain a practical problem and respond politely."
        ],
        dialogueTitle: "At the hotel desk",
        dialogue: [
            ["Teacher", "Good evening. How can I help you?"],
            ["Student", "Hi. I booked a room for two nights, but I think there is a problem with the reservation."],
            ["Teacher", "Can you tell me your name, please?"],
            ["Student", "Of course. It is under Lucas Almeida. I also wanted to ask if breakfast is included."]
        ],
        languageBank: [
            "I booked...",
            "There seems to be a problem...",
            "Could you check...?",
            "Is ... included?"
        ],
        readingTitle: "A travel diary with a small problem",
        reading: [
            "Last holiday, Fernanda visited another city for a short weekend trip. She booked a simple hotel in the center because she wanted to walk to most places. On the first day, everything went well. She visited a museum, had lunch in a local restaurant and took many photos in the historic area.",
            "The only problem happened at night. When Fernanda returned to the hotel, the key card did not open the room door. She went back to reception and explained the situation calmly. The receptionist checked the system, apologized and gave her a new card immediately.",
            "Fernanda said the problem was small, but the situation was still useful. She had to explain what happened, answer questions and understand the solution in English. For her, travel is not only enjoyable, but also a good chance to practice practical communication."
        ],
        comprehension: [
            {
                question: "Why did Fernanda choose a hotel in the center?",
                options: [
                    "Because it was the cheapest in the city.",
                    "Because she wanted to walk to most places.",
                    "Because her friends stayed there."
                ],
                correctIndex: 1,
                feedback: "The reading says she chose that hotel because she wanted to walk to most places."
            },
            {
                question: "What was the travel problem?",
                options: [
                    "She lost her passport.",
                    "The restaurant was closed.",
                    "Her key card did not open the room door."
                ],
                correctIndex: 2,
                feedback: "The text clearly says the key card did not open the room door."
            },
            {
                question: "What lesson did Fernanda take from the experience?",
                options: [
                    "Travel is useful for practicing real communication.",
                    "It is better not to stay in hotels.",
                    "She should avoid speaking English when stressed."
                ],
                correctIndex: 0,
                feedback: "The final paragraph says travel is enjoyable and also a chance to practice practical communication."
            }
        ],
        responseBuilder: [
            {
                prompt: "What should Fernanda say at the reception desk in this situation?",
                tip: "Be polite, clear and direct.",
                placeholder: "Write a short service interaction.",
                model: "Hi, sorry, but my key card is not working. I tried it twice, and the room door did not open. Could you check the reservation and help me, please?"
            },
            {
                prompt: "Why are travel situations useful for an English learner?",
                tip: "Mention real needs, confidence or quick thinking.",
                placeholder: "Write 2-4 connected sentences.",
                model: "Travel situations are useful because they create real communication needs. You have to ask, explain, understand and solve small problems. That can build confidence faster than only studying isolated sentences."
            }
        ],
        speakingTask: {
            title: "Role-play a travel problem",
            steps: [
                "Choose a practical problem in a hotel, airport, bus station or restaurant.",
                "Explain the problem politely.",
                "Ask for a solution and respond to the answer."
            ],
            model: "Excuse me, I think there is a mistake with my reservation. I booked a single room for two nights, but I cannot find my name here. Could you check again, please? If necessary, I can show the confirmation on my phone."
        },
        homework: "Write one short role-play for a travel or service problem and practice both sides of the conversation.",
        celebration: "This bridge lesson gives the learner a practical review of real-world English before B1 demands become more varied."
    },
    {
        number: 8,
        unit: "Final Review",
        title: "Bridge Review Project: Read, Speak and Respond",
        variant: "final_bridge",
        objective: "Integrate A1/A2 language in a final bridge lesson with reading, interpretation and connected speaking before B1.",
        cefr: "Can combine familiar language from A1/A2 to read, respond and speak with growing control.",
        focus: "Integrated review of routine, past, plans, opinions and practical language",
        warmup: "What can you already do in English that was difficult for you at the beginning of A1 or A2?",
        checkpoint: [
            "Move between past, present and future more naturally.",
            "Support your answers with simple detail and examples."
        ],
        dialogueTitle: "Looking back before B1",
        dialogue: [
            ["Teacher", "How has your English changed from A1 to now?"],
            ["Student", "Now I can read more, answer with more detail and talk about my plans and experiences more clearly."],
            ["Teacher", "What still feels challenging?"],
            ["Student", "Longer speaking still feels hard sometimes, but I am much more confident than before."]
        ],
        languageBank: [
            "Before, I...",
            "Now, I can...",
            "My next step is...",
            "One example is..."
        ],
        checkTitle: "Mark the things that feel more possible now",
        canDoChecklist: [
            "I can answer personal and routine questions with more than one short sentence.",
            "I can describe a past event in order with simple details.",
            "I can explain plans or invitations with more clarity.",
            "I can understand a longer A2-level text and find the main idea.",
            "I can ask for help and explain simple problems in real situations.",
            "I can speak for a little longer without stopping after every sentence."
        ],
        readingTitle: "Ana's path from beginner to bridge review",
        reading: [
            "When Ana started studying English, she could only answer very basic personal questions. She could say her name, job and a few daily activities, but she often stopped after one short sentence. During A1, she learned how to describe routines, preferences, family members, places and simple needs.",
            "In A2, Ana became more flexible. She started to talk about past events, future plans, comparisons, travel situations and short opinions. She still made mistakes, of course, but her communication became more useful. Instead of saying only small isolated answers, she began to connect ideas with because, but, then, so and other simple linkers.",
            "Now Ana is doing a review module before B1. Her teacher says this step is important because B1 asks for more independence in reading and speaking. The goal is not to add a lot of difficult grammar immediately. The goal is to make old language stronger, so longer answers and longer texts become less stressful."
        ],
        comprehension: [
            {
                question: "What was Ana able to do at the beginning?",
                options: [
                    "Discuss abstract topics in detail.",
                    "Answer only very basic personal questions.",
                    "Read long articles with confidence."
                ],
                correctIndex: 1,
                feedback: "The first paragraph says she could only answer basic personal questions at the start."
            },
            {
                question: "What changed during A2?",
                options: [
                    "She stopped making mistakes completely.",
                    "She became more flexible and could connect ideas better.",
                    "She focused only on grammar exercises."
                ],
                correctIndex: 1,
                feedback: "The second paragraph explains that in A2 she became more flexible and started connecting ideas with simple linkers."
            },
            {
                question: "What is the purpose of this bridge module?",
                options: [
                    "To replace B1 entirely.",
                    "To add many difficult grammar rules immediately.",
                    "To strengthen known language before the learner enters B1."
                ],
                correctIndex: 2,
                feedback: "The final paragraph says the goal is to make old language stronger before B1."
            }
        ],
        responseBuilder: [
            {
                prompt: "Why is a bridge module useful before B1?",
                tip: "Mention confidence, longer answers, reading or stability.",
                placeholder: "Write your reflection here.",
                model: "A bridge module is useful because it strengthens what the learner already knows before the next level becomes more demanding. It helps with confidence, longer answers and reading comprehension, so the transition to B1 feels more natural."
            },
            {
                prompt: "Describe your own progress from beginner until now.",
                tip: "Use before, now and next.",
                placeholder: "Write 4-6 connected sentences.",
                model: "Before, I could answer only very short questions and I needed more help. Now, I can talk more about my routine, my plans and some past experiences with better organization. I still want to improve my speaking fluency, and my next step is to give longer answers with more confidence."
            }
        ],
        finalBuildTitle: "Prepare your final bridge talk in three parts",
        finalBuildSteps: [
            {
                prompt: "Part 1: Before",
                tip: "Say what was difficult for you at the beginning.",
                placeholder: "At the beginning, I..."
            },
            {
                prompt: "Part 2: Now",
                tip: "Give 2 or 3 examples of what you can do now.",
                placeholder: "Now, I can..."
            },
            {
                prompt: "Part 3: Next",
                tip: "Say what you want to improve before B1.",
                placeholder: "Before B1, I want to..."
            }
        ],
        speakingTask: {
            title: "Mini final bridge presentation",
            steps: [
                "Say what you could do before.",
                "Say what you can do now with examples.",
                "Say what you want to improve before entering B1."
            ],
            model: "At the beginning, I could answer only simple personal questions. Now, I can read short texts, describe my routine, talk about past events and explain some plans more clearly. Before B1, I want to become more confident with longer speaking answers and reading interpretation."
        },
        homework: "Prepare a one-minute transition talk called From A2 to B1 and bring it ready to present.",
        celebration: "This final bridge lesson closes the gap between review and progression, giving the learner a calmer and more coherent entry into B1."
    }
];
