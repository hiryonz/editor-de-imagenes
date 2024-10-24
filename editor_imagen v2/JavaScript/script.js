const 
contenedor = document.querySelector(".contenedor"),
alert1Formatos = document.querySelector(".contenedor-alerta1"),
alert2tamano = document.querySelector(".contenedor-alerta2"),
alert3tamano = document.querySelector(".contenedor-alerta3"),
botonMenu = document.getElementById("menu-boton"),
sidebar1 = document.querySelector(".sidebar1"),
sidebar2 = document.querySelector(".sidebar2"),
sidebar1_Boton = document.querySelectorAll(".sidebar1-boton"),
opcionFiltro = document.querySelector(".opciones-filtros"),
opcionAjustes = document.querySelector(".opciones-ajustes"),
opcionGaleria = document.querySelector(".opciones-galeria"),
btnAjuste_invertir = document.querySelector(".contenedor-ajuste-invertir"),
btnAjuste_girar = document.querySelector(".contenedor-ajuste-girar"),
btnAjuste_recortar = document.querySelector(".contenedor-ajuste-recortar"),
recortarContainer = document.getElementById("canvas-recortar-container"),
containerControlPrincipal = document.querySelector(".control-principal"),
controlPrincipal = document.querySelector(".control-principal-container"),
controlPrincipal_ajuste = document.querySelector(".control-principal-ajuste-container"),
controlSecundario = document.querySelector(".control-secundario"),
imagen = document.getElementById("imagen"),
imagenPrevio = document.getElementById("imagen-previo"),
imagenFinal = document.getElementById("imagen-final"),
botonImagen = document.getElementById("input-file"),
subirImagen = document.getElementById("subir-boton"),
guardarImagen = document.getElementById("guardar-boton"),
panelGuardarImagen = document.querySelector(".contenedor-panel-guardar"),
descargarImagen = document.querySelector(".descargar-boton"),
cerrarDescarga = document.querySelector(".cerrar-descargar-boton"),
botonAyuda = document.getElementById("ayuda-boton"),
sidebar3 = document.querySelector(".sidebar3"),
opcionBoton = document.querySelectorAll(".sidebar2 .sidebar2-boton"),
nombreFiltro = document.querySelector(".nombre"),
valorFiltro = document.querySelector(".valor"),
range = document.querySelector(".form-range"),
cDisable = document.querySelectorAll(".disable"),
cerrarAlert1 = document.getElementById("cerrar-alert"),
cerrarAlert2 = document.getElementById("cerrar-alert-tamano"),
cerrarAlert3 = document.getElementById("cerrar-alert-tamano2"),
selectFormatos = document.getElementById("select-formatos"),
nombreArchivo = document.getElementById("nombre-archivo"),
atras = document.getElementById("atras"),
adelante = document.getElementById("adelante"),
rotarOpcion = document.querySelectorAll(".btn-ajuste"),
opcionesGaleriaClonado = document.querySelectorAll(".clonado");


//variables de la funcionalidad de recortar
let originalImage = new Image();
let copyCroppedImage; //para previzualizavion
let recortado = false;


//variable que recibe la llave de galeria al cargar la pagina
let llaveOnload;


//variable para verificar un cambio en el objeto galeria
let confirmCambiosGaleria = false;


let edicionGaleria = true;
let estasEnGaleria = true;
let guardadoProyect = false;

//variables para decidir si el menu o el panle de guardado este abierto
let menuActivo = false, panelGuardar = false;

//array para guardar los cambios realizados
let arrayPrev = [];
let arrayPost = [];
let pivot;
let llave, valor1; //retorno del rehacer o deshacer
let arrayCambio;


let opcionElegido; //opcion de galeria, filtro, ajuste
let anguloFinal = 0; //variable para obtener el angulo de la imagen
let transformacion = null; //permitir los ajustes
let rotate = 0, invertirHorizontal = 1, invertirVetical = 1;
let contadorGaleria = 1;
const galeria = {};
let divClonado, imagenClonado;
let llaveGaleria
let filtroAjusteArray = {
    grises: "0",
    sepia: "0",
    desenfoque: "0",
    brillo: "0",
    contraste: "0",
    opacidad: "0",
    ajuste: ``,
    recortar: ``
}
const formatos = [
    "jpg",
    "jpeg",
    "png",
    "webp"
];
let { grises, sepia, desenfoque, brillo, contraste, opacidad, ajuste, recortar } = filtroAjusteArray;


const prueba = {
    1: "hola",
    2: "hola2",
    3: ["1","2","3"]
}




function MenuToggle(menuActivo) {
    if (window.innerWidth <= 825) return;

    contenedor.classList.remove("template1", "template2", "template3");
    if(menuActivo === true){
        sidebar1.classList.remove("sidebar-hidden");
        sidebar2.classList.remove("sidebar-hidden");
        contenedor.classList.add("template2");
        ControlToggle();
    }else{
        sidebar1.classList.add("sidebar-hidden");
        sidebar2.classList.add("sidebar-hidden");
        contenedor.classList.add("template1");
        ControlToggle();
    }

}

function ControlToggle(){
    let filtroActivo = this.document.querySelector(".activo-sidebar1");
    if (filtroActivo.id === "filtro" && getComputedStyle(sidebar1).display === "block") {
        controlPrincipal.style.display = "block"
    }else controlPrincipal.style.display = "none"
}

//listener para la funcionalidad del menu
botonMenu.addEventListener("click", ()=>{
    if(sidebar1.classList.contains("sidebar-hidden")){
        menuActivo = true;
        MenuToggle(menuActivo);
    }else{
        menuActivo = false;
        MenuToggle(menuActivo);
        controlPrincipal.style.display = "none";
    }
    
});

