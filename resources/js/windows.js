class Window {
  constructor(title, content, options = {}) {
    this.title = title;
    this.content = content;
    this.options = options;
    this.windowElement = null;
    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.createWindow();
    this.setupEvents();
  }
  
  createWindow() {
    const template = document.getElementById('window-template');
    const clone = template.content.cloneNode(true);
    this.windowElement = clone.querySelector('.window');
    
    // Configurar título y contenido
    this.windowElement.querySelector('.window-title').textContent = this.title;
    this.windowElement.querySelector('.window-content').innerHTML = this.content;
    
    // Aplicar opciones
    if (this.options.width) this.windowElement.style.width = this.options.width;
    if (this.options.height) this.windowElement.style.height = this.options.height;
    if (this.options.position) {
      this.windowElement.style.left = this.options.position.x + 'px';
      this.windowElement.style.top = this.options.position.y + 'px';
    }
    
    document.querySelector('.desktop').appendChild(this.windowElement);
  }
  
  setupEvents() {
    const header = this.windowElement.querySelector('.window-header');
    const minimizeBtn = this.windowElement.querySelector('.minimize');
    const maximizeBtn = this.windowElement.querySelector('.maximize');
    const closeBtn = this.windowElement.querySelector('.close');
    
    // Eventos de los botones
    minimizeBtn.addEventListener('click', () => this.toggleMinimize());
    maximizeBtn.addEventListener('click', () => this.toggleMaximize());
    closeBtn.addEventListener('click', () => this.close());
    
    // Eventos para arrastrar
    header.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.stopDrag());
  }
  
  toggleMinimize() {
    this.windowElement.classList.toggle('minimized');
  }
  
  toggleMaximize() {
    this.windowElement.classList.toggle('maximized');
  }
  
  close() {
    this.windowElement.classList.add('hidden');
    setTimeout(() => this.windowElement.remove(), 300);
  }
  
  startDrag(e) {
    if (this.windowElement.classList.contains('maximized')) return;
    
    this.isDragging = true;
    const rect = this.windowElement.getBoundingClientRect();
    this.offsetX = e.clientX - rect.left;
    this.offsetY = e.clientY - rect.top;
    
    this.bringToFront();
  }
  
  drag(e) {
    if (!this.isDragging) return;
    
    this.windowElement.style.left = `${e.clientX - this.offsetX}px`;
    this.windowElement.style.top = `${e.clientY - this.offsetY}px`;
  }
  
  stopDrag() {
    this.isDragging = false;
  }
  
  bringToFront() {
    const windows = document.querySelectorAll('.window');
    let maxZIndex = 0;
    
    windows.forEach(win => {
      const zIndex = parseInt(win.style.zIndex) || 10;
      if (zIndex > maxZIndex) maxZIndex = zIndex;
    });
    
    this.windowElement.style.zIndex = maxZIndex + 1;
  }
}

// Función para crear nuevas ventanas desde otras apps
function createAppWindow(title, content, options = {}) {
  return new Window(title, content, options);
}