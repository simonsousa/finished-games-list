document.addEventListener("DOMContentLoaded", function () {
    // Inicializar a lista de jogos
    window.gameList = new GameList();
    gameList.render();
    gameList.updateStats(); // Garantir que as estatísticas são atualizadas
    
    const gameInput = document.getElementById("gameInput");
    const addButton = document.getElementById("addGameButton");

    // Função para adicionar jogo
    function addGame() {
        const gameText = gameInput.value.trim();
        if (gameText) {
            gameList.addGame(gameText);
            gameInput.value = "";
            gameInput.focus();
        } else {
            alert("Digite um nome de jogo válido!");
        }
    }

    // Evento do botão
    addButton.addEventListener("click", addGame);

    // Evento do Enter
    gameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addGame();
        }
    });
});