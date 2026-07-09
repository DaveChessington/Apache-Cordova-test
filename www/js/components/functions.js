//login
async function login(email, password) {
    const response = await fetch(`${window.API_BASE_URL || ''}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.Error || data.error || 'Error desconocido en el servidor');
    }

    return data;
}

//register new user
async function registerUser(email, name, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.Error || 'Error desconocido en el servidor');
        }

        alert('Solicitud de registro, espere a que un administrador apruebe su cuenta');
        window.location.href = 'index.html';
    } catch (error) {
        console.log('Error al conectar con el servidor:', error);
        mostrarAlerta('Error al conectar con el servidor');
    }
}

//update user profile
async function updateUserProfile(userId, name, password) {
    if (!userId) {
        throw new Error('Faltan datos requeridos');
    }
    const response = await fetch(`${window.API_BASE_URL || ''}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.Error || 'Error desconocido en el servidor');
    }

    return data;
}

//retrieve avatar pic
async function getAvatarPic(userId) {
    const response = await fetch(`${window.API_BASE_URL || ''}/users/profile_photo/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.Error || errorData.error || 'No se pudo cargar la imagen');
    }

    return response;
}

//update avatar pic
async function updateAvatarPic(userId, file) {
    const formData = new FormData();
    formData.append('photo', file);
    const response = await fetch(`${window.API_BASE_URL || ''}/users/profile_photo/${userId}`, {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.Error || `Error en el servidor: ${response.status}`);
    }

    return await response.json();
}

