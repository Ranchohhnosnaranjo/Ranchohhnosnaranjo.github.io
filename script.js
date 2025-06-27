document.addEventListener('DOMContentLoaded', () => {
    // Elementos principales
    const lightbox = document.getElementById('lightbox');
    const imgLightbox = document.getElementById('imagen-lightbox');
    const prevBtn = document.getElementById('prev-lightbox');
    const nextBtn = document.getElementById('next-lightbox');
    const cerrarLightbox = document.getElementById('cerrar-lightbox');
    const galleryImgs = document.querySelectorAll('.imagen-galeria');
    const secciones = document.querySelectorAll('.seccion');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbarMobile = document.getElementById('navbar-mobile');
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('menu-overlay');
    
    // Variables para funcionalidades
    let currentIndex = 0;
    let lastScrollTop = 0;
    let startX = 0, currentX = 0;

    // Botón Descubrir más
    const btnDescubrir = document.querySelector('.btn-descubrir');
    if (btnDescubrir) {
        btnDescubrir.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarSeccion('acerca');
        });
    }
    
    // Menú móvil - Funciones de apertura/cierre
    function openMenu() {
        nav.classList.add('active');
        if (overlay) overlay.classList.add('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.replace('fa-bars', 'fa-times');
    }
    
    function closeMenu() {
        nav.classList.remove('active', 'dragging');
        nav.style.transform = '';
        if (overlay) overlay.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    }
    
    // Toggle menú móvil
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.contains('active') ? closeMenu() : openMenu();
        });
    }
    
    // Cerrar menú al hacer clic fuera
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Deslizar para cerrar menú (touch)
    if (nav) {
        nav.addEventListener('touchstart', e => {
            if (!nav.classList.contains('active')) return;
            nav.classList.add('dragging');
            startX = e.touches[0].clientX;
        });
        
        nav.addEventListener('touchmove', e => {
            if (!nav.classList.contains('active')) return;
            currentX = e.touches[0].clientX;
            const delta = Math.max(0, currentX - startX);
            nav.style.transform = `translateX(${delta}px)`;
        });
        
        nav.addEventListener('touchend', () => {
            if (!nav.classList.contains('active')) return;
            const delta = currentX - startX;
            (delta > 70) ? closeMenu() : nav.style.transform = '';
            nav.classList.remove('dragging');
        });
    }
    
    // Navegación entre secciones
    document.querySelectorAll('nav a, .navbar-mobile a').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionId = this.getAttribute('data-seccion') || this.getAttribute('href').substring(1);
            mostrarSeccion(seccionId);
        });
    });
    
    // Lightbox - Mostrar imagen y guardar índice
    galleryImgs.forEach((img, idx) => {
        img.addEventListener('click', () => {
            currentIndex = idx;
            imgLightbox.src = img.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Lightbox - Navegación con flechas
    function showImage(i) {
        currentIndex = (i + galleryImgs.length) % galleryImgs.length;
        imgLightbox.src = galleryImgs[currentIndex].src;
    }
    
    if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    
    // Cerrar Lightbox
    function cerrarLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (cerrarLightbox) cerrarLightbox.addEventListener('click', cerrarLightboxFunc);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightboxFunc();
    });
    
    // Funciones auxiliares
    function mostrarSeccion(id) {
        // Ocultar todas las secciones
        secciones.forEach(seccion => {
            seccion.classList.add('oculto');
        });
        
        // Mostrar la sección solicitada
        const seccionObjetivo = document.getElementById(id);
        if (seccionObjetivo) {
            seccionObjetivo.classList.remove('oculto');
            seccionObjetivo.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Cerrar menú móvil si está abierto
        if (nav.classList.contains('active')) {
            closeMenu();
        }
    }
    
    // Barra de navegación móvil al hacer scroll
    window.addEventListener('scroll', () => {
        // Solo para dispositivos móviles
        if (window.innerWidth > 768) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mostrar barra al bajar más de 100px y ocultar al subir
        if (scrollTop > 100 && scrollTop > lastScrollTop) {
            navbarMobile.classList.add('visible');
        } else {
            navbarMobile.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    });
});