//listener para los diferentes menus
sidebar1_Boton.forEach(boton => {
    boton.addEventListener("click", () => {
        estasEnGaleria = false;
        if(window.innerWidth <= 825) contenedor.classList.remove("galeria")
        let active = document.querySelector(".activo-sidebar1");
        if(active){active.classList.remove("activo-sidebar1")}
        boton.classList.add("activo-sidebar1");
        let nombre = boton.innerText;
        opcionFiltro.style.display = "none";
        opcionAjustes.style.display = "none";
        opcionGaleria.style.display = "none";
        recortarContainer.style.display = "none"
        imagen.style.display = "block";
        controlPrincipal_ajuste.classList.remove("active");
        switch (nombre) {
            case "Galeria":
                controlPrincipal.style.display = "none";
                previsualizacion.style.display = "block"
                opcionGaleria.style.display = "grid";
                estasEnGaleria = true;
                if(window.innerWidth <= 825) contenedor.classList.add("galeria")
                break;
            case "Filtros":
                controlPrincipal.style.display = "block";
                containerControlPrincipal.style.display = "block"
                opcionFiltro.style.display = "block";
                document.querySelector(".activo-filtro").click();
                break;
            case "Ajustes":
                controlPrincipal.style.display = "none";
                containerControlPrincipal.style.display = "block"
                opcionAjustes.style.display = "block";
                document.querySelector(".activo-ajuste").click();
                controlPrincipal_ajuste.classList.add("active");
                previsualizacion.style.display = "block"
                break;
        }
    });
});


//listener para actualizar el template
function handleResize() {
    if (!window.innerWidth <= 825) {
        MenuToggle(menuActivo);
    }
    if (window.innerWidth < 825) {
        if (estasEnGaleria === true) {
            containerControlPrincipal.style.display = "none";
            opcionGaleria.style.display = "grid"
            contenedor.classList.add("galeria");
        } else {
            containerControlPrincipal.style.display = "block";
            contenedor.classList.remove("galeria");
        }
    }
}


document.addEventListener('DOMContentLoaded', handleResize);
    

function ConfigInicio() {

    if(imagen.classList.contains("editado")) VerificarCambioGaleria(true);
    
    confirmCambiosGaleria = false;
    const containerGaleria = document.querySelector(".galeria-activo");
    if(containerGaleria) containerGaleria.classList.remove("galeria-activo");

    const imagenGaleriaDelete = document.querySelector(".imagen-galeria-activo");
    if(imagenGaleriaDelete) imagenGaleriaDelete.classList.remove("imagen-galeria-activo");

    const inputGaleria = document.querySelector(".input-galeria-activo");
    if (inputGaleria) inputGaleria.classList.remove("input-galeria-activo");


    previsualizacion.classList.add("active");
    imagen.className = "imagen";
    guardadoProyect = false;
    guardarImagen.classList.remove("disable");
    botonGuardar.classList.remove("disable");
    document.getElementById("filtro").classList.remove("disable");   
    document.getElementById("galeria").classList.remove("disable");   
    document.getElementById("ajuste").classList.remove("disable");
    const incio = document.querySelector(".inicio_disabled");
    if(incio) incio.classList.remove("inicio_disabled"); 

}


function ConfigCargar() {
    const carga = document.querySelector(".contenedor-cargaCompresion");


    carga.classList.toggle("active");
    if(carga.classList.contains("active")){
        imagen.style.display = "none";
    }else {
        imagen.style.display = "block";
    }


}


function VerificarTamanoFile(file) {
    if(file.size > 1500*1024*1024) {
        return true
    }
    return false
}


const SubirImagen = async () => {
    
    ConfigInicio();
    var file = botonImagen.files[0]; 
    if(!file){return}
    var fileType = file.type; 
    

 

    if(VerificarTamanoFile(file)) {
        alert2tamano.style.display = "block";
        botonImagen.value = null; //resetear para detectar el siguiente input-file
        return;
    }


    try {

        for(let i = 0; i<formatos.length;i++){ //recorre el array en busca del formato
            if (fileType.endsWith(formatos[i])) { //verifica si el file esta entre los formato deseado
                document.getElementById("label-input-file").style.display = "none"; //quita el "boton de subir imagen en el centro del canva"

                ConfigCargar();
                console.log("antes")
                if(document.querySelector(".activo-ajuste").id === "recortar") {
                    document.getElementById("galeria").click()
                }

                const compressedFile = await compressImage(file);

/*
                let compressedFile = await compressImageBrowser(file)
                let cont = 0;
                console.log(compressedFile.size/ 1024)
                while ((compressedFile.size/ 1024) <= 1) {
                    alert3tamano.style.display = "block";
                    compressedFile = await compressImageBrowser(file)
                    cont++;
                    if(cont > 3){
                        alert("no se pudo subi la imagen, es demasiado grande")
                        compressedFile = await compressImage(file);
                        break;
                    }
                }
*/
                console.log("despues de todo")
                ConfigCargar();
        
                menuActivo = true
                MenuToggle(menuActivo);
                const source = URL.createObjectURL(compressedFile);
                imagen.src = source;
                originalImage.src = source;

                ResetAll();
                imagen.style.display = "block"; // despliega la etiqueta img
                botonImagen.value = null; //resetear para detectar el siguiente input-file
                URL.revokeObjectURL(file);
                return;
            }
        } 
        alert1Formatos.style.display = "block"; //si el ciclo no se cumple, despliega la caja de alerta
        botonImagen.value = null; //resetear para detectar el siguiente input-file
        return;
    }catch(err) {
        console.log("error al subir la imagen: "+err);
        botonImagen.value = null;
    }
}


