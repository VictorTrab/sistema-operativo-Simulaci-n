class File {
  constructor(name, content = '') {
    this.name = name;
    this.content = content;
    this.isDirectory = false;
    this.created = new Date();
  }
}

class Directory {
  constructor(name) {
    this.name = name;
    this.isDirectory = true;
    this.children = [];
    this.created = new Date();
  }
}

class FileManager {
  constructor() {
    this.root = new Directory('root');
  }

  addFileOrDirectory(parent, name, isDirectory = true, content = '') {
    const newNode = isDirectory ? new Directory(name) : new File(name, content);
    parent.children.push(newNode);
    return newNode;
  }

  findNodeByName(node, name) {
    if (node.name === name) return node;

    if (node.isDirectory) {
      for (const child of node.children) {
        const result = this.findNodeByName(child, name);
        if (result) return result;
      }
    }

    return null;
  }

  getChildren(node) {
    return node.children;
  }

  deleteFileOrDirectory(parent, name) {
    parent.children = parent.children.filter((child) => child.name !== name);
  }

  displayDirectoryStructure(node, depth = 0) {
    console.log(
      '  '.repeat(depth) +
      node.name +
      (node.isDirectory ? '/' : ':') +
      '\n' +
      '  '.repeat(depth) +
      (node.isDirectory ? '' : node.content)
    );
    if (node.isDirectory) {
      for (const child of node.children) {
        this.displayDirectoryStructure(child, depth + 1);
      }
    }
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

const fileManager = new FileManager();
const root = fileManager.root;
const documents = fileManager.addFileOrDirectory(root, 'documents');
const pictures = fileManager.addFileOrDirectory(root, 'pictures');
const vacation = fileManager.addFileOrDirectory(pictures, 'vacation');
const work = fileManager.addFileOrDirectory(documents, 'work');
const mate = fileManager.addFileOrDirectory(work, 'mate');

const report = fileManager.addFileOrDirectory(
  work,
  'report',
  false,
  'Content of the report.\nlorem ipsum dolor sit amet.'
);

// Estado global: directorio actual
let currentDir = root;

function renderDirectories(node = currentDir) {
  currentDir = node;

  const display = document.getElementById('files');
  display.innerHTML = '';

  // Actualizar breadcrumb
  updateBreadcrumb(node);

  // Botón para volver si no estamos en root
  if (node !== root) {
    const trBack = document.createElement('tr');
    const tdBack = document.createElement('td');
    tdBack.colSpan = 4;
    tdBack.textContent = '..';
    tdBack.style.cursor = 'pointer';
    tdBack.style.color = 'cyan';
    tdBack.addEventListener('click', () => {
      const parentDir = findParent(root, node);
      if (parentDir) {
        renderDirectories(parentDir);
      }
    });
    trBack.appendChild(tdBack);
    display.appendChild(trBack);
  }

  fileManager.getChildren(node).forEach((child, i) => {
    const tr = document.createElement('tr');
    const num = document.createElement('td');
    const name = document.createElement('td');
    const type = document.createElement('td');
    const date = document.createElement('td');
    const icon = document.createElement('i');

    num.innerHTML = i + 1;
    date.innerHTML = formatDate(child.created);

    if (child.isDirectory) {
      type.innerHTML = 'Directorio';
      icon.classList = 'fa-solid fa-folder';
      name.appendChild(icon);
      name.append(' ' + child.name);
      tr.addEventListener('click', function () {
        renderDirectories(child);
      });
    } else {
      type.innerHTML = 'Archivo';
      icon.classList = 'fa-solid fa-file';
      name.appendChild(icon);
      name.append(' ' + child.name);
      tr.addEventListener('click', function () {
        const view = document.getElementById('view');
        view.innerHTML = '';
        const h4 = document.createElement('h4');
        h4.textContent = child.name + ':';
        const pre = document.createElement('pre');
        pre.textContent = child.content;
        view.appendChild(h4);
        view.appendChild(pre);
      });
    }

    tr.appendChild(num);
    tr.appendChild(name);
    tr.appendChild(type);
    tr.appendChild(date);
    display.appendChild(tr);
  });
}

function updateBreadcrumb(node) {
  const directoriesList = document.getElementById('directories');
  directoriesList.innerHTML = '';

  const path = getPath(root, node);

  path.forEach((dir, index) => {
    const li = document.createElement('li');
    li.id = `${index + 1}`;
    li.innerHTML = `<strong style="cursor:pointer" onclick="goToDirectoryByPath(${index})">${dir.name}</strong>`;
    directoriesList.appendChild(li);
  });
}

function getPath(rootNode, targetNode) {
  const path = [];

  function dfs(node, target, currPath) {
    currPath.push(node);
    if (node === target) {
      path.push(...currPath);
      return true;
    }
    if (node.isDirectory) {
      for (const child of node.children) {
        if (dfs(child, target, currPath.slice())) return true;
      }
    }
    return false;
  }

  dfs(rootNode, targetNode, []);
  return path;
}

function findParent(node, target) {
  if (node.isDirectory) {
    for (const child of node.children) {
      if (child === target) {
        return node;
      }
      const found = findParent(child, target);
      if (found) return found;
    }
  }
  return null;
}

function goToDirectoryByPath(index) {
  const path = getPath(root, currentDir);
  const targetDir = path[index];
  if (targetDir) {
    renderDirectories(targetDir);
  }
}

// --- Opciones para integración con terminal ---
window.getFileManagerRootContents = function () {
  return fileManager.getChildren(fileManager.root).map(child => ({
    name: child.name,
    isDirectory: child.isDirectory
  }));
};

// --- Funciones CRUD para el gestor ---

window.createFile = function (name, content = '') {
  if (!name) return;
  fileManager.addFileOrDirectory(currentDir, name, false, content);
  renderDirectories(currentDir);
};

window.createDir = function (name) {
  if (!name) return;
  fileManager.addFileOrDirectory(currentDir, name, true);
  renderDirectories(currentDir);
};

window.removeFileOrDir = function (name) {
  if (!name) return;
  fileManager.deleteFileOrDirectory(currentDir, name);
  renderDirectories(currentDir);
};
