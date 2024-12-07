// Seleciona o body e adiciona uma classe "dark-mode" quando clicado no botão
document.addEventListener("DOMContentLoaded", function () {
    const darkButton = document.getElementById("dark-mode-toggle");

    darkButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
});
