// Wait for the button click to start the game
document.getElementById('startGameButton').addEventListener('click', () => {
    // Show the game container
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';

    // Initialize the game
    startGame();
});

function startGame() {
    // Create the game container
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.position = 'relative';
    gameContainer.style.width = '400px';
    gameContainer.style.height = '400px';
    gameContainer.style.border = '2px solid black';
    gameContainer.style.overflow = 'hidden';

    // Create the player
    const player = document.createElement('div');
    gameContainer.appendChild(player);
    player.style.position = 'absolute';
    player.style.width = '50px';
    player.style.height = '50px';
    player.style.backgroundColor = 'blue';
    player.style.bottom = '0';
    player.style.left = '175px';

    // Create the target
    const target = document.createElement('div');
    gameContainer.appendChild(target);
    target.style.position = 'absolute';
    target.style.width = '50px';
    target.style.height = '50px';
    target.style.backgroundColor = 'red';
    target.style.top = '0';
    target.style.left = '175px';

    // Score and timer
    let score = 0;
    let timeLeft = 30;

    // Display score and timer
    const scoreDisplay = document.createElement('div');
    const timerDisplay = document.createElement('div');
    document.body.appendChild(scoreDisplay);
    document.body.appendChild(timerDisplay);
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    // Player movement
    let playerSpeed = 10;
    document.addEventListener('keydown', (event) => {
        const playerRect = player.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();

        if (event.key === 'ArrowLeft' && playerRect.left > containerRect.left) {
            player.style.left = `${player.offsetLeft - playerSpeed}px`;
        } else if (event.key === 'ArrowRight' && playerRect.right < containerRect.right) {
            player.style.left = `${player.offsetLeft + playerSpeed}px`;
        }

        // Check for collision with the target
        if (isColliding(player, target)) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            moveTarget();
        }
    });

    // Move the target to a random position
    function moveTarget() {
        const x = Math.random() * (gameContainer.clientWidth - target.offsetWidth);
        const y = Math.random() * (gameContainer.clientHeight - target.offsetHeight);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    // Check for collision
    function isColliding(rect1, rect2) {
        const r1 = rect1.getBoundingClientRect();
        const r2 = rect2.getBoundingClientRect();
        return !(
            r1.right < r2.left ||
            r1.left > r2.right ||
            r1.bottom < r2.top ||
            r1.top > r2.bottom
        );
    }

    // Countdown timer
    const timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Game over! Your score is ${score}`);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, 1000);

    // Start the game
    moveTarget();
}