// Función para aplicar un clip path inset a un contexto 2D
function AddClip(context, insetValues0,insetValues1,insetValues2,insetValues3) {
    var w = context.canvas.width,
        h = context.canvas.height;
    
    context.beginPath();
    context.rect(
        insetValues3 / 100 * w, // left
        insetValues0 / 100 * h, // top
        w - (insetValues1 / 100 * w + insetValues3 / 100 * w), // width
        h - (insetValues0 / 100 * h + insetValues2 / 100 * h) // height
    );
    context.clip();
}


let clipPathValues
const GuardarImagen = (nombre, formato) => {
    let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    const { anchoDeseado, altoDeseado } = ConfigCanva(originalImage, canvas, ctx, true, true, 1);

    let clipPathValues = [0, 0, 0, 0]; // Valores predeterminados

    if (filtroAjusteArray.recortar !== "") {
        clipPathValues = filtroAjusteArray.recortar.match(/-?[\d.]+/g).map(Number);
    }

    AddClip(ctx, clipPathValues[0],clipPathValues[1],clipPathValues[2],clipPathValues[3]);

    const left = clipPathValues[3] / 100 * anchoDeseado;
    const top = clipPathValues[0] / 100 * altoDeseado;
    const right = clipPathValues[1] / 100 * anchoDeseado;
    const bottom = clipPathValues[2] / 100 * altoDeseado;
    const width = anchoDeseado - left - right;
    const height = altoDeseado - top - bottom;

    // Crear un nuevo canvas con las dimensiones recortadas
    let croppedCanvas = document.createElement("canvas"),
        croppedCtx = croppedCanvas.getContext("2d");

    croppedCanvas.width = width;
    croppedCanvas.height = height;

    // Dibujar la imagen recortada en el nuevo canvas
    croppedCtx.drawImage(canvas,
                         left, top, width, height,
                         0, 0, width, height
    );

    // Guardar la imagen recortada
    croppedCanvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.download = nombre;
        link.href = url;
        link.click();
        // Revocar el objeto URL después de su uso para liberar memoria
        URL.revokeObjectURL(url);
    }, `image/${formato}`);
};




const AplicarFiltro = () => {
    let filtro = `sepia(${filtroAjusteArray.sepia}%) blur(${filtroAjusteArray.desenfoque/ 10}px) brightness(${parseInt(filtroAjusteArray.brillo)+100}%) grayscale(${filtroAjusteArray.grises}%) opacity(${100-filtroAjusteArray.opacidad}%) contrast(${parseInt(filtroAjusteArray.contraste)+100}%)`; //aplicar los filtros css
    imagen.style.filter = filtro;
    if(edicionGaleria === true && !imagen.classList.contains("editado")) imagen.classList.add("editado");
    guardadoProyect = false;
}


rotarOpcion.forEach(options => {
    options.addEventListener("click", () => {
        arrayPost = []; // hay que revisar su funcionalidad...
/*
        if(recortado === true){
            rotate = 0;
            invertirHorizontal = 1
            invertirVetical = 1
            filtroAjusteArray.recotarAjuste = ``
        }*/



        if(options.id === "girar-left"){
            rotate -= 90;
        }else if(options.id === "girar-right"){
            rotate += 90;
        }else if(options.id === "invert-h"){
            if(Math.abs(rotate%360) === 0 || Math.abs(rotate%360) === 180){
                invertirHorizontal = invertirHorizontal === 1 ? -1 : 1;
            }else{
                invertirVetical = invertirVetical === 1 ? -1 : 1;
            }
        }else {
            if(Math.abs(rotate%360) === 0 || Math.abs(rotate%360) === 180){
                invertirVetical = invertirVetical === 1 ? -1 : 1;

            }else{
                invertirHorizontal = invertirHorizontal === 1 ? -1 : 1;
            }}
        
            recortado = false;
        transformacion = `rotate(${rotate}deg) scale(${invertirHorizontal},${invertirVetical})`
        filtroAjusteArray.ajuste = transformacion;
        arrayPrev.push(["ajuste", transformacion])
        AplicarAjuste();
    });
})

const AplicarAjuste = () => {
    AchicarAjusteTamano()
    imagen.style.transform = filtroAjusteArray.ajuste;
    

    if(edicionGaleria === true && !imagen.classList.contains("editado")) imagen.classList.add("editado");
    guardadoProyect = false;
}

const AchicarAjusteTamano = () => {
    valor = rotate;
    const imagenClonado = document.querySelector(".imagen-galeria")
    
        if (Math.abs(valor%360) === 0 || Math.abs(valor%360) === 180) {
            imagen.classList.remove("achicar-img");
            if(imagenClonado) imagenClonado.classList.remove("achicar-img");
            
        }else {
            imagen.classList.add("achicar-img");
            if(imagenClonado) imagenClonado.classList.add("achicar-img");
        }
}

const AplicarAjuste2 = () => {
    imagen.style.transform = filtroAjusteArray.ajuste;
    const regex1 = /rotate\((-?\d+(\.\d+)?)deg\)/;
    const regex2 = /scale\((-?[\d.]+),(-?[\d.]+)\)/;

    let matchScale = filtroAjusteArray.ajuste.match(regex2);
    let matchRotate = filtroAjusteArray.ajuste.match(regex1);
    const scaleX = matchScale ? parseFloat(matchScale[1]) : null;
    const scaleY = matchScale ? parseFloat(matchScale[2]) : null;    
    const numeroMatch = matchRotate ? parseFloat(matchRotate[1]) : 0;
    rotate = numeroMatch;
    invertirHorizontal = scaleX;
    invertirVetical = scaleY


    AchicarAjusteTamano(numeroMatch);
    imagen.style.transform = filtroAjusteArray.ajuste;
}


