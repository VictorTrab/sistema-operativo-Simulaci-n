document.addEventListener("DOMContentLoaded", function () {
    const terminal = document.querySelector('#terminal');
    const consoleDiv = document.querySelector('#console');

    const user = 'user';
    const host = 'ARVIKos';
    const prompt = `${user}@${host}:~$`;

    printPrompt();

    terminal.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            const data = terminal.value.trim();
            if (data === '') return;

            consoleDiv.insertAdjacentHTML('beforeend', `<p class="px-4 text-green-500">${prompt} ${data}</p>`);

            if (data === 'clear') {
                terminal.value = '';
                consoleDiv.innerHTML = `
                    <p class="px-4 text-sm text-gray-400">  Bienvenido a la terminal del sistema ARVIKos (v1.0.0)</p>
                    <p class="px-4 text-sm bg-gray-900 text-gray-400">  Escribe 'help' para ver los comandos disponibles</p>
                `;
                printPrompt();
                return;
            }

            if (data === 'exit') {
                if (window.frameElement && window.frameElement.closest('.window')) {
                    const win = window.frameElement.closest('.window');
                    win.style.transform = 'scale(0)';
                    win.style.opacity = '0';
                    setTimeout(() => {
                        win.remove();
                    }, 300);
                } else {
                    window.location.href = "/resources/html/escritorio.html";
                }
                return;
            }

            if (data === 'help') {
                consoleDiv.insertAdjacentHTML('beforeend', `
                    <p class="px-4 text-gray-400">Comandos disponibles:</p>
                    <p class="px-4 text-gray-400">clear: limpiar la terminal</p>
                    <p class="px-4 text-gray-400">exit: cerrar la terminal</p>
                    <p class="px-4 text-gray-400">help: ayuda</p>
                    <p class="px-4 text-gray-400">ls: listar archivos del gestor de contenido</p>
                    <p class="px-4 text-gray-400">pwd: mostrar ruta actual</p>
                    <p class="px-4 text-gray-400">whoami: mostrar usuario</p>
                    <p class="px-4 text-gray-400">date: mostrar fecha actual</p>
                    <p class="px-4 text-gray-400">uname: mostrar nombre del sistema</p>
                `);
                printPrompt();
                terminal.value = '';
                return;
            }

            if (data === 'ls') {
                if (typeof window.getFileManagerRootContents === 'function') {
                    const items = window.getFileManagerRootContents();
                    const output = items.map(item => item.isDirectory ? `${item.name}/` : item.name).join('  ');
                    consoleDiv.insertAdjacentHTML('beforeend', `<p class="px-4 text-gray-400">${output}</p>`);
                } else {
                    // Simulación (mock)
                    const mockItems = [
                        { name: 'documents', isDirectory: true },
                        { name: 'pictures', isDirectory: true },
                        { name: 'videos', isDirectory: true },
                        { name: 'readme.txt', isDirectory: false }
                    ];
                    const output = mockItems.map(item => item.isDirectory ? `${item.name}/` : item.name).join('  ');
                    consoleDiv.insertAdjacentHTML('beforeend', `<p class="px-4 text-gray-400">${output}</p>`);
                }
                printPrompt();
                terminal.value = '';
                return;
            }

            if (data === 'pwd') {
                consoleDiv.insertAdjacentHTML('beforeend', `
                    <p class="px-4 text-gray-400">/home/${user}</p>
                `);
                printPrompt();
                terminal.value = '';
                return;
            }

            if (data === 'whoami') {
                consoleDiv.insertAdjacentHTML('beforeend', `
                    <p class="px-4 text-gray-400">${user}</p>
                `);
                printPrompt();
                terminal.value = '';
                return;
            }

            if (data === 'date') {
                const now = new Date().toLocaleString();
                consoleDiv.insertAdjacentHTML('beforeend', `
                    <p class="px-4 text-gray-400">${now}</p>
                `);
                printPrompt();
                terminal.value = '';
                return;
            }

            if (data === 'uname') {
                consoleDiv.insertAdjacentHTML('beforeend', `
                    <p class="px-4 text-gray-400">ARVIKos v1.0 (simulado)</p>
                `);
                printPrompt();
                terminal.value = '';
                return;
            }

            consoleDiv.insertAdjacentHTML('beforeend', `<p class="px-4 text-red-500">Comando no reconocido: ${data}</p>`);
            printPrompt();
            terminal.value = '';
        }
    });

    function printPrompt() {
        consoleDiv.insertAdjacentHTML('beforeend', `<p class="px-4 text-green-500">${prompt} </p>`);
    }
});
