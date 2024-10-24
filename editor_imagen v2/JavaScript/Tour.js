
// Función para manejar la carga inicial de la página 
document.addEventListener('DOMContentLoaded', handleInitialLoad); 
function handleInitialLoad() {
  // Verificar si la ventana ya ha sido mostrada en esta sesión
  var ventanaYaMostrada = sessionStorage.getItem('ventana_mostrada');
  
  if (!ventanaYaMostrada) {
      // Mostrar la ventana emergente al cargar la página por primera vez en esta sesión
      document.getElementById('overlay').style.display = 'block';
      document.getElementById('window').style.display = 'block';
      document.getElementById('vent').style.display = 'block';

      // Establecer que ya se ha mostrado la ventana en sessionStorage
      sessionStorage.setItem('ventana_mostrada', 'true');
  }
}


// Añadir eventos a los botones de cerrar
 document.querySelectorAll("#cerrar, #vent button#cerrar").forEach(element => {
      element.addEventListener("click", () => { 
        document.getElementById("overlay").style.display="none"; 
          document.getElementById("window").style.display="none"; 
      });  

      //Inicia el tour con el Boton SI
  document.getElementById("seguir").addEventListener("click", function() {
    hopscotch.startTour(tour,0); 
    document.getElementById("window").style.display="none"; 
  }); 
      
  }); 
 

//Ventana Emergente de Tutorial 
document.getElementById("Guia-Web").addEventListener("click", () => {
  // Redirige a la ventana flotante
  document.getElementById("window").style.display="block"; 
  document.getElementById("vent").style.display="block";
});    


// Definición del recorrido 

// Event listener para el botón de guía web en el menú de ayuda
document.getElementById("Guia-Web").addEventListener("click", () => {
sidebar3.classList.add("sidebar-hidden");
}); 

// Mostrar el overlay al iniciar el tutorial
document.getElementById("Guia-Web").addEventListener("click", () => {
document.getElementById("overlay").style.display = "block";
});

// funciones del boton cancelar tour
document.addEventListener('click', function(event) {
if (event.target.id === 'cancelar-tour') {
    hopscotch.endTour();
    document.getElementById("overlay").style.display = "none";
    document.getElementById("window").style.display = "none"; // Esconder la ventana de tutorial
}
});
document.addEventListener('click', function(event) {
if (event.target.id === 'cancelar-tour') {
  hopscotch.endTour();
  document.getElementById("window").style.display = "none"; 
} 

});    

//Cerrar el overlay    
function cerrarOverlay() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
} 

// EventListener para el botón de subir imagen 
let subirClicked = false; 

document.getElementById("subir-boton").addEventListener("click", () => {
  subirClicked = true;
  checkSubidaImagen();
});

// Función para verificar si se ha subido una imagen y avanzar al siguiente paso
function checkSubidaImagen() {
  try {
    if (subirClicked) {
      var botonSubir = document.getElementById("subir-boton");
      botonSubir.removeAttribute("style");
      var botonMenu = document.getElementById("menu-boton");
      botonMenu.setAttribute("style", "position: relative; z-index: 1200;"); 
      hopscotch.showStep(2);
    } else {
      alert('Por favor, sube una imagen antes de continuar.');
      hopscotch.showStep(1); // Mantener en el mismo paso
    }
  } catch (error) {
    // Capturar cualquier error y no hacer nada
  }
}

 
//Verifica el boton filtro 
let filtroopen = false;
document.getElementById("filtro").addEventListener("click", () => {
  filtroopen = true;
  checkfiltro();
});

// Función para verificar si se ha clickeado el boton filtro
function checkfiltro() {
  try {
    if (filtroopen) {
      var botonSubir = document.getElementById("filtro");
      botonSubir.removeAttribute("style");
      var botonSubir = document.getElementById("menu-boton");
      botonSubir.removeAttribute("style");
      var botonMenu = document.getElementById("sidebar2");
      botonMenu.setAttribute("style", "position: relative; z-index: 1200;");
      hopscotch.showStep(5);
    } else {
      alert('Debes clickear el boton filtro para continuar.');
      hopscotch.showStep(4); // Mantener en el mismo paso
    }
  } catch (error) {
    // Capturar cualquier error y no hacer nada
  }
} 

