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

  // 9. Dynamic Ambient Background Logo Cross-Fade & Location Cycler
  const brandLogos = [
    // Top Enterprise Brands & Universities
    'assets/logos/allianz.svg?v=6',
    'assets/logos/amazon.svg?v=6',
    'assets/logos/tum.svg?v=6',
    'assets/logos/siemens.svg?v=6',
    'assets/logos/bayer.svg?v=6',
    'assets/logos/sabancidx.svg?v=6',
    'assets/logos/bilkent.svg?v=6',
    
    // Core Engineering & Applied AI Stack
    'assets/logos/python.svg',
    'assets/logos/spark.svg',
    'assets/logos/databricks.svg',
    'assets/logos/azure.svg',
    'assets/logos/powerbi.svg',
    'assets/logos/docker.svg',
    'assets/logos/pytorch.svg',
    'assets/logos/deltalake.svg',
    'assets/logos/git.svg',
    'assets/logos/openai.svg',
    'assets/logos/postgresql.svg',
    'assets/logos/fastapi.svg',
    'assets/logos/aws.svg'
  ];

  // Dynamic screen coordinates where logos spawn and drift
  const screenPositions = [
    { top: '12%', left: '3%', right: 'auto' },
    { top: '22%', right: '4%', left: 'auto' },
    { top: '35%', left: '4%', right: 'auto' },
    { top: '48%', right: '12%', left: 'auto' },
    { top: '60%', left: '3%', right: 'auto' },
    { top: '72%', right: '4%', left: 'auto' },
    { top: '85%', left: '4.5%', right: 'auto' },
    { top: '16%', right: '14%', left: 'auto' },
    { top: '52%', left: '10%', right: 'auto' },
    { top: '88%', right: '5%', left: 'auto' }
  ];

  const ambientPods = document.querySelectorAll('.ambient-badge');
  if (ambientPods.length > 0) {
    ambientPods.forEach((pod, podIndex) => {
      let currentLogoIdx = (podIndex * 3) % brandLogos.length;
      let currentPosIdx = (podIndex * 2) % screenPositions.length;
      const img = pod.querySelector('img');

      // Set initial logo & position
      if (img) img.src = brandLogos[currentLogoIdx];
      const initialPos = screenPositions[currentPosIdx];
      pod.style.top = initialPos.top;
      pod.style.left = initialPos.left;
      pod.style.right = initialPos.right;

      // Cycle position & logo with staggered delays
      const cycleInterval = 4600;
      const initialDelay = 800 + (podIndex * 850);

      setTimeout(() => {
        setInterval(() => {
          // 1. Smooth Fade-Out
          pod.classList.add('badge-fading');

          // 2. While completely hidden, change location & swap logo
          setTimeout(() => {
            currentLogoIdx = (currentLogoIdx + 1) % brandLogos.length;
            currentPosIdx = (currentPosIdx + 3) % screenPositions.length;
            
            const nextPos = screenPositions[currentPosIdx];
            pod.style.top = nextPos.top;
            pod.style.left = nextPos.left;
            pod.style.right = nextPos.right;

            if (img) img.src = brandLogos[currentLogoIdx];

            // 3. Smooth Fade-In at the new location
            setTimeout(() => {
              pod.classList.remove('badge-fading');
            }, 80);
          }, 600);
        }, cycleInterval);
      }, initialDelay);
    });
  }
});
