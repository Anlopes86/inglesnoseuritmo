(function installIcelandSpecialMusicCatalog(globalScope) {
    'use strict';

    const draftReasons = Object.freeze([
        'BR availability requires human audit with an authenticated Spotify market check',
        'exact recording/version and five occurrences require human playback audit'
    ]);
    const verification = () => ({
        spotifyRecordingConfirmed: false,
        brAvailabilityConfirmed: false,
        lrclibRecordingConfirmed: false,
        fiveOccurrencesAudited: false,
        activityPlaybackTested: false
    });
    const rights = () => ({
        usageScope: 'private-course-runtime',
        commercialPublicationApproved: false
    });
    const gap = (id, answer, occurrence = 1) => ({
        id,
        answer,
        providerAnswer: answer,
        occurrence,
        acceptedAnswers: [answer]
    });

    const records = [
        {
            id: 'conversation-special-iceland-song-1',
            lessonNumber: 9001,
            songIndex: 0,
            status: 'draft-until-provider-match',
            draftReasons,
            song: {
                title: 'Way down We Go',
                artist: 'KALEO',
                displayTitle: 'Way Down We Go',
                displayArtist: 'KALEO',
                version: 'Way down We Go',
                album: 'A/B',
                durationSeconds: 213,
                spotifyId: '3a60XzasqF3i8xD1ACZREP',
                spotifyEmbedPlayableAtCheck: true,
                brAvailabilityConfirmed: false
            },
            lyrics: {
                provider: 'lrclib',
                lrclibId: 35977779,
                providerTrackName: 'Way down We Go',
                providerArtistName: 'KALEO',
                providerDurationSeconds: 213,
                fallback: 'lyricsovh',
                cache: 'sessionStorage',
                checkedAt: '2026-09-27'
            },
            gaps: [
                gap('gap-1', 'father'),
                gap('gap-2', 'deserve'),
                gap('gap-3', 'feet'),
                gap('gap-4', 'time'),
                gap('gap-5', 'eyes')
            ],
            pedagogy: {
                maxAttempts: 3,
                application: 'Going down into Iceland’s wilder side'
            },
            verification: verification(),
            rights: rights()
        },
        {
            id: 'conversation-special-iceland-song-2',
            lessonNumber: 9001,
            songIndex: 1,
            status: 'draft-until-provider-match',
            draftReasons,
            song: {
                title: 'From The Start',
                artist: 'Laufey',
                displayTitle: 'From The Start',
                displayArtist: 'Laufey',
                version: 'From The Start',
                album: 'Bewitched',
                durationSeconds: 169,
                spotifyId: '43iIQbw5hx986dUEZbr3eN',
                spotifyEmbedPlayableAtCheck: true,
                brAvailabilityConfirmed: false
            },
            lyrics: {
                provider: 'lrclib',
                lrclibId: 36744197,
                providerTrackName: 'From The Start',
                providerArtistName: 'Laufey',
                providerDurationSeconds: 169,
                fallback: 'lyricsovh',
                cache: 'sessionStorage',
                checkedAt: '2026-09-27'
            },
            gaps: [
                gap('gap-1', 'quiet'),
                gap('gap-2', 'silence'),
                gap('gap-3', 'reminders'),
                gap('gap-4', 'soulmate'),
                gap('gap-5', 'heart')
            ],
            pedagogy: {
                maxAttempts: 3,
                application: 'First impressions and quiet memories'
            },
            verification: verification(),
            rights: rights()
        },
        {
            id: 'conversation-special-iceland-song-3',
            lessonNumber: 9001,
            songIndex: 2,
            status: 'draft-until-provider-match',
            draftReasons,
            song: {
                title: 'Little Talks',
                artist: 'Of Monsters and Men',
                displayTitle: 'Little Talks',
                displayArtist: 'Of Monsters and Men',
                version: 'Little Talks',
                album: 'My Head Is An Animal',
                durationSeconds: 266,
                spotifyId: '2ihCaVdNZmnHZWt0fvAM7B',
                spotifyEmbedPlayableAtCheck: true,
                brAvailabilityConfirmed: false
            },
            lyrics: {
                provider: 'lrclib',
                lrclibId: 37017177,
                providerTrackName: 'Little Talks',
                providerArtistName: 'Of Monsters And Men',
                providerDurationSeconds: 266,
                fallback: 'lyricsovh',
                cache: 'sessionStorage',
                checkedAt: '2026-09-27'
            },
            gaps: [
                gap('gap-1', 'house'),
                gap('gap-2', 'hand'),
                gap('gap-3', 'awake'),
                gap('gap-4', 'truth'),
                gap('gap-5', 'ship')
            ],
            pedagogy: {
                maxAttempts: 3,
                application: 'The conversations that became part of the trip'
            },
            verification: verification(),
            rights: rights()
        }
    ];

    const byLessonAndSong = new Map(records.map((entry) => [`${entry.lessonNumber}:${entry.songIndex}`, entry]));

    function get(lessonNumber, songIndex) {
        return byLessonAndSong.get(`${Number(lessonNumber)}:${Number(songIndex)}`) || null;
    }

    function validate(entry) {
        const errors = [];
        if (!entry || !['provider-verified', 'draft-until-provider-match'].includes(entry.status)) errors.push('invalid publication status');
        if (!/^[A-Za-z0-9]{22}$/.test(entry?.song?.spotifyId || '')) errors.push('missing exact Spotify track ID');
        if (!Number.isInteger(entry?.lyrics?.lrclibId)) errors.push('missing LRCLIB candidate ID');
        if (entry?.gaps?.length !== 5) errors.push('activity requires exactly five gaps');
        if (entry?.status === 'draft-until-provider-match' && !entry?.draftReasons?.length) errors.push('draft reason missing');
        return { valid: errors.length === 0, errors };
    }

    globalScope.ConversationSpecialMusicCatalog = Object.freeze({
        version: '2026-09-27-iceland-special',
        records: Object.freeze(records),
        get,
        validate
    });
}(window));
