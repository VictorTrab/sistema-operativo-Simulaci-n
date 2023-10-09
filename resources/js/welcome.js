document.addEventListener("DOMContentLoaded", function (event) {
   const form = document.querySelector("form")
   form.addEventListener("submit", function (e) {
      e.preventDefault()
      const password = document.querySelector(".password")
      if (password.value === "123456") {
         // Si la contraseña es correcta, se redirecciona a la página de escritorio
         console.log("Contraseña correcta")
         window.location.href = "/resources/html/escritorio.html"
      } else {
         // Si la contraseña es incorrecta, se muestra un mensaje de error
         alert("Contraseña incorrecta")
      }
   })

})
