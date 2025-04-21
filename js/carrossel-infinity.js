document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.feedback-carousel');
    let isDragging = false;
    let startX;
    let startScrollLeft;

    // Clonar imagens inicialmente
    const originalItems = Array.from(carousel.children).slice();
    originalItems.forEach(item => {
        const clone1 = item.cloneNode(true);
        const clone2 = item.cloneNode(true);
        carousel.append(clone1, clone2);
    });

    const getItemWidth = () => carousel.querySelector('.feedback').offsetWidth + 15;

    const adjustScroll = () => {
        const scrollLeft = carousel.scrollLeft;
        const itemWidth = getItemWidth();
        const maxScroll = itemWidth * originalItems.length;

        if (scrollLeft < itemWidth) {
            carousel.scrollLeft = scrollLeft + maxScroll;
        } else if (scrollLeft > maxScroll * 2) {
            carousel.scrollLeft = scrollLeft - maxScroll;
        }
    };

    const startDrag = (clientX) => {
        isDragging = true;
        startX = clientX;
        startScrollLeft = carousel.scrollLeft;
        carousel.style.scrollSnapType = 'none';
        carousel.style.cursor = 'grabbing';
        carousel.style.scrollBehavior = 'auto'; // Desativa animações suaves durante o arraste
    };

    const duringDrag = (clientX) => {
        if (!isDragging) return;
        const delta = clientX - startX;
        const newScroll = startScrollLeft - delta;
        
        carousel.scrollLeft = newScroll;
        startX = clientX;
        startScrollLeft = newScroll;
        
        adjustScroll();
    };

    const endDrag = () => {
        isDragging = false;
        carousel.style.scrollSnapType = 'x mandatory';
        carousel.style.cursor = 'grab';
        carousel.style.scrollBehavior = 'smooth'; // Restaura animações suaves
    };

    // Eventos de mouse
    carousel.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDrag(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            duringDrag(e.clientX);
        }
    });

    window.addEventListener('mouseup', endDrag);

    // Eventos de touch
    carousel.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrag(e.touches[0].clientX);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            duringDrag(e.touches[0].clientX);
        }
    }, { passive: false });

    window.addEventListener('touchend', endDrag);

    // Ajuste inicial
    carousel.addEventListener('scroll', adjustScroll);
    setTimeout(() => {
        carousel.scrollLeft = getItemWidth() * originalItems.length;
    }, 100);
});
