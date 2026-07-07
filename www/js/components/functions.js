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