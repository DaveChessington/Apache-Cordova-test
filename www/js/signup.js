let signupListenerAttached = false;

function attachSignupHandler() {
    if (signupListenerAttached) {
        return;
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        signupListenerAttached = true;
        console.log('Signup form submit handler attached');
    }
}

document.addEventListener('deviceready', attachSignupHandler, false);
document.addEventListener('DOMContentLoaded', attachSignupHandler, false);

async function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmation = document.getElementById('registerRepeatPassword').value;

    removerAlerta();

    if (password !== confirmation) {
        mostrarAlerta('Las contraseñas no coinciden');
        return;
    }

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
