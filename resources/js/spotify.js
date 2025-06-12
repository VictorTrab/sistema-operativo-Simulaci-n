// Lista de pistas (puedes cambiar los nombres y las rutas)
const tracks = [
    { title: "BANDA MS  EL COLOR DE TUS OJOS VIDEO OFICIAL", url: "/resources/assets/music/BANDA MS  EL COLOR DE TUS OJOS VIDEO OFICIAL.mp3" },
    { title: "Charlie Zaa  Alma Mía  Celebración En Vivo ft Río Roma", url: "/resources/assets/music/Charlie Zaa  Alma Mía  Celebración En Vivo ft Río Roma.mp3" },
    { title: "La Sonora Dinamita  Cumbia Barulera ft Jorge Muñiz", url: "/resources/assets/music/La Sonora Dinamita  Cumbia Barulera ft Jorge Muñiz.mp3" }
];

let currentTrackIndex = 0;

const playlistEl = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Renderizar lista
tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.title;
    li.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack();
    });
    playlistEl.appendChild(li);
});

// Cargar pista actual
function loadTrack() {
    // Actualizar src
    audioPlayer.src = tracks[currentTrackIndex].url;
    audioPlayer.play();

    // Marcar pista activa
    document.querySelectorAll('#playlist li').forEach((li, index) => {
        li.classList.toggle('active', index === currentTrackIndex);
    });
}

// Botón anterior
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack();
});

// Botón siguiente
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
});

// Inicializar
loadTrack();
