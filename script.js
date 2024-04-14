const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        this.width = 250
        this.height = 50
        this.image = new Image();
        this.image.src = './img/platforme2.png';
    }
    draw() {
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [new Platform({x: -1, y: 500}), new Platform({x: 250, y: 500})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.clearRect(0, 0, canvas.width, canvas.height)
    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }
    // gestion collision avec les plateforms
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })
    
    if (scrollOffset > 2000){
        console.log('YOU WIN');
    }
}
animate()

addEventListener('keydown', (event) => {
    // console.log(event.key);
    switch (event.key) {
        case "ArrowLeft":
            keys.left.pressed = true
            break;
        case "ArrowDown":
            break;
        case "ArrowRight":
            keys.right.pressed = true
            break;
        case "ArrowUp":
            player.velocity.y -= 20
            break;
        case " ":
            player.velocity.y -= 20
            break;
    }
})
addEventListener('keyup', (event) => {
    switch (event.key) {
        case "ArrowLeft":
            keys.left.pressed = false
            break;
        case "ArrowDown":
            break;
        case "ArrowRight":
            keys.right.pressed = false
            break;
        case "ArrowUp":
            player.velocity.y -= 20
            break;
        case " ":
            player.velocity.y -= 20
            break;
    }
})