//Funcion para verificar el boton ajustes 
let AjustesOpened = false;
document.getElementById("ajuste").addEventListener("click", () => {
  AjustesOpened = true;
  checkajuste();
});

// Función para verificar si se ha clickeado el boton filtro
function checkajuste() {
  try {
    if (AjustesOpened) {
      var boton = document.getElementById("ajuste");
      boton.removeAttribute("style");
      var menu = document.getElementById("sidebar2");
      menu.setAttribute("style", "z-index: 1200;");
      var boton = document.getElementById("menu-boton");
      boton.removeAttribute("style");
      hopscotch.showStep(11);
    } else {
      alert('Debes clickear el boton ajuste para continuar.');
      hopscotch.showStep(10); // Mantener en el mismo paso
    }
  } catch (error) {
    // Capturar cualquier error y no hacer nada
  }
}
var tour = {
  id: "mi-tour", 
  steps: [ 
     {
        title: "Bienvenido",
        content: `Esta es una guía rápida para mostrarte cómo usar esta página.
                  <br><br>
                  <button id="cancelar-tour" style="margin-top: 10px;">Cancelar</button>`,
        target: ".guardar", 
        placement: "bottom"  ,
        onNext: function() {
                var boton = document.getElementById("subir-boton");
               boton.setAttribute("style", " background-color=red;position: relative; z-index: 1200; "); 
         } ,
         onPrev: function() { 
             var boton = document.getElementById("subir-boton");
             boton.removeAttribute("style");
         }
    },
      {
        title: "Sube una Imagen",
        content: "Primero debes subir una imagen para poder editarla y seguir la guía.",
        target: "subir-boton",
        placement: "left",
        onNext: checkSubidaImagen,
        onPrev: function() {
            var botonSubir = document.getElementById("subir-boton");
            botonSubir.removeAttribute("style");
        }
      
     },
      {
          title: "Menú",
          content: "Aquí puedes encontrar distintas opciones que puedes usar para tus imagenes",
          target: "menu-boton", 
          placement: "right" ,  
          onNext: function() { 
            var boton = document.getElementById("subir-boton");
            boton.removeAttribute("style");  
            var boton = document.getElementById("galeria");
            boton.setAttribute("style", "position: relative; z-index: 1200; ");  
            var boton = document.getElementById("menu-boton");
            boton.removeAttribute("style"); 
      } ,
      onPrev: function() {  
        var boton = document.getElementById("subir-boton");
        boton.setAttribute("style", "position: relative; z-index: 1200; "); 
        var boton = document.getElementById("menu-boton");
       boton.setAttribute("style", "position: relative; z-index: 1200; "); 
       var boton = document.getElementById("menu-boton");
       boton.removeAttribute("style");   
        
 }
    },
      {
          title: "Galeria",
          content: "Aqui mostrara imagenes que recientemente hayas editado y podras volver a usarlas",
          target: "galeria",
          placement: "right" , 
          onNext: function() {  
            var boton = document.getElementById("filtro");
               boton.setAttribute("style", "position: relative; z-index: 1200; ");  
               var boton = document.getElementById("galeria");
            boton.removeAttribute("style"); 
        
          },
          onPrev: function() {  
            var boton = document.getElementById("galeria");
               boton.removeAttribute("style"); 
          var boton = document.getElementById("menu-boton");
               boton.setAttribute("style", "position: relative; z-index: 1200; "); 
        
          }
     
      }, 
      {
          title: "Filtros",
          content: "Aquí puedes agregar los filtros de tu preferencia a tus imagenes",
          target: "filtro", 
          placement: "right", 
          onNext:checkfiltro
            , 
            onPrev:function(){  
              var boton = document.getElementById("galeria");
              boton.setAttribute("style", "position: relative; z-index: 1200; "); 
              var boton = document.getElementById("filtro");
              boton.setAttribute("style", "position: relative; z-index: 1200; ");  
              var boton = document.getElementById("filtro");
              boton.removeAttribute("style"); 
            }
      },
      {
          title: "Aqui tienes diferentes filtros",
          content: "Puedes seleccionar los filtros de tu gusto ",
          target: ".sidebar2", 
          placement: "right" ,
          onNext: function () { 
            var boton = document.getElementById("range");
              boton.setAttribute("style", "position: relative; z-index: 1200; ");   
              var boton = document.getElementById("sidebar2");
              boton.removeAttribute("style");

          }, 
          onPrev: function(){
             var boton = document.getElementById("filtro");
              boton.setAttribute("style", "position: relative; z-index: 1200; ");
              var boton = document.getElementById("sidebar2");
              boton.removeAttribute("style");
          }
      }  ,  
      {
        title: "Barra",
        content: "Esta barra se utiliza para manejar en que intensidad deseas cada efecto",
        target: "range", 
        placement: "top"  ,
        onNext: function () {  
          var boton = document.getElementById("previsualizacion");
          boton.setAttribute("style", "border-color: #ffffff;color:#fff; z-index: 20000; ");     
            var boton = document.getElementById("range");
          boton.removeAttribute("style");
              
        }, 
        onPrev: function(){ 
          var boton = document.getElementById("sidebar2");
          boton.setAttribute("style", " z-index: 1200; "); 
          var boton = document.getElementById("range");
          boton.removeAttribute("style");
       }
          
    }, 
    {
      title: "Previsualización",
      content: "Podras previsualizar la imagen original antes de haber realizado todos los cambios",
      target: "previsualizacion", 
      placement: "top" ,  
      xOffset: -200,
      onShow: function() { 
        var bubble = document.querySelector('.hopscotch-bubble');
        bubble.style.top = (bubble.offsetTop - 16) + 'px';   
        var arrow = bubble.querySelector('.hopscotch-arrow');
      arrow.style.left = 'calc(50% + 60px)';  // Ajusta el valor según sea necesario
      },
      onNext: function () {  
        var deshacer = document.querySelector(".deshacer");
        deshacer.style.zIndex = "1200";  
        var boton = document.getElementById("previsualizacion");
        boton.removeAttribute("style");
      },
      onPrev: function(){ 
        var boton = document.getElementById("previsualizacion");
        boton.removeAttribute("style");
        var boton = document.getElementById("range");
        boton.setAttribute("style", "position: relative; z-index: 1200; ");   
      }
        
  },  
  {
    title: "Boton de deshacer y rehacer",
    content: "Y con estos botoncitos podrás deshacer y rehacer los cambios realizados a tu imagen",
    target: ".deshacer", 
    placement: "top",  
    xOffset: -200,
    onShow: function() { 
      var bubble = document.querySelector('.hopscotch-bubble');
      bubble.style.top = (bubble.offsetTop - 16) + 'px';   
      var arrow = bubble.querySelector('.hopscotch-arrow');
    arrow.style.left = 'calc(50% + 60px)';  // Ajusta el valor según sea necesario
    },
    onNext: function() {    
      var deshacer = document.querySelector(".deshacer");
      deshacer.removeAttribute("style"); 
      var boton = document.getElementById("reset");
      boton.setAttribute("style", "position: relative; z-index: 1200; ");   
    }, 
    onPrev: function() {     
      var deshacer = document.querySelector(".deshacer");
      deshacer.removeAttribute("style");
      var boton = document.getElementById("previsualizacion");
      boton.setAttribute("style", "border-color: #ffffff;color:#fff; z-index: 20000; ");    
    }
  }
,  
{
  title: "Boton para restablecer imagen",
  content: "Con este boton podras deshacer todos los cambios con tan solo un click",
  target: "reset", 
  placement: "top" ,   
  xOffset: -200,
  onShow: function() { 
    var bubble = document.querySelector('.hopscotch-bubble');
    bubble.style.top = (bubble.offsetTop - 16) + 'px';   
    var arrow = bubble.querySelector('.hopscotch-arrow');
    arrow.style.left = 'calc(50% + 60px)';  // Ajusta el valor según sea necesario
  },
  onNext: function () {  
    var boton = document.getElementById("ajuste");
    boton.setAttribute("style", "position: relative; z-index: 1200; ");    
    var boton = document.getElementById("reset");
    boton.removeAttribute("style");
  } ,
  onPrev: function(){   
    var deshacer = document.querySelector(".deshacer");
    deshacer.style.zIndex = "1200";  
    var boton = document.getElementById("reset");
    boton.removeAttribute("style");
  } 
}, 
 {
  title: "Ajustes",
  content: "Aqui puedes utilizar distintas herramientas",
  target: "ajuste", 
  placement: "right" ,
   onNext: checkajuste,
   onPrev: function(){  
    var boton = document.getElementById("ajuste");
    boton.removeAttribute("style");
    var boton = document.getElementById("reset");
    boton.setAttribute("style", "position: relative; z-index: 1200; ");  
     }
      },  
{
title:"Menú de Herramientas",
content:"Como puedes ver estan todas las herramientas necesarias para tu imagen",
target:"sidebar2", 
placement:"right",
onNext: function () {
  var boton = document.getElementById("ajuste");
  boton.removeAttribute("style");   
  var boton = document.getElementById("sidebar2");
  boton.removeAttribute("style"); 
  var boton = document.getElementById("recortar");
  boton.setAttribute("style", "position: relative; z-index: 1200; ");
 }, 
   onPrev: function(){  
var boton = document.getElementById("sidebar2");
boton.removeAttribute("style");
var boton = document.getElementById("ajuste"); 
boton.setAttribute("style", "position: relative; z-index: 1200; ");  
  }
    }  ,
 {
  title: "Recortar Imagen",
  content: "Puedes usar esta herramienta para lograr el tamaño deseado de una imagen o quiza quitar alguna parte de la imagen que no te agrade",
  target: "recortar", 
  placement: "right", 
  onNext: function () {
    var boton = document.getElementById("invertir"); 
    boton.setAttribute("style", "position: relative; z-index: 1200;");   
    var boton = document.getElementById("recortar");
    boton.removeAttribute("style"); 
   },
     onPrev: function(){  
      var boton = document.getElementById("recortar");
      boton.removeAttribute("style"); 
      var menu = document.getElementById("sidebar2");
      menu.setAttribute("style", " z-index: 1200; "); 
    }
 }  ,
{
  title: "Invertir",
  content: "Con esta opción puedes cambiar la direccion de como se persive la imagen",
  target: "invertir", 
  placement: "right", 
  onNext: function () { 
    var boton = document.getElementById("invertir");
    boton.removeAttribute("style");
    var boton = document.getElementById("girar"); 
      boton.setAttribute("style", "position: relative; z-index: 1200; ");  
   },
     onPrev: function(){  
      var boton = document.getElementById("recortar");
  boton.setAttribute("style", "position: relative; z-index: 1200; ");
      var boton = document.getElementById("invertir");
    boton.removeAttribute("style");
    }
},
{
  title: "Girar",
  content: "Con esta opción puedes mover de diferentes ángulos la imagen.",
  target: "girar",
  placement: "right",
  onPrev: function(){  
    var boton = document.getElementById("invertir");
boton.setAttribute("style", "position: relative; z-index: 1200; ");
    var boton = document.getElementById("girar");
  boton.removeAttribute("style");
  } ,
}  , 

  ],    
  onClose: cerrarOverlay, // Llamar a cerrarOverlay al cerrar el tour
  onEnd: function() {
    hopscotch.endTour(); // Finalizar el tour activo
    cerrarOverlay(); // Cerrar el overlay al finalizar el tour
  },
  showCloseButton: false,
  showPrevButton: true,    
 
};  







