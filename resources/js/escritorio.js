document.addEventListener("DOMContentLoaded", function () {
    function mostrarHora() {
        let fecha = new Date();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let ampm = hora >= 12 ? "pm" : "am";
        hora = hora % 12;
        hora = hora ? hora : 12;
        minutos = minutos < 10 ? "0" + minutos : minutos;
        let horaActual = hora + ":" + minutos + " " + ampm;
        document.querySelector(".hora_actual").innerHTML = horaActual;
    }
    setInterval(mostrarHora, 1000);

    // Apps
    document.querySelector(".explorer-files").addEventListener('click', function () {
        console.log("Explorador de archivos");
        createAppWindow({
            title: "Gestor de Archivos",
            icon: "📁",
            htmlUrl: "/resources/app/file-manager-js-main/index.html"
        });
    });

    document.querySelector(".calculator").addEventListener('click', function () {
        console.log("Calculadora");
        createAppWindow({
            title: "Calculadora",
            icon: "🧮",
            htmlUrl: "/resources/html/calculadora.html"
        });
    });

    document.querySelector(".ed_texto").addEventListener('click', function () {
        console.log("Editor de texto");
        createAppWindow({
            title: "Editor de Texto",
            icon: "📝",
            htmlUrl: "/resources/html/editor.html"
        });
    });

    document.querySelector(".camara").addEventListener('click', function () {
        console.log("Editor de imágenes");
        createAppWindow({
            title: "Editor de Imágenes",
            icon: "📷",
            htmlUrl: "/resources/html/imagenes.html"
        });
    });

    document.querySelector(".video").addEventListener('click', function () {
        console.log("Editor de videos");
        createAppWindow({
            title: "Editor de Videos",
            icon: "🎬",
            htmlUrl: "/resources/html/videos.html"
        });
    });

    document.querySelector('.gestor_tarea').addEventListener('click', function () {
        console.log("Gestor de tareas");
        createAppWindow({
            title: "Gestor de Tareas",
            icon: "🗂️",
            htmlUrl: "/resources/app/Gestor-Tareas-Proyecto-ED-UPh/index.html"
        });
    });

    // Otros eventos
    document.querySelector('#calendar').addEventListener('click', function () {
        let calendario = document.querySelector('.calendario');
        calendario.classList.remove('hidden');
    });

    document.querySelector('.cerrarSesion').addEventListener('click', function () {
        console.log("Cerrando sesión");
        window.location.href = "/index.html";
    });
});

//  Script básico para mostrar/ocultar el menú Inicio

// document.getElementById('boton-inicio').addEventListener('click', function() {
//     const menu = document.getElementById('menu-inicio');
//     menu.classList.toggle('show');
// });
