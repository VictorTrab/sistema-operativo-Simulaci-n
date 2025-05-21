document.addEventListener("DOMContentLoaded", function (event) {

    // definir la funcion para mostrar la hora en onload se hace en el html asi: <body onload="mostrarHora()">
    function mostrarHoraYFecha() {
        // Define la función para mostrar la hora
        let fecha = new Date() // Crea un nuevo objeto de fecha
        let hora = fecha.getHours() // Obtiene las horas y los minutos de la fecha
        let minutos = fecha.getMinutes()
        let ampm = hora >= 12 ? "pm" : "am" // Define si es de mañana o de tarde
        hora = hora % 12 // Convierte las horas a un formato de 12 horas
        hora = hora ? hora : 12 // Si la hora es 0, la convierte a 12
        minutos = minutos < 10 ? "0" + minutos : minutos // Agrega un cero antes de los minutos si son menores a 10
        let horaActual = hora + ":" + minutos + " " + ampm // Crea una cadena de texto con la hora actual en formato hh:mm am/pm

        // Obtener información de la fecha
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const diaSemana = diasSemana[fecha.getDay()];
        const diaMes = fecha.getDate();
        const mes = meses[fecha.getMonth()];
        const fechaActual = `${diaSemana}, ${diaMes} de ${mes}`;
        document.getElementById("horaActual").innerHTML = horaActual // Actualiza el contenido del elemento con el ID "horaActual" en la página HTML
        document.getElementById("fechaActual").innerHTML = fechaActual; // Actualiza el elemento de la fecha
    }
    setInterval(mostrarHoraYFecha, 1000); // Ejecuta la función "mostrarHoraYFecha" cada segundo para mantener actualizada la hora y fecha

    const redirigirALogin = () => {
        paginaDesbloqueo.style.filter = 'blur(10px)'; // Aplica un desenfoque de 10 píxeles
        setTimeout(() => {
            window.location.href = 'resources/html/login.html';
        }, 500); // Espera 500ms (igual a la duración de la transición en CSS)
    };
    // Event listener para las teclas "Espacio" y "Enter"
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            redirigirALogin();
        }
    });

    // Event listener para el clic en cualquier parte del documento
    // document.addEventListener('click', () => {
    //     redirigirALogin();
    // });
})
