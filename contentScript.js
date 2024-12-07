document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll('.question');  // Presupunem că întrebările sunt în elemente cu clasa `.question`

    questions.forEach((question) => {
        const answerBox = document.createElement('div');
        answerBox.style.position = 'absolute';
        answerBox.style.width = '3px';
        answerBox.style.height = '3px';
        answerBox.style.backgroundColor = 'transparent';  // Îl facem invizibil inițial
        answerBox.style.top = '10px';  // Ajustează pentru a plasa răspunsul lângă întrebare
        answerBox.style.left = '10px';

        question.appendChild(answerBox);

        // Simulăm un răspuns de AI (poți înlocui asta cu un răspuns real)
        answerBox.textContent = "Răspuns AI";  // Aici trebuie să fie răspunsul AI, lăsat ca exemplu
    });

    // Ascultă pentru evenimente de click pentru a dezvălui răspunsul
    document.body.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains('question')) {
            const answerBox = event.target.querySelector('div');
            if (answerBox) {
                answerBox.style.fontSize = '14px';  // Afișează răspunsul atunci când se dă click
                answerBox.style.backgroundColor = 'white';
            }
        }
    });
});
