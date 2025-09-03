# Reglas de Estilos del Proyecto

Este documento detalla las reglas y convenciones de estilo utilizadas en el proyecto para mantener la consistencia y facilitar el desarrollo.

## Cambios Recientes

### Estilos de Cards de Baterías (`_baterias.scss`)

- Se aplicaron los siguientes estilos a las cards de baterías (`.bateria-item`):
- **Variables de Breakpoints**: Se creó el archivo `src/scss/_variables.scss` para centralizar las definiciones de los breakpoints (`$breakpoint-sm`, `$breakpoint-md`, `$breakpoint-lg`, `$breakpoint-xl`, `$breakpoint-xxl`, `$breakpoint-xxxl`). Estos breakpoints se importan en `src/scss/style.scss` y se utilizan en `src/scss/_header.scss` y `src/scss/_sobre-mi.scss` para asegurar la consistencia en el diseño responsivo.
- **Clases de Utilidad Responsivas (Márgenes y Paddings)**: Se añadió un mixin `generate-spacing-classes` en `src/scss/_helpers.scss` para generar clases de utilidad responsivas para márgenes (`mt-`, `mr-`, `mb-`, `ml-`, `mx-`, `my-`, `m-`) y paddings (`pt-`, `pr-`, `pb-`, `pl-`, `px-`, `py-`, `p-`). Estas clases permiten aplicar espaciado con prefijos de breakpoint (ej. `mt-md-5`, `p-lg-3`), asegurando un diseño responsivo consistente.
- **Diseño Responsivo de Tarjetas en Hero**: Se ajustó el estilo de las tarjetas (`.hero-cards .card`) en `src/scss/_hero.scss` para que en dispositivos móviles se muestren dos tarjetas por fila (`width: calc(50% - 12.5px);`), utilizando `flex-wrap: wrap;` en el contenedor `.hero-cards`. Para pantallas medianas (`$breakpoint-md`) y superiores, el ancho de las tarjetas se restablece a `auto` para mantener el diseño original.
- **Deshabilitar Scroll en Modal**: Se añadió la clase `no-scroll` en `src/scss/_layout.scss` con `overflow: hidden;` para deshabilitar el scroll del `body` cuando un modal está activo. Esta clase se añade y se elimina del `body` mediante JavaScript en `src/js/main.js` al abrir y cerrar los modales.
- **Pantalla de Carga Inicial y Reproducción de Video Hero**: Se ajustó el script de la pantalla de carga inicial (`splash-screen`) en `src/index.html` para que, después de 1 segundo, no solo oculte la pantalla de carga, sino que también inicie la reproducción del video del hero (`#hero-video`), asegurando una transición fluida.

### Estilos de Cards de Baterías (`_baterias.scss`)

- Se aplicaron los siguientes estilos a las cards de baterías (`.bateria-item`):
  - Se añadió un pseudo-elemento `::before` para el gradiente de fondo:
    - `background: linear-gradient(180.04deg, rgba(33, 33, 33, 0) 60.61%, #212121 96.26%);`
  - `border-radius: 5px;`
  - `width: 100%;`
  - `height: 100%;`
  - `aspect-ratio: 413 / 391;`

- El contenedor de las cards (`.baterias-grid`) se modificó para usar `display: flex` con `flex-wrap: wrap` y `justify-content: center`, mostrando 3 columnas con un `gap` de 20px. Cada `.bateria-item` ocupa `calc(33.333% - 20px)` del ancho.
  - Los títulos `h3` dentro de `.bateria-item` ahora usan `text-transform: capitalize;`.

Estos cambios aseguran que cada card de batería tenga el gradiente de fondo, el radio de borde y las dimensiones especificadas en el diseño, y que el layout sea flexible con 3 columnas.

### Estilos de Modal (`_modal.scss`)

- La sección `.bateria-images` dentro del modal se modificó para usar `display: flex` con `flex-wrap: wrap`, `justify-content: center` y un `gap` de 1rem. Cada imagen dentro de esta sección (`& > *`) ocupa `calc(50% - 0.5rem)` del ancho, mostrando 2 columnas.
  - **Scrollbar personalizado en modales (`_modal.scss`)**
  - Se añadieron estilos para el `width`, `background` del track y el thumb, `border-radius` y `hover` para el thumb.
  - Los colores del track y el thumb son ahora más sutiles y transparentes, usando valores `rgba` con menor opacidad.
