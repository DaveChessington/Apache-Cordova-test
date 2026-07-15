function init() {
    loadUserData();
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleUserUpdateData);
    }
}

if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

function loadUserData() {
    const usuarioRaw = localStorage.getItem("usuarioLogueado");

    if (!usuarioRaw) {
        console.warn("No hay sesión activa. Redirigiendo a Login.");
        window.location.href = "index.html";
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id_usuario = urlParams.get('id');

    if (!id_usuario) {
        console.warn('No se encontró el ID de usuario en la URL.');
        return;
    }

    getUser(id_usuario)
        .then(data => {
            if (!data || !data.user) {
                throw new Error('Usuario no encontrado');
            }

            const user = data.user;
            const profilePicture = document.getElementById('profile-picture');
            if (profilePicture) {
                profilePicture.src = `${window.API_BASE_URL || ''}/users/profile_photo/${user.id}` || 'https://bootdey.com';
            }
            const nameLabel = document.getElementById('name');
            const emailLabel = document.getElementById('email');
            const roleLabel = document.getElementById('role');
            const loginApprovedLabel = document.getElementById('login_approved');
            const createdAtLabel = document.getElementById('created_at');
            const updatedAtLabel = document.getElementById('updated_at');

            if (nameLabel) nameLabel.textContent = user.name || '';
            if (emailLabel) emailLabel.textContent = user.email || '';
            if (roleLabel) roleLabel.textContent = user.role || '';
            if (createdAtLabel) createdAtLabel.textContent = user.created_at || '';
            if (updatedAtLabel) updatedAtLabel.textContent = user.updated_at || '';


            const nameInput = document.getElementById('name_text');
            const emailInput = document.getElementById('email_text');
            const roleInput = document.getElementById('role_text');

            if (nameInput) nameInput.value = user.name || '';
            if (emailInput) emailInput.value = user.email || '';
            if (roleInput) roleInput.value = user.role || 'user';
            loginApprovedLabel.checked = user.is_approved || false;
        })
        .catch(error => {
            console.error('Error al cargar datos del usuario:', error);
        });
}

function handleUserUpdateData(event) {
    if (event) {
        event.preventDefault();
    }

    const name = document.getElementById('name_text').value.trim();
    const email = document.getElementById('email_text').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const role = document.getElementById('role_text').value;
    const loginApproved = document.getElementById('login_approved').checked;

    if (password !== confirm) {
        if (typeof mostrarAlerta === 'function') {
            mostrarAlerta('Las contraseñas no coinciden');
        } else {
            alert('Las contraseñas no coinciden');
        }
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id_usuario = urlParams.get('id');

    updateUserProfile(id_usuario, email, name, password, role, loginApproved)
        .then(() => {
            alert('Usuario actualizado correctamente');
            window.location.href = 'user_list.html';
        })
        .catch(error => {
            console.error('Error al actualizar usuario:', error);
            alert(error.message || 'No se pudo actualizar el usuario.');
        });
}