//listerner para los opciones de filtro, ajustes
//actulizar los datos del slider/info/filtros
opcionBoton.forEach(opcion => {
    opcion.addEventListener("click", () => {
        // Busca el contenedor más cercano
        let padreBtn = opcion.closest('.opciones-filtros, .opciones-ajustes, .opciones-galeria');
        if(padreBtn.classList.contains("opciones-filtros")){
            document.querySelector(".activo-filtro").classList.remove("activo-filtro");
            opcion.classList.add("activo-filtro");
        }else if(padreBtn.classList.contains("opciones-ajustes")){
            document.querySelector(".activo-ajuste").classList.remove("activo-ajuste");
            opcion.classList.add("activo-ajuste");
            OpcionAjustes(document.querySelector(".activo-ajuste").id)
        }else if(padreBtn.classList.contains("opciones-galeria")){
            //codigo faltante
        }
        
        nombreFiltro.innerText = opcion.innerText; 
        //actualizar los valores seleccionados
        opcionElegido = opcion.id;
        let valor = filtroAjusteArray[opcionElegido];
        range.value = valor;
        valorFiltro.innerText = valor + "%"
    });
});

//activar los opciones de inversion, recortar, girar
const OpcionAjustes = (idAjuste) => {
    imagen.style.display = "block";
    recortarContainer.style.display = "none"
    previsualizacion.style.display = "block"
    btnAjuste_recortar.classList.remove("activo-btn-ajuste");
    btnAjuste_invertir.classList.remove("activo-btn-ajuste");
    btnAjuste_girar.classList.remove("activo-btn-ajuste");
    switch (idAjuste) {
        case "recortar":
            btnAjuste_recortar.classList.add("activo-btn-ajuste");
            imagen.style.display = "none";
            recortarContainer.style.display = "flex";
            previsualizacion.style.display = "none";
            Recortar(true, true)
            break;
        case "invertir":
            btnAjuste_invertir.classList.add("activo-btn-ajuste");
            break;
        case "girar":
            btnAjuste_girar.classList.add("activo-btn-ajuste");
            break;
    }
}

const GuardarFiltro = () => {
    let rangeValue = range.value
    valorFiltro.innerText = rangeValue + "%"; 
    opcionElegido = document.querySelector(".activo-filtro").id; 
    filtroAjusteArray[opcionElegido] = rangeValue;
    arrayPost = [];
    AplicarFiltro();
} 

function AbrirPanelGuardar() {
    panelGuardarImagen.classList.toggle("active"); 
    botonGuardar.classList.remove("active");
    //las imagenes que se ven dentro del panel
    imagenFinal.style.filter = getComputedStyle(imagen).filter; 
    imagenFinal.style.transform = getComputedStyle(imagen).transform;
    imagenFinal.style.clipPath = getComputedStyle(imagen).clipPath;
    imagenFinal.src = imagen.src  
    imagenPrevio.src = imagen.src 

    const nombre = document.getElementById("nombre-archivo");
    const inputGaleriaActive = document.querySelector(".input-galeria-activo");
    if (inputGaleriaActive) {
        nombre.value = inputGaleriaActive.value;
    } else {
        nombre.value = "";
    } 

}


let contador = 0;
let nuevoNumero;

const ObtenerValor = (cadena, pocision) => {
    const keys = Object.keys(cadena)
    if(pocision || pocision === 0) {
        contador = pocision
    };

    let numero = keys[contador].match(/\d+/);
    nuevoNumero = parseInt(numero[0]);
    contador++
    return nuevoNumero;
}


let recargado = false;
const AppendGaleria = () => {

    // Filtramos para obtener la clase que empieza con "image"
    let idImagenGaleria = document.querySelector(".galeria-activo");

    if(idImagenGaleria){
       imagen.classList.remove(idImagenGaleria.id);
       idImagenGaleria = idImagenGaleria.id;
    }else{
        idImagenGaleria = ""
    }
    if(recargado){
       nuevoNumero = ObtenerValor(galeria);
    }else {
        let llaves = Object.keys(galeria)
        nuevoNumero = ObtenerValor(galeria, llaves.length-1);
    }
    recargado = false;



    const idimagenActual = `galeria-image${nuevoNumero}`;
    let imagenData = galeria[idimagenActual];
    




    if (idImagenGaleria.startsWith("galeria")) {
        imagenClonado = document.querySelector(".imagen-galeria-activo")
        imagenData = galeria[imagenClonado.id]
    } else {
        const divOriginal = document.getElementById("contenedor-galeria-original");
        divClonado = divOriginal.cloneNode(true);
    
        const inputClonado = divClonado.querySelector(".input-nombre-galeria");
        inputClonado.id = `${idimagenActual}_` ;

        divClonado.id = `${idimagenActual}-contenedor`;
        divClonado.classList.add("clonado");
        divClonado.classList.add( `${idimagenActual}-contenedor`);

    
        imagenClonado = divClonado.querySelector(".imagen-galeria");
        imagenClonado.id = idimagenActual
        imagenClonado.src = imagenData.urlImagen;
        contador++;

        opcionGaleria.appendChild(divClonado);
        const cambiarInput = divClonado.querySelector(".input-nombre-galeria");
        cambiarInput.focus();
        cambiarInput.value = imagenData.nombreGaleria;

    }
    
    const filtroParseado = JSON.parse(imagenData.filtroAjuste);
    let filtro = `sepia(${filtroParseado.sepia}%) blur(${filtroParseado.desenfoque / 10}px) brightness(${parseInt(filtroParseado.brillo) + 100}%) grayscale(${filtroParseado.grises}%) opacity(${100 - filtroParseado.opacidad}%) contrast(${parseInt(filtroParseado.contraste) + 100}%)`;
    imagenClonado.style.filter = filtro;
    imagenClonado.style.transform = filtroParseado.ajuste;
    imagenClonado.style.clipPath = filtroParseado.recortar;
    AchicarAjusteTamano(idimagenActual)
    // Usar un DocumentFragment para minimizar el reflujo
    //const fragment = document.createDocumentFragment();
    //fragment.appendChild(divClonado);
    BorrarGaleria();
    imagen.classList.remove("editado")

    AgregarListenerGaleria(divClonado);
    const contenedorActual = document.querySelector(".galeria-activo");

    if(contenedorActual) {
        const subContenedorActual = contenedorActual.querySelector(".contenedor-imagen-galeria")
        if(subContenedorActual) {
            subContenedorActual.click()
        }
    }else{
        divClonado.querySelector(".contenedor-imagen-galeria").click();
    }
    
};


