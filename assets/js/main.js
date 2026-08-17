/**
 * VitaCore Diagnostics - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Theme Management
  const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile, .theme-toggle-btn');
  const themeIcons = document.querySelectorAll('#theme-icon, #theme-icon-mobile, .theme-icon-el');
  
  const getPreferredTheme = () => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcons.forEach(icon => {
      if (theme === 'dark') {
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-sun');
      } else {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon-stars');
      }
    });
  };

  setTheme(getPreferredTheme());

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme');
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // 2. RTL Management
  const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile, .rtl-toggle-btn');
  
  const getPreferredDir = () => {
    return localStorage.getItem('dir') || 'ltr';
  };

  const setDir = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('dir', dir);

    
    // update bootstrap rtl CSS logic if needed (Bootstrap handles this via dir="rtl")
  };

  setDir(getPreferredDir());

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      setDir(currentDir === 'ltr' ? 'rtl' : 'ltr');
    });
  });

  // 3. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 4. Mobile Menu Drawer
  const hamburger = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  const openDrawer = () => {
    mobileDrawer?.classList.add('active');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scroll
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('active');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  };

  if(hamburger) hamburger.addEventListener('click', openDrawer);
  if(drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if(drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // Close drawer on link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Dynamic Active State for Navigation
  const setActiveLink = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.desktop-nav .nav-link-custom, .mobile-nav-links a:not(.text-primary)');
    
    allLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && currentPath === href) {
        link.classList.add('active');
      }
    });
  };
  setActiveLink();

  // 5. Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  });

  if(backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal-fade');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('visible');
      }
    });
  };

  // Check prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery || !mediaQuery.matches) {
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
  } else {
    // If reduced motion, just make them visible immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Mobile Dropdown Toggle
  const collapseToggles = document.querySelectorAll('[data-bs-toggle="collapse"]');
  collapseToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.toggle('show');
        const icon = toggle.querySelector('.bi-chevron-down');
        if (icon) {
          icon.style.transition = 'transform 0.3s ease';
          if (targetElement.classList.contains('show')) {
            icon.style.transform = 'rotate(180deg)';
          } else {
            icon.style.transform = 'rotate(0deg)';
          }
        }
      }
    });
  });
});
