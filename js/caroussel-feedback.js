let currentIndex = 0;
let autoHighlightInterval;

function moveCarousel(section, direction) {
    const carousel = document.querySelector(`#${section} .carousel`);
    const cards = carousel.querySelectorAll('.card');
    let cardWidth = cards[currentIndex].offsetWidth; // Calcula a largura do card atual
    let cardMarginRight = parseFloat(window.getComputedStyle(cards[currentIndex]).marginRight); // Calcula a margem direita do card atual
    let cardMarginLeft = parseFloat(window.getComputedStyle(cards[currentIndex]).marginLeft);

    // Atualiza o índice atual baseado na direção
    currentIndex = (currentIndex + direction + cards.length) % cards.length;

    // Calcula a nova posição de scroll
    const newPosition = currentIndex * (cardWidth + cardMarginRight + cardMarginLeft);

    // Faz o scroll para a nova posição com comportamento suave
    carousel.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });

    // Reinicia o ciclo de destaque automático
    clearInterval(autoHighlightInterval);
    autoHighlightInterval = setInterval(() => moveCarousel(section, 1), 7000);
}

document.addEventListener('DOMContentLoaded', function () {
    // Inicia o ciclo de destaque automático
    autoHighlightInterval = setInterval(() => moveCarousel('feedbacks', 1), 7000);

    // Inicia o carrossel nas seções de serviços e feedbacks
    const sections = ['servicos', 'feedbacks'];
    sections.forEach(section => {
        const prevButton = document.querySelector(`#${section} .prev`);
        const nextButton = document.querySelector(`#${section} .next`);

        prevButton.addEventListener('click', () => moveCarousel(section, -1));
        nextButton.addEventListener('click', () => moveCarousel(section, 1));
    });
});
