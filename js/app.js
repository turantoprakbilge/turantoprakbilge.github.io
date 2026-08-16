/**
 * TOPRAK BILGE - PORTFOLIO & CV INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Theme Toggle (Dark / Light) with Local Storage
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
  }

  // 4. Skills Matrix Category Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Add subtle reveal animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Metric Number Counter Animation with IntersectionObserver
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.ceil(current);
      }
    }, stepTime);
  };

  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        counters.forEach(counter => countUp(counter));
        animated = true;
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-ribbon');
  if (metricsSection) {
    metricsObserver.observe(metricsSection);
  }

  // 6. Toast Notification Helper
  const toast = document.getElementById('toast');
  const showToast = (message = 'Copied to clipboard!') => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // 7. Copy Email Quick Action
  const copyBtn = document.getElementById('quickCopyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'turantoprakbilge@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('✓ Email address copied: ' + email);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ Email copied!');
      }
    });
  }

  // 8. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*='${sectionId}']`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
});
