(function installSpotifyEmbedV3(globalScope) {
    'use strict';

    if (globalScope.SpotifyEmbedV3) return;

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function isValidTrackId(trackId) {
        return /^[A-Za-z0-9]{22}$/.test(String(trackId || ''));
    }

    function renderUnavailable() {
        return `<div class="music-cloze-notice" data-spotify-state="audioUnavailable" role="status"><i class="fas fa-circle-exclamation" aria-hidden="true"></i><span>O player não está disponível agora. A atividade e o homework continuam acessíveis.</span></div>`;
    }

    function render(song) {
        if (!isValidTrackId(song?.spotifyTrackId)) return renderUnavailable();
        const trackId = song.spotifyTrackId;
        return `<iframe
            class="music-cloze-spotify"
            data-spotify-state="ready"
            src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator"
            title="Ouvir ${escapeHtml(song.title)} — ${escapeHtml(song.artist)} no Spotify"
            width="100%"
            height="152"
            frameborder="0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>`;
    }

    globalScope.SpotifyEmbedV3 = Object.freeze({
        isValidTrackId,
        render,
        renderUnavailable
    });
}(window));
