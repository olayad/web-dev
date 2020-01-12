let squares = document.querySelectorAll(".square");
let headerGuess = document.querySelectorAll(".guess");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let reset = document.querySelector("#reset");
let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");
let difficulty = "hard";
let squareToGuess, chosen;


init();

function init(){
    console.log("##### NEW GAME #####: ", difficulty);
    addEvents();
    if (difficulty === "hard"){
        fillSquares(6);
    }else if(difficulty === "easy"){
        fillSquares(3);
    }else{
        console.log("I don't know how I got here (from init)");
    }
    console.log("squareToGuess: ", squareToGuess);
    fillGuessHeader();
    resetHeader();
}

function resetHeader(){
    reset.textContent = "New Colors";
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
}

function getRandomSquare(){
    let red_num, green_num, blue_num;
    for(let i = 0; i < 3; i++){
        red_num = Math.floor(Math.random() * 256);
        green_num = Math.floor(Math.random() * 256);
        blue_num = Math.floor(Math.random() * 256);
    }
    return [red_num, green_num, blue_num];
}

function hideShowSquares(){
    // console.log("displaySquares", squares.length);
    if (difficulty === "easy"){
        for (let i = 0; i < squares.length; i++){
            if (i >= 3){
                squares[i].style.display = "none";
            }
        }
    }else{
        for (let i =0; i < squares.length; i++){
            if (i >= 3){
                squares[i].style.display = "block";
            }
        }
    }
}

function fillSquares(number){
    squareToGuess = Math.floor(Math.random() * number);
    for (let i = 0; i < number; i++){
        let randomSquare = getRandomSquare();
        if (i === squareToGuess){
            squareToGuess = randomSquare;
        }
        squares[i].style.backgroundColor = 'rgb(' + randomSquare[0] +',' + randomSquare[1] + ',' + randomSquare[2] + ')';
    }
    hideShowSquares();
}

function fillGuessHeader(){
    headerGuess[0].textContent = squareToGuess[0];
    headerGuess[1].textContent = squareToGuess[1];
    headerGuess[2].textContent = squareToGuess[2];
}

function parseColor(input) {
    return input.split("(")[1].split(")")[0].split(",");
}

function addEvents() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", isAnswerCorrect)
    }
    reset.addEventListener("click", init);
    easyBtn.addEventListener("click", changeDifficulty);
    hardBtn.addEventListener("click", changeDifficulty);
}

function isAnswerCorrect(){
    console.log("Clicked on this square: " + this.style.backgroundColor);
    chosen = parseColor(this.style.backgroundColor);
    if ((Number(chosen[0]) === squareToGuess[0]) &&
        (Number(chosen[1]) === squareToGuess[1]) &&
        (Number(chosen[2]) === squareToGuess[2])) {
        answerCorrect(messageDisplay)
    }else{
        messageDisplay.textContent = "Try again!";
        this.style.backgroundColor = "#232323";
    }
}

function answerCorrect(messageDisplay){
    messageDisplay.textContent = "Correct!";
    for (let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = "rgb("+squareToGuess[0]+","+squareToGuess[1]+","+squareToGuess[2]+")"
    }

    h1.style.backgroundColor = "rgb("+squareToGuess[0]+","+squareToGuess[1]+","+squareToGuess[2]+")"
    reset.textContent = "Play Again?"
}

function changeDifficulty(){
    if (this.textContent === "Easy"){
        difficulty = "easy";
        hardBtn.classList.remove("selected");
        easyBtn.classList.add("selected");
    }else{
        difficulty = "hard";
        easyBtn.classList.remove("selected");
        hardBtn.classList.add("selected");
    }
    init();
}
