class GameList {
    constructor() {
        this.games = JSON.parse(localStorage.getItem("finishedGames")) || [];
    }

    addGame(gameName) {
        if (gameName.trim() === "") {
            alert("Digite um nome de jogo válido!");
            return;
        }
        
        // Verificar se o jogo já existe
        if (this.games.some(game => game.name.toLowerCase() === gameName.toLowerCase())) {
            alert("Este jogo já está na lista!");
            return;
        }
        
        this.games.push({ 
            name: gameName, 
            completed: false 
        });
        this.saveGames();
        this.render();
        this.updateStats(); // Atualizar estatísticas
    }

    toggleGameCompletion(index) {
        this.games[index].completed = !this.games[index].completed;
        this.saveGames();
        this.render();
        this.updateStats(); // Atualizar estatísticas
    }

    deleteGame(index) {
        if (confirm("Tem certeza que deseja remover este jogo?")) {
            this.games.splice(index, 1);
            this.saveGames();
            this.render();
            this.updateStats(); // Atualizar estatísticas
        }
    }

    saveGames() {
        localStorage.setItem("finishedGames", JSON.stringify(this.games));
    }

    // NOVO MÉTODO: Calcular e exibir estatísticas
    updateStats() {
        const totalGames = this.games.length;
        const completedGames = this.games.filter(game => game.completed).length;
        const pendingGames = totalGames - completedGames;
        const completionRate = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;

        // Atualizar a interface
        document.getElementById('totalGames').textContent = totalGames;
        document.getElementById('completedGames').textContent = completedGames;
        document.getElementById('pendingGames').textContent = pendingGames;
        document.getElementById('completionRate').textContent = completionRate + '%';
        
        // Cor do progresso baseado na porcentagem
        const progressElement = document.getElementById('completionRate');
        if (completionRate === 0) {
            progressElement.style.color = '#dc3545';
        } else if (completionRate < 50) {
            progressElement.style.color = '#ffc107';
        } else if (completionRate < 100) {
            progressElement.style.color = '#17a2b8';
        } else {
            progressElement.style.color = '#28a745';
        }
    }

    render() {
        const gameListElement = document.getElementById("gameList");
        if (!gameListElement) return;

        gameListElement.innerHTML = "";

        if (this.games.length === 0) {
            gameListElement.innerHTML = '<li style="text-align: center; color: #666;">Nenhum jogo adicionado ainda</li>';
            this.updateStats(); // Atualizar estatísticas mesmo quando vazio
            return;
        }

        this.games.forEach((game, index) => {
            const li = document.createElement("li");
            li.className = game.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${game.name}</span>
                <button class="delete-btn">X</button>
            `;
            
            // Adicionar eventos diretamente aos elementos
            const span = li.querySelector('span');
            const deleteBtn = li.querySelector('.delete-btn');
            
            span.addEventListener('click', () => {
                this.toggleGameCompletion(index);
            });
            
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteGame(index);
            });
            
            gameListElement.appendChild(li);
        });

        this.updateStats(); // Atualizar estatísticas após renderizar
    }
}