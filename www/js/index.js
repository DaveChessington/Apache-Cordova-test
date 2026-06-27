/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('¡Formulario de login detectado y vinculado!');
    } else {
        console.error('Error: No se encontró el elemento con id="loginForm" en el HTML.');
    }
}

const API_BASE_URL = "http://davechessington.pythonanywhere.com";

async function handleLogin(event) {
    event.preventDefault(); //avoid reloading

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verificando...`;
    removerAlerta();

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.Error || "Error desconocido en el servidor");
        }

        alert(`¡Bienvenido de vuelta, ${data.user.name}!`);

        //mostrarContenidoUsuario(data.user);

        localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));

        window.location.href = "home.html";
    } catch (error) {
        mostrarAlerta(error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}


function mostrarAlerta(mensaje) {
    const form = document.querySelector('form');
    
    const alertDiv = document.createElement('div');
    alertDiv.id = "loginAlert";
    alertDiv.className = "alert alert-danger alert-dismissible fade show small py-2 mt-3";
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
        <strong>Error:</strong> ${mensaje}
        <button type="button" class="btn-close small py-2.5" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    form.insertBefore(alertDiv, form.firstChild);
}

function removerAlerta() {
    const alertaExistente = document.getElementById('loginAlert');
    if (alertaExistente) {
        alertaExistente.remove();
    }
}
/*
function mostrarContenidoUsuario(user) {
    const avatarImg = document.getElementById('avatarUsuario');
    
    if (avatarImg) {
        avatarImg.src = `${API_BASE_URL}/users/profile_photo/${user.id}`;
    }
    const user_name= document.getElementById("username")
    const mail=document.getElementById("email")
    if (user_name) {
        user_name.textContent = user.name; 
    }
    if (mail) {
        mail.textContent = user.email;
    }
}*/