const contenedor_alertaGaleria = document.querySelector(".contenedor-alerta2"),
alertaGaleria1 = document.querySelector("alerta-galeria-nueva"),
alertaGaleria2 = document.querySelector(".alerta-galeria");

const VerificarCambioGaleria = (condicion) => {
    const imagenGaleriaActivo = document.querySelector(".imagen-galeria-activo")
    if(imagenGaleriaActivo){
        if(JSON.stringify(filtroAjusteArray) === galeria[imagenGaleriaActivo.id].filtroAjuste){
            return;
        }
    }
    if(!document.querySelector(".editado")) return;



       if (confirm("¿Desea guardar la imagen actual en la galeria?")) {
            AgregarImgGaleria(true, "nuevo proyecto");
            return;
        } else {
            console.log("Se presionó el botón Cancelar");
        }
}


function AgregarImgGaleria(guardarGaleria, nombre) {
    const imagenGaleriaActivo = document.querySelector(".imagen-galeria-activo")
    const contenedorActive = document.querySelector(".galeria-activo")
    const editado = document.querySelector(".editado");
    //const nombreInput = document.querySelector
    
    if (imagenGaleriaActivo && contenedorActive) {
        llaveGaleria = imagenGaleriaActivo.id;
        if (editado) {
            alert("Se guardaron los cambios");
        }
    } else {
        let llaves = Object.keys(galeria)
        llaveGaleria = `galeria-image${Object.keys(galeria).length+1}`;

        if(llaves.length > 0){
            llaveGaleria = ObtenerValor(galeria, llaves.length-1);
            llaveGaleria++;
            llaveGaleria = `galeria-image${llaveGaleria}`;
        }
    }
    
    let url1 = imagen.src
    let url2 = originalImage.src

    if(guardarGaleria === true){
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = imagen.naturalWidth;
        canvas.height = imagen.naturalHeight;

        ctx.drawImage(imagen,0,0)
        url1 = canvas.toDataURL('image/jpeg', 0.7);

        const canvas2 = document.createElement("canvas")
        const ctx2 = canvas2.getContext("2d")
        canvas2.width = originalImage.naturalWidth;
        canvas2.height = originalImage.naturalHeight;

        ctx2.drawImage(originalImage,0,0)
        url2 = canvas2.toDataURL('image/jpeg', 0.9);
    }else {
        llaveGaleria = llaveOnload;
        const verificadorCargaNueva = document.querySelector(".galeria-activo")
        if(verificadorCargaNueva) verificadorCargaNueva.classList.remove("galeria-activo")
    }

    if(!nombre) {
        nombre = galeria[llaveGaleria].nombreGaleria;
    }

    galeria[llaveGaleria] = {
        nombreGaleria: nombre,
        original: url2,
        urlImagen: url1,
        filtroAjuste: JSON.stringify(filtroAjusteArray),
        arrayPrev: JSON.stringify(arrayPrev),
        arrayPost: JSON.stringify(arrayPost)
    }  
    console.log(galeria)
      AppendGaleria();
      if (editado) editado.classList.remove("editado")
        const contenedorActivo = document.querySelector(".galeria-activo");
        const idContenedor = contenedorActivo.querySelector(".imagen-galeria").id;
        localStorage.setItem('savedData', JSON.stringify({imagenActivo: idContenedor, galery: galeria}) )


}

function BorrarGaleria() {
const bntGaleria = document.querySelectorAll('.btn-galeria');
bntGaleria.forEach(button => {
    button.addEventListener('click', () => {
        const contenedorGaleria = button.closest('.clonado');
        const imagenGaleria = contenedorGaleria.querySelector(".imagen-galeria")
        if (imagenGaleria) {
            delete galeria[imagenGaleria.id]
        }
        if (contenedorGaleria) {
          contenedorGaleria.remove();
        }
        localStorage.setItem('savedData', JSON.stringify({imagenActivo: "galeria-image1", galery: galeria}) )

      });
  });
}


