const routes = [
    { path: '/', title: 'Accueil', file: 'home.html' },
    { path: '/404', title: 'Erreur 404', file: '404.html' },
    { path: '/galerie', title: 'Ma Galerie', file: 'galerie.html' },
    { path: '/signin', title: 'Connexion', file: 'auth/signin.html' },
    { path: '/signup', title: 'Inscription', file: 'auth/signup.html' },
    { path: '/account', title: 'Mon Compte', file: 'auth/account.html' },
    { path: '/editPassword', title: 'Changement du mot de passe', file: 'auth/editPassword.html' },
    // Add routes here if necessary.
];
async function loadPage(file) {
    const response = await fetch(`pages/${file}`);
    return response.ok ? await response.text() : null;
}

// Route definitions and loadPage function...

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

async function router() {
    let path = location.pathname;
    let route = routes.find(r => r.path == path) || routes.find(r => r.path == '/404');
    if (!route) return;

    let content = await loadPage(route.file);
    if (content) {
        let mainElement = document.querySelector('main');
        mainElement.innerHTML = content;
        document.title = route.title;
    }
}

// Add this when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Call router to load the initial content
    router();

    // Handle clicks on navigation links
    document.body.addEventListener('click', e => {
        if (e.target.matches('a')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    // Handle browser navigation events
    window.addEventListener('popstate', router);
});
