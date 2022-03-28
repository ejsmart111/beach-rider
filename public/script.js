const man = document.getElementById('man')
const obstacles = document.getElementById('obstacles')
const rightWheel = document.getElementById('right-wheel')
const leftWheel = document.getElementById('left-wheel')
const gameOver = document.getElementById('game-over')
const score = document.getElementById('score')
const highScore = document.getElementById('hiscore')
const instruction = document.getElementById('instruction')

const hiScore = window.localStorage.getItem('hiScore')?window.localStorage.getItem('hiScore'):0
let isDead = false
let scoreVal = 0

const jumpPlayAudio = new Audio('./assets/jump.wav');
const levelUpAudio = new Audio('./assets/next-level.wav');
const endAudio = new Audio('./assets/game-over.wav');

highScore.innerHTML = '<h3>'+ hiScore +'</h3>'

function start() {
    rightWheel.classList.add('wheel-animation')
    leftWheel.classList.add('wheel-animation')
    scoreVal = 0

    const jumpFunction = (e) => {
        const charCode = e.code

        if (charCode === 'ArrowUp' || charCode === 'Space') {
            if (!man.classList.value.includes('animate-man')) {
                man.classList.add('animate-man')
            }
            setTimeout(() => {
                man.classList.remove('animate-man')
            }, 400);
        }
    }

    document.addEventListener('keydown', e => {
        if (!isDead) {
            jumpPlayAudio.play()
            jumpFunction(e) 
        }
    })

    const dead = setInterval(() => {
        if ( scoreVal <= 1000 && scoreVal >= 0) {
            obstacles.style.animation = 'block-animation 2s infinite linear'
        } else if (scoreVal <= 2000 && scoreVal > 1000) {
            obstacles.style.animation = 'block-animation 1.7s infinite linear'
        } else if (scoreVal <= 3500 && scoreVal > 2000) {
            obstacles.style.animation = 'block-animation 1.4s infinite linear'
        } else if (scoreVal <= 4500 && scoreVal > 3500)  {
            obstacles.style.animation = 'block-animation 1.0s infinite linear'
        } else if(scoreVal <= 7000 && scoreVal > 4500) {
            obstacles.style.animation = 'block-animation 0.9s infinite linear'
        } else if(scoreVal <= 13500 && scoreVal > 7000) {
            obstacles.style.animation = 'block-animation 0.8s infinite linear'
        } else {
            obstacles.style.animation = 'block-animation 0.7s infinite linear'
        }
        const manTop = parseInt(window.getComputedStyle(man).getPropertyValue('bottom'))
        const obsLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue('left'))
        score.innerHTML = '<h3>'+ scoreVal++ +'</h3>'
        if (obsLeft < 330 && obsLeft > 0 && manTop <= 40) {
            gameOver.style.display = 'block'
            endAudio.play()
            isDead = true
            instruction.style.display = 'block'
            obstacles.style.animation = 'none'
            obstacles.style.left = 300 + 'px'
            rightWheel.classList.remove('wheel-animation')
            leftWheel.classList.remove('wheel-animation')
            if (scoreVal > parseInt(hiScore)) {
                highScore.innerHTML = '<h3>'+ scoreVal +'</h3>'
                window.localStorage.setItem('hiScore', scoreVal)
            }
            clearInterval(dead)
        }
    }, 1);
}

document.addEventListener('keydown', e => {
    if ((e.code === 'Enter' && scoreVal == 0) ||
        (e.code === 'Enter' && isDead)) {
        obstacles.style.left =  68 + 'em'
        gameOver.style.display = 'none'
        instruction.style.display = 'none'
        isDead = false
        const st = setInterval(() => {
            levelUpAudio.play()
        }, 100)
        setTimeout(() => {
            start()
            clearInterval(st)
        }, 6000);
    }


})