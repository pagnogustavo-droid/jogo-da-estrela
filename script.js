// Variáveis globais
let score = 0;
let player;
let gameContainer;
let gameInterval;
let stars = [];
const playerSpeed = 20; // pixels por movimento

// Inicializa o jogo
window.onload = function() {
    player = document.getElementById('player');
    gameContainer = document.getElementById('game-container');
    
    // Configura controles
    setupControls();

    // Inicia o loop do jogo
    gameInterval = setInterval(gameLoop, 50); // 20 FPS

    // Cria estrelas a cada 1.5 segundos
    setInterval(createStar, 1500);
};

function setupControls() {
    document.addEventListener('keydown', function(e) {
        const containerWidth = gameContainer.clientWidth;
        let playerLeft = parseInt(player.style.left) || 0; // Posição atual do jogador, 0 se não definida

        switch(e.key) {
            case 'ArrowLeft':
                if (playerLeft > 0) {
                    player.style.left = (playerLeft - playerSpeed) + 'px';
                }
                break;
            case 'ArrowRight':
                if (playerLeft + player.offsetWidth < containerWidth) {
                    player.style.left = (playerLeft + playerSpeed) + 'px';
                }
                break;
        }
    });
}

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Posição horizontal aleatória
    const randomX = Math.random() * (window.innerWidth - 30);
    star.style.left = randomX + 'px';
    star.style.top = '-30px';  // Começa fora da tela, acima

    gameContainer.appendChild(star);
    stars.push(star);
}

function gameLoop() {
    // Verifica colisões
    const playerRect = player.getBoundingClientRect();

    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        const starRect = star.getBoundingClientRect();

        // Movimento das estrelas (caindo para baixo)
        const currentTop = parseFloat(star.style.top);
        star.style.top = (currentTop + 5) + 'px'; // Estrela desce a cada frame

        // Verifica se a estrela saiu da tela (remove)
        if (starRect.top > window.innerHeight) {
            star.remove();
            stars.splice(i, 1);
            continue;
        }

        // Verifica colisão com o jogador
        if (
            playerRect.left < starRect.right &&
            playerRect.right > starRect.left &&
            playerRect.top < starRect.bottom &&
            playerRect.bottom > starRect.top
        ) {
            // Coletou a estrela!
            star.remove();
            stars.splice(i, 1);
            score++;
            document.getElementById('score').innerText = `Pontos: ${score}`;
        }
    }
}