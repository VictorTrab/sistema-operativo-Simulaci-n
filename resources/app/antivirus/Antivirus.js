const scanBtn = document.getElementById("scanBtn");
const status = document.getElementById("status");
const log = document.getElementById("log");

const fakeFiles = [
  "documento.docx",
  "fotos_vacaciones.zip",
  "sistema32.dll",
  "setup_instalador.exe",
  "presentación.pptx",
  "office_setup.exe",
  "setup_crack.exe",
  "contraseña.txt",
  "winamp.exe"
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scanFiles() {
  status.textContent = "Escaneando archivos...";
  log.innerHTML = "";
  scanBtn.disabled = true;

  for (let file of fakeFiles) {
    const isThreat = false; // Todos los archivos están limpios
    await delay(800);
    const item = document.createElement("li");
    item.textContent = `Analizando: ${file} ... ✔️ Limpio`;
    log.appendChild(item);
    log.scrollTop = log.scrollHeight;
  }

  status.textContent = "Escaneo completado.";
  scanBtn.disabled = false;
}

scanBtn.addEventListener("click", scanFiles);

// Tabs
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    tabContents.forEach(content => content.style.display = "none");
    document.getElementById(tab.dataset.tab + "Tab").style.display = "block";
  });
});
