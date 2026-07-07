(function () {
    function getCurrentUser() {
        try {
            const raw = localStorage.getItem('usuarioLogueado');
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error('No se pudo leer el usuario autenticado', error);
            return null;
        }
    }

    function renderLayout() {
        const container = document.getElementById('layout-root');
        if (!container) return;

        const currentUser = getCurrentUser();

        fetch('layout.html')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not load layout');
                }
                return response.text();
            })
            .then((html) => {
                container.innerHTML = html;

                const avatarNav = document.getElementById('miniature');
                const emailNav = document.getElementById('miniature_email');

                if (avatarNav && currentUser) {
                    const avatarUrl = currentUser.profile_photo || currentUser.avatar || currentUser.photo || '';
                    avatarNav.src = `${window.API_BASE_URL || ''}/users/profile_photo/${currentUser.id}`;
                    
                }

                if (emailNav && currentUser) {
                    emailNav.textContent = currentUser.email || currentUser.username || 'User';
                }
            })
            .catch(() => {
                container.innerHTML = '<div class="p-3 text-muted">Layout could not be loaded.</div>';
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderLayout, { once: true });
    } else {
        renderLayout();
    }
})();