//listen to galeria clicks
const AgregarListenerGaleria = (opcionClonado) => {
    opcionClonado.querySelector(".contenedor-imagen-galeria").addEventListener('click', (event) => {
        const opcion = event.target.closest('.clonado');
        if (opcion) {
            if(imagen.classList.contains("editado")) VerificarCambioGaleria(true);

            const etiquetaIMG = opcion.querySelector(".imagen-galeria")
            const idActivo = etiquetaIMG.id

            //cambiar el valor de activo del contenedor
            const active = document.querySelector(".galeria-activo");
            if(active) active.classList.remove("galeria-activo");
            opcion.classList.add("galeria-activo");

            //cambiar el valor de activo de la imagen
            const activeImagen = document.querySelector(".imagen-galeria-activo");
            if(activeImagen) activeImagen.classList.remove("imagen-galeria-activo");
            etiquetaIMG.classList.add("imagen-galeria-activo");

            //cambiaar el valor de activo del input
            const activeInput = document.querySelector(".input-galeria-activo");
            if (activeInput) activeInput.classList.remove("input-galeria-activo");
            const controlGaleria = opcion.querySelector(".contenedor-control-galeria");
            const inputControlGaleria = controlGaleria.querySelector(".input-nombre-galeria")
            inputControlGaleria.classList.add("input-galeria-activo")

            controlGaleria.addEventListener("change", () => {
                const guardarInputID = inputControlGaleria.id.slice(0,-1);
                galeria[guardarInputID].nombreGaleria = inputControlGaleria.value;
                const galeria_activo = document.querySelector(".galeria-activo");
                if(galeria_activo) galeria_activo.classList.remove("galeria-activo")
                inputControlGaleria.closest(".clonado").classList.add("galeria-activo")
                const contenedorActivo = document.querySelector(".galeria-activo");

                const idContenedor = contenedorActivo.querySelector(".imagen-galeria").id;
                const nuevaIdActivo2 = document.getElementById(idActivo);
                if(nuevaIdActivo2) nuevaIdActivo2.closest(".contenedor-imagen-galeria").click();

                localStorage.setItem('savedData', JSON.stringify({imagenActivo: idContenedor, galery: galeria}) )
            });

            imagen.className = `imagen ${idActivo}`;

            const regex1 = /rotate\((-?\d+(\.\d+)?)deg\)/;
            const valorGaleria = galeria[idActivo]
            
            originalImage.src = valorGaleria.original;
            imagen.src = valorGaleria.urlImagen;
            filtroAjusteArray = JSON.parse(valorGaleria.filtroAjuste);
            arrayPrev = JSON.parse(valorGaleria.arrayPrev);
            arrayPost = JSON.parse(valorGaleria.arrayPost);

            let matchRotate = filtroAjusteArray.ajuste.match(regex1); 
            const numeroMatch = matchRotate ? parseFloat(matchRotate[1]) : 0;
            rotate = numeroMatch;
            AchicarAjusteTamano();

            edicionGaleria = false
            AplicarFiltro();
            AplicarAjuste();
            imagen.style.clipPath = filtroAjusteArray.recortar
            edicionGaleria = true
            localStorage.setItem('savedData', JSON.stringify({imagenActivo: etiquetaIMG.id, galery: galeria}) )

        }
    });
    //opcionClonado.click()
}


function ConfigCanva(image, canvas, ctx, transform, filtro, size) {
    if(size === 0){
        size = 1;
    }
    const anchoDeseado = image.width/size;
    const altoDeseado = image.height/size;
        
    canvas.width = anchoDeseado;
    canvas.height = altoDeseado;

    if (Math.abs(rotate%360) === 90 || Math.abs(rotate%360) === 270) {
        if(transform){
            canvas.width = altoDeseado;
            canvas.height = anchoDeseado; 
        }
    }

    if(filtro){
    ctx.filter = `sepia(${filtroAjusteArray.sepia}%) blur(${filtroAjusteArray.desenfoque/2}px) brightness(${parseInt(filtroAjusteArray.brillo)+100}%) grayscale(${filtroAjusteArray.grises}%) opacity(${100-filtroAjusteArray.opacidad}%) contrast(${parseInt(filtroAjusteArray.contraste)+100}%)`; //aplicar los filtros css
    }
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(transform){
        if(rotate !== 0) ctx.rotate(rotate * Math.PI/180);
        ctx.scale(invertirHorizontal, invertirVetical);
    }
    ctx.translate(-anchoDeseado / 2, -altoDeseado / 2);

        ctx.drawImage(originalImage, 0,0,anchoDeseado,altoDeseado);


    return {anchoDeseado, altoDeseado};

}


let cropper;
let cropperCropped;
let lastCropperData = [];
const Recortar = (trans, filter) => {
        let canvas = document.getElementById("canvas-recortar");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (cropper) {
            console.log("destroy")
            cropper.destroy();
        }
        ConfigCanva(originalImage, canvas, ctx, trans, filter, 3)
        CreateCropper(canvas);
}


