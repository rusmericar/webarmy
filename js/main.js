
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Countdown Logic
    const targetDateStr = "October 9, 2026 00:00:00";
    const targetDate = new Date(targetDateStr).getTime();

    function updateCountdown() {
        const daysEl = document.getElementById("days");
        if (!daysEl) return;

        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Optional: "Event Started" logic
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const format = (n) => n < 10 ? `0${n}` : n;

        daysEl.innerText = format(days);
        const hoursEl = document.getElementById("hours");
        if (hoursEl) hoursEl.innerText = format(hours);
        const minutesEl = document.getElementById("minutes");
        if (minutesEl) minutesEl.innerText = format(minutes);
        const secondsEl = document.getElementById("seconds");
        if (secondsEl) secondsEl.innerText = format(seconds);
    }

    // Start countdown if elements exist
    if (document.getElementById("days")) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
});

// Google Calendar Sync Function (Global scope for onclick)
window.addToCalendar = function (title, start, end, location, details) {
    // Helper to format date string to YYYYMMDDTHHMMSSZ
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const startFormatted = formatDate(start);
    const endFormatted = formatDate(end);

    // Construct Google Calendar URL
    const googleCalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    window.open(googleCalUrl, '_blank');
};

// Blog Modal Functions (Global scope for onclick)
window.openBlogModal = function() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeBlogModal = function(event) {
    // Allow closing by clicking the modal overlay (event.target is the overlay itself)
    if (event && event.target.id !== 'blog-modal') return;
    
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeBlogModal();
        window.closeBlogModalJin();
        window.closeBlogModalRM();
    }
});

// RM Blog Modal Functions (Global scope for onclick)
window.openBlogModalRM = function() {
    const modal = document.getElementById('blog-modal-rm');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeBlogModalRM = function(event) {
    // Allow closing by clicking the modal overlay (event.target is the overlay itself)
    if (event && event.target.id !== 'blog-modal-rm') return;
    
    const modal = document.getElementById('blog-modal-rm');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

// Jin Blog Modal Functions (Global scope for onclick)
window.openBlogModalJin = function() {
    const modal = document.getElementById('blog-modal-jin');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeBlogModalJin = function(event) {
    // Allow closing by clicking the modal overlay (event.target is the overlay itself)
    if (event && event.target.id !== 'blog-modal-jin') return;
    
    const modal = document.getElementById('blog-modal-jin');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

// Blog Filter Logic (Initialize when page loads)
document.addEventListener('DOMContentLoaded', () => {
    // Only run on blog.html page
    if (document.querySelectorAll('[data-category]').length === 0) return;

    const filterButtons = document.querySelectorAll('[data-filter]');
    const articleCards = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active button styling
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary');
                btn.classList.add('bg-primary/10');
            });
            button.classList.remove('bg-primary/10');
            button.classList.add('bg-primary');

            // Filter articles
            articleCards.forEach(card => {
                if (filterValue === 'todas') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// iOS-Style Folder Modal Functions (Global scope for onclick)
window.openFolderModal = function(folderId) {
    const modal = document.getElementById(`${folderId}-modal`);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeFolderModal = function(folderId, event) {
    // Allow closing by clicking the modal overlay
    if (event && !event.target.classList.contains('folder-modal')) {
        return;
    }
    
    const modal = document.getElementById(`${folderId}-modal`);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

// Add ESC key support for folder modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const folders = ['folder1', 'folder2', 'folder3', 'folder4'];
        folders.forEach(folderId => {
            const modal = document.getElementById(`${folderId}-modal`);
            if (modal && !modal.classList.contains('hidden')) {
                window.closeFolderModal(folderId);
            }
        });
    }
});


// Extracted Inline Scripts
function applyFilter(category) {
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.classList.remove('filter-active');
                btn.classList.add('text-slate-400');
            });
            const selectedBtn = document.getElementById('filter-' + category);
            selectedBtn.classList.add('filter-active');
            selectedBtn.classList.remove('text-slate-400');

            const items = document.querySelectorAll('.blog-item');
            items.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'todas' || itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.remove('hidden-item'), 10);
                } else {
                    item.classList.add('hidden-item');
                    setTimeout(() => item.style.display = 'none', 400);
                }
            });
        }

function filterEvents(category) {
            const eventCards = document.querySelectorAll('.event-card');
            const filterButtons = document.querySelectorAll('.filter-btn');

            // Update button styles
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white', 'shadow-md');
                btn.classList.add('bg-primary/10', 'text-primary');
            });

            const activeButton = document.getElementById(`filter-${category}`);
            if (activeButton) {
                activeButton.classList.remove('bg-primary/10', 'text-primary');
                activeButton.classList.add('bg-primary', 'text-white', 'shadow-md');
            }

            // Filter events
            eventCards.forEach(card => {
                if (category === 'todos') {
                    card.style.display = 'flex';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = cardCategory === category ? 'flex' : 'none';
                }
            });
        }


// Initialize Disqus dynamically if the container exists
if (document.getElementById('disqus_thread')) {
    var disqus_config = function () {
        this.page.url = window.location.href;
        // Extract filename without extension for identifier
        var path = window.location.pathname;
        var pageName = path.split('/').pop().split('.')[0] || 'index';
        this.page.identifier = pageName;
    };
    (function () {
        var d = document, s = d.createElement('script');
        s.src = 'https://army-universe.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
}


// Share button functionality
document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            const shareData = {
                title: document.title,
                text: '¡Mira este increíble artículo de Army Universe!',
                url: window.location.href
            };
            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback para navegadores de escritorio antiguos
                    await navigator.clipboard.writeText(window.location.href);
                    
                    // Simple tooltip feedback
                    const originalText = shareButton.innerHTML;
                    shareButton.innerHTML = '✅ ¡Enlace copiado!';
                    setTimeout(() => {
                        shareButton.innerHTML = originalText;
                    }, 2000);
                }
            } catch (err) {
                // Ignore AbortError which occurs when user cancels the share dialog
                if (err.name !== 'AbortError') {
                    console.error('Error compartiendo:', err);
                }
            }
        });
    }
});


// Auto-initialize default filters on page load
document.addEventListener('DOMContentLoaded', () => {
    // For Blog page
    const filterTodas = document.getElementById('filter-todas');
    if (filterTodas && typeof applyFilter === 'function') {
        applyFilter('todas');
    }
    
    // For Events page
    const filterTodosEvents = document.getElementById('filter-todos');
    if (filterTodosEvents && typeof filterEvents === 'function') {
        filterEvents('todos');
    }
});
