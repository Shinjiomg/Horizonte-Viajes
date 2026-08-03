# Documento de Análisis

**Estudiante:** Jhonatan David Becerra Donado  
**Código:** 100191481  
**Correo institucional:** jbecer19@estudiante.ibero.edu.co  
**Programa:** Ingeniería de Software  

**Proyecto:** Horizonte Viajes — Agencia de Viajes  
**Entrega:** Proyecto Final — Sitio web completo con CRUD integrado  
**Modalidad:** Desarrollo **individual** (la consigna permite trabajo colaborativo; este proyecto fue realizado en solitario)  
**Temática:** Agencia de viajes  
**Repositorio:** https://github.com/Shinjiomg/Horizonte-Viajes  
**Fecha:** Agosto 2026

---

## 1. Introducción

El presente documento describe el sitio web **Horizonte Viajes**, una agencia de viajes ficticia desarrollada como **proyecto final** del diplomado. El sitio combina páginas públicas de contenido turístico con un módulo **CRUD de solicitudes de reserva**, conectado a una base de datos en la nube (Supabase / PostgreSQL).

La interfaz se construyó con **HTML5**, **Tailwind CSS** (compilado desde `css/input.css`) y **JavaScript**. El backend de datos utiliza **Supabase** en lugar de PHP/MySQL, aplicando el mismo patrón de operaciones CRUD visto en las videoclases (Create, Read, Update, Delete) mediante la clase `ReservaService`.

## 2. Temática del Proyecto

Se mantuvo la temática de **agencia de viajes** para que el CRUD no sea un módulo aislado de “usuarios”, sino **solicitudes de viaje** coherentes con el negocio: el visitante reserva un paquete; el operador gestiona esas solicitudes.

Desde **Ingeniería de Software**, el proyecto demuestra análisis de requisitos, diseño de interfaces, capa de servicios (`ReservaService`), persistencia en base de datos, documentación técnica y pruebas funcionales sobre un producto web real.

## 3. Metodología ágil (Scrum adaptado individual)

La consigna referencia *Métodos ágiles: Scrum, Kanban, Lean* (Heras del Dedo y Álvarez García, 2017). Al tratarse de un proyecto **individual**, se aplicó Scrum en formato de **equipo de una persona**, asumiendo los roles de Product Owner y Developer.

| Elemento Scrum | Aplicación en Horizonte Viajes |
|---|---|
| **Product Backlog** | Requisitos del proyecto final + CRUD de la Actividad 4 |
| **Sprint 1** | Estructura HTML, navbar, footer, páginas públicas |
| **Sprint 2** | CRUD con Supabase, modal de reserva, panel admin |
| **Sprint 3** | Responsive, documentación, mockups, multimedia y pruebas |
| **Definition of Done** | Página funcional, responsive, documentada y probada |
| **Kanban (tablero)** | Tareas organizadas por estado: pendiente → en progreso → hecho |

Buenas prácticas aplicadas: separación de responsabilidades (HTML / CSS / JS), componentes reutilizables en `layout.js` y `reserva-modal.js`, validación en cliente, mensajes de retroalimentación (toasts) y repositorio versionado en GitHub.

## 4. Mockups del proyecto

Los mockups se documentan en `docs/mockups/mockups.md` e incluyen:

- **Baja fidelidad:** diagramas de bloques por página (inicio, destinos, panel CRUD).
- **Alta fidelidad:** prototipo implementado en HTML + Tailwind CSS (páginas finales del repositorio).
- **Flujo del formulario:** diagrama del registro de reserva hasta la persistencia en Supabase.

Esta aproximación cumple el requisito de las videoclases sobre creación de mockups, adaptada a un desarrollador único que iteró diseño e implementación en el mismo código base.

## 5. Estructura del Proyecto

