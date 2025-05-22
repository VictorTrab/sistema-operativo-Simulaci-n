class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndex = 100;
        this.apps = {
            'terminal': { 
                title: 'Terminal', 
                url: '/resources/html/terminal.html',  
                width: 700, 
                height: 500 
            },
            'calculator': {
                title: 'Calculadora',
                url: '/resources/html/calculadora.html',
                width: 700,
                height: 500
            },
            'video': {
                title: 'Reproductor de Videos',
                url: '/resources/html/videos.html',
                width: 1000,
                height: 700
            },
            'editor': {
                title: 'Progress Bar | Friendly Coding',
                url: '/resources/html/editor.html',
                width: 900,
                height: 600
            },
            'camara': {
                title: 'Visor de Imágenes',
                url: '/resources/html/imagenes.html',
                width: 800,
                height: 600
            },
        };
    }

    createWindow(appId) {
        const appConfig = this.apps[appId];
        if (!appConfig) return;

        // Crear elemento de ventana
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.style.width = `${appConfig.width}px`;
        windowElement.style.height = `${appConfig.height}px`;
        windowElement.style.left = `${Math.random() * 200 + 100}px`;
        windowElement.style.top = `${Math.random() * 100 + 50}px`;
        windowElement.style.zIndex = this.zIndex++;
        windowElement.dataset.appId = appId;

        // Header de la ventana
        const header = document.createElement('div');
        header.className = 'flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black window-header';
        
        // Botones de control
        const controls = document.createElement('div');
        controls.className = 'flex ml-2';
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'flex items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3 cursor-pointer';
        closeBtn.addEventListener('click', () => this.closeWindow(windowElement));
        
        const minBtn = document.createElement('div');
        minBtn.className = 'ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3 cursor-pointer';
        minBtn.addEventListener('click', () => this.minimizeWindow(windowElement));
        
        const maxBtn = document.createElement('div');
        maxBtn.className = 'ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3 cursor-pointer';
        maxBtn.addEventListener('click', () => this.toggleMaximize(windowElement));
        
        controls.appendChild(closeBtn);
        controls.appendChild(minBtn);
        controls.appendChild(maxBtn);
        
        // Título de la ventana
        const title = document.createElement('div');
        title.className = 'mx-auto pr-16';
        title.innerHTML = `<p class="text-center text-sm">${appConfig.title}</p>`;
        
        header.appendChild(controls);
        header.appendChild(title);
        
        // Contenido de la ventana (usando iframe)
        const content = document.createElement('div');
        content.className = 'window-content h-full';
        
        const iframe = document.createElement('iframe');
        iframe.src = appConfig.url;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        content.appendChild(iframe);
        windowElement.appendChild(header);
        windowElement.appendChild(content);
        
        document.body.appendChild(windowElement);
        this.windows.push(windowElement);
        
        this.makeDraggable(windowElement, header);
        
        // Hacer que la ventana se mueva al frente al hacer clic
        windowElement.addEventListener('mousedown', () => {
            this.bringToFront(windowElement);
        });
    }

    makeDraggable(windowElement, header) {
        let offsetX, offsetY, isDragging = false;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            this.bringToFront(windowElement);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            windowElement.style.left = (e.clientX - offsetX) + 'px';
            windowElement.style.top = (e.clientY - offsetY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    minimizeWindow(windowElement) {
        windowElement.classList.toggle('minimized');
        
        if (windowElement.classList.contains('minimized')) {
            windowElement.style.top = 'auto';
            windowElement.style.bottom = '50px';
        } else {
            windowElement.style.bottom = '';
        }
    }

    toggleMaximize(windowElement) {
        windowElement.classList.toggle('maximized');
        
        if (!windowElement.dataset.originalState) {
            windowElement.dataset.originalState = JSON.stringify({
                width: windowElement.style.width,
                height: windowElement.style.height,
                left: windowElement.style.left,
                top: windowElement.style.top,
                zIndex: windowElement.style.zIndex
            });
            
            windowElement.style.width = '95vw';
            windowElement.style.height = '90vh';
            windowElement.style.left = '2.5vw';
            windowElement.style.top = '2.5vh';
        } else if (windowElement.classList.contains('maximized')) {
            const original = JSON.parse(windowElement.dataset.originalState);
            Object.entries(original).forEach(([prop, value]) => {
                windowElement.style[prop] = value;
            });
            windowElement.classList.remove('maximized');
        }
    }

    bringToFront(windowElement) {
        this.windows.forEach(win => {
            if (win !== windowElement) {
                win.style.zIndex = 100;
            }
        });
        windowElement.style.zIndex = this.zIndex++;
    }

    closeWindow(windowElement) {
        const index = this.windows.indexOf(windowElement);
        if (index > -1) {
            this.windows.splice(index, 1);
        }
        windowElement.remove();
    }
}

// Inicialización
const windowManager = new WindowManager();

// Manejador de clics mejorado
document.querySelectorAll('.button-barra-tareas').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const appClass = Array.from(this.classList)
                          .find(c => !c.includes('button-barra-tareas'));
        
        if(appClass) {
            windowManager.createWindow(appClass.replace(' ', '_'));
        }
    });
});