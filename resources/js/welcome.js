document.addEventListener("DOMContentLoaded", function (event) {

   document.querySelector(".crear-usuario").addEventListener('click', function () {
      window.location.href = 'http://localhost:5501/resources/html/register.html'
  })
   

   const form = document.querySelector("form")
   form.addEventListener("submit", function (e) {
      e.preventDefault()
      const nombre = document.querySelector("#nombre").value
      const password = document.querySelector("#password").value
      
      fetch('http://localhost:8080/api/auth/login' ,{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            nombre,
            password
         })
      }).then(res => res.json())
      .then(data => {
         console.log(data)
         Swal.fire(
            'Hello!',
            'Welcome ' + data.usuario.nombre + ' to KathOS! ❤️',
            'success'
          )
          localStorage.setItem('usuario', JSON.stringify(data.usuario))
          setTimeout(() => {
            location.href = "http://localhost:5501/resources/html/escritorio.html"
         }, 2000);
      })
      .catch(err => {
         console.log(err)
         Swal.fire(
            'Ups something went wrong!',
            'Check your credentials!',
            'error'
          )
      })

   })

})
