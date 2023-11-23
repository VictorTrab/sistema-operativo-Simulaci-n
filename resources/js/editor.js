const textarea = document.getElementById("textarea1")

function f1(e) {
    let value = e.value
    textarea.style.fontSize = value + "px"
}

function f2(e) {
    if (textarea.style.fontWeight == "bold") {
        textarea.style.fontWeight = "normal"
        e.classList.remove("active")
    }
    else {
        textarea.style.fontWeight = "bold"
        e.classList.add("active")
    }
}

function f3(e) {
    if (textarea.style.fontStyle == "italic") {
        textarea.style.fontStyle = "normal"
        e.classList.remove("active")
    }
    else {
        textarea.style.fontStyle = "italic"
        e.classList.add("active")
    }
}

function f4(e) {
    if (textarea.style.textDecoration == "underline") {
        textarea.style.textDecoration = "none"
        e.classList.remove("active")
    }
    else {
        textarea.style.textDecoration = "underline"
        e.classList.add("active")
    }
}

function f5(e) {
    textarea.style.textAlign = "left"
}

function f6(e) {
    textarea.style.textAlign = "center"
}

function f7(e) {
    textarea.style.textAlign = "right"
}

function f8(e) {
    if (textarea.style.textTransform == "uppercase") {
        textarea.style.textTransform = "none"
        e.classList.remove("active")
    }
    else {
        textarea.style.textTransform = "uppercase"
        e.classList.add("active")
    }
}

function f9() {
    textarea.style.fontWeight = "normal"
    textarea.style.textAlign = "left"
    textarea.style.fontStyle = "normal"
    textarea.style.textTransform = "capitalize"
    textarea.value = ""
}

function f10(e) {
    let value = e.value
    textarea.style.color = value
}

window.addEventListener('load', () => {
    textarea.value = ""
})




// Array para almacenar los archivos guardados
const savedFiles = []

// Función para guardar el archivo
function saveFile() {
    const fileName = prompt("Enter a file name:") // Solicitar al usuario un nombre de archivo
    if (fileName) {
        const fileContent = textarea.value // Obtener el contenido del editor
        console.log({
            fileName,
            fileContent
        })

        //TODO: create a fetch POST
        const data = {
            nombre: fileName,
            extension: "txt",
            peso: 0,
            fecha: new Date(),
            usuario: JSON.parse(localStorage.getItem('usuario')).uid,
            esCarpeta: false
        }
        console.log(data)
        fetch('http://localhost:8080/api/usuarios/files', {
            method: 'POST',
            body: data,
        }).then(resp => resp.json())
            .then(resp => {
                console.log(resp)
            })
        
        console.log(JSON.parse(localStorage.getItem('usuario')))
        savedFiles.push({ name: fileName, content: fileContent }) // Agregar el archivo a la lista de archivos guardados
        updateFileList()
    }
}

// Función para actualizar la lista de archivos guardados
function updateFileList() {
    const fileList = document.getElementById("file-list")
    fileList.innerHTML = ""
    savedFiles.forEach((file, index) => {
        const listItem = document.createElement("li")
        listItem.innerHTML = `<a href="#" onclick="openFile(${index})">${file.name}</a>`
        fileList.appendChild(listItem)
    })
}

// Función para abrir un archivo
function openFile(index) {
    if (typeof index !== "undefined") {
        const file = savedFiles[index]
        textarea.value = file.content
    }
}

// Al cargar la página, actualiza la lista de archivos guardados
window.addEventListener('load', () => {
    updateFileList()


    const form = document.getElementById("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        saveFile()

    })
})
