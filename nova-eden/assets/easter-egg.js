(() => {
  const triggerSelector = '.debrief-footer .primary-action';
  let overlay;
  let previousFocus;
  let revealed = false;
  let hideTimer;

  const updateTrigger = () => {
    const button = document.querySelector(triggerSelector);
    if (!button) return;

    const label = button.querySelector('span');
    const icon = button.querySelector('b');

    if (revealed) {
      if (label && label.textContent !== 'RUN A NEW TIMELINE') label.textContent = 'RUN A NEW TIMELINE';
      if (icon && icon.textContent !== '↺') icon.textContent = '↺';
      if (button.getAttribute('aria-label') !== 'Run a new timeline') {
        button.setAttribute('aria-label', 'Run a new timeline');
      }
      return;
    }

    if (label && label.textContent !== 'ONE LAST QUESTION') label.textContent = 'ONE LAST QUESTION';
    if (icon && icon.textContent !== '?') icon.textContent = '?';
    if (button.getAttribute('aria-label') !== 'Reveal one last question') {
      button.setAttribute('aria-label', 'Reveal one last question');
    }
  };

  const closeEasterEgg = () => {
    if (!overlay || overlay.hidden) return;

    revealed = true;
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('easter-egg-open');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      overlay.hidden = true;
      updateTrigger();
      previousFocus?.focus();
    }, 280);
  };

  const createOverlay = () => {
    if (overlay) return overlay;

    overlay = document.createElement('section');
    overlay.className = 'easter-egg-screen';
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-labelledby', 'easter-egg-question');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.innerHTML = `
      <div class="easter-egg-grid" aria-hidden="true"></div>
      <button class="easter-egg-close" type="button" aria-label="Voltar ao debrief">×</button>
      <div class="easter-egg-content">
        <p class="easter-egg-kicker">FINAL BORDER CHECK // UNCLASSIFIED</p>
        <figure class="easter-egg-photo-frame">
          <img src="./assets/nova-eden-easter-egg.jpeg" alt="Foto surpresa do professor" />
          <span>SUBJECT // UNKNOWN</span>
        </figure>
        <h2 id="easter-egg-question">
          <span>E esse cara,</span>
          <strong>vocês deixariam entrar?</strong>
        </h2>
        <button class="easter-egg-back" type="button">← VOLTAR AO DEBRIEF</button>
      </div>
    `;

    overlay.querySelector('.easter-egg-close').addEventListener('click', closeEasterEgg);
    overlay.querySelector('.easter-egg-back').addEventListener('click', closeEasterEgg);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeEasterEgg();
    });
    document.body.appendChild(overlay);
    return overlay;
  };

  const showEasterEgg = (trigger) => {
    const element = createOverlay();
    previousFocus = trigger;
    window.clearTimeout(hideTimer);
    element.hidden = false;
    element.setAttribute('aria-hidden', 'false');
    document.body.classList.add('easter-egg-open');
    window.requestAnimationFrame(() => {
      element.classList.add('is-visible');
      element.querySelector('.easter-egg-close').focus();
    });
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest?.(triggerSelector);
    if (!trigger || revealed) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    showEasterEgg(trigger);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay && !overlay.hidden) closeEasterEgg();
  });

  const observer = new MutationObserver(updateTrigger);
  const start = () => {
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    updateTrigger();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