- El video del hero se muestra, ocupa el 100% del ancho con alto automático, y la imagen de fondo (`cover-hero.jpg`) actúa como soporte mientras el video carga.o en caso de que no se reproduzca.

### Actualización de Preguntas Frecuentes (`index.html`)

- Se ha completado la sección de preguntas frecuentes (`#faq`) en el archivo `index.html` con las siguientes preguntas y respuestas.
- Se han reemplazado los elementos `<button>` por `<div>` en los encabezados del acordeón (`.accordion-header`) en `index.html`.
- Se añadió una transición de color de `0.3s ease` al `.accordion-header` en `_faqs.scss` para un cambio de color suave.
- Se convirtió la dirección de correo electrónico en un enlace `mailto:` en `index.html` para mejorar la usabilidad.
- Se convirtió el nombre de usuario de Instagram en un enlace con la URL proporcionada y se configuró para abrir en una nueva pestaña en `index.html`.
- Se agregaron los favicons (`logo.ico` y `logo.png`) en `index.html` para mejorar la experiencia de usuario y la identidad visual del sitio.
  - ¿Cómo voy a recibir los tracks?
  - ¿La maqueta tiene que estar sí o sí grabada con click?
  - ¿Cuántas tomas me mandás?
  - ¿Puedo hacerte devoluciones en el momento?
  - ¿Si te mando una programación de batería MIDI y necesito que la toques tal cual, podés?
  - ¿Si mi producción no tiene los instrumentos finales, es un problema?
  - ¿Cuántos canales me mandás?
  - ¿Me mandás las baterías mezcladas?
  - ¿Cuantizás las baterías?
  - ¿Qué pasa si quiero hacer correcciones una vez que me mandaste los tracks?
  - ¿Puedo ir a tu estudio a presenciar la sesión?

### Estilos de Tarjetas de Reseñas (`_reseñas.scss`)

- Se modificó la estructura del carrusel eliminando alturas fijas:
  - Establecido `height: 100% !important` en `.glide__track`
  - Añadido `height: 100% !important`, `display: flex !important` y `align-items: stretch !important` en `.glide__slides` (ul) para que todas las tarjetas tengan la misma altura
  - Establecido solución cross-browser para `.glide__slide` (li):
    - `height: 100%` (fallback para navegadores antiguos)
    - `height: -webkit-fill-available` (Chrome, Safari)
    - `height: -moz-available` (Firefox)
    - `height: stretch` (estándar futuro)
    - `display: flex !important`
  - Las tarjetas `.resena-card` usan `flex: 1 !important`, `display: flex !important` y `flex-direction: column !important` para adaptarse al contenido más alto
- Se reposicionaron los dots del carrusel (`.glide__bullets`):
  - Aumentado `margin-top` a 30px
  - Añadido `position: relative` y `z-index: 15` para asegurar que queden por encima del contenido

### Bloqueo de Scroll al Abrir Modales (`_layout.scss` y `main.js`)

- Se añadió la clase `.no-scroll` en `_layout.scss` al `body` para ocultar el overflow y bloquear el scroll de la página cuando un modal está abierto.
- En `main.js`, se añadió y removió la clase `no-scroll` del `body` al abrir y cerrar los modales de equipamiento y baterías, respectivamente.

- **Manejo de Modales y Contenido Dinámico (`main.js`)**
  - Se implementó la lógica para abrir y cerrar los modales de equipamiento y baterías.
  - El contenido del modal de baterías se carga dinámicamente utilizando un objeto `bateriasData` para la descripción y las imágenes.
  - El título de cada batería ahora se obtiene directamente del elemento `<h3>` correspondiente en el HTML (`index.html`) para evitar duplicación de datos y facilitar la edición.
  - Se añadió la funcionalidad para bloquear el scroll de la página al abrir los modales y restaurarlo al cerrarlos, mediante la adición/remoción de la clase `no-scroll` en el `body`.

### Manejo de Envío de Formulario (`form-submission.js`)

- Se creó un nuevo script `form-submission.js` para manejar el envío del formulario de contacto.
- **JavaScript (`form-submission.js`)**:
  - Intercepta el evento `submit` del formulario con ID `contact-form` (se añadió el ID al formulario en `index.html`).
  - Previene el comportamiento por defecto del envío del formulario.
  - Muestra un mensaje en la consola (`console.log`) y una alerta al usuario (`alert`) confirmando el envío simulado.
  - Resetea el formulario después del envío.
  - Está diseñado para facilitar la futura integración de servicios de mailing.

