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

    /*const avatarImg = document.getElementById('miniature');
    const emailSpan = document.getElementById('miniature_email');

    // Actualizamos la imagen y el correo electrónico en la barra de navegación
    avatarImg.src = `${API_BASE_URL}${user.avatar}`;
    emailSpan.textContent = user.email;*/

    
}