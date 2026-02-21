
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
