(function () {
    function getAppRootUrl() {
        const currentScript = document.currentScript || document.querySelector('script[src*="js/components/layout.js"]');
        const baseUrl = currentScript ? new URL(currentScript.src, window.location.href) : new URL(window.location.href);
        return new URL('../..', baseUrl);
    }

    function resolveAppPath(path) {
        if (!path) return path;
        if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
        return new URL(path.replace(/^\.?\//, ''), getAppRootUrl()).toString();
    }

    function getCurrentUser() {
        try {
            const raw = localStorage.getItem('usuarioLogueado');
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error('No se pudo leer el usuario autenticado', error);
            return null;
        }
    }

    function normalizeRole(user) {
        if (!user) {
            return '';
        }

        const roleValue = user.role || '';
        return typeof roleValue === 'string' ? roleValue.toLowerCase() : '';
    }

    function isAdminRole(role) {
        return ['admin', 'administrator', 'administrador', 'superadmin', 'super-admin'].includes(role);
    }

    function getNavItems(currentUser) {
        const role = normalizeRole(currentUser);
        const isAdmin = isAdminRole(role);

        const items = [];

        if (isAdmin) {
            items.push({ label: 'Admin Panel', href: 'templates/admin/user_list.html' });
        } else {
            items.push({ label: 'Home', href: 'templates/user/home.html' });
        }
        items.push({ label: 'Exit', href: 'index.html' });

        return items;
    }

    function renderLayout() {
        const container = document.getElementById('layout-root');
        if (!container) return;

        const currentUser = getCurrentUser();

        fetch(resolveAppPath('layout.html'))
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not load layout');
                }
                return response.text();
            })
            .then((html) => {
                container.innerHTML = html;

                const navLinksContainer = document.getElementById('navbar-links');
                const avatarNav = document.getElementById('miniature');
                const emailNav = document.getElementById('miniature_email');
                const brandLink = document.querySelector('.navbar-brand');

                if (brandLink) {
                    brandLink.href = resolveAppPath('profile.html');
                }

                if (navLinksContainer) {
                    const navItems = getNavItems(currentUser);
                    const currentPage = window.location.pathname.split('/').pop() || 'home.html';

                    navLinksContainer.innerHTML = navItems
                        .map(({ label, href }) => {
                            const resolvedHref = resolveAppPath(href);
                            const resolvedPage = new URL(resolvedHref, window.location.href).pathname.split('/').pop() || 'home.html';
                            const isCurrent = currentPage === resolvedPage;
                            return `
                                <li class="nav-item">
                                    <a class="nav-link${isCurrent ? ' active' : ''}"${isCurrent ? ' aria-current="page"' : ''} href="${resolvedHref}">${label}</a>
                                </li>`;
                        })
                        .join('');
                }

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
