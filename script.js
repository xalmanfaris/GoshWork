document.addEventListener('DOMContentLoaded', () => {

    let lastScroll = 0;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 10) {
            header.classList.remove('hidden');
        } else if (currentScroll > lastScroll) {
            header.classList.remove('hidden');
        } else {
            header.classList.add('hidden');
        }

        lastScroll = currentScroll;
    });


    const carouselContainer = document.getElementById('main-carousel');
    const mainImage = document.getElementById('main-image');
    const zoomLens = document.getElementById('zoom-lens');
    const zoomPreview = document.getElementById('zoom-preview');
    const thumbnails = document.querySelectorAll('.thumb');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let currentThumbIndex = 0;

    function updateImage(src, index) {
        mainImage.src = src;
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[index].classList.add('active');
        currentThumbIndex = index;
    }

    if (carouselContainer && mainImage && zoomLens && zoomPreview) {
        carouselContainer.addEventListener('mousemove', (e) => {
            zoomLens.style.display = 'flex';
            zoomPreview.style.display = 'block';

            const rect = carouselContainer.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;


            const lensWidth = zoomLens.offsetWidth;
            const lensHeight = zoomLens.offsetHeight;

            x = Math.max(lensWidth / 2, Math.min(x, rect.width - lensWidth / 2));
            y = Math.max(lensHeight / 2, Math.min(y, rect.height - lensHeight / 2));

            zoomLens.style.left = `${x - lensWidth / 2}px`;
            zoomLens.style.top = `${y - lensHeight / 2}px`;


            const fx = 472 / lensWidth;
            const fy = 472 / lensHeight;

            zoomPreview.style.backgroundImage = `url(${mainImage.src})`;
            zoomPreview.style.backgroundSize = `${rect.width * fx}px ${rect.height * fy}px`;
            zoomPreview.style.backgroundPosition = `-${(x - lensWidth / 2) * fx}px -${(y - lensHeight / 2) * fy}px`;
        });

        carouselContainer.addEventListener('mouseleave', () => {
            zoomLens.style.display = 'none';
            zoomPreview.style.display = 'none';
        });
    }


    thumbnails.forEach((thumb, index) => {
        const src = thumb.getAttribute('data-src');
        if (src) {
            thumb.addEventListener('click', () => updateImage(src, index));
        }
    });


    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let nextIndex = (currentThumbIndex - 1 + thumbnails.length) % thumbnails.length;
            const nextSrc = thumbnails[nextIndex].getAttribute('data-src');
            updateImage(nextSrc, nextIndex);
        });

        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentThumbIndex + 1) % thumbnails.length;
            const nextSrc = thumbnails[nextIndex].getAttribute('data-src');
            updateImage(nextSrc, nextIndex);
        });
    }


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


    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your interest! Our experts will contact you shortly.');
            contactForm.reset();
        });
    }


    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', (e) => {
                e.stopPropagation();
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });

    const appsTrack = document.getElementById('apps-track');
    const appPrev = document.getElementById('app-prev');
    const appNext = document.getElementById('app-next');

    if (appsTrack && appPrev && appNext) {
        let scrollAmount = 0;
        const step = 452;

        appNext.addEventListener('click', () => {
            const maxScroll = appsTrack.scrollWidth - appsTrack.clientWidth;
            scrollAmount = Math.min(scrollAmount + step, maxScroll);
            appsTrack.style.transform = `translateX(-${scrollAmount}px)`;
        });

        appPrev.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - step, 0);
            appsTrack.style.transform = `translateX(-${scrollAmount}px)`;
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    const downloadTrigger = document.getElementById('download-trigger');
    const downloadModal = document.getElementById('download-modal');
    const closeModal = document.getElementById('close-modal');
    const modalForm = document.getElementById('modal-download-form');

    if (downloadTrigger && downloadModal && closeModal && modalForm) {
        const modalEmailInput = document.getElementById('modal-email');
        const modalSubmitBtn = modalForm.querySelector('.btn-modal-submit');

        downloadTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            downloadModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeFunc = () => {
            downloadModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeModal.addEventListener('click', closeFunc);

        downloadModal.addEventListener('click', (e) => {
            if (e.target === downloadModal) {
                closeFunc();
            }
        });

        modalEmailInput.addEventListener('input', () => {
            if (modalEmailInput.checkValidity() && modalEmailInput.value.length > 0) {
                modalSubmitBtn.classList.add('ready');
            } else {
                modalSubmitBtn.classList.remove('ready');
            }
        });

        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (modalSubmitBtn.classList.contains('ready')) {
                const originalText = modalSubmitBtn.innerText;
                modalSubmitBtn.innerText = 'Preparing Download...';
                modalSubmitBtn.style.opacity = '0.7';

                setTimeout(() => {
                    alert('Thank you! The full technical datasheet has been sent to your email.');
                    modalSubmitBtn.innerText = originalText;
                    modalSubmitBtn.style.opacity = '1';
                    closeFunc();
                    modalForm.reset();
                    modalSubmitBtn.classList.remove('ready');
                }, 1500);
            }
        });
    }

    const quoteTriggers = document.querySelectorAll('.quote-trigger');
    const quoteModal = document.getElementById('quote-modal');
    const closeQuoteModal = document.getElementById('close-quote-modal');
    const quoteForm = document.getElementById('modal-quote-form');

    if (quoteTriggers.length > 0 && quoteModal && closeQuoteModal && quoteForm) {
        quoteTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                quoteModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeQuoteFunc = () => {
            quoteModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeQuoteModal.addEventListener('click', closeQuoteFunc);

        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                closeQuoteFunc();
            }
        });

        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = quoteForm.querySelector('.btn-modal-submit');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Thank you! Your request for a callback has been received. Our team will contact you shortly.');
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                closeQuoteFunc();
                quoteForm.reset();
            }, 1500);
        });
    }
});
