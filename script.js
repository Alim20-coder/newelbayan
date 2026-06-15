function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
}

if (document.readyState === 'complete') {
    hidePreloader();
} else {
    window.addEventListener('load', hidePreloader);
    // Fallback after 2.5 seconds just in case
    setTimeout(hidePreloader, 2500);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    // Portfolio Modal Logic
    const zoomBtns = document.querySelectorAll('.portfolio-zoom');
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitleBar = document.getElementById('modalTitleBar');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    if (modal && zoomBtns.length > 0) {
        let currentImgIndex = 0;
        const galleryItems = Array.from(zoomBtns);

        function openModal(index) {
            currentImgIndex = index;
            const btn = galleryItems[index];
            modalImg.src = btn.getAttribute('data-img');
            modalTitleBar.textContent = btn.getAttribute('data-title');
            modal.classList.add('active');
        }

        function closeModal() {
            modal.classList.remove('active');
            setTimeout(() => { modalImg.src = ''; }, 300); // Clear image after animation
        }

        function nextImg() {
            currentImgIndex = (currentImgIndex - 1 + galleryItems.length) % galleryItems.length; // Next in RTL is often left arrow (prev index) or right arrow. In HTML: next has bi-chevron-left, prev has bi-chevron-right. Let's assume standard array traversal.
            openModal(currentImgIndex);
        }

        function prevImg() {
            currentImgIndex = (currentImgIndex + 1) % galleryItems.length;
            openModal(currentImgIndex);
        }

        galleryItems.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(index);
            });
        });

        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        
        if (modalNext) {
            modalNext.addEventListener('click', nextImg);
        }
        if (modalPrev) {
            modalPrev.addEventListener('click', prevImg);
        }
    }
});
