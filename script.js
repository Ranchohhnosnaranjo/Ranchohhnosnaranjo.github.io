 document.addEventListener('DOMContentLoaded', () => {
            const imagenes = document.querySelectorAll('.imagen-galeria');
            const lightbox = document.getElementById('lightbox');
            const imagenLightbox = document.getElementById('imagen-lightbox');
            const cerrarLightbox = document.getElementById('cerrar-lightbox');
            const enlaces = document.querySelectorAll('nav ul li a');
            const secciones = document.querySelectorAll('.seccion');
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const navbar = document.getElementById('navbar');
            
            // Barra de navegación móvil
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Mostrar barra de navegación al hacer scroll hacia abajo
                if (scrollTop > 200) {
                    navbar.classList.add('visible');
                    
                    // Ocultar al hacer scroll hacia arriba
                    if (scrollTop > lastScrollTop) {
                        navbar.style.top = '0';
                    } else {
                        navbar.style.top = '0';
                    }
                } else {
                    navbar.classList.remove('visible');
                }
                
                lastScrollTop = scrollTop;
            });
            
            // Menú móvil
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', () => {
                    nav.classList.toggle('active');
                    
                    // Cambiar el ícono
                    const icon = mobileMenuToggle.querySelector('i');
                    if (nav.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }
            
            // Abre el lightbox al hacer clic en una imagen
            imagenes.forEach(imagen => {
                imagen.addEventListener('click', () => {
                    imagenLightbox.src = imagen.src;
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Cierra el lightbox
            cerrarLightbox.addEventListener('click', () => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Cierra el lightbox al hacer clic fuera de la imagen
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Cambiar entre secciones
            enlaces.forEach(enlace => {
                enlace.addEventListener('click', (e) => {
                    e.preventDefault();
                    const seccionId = enlace.getAttribute('data-seccion');
                    
                    // Ocultar todas las secciones
                    secciones.forEach(seccion => seccion.classList.add('oculto'));
                    
                    // Mostrar la sección seleccionada
                    const seccionMostrar = document.getElementById(seccionId);
                    if (seccionMostrar) {
                        seccionMostrar.classList.remove('oculto');
                    }
                    
                    // Cerrar menú en móvil
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        const icon = mobileMenuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Scroll suave al inicio de la sección
                    seccionMostrar.scrollIntoView({ behavior: 'smooth' });
                });
            });
            
            // Scroll suave para enlaces internos
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        
                        // Cerrar menú móvil si está abierto
                        if (nav.classList.contains('active')) {
                            nav.classList.remove('active');
                            const icon = mobileMenuToggle.querySelector('i');
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                });
            });
        });