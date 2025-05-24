document.addEventListener('DOMContentLoaded', function (){
    const page = document.body.id;
})

     // guardar usuario
    function SaveUser(nombre,password){
        let user = JSON.parse(localStorage('user')) || [];

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
document.addEventListener('DOMContentLoaded', function (){
    const page = document.body.id;

    // Programar la página de incion de seción. 24/05/2025



    // Programar la página de registro 24/05/2025


    // Validacion de inicio de sesión 24/05/2025
});