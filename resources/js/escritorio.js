/*
    @autora: Daniela Agudelo
    @descripción: Este archivo contiene el código javascript para la página de escritorio
*/

// Evento principal para saber cuando cargó el html de la página de bienvenida
// Se usa el evento DOMContentLoaded para que se ejecute cuando el html esté cargado
document.addEventListener("DOMContentLoaded", function (event) {

    function mostrarHora() {
        // Define la función para mostrar la hora
        let fecha = new Date() // Crea un nuevo objeto de fecha
        let hora = fecha.getHours() // Obtiene las horas y los minutos de la fecha
        let minutos = fecha.getMinutes()
        let ampm = hora >= 12 ? "pm" : "am" // Define si es de mañana o de tarde
        hora = hora % 12 // Convierte las horas a un formato de 12 horas
        hora = hora ? hora : 12 // Si la hora es 0, la convierte a 12
        minutos = minutos < 10 ? "0" + minutos : minutos // Agrega un cero antes de los minutos si son menores a 10
        let horaActual = hora + ":" + minutos + " " + ampm // Crea una cadena de texto con la hora actual en formato hh:mm am/pm
        document.querySelector(".hora_actual").innerHTML = horaActual // Actualiza el contenido del elemento con el ID "horaActual" en la página HTML
    }
    setInterval(mostrarHora, 1000) // Ejecuta la función "mostrarHora" cada segundo para mantener actualizada la hora

    document.querySelector('.terminal').addEventListener('click', function () {
        console.log("Terminal")
        window.location.href = "/resources/html/terminal.html"
    })

    document.querySelector(".calculator").addEventListener('click', function () {
        console.log("Calculadora")
        window.location.href = "/resources/html/calculadora.html"
    })

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