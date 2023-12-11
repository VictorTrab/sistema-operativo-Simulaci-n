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

document.addEventListener('DOMContentLoaded', async () => {

    const archivos = await traerArchivos()

    listarArchivos( archivos )

    // fetch('http://localhost:8080/api/usuarios/procesos')
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data)
       
    // })

})

const traerArchivos = async () => {
    const response = await axios.get('http://localhost:8080/api/usuarios//files/admin')
    const archivos = response.data.files
    console.log(archivos)

    return archivos
}

const listarArchivos = ( archivos = [] ) => {
    
    const contenedor = document.getElementById('listado')
    if(archivos.length === 0){
        contenedor.innerHTML = `<p class="text-center">No hay archivos</p>`
        return
    }

    let html = ''
    archivos.forEach( ( archivo ) => {
        const { informacion, esCarpeta, extension, fecha, nombre, peso, uid, usuario } = archivo

        let div = `
        <div class="bg-blue-400 p-2 h-20 rounded" id="${uid}">
            <p class="h-6">${nombre}.${extension}</p>
            <p>${fecha.split(':')[0].split('T')[0]}</p>
        </div>
        `
        html += div

    })

    contenedor.innerHTML = html

    //add event listener to each div
    archivos.forEach( ( archivo ) => {
        const { informacion, esCarpeta, extension, fecha, nombre, peso, uid, usuario } = archivo

        document.getElementById(uid).addEventListener('click', () => {
            console.log("click", uid)
            Swal.fire({
                title: `${nombre}.${extension}`,
                text: informacion,
                icon: 'info',
            })
        })
    })


}


// Array para almacenar los archivos guardados
const savedFiles = []

// Función para guardar el archivo
async function saveFile() {
    const fileName = prompt('Ingresa el nombre del archivo') // Solicitar al usuario un nombre de archivo
    if (fileName) {
        const fileContent = textarea.value // Obtener el contenido del editor
        console.log({
            fileName,
            fileContent
        })

        console.log("****", localStorage.getItem('usuario'))
        const data = {
            nombre: fileName,
            extension: "txt",
            peso: Math.random() * 1000,
            fecha: new Date(),
            usuario: JSON.parse(localStorage.getItem('usuario')).uid,
            esCarpeta: false,
            informacion: fileContent
        }
        const resp = await axios.post('http://localhost:8080/api/usuarios/files', data)
        console.log("Nuevo File: -> ", resp.data)



        const archivos = await traerArchivos()
        listarArchivos( archivos )

        Swal.fire(
            'Archivo guardado!',
            'Tu archivo se ha guardado exitosamente!',
            'success'
        )

        textarea.value = "" // Limpiar el editor
    }
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

    const form = document.getElementById("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        saveFile()

    })
})
