(function installMusicCatalogV3(globalScope) {
    'use strict';

    if (globalScope.MusicCatalogV3) return;

    const curriculum = globalScope.V3Curriculum;
    const PLACEMENT = 'penultimate-before-homework';
    const CHECKED_AT = null;
    const MUSIC_PUBLICATION = Object.freeze({
        enabled: true,
        verifiedAt: '2026-08-23',
        usageScope: 'private-course-runtime'
    });
    const PILOT_LESSONS = new Set([
        'a1-v3:1', 'a1-v3:6', 'a1-v3:18', 'a1-v3:22',
        'a2-v3:1', 'a2-v3:15', 'a2-v3:21', 'a2-v3:25',
        'b1-v3:1', 'b1-v3:11', 'b1-v3:23', 'b1-v3:29'
    ]);

    const VERIFIED_LRCLIB_IDS = new Map([
        ['a1-v3:2', 28925975], ['a1-v3:3', 1430590], ['a1-v3:4', 35265176],
        ['a1-v3:7', 11088113], ['a1-v3:8', 401693], ['a1-v3:9', 4071044],
        ['a1-v3:11', 9187641], ['a1-v3:12', 36461712], ['a1-v3:13', 1289800],
        ['a1-v3:14', 19589780], ['a1-v3:16', 27588635], ['a1-v3:17', 33682421],
        ['a1-v3:19', 36874850], ['a1-v3:21', 1131543], ['a1-v3:23', 1026657],
        ['a1-v3:24', 1562412], ['a1-v3:26', 24212137], ['a1-v3:27', 18325265],
        ['a1-v3:28', 2126450], ['a1-v3:29', 36835127],
        ['a2-v3:3', 4884], ['a2-v3:5', 36623572], ['a2-v3:7', 8949796],
        ['a2-v3:9', 14774129], ['a2-v3:11', 16388601], ['a2-v3:13', 10718361],
        ['a2-v3:17', 25506836], ['a2-v3:19', 29508768], ['a2-v3:23', 8794818],
        ['a2-v3:27', 37077025], ['a2-v3:29', 2467519],
        ['b1-v3:3', 27861759], ['b1-v3:5', 3248595], ['b1-v3:7', 18663405],
        ['b1-v3:9', 4415576], ['b1-v3:13', 34946482], ['b1-v3:15', 12822811],
        ['b1-v3:17', 33084581], ['b1-v3:19', 624377], ['b1-v3:21', 4583623],
        ['b1-v3:25', 13635], ['b1-v3:27', 1868934]
    ]);

    const featureFlags = globalScope.V3_FEATURE_FLAGS || (globalScope.V3_FEATURE_FLAGS = {});
    if (typeof featureFlags.musicClozeV3Pilots !== 'boolean') {
        featureFlags.musicClozeV3Pilots = MUSIC_PUBLICATION.enabled;
    }
    if (typeof featureFlags.musicClozeV3All !== 'boolean') {
        featureFlags.musicClozeV3All = MUSIC_PUBLICATION.enabled;
    }

    const reserveSongs = new Map([
        ['a1-v3:2', { title: 'Working for the Weekend', artist: 'Loverboy', targetVocabulary: ['work', 'weekend'], reason: 'Reserva caso 9 to 5 fique rápida demais.' }],
        ['a1-v3:8', { title: 'Manic Monday', artist: 'The Bangles', targetVocabulary: ['early', 'work', 'time'], reason: 'Reserva narrativa para testar com o aluno.' }],
        ['a1-v3:23', { title: 'Fly Away', artist: 'Lenny Kravitz', targetVocabulary: ['fly', 'away'], reason: 'Mais clara, mas menos específica de aeroporto.' }],
        ['a2-v3:5', { title: 'We Are the Champions', artist: 'Queen', targetVocabulary: ['win', 'lose', 'champions'], reason: 'Usar somente com o léxico receptivo cadastrado.' }],
        ['a2-v3:7', { title: 'What Kind of Man', artist: 'Florence + the Machine', targetVocabulary: ['what kind of'], reason: 'Alternativa estrutural que ainda exige teste de dicção.' }],
        ['a2-v3:11', { title: 'Scenes from an Italian Restaurant', artist: 'Billy Joel', targetVocabulary: ['restaurant', 'bottle'], reason: 'Mais conhecida, com menor densidade lexical.' }],
        ['a2-v3:29', { title: 'Future People', artist: 'Alabama Shakes', targetVocabulary: ['future'], reason: 'Mais repetitiva, porém mais desafiadora na pronúncia.' }],
        ['b1-v3:3', { title: 'The Middle', artist: 'Jimmy Eat World', targetVocabulary: ['time', 'everything will be alright'], reason: 'Tema de progresso com menor aderência lexical.' }],
        ['b1-v3:7', { title: 'Fast Car', artist: 'Tracy Chapman', targetVocabulary: ['plan', 'leave'], reason: 'Narrativa excelente que exige delimitação cuidadosa.' }],
        ['b1-v3:21', { title: 'The Man Who Never Lied', artist: 'Maroon 5', targetVocabulary: ['who'], reason: 'Mais direta estruturalmente; verificar versão clean.' }],
        ['b1-v3:27', { title: 'Break My Stride', artist: 'Matthew Wilder', targetVocabulary: ['keep moving', 'slow down'], reason: 'Mais clara, mas exige cadastrar chunks receptivos.' }]
    ]);

    // Estas são recomendações editoriais, não lacunas publicáveis. A ordem proposta
    // só vira excerpt.gaps depois de conferência contra letra licenciada e áudio exato.
    const recommendations = [
        ['a1-v3', 1, 'Hello, My Name Is', 'Matthew West', ['hello', 'name'], ['hello', 'name', 'hello', 'name', 'name'], 'A', 'Refrão lento e diretamente ligado à apresentação.', { album: 'Christian Road Trip 2023', durationSeconds: 223, spotifyTrackId: '5a9HrgUjhyjOePiSEHi23R', spotifyTrackTitle: 'Hello, My Name Is', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 3157050, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['a1-v3', 2, 'Working for the Weekend', 'Loverboy', ['work', 'weekend', 'everybody', 'wants'], ['everybody', 'wants', 'work', 'everybody', 'weekend'], 'B', 'Refrão diretamente ligado a trabalho e fim de semana.', { album: 'Get Lucky', durationSeconds: 221, spotifyTrackId: '6pY88I8vkB0sY3Za4LuTYE', spotifyTrackTitle: 'Working for the Weekend', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 3, 'The Coffee Song', 'Frank Sinatra', ['coffee'], ['coffee', 'coffee', 'coffee', 'coffee', 'coffee'], 'A', 'Palavra forte e repetida para percepção lexical.', { album: 'Ring-A-Ding-Ding! (50th Anniversary Edition)', durationSeconds: 171, spotifyTrackId: '5k39CBtv8KMf7EGjYDWUbd', spotifyTrackTitle: 'The Coffee Song', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 4, 'ABC', 'The Jackson 5', ['A', 'B', 'C', 'one', 'two', 'three'], ['A', 'C', 'one', 'two', 'three'], 'A', 'Nomes de letras e números em sequência previsível.', { album: 'ABC', durationSeconds: 174, spotifyTrackId: '6D8kc7RO0rqBLSo2YPflJ5', spotifyTrackTitle: 'ABC', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 6, '867-5309/Jenny', 'Tommy Tutone', ['eight', 'six', 'seven', 'five', 'three'], ['eight', 'six', 'seven', 'five', 'three'], 'A', 'Ditado de número com um campo por dígito.', { album: 'Tommy Tutone - 2', durationSeconds: 226, spotifyTrackId: '6iX1f3r7oUJnMbGgQ2gx1j', spotifyTrackTitle: '867-5309 / Jenny', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 1002659, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct', providerGapAnswers: ['8', '6', '7', '5', '3'], acceptedAnswersByGap: [['eight', '8'], ['six', '6'], ['seven', '7'], ['five', '5'], ['three', '3']] }],
        ['a1-v3', 7, 'Let’s Go Out Tonight', 'Craig Armstrong feat. Paul Buchanan', ['go out', 'tonight'], ['go', 'out', 'tonight', 'go', 'tonight'], 'A', 'Chunk de convite e plano no refrão.', { album: 'The Space Between Us', durationSeconds: 361, spotifyTrackId: '0rY4LJe7trV2DaNuD5pwjG', spotifyTrackTitle: "Let's Go Out Tonight", regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 8, 'Wake Me Up Before You Go-Go', 'Wham!', ['wake up', 'go'], ['wake', 'up', 'go', 'wake', 'go'], 'A', 'Verbos centrais da rotina em refrão repetitivo.', { album: 'Make It Big', durationSeconds: 231, spotifyTrackId: '0ikz6tENMONtK6qGkOrU3c', spotifyTrackTitle: 'Wake Me Up Before You Go-Go', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 9, 'She Works Hard for the Money', 'Donna Summer', ['she', 'works'], ['she', 'works', 'she', 'works', 'works'], 'A', 'Terceira pessoa e -s audível.', { album: 'She Works Hard For The Money', durationSeconds: 320, spotifyTrackId: '3FlOciKDqFlTMPeC7t92Qy', spotifyTrackTitle: 'She Works Hard For The Money', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 11, 'We Are Family', 'Sister Sledge', ['family', 'sisters'], ['family', 'sisters', 'family', 'sisters', 'family'], 'A', 'Vocabulário familiar claro no refrão.', { album: 'We Are Family (1995 Remaster)', durationSeconds: 216, spotifyTrackId: '5IKLwqBQG6KU6MP2zP80Nu', spotifyTrackTitle: 'We Are Family - 1995 Remaster', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 12, 'A House Is Not a Home', 'Luther Vandross', ['chair', 'house', 'room', 'home'], ['chair', 'house', 'room', 'home', 'house'], 'A', 'Alta densidade de vocabulário de casa no trecho inicial.', { album: 'Never Too Much', durationSeconds: 427, spotifyTrackId: '4gFVTfg1EFuuXJguJe1Z7W', spotifyTrackTitle: 'A House Is Not a Home', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 13, 'Apples and Bananas', 'Raffi', ['eat', 'apples', 'bananas'], ['eat', 'apples', 'bananas', 'apples', 'bananas'], 'A', 'Repetição clara com possível extensão fonológica.', { album: 'One Light, One Sun', durationSeconds: 98, spotifyTrackId: '2kLN6dEwdgyTbPnFZ1BONy', spotifyTrackTitle: 'Apples And Bananas', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 14, 'Price Tag', 'Jessie J feat. B.o.B.', ['price', 'tag', 'pay'], ['price', 'tag', 'price', 'tag', 'price'], 'A', 'Usar versão clean e trecho do refrão.', { album: 'Who You Are (Platinum Edition)', durationSeconds: 223, spotifyTrackId: '2fTsFCKRFQ5M0igJgabnLA', spotifyTrackTitle: 'Price Tag', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', cleanVersion: true }],
        ['a1-v3', 16, 'Blue Suede Shoes', 'Elvis Presley', ['blue', 'shoes'], ['blue', 'shoes', 'blue', 'shoes', 'shoes'], 'A', 'Duas palavras da aula com dicção nítida.', { album: 'Elvis Presley', durationSeconds: 122, spotifyTrackId: '47gmoUrZV3w20JAnQOZMcO', spotifyTrackTitle: 'Blue Suede Shoes', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 17, 'The Boy Is Mine', 'Brandy & Monica', ['mine'], ['mine', 'mine', 'mine', 'mine', 'mine'], 'A', 'Posse reconhecida por repetição da palavra-alvo.', { album: '90s', durationSeconds: 240, spotifyTrackId: '4q5Wc0NLV8fdUkjpipS2vg', spotifyTrackTitle: 'The Boy Is Mine - Radio Edit', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 18, 'Tom’s Diner', 'Suzanne Vega', ['sit', 'wait', 'look'], ['sitting', 'waiting', 'looking', 'looking', 'looking'], 'A', 'Concentração de formas em -ing.', { acceptedInflections: ['sitting', 'waiting', 'looking'], album: 'Pizza Music', durationSeconds: 129, spotifyTrackId: '0oTV17gmA8QOVvvZaKL8Ok', spotifyTrackTitle: "Tom's Diner", regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 34427146, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['a1-v3', 19, 'Rock Around the Clock', 'Bill Haley & His Comets', ['one', 'two', 'three', 'four', 'o’clock'], ['one', 'two', 'three', 'four', 'o’clock'], 'A', 'Abertura para ditado de horas.', { album: '100 Years of Bill Haley', durationSeconds: 132, spotifyTrackId: '194gOzet5fAg20g2JuGGbu', spotifyTrackTitle: 'Rock Around the Clock', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 21, 'Calendar Girl', 'Neil Sedaka', ['months', 'calendar'], ['January', 'February', 'April', 'May', 'December'], 'A', 'Sequência dos meses com apoio contextual.', { album: 'Rock with Sedaka (Expanded Edition)', durationSeconds: 159, spotifyTrackId: '7Gpx2fNJiilvrf9Ss8qbit', spotifyTrackTitle: 'Calendar Girl', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', acceptedInflections: ['January', 'February', 'April', 'May', 'December'] }],
        ['a1-v3', 22, 'Yesterday', 'The Beatles', ['yesterday', 'suddenly', 'had', 'said', 'stay'], ['yesterday', 'suddenly', 'had', 'said', 'stay'], 'A', 'Cinco alvos da própria lição em trecho curto.', { album: 'Help! (Remastered)', durationSeconds: 125, spotifyTrackId: '3BQHpFgAp4l80e1XslIjNI', spotifyTrackTitle: 'Yesterday - Remastered 2009', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 11484351, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['a1-v3', 23, 'Leaving on a Jet Plane', 'John Denver', ['leaving', 'plane'], ['leaving', 'plane', 'leaving', 'plane', 'leaving'], 'B', 'Foco em partida; vocabulário de aeroporto segue na conversa.', { album: 'Rhymes & Reasons', durationSeconds: 217, spotifyTrackId: '0hS2EF1YErlHBS5c97iGxi', spotifyTrackTitle: 'Leaving on a Jet Plane', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', providerGapAnswers: ["leavin'", 'plane', "leavin'", 'plane', "leavin'"], acceptedAnswersByGap: [['leaving', "leavin'"], ['plane'], ['leaving', "leavin'"], ['plane'], ['leaving', "leavin'"]] }],
        ['a1-v3', 24, 'Walking in Memphis', 'Marc Cohn', ['walking', 'was walking'], ['walking', 'walking', 'walking', 'walking', 'walking'], 'B', 'Forma -ing e ocorrência-chave de was walking.', { album: 'Marc Cohn', durationSeconds: 252, spotifyTrackId: '5fgkjhICZnqFctrV0AyuQD', spotifyTrackTitle: 'Walking in Memphis', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 26, 'Hot N Cold', 'Katy Perry', ['hot', 'cold', 'in', 'out'], ['hot', 'cold', 'in', 'out', 'cold'], 'A', 'Antônimos previsíveis ligados a clima e planos.', { album: 'One Of The Boys', durationSeconds: 220, spotifyTrackId: '1TEjSXPdAakDotj2Wji3PU', spotifyTrackTitle: 'Hot N Cold', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', cleanVersion: true }],
        ['a1-v3', 27, 'Fever', 'Peggy Lee', ['fever'], ['fever', 'fever', 'fever', 'fever', 'fever'], 'A', 'Palavra-alvo central seguida de conselho oral.', { album: 'The Best Of Peggy Lee', durationSeconds: 201, spotifyTrackId: '2CeqxyOZEyiL6pTDYZ9gPH', spotifyTrackTitle: 'Fever', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 28, 'Call Me', 'Blondie', ['call', 'line'], ['call', 'call', 'line', 'call', 'call'], 'A', 'Call me e on the line em refrão repetitivo.', { album: 'Atomic/Atomix', durationSeconds: 212, spotifyTrackId: '4qO03RMQm88DdpTJcxlglY', spotifyTrackTitle: 'Call Me', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a1-v3', 29, 'Take It Easy', 'Eagles', ['take it easy'], ['take', 'easy', 'take', 'easy', 'easy'], 'A', 'Chunk recorrente para agenda e autocuidado.', { album: 'Eagles (2013 Remaster)', durationSeconds: 211, spotifyTrackId: '4yugZvBYaoREkJKtbG08Qr', spotifyTrackTitle: 'Take It Easy - 2013 Remaster', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],

        ['a2-v3', 1, 'Let It Snow! Let It Snow! Let It Snow!', 'Dean Martin', ['snow', 'place', 'warm'], ['snow', 'place', 'snow', 'warm', 'snow'], 'A', 'Léxico meteorológico recorrente e previsível.', { album: 'A Winter Romance', durationSeconds: 117, spotifyTrackId: '2uFaJJtFpPDc5Pa95XzTvg', spotifyTrackTitle: 'Let It Snow! Let It Snow! Let It Snow!', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', cleanVersion: true, gapOccurrences: [1, 1, 3, 1, 5], lrclibId: 970166, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['a2-v3', 3, 'Down on the Corner', 'Creedence Clearwater Revival', ['corner', 'street'], ['corner', 'street', 'corner', 'street', 'corner'], 'A', 'Localização ancorada em um mapa.', { album: 'Willy And The Poor Boys (Expanded Edition)', durationSeconds: 166, spotifyTrackId: '2gE95JskwQ1pCACTpGe1Db', spotifyTrackTitle: 'Down On The Corner', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a2-v3', 5, 'Centerfield', 'John Fogerty', ['play', 'coach', 'game', 'ball'], ['play', 'coach', 'play', 'game', 'ball'], 'B', 'Coach, game e ball entram como repertório receptivo.', { album: 'Centerfield (25th Anniversary)', durationSeconds: 231, spotifyTrackId: '5f7KV4oOHZylrpa5XKFu6G', spotifyTrackTitle: 'Centerfield', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a2-v3', 7, 'A Day in the Life', 'The Beatles', ['read', 'news'], ['read', 'news', 'news', 'read', 'news'], 'B', 'Usar somente ocorrências confirmadas pelo provedor.', { album: "Sgt. Pepper's Lonely Hearts Club Band (Remastered)", durationSeconds: 337, spotifyTrackId: '0hKRSZhUGEhKU6aNSPBACZ', spotifyTrackTitle: 'A Day In The Life - Remastered 2009', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a2-v3', 9, 'Sour Candy', 'Lady Gaga & BLACKPINK', ['sour', 'sweet'], ['sour', 'sweet', 'sour', 'sweet', 'sour'], 'A', 'Trecho em inglês e versão clean.', { album: 'Sour Candy (with BLACKPINK)', durationSeconds: 157, spotifyTrackId: '6R6ZoHTypt5lt68MWbzZXv', spotifyTrackTitle: 'Sour Candy (with BLACKPINK)', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', cleanVersion: true }],
        ['a2-v3', 11, 'The New Restaurant', 'Malvina Reynolds', ['restaurant', 'food', 'waitress', 'menu'], ['restaurant', 'food', 'waitresses', 'menu', 'food'], 'B', 'Recicla serviço e introduz menu.', { album: 'Sings the Truth', durationSeconds: 119, spotifyTrackId: '6dGFzEgFlhprVJScGMWjjN', spotifyTrackTitle: 'The New Restaurant', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', acceptedInflections: ['waitress', 'waitresses'] }],
        ['a2-v3', 13, 'Shy Guy', 'Diana King', ['shy'], ['shy', 'shy', 'shy', 'shy', 'shy'], 'A', 'Personalidade repetida com clareza.', { album: 'Shy Guy', durationSeconds: 223, spotifyTrackId: '6qQlDqQIovUHSXabz13k0K', spotifyTrackTitle: 'Shy Guy - Darpe Mix', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a2-v3', 15, 'Head, Shoulders, Knees & Toes', 'Ofenbach & Quarterhead feat. Norma Jean Martine', ['head', 'shoulders', 'knees'], ['head', 'shoulders', 'knees', 'head', 'knees'], 'A', 'Selecionar a versão contemporânea com partes do corpo explícitas.', { album: '50 Hits Winter 2021', durationSeconds: 155, spotifyTrackId: '73AARpRWVuTvXETaYUjAX9', spotifyTrackTitle: 'Head Shoulders Knees & Toes (feat. Norma Jean Martine)', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 26606532, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['a2-v3', 17, 'Cheap Thrills', 'Sia', ['cheap', 'money'], ['cheap', 'money', 'cheap', 'money', 'cheap'], 'A', 'Versão solo/clean; ligar cheap a value.', { album: 'This Is Acting', durationSeconds: 211, spotifyTrackId: '27SdWb2rFzO6GWiYDBTD9j', spotifyTrackTitle: 'Cheap Thrills', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', cleanVersion: true }],
        ['a2-v3', 19, 'Lend Me Your Comb', 'The Beatles', ['lend', 'comb'], ['lend', 'lend', 'lend', 'comb', 'comb'], 'A', 'Contraste posterior entre lend me e borrow from.', { album: 'Anthology Collection', durationSeconds: 109, spotifyTrackId: '4wTjjuI7mF3eEtYlzxoPCG', spotifyTrackTitle: 'Lend Me Your Comb - BBC Live Recording - Remastered', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a2-v3', 21, 'We Used to Be Friends', 'The Dandy Warhols', ['used to', 'friends'], ['used', 'friends', 'used', 'friends', 'used'], 'A', 'Hábito/estado passado e amizade no refrão.', { album: 'Welcome To The Monkey House', durationSeconds: 199, spotifyTrackId: '7hpFYWL3cw5m4y70cce7Zb', spotifyTrackTitle: 'We Used To Be Friends', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 10275104, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['a2-v3', 23, 'Fashion', 'David Bowie', ['fashion'], ['fashion', 'fashion', 'fashion', 'fashion', 'fashion'], 'A', 'Discussão posterior cobre trend, style e outfit.', { album: 'ChangesTwoBowie', durationSeconds: 205, spotifyTrackId: '0C4FhShwMJmIp4w12lHHdV', spotifyTrackTitle: 'Fashion - Single Version; 2017 Remaster', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a2-v3', 25, 'Should I Stay or Should I Go', 'The Clash', ['should', 'stay', 'go'], ['should', 'stay', 'should', 'go', 'should'], 'A', 'Modal diretamente ligado a decisão e conselho.', { album: 'Combat Rock (Remastered)', durationSeconds: 188, spotifyTrackId: '39shmbIHICJ2Wxnk1fPSdz', spotifyTrackTitle: 'Should I Stay or Should I Go - Remastered', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 1964013, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['a2-v3', 27, 'The Best', 'Tina Turner', ['best', 'better'], ['best', 'better', 'best', 'better', 'best'], 'A', 'Comparativo e superlativo no refrão.', { album: 'Foreign Affair', durationSeconds: 329, spotifyTrackId: '6pPWRBubXOBAHnjl5ZIujB', spotifyTrackTitle: 'The Best', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['a2-v3', 29, 'The Future’s So Bright, I Gotta Wear Shades', 'Timbuk 3', ['future', 'bright'], ['future', 'future', 'future', 'future', 'bright'], 'A', 'Discussão separa hope, plan e prediction.', { album: 'Greetings From Timbuk 3', durationSeconds: 204, spotifyTrackId: '4EfZ2eaFjn1MQbKZD8urIz', spotifyTrackTitle: "The Future's So Bright, I Gotta Wear Shades", regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', providerGapAnswers: ["future's", "future's", "future's", "future's", 'bright'], acceptedAnswersByGap: [['future', "future's"], ['future', "future's"], ['future', "future's"], ['future', "future's"], ['bright']] }],

        ['b1-v3', 1, 'Breakaway', 'Kelly Clarkson', ['take a risk', 'take a chance', 'make a change'], ['risk', 'chance', 'change', 'risk', 'change'], 'A', 'Chunks centrais da lição no refrão.', { album: 'Breakaway', durationSeconds: 237, spotifyTrackId: '61Qhe2mHSLhUE04QeK4lkD', spotifyTrackTitle: 'Breakaway', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 3712521, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['b1-v3', 3, 'Progress', 'Good Terms', ['progress', 'lately', 'used to'], ['progress', 'lately', 'used', 'progress', 'used'], 'B', 'Faixa rápida; used to entra somente como reciclagem.', { album: 'Burnout (Deluxe)', durationSeconds: 209, spotifyTrackId: '03UonOMnzvCMiKcJaHsjQC', spotifyTrackTitle: 'Progress', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 5, 'Somebody That I Used to Know', 'Gotye feat. Kimbra', ['used to', 'know'], ['used', 'know', 'used', 'know', 'used'], 'A', 'Contraste entre estado passado e presente.', { album: 'Making Mirrors', durationSeconds: 244, spotifyTrackId: '1qDrWA6lyx8cLECdZE7TV7', spotifyTrackTitle: 'Somebody That I Used To Know', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 7, 'The Way', 'Fastball', ['before', 'left', 'drove'], ['before', 'left', 'drove', 'going', 'knowing'], 'B', 'Integração narrativa com alguns itens receptivos.', { album: 'All The Pain Money Can Buy', durationSeconds: 257, spotifyTrackId: '7IsEXPk6qqt30FfQv4SZMa', spotifyTrackTitle: 'The Way', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', acceptedInflections: ['going', 'knowing'] }],
        ['b1-v3', 9, 'Plans', 'Birds of Tokyo', ['plans', 'made', 'right'], ['plans', 'made', 'plans', 'made', 'right'], 'A', 'Made plans aparece cedo e sustenta expectativa e mudança.', { album: 'Birds of Tokyo', durationSeconds: 218, spotifyTrackId: '7n81LmuV2S1mDwPygontrH', spotifyTrackTitle: 'Plans', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 11, 'Count on Me', 'Bruno Mars', ['if', 'need', 'count on'], ['if', 'need', 'count', 'if', 'need'], 'A', 'Condição real e count on em sequência clara.', { album: 'Doo-Wops & Hooligans', durationSeconds: 197, spotifyTrackId: '3B5UbSndRz907IZhhmUfLi', spotifyTrackTitle: 'Count on Me', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 1004574, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['b1-v3', 13, 'It Must Have Been Love', 'Roxette', ['must have been'], ['must', 'been', 'must', 'been', 'must'], 'A', 'Chunk de dedução sobre o passado.', { album: 'It Must Have Been Love', durationSeconds: 259, spotifyTrackId: '6kvoHl80mfCVTv7XnZkjQn', spotifyTrackTitle: 'It Must Have Been Love - From the Film "Pretty Woman"', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 15, 'Signs', 'Five Man Electrical Band', ['sign', 'can’t', 'got to'], ['sign', 'can’t', 'sign', 'got', 'sign'], 'A', 'Regras e restrições com registro informal.', { album: "Class of '71", durationSeconds: 246, spotifyTrackId: '5ldY5Yg0zp4zmGIVd64IC4', spotifyTrackTitle: 'Signs', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 17, 'We Can Work It Out', 'The Beatles', ['think', 'see it my way', 'work it out'], ['think', 'way', 'work', 'out', 'think'], 'A', 'Divergência, reformulação e busca de solução.', { album: '1 (Remastered)', durationSeconds: 135, spotifyTrackId: '1hTUFqJuQAMjXVGwUPWDqi', spotifyTrackTitle: 'We Can Work It Out - Remastered 2015', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 19, 'You Can’t Always Get What You Want', 'The Rolling Stones', ['want', 'need', 'try', 'get'], ['want', 'try', 'get', 'need', 'want'], 'A', 'Preferência, tentativa e necessidade para negociação.', { album: 'Let It Bleed', durationSeconds: 448, spotifyTrackId: '6lFZbCc7pn6Lme1NP7qQqQ', spotifyTrackTitle: "You Can't Always Get What You Want", regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 21, 'The Man Who Sold the World', 'David Bowie', ['who', 'world'], ['man', 'who', 'world', 'who', 'world'], 'B', 'Trecho curto para reconhecer relative clause com who.', { album: 'The Man Who Sold the World (2015 Remaster)', durationSeconds: 241, spotifyTrackId: '4mWahKerLaVddUjb8d1Q4Q', spotifyTrackTitle: 'The Man Who Sold the World - 2015 Remaster', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', acceptedInflections: ['man'] }],
        ['b1-v3', 23, 'She Said She Said', 'The Beatles', ['said', 'know'], ['said', 'said', 'know', 'said', 'know'], 'A', 'Converter falas em discurso relatado após a escuta.', { album: 'Revolver (Remastered)', durationSeconds: 156, spotifyTrackId: '3VSuWxZM6x6V3ig5nYtikL', spotifyTrackTitle: 'She Said She Said - Remastered 2009', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 8886271, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }],
        ['b1-v3', 25, 'Fix You', 'Coldplay', ['fix', 'try', 'need', 'want', 'tired'], ['fix', 'try', 'need', 'want', 'tired'], 'A', 'Problema e reparo com cinco itens propostos.', { album: 'X&Y', durationSeconds: 295, spotifyTrackId: '7LVHVU3tWfcxj5aiPFEW4Q', spotifyTrackTitle: 'Fix You', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 27, 'Hall of Fame', 'The Script feat. will.i.am', ['practice', 'try', 'distance', 'students', 'leaders'], ['distance', 'try', 'students', 'leaders', 'students'], 'B', 'Students e leaders entram como repertório receptivo.', { album: '#3 Deluxe Version', durationSeconds: 202, spotifyTrackId: '7wMq5n8mYSKlQIGECKUgTX', spotifyTrackTitle: 'Hall of Fame (feat. will.i.am)', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23' }],
        ['b1-v3', 29, 'If I Were a Boy', 'Beyoncé', ['if I were', 'would'], ['if', 'were', 'would', 'if', 'were'], 'A', 'Modelo claro de Second Conditional.', { album: 'I AM...SASHA FIERCE', durationSeconds: 249, spotifyTrackId: '2jppsxdHlNHz9eK0QyYlTq', spotifyTrackTitle: 'If I Were a Boy', regionChecked: 'BR', spotifyCheckedAt: '2026-08-23', lrclibId: 769181, lrclibCheckedAt: '2026-08-23', gapAudit: '5-of-5-distinct' }]
    ];

    function normalize(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[’']/g, "'")
            .trim()
            .toLowerCase();
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function createGapSpecs(answers, options = {}) {
        const occurrences = new Map();
        return answers.map((answer, index) => {
            const key = normalize(answer);
            const nextOccurrence = (occurrences.get(key) || 0) + 1;
            occurrences.set(key, nextOccurrence);
            const accepted = options.acceptedAnswersByGap?.[index] || [answer];
            return {
                id: `gap-${index + 1}`,
                answer,
                providerAnswer: options.providerGapAnswers?.[index] || answer,
                occurrence: options.gapOccurrences?.[index] || nextOccurrence,
                acceptedAnswers: Array.from(new Set([answer, ...accepted]))
            };
        });
    }

    function createRecord(definition) {
        const [moduleId, lessonNumber, title, artist, targets, proposedGapAnswers, grade, application, options = {}] = definition;
        const lesson = curriculum?.getLesson(moduleId, lessonNumber);
        const spotifyTrackId = options.spotifyTrackId || null;
        const isPilot = PILOT_LESSONS.has(`${moduleId}:${lessonNumber}`);
        const verifiedLrclibId = options.lrclibId || VERIFIED_LRCLIB_IDS.get(`${moduleId}:${lessonNumber}`) || null;
        const gapAudit = options.gapAudit || (verifiedLrclibId ? '5-of-5-distinct' : null);
        const lrclibCheckedAt = options.lrclibCheckedAt || (verifiedLrclibId ? MUSIC_PUBLICATION.verifiedAt : null);
        const providerVerified = Boolean(
            MUSIC_PUBLICATION.enabled
            && verifiedLrclibId
            && spotifyTrackId
            && options.regionChecked === 'BR'
            && gapAudit === '5-of-5-distinct'
        );
        return {
            id: `${moduleId}-l${String(lessonNumber).padStart(2, '0')}-song-01`,
            curriculumId: lesson?.id || null,
            moduleId,
            lessonNumber,
            lessonKind: 'lexical',
            semanticTags: [...(lesson?.languageTags || [])],
            placement: PLACEMENT,
            status: providerVerified ? 'provider-verified' : 'draft-until-provider-match',
            publicationBlockers: providerVerified
                ? []
                : ['provider-match', 'exact-audio-version', 'br-region', 'five-distinct-gap-positions', 'human-qa'],
            song: {
                title,
                artist,
                spotifyTrackTitle: options.spotifyTrackTitle || title,
                album: options.album || null,
                durationSeconds: options.durationSeconds || null,
                spotifyTrackId,
                spotifyUrl: spotifyTrackId ? `https://open.spotify.com/track/${spotifyTrackId}` : null,
                cleanVersion: options.cleanVersion ?? null,
                regionChecked: options.regionChecked || null,
                spotifyCheckedAt: options.spotifyCheckedAt || null
            },
            lyrics: {
                provider: 'lrclib',
                lrclibId: verifiedLrclibId,
                fallback: 'lyricsovh',
                cache: 'sessionStorage',
                candidateCheckedAt: lrclibCheckedAt,
                gapAudit,
                providerVerifiedAt: providerVerified ? MUSIC_PUBLICATION.verifiedAt : null
            },
            gaps: createGapSpecs(proposedGapAnswers, options),
            rights: {
                lyricsProvider: providerVerified ? 'lrclib' : null,
                lyricsId: providerVerified ? verifiedLrclibId : null,
                displayLicensed: false,
                checkedAt: providerVerified ? MUSIC_PUBLICATION.verifiedAt : CHECKED_AT,
                usageScope: providerVerified ? MUSIC_PUBLICATION.usageScope : null,
                commercialPublicationApproved: false
            },
            excerpt: {
                startMs: null,
                endMs: null,
                providerLines: false,
                gaps: []
            },
            pedagogy: {
                targetVocabulary: [...targets],
                acceptedInflections: [...(options.acceptedInflections || [])],
                proposedGapAnswers: [...proposedGapAnswers],
                grade,
                difficulty: `${moduleId.slice(0, 2).toUpperCase()}-${grade === 'A' ? 'core' : 'pilot'}`,
                application,
                maxAttempts: 3,
                feedbackMode: 'after-attempt'
            },
            rollout: {
                pilot: isPilot,
                featureFlag: 'musicClozeV3Pilots'
            },
            reserveSong: clone(reserveSongs.get(`${moduleId}:${lessonNumber}`) || null)
        };
    }

    const records = recommendations.map(createRecord);
    const byCurriculumId = new Map(records.map(record => [record.curriculumId, record]));

    function validateEntry(entry, { requirePublishable = false } = {}) {
        const errors = [];
        const lesson = curriculum?.getLesson(entry?.moduleId, entry?.curriculumId);
        if (!entry?.curriculumId || !lesson) errors.push('curriculumId inexistente no manifesto V3');
        if (lesson && lesson.lessonKind !== 'lexical') errors.push('a lição não é lexical');
        if (lesson && !curriculum.hasSemanticIntersection(lesson, entry?.semanticTags || [])) errors.push('sem interseção semântica com a lição');
        if (entry?.lessonKind !== 'lexical') errors.push('lessonKind do catálogo deve ser lexical');
        if (entry?.placement !== PLACEMENT) errors.push('posição musical inválida');
        if (!entry?.song?.title || !entry?.song?.artist) errors.push('faixa ou artista ausente');
        const gapSpecs = entry?.gaps || [];
        if ((entry?.pedagogy?.proposedGapAnswers || []).length !== 5) errors.push('a recomendação deve ter cinco respostas propostas');
        if (gapSpecs.length !== 5) errors.push('o catálogo deve conter exatamente cinco descritores de lacuna');
        const descriptorPositions = new Set(gapSpecs.map(gap => `${normalize(gap?.answer)}:${gap?.occurrence}`));
        if (descriptorPositions.size !== gapSpecs.length) errors.push('os cinco descritores devem apontar para ocorrências distintas');
        gapSpecs.forEach(gap => {
            if (!gap?.answer || !Number.isInteger(gap?.occurrence) || gap.occurrence < 1) errors.push('descritor de lacuna inválido');
            if (!Array.isArray(gap?.acceptedAnswers) || !gap.acceptedAnswers.length) errors.push('acceptedAnswers ausente');
        });

        if (requirePublishable || entry?.status === 'provider-verified') {
            if ((entry?.publicationBlockers || []).length) errors.push('bloqueios editoriais ainda pendentes');
            if (entry?.lyrics?.provider !== 'lrclib' || !entry?.lyrics?.lrclibId) errors.push('correspondência LRCLIB não confirmada');
            if (!entry?.lyrics?.providerVerifiedAt) errors.push('data da verificação do provedor ausente');
            if (!/^[A-Za-z0-9]{22}$/.test(entry?.song?.spotifyTrackId || '') || entry?.song?.regionChecked !== 'BR') errors.push('versão de áudio/região BR não confirmada');
            const allowed = new Set([
                ...(entry?.pedagogy?.targetVocabulary || []),
                ...(entry?.pedagogy?.acceptedInflections || [])
            ].flatMap(value => [value, ...String(value).split(/\s+/)]).map(normalize));
            gapSpecs.forEach(gap => {
                if (!allowed.has(normalize(gap?.answer))) errors.push(`resposta fora dos alvos da lição: ${gap?.answer || '(vazia)'}`);
            });
        }
        return { valid: errors.length === 0, errors };
    }

    function isPublishable(entry) {
        return entry?.status === 'provider-verified' && validateEntry(entry, { requirePublishable: true }).valid;
    }

    function isRolloutEnabled(entry) {
        const flags = globalScope.V3_FEATURE_FLAGS || {};
        if (flags.musicClozeV3All === true) return true;
        return entry?.rollout?.pilot === true && flags.musicClozeV3Pilots === true;
    }

    function publicView(entry) {
        return {
            id: entry.id,
            curriculumId: entry.curriculumId,
            lessonKind: entry.lessonKind,
            placement: entry.placement,
            status: entry.status,
            song: clone(entry.song),
            lyrics: clone(entry.lyrics),
            gaps: clone(entry.gaps),
            excerpt: {
                startMs: entry.excerpt.startMs,
                endMs: entry.excerpt.endMs,
                providerLines: entry.excerpt.providerLines
            },
            pedagogy: {
                targetVocabulary: clone(entry.pedagogy.targetVocabulary),
                application: entry.pedagogy.application,
                difficulty: entry.pedagogy.difficulty,
                maxAttempts: entry.pedagogy.maxAttempts,
                feedbackMode: entry.pedagogy.feedbackMode
            }
        };
    }

    function getForCurriculumId(curriculumId, { includeDraft = false } = {}) {
        const entry = byCurriculumId.get(String(curriculumId || ''));
        if (!entry) return null;
        if (includeDraft) return clone(entry);
        return isPublishable(entry) && isRolloutEnabled(entry) ? publicView(entry) : null;
    }

    function auditSnapshot() {
        return records.map(record => ({
            ...clone(record),
            validation: validateEntry(record),
            publishableValidation: validateEntry(record, { requirePublishable: true })
        }));
    }

    globalScope.MusicCatalogV3 = Object.freeze({
        version: '2026.08.22-map-musical-v3-lrclib',
        placement: PLACEMENT,
        getForCurriculumId,
        validateEntry,
        isPublishable,
        isRolloutEnabled,
        auditSnapshot
    });
}(window));
