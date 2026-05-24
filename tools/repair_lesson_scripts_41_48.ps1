$ErrorActionPreference = 'Stop'

$base = Get-Content -Raw 'conversation\licao-40.html'
$script40 = [regex]::Match($base, "<script>document\.addEventListener\('DOMContentLoaded'.*?</script>", 'Singleline').Value

$lessonMap = @{
  41 = @('Choice overload','To weigh pros and cons','To second-guess','Decision fatigue','To narrow it down','Good enough')
  42 = @('Human enhancement','Ethical dilemma','Informed consent','Long-term effects','To push the limits','To level the playing field')
  43 = @('To set the scene','To build suspense','Plot twist','Relatable character','To keep someone hooked','Moral of the story')
  44 = @('To lead by example','To earn trust','To delegate effectively','Accountability','To motivate a team','To call the shots')
  45 = @('Fair play','To bend the rules','Win at all costs','Sportsmanship','Level playing field','To take the high road')
  46 = @('Sense of self','Core values','Self-image','To fit in','To stand out','To reinvent yourself')
  47 = @('To crack a joke','Comic relief','Inside joke','Punchline','To laugh something off','Sense of humor')
  48 = @('Comfort zone','To take a leap','Growing pains','To play it safe','Breakthrough','To step out of your comfort zone')
}

foreach ($n in 41..48) {
    $path = "conversation\licao-{0:d2}.html" -f $n
    $content = Get-Content -Raw $path
    $v = $lessonMap[$n]

    $vocabJs = "const vocabulary = [{ id: 'e1', text: '$($v[0])' }, { id: 'e2', text: '$($v[1])' }, { id: 'e3', text: '$($v[2])' }, { id: 'e4', text: '$($v[3])' }, { id: 'e5', text: '$($v[4])' }, { id: 'e6', text: '$($v[5])' }];"
    $situationsJs = "const situations = [{ text: `"This lesson explores <span class='drop-zone' data-answer='$($v[0])'>________</span> through real discussion.`", answer: '$($v[0])' }, { text: `"This lesson explores <span class='drop-zone' data-answer='$($v[1])'>________</span> through real discussion.`", answer: '$($v[1])' }, { text: `"This lesson explores <span class='drop-zone' data-answer='$($v[2])'>________</span> through real discussion.`", answer: '$($v[2])' }, { text: `"This lesson explores <span class='drop-zone' data-answer='$($v[3])'>________</span> through real discussion.`", answer: '$($v[3])' }, { text: `"This lesson explores <span class='drop-zone' data-answer='$($v[4])'>________</span> through real discussion.`", answer: '$($v[4])' }, { text: `"This lesson explores <span class='drop-zone' data-answer='$($v[5])'>________</span> through real discussion.`", answer: '$($v[5])' }];"

    $script = $script40 -replace 'lessonNumber = 40', "lessonNumber = $n"
    $script = [regex]::Replace(
        $script,
        'const vocabulary = \[.*?\]; const situations = \[.*?\];',
        "$vocabJs $situationsJs",
        'Singleline'
    )

    $content = [regex]::Replace($content, "<script>document\.addEventListener\('DOMContentLoaded'.*?</script>", $script, 'Singleline')
    Set-Content -Path $path -Value $content -Encoding UTF8
}
