
    // ---------- Loader ----------
    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      loader.classList.add('hidden');
    });

    // ---------- Scroll progress ----------
    const progress = document.getElementById('scrollProgress');
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? (scrollTop / height) * 100 : 0;
      progress.style.width = `${ratio}%`;
      document.getElementById('backToTop').classList.toggle('show', scrollTop > 750);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // ---------- Smooth scrolling for anchor navigation ----------
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
          document.getElementById('navLinks').classList.remove('open');
        }
      });
    });

    // ---------- Mobile menu ----------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // ---------- Scroll spy active nav ----------
    const sections = [...document.querySelectorAll('section[id]')];
    const navAnchors = [...document.querySelectorAll('.nav-links a')];
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { threshold: 0.45 });
    sections.forEach((section) => sectionObserver.observe(section));

    // ---------- Reveal on scroll ----------
    const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));

    // ---------- Typing animation ----------
    const phrases = [
      'Computer Science Engineer',
      'AI & ML Enthusiast',
      'Full Stack Developer',
      'Problem Solver'
    ];
    const typingText = document.getElementById('typingText');
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      if (!deleting) {
        typingText.textContent = currentPhrase.slice(0, ++charIndex);
        if (charIndex === currentPhrase.length) {
          deleting = true;
          setTimeout(typeLoop, 1300);
          return;
        }
      } else {
        typingText.textContent = currentPhrase.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 70 : 110);
    }
    typeLoop();

    // ---------- Animated counters ----------
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.7 });
    counters.forEach((counter) => counterObserver.observe(counter));

    // ---------- Skill bars ----------
    const skillBars = document.querySelectorAll('.bar-fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-width');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.7 });
    skillBars.forEach((bar) => skillObserver.observe(bar));

    // ---------- Custom cursor ----------
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      cursorRing.style.left = `${mouseX}px`;
      cursorRing.style.top = `${mouseY}px`;
    });

    const interactive = document.querySelectorAll('a, button, input, textarea, .project-card, .glass-card, .soft-card, .micro-card');
    interactive.forEach((element) => {
      element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // ---------- Particle background ----------
    const particleLayer = document.getElementById('particles');
    for (let i = 0; i < 48; i += 1) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${8 + Math.random() * 8}s`;
      particleLayer.appendChild(particle);
    }

    // ---------- Ripple effect ----------
    document.querySelectorAll('.ripple').forEach((button) => {
      button.addEventListener('click', (e) => {
        const circle = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;
        circle.classList.add('ripple-wave');
        button.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
      });
    });

    // ---------- Form validation ----------
    const form = document.getElementById('contactForm');
    const formErrors = {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      subject: 'Please enter a subject.',
      message: 'Please enter a message.'
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      let valid = true;
      document.querySelectorAll('.error-text').forEach((el) => el.textContent = '');

      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name) {
        document.querySelector('[data-error="name"]').textContent = formErrors.name;
        valid = false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.querySelector('[data-error="email"]').textContent = formErrors.email;
        valid = false;
      }
      if (!subject) {
        document.querySelector('[data-error="subject"]').textContent = formErrors.subject;
        valid = false;
      }
      if (!message) {
        document.querySelector('[data-error="message"]').textContent = formErrors.message;
        valid = false;
      }

      if (valid) {
        const button = form.querySelector('button');
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent';
        button.disabled = true;
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          button.disabled = false;
          form.reset();
        }, 2000);
      }
    });

    // ---------- Back to top button ----------
    document.getElementById('backToTop').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Dynamic year ----------
    document.getElementById('year').textContent = new Date().getFullYear();

    // ---------- Ripple wave style ----------
    const style = document.createElement('style');
    style.innerHTML = `
      .ripple-wave {
        position: absolute;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        background: rgba(255,255,255,0.28);
        animation: rippleOut 0.6s linear forwards;
        z-index: 0;
      }
      @keyframes rippleOut {
        from { opacity: 0.8; transform: translate(-50%, -50%) scale(0.1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(1.8); }
      }
    `;
    document.head.appendChild(style);
