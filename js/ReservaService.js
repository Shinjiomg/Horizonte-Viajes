const PAQUETE_LABELS = {
  caribe: 'Caribe Todo Incluido',
  europa: 'Europa Clásica',
  andes: 'Aventura en los Andes',
  personalizado: 'Viaje personalizado',
};

const PAQUETE_PRECIOS = {
  caribe: 'Desde $1.200 USD (temporada baja)',
  europa: 'Desde $2.800 USD (temporada baja)',
  andes: 'Desde $950 USD (todo el año)',
  personalizado: 'Cotización personalizada con un asesor',
};

class ReservaService {
  constructor(client) {
    this.client = client;
    this.table = 'horizonte_reservas';
  }

  async insertar(datos) {
    const { data, error } = await this.client
      .from(this.table)
      .insert([datos])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async modificar(id, datos) {
    const { data, error } = await this.client
      .from(this.table)
      .update(datos)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async listar() {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async obtener(id) {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async eliminar(id) {
    const { error } = await this.client
      .from(this.table)
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
}

function labelPaquete(codigo) {
  return PAQUETE_LABELS[codigo] || codigo;
}

function labelPaquetePrecio(codigo) {
  return PAQUETE_PRECIOS[codigo] || '';
}

function formatFecha(fecha) {
  if (!fecha) return '—';
  const parsed = new Date(`${fecha}T12:00:00`);
  return parsed.toLocaleDateString('es-CO', { dateStyle: 'medium' });
}

function leerDatosReserva(form) {
  return {
    nombre: form.nombre.value.trim(),
    apellido: form.apellido.value.trim(),
    email: form.email.value.trim().toLowerCase(),
    telefono: form.telefono.value.trim(),
    paquete: form.paquete.value,
    fecha_salida: form.salida.value,
    fecha_regreso: form.regreso.value,
    viajeros: form.viajeros?.value || null,
    comentarios: form.comentarios?.value.trim() || null,
  };
}

function validarFechasReserva(salida, regreso) {
  if (!salida || !regreso) return 'Indica las fechas de salida y regreso.';
  if (regreso < salida) return 'La fecha de regreso debe ser posterior a la de salida.';
  return null;
}

function initPaquetePrecio(form) {
  const select = form.paquete;
  const hint = form.querySelector('[data-paquete-precio]');
  if (!select || !hint) return;

  const textEl = hint.querySelector('span');

  const update = () => {
    const precio = labelPaquetePrecio(select.value);
    if (!precio) {
      hint.classList.add('hidden');
      return;
    }
    textEl.textContent = precio;
    hint.classList.remove('hidden');
  };

  select.addEventListener('change', update);
  form.addEventListener('reset', () => hint.classList.add('hidden'));
  update();
}

function initReservaForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  initPaquetePrecio(form);
  initCustomDropdowns(form);

  const reservaService = new ReservaService(getSupabaseClient());
  const submitBtn = form.querySelector('[type="submit"]');
  const defaultBtnHtml = submitBtn?.innerHTML;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = leerDatosReserva(form);
    const errorFechas = validarFechasReserva(datos.fecha_salida, datos.fecha_regreso);
    if (errorFechas) {
      showToast(errorFechas, 'warning', { title: 'Revisa las fechas' });
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando solicitud...';
    }

    try {
      await reservaService.insertar(datos);
      showToast(
        'Un asesor de Horizonte Viajes te contactará en menos de 24 horas.',
        'success',
        { title: '¡Solicitud enviada!' }
      );
      form.reset();
      if (typeof closeReservaModal === 'function') closeReservaModal();
    } catch (err) {
      showToast(
        err.message || 'No se pudo registrar la reserva. Intenta de nuevo.',
        'error',
        { title: 'Error al enviar' }
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = defaultBtnHtml;
      }
    }
  });
}
