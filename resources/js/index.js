document.addEventListener("DOMContentLoaded", function (event) {
    
// definir la funcion para mostrar la hora en onload se hace en el html asi: <body onload="mostrarHora()">
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
        document.getElementById("horaActual").innerHTML = horaActual // Actualiza el contenido del elemento con el ID "horaActual" en la página HTML
    }
    setInterval(mostrarHora, 1000) // Ejecuta la función "mostrarHora" cada segundo para mantener actualizada la hora

    const boton = document.querySelector(".button") // Selecciona el elemento del botón en la página HTML 
        boton.addEventListener("click", () => {
        // REDIIGE A LA PAGINA DE LOGIN QUE ESTA DENTRO DE RESOURCES/ HTML
        window.location.href = 'resources/html/login.html'
    })
})
