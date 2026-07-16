function init() {
    // Dynamic preview update
    const nameInput = document.getElementById('name_text');
    const emailInput = document.getElementById('email_text');
    const roleInput = document.getElementById('role_text');
    
    const namePreview = document.getElementById('name');
    const emailPreview = document.getElementById('email');
    const rolePreview = document.getElementById('role');

    if (nameInput && namePreview) {
        nameInput.addEventListener('input', function() {
            namePreview.textContent = nameInput.value.trim() || 'Nuevo Usuario';
        });
    }

    if (emailInput && emailPreview) {
        emailInput.addEventListener('input', function() {
            emailPreview.textContent = emailInput.value.trim() || 'nuevo@ejemplo.com';
        });
    }

    if (roleInput && rolePreview) {
        roleInput.addEventListener('change', function() {
            const roleText = roleInput.options[roleInput.selectedIndex].text;
            rolePreview.textContent = roleText;
        });
    }

    // Set dynamic default date for Created At
    const createdAtPreview = document.getElementById('created_at');
    if (createdAtPreview) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        createdAtPreview.textContent = new Date().toLocaleDateString('es-ES', options);
    }

    // Avatar preview update
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('profile-picture');
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    avatarPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Form Submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleCreateUser);
    }
}

if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

async function handleCreateUser(event) {
    if (event) {
        event.preventDefault();
    }

    const name = document.getElementById('name_text')?.value.trim() || '';
    const email = document.getElementById('email_text')?.value.trim() || '';
    const password = document.getElementById('password')?.value || '';
    const confirm = document.getElementById('confirm')?.value || '';
    const role = document.getElementById('role_text')?.value || 'user';
    const loginApprovedEl = document.getElementById('login_approved');
    const loginApproved = loginApprovedEl ? loginApprovedEl.checked : false;
    const avatarEl = document.getElementById('avatarInput');
    const avatar = avatarEl && avatarEl.files ? avatarEl.files[0] : null;

    if (!name || !email || !password || !confirm) {
        alert('Por favor complete todos los campos obligatorios.');
        return;
    }

    if (password !== confirm) {
        if (typeof mostrarAlerta === 'function') {
            mostrarAlerta('Las contraseñas no coinciden');
        } else {
            alert('Las contraseñas no coinciden');
        }
        return;
    }

    try {
        await createUser(email, name, password, role, loginApproved, avatar);
        alert('Usuario creado correctamente');
        window.location.href = 'user_list.html';
    } catch (error) {
        console.error('Error al crear usuario:', error);
        alert(error.message || 'No se pudo crear el usuario.');
    }
}
