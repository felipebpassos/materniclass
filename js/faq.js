document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const isVisible = answer.classList.contains("show");

            // Oculta todas as respostas removendo a classe "show"
            document.querySelectorAll(".faq-answer").forEach((ans) => {
                ans.classList.remove("show");
            });

            // Se a resposta clicada não estiver visível, adiciona a classe para mostrar com efeito
            if (!isVisible) {
                answer.classList.add("show");
            }
        });
    });
});
