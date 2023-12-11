document.addEventListener("DOMContentLoaded", function (event) {

    fetch('http://localhost:8080/api/usuarios/procesos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            const procesos = document.querySelector('#procesos')
            let html = ''
            data.forEach(({pid, estado, nombre, usoMemoria}) => {
                html += `
                <tr>
                    <td>${pid}</td>
                    <td>${nombre}</td>
                    <td>${estado}</td>
                    <td>${usoMemoria}</td>
                </tr>
                `
            })  
            procesos.innerHTML = html

        })
        .catch(err => {
            console.log(err)
        })


})


