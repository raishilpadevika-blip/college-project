// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       MOBILE NAVIGATION TOGGLE
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Icon change
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')){
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==========================================
       STICKY HEADER ON SCROLL
       ========================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       SCROLL REVEAL ANIMATIONS
       ========================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    // Trigger on load
    revealOnScroll();

    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    /* ==========================================
       ACTIVE LINK UPDATE ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset to trigger actively a bit earlier
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            // Select the link that has an href matching the section id
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       FORM SUBMISSION HANDLER (Mock)
       ========================================== */
    const registrationForm = document.getElementById('registrationForm');
    
    if(registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic UI feedback
            const btn = registrationForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Submitting...';
            btn.style.opacity = '0.8';
            
            // Simulate network request
            setTimeout(() => {
                alert('Thank you for applying to Shree College! Our admission office will contact you soon.');
                registrationForm.reset();
                btn.textContent = originalText;
                btn.style.opacity = '1';
            }, 1500);
        });
    }

    /* ==========================================
       SMOOTH SCROLL FOR IN_PAGE LINKS
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                e.preventDefault();
                
                // Header offset if sticky header is used
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