### Efecto Gradual de Cambio de Color de Navegación sobre Footer (`_header.scss`, `main.js` e `index.html`)

- Se implementó un sistema de detección que cambia gradualmente el color de la navegación cuando se superpone con el footer de fondo blanco, creando un efecto de "corte" progresivo del color.
- **JavaScript (`main.js`)**:
  - Se mejoró la función `checkNavOverFooter()` para calcular el porcentaje de superposición entre el header y la sección `#contacto` (footer).
  - Se utiliza `getBoundingClientRect()` para calcular posiciones y el porcentaje exacto de superposición.
  - Se establece una variable CSS `--overlap-percentage` que controla el efecto gradual.
  - La función se ejecuta en el evento `scroll` y al cargar la página para actualizaciones en tiempo real.
- **HTML (`index.html`)**:
  - Se añadieron atributos `data-text` a todos los enlaces de navegación para permitir el efecto de clip-path.
- **CSS (`_header.scss`)**:
  - Se implementó un efecto gradual usando `clip-path: polygon()` que se basa en la variable `--overlap-percentage`.
  - Los enlaces crean una capa superpuesta (`::after`) con el color oscuro (`#212121`) que se revela progresivamente.
  - Los enlaces activos muestran el color de acento (`#085358`) en la parte superpuesta.
  - Los bullets también tienen efecto gradual usando `clip-path` y `filter: invert(1)` para la versión oscura.

### Refactorización de Función de Superposición (`main.js`)

- Se extrajo la lógica de verificación de superposición entre elementos en una función independiente `checkElementsOverlap()`.
- **JavaScript (`main.js`)**:
  - Se creó la función `checkElementsOverlap(element1Rect, element2Rect)` que recibe dos objetos `DOMRect` y retorna `true` si se superponen.
  - La función `checkNavOverFooter()` ahora utiliza `checkElementsOverlap()` para verificar la superposición entre el header y el footer.
  - Esta refactorización mejora la modularidad del código y permite reutilizar la lógica de superposición en otras partes del proyecto si es necesario.
  - El efecto crea una transición visual suave donde el texto cambia de color de forma progresiva según la superposición.

### Botón de Subir al Top (`index.html`, `_footer.scss` y `main.js`)

- Se implementó un botón flotante en la esquina inferior derecha que permite al usuario desplazarse suavemente al inicio de la página.
- **HTML (`index.html`)**:
  - Se añadió un elemento `<a>` con la clase `scroll-to-top` y una imagen SVG (`boton-subir.svg`) justo antes del cierre de la etiqueta `</body>`.
- **CSS (`_footer.scss`)**:
  - Se definieron los estilos para la clase `scroll-to-top`:
    - `position: fixed;` para mantenerlo en la pantalla.
    - `bottom: 20px;` y `right: 20px;` para posicionarlo.
    - `width: 50px;`, `height: 50px;`, `background-color: #085358;` y `border-radius: 50%;` para su apariencia circular.
    - `display: flex;`, `justify-content: center;`, `align-items: center;` para centrar el icono.
    - `opacity: 0;` y `visibility: hidden;` con una `transition` para un efecto de aparición/desaparición suave.
    - La clase `.show` se utiliza para hacerlo visible (`opacity: 1; visibility: visible;`).
    - El SVG dentro del botón (`img`) tiene un `filter: invert(1);` para cambiar su color a blanco.
- **JavaScript (`main.js`)**:
  - Se obtuvo una referencia al botón (`.scroll-to-top`).
  - Se añadió un `eventListener` al `window` para el evento `scroll`:
    - Si el `window.scrollY` es mayor a 200px, se añade la clase `show` al botón; de lo contrario, se remueve.
  - Se añadió un `eventListener` al botón para el evento `click`:
    - Previene el comportamiento por defecto del enlace (`e.preventDefault();`).
    - Utiliza `window.scrollTo({ top: 0, behavior: 'smooth' });` para un desplazamiento suave al inicio de la página.
  - **Activación del enlace de Contacto al final de la página:**
    - Se modificó la lógica del `IntersectionObserver` para que, además de la detección de secciones, active el enlace de "Hablemos" (contacto) cuando el usuario se encuentre a 50px o menos del final de la página (`(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50`).