// Esperamos a que el HTML de home.html esté completamente cargado en el DOM
document.addEventListener('DOMContentLoaded', cargarDatosHome);

function cargarDatosHome() {
    console.log('Home cargado. Recuperando sesión...');

    const usuarioRaw = localStorage.getItem("usuarioLogueado");

    if (!usuarioRaw) {
        console.warn("No hay sesión activa. Redirigiendo a Login.");
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(usuarioRaw);
    
    const API_BASE_URL = "http://127.0.0.1:5000";

    const avatarImg = document.getElementById('avatarUsuario');
    const userNameTxt = document.getElementById("username");
    const mailTxt = document.getElementById("email");

    // 4. Inyectamos los datos validando de forma segura
    if (avatarImg) {
        avatarImg.src = `${API_BASE_URL}/users/profile_photo/${user.id}`;
        // Si el usuario no tiene foto o falla el endpoint, ponemos una por defecto
        avatarImg.onerror = function() {
            this.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80";
        };
    }

    if (userNameTxt) {
        userNameTxt.textContent = user.name;
    }

    if (mailTxt) {
        mailTxt.textContent = user.email;
    }
}