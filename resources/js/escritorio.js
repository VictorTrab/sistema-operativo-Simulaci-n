document.addEventListener("DOMContentLoaded", function () {

    function mostrarHora() {
        let fecha = new Date() 
        let hora = fecha.getHours() 
        let minutos = fecha.getMinutes()
        let ampm = hora >= 12 ? "pm" : "am" 
        hora = hora % 12 
        hora = hora ? hora : 12 
        minutos = minutos < 10 ? "0" + minutos : minutos 
        let horaActual = hora + ":" + minutos + " " + ampm 
        document.querySelector(".hora_actual").innerHTML = horaActual 
    }
    setInterval(mostrarHora, 1000) 

    // Configuración de apps (reemplaza los location.href)
    const apps = {
        'terminal': { url: '/resources/html/terminal.html', width: 700, height: 500 },
        'calculator': { url: '/resources/html/calculadora.html', width: 700, height: 500 },
        'camara': { url: '/resources/html/imagenes.html', width: 800, height: 600 },
        'video': { url: '/resources/html/videos.html', width: 1000, height: 700 },
        'editor': { url: '/resources/html/editor.html', width: 900, height: 600 },
    };

    // Manejador de clics unificado
    document.querySelectorAll('.button-barra-tareas > button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const appClass = Array.from(this.classList)
            .find(c => !c.includes('button-barra-tareas'));
            
            if(appClass && apps[appClass]) {
                windowManager.createWindow({
                    title: appClass.replace('_', ' '),
                    url: apps[appClass].url,
                    width: apps[appClass].width,
                    height: apps[appClass].height
                });
            }
        });
    });

    document.querySelector(".ed_texto").addEventListener('click', function () {
        console.log("Editor de texto")
        window.location.href = "/resources/html/editor.html"
    })

    document.querySelector(".camara").addEventListener('click', function () {
        console.log("Editor de imágenes")
        window.location.href = "/resources/html/imagenes.html"
    })
     document.querySelector(".video").addEventListener('click', function () {
        console.log("Editor de videos")
        window.location.href = "/resources/html/videos.html"
    })
      document.querySelector(".explorer-files").addEventListener('click', function () {
        console.log("Explorador de archivos")
        window.location.href = "/resources/app/file-manager-js-main/index.html"
    })

    // cuando dé click en calendario, quita el hidden de calendario
    document.querySelector('#calendar').addEventListener('click', function () {
        let calendario = document.querySelector('.calendario')
        calendario.classList.remove('hidden')
    })

    document.querySelector('.cerrar-cal').addEventListener('click', function () {
        let calendario = document.querySelector('.calendario')
        calendario.classList.add('hidden')
    })

    

    // Se agrega el evento click al botón de cerrar sesión para redireccionar a la página de bienvenida
    document.querySelector('.cerrarSesion').addEventListener('click', function () {
        console.log("Cerrando sesión")
        window.location.href = "/index.html"
    })

    //evento click para el botón de procesos con metodo get para obtener los procesos y redireccionar a la página de procesos
    document.querySelector('.gestor_tarea').addEventListener('click', function () {
        console.log("gestor tarea")
        window.location.href = "/resources/app/Gestor-Tareas-Proyecto-ED-UPh/index.html"
    })

    
 // Establecer la imagen como fondo
   function setAsWallpaper() {
  const currentImgSrc = images[currentImageIndex];
  localStorage.setItem("wallpaper", currentImgSrc);
  alert("Imagen establecida como fondo de escritorio.");

  // Si existe un contenedor de galería, cambia su fondo (imagenes.html)
  const contenedor = document.getElementsByClassName("contenedor")[0];
  if (contenedor) {
    contenedor.style.backgroundImage = `url('${currentImgSrc}')`;
  }

  // Si existe un fondo de escritorio, cámbialo (escritorio.html)
  const bgCover = document.getElementsByClassName("bg-cover")[0];
  if (bgCover) {
    bgCover.style.backgroundImage = `url('${currentImgSrc}')`;
    bgCover.style.backgroundSize = "cover";
    bgCover.style.backgroundRepeat = "no-repeat";
    bgCover.style.backgroundPosition = "center";
  }
}
   // Subir imagen desde el dispositivo
const uploadInput = document.getElementById("upload-image");
if (uploadInput) {
  uploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        images.push(e.target.result);
        currentImageIndex = images.length - 1;
        showImage();
      };
      reader.readAsDataURL(file);
    }
  });
}


    // Recuperar imagen del fondo guardada en localStorage
  const wallpaper = localStorage.getItem("wallpaper");

  // Si existe, establecerla como fondo del body
  if (wallpaper) {
    document.body.style.backgroundImage = `url('${wallpaper}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }


})