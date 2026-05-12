document.addEventListener('DOMContentLoaded', () => {
    // Inicializar fade in animaciones on load
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    setTimeout(() => {
        fadeElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 24, 38, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(18, 24, 38, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer para elementos scrolleables (pricing y portfolio)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // No un-observe if you want it to happen only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.pricing-card, .masonry-item');
    cards.forEach(card => {
        card.classList.add('fade-in-up');
        observer.observe(card);
    });

    // Placeholder image paths if not generated yet
    const heroPlaceholder = document.getElementById('heroPlaceholder');
    heroPlaceholder.addEventListener('error', function() {
        this.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    });
});
