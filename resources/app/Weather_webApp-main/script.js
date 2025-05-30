
// Objeto con la clave de la API y la URL base de OpenWeatherMap
const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

// Selecciona el input donde el usuario escribe la ciudad
let searchInputBox = document.getElementById('input-box');

// Escucha cuando el usuario presiona una tecla dentro del input
searchInputBox.addEventListener('keypress', (event) => {
    // Si la tecla es Enter (código 13)
    if (event.keyCode == 13) {
        // Llama a la función para obtener el clima por ciudad
        getWeatherReport(searchInputBox.value);
    }
})

// Función para obtener el clima usando el nombre de la ciudad
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json(); // Convierte la respuesta en JSON
        }).then(showWeaterReport); // Muestra el reporte en pantalla
}

// Función para mostrar el reporte del clima en el DOM
function showWeaterReport(weather) {
    let city_code = weather.cod;

    // Si no se escribió nada
    if (city_code === '400') {
        swal("Campo vacío", "Por favor ingresa una ciudad", "error");
        reset();
    }
    // Si la ciudad no se encuentra
    else if (city_code === '404') {
        swal("Ciudad no válida", "No se encontró la ciudad ingresada", "warning");
        reset();
    }
    // Si la ciudad es válida
    else {
        // Muestra el contenedor del clima
        let op = document.getElementById('weather-body');
        op.style.display = 'block';

        let todayDate = new Date();
        let parent = document.getElementById('parent');
        let weather_body = document.getElementById('weather-body');

        // Inserta HTML con los datos del clima
        weather_body.innerHTML = `
        <div class="location-deatils">
            <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date" id="date"> ${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
            <div class="weather" id="weather"> ${translateWeather(weather.weather[0].main)} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
            <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
            <div id="updated_on">Actualizado a las ${getTime(todayDate)}</div>
        </div>
        <hr>
        <div class="day-details">
            <div class="basic">Sensación térmica ${weather.main.feels_like}&deg;C | Humedad ${weather.main.humidity}%<br>Presión ${weather.main.pressure} mb | Viento ${weather.wind.speed} KMPH</div>
        </div>
        `;
        parent.append(weather_body);

        // Cambia el fondo según el clima
        changeBg(weather.weather[0].main);

        // Limpia el input
        reset();
    }
}

// Función para mostrar la hora actual en formato HH:MM
function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

// Devuelve la fecha actual
function dateManage(dateArg) {
    // Arreglo con los días de la semana
    let days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Arreglo con los meses del año
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Obtiene el año completo (ej. 2025)
    let year = dateArg.getFullYear();

    // Obtiene el mes actual según índice (ej. 4 devuelve "Mayo")
    let month = months[dateArg.getMonth()];

    // Día del mes (ej. 23)
    let date = dateArg.getDate();

    // Día de la semana (ej. "Jueves")
    let day = days[dateArg.getDay()];

    // Devuelve la fecha en formato personalizado: 23 Mayo (Jueves), 2025
    return `${date} ${month} (${day}) , ${year}`;
}

// Devuelve la clase de icono correspondiente al tipo de clima 
function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm') {
        return 'fas fa-thunderstorm';
    } else if (classarg === 'Drizzle') {
        return 'fas fa-cloud-rain';
    } else {
        return 'fas fa-cloud-sun';
    }
}
// Función para traducir los estados del clima a español
function translateWeather(weatherStatus) {
    const translations = {
        'Rain': 'Lluvia',
        'Clouds': 'Nublado',
        'Clear': 'Despejado',
        'Snow': 'Nieve',
        'Sunny': 'Soleado',
        'Mist': 'Niebla',
        'Thunderstorm': 'Tormenta',
        'Drizzle': 'Llovizna',
        'Haze': 'Bruma',
        'Fog': 'Niebla'
    };
    
    return translations[weatherStatus] || weatherStatus;
}

// Limpia el input después de una búsqueda
function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// Añade un cero adelante si el número es menor a 10 (para mostrar 09:05 por ejemplo)
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// Obtiene el clima por coordenadas (latitud y longitud)
function getWeatherByCoordinates(lat, lon) {
    fetch(`${weatherApi.baseUrl}?lat=${lat}&lon=${lon}&appid=${weatherApi.key}&units=metric`)
        .then(response => response.json())
        .then(showWeaterReport)
        .catch(error => console.error("Error al obtener clima por coordenadas:", error));
}

// Pide al navegador la ubicación actual del usuario
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoordinates(lat, lon);
            },
            error => {
                console.warn("Geolocalización no permitida. Puedes ingresar tu ciudad manualmente.");
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Al cargar la página, intenta obtener la ubicación del usuario automáticamente
window.onload = () => {
    getLocationWeather();
}
