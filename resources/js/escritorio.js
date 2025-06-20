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
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }

    }
    setInterval(mostrarHora, 1000);
    let iconoSeleccionado = null;

    // Diccionario de apps
    const apps = {
        antivirus: {
            title: "Antivirus",
            icon: "🛡️",
            htmlUrl: "/resources/app/antivirus/indexAntivirus.html"
        },
        google: {
            title: "Google",
            icon: "🌐",
            htmlUrl: "/resources/app/Google_Simulador/index.html"
        },
        camara: {
            title: "Camara",
            icon: "📷",
            htmlUrl: "/resources/app/javascript-camera/index.html"
        },
        pac_man: {
            title: "Pac_Man",
            icon: "🟡",
            htmlUrl: "/resources/app/pac_man/index.html"
        },
        temporisador: {
            title: "Temporizador",
            icon: "⏱️",
            htmlUrl: "/resources/app/temp/Temporizador.html"
        },
        webadpp: {
            title: "Clima",
            icon: "⛅",
            htmlUrl: "/resources/app/Weather_webApp-main/index.html"
        },
        explorer: {
            title: "Explorador de archivos",
            icon: "📁",
            htmlUrl: "/resources/app/file-manager-js-main/index.html"
        },
        calculator: {
            title: "Calculadora",
            icon: "🧮",
            htmlUrl: "/resources/html/calculadora.html"
        },
        editor: {
            title: "Editor de texto",
            icon: "📝",
            htmlUrl: "/resources/html/editor.html"
        },
        video: {
            title: "Editor de videos",
            icon: "🎥",
            htmlUrl: "/resources/html/videos.html"
        },
        tasks: {
            title: "Gestor de tareas",
            icon: "📋",
            htmlUrl: "/resources/app/Gestor-Tareas-Proyecto-ED-UPh/index.html"
        },
        terminal: {
            title: "Terminal",
            icon: "💻",
            htmlUrl: "/resources/html/terminal.html"
        },
            spotify: {
            title: "Arvik Beats",
            icon: "🎵",
            htmlUrl: "/resources/html/spotify.html"
        },
        imagenes: {
            title: "Imagenes",
            icon: "📷",
            htmlUrl: "/resources/html/imagenes.html"
        }
    };

    // Apps desde la barra de tareas
    document.querySelector(".explorer-files").addEventListener('click', function () {
        console.log("Explorador de archivos");
        launchApp('explorer');
    });

    document.querySelector(".calculator").addEventListener('click', function () {
        console.log("Calculadora");
        launchApp('calculator');
    });

    document.querySelector(".ed_texto").addEventListener('click', function () {
        console.log("Editor de texto");
        launchApp('editor');
    });

    document.querySelector(".imagenes").addEventListener('click', function () {
        console.log("Editor de imágenes");
        launchApp('imagenes');
    });

    document.querySelector(".video").addEventListener('click', function () {
        console.log("Editor de videos");
        launchApp('video');
    });

    document.querySelector('.tasks').addEventListener('click', function () {
        console.log("Gestor de tareas");
        launchApp('tasks');
    });

    document.querySelector('.terminal').addEventListener('click', function () {
        console.log("Terminal");
        launchApp('terminal');
    });
let iconoArrastrado = null;

// PREPARAR DRAG desde menú o barra
function prepararArrastrables(selector) {
    document.querySelectorAll(selector).forEach(btn => {
        const img = btn.querySelector('img');
        if (!img) return;

        img.setAttribute('draggable', true);
        img.addEventListener('dragstart', (e) => {
            // Clonamos solo el <img>
            const nuevoIcono = document.createElement('div');
            nuevoIcono.classList.add('icono-escritorio');
            const clon = img.cloneNode(true);
            nuevoIcono.appendChild(clon);
            nuevoIcono.setAttribute('draggable', true);

            // Identificamos la app usando clases
        const claseApp = Array.from(btn.classList).find(c => apps[c]);

        nuevoIcono.dataset.app = btn.dataset.app || claseApp;


            iconoArrastrado = nuevoIcono;
        });
    });
}

prepararArrastrables('.button-barra-tareas');
prepararArrastrables('.app-launch');

const escritorio = document.querySelector('.bg-cover');

