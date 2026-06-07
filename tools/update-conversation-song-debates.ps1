$ErrorActionPreference = 'Stop'

function Debate($n, $subtitle, $qs) {
    $labels = @('Personal','Reflection','Opinion','Debate')
    $styles = @('bg-green-500/20 text-green-400','bg-blue-500/20 text-blue-400','bg-purple-500/20 text-purple-400','bg-yellow-500/20 text-yellow-400')
    $icons = @('fas fa-user text-green-400','fas fa-brain text-blue-400','fas fa-comment-dots text-purple-400','fas fa-scale-balanced text-yellow-400')
    $html = "        <div class=""slide""><div class=""text-center""><h2 class=""text-4xl font-bold mb-2 text-green-500""><i class=""fas fa-comments""></i> Song $n Debate</h2><p class=""text-lg text-gray-400 mb-6 italic"">$subtitle</p><div class=""max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"">"
    for ($i = 0; $i -lt 4; $i++) {
        $html += "<div class=""debate-card""><span class=""debate-label $($styles[$i])"">$($labels[$i])</span><p class=""text-xl""><i class=""$($icons[$i]) mr-2""></i> $($qs[$i])</p></div>"
    }
    $html + "</div></div></div>"
}

$debates = @{
    '42-1' = @('Human - responsibility and limits', @(
        'The narrator keeps reminding us that mistakes are part of being human. When is that a fair explanation, and when is it an excuse?',
        'Why does the song reject the idea that one person can be a perfect prophet, expert, or authority?',
        'In a biohacking debate, how could admitting human limits make science more ethical?',
        'Should people who enhance themselves be held to higher responsibility, or are they still just human?'
    ))
    '42-2' = @('The Scientist - science, regret, and emotion', @(
        'The narrator wants to return to the beginning. What kind of mistake does that suggest?',
        'How does the song contrast scientific thinking with emotional consequences?',
        'What does the repeated difficulty of repair suggest about experimenting with human life?',
        'Can science fix a problem if the real damage is emotional or ethical?'
    ))
    '42-3' = @('Radioactive - transformation and risk', @(
        'The song presents a new beginning with dark, unstable images. Does transformation sound exciting or dangerous here?',
        'How does the feeling of waking into a changed world connect to biohacking and human enhancement?',
        'What kind of power does the narrator seem to discover, and why might that power need limits?',
        'When society enters a new technological age, who should decide what is safe?'
    ))
    '43-1' = @('The Story - scars, voice, and being known', @(
        'The narrator treats personal marks and experiences as proof of a lived story. What makes a life story believable?',
        'Why does the song feel directed to one specific listener instead of to the whole world?',
        'How does vulnerability make the speaker stronger as a storyteller?',
        'Do people need an audience to understand the meaning of their own story?'
    ))
    '43-2' = @('Fast Car - escape, hope, and cycles', @(
        'The car represents escape, but the story becomes more complicated. What is the narrator really trying to escape from?',
        'How do family responsibility and money pressure shape the choices in the song?',
        'At what point does hope turn into repeating the same painful pattern?',
        'Is this song mainly a love story, a social story, or a story about lost possibility?'
    ))
    '43-3' = @('Piano Man - characters and atmosphere', @(
        'The song introduces several people in one place. Which character seems most memorable, and why?',
        'How does the bar setting help reveal loneliness, routine, and unfinished dreams?',
        'Why does music become important for people who are not saying directly what they feel?',
        'Is the piano player only entertaining people, or is he also telling their stories?'
    ))
    '44-1' = @('Man in the Mirror - leading by changing yourself', @(
        'The song begins with the speaker noticing social problems. Why does the solution turn back toward the self?',
        'How does personal accountability become a form of leadership in the song?',
        'What is the difference between feeling sorry for the world and actually changing behavior?',
        'Can someone lead others if they refuse to examine their own habits first?'
    ))
    '44-2' = @('The Man - influence and double standards', @(
        'The narrator imagines receiving different judgment with a different public identity. What does that reveal about power?',
        'Which examples in the song show that ambition can be praised in one person and criticized in another?',
        'How does the song challenge the way society evaluates confidence, money, dating, and leadership?',
        'Can leadership ever be judged fairly if people bring hidden bias to the evaluation?'
    ))
    '44-3' = @('Heroes - courage under pressure', @(
        'The song imagines courage in a hostile place. Why can one temporary act still feel heroic?',
        'How does the image of two people standing together change the meaning of leadership?',
        'Is heroism in the song about winning, surviving, resisting, or being seen?',
        'Can a leader inspire people even if the victory is only temporary?'
    ))
    '45-1' = @('We Are The Champions - pride after struggle', @(
        'The speaker celebrates victory but also mentions mistakes and difficulty. Why does that matter?',
        'How does the song balance confidence with the memory of what it cost to win?',
        'When does public celebration become motivation, and when does it become arrogance?',
        'Does a hard journey make winning more ethical, or does fair play still matter most?'
    ))
    '45-2' = @('Hall of Fame - ambition and legacy', @(
        'The song lists many ways to become remembered. What kind of success does it value most?',
        'How does the song connect discipline, belief, and public recognition?',
        'Does the message encourage healthy ambition or pressure people to constantly prove themselves?',
        'Should a person aim for fame, impact, excellence, or personal growth?'
    ))
    '45-3' = @('Lose Yourself - pressure and opportunity', @(
        'The narrator faces one decisive opportunity. How does pressure affect his body and choices?',
        'What does the song suggest about preparation before a high-stakes moment?',
        'How does fear of failure shape the narrator''s ambition?',
        'If someone has only one chance, does that justify extreme choices?'
    ))
    '46-1' = @('Born This Way - identity and self-acceptance', @(
        'The song treats identity as something to accept rather than hide. Which identities does it defend?',
        'How does the song connect self-love with freedom from shame?',
        'Why is the message both personal and political?',
        'Can self-acceptance coexist with the desire to change and grow?'
    ))
    '46-2' = @('This Is Me - visibility after rejection', @(
        'The speaker has been hurt by judgment but refuses to disappear. What changes emotionally in the song?',
        'How does the song turn exclusion into courage and public voice?',
        'Why does being seen matter so much for identity?',
        'Is standing out always empowering, or can it also be exhausting?'
    ))
    '46-3' = @('Creep - alienation and self-image', @(
        'The narrator sees another person as special while describing himself negatively. What does that reveal about self-image?',
        'How does not fitting in become both emotional pain and identity in the song?',
        'Do you think the narrator wants acceptance, transformation, or distance?',
        'When does honest self-expression become harmful self-labeling?'
    ))
    '47-1' = @('Dont Worry Be Happy - humor as coping', @(
        'The song names everyday problems but answers them with extreme simplicity. Is that wisdom, denial, or comedy?',
        'How does the cheerful tone change the way we hear serious problems?',
        'When can laughter reduce stress without ignoring reality?',
        'Would this attitude help during conflict, or could it make people feel unheard?'
    ))
    '47-2' = @('Ironic - bad timing and comic frustration', @(
        'The song builds humor from situations that arrive at exactly the wrong time. Which type of bad luck feels most relatable?',
        'How does repetition of unfortunate examples make frustration feel funny?',
        'Do the examples need to be technically ironic, or is the emotional pattern more important?',
        'Why do people often laugh at problems only after they have survived them?'
    ))
    '47-3' = @('Always Look On The Bright Side Of Life - dark humor and optimism', @(
        'The song uses a cheerful attitude in an extremely bleak situation. Why does that contrast create humor?',
        'How does dark humor help people face fear, pain, or absurdity?',
        'Where is the line between comforting someone and making light of suffering?',
        'Can optimism be rebellious when the situation seems hopeless?'
    ))
    '48-1' = @('Brave - voice and courage', @(
        'The song focuses on words that stay trapped inside. What comfort zone is the speaker challenging?',
        'How does speaking openly become an act of personal growth?',
        'Why does the song connect courage with honesty rather than physical risk?',
        'What makes using your voice difficult when the message matters?'
    ))
    '48-2' = @('The Climb - process over destination', @(
        'The song keeps attention on the struggle instead of the final goal. Why is that important for growth?',
        'How do setbacks become part of identity rather than proof of failure?',
        'What does the mountain image suggest about patience and resilience?',
        'Should personal growth be measured by reaching the top or by continuing the climb?'
    ))
    '48-3' = @('Unwritten - possibility and reinvention', @(
        'The song presents life as an unfinished page. What kind of freedom does that image create?',
        'How does the song encourage risk without giving a detailed plan?',
        'Why does openness to the unknown matter for leaving a comfort zone?',
        'Can too much possibility be inspiring and frightening at the same time?'
    ))
}

foreach ($lesson in 42..48) {
    $path = "conversation\licao-$lesson.html"
    $lines = [System.Collections.Generic.List[string]](Get-Content $path)
    for ($i = 0; $i -lt $lines.Count; $i++) {
        for ($song = 1; $song -le 3; $song++) {
            if ($lines[$i] -match "Song $song Debate") {
                $entry = $debates["$lesson-$song"]
                $lines[$i] = Debate $song $entry[0] $entry[1]
            }
        }
    }
    [System.IO.File]::WriteAllLines((Resolve-Path $path), $lines, (New-Object System.Text.UTF8Encoding($false)))
}
