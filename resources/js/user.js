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
      if (page === 'registerPage') {
      document.getElementById('registerForm').addEventListener('submit', function (event) {
          event.preventDefault();
          let username = document.getElementById('nombre').value;
          let password = document.getElementById('password').value;
          let confirmPassword = document.getElementById('confirmPassword').value;

        if (password === confirmPassword) {
            SaveUser(username, password);
            alert('Usuario registrado exitosamente.');
            document.documentElement.requestFullscreen().then(() => {
                window.location.href = 'login.html';
            });
        }else {
            alert("¡las Contraseñas no coinciden!")
        }

      });
  }

    // Manejar el envío del formulario
     if (page === 'loginpage') {
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
            localStorage.setItem('usuarioActual', JSON.stringify(user));
            document.documentElement.requestFullscreen().then(() => {
                window.location.href = 'escritorio.html';
            });
}       
    });
}

document.querySelector(".crear-usuario").addEventListener('click', function () {
        console.log("Crear usuario")
        window.location.href = "/resources/html/register.html"    })
    
});

