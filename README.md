# Horizonte Viajes

Sitio web de agencia de viajes ficticia — **Proyecto Final Unidad 1** (Ingeniería de Software, Ibero).

**Estudiante:** Jhonatan David Becerra Donado · **Código:** 100191481  
**Repositorio:** [github.com/Shinjiomg/Horizonte-Viajes](https://github.com/Shinjiomg/Horizonte-Viajes)

---

## Descripción

Horizonte Viajes es un aplicativo web con páginas públicas (inicio y destinos) y un módulo **CRUD de solicitudes de reserva**, integrado temáticamente con la agencia. Los visitantes envían reservas desde un modal; el área administrativa permite listar, editar y eliminar solicitudes.

## Actividad 4 — Equivalencia CRUD

| Requisito académico | Implementación en este proyecto |
|---|---|
| Formulario de registro | Modal de reserva (`data-open-reserva` → `#form-reserva`) |
| Tabla + Modificar / Eliminar | `reservas.html` |
| Formulario de edición | `editar-reserva.html?id={id}` |
| Clase CRUD (Insertar, Modificar, Listar, Eliminar) | `js/ReservaService.js` |
| Base de datos | `database/horizonte_viajes.sql` + Supabase (PostgreSQL) |

> **Nota técnica:** La consigna menciona PHP/MySQL/XAMPP como referencia de las videoclases. Este proyecto implementa el mismo patrón CRUD con **JavaScript (clase `ReservaService`)** y **Supabase** como backend, manteniendo la temática del sitio de viajes.

---

## Estructura del proyecto

```
ProyectoFinalUnidad1/
├── index.html              # Inicio: carousel, nosotros, destinos, CTA reserva
├── pagina.html             # Destinos: paquetes, tabla de precios, CTA reserva
├── reservas.html           # Panel CRUD: listar y eliminar solicitudes
├── editar-reserva.html     # Panel CRUD: modificar solicitud
├── css/
│   ├── input.css           # Fuente Tailwind (@layer components)
│   └── main.css            # CSS compilado (generado)
├── js/
│   ├── config.js           # Conexión Supabase
│   ├── ReservaService.js   # Clase CRUD
│   ├── reserva-modal.js    # Modal y formulario de reserva
│   ├── dropdown.js         # Selects personalizados
│   ├── layout.js           # Header, footer, toasts
│   └── carousel.js         # Hero carousel
├── database/
│   └── horizonte_viajes.sql
├── Documento_Analisis.md
├── tailwind.config.js
└── package.json
```

---

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- Conexión a internet (Supabase, Unsplash, CDN de iconos/fuentes)
- **Opcional (solo para editar estilos):** Node.js 18+

---

## Cómo ejecutar

### Ver el sitio (sin instalar nada)

1. Clona o descarga el repositorio.
2. Abre `index.html` en el navegador (doble clic o Live Server).
3. Para probar el CRUD, usa **Gestión de reservas** en el footer o visita `reservas.html`.

El CSS ya viene compilado en `css/main.css`.

### Editar estilos Tailwind

```bash
npm install
npm run build:css
```

Para recompilar al guardar cambios:

```bash
npm run watch:css
```

---

## Base de datos

El script `database/horizonte_viajes.sql` crea la tabla `horizonte_reservas` con políticas RLS para el rol `anon` (prototipo académico).

**Proyecto Supabase:** `horizonte` · ref `smhrftrapxedxlqqmroc`

Para importar en un proyecto propio:

1. Crear proyecto en [supabase.com](https://supabase.com).
2. Ejecutar el SQL en el editor SQL del dashboard.
3. Actualizar `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `js/config.js`.

---

## Plan de pruebas (CRUD)

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Abrir sitio → **Reservar** → completar formulario → **Confirmar reserva** | Toast de éxito; registro en Supabase |
| 2 | Ir a `reservas.html` | La solicitud aparece en la tabla |
| 3 | Clic en **Modificar** | Abre `editar-reserva.html` con datos cargados |
| 4 | Cambiar un campo → **Guardar cambios** | Toast de éxito; cambios visibles en la tabla |
| 5 | Clic en **Eliminar** → confirmar | La fila desaparece de la tabla |

---

## Tecnologías

- HTML5, JavaScript (ES6+)
- Tailwind CSS 3 (compilado localmente)
- Bootstrap Icons
- Supabase (PostgreSQL + API REST)
- Google Fonts (Poppins, Fraunces)

---

## Licencia

Proyecto académico — uso educativo.
