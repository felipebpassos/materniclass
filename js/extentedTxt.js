function toggleFeedback(button) {
    const card = button.closest('.card');
    const feedbackText = card.querySelector('.feedback-text');
    const isExpanded = feedbackText.classList.contains('expanded');

    // Collapse all expanded feedbacks
    document.querySelectorAll('.card').forEach(otherCard => {
        if (otherCard !== card) {
            const otherFeedbackText = otherCard.querySelector('.feedback-text');
            const otherButton = otherCard.querySelector('.toggle-button');
            otherFeedbackText.classList.remove('expanded');
            otherFeedbackText.style.maxHeight = '8em';
            otherButton.textContent = 'Ver mais';
        }
    });

    if (isExpanded) {
        feedbackText.classList.remove('expanded');
        feedbackText.style.maxHeight = '8em';
        button.textContent = 'Ver mais';
    } else {
        feedbackText.classList.add('expanded');
        feedbackText.style.maxHeight = 'none';
        button.textContent = 'Mostrar menos';
    }
}
