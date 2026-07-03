function mostrarAlerta(mensaje) {
    const form = document.querySelector('form');
    
    const alertDiv = document.createElement('div');
    alertDiv.id = "alert";
    alertDiv.className = "alert alert-danger alert-dismissible fade show small py-2 mt-3";
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
        <strong>Error:</strong> ${mensaje}
        <button type="button" class="btn-close small py-2.5" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    form.insertBefore(alertDiv, form.firstChild);
}

function removerAlerta() {
    const alertaExistente = document.getElementById('alert');
    if (alertaExistente) {
        alertaExistente.remove();
    }
}