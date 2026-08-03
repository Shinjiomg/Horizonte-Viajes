# Documento de Análisis

**Estudiante:** Jhonatan David Becerra Donado  
**Código:** 100191481  
**Correo institucional:** jbecer19@estudiante.ibero.edu.co  
**Programa:** Ingeniería de Software  

**Proyecto:** Horizonte Viajes — Agencia de Viajes  
**Entrega:** Proyecto Final — CRUD integrado al sitio web  
**Temática:** Agencia de viajes  
**Repositorio:** https://github.com/Shinjiomg/Horizonte-Viajes  
**Fecha:** Agosto 2026

---

## 1. Introducción

El presente documento describe el sitio web **Horizonte Viajes**, una agencia de viajes ficticia desarrollada como **proyecto final** del diplomado. El sitio combina páginas públicas de contenido turístico con un módulo **CRUD de solicitudes de reserva**, conectado a una base de datos en la nube (Supabase / PostgreSQL).

La interfaz se construyó con **HTML5**, **Tailwind CSS** (compilado desde `css/input.css`) y **JavaScript**. El backend de datos utiliza **Supabase** en lugar de PHP/MySQL, aplicando el mismo patrón de operaciones CRUD visto en las videoclases (Create, Read, Update, Delete) mediante la clase `ReservaService`.

## 2. Temática del Proyecto

Se mantuvo la temática de **agencia de viajes** para que el CRUD no sea un módulo aislado de “usuarios”, sino **solicitudes de viaje** coherentes con el negocio: el visitante reserva un paquete; el operador gestiona esas solicitudes.

## 3. Estructura del Proyecto

| Archivo / Carpeta | Descripción |
|---|---|
| `index.html` | Página de inicio: carousel, quiénes somos, destinos populares, CTA de reserva |
| `pagina.html` | Destinos: paquetes, tabla de precios por temporada, CTA de reserva |
| `reservas.html` | **CRUD — Listar / Eliminar** solicitudes de reserva |
| `editar-reserva.html` | Redirección a `reservas.html?edit={id}` (enlaces antiguos) |
| `js/ReservaService.js` | **Clase CRUD:** insertar, modificar, listar, obtener, eliminar |
| `js/reserva-modal.js` | Modal reutilizable con formulario de registro (Create) |
| `js/dropdown.js` | Dropdowns personalizados para selects del formulario |
| `js/layout.js` | Header, footer, toasts y utilidades de navegación |
| `js/carousel.js` | Carousel del hero en inicio |
| `js/config.js` | Configuración de conexión a Supabase |
| `css/input.css` | Fuente Tailwind con componentes reutilizables (`@apply`) |
| `css/main.css` | Hoja de estilos compilada |
| `database/horizonte_viajes.sql` | Esquema descargable (entrega académica); no requiere importación para evaluar |
| `Documento_Analisis.md` | Este documento |
| `README.md` | Instrucciones de uso, pruebas y despliegue |

Las imágenes provienen de **Unsplash** mediante URLs externas.

## 4. Módulo CRUD

### 4.1 Equivalencia con la consigna

| Requisito | Archivo / componente |
|---|---|
| Formulario de registro | Modal en `js/reserva-modal.js` (disparado desde navbar, footer, CTAs) |
| Tabla con acciones Modificar / Eliminar | `reservas.html` |
| Formulario de edición | Modal en `reservas.html` (`js/reserva-modal.js` → `openEditReservaModal`) |
| Clase con Insertar, Modificar, Listar, Eliminar | `ReservaService` en `js/ReservaService.js` |
| Base de datos en carpeta | `database/horizonte_viajes.sql` (esquema; la app usa Supabase en la nube) |

### 4.2 Tabla `horizonte_reservas`

Campos principales: `id`, `nombre`, `apellido`, `email`, `telefono`, `paquete`, `fecha_salida`, `fecha_regreso`, `viajeros`, `comentarios`, `created_at`, `updated_at`.

### 4.3 Flujo de datos

1. El visitante abre el modal **Reservar**, completa el formulario y envía.
2. `ReservaService.insertar()` guarda en Supabase.
3. En `reservas.html`, `listar()` muestra todas las solicitudes.
4. **Modificar** abre el modal de edición con los datos cargados → `modificar()`.
5. **Eliminar** ejecuta `eliminar()` tras confirmación del usuario.

