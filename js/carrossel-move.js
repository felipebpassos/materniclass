document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.cards-track');
    const carousel = document.querySelector('.cards-carousel');
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let animationID = 0;
    let velocity = 0.5; // Velocidade inicial (0.5px por frame)
    const minVelocity = 0.3;
    const maxVelocity = 0.8;
    let lastTime = Date.now();
    let lastX = 0;

    // Duplica os cards para criar o efeito de loop
    const originalCards = track.innerHTML;
    track.innerHTML = originalCards + originalCards;

    function animate() {
        const now = Date.now();
        const deltaTime = now - lastTime;
        lastTime = now;

        currentTranslate += velocity * (deltaTime / 16);
        applyTransform();

        animationID = requestAnimationFrame(animate);
    }

    function applyTransform() {
        const trackWidth = track.scrollWidth / 2;
        if (Math.abs(currentTranslate) >= trackWidth) {
            currentTranslate = 0;
        }
        track.style.transform = `translateX(${-currentTranslate}px)`;
    }

    function startDrag(e) {
        isDragging = true;
        startPosition = getClientX(e);
        lastX = startPosition;
        cancelAnimationFrame(animationID);
        track.style.transition = 'none';
    }

    function duringDrag(e) {
        if (!isDragging) return;
        const currentPosition = getClientX(e);
        const delta = currentPosition - lastX;
        lastX = currentPosition;
        currentTranslate -= delta;
        applyTransform();
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        // Calcula velocidade baseada no último movimento
        const deltaX = lastX - startPosition;
        velocity = Math.abs(deltaX / 50); // Ajuste a divisão para controlar sensibilidade
        
        // Limita a velocidade
        velocity = Math.max(minVelocity, Math.min(velocity, maxVelocity));
        
        // Mantém direção do movimento
        velocity *= Math.sign(deltaX) * -1;
        
        track.style.transition = '';
        animate();
    }

    function getClientX(e) {
        return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    }

    // Event Listeners
    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrag(e);
    }, { passive: false });

    window.addEventListener('mousemove', duringDrag);
    window.addEventListener('touchmove', duringDrag, { passive: false });

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    // Inicia animação
    animate();
});