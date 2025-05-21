// Activa al primer clic/touch en cualquier parte del documento
document.documentElement.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
      .catch(e => console.log("El usuario debe permitirlo"));
  }
}, { once: true }); 