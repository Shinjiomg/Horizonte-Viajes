const NAV_LINKS = [
  { href: 'index.html', label: 'Inicio', key: 'inicio' },
  { href: 'pagina.html', label: 'Destinos', key: 'destinos' },
];

function navLinkClass(active, key) {
  const base = 'block rounded-lg px-4 py-2.5 text-sm font-medium transition lg:inline-block lg:px-4 lg:py-2';
  if (active === key) {
    return `${base} border-l-[3px] border-accent bg-white/10 pl-[calc(1rem-3px)] font-semibold text-white lg:border-l-0 lg:border-b-2 lg:border-accent lg:bg-transparent lg:pl-4`;
  }
  return `${base} text-white/90 hover:text-white lg:hover:text-accent`;
}

function renderHeader(active) {
  const links = NAV_LINKS.map(
    (l) => `<li><a class="${navLinkClass(active, l.key)}" href="${l.href}"${active === l.key ? ' aria-current="page"' : ''}>${l.label}</a></li>`
  ).join('');

  return `
<header class="fixed inset-x-0 top-0 z-50 shadow-lg shadow-footer/20">
  <div class="hidden bg-footer text-white/85 lg:block">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
      <div class="flex flex-wrap gap-x-6 gap-y-1">
        <span><i class="bi bi-telephone-fill mr-1 text-accent"></i> +57 300 123 4567</span>
        <span><i class="bi bi-envelope-fill mr-1 text-accent"></i> info@horizonteviajes.com</span>
        <span><i class="bi bi-clock-fill mr-1 text-accent"></i> Lun – Vie, 8:00 a.m. – 6:00 p.m.</span>
      </div>
      <div class="flex gap-3">
        <a href="#" class="text-white/75 transition hover:text-accent" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="text-white/75 transition hover:text-accent" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="text-white/75 transition hover:text-accent" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
      </div>
    </div>
  </div>
  <nav class="border-b border-white/10 bg-footer/95 backdrop-blur-md">
    <div class="mx-auto max-w-7xl px-4 py-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
      <a href="index.html" class="flex min-w-0 items-center gap-3">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-lg text-white shadow-md shadow-accent/35"><i class="bi bi-airplane-fill"></i></span>
        <span class="min-w-0 leading-tight">
          <span class="block font-display text-xl font-bold tracking-wide text-white">Horizonte</span>
          <span class="hidden truncate text-[0.65rem] uppercase tracking-widest text-white/65 sm:block">Agencia de Viajes</span>
        </span>
      </a>
      <button id="nav-toggle" type="button" class="inline-flex items-center justify-center rounded-lg p-2 text-white lg:hidden" aria-controls="nav-menu" aria-expanded="false" aria-label="Abrir menú">
        <i class="bi bi-list text-2xl"></i>
      </button>
      <div id="nav-menu" class="hidden w-full basis-full lg:block lg:w-auto lg:basis-auto">
        <ul class="flex flex-col gap-1 pt-3 lg:flex-row lg:items-center lg:gap-1 lg:pt-0">
          ${links}
          <li class="mt-2 lg:ml-2 lg:mt-0">
            <button type="button" data-open-reserva class="block w-full rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#e76f00] lg:inline-block">
              <i class="bi bi-calendar-check mr-1"></i>Reservar
            </button>
          </li>
        </ul>
      </div>
      </div>
    </div>
  </nav>
</header>`;
}

