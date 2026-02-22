// Mask .html extension in URL bar for Live Server to simulate clean URLs
if (window.location.protocol === 'http:' && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')) {
    if (window.location.pathname.endsWith('.html') && window.location.pathname !== '/index.html') {
        const cleanUrl = window.location.pathname.replace('.html', '');
        window.history.replaceState(null, '', cleanUrl + window.location.search + window.location.hash);
    } else if (window.location.pathname === '/index.html') {
        window.history.replaceState(null, '', '/' + window.location.search + window.location.hash);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadComponent = (id, url) => {
        const container = document.getElementById(id);
        if (container) {
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    container.innerHTML = html;

                    if (id === 'header-container') {
                        // Highlight active link dynamically
                        const navLinks = container.querySelectorAll('.nav-link');
                        let currentPath = window.location.pathname; // Gets /blog, /index, /

                        // Handle Cloudflare Pages/Vercel standard clean URLs
                        if (currentPath === '' || currentPath === '/' || currentPath === '/index' || currentPath === '/index.html') {
                            currentPath = '/';
                        }
                        if (currentPath !== '/' && currentPath.endsWith('/')) {
                            currentPath = currentPath.slice(0, -1); // Remove trailing slash
                        }
                        if (currentPath.endsWith('.html')) {
                            currentPath = currentPath.replace('.html', ''); // Match explicit requests
                        }

                        navLinks.forEach(link => {
                            const href = link.getAttribute('href');
                            if (href === currentPath || (href === '/' && currentPath === '/')) {
                                link.classList.add('text-primary');
                            }
                        });

                        // Polyfill to make clean navigation work on Live Server without 404
                        if (!window.__cleanUrlPolyfillAdded) {
                            window.__cleanUrlPolyfillAdded = true;
                            document.body.addEventListener('click', function (e) {
                                const link = e.target.closest('a');
                                if (!link) return;

                                const href = link.getAttribute('href');
                                if (!href || href === '/' || href.includes('.html') || link.hasAttribute('target')) return;

                                if (href.startsWith('/')) {
                                    const isLocalServer = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
                                    if (isLocalServer) {
                                        e.preventDefault();
                                        window.location.href = href + '.html';
                                    }
                                }
                            });
                        }

                        // Re-initialize mobile menu toggle since it's dynamically inserted
                        initMobileMenu();
                    }
                })
                .catch(error => {
                    console.error(`Error loading ${url}:`, error);
                    container.innerHTML = `<div class="p-4 text-red-500 text-center text-sm">Error cargando ${url}. Utiliza un servidor local para visualizarlo correctamente por políticas CORS.</div>`;
                });
        }
    };

    // Load components dynamically via fetch
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');

    function initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            // Remove previous listeners by cloning node if necessary
            const newButton = mobileMenuButton.cloneNode(true);
            mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);

            newButton.addEventListener('click', () => {
                const isExpanded = newButton.getAttribute('aria-expanded') === 'true';
                newButton.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
});
