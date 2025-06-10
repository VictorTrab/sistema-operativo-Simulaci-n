  class WindowManager {
    constructor(windowEl) {
        this.window = windowEl;
        this.titleBar = windowEl.querySelector('.title-bar');
        this.minimizeBtn = windowEl.querySelector('.minimize-btn');
        this.maximizeBtn = windowEl.querySelector('.maximize-btn');
        this.closeBtn = windowEl.querySelector('.close-btn');
        this.restoreBtn = windowEl.querySelector('.restore-btn');

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
        this.titleBar.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));

        this.minimizeBtn.addEventListener('click', this.minimize.bind(this));
        this.maximizeBtn.addEventListener('click', this.toggleMaximize.bind(this));
        this.closeBtn.addEventListener('click', this.close.bind(this));
        this.restoreBtn.addEventListener('click', this.restore.bind(this));

        this.titleBar.addEventListener('dblclick', this.toggleMaximize.bind(this));

        this.setupResizeHandles();
    }

    setupResizeHandles() {
        const handles = this.window.querySelectorAll('.resize-handle');
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

        this._resizeHandler = this.resize.bind(this);
        this._stopResizeHandler = this.stopResize.bind(this);

        document.addEventListener('mousemove', this._resizeHandler);
        document.addEventListener('mouseup', this._stopResizeHandler);
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
        document.removeEventListener('mousemove', this._resizeHandler);
        document.removeEventListener('mouseup', this._stopResizeHandler);
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
            this.window.remove();
        }, 300);
    }

    setTitle(title) {
        this.window.querySelector('.app-title').textContent = title;
    }

    setIcon(icon) {
        this.window.querySelector('.app-icon').textContent = icon;
    }
}

function createAppWindow({ title, icon, htmlUrl }) {
    const container = document.getElementById('windowsContainer');
    const id = 'window_' + Date.now() + Math.floor(Math.random() * 1000);

    const windowHTML = `
    <div class="window" id="${id}">
        <div class="title-bar">
            <div class="title">
                <div class="app-icon">${icon || ''}</div>
                <span class="app-title">${title || ''}</span>
            </div>
            <div class="window-controls">
                <button class="control-btn minimize-btn"></button>
                <button class="control-btn maximize-btn"></button>
                <button class="control-btn close-btn"></button>
            </div>
        </div>
        <div class="app-content"></div>
        <div class="resize-handle right"></div>
        <div class="resize-handle bottom"></div>
        <div class="resize-handle corner"></div>
        <button class="restore-btn">↗️</button>
    </div>
    `;
    container.insertAdjacentHTML('beforeend', windowHTML);
    const winEl = document.getElementById(id);

    // Cargar el HTML de la app dentro de un iframe
    if (htmlUrl) {
        winEl.querySelector('.app-content').innerHTML = `
            <iframe src="${htmlUrl}" style="width:100%; height:100%; border:none;" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
        `;
    }

    new WindowManager(winEl);
}
