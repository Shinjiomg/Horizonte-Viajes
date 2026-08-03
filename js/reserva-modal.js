function renderReservaFormHtml() {
  return `
    <form id="form-reserva" class="w-full">
      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="resNombre">Nombre</label>
          <input type="text" id="resNombre" name="nombre" required placeholder="Tu nombre" class="form-control">
        </div>
        <div class="form-field">
          <label class="form-label" for="resApellido">Apellido</label>
          <input type="text" id="resApellido" name="apellido" required placeholder="Tu apellido" class="form-control">
        </div>
        <div class="form-field form-field--span-2-sm form-field--span-1-lg">
          <label class="form-label" for="resTelefono">Teléfono</label>
          <input type="tel" id="resTelefono" name="telefono" required placeholder="+57 300 000 0000" class="form-control">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="resEmail">Correo electrónico</label>
          <input type="email" id="resEmail" name="email" required placeholder="correo@ejemplo.com" class="form-control">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="resPaquete">Paquete de interés</label>
          <select id="resPaquete" name="paquete" required class="hv-select" data-placeholder="Selecciona un paquete">
            <option value="" disabled selected>Selecciona un paquete</option>
            <option value="caribe">Caribe Todo Incluido — desde $1.200 USD</option>
            <option value="europa">Europa Clásica — desde $2.800 USD</option>
            <option value="andes">Aventura en los Andes — desde $950 USD</option>
            <option value="personalizado">Viaje personalizado — cotización a medida</option>
          </select>
          <p data-paquete-precio class="form-hint hidden"><i class="bi bi-tag-fill"></i><span></span></p>
        </div>
        <div class="form-field">
          <label class="form-label" for="resSalida">Fecha de salida</label>
          <input type="date" id="resSalida" name="salida" required class="form-control form-control--date">
        </div>
        <div class="form-field">
          <label class="form-label" for="resRegreso">Fecha de regreso</label>
          <input type="date" id="resRegreso" name="regreso" required class="form-control form-control--date">
        </div>
        <div class="form-field">
          <label class="form-label" for="resViajeros">Número de viajeros</label>
          <select id="resViajeros" name="viajeros" required class="hv-select" data-placeholder="Selecciona">
            <option value="" disabled selected>Selecciona</option>
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas</option>
            <option value="6+">6 o más</option>
          </select>
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="resComentarios">Comentarios adicionales <span class="form-label__optional">(opcional)</span></label>
          <textarea id="resComentarios" name="comentarios" rows="3" placeholder="Preferencias de hotel, actividades..." class="form-control"></textarea>
        </div>
        <div class="form-field form-field--full">
          <label class="form-checkbox">
            <input type="checkbox" id="resTerminos" name="terminos" required>
            <span>Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a></span>
          </label>
        </div>
        <div class="form-field form-field--full">
          <button type="submit" class="btn btn--accent"><i class="bi bi-airplane-fill"></i>Confirmar reserva</button>
        </div>
      </div>
      <div class="form-trust">
        <span><i class="bi bi-shield-check"></i>Reserva segura</span>
        <span><i class="bi bi-clock"></i>Respuesta en 24 h</span>
        <span><i class="bi bi-credit-card"></i>Pago en cuotas</span>
      </div>
    </form>`;
}

function mountReservaModal() {
  if (document.getElementById('reserva-modal')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
<div id="reserva-modal" class="fixed inset-0 z-[10000] hidden" aria-hidden="true">
  <div class="modal__backdrop" data-close-reserva></div>
  <div class="modal__wrap">
    <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="reserva-modal-title">
      <div class="modal__bar"></div>
      <div class="modal__header">
        <div class="modal__header-main">
          <span class="modal__header-icon"><i class="bi bi-calendar-check"></i></span>
          <div>
            <h2 id="reserva-modal-title" class="modal__title">Reserva tu viaje</h2>
            <p class="modal__desc">Completa el formulario y un asesor te contactará en menos de 24 horas.</p>
          </div>
        </div>
        <button type="button" data-close-reserva class="modal__close" aria-label="Cerrar">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="modal__body">
        ${renderReservaFormHtml()}
      </div>
    </div>
  </div>
</div>`;
  document.body.appendChild(wrapper.firstElementChild);

  document.querySelectorAll('[data-close-reserva]').forEach((el) => {
    el.addEventListener('click', closeReservaModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeReservaModal();
  });

  initCustomDropdowns(document.getElementById('reserva-modal'));
}

function openReservaModal(options = {}) {
  const modal = document.getElementById('reserva-modal');
  const form = document.getElementById('form-reserva');
  if (!modal || !form) return;

  if (options.paquete && form.paquete) {
    setCustomDropdownValue(form.paquete, options.paquete);
  }

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');

  const firstInput = form.querySelector('.form-control, .hv-dropdown__trigger');
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

function closeReservaModal() {
  const modal = document.getElementById('reserva-modal');
  if (!modal || modal.classList.contains('hidden')) return;

  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');
}

function bindReservaTriggers() {
  document.querySelectorAll('[data-open-reserva]').forEach((trigger) => {
    if (trigger.dataset.reservaBound) return;
    trigger.dataset.reservaBound = 'true';

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const paquete = trigger.dataset.paquete || '';
      openReservaModal({ paquete });
    });
  });
}

function setupReservaApp() {
  mountReservaModal();
  if (!window.__reservaFormReady) {
    initReservaForm('form-reserva');
    window.__reservaFormReady = true;
  }
  bindReservaTriggers();
}

function reservaBtnClass(extra = '') {
  return `cta-band__btn ${extra}`.trim();
}

function reservaBtnOutlineClass(extra = '') {
  return `btn--pill-accent ${extra}`.trim();
}
