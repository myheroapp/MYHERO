document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Sidebar Toggle
    const mobileBtn = document.getElementById('mobile-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function toggleSidebar() {
        if(sidebar) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    }

    if(mobileBtn) mobileBtn.addEventListener('click', toggleSidebar);
    if(closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 2. Tab Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.getAttribute('data-tab');

            // Remove active classes
            navLinks.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active classes to clicked
            link.classList.add('active');
            const content = document.getElementById(targetTab);
            if(content) content.classList.add('active');

            // Close sidebar on mobile after clicking a link
            if(window.innerWidth <= 1024) {
                toggleSidebar();
            }
        });
    });
});
