document.addEventListener('DOMContentLoaded', cargarDatosHome);
if (document.readyState !== 'loading') {
    cargarDatosHome();
}

function cargarDatosHome() {
    console.log('Home cargado. Recuperando sesión...');

    const usuarioRaw = localStorage.getItem("usuarioLogueado");

    if (!usuarioRaw) {
        console.warn("No hay sesión activa. Redirigiendo a Login.");
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(usuarioRaw);
    const role = (user.role || user.rol || '').toString().toLowerCase();
    const isAdmin = ['admin', 'administrator', 'administrador', 'superadmin', 'super-admin'].includes(role);

    if (isAdmin) {
        console.log('Usuario administrador detectado. Redirigiendo al panel de administración.');
        window.location.href = 'templates/admin/user_list.html';
    }
}