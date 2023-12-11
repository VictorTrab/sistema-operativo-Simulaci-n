document.addEventListener('DOMContentLoaded', function() {


    //1. llamar a la api y obtener todos los archivos del usuario especifico
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const id = usuario.id
    console.log(id)

    fetch('http://localhost:8080/api/archivos/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //2. mostrar los archivos en el html recorriendolos y añadiendolos a la grid
            const grid = document.querySelector('.grid')
            data.forEach(archivo => {
                const div = document.createElement('div')
                div.classList.add('archivo')
                div.innerHTML = `
                <img src="/resources/img/file.png" alt="">
                <p>${archivo.nombre}</p>
                `
                grid.appendChild(div)
            });
        })
        .catch(err => console.log(err))

    //2. mostrar los archivos en el html recorriendolos y añadiendolos a la grid

})