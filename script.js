document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        if (navbar) navbar.classList.add('light-theme');
        if (themeToggle) themeToggle.checked = true;
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('light-theme');
                if (navbar) navbar.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-theme');
                if (navbar) navbar.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetBar = entry.target;
                const width = targetBar.getAttribute('data-width');
                
                setTimeout(() => {
                    targetBar.style.width = width;
                }, 200);
                
                observer.unobserve(targetBar);
            }
        });
    }, { threshold: 0.8 });

    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
        skillObserver.observe(bar);
    });
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 90) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }
});