function renderFooter() {
  return `
<footer>
  <div class="bg-footer px-4 py-14 text-white/80">
    <div class="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <a href="index.html" class="mb-4 inline-flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white"><i class="bi bi-airplane-fill"></i></span>
          <span class="font-display text-2xl font-bold text-white">Horizonte Viajes</span>
        </a>
        <p class="mb-6 text-sm leading-relaxed text-white/65">Tu agencia de confianza para descubrir el mundo. Más de 10 años creando experiencias de viaje inolvidables con asesoría personalizada.</p>
        <ul class="space-y-3 text-sm">
          <li class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent"><i class="bi bi-geo-alt-fill"></i></span>Calle 45 #12-30, Bogotá, Colombia</li>
          <li class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent"><i class="bi bi-telephone-fill"></i></span>+57 300 123 4567</li>
          <li class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent"><i class="bi bi-envelope-fill"></i></span>info@horizonteviajes.com</li>
        </ul>
      </div>
      <div>
        <h5 class="mb-5 inline-block border-b-2 border-accent/40 pb-3 text-sm font-semibold uppercase tracking-widest text-white">Enlaces de interés</h5>
        <ul class="space-y-2 text-sm">
          <li><a href="index.html" class="inline-flex items-center gap-2 text-white/70 transition hover:text-white"><i class="bi bi-chevron-right text-accent"></i>Inicio</a></li>
          <li><a href="pagina.html" class="inline-flex items-center gap-2 text-white/70 transition hover:text-white"><i class="bi bi-chevron-right text-accent"></i>Paquetes turísticos</a></li>
          <li><a href="pagina.html" class="inline-flex items-center gap-2 text-white/70 transition hover:text-white"><i class="bi bi-chevron-right text-accent"></i>Tabla de precios</a></li>
          <li><button type="button" data-open-reserva class="inline-flex items-center gap-2 text-white/70 transition hover:text-white"><i class="bi bi-chevron-right text-accent"></i>Reservar viaje</button></li>
          <li><a href="reservas.html" class="inline-flex items-center gap-2 text-white/70 transition hover:text-white"><i class="bi bi-chevron-right text-accent"></i>Gestión de reservas</a></li>
        </ul>
      </div>
      <div>
        <h5 class="mb-5 inline-block border-b-2 border-accent/40 pb-3 text-sm font-semibold uppercase tracking-widest text-white">Redes sociales</h5>
        <p class="mb-5 text-sm text-white/60">Síguenos y entérate de promociones exclusivas para nuestros seguidores.</p>
        <div class="flex flex-wrap gap-2">
          <a href="#" class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/80 transition hover:border-accent hover:bg-accent hover:text-white" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/80 transition hover:border-accent hover:bg-accent hover:text-white" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/80 transition hover:border-accent hover:bg-accent hover:text-white" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#011027] px-4 py-5 text-center text-xs text-white/50 md:text-left">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
      <p>&copy; 2026 Horizonte Viajes S.A.S. — Proyecto Final Unidad 1</p>
      <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <a href="#" class="transition hover:text-accent">Política de privacidad</a>
        <a href="#" class="transition hover:text-accent">Términos y condiciones</a>
      </div>
    </div>
  </div>
</footer>`;
}

function mountLayout(active) {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = renderHeader(active);
  if (footer) footer.innerHTML = renderFooter();

  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  if (typeof bindReservaTriggers === 'function') bindReservaTriggers();
  bindScrollTargets();
}

function bindScrollTargets() {
  document.querySelectorAll('[data-scroll-to]').forEach((trigger) => {
    if (trigger.dataset.scrollBound) return;
    trigger.dataset.scrollBound = 'true';

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(trigger.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function ensureToastContainer() {
  let container = document.getElementById('toast-container');
  if (container) return container;

  container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'pointer-events-none fixed bottom-4 right-4 z-[9999] flex w-full max-w-sm flex-col-reverse gap-3';
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-atomic', 'false');
  document.body.appendChild(container);
  return container;
}

const TOAST_STYLES = {
  success: {
    bar: 'bg-emerald-500',
    icon: 'bi-check-circle-fill',
    iconColor: 'text-emerald-600',
    bg: 'bg-white',
  },
  error: {
    bar: 'bg-red-500',
    icon: 'bi-x-circle-fill',
    iconColor: 'text-red-600',
    bg: 'bg-white',
  },
  info: {
    bar: 'bg-primary',
    icon: 'bi-info-circle-fill',
    iconColor: 'text-primary',
    bg: 'bg-white',
  },
  warning: {
    bar: 'bg-accent',
    icon: 'bi-exclamation-triangle-fill',
    iconColor: 'text-accent',
    bg: 'bg-white',
  },
};

function showToast(message, type = 'success', options = {}) {
  const { duration = 5000, title } = options;
  const styles = TOAST_STYLES[type] || TOAST_STYLES.info;
  const container = ensureToastContainer();
  const toast = document.createElement('div');

  toast.className = `pointer-events-auto translate-y-4 overflow-hidden rounded-xl border border-slate-200 ${styles.bg} opacity-0 shadow-xl shadow-footer/10 transition-all duration-300 ease-out`;
  toast.innerHTML = `
    <div class="h-1 ${styles.bar}"></div>
    <div class="flex items-start gap-3 p-4">
      <span class="mt-0.5 text-xl ${styles.iconColor}"><i class="bi ${styles.icon}"></i></span>
      <div class="min-w-0 flex-1">
        ${title ? `<p class="mb-0.5 font-semibold text-footer">${title}</p>` : ''}
        <p class="text-sm leading-relaxed text-slate-600">${message}</p>
      </div>
      <button type="button" class="shrink-0 text-slate-400 transition hover:text-slate-600" aria-label="Cerrar">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>`;

  const dismiss = () => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('button').addEventListener('click', dismiss);
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }

  return dismiss;
}

function showAlert(containerId, message, type = 'success') {
  const titles = {
    success: 'Solicitud enviada',
    error: 'No se pudo completar',
    info: 'Información',
    warning: 'Atención',
  };
  showToast(message, type, { title: titles[type] || titles.info });
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-CO', { dateStyle: 'medium' });
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
