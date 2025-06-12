document.addEventListener("DOMContentLoaded", function() {
    // Si está activada la bandera, forzar fullscreen
    if (localStorage.getItem('fullscreen') === 'ON') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.warn("Error al intentar fullscreen:", err);
            });
        }
    }
});
