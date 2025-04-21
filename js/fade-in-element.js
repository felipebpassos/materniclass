// Seleciona todos os elementos com a classe .fade-in-element
const fadeElements = document.querySelectorAll('.fade-in-element');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      // Remove o elemento do observer para evitar re-ativações
      observer.unobserve(entry.target);
    }
  });
});

fadeElements.forEach(el => observer.observe(el));
