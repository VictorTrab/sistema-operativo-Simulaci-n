   // guardar usuario
    function SaveUser(nombre,password){
        let user = JSON.parse(localStorage.getItem('user')) || [];

    // objeto para el archivo JSON donde se guardaran los datos de usuario.
        let newUser = {
            user: nombre,
            password: password,
        };

    // enviar el nuevo usuer
        user.push(newUser);
        localStorage.setItem('user', JSON.stringify(user));
        console.info("Usuario Guardado", newUser);
    }


    function getUser() {
         return JSON.parse(localStorage.getItem('user')) || [];
}

document.addEventListener('DOMContentLoaded', function (){
    const page = document.body.id;

    // Programar la página de incion de seción. 24/05/2025
    


    // Programar la página de registro 24/05/2025
      if (page === 'registerPage') {
      document.getElementById('registerForm').addEventListener('submit', function (event) {
          event.preventDefault();
          let username = document.getElementById('nombre').value;
          let password = document.getElementById('password').value;
          let confirmPassword = document.getElementById('confirmPassword').value;

          if (password === confirmPassword) {
              SaveUser(username, password);
              alert('Usuario registrado exitosamente.');
              window.location.href = 'login.html';
          } else {
              alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
          }
      });
  }

    // Validacion de inicio de sesión 24/05/2025
    // Manejar el envío del formulario
if (page === 'loginPage') {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let nombre = document.getElementById('nombre').value;
        let password = document.getElementById('password').value;

        let users = getUser();
        let user = users.find(u => u.user === nombre);

        if (!user) {
            alert('El correo electrónico no está registrado.');
            return;
        }

        if (user.password === password) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('usuarioActual', JSON.stringify(user)); // Guardar usuario actual
            window.location.href = '/resources/html/escritorio.html';
        } else {
            alert('Correo electronico o Contraseña incorrecta. Por favor, inténtelo de nuevo.');
        }
    });
}
    
});