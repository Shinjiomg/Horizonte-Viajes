# Horizonte Viajes

Sitio web de agencia de viajes ficticia — **Proyecto Final** (Ingeniería de Software, Ibero).

**Estudiante:** Jhonatan David Becerra Donado · **Código:** 100191481  
**Repositorio:** [github.com/Shinjiomg/Horizonte-Viajes](https://github.com/Shinjiomg/Horizonte-Viajes)

---

## Descripción

Horizonte Viajes es un aplicativo web con páginas públicas (inicio y destinos) y un módulo **CRUD de solicitudes de reserva**, integrado temáticamente con la agencia. Los visitantes envían reservas desde un modal; el área administrativa permite listar, editar y eliminar solicitudes.

**Modalidad:** desarrollo individual (la consigna permite colaboración; este repositorio es trabajo en solitario).

## Proyecto Final — Requisitos cubiertos

| Requisito de la actividad | Implementación |
|---|---|
| CRUD de la Actividad 4 integrado | `ReservaService.js` + `reservas.html` |
| Mínimo 3 interfaces responsive | `index.html`, `pagina.html`, `reservas.html` |
| Navbar y footer | `js/layout.js` |
| Formulario registro / contacto | Modal **Reservar** |
| Multimedia (texto, imágenes, video, slider) | Carousel, Unsplash, video HTML5, animaciones scroll |
| Documentación del proyecto | `Documento_Analisis.md` |
| Mockups | `docs/mockups/mockups.md` |
| Metodología ágil (Scrum) | Sección 3 del documento de análisis |
| Repositorio GitHub | Este repositorio |

## Proyecto Final — Módulo CRUD

| Requisito académico | Implementación en este proyecto |
|---|---|
| Formulario de registro | Modal de reserva (`data-open-reserva` → `#form-reserva`) |
| Tabla + Modificar / Eliminar | `reservas.html` |
| Formulario de edición | Modal reutilizable en `reservas.html` (`openEditReservaModal`) |
| Clase CRUD (Insertar, Modificar, Listar, Eliminar) | `js/ReservaService.js` |
| Base de datos | `database/horizonte_viajes.sql` + Supabase (PostgreSQL) |

> **Nota técnica:** La consigna menciona PHP/MySQL/XAMPP como referencia de las videoclases. Este proyecto implementa el mismo patrón CRUD con **JavaScript (clase `ReservaService`)** y **Supabase** como backend, manteniendo la temática del sitio de viajes.

---

## Estructura del proyecto

```
Horizonte-Viajes/
├── index.html              # Inicio: carousel, nosotros, destinos, CTA reserva
├── pagina.html             # Destinos: paquetes, tabla de precios, CTA reserva
├── reservas.html           # Panel CRUD: listar y eliminar solicitudes
├── editar-reserva.html     # Redirección a reservas.html (compatibilidad)
├── css/
│   ├── input.css           # Fuente Tailwind (@layer components)
│   └── main.css            # CSS compilado (generado)
├── js/
│   ├── config.js           # Conexión Supabase
│   ├── ReservaService.js   # Clase CRUD
│   ├── reserva-modal.js    # Modal y formulario de reserva
│   ├── dropdown.js         # Selects personalizados
│   ├── layout.js           # Header, footer, toasts
│   ├── carousel.js         # Hero carousel
│   └── animations.js       # Animaciones al scroll
├── docs/
│   └── mockups/
│       └── mockups.md      # Mockups estructurales del sitio
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
3. Para probar el CRUD, usa la franja **Gestión de reservas** del header o visita `reservas.html`.

No hace falta instalar XAMPP, MySQL ni crear un proyecto Supabase propio: el sitio ya viene conectado a la base de datos en la nube (ver sección siguiente).

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

### Uso normal (evaluación y demostración)

El aplicativo **ya está conectado** a un proyecto **Supabase en la nube**. Las credenciales públicas (`anon key`) están en `js/config.js`:

| Dato | Valor |
|---|---|
| Proyecto | `horizonte` |
| Referencia | `smhrftrapxedxlqqmroc` |
| URL | `https://smhrftrapxedxlqqmroc.supabase.co` |

Al abrir el sitio con internet, el CRUD funciona de inmediato: las reservas que crees, edites o elimines **se guardan en esa base real** (datos compartidos del prototipo académico). El docente o quien revise el proyecto puede ver las mismas solicitudes en **Gestión de reservas** sin configurar nada adicional.

> **Importante:** Es un entorno de demostración con políticas RLS abiertas para `anon`. No uses datos personales reales sensibles.

### Archivo SQL (`database/horizonte_viajes.sql`)

El script en la carpeta `database/` cumple el requisito de entrega del **esquema descargable**: define la tabla `horizonte_reservas`, índices, políticas RLS y trigger de `updated_at`. Documenta la estructura que ya está desplegada en Supabase.

**No es necesario importarlo** para probar el proyecto clonado desde GitHub, salvo que quieras replicar la base en otro proyecto Supabase propio:

1. Crear proyecto en [supabase.com](https://supabase.com).
2. Ejecutar `horizonte_viajes.sql` en el SQL Editor.
3. Sustituir `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `js/config.js`.

---

## Plan de pruebas (CRUD)

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Abrir sitio → **Reservar** → completar formulario → **Confirmar reserva** | Toast de éxito; registro en Supabase |
| 2 | Ir a `reservas.html` | La solicitud aparece en la tabla |
| 3 | Clic en **Modificar** | Abre el modal de edición con los datos cargados |
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
