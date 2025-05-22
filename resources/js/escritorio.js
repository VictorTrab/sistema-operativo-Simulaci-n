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

<<<<<<< HEAD
=======
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
        window.location.href = "/file-manager-js-main/index.html"
    })
>>>>>>> c19fdfee5587e15e553c866de274c6273ab300d6

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
        window.location.href = "/Gestor-Tareas-Proyecto-ED-UPh/index.html"
    })

})