const wordText = document.querySelector(".word");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const checkBtn = document.querySelector(".check-word");
const shuffleBtn = document.querySelector(".shuffle-word");

const message = document.getElementById("message");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      timeText.innerText = maxTime;
    } else {
      message.innerHTML = `Time Up! ${correctWord.toUpperCase()} was the correct word`;
      setTimeout(() => {
        initGame();
        message.innerHTML = "";
      }, 5000);
      clearInterval(timer);
    }
  }, 1000);
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) {
    message.innerHTML = "Please enter the word to check!";
    return;
  }
  if (userWord !== correctWord) {
    message.innerHTML = `Oops! ${userWord} is not the correct word`;
  } else {
    message.innerHTML = `Congrats! ${correctWord.toUpperCase()} is the correct word`;
    clearInterval(timer); // Parar o timer
    setTimeout(() => {
      initGame();
      message.innerHTML = "";
      initTimer(30); // Iniciar o timer novamente
    }, 5000);
  }
};

const shuffleWord = () => {
  let wordArray = wordText.innerText.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
};

shuffleBtn.addEventListener("click", shuffleWord);

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWord();
  }
});

checkBtn.addEventListener("click", checkWord);

initGame();
