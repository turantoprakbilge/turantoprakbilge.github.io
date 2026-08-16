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

  // 9. Ultra-Smooth 60FPS Ambient Background Logo Constellation (Canvas Engine)
  const canvas = document.getElementById('ambientLogoCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const logoSources = [
      'assets/logos/allianz.svg?v=7',
      'assets/logos/amazon.svg?v=7',
      'assets/logos/tum.svg?v=7',
      'assets/logos/siemens.svg?v=7',
      'assets/logos/bayer.svg?v=7',
      'assets/logos/sabancidx.svg?v=7',
      'assets/logos/bilkent.svg?v=7',
      'assets/logos/python.svg?v=7',
      'assets/logos/spark.svg?v=7',
      'assets/logos/databricks.svg?v=7',
      'assets/logos/azure.svg?v=7',
      'assets/logos/powerbi.svg?v=7',
      'assets/logos/docker.svg?v=7',
      'assets/logos/pytorch.svg?v=7',
      'assets/logos/deltalake.svg?v=7',
      'assets/logos/git.svg?v=7',
      'assets/logos/openai.svg?v=7',
      'assets/logos/postgresql.svg?v=7',
      'assets/logos/fastapi.svg?v=7',
      'assets/logos/aws.svg?v=7'
    ];

    // Preload SVG Image objects into memory
    const loadedImages = [];
    logoSources.forEach(src => {
      const img = new Image();
      img.src = src;
      loadedImages.push(img);
    });

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 4 : 7;
    const particles = [];

    function spawnParticle(initial = false) {
      const isLeft = Math.random() > 0.5;
      const xMargin = isMobile ? width * 0.02 : width * 0.035;
      const xSpan = isMobile ? width * 0.15 : width * 0.14;
      const x = isLeft
        ? Math.random() * xSpan + xMargin
        : width - Math.random() * xSpan - (isMobile ? 65 : 85);

      const y = Math.random() * (height * 0.82) + height * 0.08;
      const size = isMobile ? 56 : 72;
      const targetAlpha = isMobile ? 0.22 : 0.30;

      return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.15 - Math.random() * 0.2, // gentle natural upward buoyancy
        size: size,
        imgIdx: Math.floor(Math.random() * loadedImages.length),
        alpha: initial ? Math.random() * targetAlpha : 0,
        targetAlpha: targetAlpha,
        state: initial ? 'active' : 'fadeIn',
        life: initial ? Math.floor(Math.random() * 300) + 150 : 0,
        maxLife: Math.floor(Math.random() * 400) + 380,
        rot: (Math.random() - 0.5) * 0.06
      };
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(spawnParticle(true));
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('light-theme');
      const tileBg = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.055)';
      const tileBorder = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)';

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Smooth state machine
        if (p.state === 'fadeIn') {
          p.alpha += 0.006;
          if (p.alpha >= p.targetAlpha) {
            p.alpha = p.targetAlpha;
            p.state = 'active';
          }
        } else if (p.state === 'active') {
          if (p.life >= p.maxLife || p.y < -p.size || p.y > height + p.size) {
            p.state = 'fadeOut';
          }
        } else if (p.state === 'fadeOut') {
          p.alpha -= 0.006;
          if (p.alpha <= 0) {
            p.alpha = 0;
            particles[idx] = spawnParticle(false);
          }
        }

        if (p.alpha > 0.005) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
          ctx.rotate(p.rot);

          const w = p.size;
          const h = p.size;
          const halfW = w / 2;
          const halfH = h / 2;
          const radius = isMobile ? 14 : 18;

          // Draw Frosted Glass Capsule
          ctx.fillStyle = tileBg;
          ctx.strokeStyle = tileBorder;
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-halfW, -halfH, w, h, radius);
          } else {
            ctx.rect(-halfW, -halfH, w, h);
          }
          ctx.fill();
          ctx.stroke();

          // Draw Authentic Vector Logo
          const img = loadedImages[p.imgIdx];
          if (img && img.complete && img.naturalWidth > 0) {
            const pad = isMobile ? 10 : 13;
            ctx.drawImage(img, -halfW + pad, -halfH + pad, w - pad * 2, h - pad * 2);
          }

          ctx.restore();
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }
});
