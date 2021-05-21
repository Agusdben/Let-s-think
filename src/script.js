let time,
  finishTime,
  clicks,
  lastTwo,
  lastTwoCovered,
  errors,
  winCondition,
  canClick = true;

const LOGO = [
  "fa-react",
  "fa-html5",
  "fa-css3-alt",
  "fa-python",
  "fa-instagram-square",
  "fa-github-square",
  "fa-git-alt",
  "fa-android",
];
const fab = document.querySelectorAll(".fab");
const covered = document.querySelectorAll(".cards__covered");
const winModal = document.querySelector(".win");
const homeModal = document.querySelector(".home");
const lastTime = document.querySelector(".home__last-time");
const lastErrors = document.querySelector(".home__last-errors");
const playButton = document.querySelector(".home__button");
const againButton = document.querySelector(".win__again");
const menuButton = document.querySelector(".win__menu");
const winTime = document.querySelector(".win__time");
const winErrors = document.querySelector(".win__errors");
const landscape = document.querySelector(".landscape")
const recoverData = () => {
  errors = localStorage.getItem("errors");
  finishTime = localStorage.getItem("time");
  if (errors == null && finishTime == null) {
    errors = 0;
    finishTime = 0;
  }
};
const saveData = () => {
  localStorage.setItem("errors", errors);
  localStorage.setItem("time", finishTime);
};
const handleCovered = (element) => {
  if (
    canClick == true &&
    element.parentElement.hasOwnProperty("completed") === false
  ) {
    lastTwoCovered[clicks] = element;
    element.style.backgroundColor = "transparent";
    lastTwo[clicks] = element.parentElement.children[1].children[0];
    clicks++;
  }
  if (clicks === 2) {
    canClick = false;
    if (lastTwo[0].className === lastTwo[1].className) {
      lastTwo[0].parentElement.parentElement.setAttribute("completed", "");
      lastTwo[1].parentElement.parentElement.setAttribute("completed", "");
      winCondition++;
      canClick = true;
    } else {
      errors++;
      setTimeout(() => {
        lastTwoCovered[0].style.backgroundColor = "#000";
        lastTwoCovered[1].style.backgroundColor = "#000";
        lastTwoCovered = [null, null];
        canClick = true;
      }, 500);
    }
    clicks = 0;
    lastTwo = [null, null];
  }
};
const handleWinCondition = () => {
  if (winCondition == 8) {
    winModal.style.display = "flex";
    finishTime = time;
    winErrors.innerText = `Errors: ${errors}`;
    winTime.innerText = `Time: ${finishTime}s`;
    saveData();
  }
};
const handleLogoStartPosition = () => {
  let posiblePositions = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
  for (let i = 0; i < fab.length; i++) {
    let pos = Math.floor(Math.random() * posiblePositions.length);
    let logoPos = posiblePositions[pos];
    posiblePositions.splice(pos, 1);
    let logo = LOGO[logoPos];
    fab[i].classList.add(logo);
  }
};
const newGame = () => {
  covered.forEach((element) => {
    element.parentElement.removeAttribute("completed");
    element.style.backgroundColor = "#000";
  });
  fab.forEach((element) => {
    element.className = "fab";
  });
  clicks = 0;
  lastTwo = [null, null];
  lastTwoCovered = [null, null];
  errors = 0;
  winCondition = 0;
  time = 0;
  errors = 0;
  handleLogoStartPosition();
  setTimeout(() => {
    winModal.style.display = "none";
  }, 500);
};

if(screen.availHeight < screen.availWidth){
  landscape.style.display = 'fixed';
};
window.addEventListener("orientationchange", ()=> {
  if(screen.availHeight < screen.availWidth){
    landscape.style.display = 'fixed';
  }
  else landscape.style.display = 'none';
});
recoverData();
winModal.style.display = "none";
lastTime.firstElementChild.innerText = `${finishTime.toString()}s`;
lastErrors.firstElementChild.innerText = errors.toString();

covered.forEach((element) => {
  element.addEventListener("click", () => {
    handleCovered(element);
    handleWinCondition();
  });
});
playButton.addEventListener("click", () => {
  homeModal.style.display = "none";
  newGame();
});

againButton.addEventListener("click", () => {
  newGame();
});
menuButton.addEventListener("click", () => {
  recoverData();
  lastTime.firstElementChild.innerText = `${finishTime.toString()}s`;
  lastErrors.firstElementChild.innerText = errors.toString();
  winModal.style.display = "none";
  homeModal.style.display = "flex";
});
setInterval(() => {
  time++;
}, 1000);