// Permitir colocar íconos en el escritorio
escritorio.addEventListener('dragover', (e) => e.preventDefault());
escritorio.addEventListener('drop', (e) => {
    e.preventDefault();

    if (!iconoArrastrado) return;

    const esNuevo = !iconoArrastrado.parentElement || !iconoArrastrado.parentElement.classList.contains('bg-cover');

    const posX = e.clientX;
    const posY = e.clientY;
    const margen = 90;

    const escritorioRect = escritorio.getBoundingClientRect();
    const barraSuperior = document.querySelector('.barra-superior');
    const barraTareas = document.querySelector('.barra-tareas');
    const supRect = barraSuperior.getBoundingClientRect();
    const infRect = barraTareas.getBoundingClientRect();

    function enZonaProhibida(x, y) {
        const dentroSuperior = y + escritorioRect.top < supRect.bottom;
        const dentroInferior = y + escritorioRect.top + iconoArrastrado.offsetHeight > infRect.top;
        return dentroSuperior || dentroInferior;
    }

    // Bloquear si está sobre zona prohibida
    if (enZonaProhibida(posX, posY)) {
        // alert("No puedes soltar el ícono sobre la barra superior o inferior.");
        iconoArrastrado = null;
        return;
    }

    // Bloquear si hay colisión cercana
    const iconos = escritorio.querySelectorAll('.icono-escritorio');
    for (let icono of iconos) {
        const rect = icono.getBoundingClientRect();
        const iconWidth = icono.offsetWidth;
        const iconHeight = icono.offsetHeight;

        if (
            posX > rect.left - iconWidth / 2 &&
            posX < rect.right + iconWidth / 2 &&
            posY > rect.top - iconHeight / 2 &&
            posY < rect.bottom + iconHeight / 2
        ) {
            iconoArrastrado = null;
            return;
        }
    }

    const appKey = iconoArrastrado.dataset.app;

    // Posicionar y configurar
    iconoArrastrado.style.position = 'absolute';
    iconoArrastrado.style.left = `${posX}px`;
    iconoArrastrado.style.top = `${posY}px`;
    iconoArrastrado.classList.add('icono-escritorio');
    iconoArrastrado.setAttribute('draggable', true);

    // Hacerlo movible después
    iconoArrastrado.addEventListener('dragstart', function () {
        this.classList.add('dragging');
        iconoArrastrado = this;
    });

    iconoArrastrado.addEventListener('dragend', function (ev) {
        this.classList.remove('dragging');

        const newLeft = ev.clientX - escritorioRect.left - this.offsetWidth / 2;
        const newTop = ev.clientY - escritorioRect.top - this.offsetHeight / 2;

        if (!enZonaProhibida(newLeft, newTop)) {
            this.style.left = `${newLeft}px`;
            this.style.top = `${newTop}px`;
            this.dataset.lastLeft = `${newLeft}px`;
            this.dataset.lastTop = `${newTop}px`;
        } else {
            this.style.left = this.dataset.lastLeft || '0px';
            this.style.top = this.dataset.lastTop || '0px';
        }
    });

iconoArrastrado.onclick = () => {
    if (apps[appKey]) {
        launchApp(appKey);
    }
};


if (esNuevo) {
    escritorio.appendChild(iconoArrastrado);
    // Asignar menú contextual al nuevo ícono
iconoArrastrado.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    iconoSeleccionado = this;
    const menu = document.getElementById('contextMenuEscritorio');
    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    menu.classList.remove('hidden');
});

}



    // Activar arrastrado
    function habilitarArrastre(icono) {
        icono.addEventListener('dragstart', function (e) {
            iconoArrastrado = this;
            e.dataTransfer.setData('text/plain', '');
        });
    }

    habilitarArrastre(iconoArrastrado);
    iconoArrastrado = null;
});


// aqui

// Ocultar iconos
function ocultarIconosSuperpuestos() {
    const menuRect = menuInicio.getBoundingClientRect();
    document.querySelectorAll('.icono-escritorio').forEach(icono => {
        const iconRect = icono.getBoundingClientRect();
        const seSuperpone =
            iconRect.right > menuRect.left &&
            iconRect.left < menuRect.right &&
            iconRect.bottom > menuRect.top &&
            iconRect.top < menuRect.bottom;

        icono.style.opacity = seSuperpone ? '0' : '1';
        icono.style.pointerEvents = seSuperpone ? 'none' : 'auto';
    });
}

function restaurarIconos() {
    document.querySelectorAll('.icono-escritorio').forEach(icono => {
        icono.style.opacity = '1';
        icono.style.pointerEvents = 'auto';
    });
}

const botonInicio = document.getElementById('boton-inicio');
const menuInicio = document.getElementById('menu-inicio');

botonInicio.addEventListener('click', function (e) {
    e.stopPropagation();

    const mostrarMenu = !menuInicio.classList.contains('show');

    if (mostrarMenu) {
        menuInicio.classList.add('show');
        menuInicio.classList.remove('hidden');
        menuInicio.style.zIndex = '99999';
        ocultarIconosSuperpuestos();
    } else {
        menuInicio.classList.remove('show');
        menuInicio.classList.add('hidden');
        menuInicio.style.zIndex = '100';
        restaurarIconos();
    }
});

// Cerrar el menú al hacer clic fuera
document.addEventListener('click', function (e) {
    if (!menuInicio.contains(e.target) && !botonInicio.contains(e.target)) {
        if (menuInicio.classList.contains('show')) {
            menuInicio.classList.remove('show');
            menuInicio.classList.add('hidden');
            menuInicio.style.zIndex = '100';
            restaurarIconos();
        }
    }

});

    // Otros eventos

    document.querySelector('.cerrarSesion').addEventListener('click', function () {
        console.log("Cerrando sesión");
        window.location.href = "/index.html";
    });
const btnCalendario = document.querySelector('#calendar');
const calendario = document.querySelector('.calendario');

