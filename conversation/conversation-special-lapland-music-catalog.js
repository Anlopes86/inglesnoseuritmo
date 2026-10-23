(function installLaplandSpecialMusicCatalog(globalScope) {
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

    const laplandRecords = [
        {
            id: 'conversation-special-lapland-song-1',
            lessonNumber: 9002,
            songIndex: 0,
            status: 'draft-until-provider-match',
            draftReasons,
            song: {
                title: 'In the Shadows',
                artist: 'The Rasmus',
                displayTitle: 'In the Shadows',
                displayArtist: 'The Rasmus',
                version: 'In the Shadows',
                album: 'Best of 2001–2009',
                durationSeconds: 257,
                spotifyId: '1fr92Vupmcs2vgLMFVQ7rd',
                spotifyEmbedPlayableAtCheck: true,
                brAvailabilityConfirmed: false
            },
            lyrics: {
                provider: 'lrclib',
                lrclibId: 13904553,
                providerTrackName: 'In the Shadows',
                providerArtistName: 'The Rasmus; The Rasmus',
                providerDurationSeconds: 257,
                fallback: 'lyricsovh',
                cache: 'sessionStorage',
                checkedAt: '2026-10-23'
            },
            gaps: [
                gap('gap-1', 'waiting'),
                gap('gap-2', 'watching'),
                gap('gap-3', 'searching'),
                gap('gap-4', 'living'),
                gap('gap-5', 'thunder')
            ],
            pedagogy: {
                maxAttempts: 3,
                application: 'Finland: before the aurora hunt'
            },
            verification: verification(),
            rights: rights()
        },
        {
            id: 'conversation-special-lapland-song-2',
            lessonNumber: 9002,
            songIndex: 1,
            status: 'draft-until-provider-match',
            draftReasons,
            song: {
                title: 'Take on Me',
                artist: 'a-ha',
                displayTitle: 'Take on Me',
                displayArtist: 'a-ha',
                version: 'Take on Me',
                album: 'Hunting High and Low',
                durationSeconds: 225,
                spotifyId: '2WfaOiMkCvy7F5fcp2zZ8L',
                spotifyEmbedPlayableAtCheck: true,
                brAvailabilityConfirmed: false
            },
            lyrics: {
                provider: 'lrclib',
                lrclibId: 36844447,
                providerTrackName: 'Take On Me',
                providerArtistName: 'a‐ha',
                providerDurationSeconds: 228,
                fallback: 'lyricsovh',
                cache: 'sessionStorage',
                checkedAt: '2026-10-23'
            },
            gaps: [
                gap('gap-1', 'talking'),
                gap('gap-2', 'slowly'),
                gap('gap-3', 'learning'),
                gap('gap-4', 'remember'),
                gap('gap-5', 'worries')
            ],
            pedagogy: {
                maxAttempts: 3,
                application: 'Norway: the night of the hunt'
            },
            verification: verification(),
            rights: rights()
        },
        {
            id: 'conversation-special-lapland-song-3',
            lessonNumber: 9002,
            songIndex: 2,
            status: 'draft-until-provider-match',
            draftReasons,
            song: {
                title: 'Lovefool',
                artist: 'The Cardigans',
                displayTitle: 'Lovefool',
                displayArtist: 'The Cardigans',
                version: 'Lovefool',
                album: 'First Band on the Moon (Remastered)',
                durationSeconds: 193,
                spotifyId: '7aQjPecQdIuNd1sz3KCDhD',
                spotifyEmbedPlayableAtCheck: true,
                brAvailabilityConfirmed: false
            },
            lyrics: {
                provider: 'lrclib',
                lrclibId: 36984622,
                providerTrackName: 'Lovefool',
                providerArtistName: 'The Cardigans',
                providerDurationSeconds: 194,
                fallback: 'lyricsovh',
                cache: 'sessionStorage',
                checkedAt: '2026-10-23'
            },
            gaps: [
                gap('gap-1', 'reason'),
                gap('gap-2', 'pretend'),
                gap('gap-3', 'need'),
                gap('gap-4', 'care'),
                gap('gap-5', 'leave')
            ],
            pedagogy: {
                maxAttempts: 3,
                application: 'Sweden: what the memory became'
            },
            verification: verification(),
            rights: rights()
        }
    ];

    const previousRecords = Array.isArray(globalScope.ConversationSpecialMusicCatalog?.records)
        ? globalScope.ConversationSpecialMusicCatalog.records
        : [];
    const records = [...previousRecords, ...laplandRecords];
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
        version: '2026-10-23-lapland-special',
        records: Object.freeze(records),
        get,
        validate
    });
}(window));
