# Image Editor

Un editor de imágenes basado en la web que permite a los usuarios cargar, editar y comprimir imágenes. El proyecto utiliza JavaScript, CSS, HTML y el CDN `browser-image-compressor` para comprimir imágenes.

![home](https://github.com/hiryonz/editor-de-imagenes/blob/def91e6cdfa649b0f8b2752c749733883f9b8933/img_readme/home.png)

## Características

- **Cargar imágenes:** Soporta formatos PNG, JPG/JPEG, WEBP.
- **Editar imágenes:** Aplicar filtros (escala de grises, sepia, desenfoque, brillo, contraste, opacidad) y ajustes (invertir, girar, recortar).
- **descargar:** descargar las imágenes editadas en diferentes formatos.
- **Tutorial interactivo:** Un tutorial paso a paso para guiar a los nuevos usuarios.
- **Preguntas frecuentes:** Sección de ayuda con preguntas frecuentes almacenadas en un archivo JSON.

## Tecnologías utilizadas

- **HTML**: Estructura del proyecto.
- **CSS**: Estilización del proyecto.
- **JavaScript**: Lógica del proyecto.
- **CDNs**: 
  - `compressor.min.js`: Comprimir imágenes en el navegador.
      - `instancia`
         - `compress.js`: async function compressImage(file)
  - `cropperjs`: Recorte de imágenes.
    - `instancia`
      - `script.js`: const CreateCropper = (canvas) => {}
  - `hopscotch`: Tutoriales interactivos.
    - `instancia`
      - `tour.js`
  - `Bootstrap`: Diseño y componentes UI.
  - `Font Awesome`: Iconos.

## Instalación

<ol>
  <li>Clona el repositorio:
    <pre><code>git clone https://github.com/eduardo-griffith-utp/editor-de-imagenes-basico-1LS231.git</code></pre>
  </li>
  <li>Navega al directorio del proyecto:
    <pre><code>cd tu_repositorio</code></pre>
  </li>
  <li>Abre <code>index.html</code> en tu navegador preferido.</li>
</ol>


## imagenes del sistema
![img1](https://github.com/hiryonz/editor-de-imagenes/blob/def91e6cdfa649b0f8b2752c749733883f9b8933/img_readme/img1.png)

![img1](https://github.com/hiryonz/editor-de-imagenes/blob/def91e6cdfa649b0f8b2752c749733883f9b8933/img_readme/preguntas.png)


![img2](
<h2>Uso</h2>

<ol>
  <li><strong>Carga de imagen</strong>: Haz clic en el ícono de imagen grande en la página principal para cargar una imagen desde tu dispositivo.</li>
  <li><strong>Edición de imagen</strong>: Usa los botones de filtros y ajustes en los menús laterales para aplicar los efectos deseados.</li>
  <li><strong>Guardar y descargar</strong>: Después de editar, puedes guardar la imagen en la galería o descargarla directamente en el formato que prefieras.</li>
  <li><strong>Tutorial</strong>: Si necesitas ayuda, haz clic en el botón "Ayuda" para iniciar el tutorial paso a paso.</li>
</ol>

<h2>Preguntas frecuentes</h2>

<p>Las preguntas frecuentes están almacenadas en un archivo JSON. Para agregar más preguntas, simplemente extiende el archivo JSON con las nuevas entradas.</p>

<p>Ejemplo de <code>preguntas.json</code>:</p>

<pre><code>{
    "preguntas": [
        {
            "pregunta": "¿Cómo cargo una imagen?",
            "respuesta": "Haz clic en el ícono de imagen grande en la página principal para cargar una imagen desde tu dispositivo."
        },
        {
            "pregunta": "¿Qué formatos de imagen son compatibles?",
            "respuesta": "Aceptamos los formatos PNG, JPG/JPEG, y WEBP."
        }
    ]
}
</code></pre>

<p>Para agregar una nueva pregunta, simplemente agrega un nuevo objeto al array <code>preguntas</code>:</p>

<pre><code>{
    "preguntas": [
        {
            "pregunta": "¿Cómo cargo una imagen?",
            "respuesta": "Haz clic en el ícono de imagen grande en la página principal para cargar una imagen desde tu dispositivo."
        },
        {
            "pregunta": "¿Qué formatos de imagen son compatibles?",
            "respuesta": "Aceptamos los formatos PNG, JPG/JPEG, y WEBP."
        },
        {
            "pregunta": "¿Cómo aplico un filtro?",
            "respuesta": "Selecciona el filtro deseado en el menú lateral izquierdo bajo la sección 'Filtros'."
        }
    ]
}
</code></pre>

