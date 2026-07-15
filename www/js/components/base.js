(function () {
    function getAppRootUrl() {
        const currentScript = document.currentScript || document.querySelector('script[src*="js/components/base.js"]');
        const baseUrl = currentScript ? new URL(currentScript.src, window.location.href) : new URL(window.location.href);
        return new URL('../../..', baseUrl);
    }

    function resolveAppPath(path) {
        if (!path) return path;
        if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
        return new URL(path.replace(/^\.?\//, ''), getAppRootUrl()).toString();
    }

    const styles = [
        'css/styles.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
    ];

    const baseScripts = [
        'cordova.js',
        'js/env.js',
        'js/components/layout.js',
        'js/components/functions.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
    ];

    const pageScripts = {
        index: ['js/components/alerts.js', 'js/index.js'],
        signup: ['js/components/alerts.js', 'js/signup.js'],
        home: ['templates/user/js/home.js'],
        profile: ['js/components/alerts.js', 'js/profile.js'],
        admin: ['js/admin.js'],
        user_list: ['templates/admin/js/user_list.js'],
        modify_user: ['js/components/alerts.js', 'templates/admin/js/modify_users.js']
    };

    const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const scripts = baseScripts.concat(pageScripts[pageName] || []);

    styles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = resolveAppPath(href);
        document.head.appendChild(link);
    });

    function loadScriptsSequentially(list, index = 0) {
        if (index >= list.length) {
            return;
        }

        const script = document.createElement('script');
        script.src = resolveAppPath(list[index]);
        script.async = false;
        script.onload = () => loadScriptsSequentially(list, index + 1);
        script.onerror = () => loadScriptsSequentially(list, index + 1);
        document.head.appendChild(script);
    }

    loadScriptsSequentially(scripts);
})();