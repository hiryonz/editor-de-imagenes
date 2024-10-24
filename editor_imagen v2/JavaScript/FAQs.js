var data;
var preguntasPorPagina = 5;
var paginaActual = 1;
var paginaOriginal; // Variable para almacenar la página actual antes de realizar una búsqueda

    function agregarPregunta(pregunta, lista, numero) {
        var section = document.createElement('section');
        var titulo = document.createElement('h2');
        var numeracion = document.createElement('span'); 
        var boton = document.createElement('button');
        var contenido = document.createElement('p');
        var icono = document.createElement('i');
        
        numeracion.textContent =' ❖ '; 
        titulo.appendChild(numeracion); 
        titulo.textContent += pregunta.question;
        boton.textContent = 'Respuesta';
        contenido.textContent = pregunta.answer;
        icono.classList.add('fas', 'fa-chevron-down', 'fa-icono');

        boton.addEventListener('click', function() {
            contenido.classList.toggle('visible');
            icono.classList.toggle('fa-chevron-down');
            icono.classList.toggle('fa-chevron-up');
        });

        contenido.classList.add('respuesta');

        boton.appendChild(icono);

        section.appendChild(titulo);
        section.appendChild(boton);
        section.appendChild(contenido);

        lista.appendChild(section);
    }

    function mostrarPreguntas(pagina) { //muestra la cantidad de preguntas que coinciden con la busqueda de la palabra 
        var listaPreguntas = document.getElementById('faq-list');
        listaPreguntas.innerHTML = '';

        var startIndex = (pagina - 1) * preguntasPorPagina;
        var endIndex = startIndex + preguntasPorPagina;
        var preguntasMostradas = data.questions.slice(startIndex, endIndex);

        for (var i = 0; i < preguntasMostradas.length; i++) {
            agregarPregunta(preguntasMostradas[i], listaPreguntas, startIndex + i + 1);
        }
        actualizarPaginacion(pagina);
    }

    function cambiarPagina(pagina) {
        paginaActual = pagina;
        mostrarPreguntas(pagina);
    }

     function normalizarCadena(cadena) {
        var acentos = { 'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'Á':'A', 'É':'E', 'Í':'I', 'Ó':'O', 'Ú':'U' }; //ingnora acentos en la busqueda 
        return cadena.split('').map(letra => acentos[letra] || letra).join('').toLowerCase();
    }

    function buscarPreguntas(query) {
        var listaPreguntas = document.getElementById('faq-list');
        listaPreguntas.innerHTML = '';

        var normalizedQuery = normalizarCadena(query);
        var regex = new RegExp(`\\b${normalizedQuery}\\b`, 'i');
       
        var filteredQuestions = data.questions.filter(function (pregunta) {
        var preguntaNormalizada = normalizarCadena(pregunta.question);
            return regex.test(preguntaNormalizada);
        });

        for (var i = 0; i < filteredQuestions.length; i++) {
            agregarPregunta(filteredQuestions[i], listaPreguntas, i + 1);
        }

         // Ocultar la paginación durante la búsqueda
        var navegacion = document.getElementById('navegacion-paginas');
        navegacion.style.display = 'none';

        // Restaurar la página original después de borrar el contenido del buscador
        if (query === '') {
            cambiarPagina(paginaOriginal);
            navegacion.style.display = 'block'; // Mostrar nuevamente la paginación
        }
    }

    function actualizarPaginacion(pagina) {
        var navegacion = document.getElementById('navegacion-paginas');
        navegacion.innerHTML = '';

        var totalPages = Math.ceil(data.questions.length / preguntasPorPagina);
        for (var i = 1; i <= totalPages; i++) {
            var button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagina-button');
            if (i === pagina) {
                button.classList.add('active');
            }
            button.addEventListener('click', function() {
                cambiarPagina(parseInt(this.textContent));
            });
            navegacion.appendChild(button);
        }
    }

        fetch('../JSON/question.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData; 
            mostrarPreguntas(paginaActual);
        })
        .catch(error => {
            console.error('Error al cargar las preguntas:', error);
        });

        // Evento para la barra de búsqueda
        document.getElementById('search-bar').addEventListener('input', function() {
            var query = this.value.toLowerCase();
            if (query !== '') {
                // Si hay una búsqueda activa, almacenar la página actual antes de realizar la búsqueda
                paginaOriginal = paginaActual;
            }
            buscarPreguntas(query);
        });
