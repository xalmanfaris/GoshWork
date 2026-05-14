document.addEventListener('DOMContentLoaded', () => {
    // 1. One-Way Sticky Header Logic
    let lastScroll = 0;
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 10) {
            // At the absolute top - Always show
            header.classList.remove('hidden');
        } else if (currentScroll > lastScroll) {
            // Scrolling Down - Show sticky header
            header.classList.remove('hidden');
        } else {
            // Scrolling Up - Hide header
            header.classList.add('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // 2. Carousel Logic
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    // Optional: Auto-rotate slides if multiple existed
    /*
    setInterval(() => {
        carouselSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        carouselSlides[currentSlide].classList.add('active');
    }, 5000);
    */

    // 3. Carousel Zoom Functionality
    // Note: The CSS handles the scale on hover. 
    // This JS could be used for more advanced mouse-tracking zoom if needed.
    const carouselContainer = document.getElementById('main-carousel');
    const images = document.querySelectorAll('.carousel-image');

    carouselContainer.addEventListener('mousemove', (e) => {
        const activeSlide = document.querySelector('.carousel-slide.active img');
        if (!activeSlide) return;

        const rect = carouselContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        activeSlide.style.transformOrigin = `${x}% ${y}%`;
    });

    carouselContainer.addEventListener('mouseleave', () => {
        const activeSlide = document.querySelector('.carousel-slide.active img');
        if (activeSlide) {
            activeSlide.style.transformOrigin = 'center center';
        }
    });

    // 4. Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Form Submission Placeholder
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your interest! Our experts will contact you shortly.');
            contactForm.reset();
        });
    }
});
