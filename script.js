document.addEventListener('DOMContentLoaded', () => {
    const imagenes = document.querySelectorAll('.imagen-galeria');
    const lightbox = document.getElementById('lightbox');
    const imagenLightbox = document.getElementById('imagen-lightbox');
    const cerrarLightbox = document.getElementById('cerrar-lightbox');
    const enlaces = document.querySelectorAll('nav ul li a');
    const secciones = document.querySelectorAll('.seccion');

    // Abre el lightbox al hacer clic en una imagen
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', () => {
            imagenLightbox.src = imagen.src; // Asigna la imagen al lightbox
            lightbox.style.display = 'flex'; // Muestra el lightbox
        });
    });

    // Cierra el lightbox al hacer clic en el botón de cierre
    cerrarLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Cierra el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target !== imagenLightbox) {
            lightbox.style.display = 'none';
        }
    });

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault(); // Evita el comportamiento predeterminado
            const seccionId = e.target.getAttribute("data-seccion"); // Obtiene el valor de data-seccion
            const seccion = document.getElementById(seccionId); // Busca la sección con el ID

            if (seccion) {
                seccion.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave
            }
        });
    });

    // Cambiar entre secciones dinámicamente
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto
            const seccionId = enlace.getAttribute('data-seccion');

            // Ocultar todas las secciones
            secciones.forEach(seccion => seccion.classList.add('oculto'));

            // Mostrar la sección seleccionada
            const seccionMostrar = document.getElementById(seccionId);
            if (seccionMostrar) {
                seccionMostrar.classList.remove('oculto');
            }
        });
    }); 
});
