document.addEventListener('DOMContentLoaded', function () {

  // SELECCIONA links en Series y Videojuegos
  const links = document.querySelectorAll('.linksjuegos a, .linksjuegos2 a, .linkserie a');

  const RECHARGE_TIME = 6000;  // 6 segundos
  const SHRINK_DELAY = 1000;   // 1 segundo
  const shrinkTimeouts = new WeakMap();
  const audio = document.getElementById('omnitrix-sound');

  links.forEach((link, index) => {

    // Si no tiene data-id, se genera uno único
    if (!link.hasAttribute('data-id')) {
      link.setAttribute('data-id', 'link-' + index);
    }

    const id = link.getAttribute('data-id');
    const url = link.getAttribute('href');

    // --- CARGAR ESTADO GUARDADO ---
    const saved = localStorage.getItem(`omnitrix_${id}`);
    if (saved) {
      const { state, expire } = JSON.parse(saved);
      const now = Date.now();

      if (now < expire) {
        const remaining = expire - now;
        if (state === 'recharging') {
          startRecharge(link, remaining);
        } else if (state === 'ready') {
          link.classList.add('ready');
          if (!link.matches(':hover')) scheduleShrink(link);
        }
      } else {
        localStorage.removeItem(`omnitrix_${id}`);
        resetToGray(link);
      }
    } else {
      resetToGray(link);
    }

    // --- HOVER NORMAL ---
    link.addEventListener('mouseenter', () => {
      if (link.classList.contains('recharging') || link.classList.contains('ready')) return;
      link.style.width = '100%';
      link.style.background = 'radial-gradient(#ccff14, #17fc03, #17fc03, #17fc03)';
      link.style.boxShadow = '0 0 15px rgba(0,255,0,0.4), inset 0 0 20px rgba(0,0,0,0.8)';
    });

    link.addEventListener('mouseleave', () => {
      if (link.classList.contains('recharging') || link.classList.contains('ready')) return;
      resetToGray(link);
    });

    // --- CLICK ---
    link.addEventListener('click', (e) => {
      if (link.classList.contains('recharging') || link.classList.contains('ready')) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (url && url !== "#") window.open(url, "_blank");

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => { });
      }

      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

      link.classList.add('recharging');
      link.style.width = '100%';

      // ⚠ Corregido: animación correcta "recarga"
      link.style.animation = 'none';
      void link.offsetWidth;
      link.style.animation = `recarga ${RECHARGE_TIME / 1000}s ease-in-out forwards`;

      localStorage.setItem(`omnitrix_${id}`, JSON.stringify({
        state: 'recharging',
        expire: Date.now() + RECHARGE_TIME
      }));

      startRecharge(link, RECHARGE_TIME);
    });

    // --- READY HOVER ---
    link.addEventListener('mouseenter', () => {
      if (link.classList.contains('ready')) {
        cancelShrink(link);
        link.style.width = '100%';
      }
    });

    link.addEventListener('mouseleave', () => {
      if (link.classList.contains('ready')) {
        scheduleShrink(link);
      }
    });

  });

  // --- INICIAR RECARGA ---
  function startRecharge(link, duration) {
    setTimeout(() => {
      link.classList.remove('recharging');
      link.classList.add('ready');
      link.style.background = 'radial-gradient(#ccff14, #17fc03, #17fc03, #17fc03)';
      link.style.boxShadow = '0 0 15px rgba(0,255,0,0.4), inset 0 0 20px rgba(0,0,0,0.8)';

      localStorage.setItem(`omnitrix_${link.getAttribute('data-id')}`, JSON.stringify({
        state: 'ready',
        expire: Date.now() + SHRINK_DELAY
      }));

      if (!link.matches(':hover')) scheduleShrink(link);
    }, duration);
  }

  // --- VOLVER A GRIS ---
  function scheduleShrink(link) {
    cancelShrink(link);
    const timeout = setTimeout(() => {
      link.classList.remove('ready');
      resetToGray(link);
      localStorage.removeItem(`omnitrix_${link.getAttribute('data-id')}`);
    }, SHRINK_DELAY);
    shrinkTimeouts.set(link, timeout);
  }

  function cancelShrink(link) {
    const t = shrinkTimeouts.get(link);
    if (t) clearTimeout(t);
    shrinkTimeouts.delete(link);
  }

	function resetToGray(link) {
		link.style.animation = 'none';
		void link.offsetWidth; 
		link.style.width = '80%';
		link.style.background = 'radial-gradient(#737778, #464a4a, #1C2526, #181c1c)';
		link.style.boxShadow = 'none';

		link.classList.remove('ready', 'recharging');
	}
	

});
