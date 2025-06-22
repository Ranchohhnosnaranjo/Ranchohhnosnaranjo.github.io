 document.addEventListener('DOMContentLoaded', () => {
            // Elementos principales
            const lightbox = document.getElementById('lightbox');
            const imagenLightbox = document.getElementById('imagen-lightbox');
            const cerrarLightbox = document.getElementById('cerrar-lightbox');
            const secciones = document.querySelectorAll('.seccion');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const navbarMobile = document.getElementById('navbar-mobile');
            const nav = document.querySelector('nav');
            
            // Botón Descubrir más
            const btnDescubrir = document.querySelector('.btn-descubrir');
            if (btnDescubrir) {
                btnDescubrir.addEventListener('click', function(e) {
                    e.preventDefault();
                    mostrarSeccion('acerca');
                });
            }
            
            // Menú móvil
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', () => {
                    const icon = mobileMenuToggle.querySelector('i');
                    if (nav.classList.contains('active')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        nav.classList.remove('active');
                    } else {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                        nav.classList.add('active');
                    }
                });
            }
            
            // Navegación
            document.querySelectorAll('nav a, .navbar-mobile a').forEach(enlace => {
                enlace.addEventListener('click', function(e) {
                    e.preventDefault();
                    const seccionId = this.getAttribute('data-seccion') || this.getAttribute('href').substring(1);
                    mostrarSeccion(seccionId);
                });
            });
            
            // Lightbox
            document.querySelectorAll('.imagen-galeria').forEach(imagen => {
                imagen.addEventListener('click', () => {
                    imagenLightbox.src = imagen.src;
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            cerrarLightbox.addEventListener('click', cerrarLightboxFunc);
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
                    nav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            function cerrarLightboxFunc() {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Barra de navegación móvil al hacer scroll
            let lastScrollTop = 0;
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