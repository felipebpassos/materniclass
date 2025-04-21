window.addEventListener('scroll', function() {
    var section = document.querySelector('header');
    var sectionHeight = section.offsetHeight; // Altura da seção
    var scrollPosition = window.scrollY; // Posição atual do scroll

    // Calcula a opacidade com base na posição do scroll
    var opacity = 1 - 1.3*(scrollPosition / sectionHeight);
    
    // Define a opacidade da imagem
    section.style.opacity = opacity;

    // Adiciona a classe para fade-out quando a opacidade é menor que 0
    if (opacity < 0) {
        section.classList.add('fade-out');
    } else {
        section.classList.remove('fade-out');
    }
});
