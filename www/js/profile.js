document.addEventListener('DOMContentLoaded', loadProfileData);
if (document.readyState !== 'loading') {
    loadProfileData();
}

function loadProfileData() {
    console.log("loading profile...");
    const usuarioRaw = localStorage.getItem("usuarioLogueado");

    if (!usuarioRaw) {
        console.warn("No hay sesión activa. Redirigiendo a Login.");
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(usuarioRaw);

    const avatar_pic = document.getElementById("avatarUsuario");
    const name = document.getElementById("username");
    const role = document.getElementById("role");
    const email = document.getElementById("email");
    const pass = document.getElementById("password");
    const createdAt = document.getElementById("createdAt");
    const updatedAt = document.getElementById("updatedAt");
    const confirm = document.getElementById("confirmPassword");

    if (avatar_pic) {
        avatar_pic.src = `${window.API_BASE_URL || ''}/users/profile_photo/${user.id}`;
    }
    if (name) name.value = user.name || '';
    if (role) role.value = user.role || '';
    if (email) email.value = user.email || '';
    if (createdAt) createdAt.value = user.created_at || '';
    if (updatedAt) updatedAt.value = user.updated_at || '';

    try {
        // attach change handler for avatar
        pictureChanged();

        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', function (e) {
                e.preventDefault();
                profileChanged();
            });
        }
    } catch (err) {
        console.error('Error attaching profile handlers', err);
    }

}

function pictureChanged() {

    const usuarioRaw = localStorage.getItem("usuarioLogueado");

    if (!usuarioRaw) {
        console.warn("No hay sesión activa. Redirigiendo a Login.");
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(usuarioRaw);
    const avatarInput = document.getElementById("avatarInput");
    avatarInput.addEventListener("change",
        function (evento) {
            const archivo = evento.target.files[0]; //selected file
            if (archivo) {
                updateAvatarPic(user.id, archivo)
                    .then(() => {
                        alert("Imagen de perfil actualizada correctamente");
                        location.reload();
                    })
                    .catch((error) => {
                        console.log('Error al actualizar la imagen de perfil:', error);
                        mostrarAlerta("Error al actualizar la imagen de perfil");
                    });
            }
        }
    )
}

function profileChanged() {
    const name = document.getElementById("username");
    const role = document.getElementById("role");
    const pass = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");

    if (pass.value !== confirm.value) {
        mostrarAlerta("Las contraseñas no coinciden");
        return;
    }

    const usuarioRaw = localStorage.getItem("usuarioLogueado");

    if (!usuarioRaw) {
        console.warn("No hay sesión activa. Redirigiendo a Login.");
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(usuarioRaw);

    updateUserProfile(user.id, name.value, pass.value)
        .then((data) => {
            alert("Perfil actualizado correctamente");
            user.name = name.value;
            localStorage.setItem("usuarioLogueado", JSON.stringify(user));
            location.reload();
        })
        .catch((error) => {
            console.assert('Error al actualizar el perfil:', error);
            mostrarAlerta("Error al actualizar el perfil");
        });
}