const man = document.getElementById('man')

const jumpFunction = (e) => {
    const charCode = e.code

    if (charCode === 'ArrowUp' || charCode === 'Space') {
        if (!man.classList.value.includes('animate-man')) {
            man.classList.add('animate-man')
        }
        setTimeout(() => {
            man.classList.remove('animate-man')
        }, 500);
    }
}

document.addEventListener('keydown', e => {
    jumpFunction(e)  
})