function CalculateCropValues() {

    let cropData = cropper.getData(true);
    lastCropperData.push(cropData);

    let top, right, bottom, left
    const imageHeight = imagen.naturalHeight/3,
        imageWidth = imagen.naturalWidth/3,
        cropHeight = cropData.height,
        cropWidth = cropData.width;
    const rotation = ((rotate % 360) + 360) % 360;

    // Calcula los valores de inset para clip-path
    if (rotation === 90) {
        top = (imageHeight - cropWidth - cropData.x) / imageHeight * 100;
        right = (imageWidth - cropHeight - cropData.y) / imageWidth * 100;
        bottom = cropData.x / imageHeight * 100;
        left = cropData.y / imageWidth * 100;

        if(invertirVetical === -1){
            top = cropData.x / imageHeight * 100;
            bottom = (imageHeight - cropWidth - cropData.x) / imageHeight * 100;
        }
        if(invertirHorizontal === -1){
            right = cropData.y / imageWidth * 100;
            left = (imageWidth - cropHeight - cropData.y) / imageWidth * 100;
        }


    } else if (rotation === 180) {
        top = (imageHeight - cropHeight - cropData.y) / imageHeight * 100;
        right = cropData.x / imageWidth * 100;
        bottom = cropData.y / imageHeight * 100;
        left = (imageWidth - cropWidth - cropData.x) / imageWidth * 100;
    
        if(invertirVetical === -1){
            top = cropData.y / imageHeight * 100; 
            bottom = (imageHeight - cropHeight - cropData.y) / imageHeight * 100;              
        }
        if(invertirHorizontal === -1){
            right = (imageWidth - cropWidth - cropData.x) / imageWidth * 100;
            left = cropData.x / imageWidth * 100;    
        }

        
    } else if (rotation === 270) {
        top = cropData.x / imageHeight * 100;
        right = cropData.y / imageWidth * 100;
        bottom = (imageHeight - cropWidth - cropData.x) / imageHeight * 100;
        left = (imageWidth - cropHeight - cropData.y) / imageWidth * 100;
        
        if(invertirVetical === -1){
            top = (imageHeight - cropWidth - cropData.x) / imageHeight * 100;
            bottom = cropData.x / imageHeight * 100;
        }
        if(invertirHorizontal === -1){
            right = (imageWidth - cropHeight - cropData.y) / imageWidth * 100;
            left = cropData.y / imageWidth * 100;
        }

    } else { // 0 or 360 degrees
        top = cropData.y / imageHeight * 100;
        right = (imageWidth - cropWidth - cropData.x) / imageWidth * 100;
        bottom = (imageHeight - cropHeight - cropData.y) / imageHeight * 100;
        left = cropData.x / imageWidth * 100;

        if(invertirVetical === -1){
            top = (imageHeight - cropHeight - cropData.y) / imageHeight * 100;
            bottom = cropData.y / imageHeight * 100;
        }
        if(invertirHorizontal === -1){
            right = cropData.x / imageWidth * 100;
            left = (imageWidth - cropWidth - cropData.x) / imageWidth * 100;
        }
    }
    return {top, right, bottom, left}
}

function crop() {
    const clipValue = CalculateCropValues();
    const clip =  `inset(${clipValue.top}% ${clipValue.right}% ${clipValue.bottom}% ${clipValue.left}%)`;
    imagen.style.clipPath = clip;
    filtroAjusteArray.recortar = clip;
    arrayPrev.push(['recortar', clip])

    setTimeout(() => document.getElementById("invertir").click(),200)
        
  }


document.getElementById("recortar-btn").addEventListener("click", crop);


document.getElementById("resetear-btn").addEventListener("click", () =>  cropper.reset())


let resizeTimeout
const CreateCropper = (canvas) => {

    cropper = new Cropper(canvas, {
        aspectRatio: NaN,
        viewMode: 1,
        autoCropArea: 1,
        movable: false,
        zoomable: false,
        rotatable: false,
        scalable: false,
    })
    cropper.setData(lastCropperData[lastCropperData.length-1])

    setTimeout(()=>{
        if(lastCropperData) {
            cropper.setData(lastCropperData[lastCropperData.length-1])
        }
    }, 50)
    

}

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
            Recortar(true, true);
            handleResize();
    }, 200);
});






const Adelante = () =>{
    if(arrayPost.length === 0){return}
    len = arrayPost.length-1;
    arrayPrev.push(arrayPost[len]);
    llave = arrayPost[len][0];
    valor1 = arrayPost[len][1];
    arrayPost.pop(); 

return {llave, valor1};
}

const Retroceder = () => {
let len = arrayPrev.length-1;
let pivot = arrayPrev[len]; //ultimo valor del array
let previous;
    for(let i = len; i>=0;i--){
        if(arrayPrev === null){return}
        
        llave = pivot[0];
        if(i == 0){
            arrayPost.push(arrayPrev.pop());
            valor1 = 0;
            //arrayPrev.splice(len);
            return {llave, valor1};
        }
        previous = arrayPrev[i-1];

        if(previous[0] == llave){
            arrayPost.push(arrayPrev.pop());
            llave = previous[0];
            valor1 = previous[1]
            return {llave, valor1};
        } 
    }
}



const AplicarDeshacerRehacer = (arrayCambio) => {
    if(arrayCambio === undefined) {return}
    imagen.classList.add("editado");

    if(arrayCambio.llave === "recortar" ){
        if(arrayCambio.valor1 === 0 ){
            imagen.style.clipPath = ""
            return;
        }else{
            imagen.style.clipPath = valor1;
            return;
        }
    }
    if(arrayCambio.llave === "escala de grises"){arrayCambio.llave = "grises"}
    if(arrayCambio.llave === "ajuste") {
        if(arrayCambio.valor1 === 0) {
            filtroAjusteArray[arrayCambio.llave] = 'rotate(0deg) scale(1,1)'
            AplicarAjuste2();
            return;
        }
        filtroAjusteArray[arrayCambio.llave] = arrayCambio.valor1;
        AplicarAjuste2();
        return;
     }
    filtroAjusteArray[arrayCambio.llave] = arrayCambio.valor1;
    opcionElegido = document.querySelector(".activo-filtro"); //solo selecciona al boton activo
    opcionElegido.click()
    AplicarFiltro();
}


atras.addEventListener("click", () => {
    arrayCambio = Retroceder();
    AplicarDeshacerRehacer(arrayCambio);
});
adelante.addEventListener("click", ()=>{
    arrayCambio = Adelante();
    AplicarDeshacerRehacer(arrayCambio);
} );





function ResetAll() {
    
    filtroAjusteArray.grises = "0", filtroAjusteArray.sepia = "0", filtroAjusteArray.desenfoque = "0", filtroAjusteArray.brillo = "0", filtroAjusteArray.contraste = "0", filtroAjusteArray.opacidad="0";
    filtroAjusteArray.ajuste = ''
    filtroAjusteArray.recortar = ''
    imagen.style.filter = ""
    imagen.style.transform = ""
    imagen.style.clipPath = ""
    arrayPrev = []
    arrayPost = []
    rotate = 0
    invertirHorizontal = 1
    invertirVetical = 1
}