| Archivo / Carpeta | Descripción |
|---|---|
| `index.html` | Página de inicio: carousel, nosotros, destinos, video, CTA de reserva |
| `pagina.html` | Destinos: paquetes, tabla de precios por temporada, CTA de reserva |
| `reservas.html` | **CRUD — Listar / Eliminar** solicitudes de reserva |
| `editar-reserva.html` | Redirección a `reservas.html?edit={id}` (enlaces antiguos) |
| `js/ReservaService.js` | **Clase CRUD:** insertar, modificar, listar, obtener, eliminar |
| `js/reserva-modal.js` | Modal reutilizable con formulario de registro (Create) |
| `js/dropdown.js` | Dropdowns personalizados para selects del formulario |
| `js/layout.js` | Header, footer, toasts y utilidades de navegación |
| `js/carousel.js` | Carousel del hero en inicio |
| `js/animations.js` | Animaciones de entrada al hacer scroll |
| `js/config.js` | Configuración de conexión a Supabase |
| `docs/mockups/mockups.md` | Mockups estructurales del proyecto |
| `css/input.css` | Fuente Tailwind con componentes reutilizables (`@apply`) |
| `css/main.css` | Hoja de estilos compilada |
| `database/horizonte_viajes.sql` | Esquema descargable (entrega académica); no requiere importación para evaluar |
| `Documento_Analisis.md` | Este documento |
| `README.md` | Instrucciones de uso, pruebas y despliegue |

Las imágenes provienen de **Unsplash** mediante URLs externas.

## 6. Módulo CRUD

### 6.1 Equivalencia con la consigna

| Requisito | Archivo / componente |
|---|---|
| Formulario de registro | Modal en `js/reserva-modal.js` (disparado desde navbar, footer, CTAs) |
| Tabla con acciones Modificar / Eliminar | `reservas.html` |
| Formulario de edición | Modal en `reservas.html` (`js/reserva-modal.js` → `openEditReservaModal`) |
| Clase con Insertar, Modificar, Listar, Eliminar | `ReservaService` en `js/ReservaService.js` |
| Base de datos en carpeta | `database/horizonte_viajes.sql` (esquema; la app usa Supabase en la nube) |

### 6.2 Tabla `horizonte_reservas`

Campos principales: `id`, `nombre`, `apellido`, `email`, `telefono`, `paquete`, `fecha_salida`, `fecha_regreso`, `viajeros`, `comentarios`, `created_at`, `updated_at`.

### 6.3 Flujo de datos

1. El visitante abre el modal **Reservar**, completa el formulario y envía.
2. `ReservaService.insertar()` guarda en Supabase.
3. En `reservas.html`, `listar()` muestra todas las solicitudes.
4. **Modificar** abre el modal de edición con los datos cargados → `modificar()`.
5. **Eliminar** ejecuta `eliminar()` tras confirmación del usuario.

### 6.4 Base de datos en la nube y archivo SQL

El sitio **no depende de XAMPP ni de MySQL local**. La conexión ya está configurada en `js/config.js` hacia un proyecto **Supabase en la nube** (referencia `smhrftrapxedxlqqmroc`, proyecto `horizonte`). Quien clone el repositorio y abra las páginas con internet puede ejecutar el CRUD de inmediato: las operaciones Create, Read, Update y Delete persisten en esa base compartida del prototipo académico.

El archivo `database/horizonte_viajes.sql` cumple el requisito de entregar el **esquema descargable** (tabla, índices, políticas RLS y trigger). Documenta la estructura ya desplegada en Supabase; **no es necesario importarlo** para revisar o calificar el proyecto. Solo sería útil si otra persona desea replicar la base en un proyecto Supabase propio y actualizar las credenciales en `js/config.js`.

Por tratarse de un entorno de demostración con acceso `anon` para el prototipo, las solicitudes registradas durante las pruebas son datos reales en la nube compartida. Se recomienda no ingresar información personal sensible.

## 7. Elementos de la Interfaz Gráfica

### 7.1 Navegación

Header fijo generado por `layout.js`: barra superior con contacto, navbar con enlaces **Inicio** y **Destinos**, botón **Reservar** (abre modal) y footer con enlace a **Gestión de reservas**.

### 7.2 Página de inicio

