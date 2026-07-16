function init() {
    displayUserList();
    const userListContainer = document.getElementById('user-list');
    if (userListContainer) {
        userListContainer.addEventListener('click', handleUserListClick);
    }
    const addButton = document.getElementById('add-user-btn');
    if (addButton) {
        addButton.addEventListener('click', function() {
            window.location.href = 'add_user.html';
        });
    }
}

if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

async function displayUserList() {
    const userListContainer = document.getElementById('user-list');
    if (!userListContainer) return;
    userListContainer.innerHTML = '';
    const usuarioRaw = localStorage.getItem("usuarioLogueado");

    if (!usuarioRaw) {
        console.warn("No hay sesión activa. Redirigiendo a Login.");
        window.location.href = "index.html";
        return;
    }

    try {
        const listaUsuarios = await getUsers();

        listaUsuarios.users.forEach(user => {
            const userItem = document.createElement('tr');
            userItem.dataset.userId = user.id;
            userItem.innerHTML = createUserRow(user);
            userListContainer.appendChild(userItem);
        });

    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        userListContainer.innerHTML = '<tr><td colspan="6">Error al cargar la lista de usuarios</td></tr>';
    }
}

function createUserRow(user) {
    return `<td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.created_at}</td>
            <td>${user.updated_at}</td>
            <td>${user.role}</td>
            <td>
            <a href="modify_user.html?id=${user.id}" class="btn btn-primary btn-sm me-1">
                <i class="bi bi-pencil-square"></i> Edit
            </a>
            <button type="button" class="btn btn-danger btn-sm btn-delete">
                <i class="bi bi-trash"></i> Delete
            </button>
            </td>`;
}

async function handleUserListClick(event) {
    const deleteButton = event.target.closest('.btn-delete');
    if (!deleteButton) return;

    const row = deleteButton.closest('tr');
    const userId = row?.dataset.userId;
    if (!userId) return;

    if (!confirm('¿Desea eliminar este usuario?')) {
        return;
    }

     try {
        await deleteUser(userId);
        alert('Usuario eliminado correctamente.');
        row.remove();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('No se pudo eliminar el usuario. Intente de nuevo.');
    }
}