### 4.4 Base de datos en la nube y archivo SQL

El sitio **no depende de XAMPP ni de MySQL local**. La conexión ya está configurada en `js/config.js` hacia un proyecto **Supabase en la nube** (referencia `smhrftrapxedxlqqmroc`, proyecto `horizonte`). Quien clone el repositorio y abra las páginas con internet puede ejecutar el CRUD de inmediato: las operaciones Create, Read, Update y Delete persisten en esa base compartida del prototipo académico.

El archivo `database/horizonte_viajes.sql` cumple el requisito de entregar el **esquema descargable** (tabla, índices, políticas RLS y trigger). Documenta la estructura ya desplegada en Supabase; **no es necesario importarlo** para revisar o calificar el proyecto. Solo sería útil si otra persona desea replicar la base en un proyecto Supabase propio y actualizar las credenciales en `js/config.js`.

Por tratarse de un entorno de demostración con acceso `anon` para el prototipo, las solicitudes registradas durante las pruebas son datos reales en la nube compartida. Se recomienda no ingresar información personal sensible.

## 5. Elementos de la Interfaz Gráfica

### 5.1 Navegación

Header fijo generado por `layout.js`: barra superior con contacto, navbar con enlaces **Inicio** y **Destinos**, botón **Reservar** (abre modal) y footer con enlace a **Gestión de reservas**.

### 5.2 Página de inicio

- Carousel de tres destinos (Caribe, Andes, Europa) con controles automáticos.
- Sección “Quiénes somos” con imagen, lista de servicios y métricas.
- Galería y ranking “Top 5 destinos 2026”.
- Banda CTA final que abre el modal de reserva.

### 5.3 Página de destinos

- Hero con breadcrumb y métricas.
- Tres paquetes destacados con botón **Reservar** (preselecciona paquete en el modal).
- Tabla de precios por temporada con badges de alta/baja.
- Lista de beneficios incluidos y CTA de reserva.

### 5.4 Formulario de reserva (modal)

Grid responsive de tres columnas en escritorio, dropdowns personalizados para paquete y número de viajeros, validación de fechas y toast de confirmación al enviar.

### 5.5 Panel administrativo

- `reservas.html`: tabla responsive con datos del cliente, paquete, fechas y acciones (editar en modal, eliminar).

## 6. Diseño Responsive

Tailwind CSS proporciona breakpoints (`sm`, `md`, `lg`) para grids, navegación colapsable, modal a pantalla completa en móvil y tablas con scroll horizontal. Los componentes compartidos (formularios, modal, CTA) están centralizados en `css/input.css` mediante `@layer components`.

## 7. Paleta y tipografía

| Token Tailwind | Valor | Uso |
|---|---|---|
| `primary` | `#0077b6` | Enlaces, títulos, CTA band |
| `secondary` | `#00b4d8` | Acentos secundarios |
| `accent` | `#f77f00` | Botones principales, badges |
| `footer` | `#023e8a` | Header, footer, tablas |
| `section-blue` | `#dceef7` | Fondos de sección |
| `section-soft` | `#f0f7fa` | Fondo general |
| `font-display` | Fraunces | Títulos |
| `font-sans` | Poppins | Texto general |

## 8. Pruebas realizadas

Se verificó el ciclo completo CRUD:

1. **Create** — Registro de solicitud desde el modal de reserva.
2. **Read** — Visualización en tabla de `reservas.html`.
3. **Update** — Edición en modal desde `reservas.html` y persistencia de cambios.
4. **Delete** — Eliminación con confirmación desde el panel.

## 9. Conclusiones

El proyecto **Horizonte Viajes** cumple los objetivos del **proyecto final** integrando el CRUD en la temática de agencia de viajes. Se demuestra el dominio de formularios, tablas, operaciones sobre base de datos y organización de código en una clase de servicio, con una interfaz responsive y contenido multimedia coherente.

## 10. Referencias

- López Quijado, J. (2014). *Domine PHP y MySQL* (2a. ed.). RA-MA Editorial.
- Tailwind CSS. (2024). *Documentation*. https://tailwindcss.com
- Supabase. *Documentation*. https://supabase.com/docs
- Bootstrap Icons. https://icons.getbootstrap.com
- Unsplash. https://unsplash.com