// Mostrar calendario al hacer clic en el ícono
btnCalendario.addEventListener('click', function (e) {
    e.stopPropagation(); // evita que el document.click lo cierre de inmediato
    calendario.classList.remove('hidden');
    calendario.style.zIndex = '99998';
});

// Ocultar calendario al hacer clic fuera
document.addEventListener('click', function (e) {
    if (!calendario.contains(e.target) && !btnCalendario.contains(e.target)) {
        calendario.classList.add('hidden');
        calendario.style.zIndex = 'auto'; // opcional: resetea el z-index
    }
});



    // Apps desde el menú Inicio
    document.querySelectorAll('.app-launch').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const appKey = this.dataset.app;
            console.log("Lanzando app desde menú Inicio:", appKey);
            launchApp(appKey);

            // Cierra el menú Inicio
            menuInicio.classList.remove('show');
        });
    });

    // Función común para lanzar apps
    function launchApp(appKey) {
        const app = apps[appKey];
        if (app) {
            createAppWindow({
                title: app.title,
                icon: app.icon,
                htmlUrl: app.htmlUrl
            });
        } else {
            alert("Aplicación no encontrada: " + appKey);
        }
    }

    // ---------------------------------
    // Cargar Widgets en menú Inicio
    // ---------------------------------
    const widgetContainer = document.getElementById('widgetContainer');

    const widgetTypes = {
        weather: {
            title: 'Clima',
            icon: '☀️',
            content: `
                <div>
                    <h4 class="font-semibold mb-1">Ciudad: La Paz, La Paz</h4>
                    <p>Temperatura: 24°C</p>
                    <p>Humedad: 65%</p>
                    <p>Viento: 12 km/h</p>
                    <p>Pronóstico: Soleado</p>
                </div>
            `
        },
        news: {
            title: 'Noticias',
            icon: '📰',
            content: `
                <div>
                    <h4 class="font-semibold mb-1">Titulares</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                        <li>Nuevos avances en tecnología</li>
                        <li>Mercados en alza</li>
                        <li>Evento cultural este fin de semana</li>
                        <li>Consejos para mejorar tu productividad</li>
                    </ul>
                </div>
            `
        },
        performance: {
            title: 'Rendimiento',
            icon: '📊',
            content: `
                <div>
                    <h4 class="font-semibold mb-1">Uso del sistema</h4>
                    <p>CPU: 45%</p>
                    <p>Memoria: 68%</p>
                    <p>Almacenamiento: 34%</p>
                </div>
            `
        }
    };

    function createWidget(type) {
        if (!widgetTypes[type]) return;

        const widget = document.createElement('div');
        widget.className = 'bg-gray-800 bg-opacity-70 rounded p-3 shadow';

        widget.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">${widgetTypes[type].icon} ${widgetTypes[type].title}</span>
            </div>
            <div>
                ${widgetTypes[type].content}
            </div>
        `;

        widgetContainer.appendChild(widget);
    }

    // Carga solo los widgets que quieres (sin calendario)
    createWidget('weather');
    createWidget('news');
    createWidget('performance');

    // Menú contextual con clic derecho
document.querySelector('.bg-cover').addEventListener('contextmenu', function (e) {
    e.preventDefault();
    const menu = document.getElementById('contextMenuEscritorio');
    menu.classList.remove('hidden');
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
});

// Ocultar menú al hacer clic izquierdo
document.addEventListener('click', () => {
    document.getElementById('contextMenuEscritorio').classList.add('hidden');
});

if (localStorage.getItem('activarFullscreen') === '1') {
    localStorage.removeItem('activarFullscreen'); // limpiar la marca
    document.documentElement.requestFullscreen().catch(err => {
        console.warn("No se pudo activar fullscreen:", err);
    });
}

function verPropiedades() {
  const modal = document.getElementById('modalPropiedades');
  modal.classList.add('mostrar');

  const resolucionEl = document.getElementById('resolucion');
  const horaEl = document.getElementById('horaPropiedad');
  const previewImg = document.getElementById('previewFondo');

  const fondoUrl = localStorage.getItem('wallpaper');

  if (resolucionEl && horaEl && previewImg) {
    resolucionEl.textContent = `${window.innerWidth} x ${window.innerHeight}`;
    horaEl.textContent = new Date().toLocaleTimeString();

    if (fondoUrl) {
      previewImg.src = fondoUrl;
      previewImg.style.display = "block";
    } else {
      previewImg.style.display = "none";
    }
  }
}


function cerrarPropiedades() {
  document.getElementById('modalPropiedades').classList.remove('mostrar');
}



// eliminar 
function eliminarIcono() {
    if (iconoSeleccionado) {
        iconoSeleccionado.remove();
        iconoSeleccionado = null;
    }
    document.getElementById('contextMenuEscritorio').classList.add('hidden');
}
function actualizarEscritorio() {
localStorage.setItem('activarFullscreen', '1');
location.reload();

}
window.actualizarEscritorio = actualizarEscritorio;


window.eliminarIcono = eliminarIcono;
window.verPropiedades = verPropiedades;
window.cerrarPropiedades = cerrarPropiedades;

});
