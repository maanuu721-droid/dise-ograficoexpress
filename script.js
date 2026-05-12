// Initialize Lucide icons
if (window.lucide) {
    lucide.createIcons();
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s ease-out";
    observer.observe(card);
});

// Logo Parallax Effect
const logo = document.getElementById('main-logo');
window.addEventListener('mousemove', (e) => {
    if (!logo) return;
    
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    
    logo.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
        header.style.padding = "10px 0";
        header.style.background = "rgba(11, 15, 25, 0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
    } else {
        header.style.padding = "20px 0";
        header.style.background = "rgba(11, 15, 25, 0.8)";
        header.style.boxShadow = "none";
    }
});
