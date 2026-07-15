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
if (document.readyState !== 'loading') {
    attachSignupHandler();
}

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

    try{
        const response=await registerUser(email, name, password);
        if (response.ok) {
            alert('Solicitud de registro, espere a que un administrador apruebe su cuenta');
            window.location.href = 'index.html';
        } else {
            const data = await response.json();
            throw new Error(data.Error || 'Error desconocido en el servidor');
        }
    }
    catch (error) {
        console.error('Error during registration:', error);
        mostrarAlerta(error.message || 'Error desconocido en el servidor');
    }
}
