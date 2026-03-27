(function () {
    function ensureRegion() {
        let region = document.querySelector('.toast-region');
        if (region) return region;

        region = document.createElement('div');
        region.className = 'toast-region';
        region.setAttribute('aria-live', 'polite');
        region.setAttribute('aria-atomic', 'true');
        document.body.appendChild(region);
        return region;
    }

    window.showToast = function showToast(message, type, title) {
        const region = ensureRegion();
        const toast = document.createElement('div');
        const variant = type || 'info';
        toast.className = `toast toast-${variant}`;
        toast.innerHTML = `${title ? `<strong>${title}</strong>` : ''}<span>${message}</span>`;
        region.appendChild(toast);

        window.setTimeout(() => {
            toast.remove();
        }, 3200);
    };
})();
