window.onload = ()=>{
    const recoverData = ()=>{
        errors = localStorage.getItem('errors')
        finishTime = localStorage.getItem('time')
        if(errors == null && finishTime == null) {
            errors = 0 ;
            finishTime = 0;
        }
        console.log(errors, finishTime)
    }
    const saveData = ()=>{
        localStorage.setItem('errors', errors)
        localStorage.setItem('time', finishTime)
    }

    const handleCovered = (element)=>{
        lastTwoCovered[clicks] = element;
        if(element.parentElement.hasOwnProperty('completed') === false){    
            element.style.backgroundColor = 'transparent'
            lastTwo[clicks] = element.parentElement.children[1].children[0]
            clicks++;
        }
        if(clicks === 2 ) {
            if(lastTwo[0].className === lastTwo[1].className) {
                lastTwo[0].parentElement.parentElement.setAttribute('completed', '')
                lastTwo[1].parentElement.parentElement.setAttribute('completed', '')
                winCondition++;
            }
            else{
                errors++;
                setTimeout(() => {
                    lastTwoCovered[0].style.backgroundColor = '#000'
                    lastTwoCovered[1].style.backgroundColor = '#000'
                    lastTwoCovered = [null,null]
                }, 500)
            }
            clicks = 0
            lastTwo = [null,null]
        }
    }
    const handleWinCondition = ()=>{
        if(winCondition == 8){
            win.style.display = 'flex'
            finishTime = time
            const winErrors = document.querySelector('.win__errors')
            const winTime = document.querySelector('.win__time')
            winErrors.innerText = `Errors: ${errors}`
            winTime.innerText = `Time: ${finishTime}`
            saveData()
        }
    }
    const handleLogoStartPosition = ()=>{
        const LOGO = ['fa-react', 'fa-html5', 'fa-css3-alt','fa-python', 'fa-instagram-square', 'fa-github-square', 'fa-git-alt', 'fa-android'];
        let posiblePositions = [0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7]
        for(let i = 0; i < fab.length; i++){
            let pos = Math.floor(Math.random() * posiblePositions.length)
            let logoPos = posiblePositions[pos]
            posiblePositions.splice(pos,1)
            let logo = LOGO[logoPos]
            fab[i].classList.add(logo)
        }
    }
    let time = 0 
    let finishTime
    let clicks = 0
    let lastTwo = [null,null]
    let lastTwoCovered = [null,null]
    let errors = 0
    let winCondition = 0
    recoverData()

    const fab = document.querySelectorAll('.fab')
    handleLogoStartPosition()
    const covered = document.querySelectorAll('.cards__covered')
    covered.forEach(element => {
        element.addEventListener('click', ()=>{
            handleCovered(element)
            handleWinCondition()
        })
    });

    const win = document.querySelector('.win')
    const lastTime = document.querySelector('.home__last-time')
    const lastErrors = document.querySelector('.home__last-errors')
    lastTime.firstElementChild.innerText = finishTime.toString()
    lastErrors.firstElementChild.innerText = `${errors.toString()}s`
    win.style.display = 'none'

    const play = document.querySelector('.home__button')
    play.addEventListener('click', ()=>{
        const home = document.querySelector('.home')
        home.style.display = 'none'
        time = 0
        errors = 0
    })

    setInterval(() => {
        time++
    }, 1000);

    const again = document.querySelector('.win__button')
    again.addEventListener('click', ()=>{
        covered.forEach(element => {
            element.parentElement.removeAttribute('completed')
            element.style.backgroundColor = '#000'
        });
        fab.forEach(element => {
            element.className = 'fab'
        });
        clicks = 0;
        lastTwo = [null,null]
        lastTwoCovered = [null,null]
        errors = 0
        winCondition = 0
        handleLogoStartPosition()
        setTimeout(() => {
            win.style.display = 'none'
        }, 500);
    })
}