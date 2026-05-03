document.addEventListener("DOMContentLoaded", function() {
    console.log("Site carregado com sucesso 💈");

    const mensagem = document.createElement("p");
    mensagem.textContent = "Bem-vindo à BARBER STRONG!";
    mensagem.style.textAlign = "center";
    mensagem.style.marginTop = "20px";
    mensagem.style.color = "gold";

    document.body.appendChild(mensagem);
});