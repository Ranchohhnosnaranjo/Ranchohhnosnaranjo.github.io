document.addEventListener('DOMContentLoaded', () => {
    // Elementos principales
    const lightbox = document.getElementById('lightbox');
    const imgLightbox = document.getElementById('imagen-lightbox');
    const videoLightbox = document.getElementById('video-lightbox');
    const prevBtn = document.getElementById('prev-lightbox');
    const nextBtn = document.getElementById('next-lightbox');
    const cerrarLightbox = document.getElementById('cerrar-lightbox');
    const galleryImgs = document.querySelectorAll('.imagen-galeria');
    const galleryVideos = document.querySelectorAll('.video-galeria');
     const galleryItems = [...galleryImgs, ...galleryVideos];
    const secciones = document.querySelectorAll('.seccion');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbarMobile = document.getElementById('navbar-mobile');
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('menu-overlay');
    
    // Variables para funcionalidades
    let currentIndex = 0;
    let lastScrollTop = 0;
   

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
    
    
    
    // Navegación entre secciones
    document.querySelectorAll('nav a, .navbar-mobile a').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionId = this.getAttribute('data-seccion') || this.getAttribute('href').substring(1);
            mostrarSeccion(seccionId);
        });
    });
    
       // Lightbox - Mostrar elemento y guardar índice
    galleryItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            currentIndex = idx;
            showMedia(currentIndex);
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Función para mostrar el medio actual (imagen o video)
    function showMedia(i) {
        currentIndex = (i + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];
        
        // Ocultar ambos medios primero
        imgLightbox.style.display = 'none';
        videoLightbox.style.display = 'none';
        
        if (item.classList.contains('imagen-galeria')) {
            // Es una imagen
            imgLightbox.src = item.src;
            imgLightbox.style.display = 'block';
        } else if (item.classList.contains('video-galeria')) {
            // Es un video
            const source = item.querySelector('source');
            videoLightbox.src = source.src;
            videoLightbox.load();
            videoLightbox.style.display = 'block';
        }
    }
    
    // Lightbox - Navegación con flechas
    if (prevBtn) prevBtn.addEventListener('click', () => showMedia(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showMedia(currentIndex + 1));
    
    // Cerrar Lightbox
    function cerrarLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Pausar el video si está reproduciéndose
        if (videoLightbox) videoLightbox.pause();
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