- Carousel de tres destinos (Caribe, Andes, Europa) con controles automáticos.
- Sección “Quiénes somos” con imagen, lista de servicios y métricas.
- Galería y ranking “Top 5 destinos 2026”.
- Sección multimedia con **video HTML5** e invitación a reservar.
- Banda CTA final que abre el modal de reserva.

### 7.3 Página de destinos

- Hero con breadcrumb y métricas.
- Tres paquetes destacados con botón **Reservar** (preselecciona paquete en el modal).
- Tabla de precios por temporada con badges de alta/baja.
- Lista de beneficios incluidos y CTA de reserva.

### 7.4 Formulario de reserva (modal)

Grid responsive de tres columnas en escritorio, dropdowns personalizados para paquete y número de viajeros, validación de fechas y toast de confirmación al enviar.

### 7.5 Panel administrativo

- `reservas.html`: tabla responsive con datos del cliente, paquete, fechas y acciones (editar en modal, eliminar).

## 8. Contenido multimedia y animaciones

| Tipo | Ubicación | Descripción |
|---|---|---|
| **Imágenes** | Todas las páginas | Fotografías de destinos (Unsplash) |
| **Slider / carousel** | `index.html` | Hero con 3 diapositivas automáticas |
| **Video** | `index.html` — sección *Vive la experiencia* | Reproductor HTML5 con `assets/video/fish.mp4` |
| **Párrafos y listas** | Inicio y destinos | Contenido informativo de la agencia |
| **Animaciones** | `js/animations.js` | Entrada suave de secciones al hacer scroll (`data-reveal`) |
| **Transiciones CSS** | Componentes UI | Hover en tarjetas, modal, carousel y botones |

## 9. Diseño Responsive

Tailwind CSS proporciona breakpoints (`sm`, `md`, `lg`) para grids, navegación colapsable, modal a pantalla completa en móvil y tablas con scroll horizontal. Los componentes compartidos (formularios, modal, CTA) están centralizados en `css/input.css` mediante `@layer components`.

## 10. Paleta y tipografía

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

## 11. Plan de pruebas

### 11.1 Pruebas CRUD (obligatorias para la entrega)

| # | Operación | Acción | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | **Create** | Modal Reservar → enviar formulario | Toast de éxito; registro en Supabase | OK |
| 2 | **Read** | Abrir `reservas.html` | La solicitud aparece en la tabla | OK |
| 3 | **Update** | Modificar → guardar en modal | Cambios visibles en la tabla | OK |
| 4 | **Delete** | Eliminar → confirmar | La fila desaparece | OK |

### 11.2 Pruebas de interfaz

| # | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| 5 | Responsive en móvil (< 640 px) | Navbar, modal y tablas usables | OK |
| 6 | Carousel inicio | Cambio automático y manual de slides | OK |
| 7 | Video embebido | Reproduce clip de viajes con controles nativos | OK |
| 8 | Animaciones scroll | Secciones aparecen al desplazarse | OK |
| 9 | Formulario inválido | Toast de advertencia en fechas incorrectas | OK |

## 12. Conclusiones

El proyecto **Horizonte Viajes** cumple los objetivos del **proyecto final**: sitio web responsive con multimedia, formulario de contacto/registro, CRUD integrado, documentación técnica, mockups, metodología ágil y pruebas funcionales. El trabajo individual se documentó aplicando Scrum de forma adaptada, demostrando competencias propias de la formación en Ingeniería de Software.

## 13. Referencias

- Heras del Dedo, R. D. L., y Álvarez García, A. (2017). *Métodos ágiles: Scrum, Kanban, Lean*. Difusora Larousse - Anaya Multimedia.

- López Quijado, J. (2014). *Domine PHP y MySQL* (2a. ed.). RA-MA Editorial.
- Tailwind CSS. (2024). *Documentation*. https://tailwindcss.com
- Supabase. *Documentation*. https://supabase.com/docs
- Bootstrap Icons. https://icons.getbootstrap.com
- Unsplash. https://unsplash.com
