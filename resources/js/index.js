document.addEventListener("DOMContentLoaded", function (event) {
    // definir la funcion para mostrar la hora en onload se hace en el html asi: <body onload="mostrarHora()">
    function mostrarHoraYFecha() {
        let fecha = new Date();
        let hora = fecha.getHours(); 
        let minutos = fecha.getMinutes();
        let ampm = hora >= 12 ? "pm" : "am"; 
        hora = hora % 12; 
        hora = hora ? hora : 12; ; 
        let horaActual = hora + ":" + minutos + " " + ampm;
        
        // Obtener información de la fecha
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const diaSemana = diasSemana[fecha.getDay()];
        const diaMes = fecha.getDate();
        const mes = meses[fecha.getMonth()];
        const fechaActual = `${diaSemana}, ${diaMes} de ${mes}`;
        document.getElementById("horaActual").innerHTML = horaActual; 
        document.getElementById("fechaActual").innerHTML = fechaActual;
    }

    setInterval(mostrarHoraYFecha, 1000); 
    const redirigirALogin = () => {
        paginaDesbloqueo.style.filter = 'blur(10px)'; 
        setTimeout(() => {
            window.location.href = 'resources/html/login.html';
        }, 500); 
    };

    // Event listener para las teclas "Espacio" y "Enter"
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            redirigirALogin();
        }
    });
})

// Código para calendario
 const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        function app() {
            return {
                month: '',
                year: '',
                no_of_days: [],
                blankdays: [],
                days: DAYS,
                events: [],
                event_title: '',
                event_date: '',
                openEventModal: false,
                editMode: false,
                editingEventIndex: null,

                get formatted_event_date() {
                    return this.event_date ? new Date(this.event_date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : '';
                },

                initDate() {
                    let today = new Date();
                    this.month = today.getMonth();
                    this.year = today.getFullYear();
                    this.getNoOfDays();
                    this.loadEvents();
                },

                isToday(date) {
                    const today = new Date();
                    const d = new Date(this.year, this.month, date);
                    return today.toDateString() === d.toDateString();
                },

                showEventModal(date) {
                    this.openEventModal = true;
                    this.event_date = new Date(this.year, this.month, date).toISOString().split('T')[0]; // formato ISO
                    this.event_title = '';
                    this.editMode = false;
                    this.editingEventIndex = null;
                },

                addEvent() {
                    if (!this.event_title) return;

                    if (this.editMode && this.editingEventIndex !== null) {
                        this.events[this.editingEventIndex].event_title = this.event_title;
                    } else {
                        this.events.push({
                            event_date: this.event_date,
                            event_title: this.event_title
                        });
                    }

                    this.saveEvents();
                    this.resetModal();
                },

                removeEvent(event) {
                    this.events = this.events.filter(e => e !== event);
                    this.saveEvents();
                },

                editEvent(event) {
                    this.event_title = event.event_title;
                    this.event_date = event.event_date;
                    this.editMode = true;
                    this.openEventModal = true;
                    this.editingEventIndex = this.events.indexOf(event);
                },

                getNoOfDays() {
                    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
                    let dayOfWeek = new Date(this.year, this.month).getDay();
                    this.blankdays = Array.from({ length: dayOfWeek }, (_, i) => i);
                    this.no_of_days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
                },

                saveEvents() {
                    localStorage.setItem('calendar-events', JSON.stringify(this.events));
                },

                loadEvents() {
                    const saved = localStorage.getItem('calendar-events');
                    if (saved) {
                        this.events = JSON.parse(saved);
                    }
                },

                resetModal() {
                    this.event_title = '';
                    this.event_date = '';
                    this.openEventModal = false;
                    this.editMode = false;
                    this.editingEventIndex = null;
                }
            }
        }

// Función para arrastrar ventanas
function makeDraggable(win) {
  const header = win.querySelector(".window-header");
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = Date.now();
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      win.style.left = ${e.clientX - offsetX}px;
      win.style.top = ${e.clientY - offsetY}px;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}