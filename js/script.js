let marioX = 50; 
let marioY = 150;
let gravity = 0.5; 
let vitesseY = 0; 

function gameLoop() {
    updateMarioPosition();
    drawGameElements();

    window.requestAnimationFrame(gameLoop);
}

gameLoop(); 

function updateMarioPosition() {
    vitesseY += gravity; // Appliquer la gravité
    marioY += vitesseY; // Mettre à jour la position verticale

    // Empêcher Mario de tomber de l'écran
    if (marioY > window.innerHeight - marioHeight) {
        marioY = window.innerHeight - marioHeight;
        vitesseY = 0; // Réinitialiser la vitesse au sol
    }
    let horizontalSpeed = 0; // Initialize horizontal speed

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            horizontalSpeed = 5; // Move Mario right
        } else if (event.key === 'ArrowLeft') {
            horizontalSpeed = -5; // Move Mario left
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            horizontalSpeed = 0; // Stop horizontal movement on keyup
        }
    });

    marioX += horizontalSpeed; // Apply horizontal speed

    // Prevent Mario from going off-screen horizontally
    if (marioX < 0) {
        marioX = 0;
    } else if (marioX + marioWidth > window.innerWidth) {
        marioX = window.innerWidth - marioWidth;
    }

    // Check for collision with walls
    const gameElements = document.querySelectorAll('.wall');
    gameElements.forEach(wall => {
        if (isColliding(marioX, marioY, marioWidth, marioHeight, wall.offsetLeft, wall.offsetTop, wall.offsetWidth, wall.offsetHeight)) {
            // Handle collision with wall (e.g., stop movement)
            if (marioX + marioWidth > wall.offsetLeft) {
                marioX = wall.offsetLeft - marioWidth;
            } else if (marioX < wall.offsetLeft + wall.offsetWidth) {
                marioX = wall.offsetLeft + wall.offsetWidth;
            }
        }
    });

}

function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (
        x1 < x2 + w2 &&
        x2 < x1 + w1 &&
        y1 < y2 + h2 &&
        y2 < y1 + h1
    );
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        // Déplacer Mario vers la droite (pas encore implémenté)
    } else if (event.key === 'ArrowLeft') {
        // Déplacer Mario vers la gauche (pas encore implémenté)
    } else if (event.key === 'ArrowUp') {
        // Faire sauter Mario (pas encore implémenté)
    }
});

const gameContainer = document.getElementById('game-container');

function drawMario() {
    const marioElement = document.createElement('div');
    marioElement.id = 'mario';
    marioElement.style.cssText = `
        position: absolute;
        left: ${marioX}px;
        top: ${marioY}px;
        width: 50px;
        height: 50px;
        background-color: blue;
    `;
    gameContainer.appendChild(marioElement);
}