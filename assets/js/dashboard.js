/**
 * VitaCore Diagnostics - Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle Logic
  const sidebar = document.getElementById('dashboard-sidebar');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle');
  const sidebarCloseBtn = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  const openSidebar = () => {
    sidebar?.classList.add('active');
    sidebarOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebar?.classList.remove('active');
    sidebarOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  if(sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', openSidebar);
  if(sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if(sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar when clicking a link on mobile (width < 992px)
  const sidebarLinks = document.querySelectorAll('.dashboard-nav a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        closeSidebar();
      }
    });
  });

  // Handle window resize for sidebar
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      // Remove mobile classes when switching to desktop
      sidebar?.classList.remove('active');
      sidebarOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
