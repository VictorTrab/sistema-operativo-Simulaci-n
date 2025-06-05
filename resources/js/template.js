        class WindowManager {
            constructor() {
                this.window = document.getElementById('appWindow');
                this.titleBar = document.getElementById('titleBar');
                this.minimizeBtn = document.getElementById('minimizeBtn');
                this.maximizeBtn = document.getElementById('maximizeBtn');
                this.closeBtn = document.getElementById('closeBtn');
                this.restoreBtn = document.getElementById('restoreBtn');
                
                this.isDragging = false;
                this.isResizing = false;
                this.isMaximized = false;
                this.isMinimized = false;
                
                this.dragOffset = { x: 0, y: 0 };
                this.originalState = { width: 0, height: 0, top: 0, left: 0 };
                
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.centerWindow();
                this.saveOriginalState();
            }

            setupEventListeners() {
                // Arrastrar ventana
                this.titleBar.addEventListener('mousedown', this.startDrag.bind(this));
                document.addEventListener('mousemove', this.drag.bind(this));
                document.addEventListener('mouseup', this.stopDrag.bind(this));

                // Controles de ventana
                this.minimizeBtn.addEventListener('click', this.minimize.bind(this));
                this.maximizeBtn.addEventListener('click', this.toggleMaximize.bind(this));
                this.closeBtn.addEventListener('click', this.close.bind(this));
                this.restoreBtn.addEventListener('click', this.restore.bind(this));

                // Doble clic para maximizar
                this.titleBar.addEventListener('dblclick', this.toggleMaximize.bind(this));

                // Redimensionar
                this.setupResizeHandles();
            }

            setupResizeHandles() {
                const handles = document.querySelectorAll('.resize-handle');
                handles.forEach(handle => {
                    handle.addEventListener('mousedown', (e) => {
                        if (this.isMaximized) return;
                        this.startResize(e, handle);
                    });
                });
            }

            centerWindow() {
                const rect = this.window.getBoundingClientRect();
                const x = (window.innerWidth - rect.width) / 2;
                const y = (window.innerHeight - rect.height) / 2;
                
                this.window.style.left = x + 'px';
                this.window.style.top = y + 'px';
            }

            saveOriginalState() {
                const rect = this.window.getBoundingClientRect();
                this.originalState = {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left
                };
            }

            startDrag(e) {
                if (this.isMaximized) return;
                
                this.isDragging = true;
                const rect = this.window.getBoundingClientRect();
                this.dragOffset = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
                
                this.window.style.zIndex = '1000';
                document.body.style.cursor = 'move';
            }

            drag(e) {
                if (!this.isDragging) return;
                
                const x = e.clientX - this.dragOffset.x;
                const y = e.clientY - this.dragOffset.y;
                
                this.window.style.left = Math.max(0, Math.min(x, window.innerWidth - this.window.offsetWidth)) + 'px';
                this.window.style.top = Math.max(0, Math.min(y, window.innerHeight - this.window.offsetHeight)) + 'px';
            }

            stopDrag() {
                this.isDragging = false;
                this.isResizing = false;
                document.body.style.cursor = 'default';
            }

            startResize(e, handle) {
                this.isResizing = true;
                this.resizeHandle = handle;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.startWidth = this.window.offsetWidth;
                this.startHeight = this.window.offsetHeight;
                
                document.addEventListener('mousemove', this.resize.bind(this));
                document.addEventListener('mouseup', this.stopResize.bind(this));
            }

            resize(e) {
                if (!this.isResizing) return;
                
                const deltaX = e.clientX - this.startX;
                const deltaY = e.clientY - this.startY;
                
                if (this.resizeHandle.classList.contains('right') || this.resizeHandle.classList.contains('corner')) {
                    const newWidth = Math.max(300, this.startWidth + deltaX);
                    this.window.style.width = newWidth + 'px';
                }
                
                if (this.resizeHandle.classList.contains('bottom') || this.resizeHandle.classList.contains('corner')) {
                    const newHeight = Math.max(200, this.startHeight + deltaY);
                    this.window.style.height = newHeight + 'px';
                }
            }

            stopResize() {
                this.isResizing = false;
                document.removeEventListener('mousemove', this.resize.bind(this));
                document.removeEventListener('mouseup', this.stopResize.bind(this));
            }

            minimize() {
                if (this.isMinimized) return;
                
                this.saveOriginalState();
                this.window.classList.add('minimized');
                this.restoreBtn.classList.add('show');
                this.isMinimized = true;
            }

            toggleMaximize() {
                if (this.isMinimized) {
                    this.restore();
                    return;
                }
                
                if (this.isMaximized) {
                    this.restoreSize();
                } else {
                    this.maximize();
                }
            }

            maximize() {
                if (this.isMaximized) return;
                
                this.saveOriginalState();
                this.window.classList.add('maximized');
                this.isMaximized = true;
            }

            restoreSize() {
                this.window.classList.remove('maximized');
                this.window.style.width = this.originalState.width + 'px';
                this.window.style.height = this.originalState.height + 'px';
                this.window.style.top = this.originalState.top + 'px';
                this.window.style.left = this.originalState.left + 'px';
                this.isMaximized = false;
            }

            restore() {
                this.window.classList.remove('minimized');
                this.restoreBtn.classList.remove('show');
                this.isMinimized = false;
            }

            close() {
                this.window.style.transform = 'scale(0)';
                this.window.style.opacity = '0';
                
                setTimeout(() => {

                document.body.style = '.window: displey: none;';

                });
            }

            // Método para cambiar el título de la aplicación
            setTitle(title) {
                document.getElementById('appTitle').textContent = title;
            }

            // Método para cambiar el icono de la aplicación
            setIcon(icon) {
                document.querySelector('.app-icon').textContent = icon;
            }
        }

        // Inicializar el administrador de ventanas
        const windowManager = new WindowManager();

        // Función de ejemplo
        function showAlert() {
            alert('¡Funciona perfectamente! Puedes reemplazar este contenido con tu aplicación.');
        }

        // Ejemplo de cómo usar los métodos
        // windowManager.setTitle('Mi Nueva App');
        // windowManager.setIcon('🚀');