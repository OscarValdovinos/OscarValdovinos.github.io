// Wait for the button click to start the game
var gamestarted = false;
document.getElementById('startGameButton').addEventListener('click', () => {
    if (gamestarted) {
        return;
    }
    // Show the game container
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'block';

    // Initialize the game
    startGame();
});

function startGame() {
    // Create the game container
    gamestarted = true;
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

    const platform = document.createElement('div');
    gameContainer.appendChild(platform);
    platform.style.position = 'absolute';
    platform.style.width = '150px';
    platform.style.height = '25px';
    platform.style.backgroundColor = 'green';
    platform.style.top = '300px';
    platform.style.left = '0px';


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
    let jumpSpeed = 10;
    var currentVertVelocity = 0;
    var currentHorVelocity = 0;
    var movingLeft = false;
    var movingRight = false;
    var grounded = true;
    const gravity = 1;

    Array.from(document.getElementsByClassName('platform')).forEach((platform) => {
        platform.style.position = 'absolute';
        platform.style.width = '150px';
        platform.style.height = '25px';
        platform.style.backgroundColor = 'green';
        platform.style.top = '300px';
        platform.style.left = '0px';
    });
    document.addEventListener('keydown', (event) => {
        handleKeyDown(event);
        });
        document.addEventListener('keyup', (event) => {
         handleKeyUp(event);
        });
        setInterval(() => {
            movePlayer();
            handlePlatforms();
            stayInBounds();
            
        }, 50);

    // Move the target to a random position
    function moveTarget() {
        const x = Math.random() * (gameContainer.style.width- target.offsetWidth);
        const y = Math.random() * (gameContainer.style.height - target.offsetHeight);
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
function getPosition() {
    return {
        top: player.offsetTop,
        left: player.offsetLeft,
        right: player.offsetLeft + player.offsetWidth,
        bottom: player.offsetTop + player.offsetHeight
    };
}

function isCollidingWithPlatform() {
    const playerPos = getPosition();
    const platformRect = platform.getBoundingClientRect();
    return !(
        playerPos.right < platformRect.left || playerPos.left > platformRect.right || playerPos.bottom < platformRect.top || playerPos.top > platformRect.bottom);

    }
    function handlePlatforms() {
        if (isCollidingWithPlatform()) {    
            currentVertVelocity = 0;
            player.style.top = `${platform.offsetTop - player.offsetHeight}px`; 
            grounded = true;
        }
    }
    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            movingLeft = true;
        }
        if (event.key === 'ArrowRight') {
            movingRight = true;
        }
        if (event.key === 'ArrowUp' && grounded) {
            currentVertVelocity -= jumpSpeed;
            grounded = false;
        }
    }
    function handleKeyUp(event) {
        if (event.key === 'ArrowLeft') {    
            movingLeft = false;
        }
        if (event.key === 'ArrowRight') {
            movingRight = false;
        }
    }
function movePlayer(){
    if (movingLeft) {
        player.style.left = `${player.offsetLeft - playerSpeed}px`;
    }  
    if (movingRight) {

        player.style.left = `${player.offsetLeft + playerSpeed}px`;
    }
    if (currentVertVelocity != 0) {
        player.style.top = `${player.offsetTop + currentVertVelocity}px`;
    }
    if (!grounded) currentVertVelocity += gravity; 
}

function stayInBounds() {
    const playerPos = getPosition(); // Get the player's position as an object
    const containerRect = gameContainer.getBoundingClientRect(); // Get the container's position as an object

    // Prevent the player from moving out of the left boundary
    if (playerPos.left < 0) {
        player.style.left = `0px`;
        if (currentHorVelocity < 0) currentHorVelocity = 0; // Stop leftward movement
    }

    // Prevent the player from moving out of the right boundary
    if (playerPos.right > containerRect.width) {
        player.style.left = `${containerRect.width - player.offsetWidth}px`;
        if (currentHorVelocity > 0) currentHorVelocity = 0; // Stop rightward movement
    }

    // Prevent the player from moving above the top boundary
    if (playerPos.top < 0) {
        player.style.top = `0px`;
        if (currentVertVelocity < 0) currentVertVelocity = 0; // Stop upward movement
    }

    // Prevent the player from falling below the bottom boundary
    if (playerPos.bottom > containerRect.height) {
        player.style.top = `${containerRect.height - playerPos.bottom + playerPos.top}px`;
        if (currentVertVelocity > 0) currentVertVelocity = 0; // Stop downward movement
        grounded = true; // Player is on the ground
        jump = false; // Reset jump
    }
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
        movePlatforms();
    }
