   document.addEventListener('DOMContentLoaded', () => {
            const imagenes = document.querySelectorAll('.imagen-galeria');
            const lightbox = document.getElementById('lightbox');
            const imagenLightbox = document.getElementById('imagen-lightbox');
            const cerrarLightbox = document.getElementById('cerrar-lightbox');
            const enlaces = document.querySelectorAll('nav ul li a');
            const secciones = document.querySelectorAll('.seccion');
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            
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
            
            // Menú móvil
            if (menuToggle && nav) {
                menuToggle.addEventListener('click', () => {
                    nav.classList.toggle('active');
                });
            }
            
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
                    }
                });
            });
        });