//litener para subir imagen
botonImagen.addEventListener("change",SubirImagen);
subirImagen.addEventListener("click", () => botonImagen.click());

//listener para guardar la imagen
guardarImagen.addEventListener("click", () => {
    if(!guardarImagen.classList.contains("disable")){
        AbrirPanelGuardar();
    }
}); 
cerrarDescarga.addEventListener("click", () => {
    nombreArchivo.value = "";
    selectFormatos.selectedIndex = 0;
    panelGuardarImagen.classList.toggle("active");
});
descargarImagen.addEventListener("click", () => {
    GuardarImagen(nombreArchivo.value, selectFormatos.value);
    nombreArchivo.value = "";
    selectFormatos.selectedIndex = 0;
    panelGuardarImagen.classList.toggle("active");
});

//listener cuando se interactua con el slider
range.addEventListener("change", () => arrayPrev.push([nombreFiltro.innerText.toLowerCase(), range.value]));
range.addEventListener("input", GuardarFiltro);


 const previsualizacion = document.getElementById("previsualizacion")
 previsualizacion.addEventListener("mousedown", ()=>{
    imagen.style.filter = '';
    imagen.style.transform = '';
    imagen.style.clipPath = '';
 })
 previsualizacion.addEventListener("mouseup", ()=>{
    AplicarAjuste()
    AplicarFiltro()
    imagen.style.clipPath = filtroAjusteArray.recortar
 })

reset = document.getElementById("reset")
reset.addEventListener("click", () =>{
    if(confirm("deseas borrar todos los cambios hechos en la imagen?")){
        ResetAll();
    }

})


window.addEventListener('beforeunload', function (event) {
    if (this.document.querySelector(".editado")) event.preventDefault();

    return ''
});


window.onload = function() {
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
        ObtenerDatos(JSON.parse(savedData))
    }
};


  
function ObtenerDatos(savedData) {
    for(const clave in savedData.galery) {
        const nombre = savedData.galery[clave].nombreGaleria;
        imagen.src = savedData.galery[clave].urlImagen
        originalImage = new Image();
        originalImage.src = savedData.galery[clave].original;
        filtroAjusteArray = JSON.parse(savedData.galery[clave].filtroAjuste)
        arrayPrev = JSON.parse(savedData.galery[clave].arrayPrev)
        arrayPost = JSON.parse(savedData.galery[clave].arrayPost)
        llaveOnload = clave;
        recargado = true;
        AgregarImgGaleria(false, nombre);
        menuActivo = true
        MenuToggle(menuActivo);
        ConfigInicio();
        imagen.style.display = "block"; // despliega la etiqueta img
        document.getElementById("label-input-file").style.display = "none"; //quita el "boton de subir imagen en el centro del canva"
    };
    
    const nuevaIdActivo = document.getElementById(savedData.imagenActivo);
    if(nuevaIdActivo) nuevaIdActivo.closest(".contenedor-imagen-galeria").click();

}

//cerrar el alert
cerrarAlert1.addEventListener("click", () => alert1Formatos.style.display = "none");
cerrarAlert2.addEventListener("click", () => alert2tamano.style.display = "none");
cerrarAlert3.addEventListener("click", () => alert3tamano.style.display = "none");



const botonGuardar = document.querySelector(".guardar-boton2");
const contenedorGuardar = document.querySelector(".contenedor-guardar")
const guardarGaleriaCambio = document.getElementById("btnOpcion-GaleriaCambio-boton")


botonGuardar.addEventListener("click", (event) => {
    botonGuardar.classList.toggle("active")
})

document.addEventListener("click", (event) => {
    if (!contenedorGuardar.contains(event.target) && !botonGuardar.contains(event.target)) {
        botonGuardar.classList.remove("active");
    }
});

guardarGaleriaCambio.addEventListener("click", () => {AgregarImgGaleria(true, "nuevo proyecto"); guardadoProyect = true} )


//cambios en la interfaz de ayuda 

// Variables globales
let ayudaMenu = document.getElementById('ayudaMenu');
let cerrarAyudaBtn = document.getElementById('cerrar-ayuda-btn');
let ayudaBoton = document.getElementById('ayuda-boton');

// Función para mostrar/ocultar el menú de ayuda
function toggleAyudaMenu() {
    if (ayudaMenu.classList.contains('sidebar-hidden')) {
        ayudaMenu.classList.remove('sidebar-hidden');
      
    } else {
        ayudaMenu.classList.add('sidebar-hidden');
    }
}

// Evento para el botón de ayuda
ayudaBoton.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic en el botón de ayuda cierre el menú inmediatamente
    toggleAyudaMenu();

});

// Evento para el botón de cerrar
cerrarAyudaBtn.addEventListener('click', function () {
    ayudaMenu.classList.add('sidebar-hidden');
});

// Evento para cerrar el menú de ayuda al hacer clic fuera del menú
document.addEventListener('click', function (event) {
    if (!ayudaMenu.contains(event.target) && !ayudaBoton.contains(event.target)) {
        ayudaMenu.classList.add('sidebar-hidden');
    }
});

// Event listener para el botón de "Preguntas Frecuentes"
document.getElementById("preguntas-frecuentes").addEventListener("click", () => {
    // Redirige a la página de preguntas frecuentes
    window.location.href = "../html/preguntas_frecuentes.html";
});

// Event listener para el botón de "Información de Contacto"
document.getElementById("contacto").addEventListener("click", () => {
    // Muestra la información de contacto 
    alert("Número de contacto: 585-868-5101");
});


