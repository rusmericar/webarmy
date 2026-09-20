// Nota: todos los enlaces del sitio son relativos y terminan en .html, así que
// funcionan igual en GitHub Pages (/webarmy/), en un dominio propio y en local.

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
                        // Nombre del archivo actual: "blog", "eventos", "index"...
                        // (una URL que termina en "/" o vacía es la portada)
                        let currentPage = window.location.pathname.split('/').pop().replace('.html', '');
                        if (currentPage === '') currentPage = 'index';

                        navLinks.forEach(link => {
                            const linkPage = (link.getAttribute('href') || '').split('/').pop().replace('.html', '');
                            if (linkPage === currentPage) {
                                link.classList.add('text-primary');
                            }
                        });

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
