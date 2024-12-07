// Codul pentru a detecta combinația Ctrl + D
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "d") {
        loadQuestion();  // Apel la funcția loadQuestion
        generate();      // Apel la funcția generate
    }
});

// Funcțiile loadQuestion și generate
function loadQuestion() {
    console.log("Load Question triggered");
    // Adaugă logica specifică pentru Load Question
}

function generate() {
    console.log("Generate triggered");
    // Adaugă logica specifică pentru Generate
}
