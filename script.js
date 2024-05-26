let backGroundMusic = new Audio('backgroundMusic.mp3');
// backGroundMusic.play();
let gameOverSound = new Audio("gameOver.mp3");
let winSound = new Audio("winSound.mp3");
backGroundMusic.addEventListener('ended', () => {
    backGroundMusic.currentTime = 0;
    backGroundMusic.play();
});

let stepCount = 0;
let turnAudio = new Audio("turn.mp3");
let isGameOver = false;

let turn = "X";

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

const WinLogic = () => {
    let boxText = document.getElementsByClassName('boxText');
    let winPos = [
        [0, 1, 2, 3.5, 5, 0, 0,75],
        [3, 4, 5, 3.5, 15, 0, 0,75],
        [6, 7, 8, 3.5, 25, 0, 0,75],
        [0, 3, 6, 5, 3.5, 90, 0,75],
        [1, 4, 7, 3.5, 15, 90, 50,75],
        [2, 5, 8, 13.5, 15, 90, 50,75],
        [0, 4, 8, 3.5, 3.5, 45, 0,100],
        [2, 4, 6, 26.5, 3.5, 135, 0,100],
    ]
    winPos.forEach(e => {

        if (boxText[e[0]].innerText !== "" && (boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText === boxText[e[2]].innerText)) {
            document.querySelector(".WhoseTurn").innerText = boxText[e[0]].innerText + " Won";
            isGameOver = true;
            document.getElementsByTagName('img')[0].style.width = "300px";
            document.querySelector('.line').style.left = `${e[3]}vw`;
            document.querySelector('.line').style.top = `${e[4]}vw`;
            document.querySelector('.line').style.transformOrigin = `${e[6]}%`;
            document.querySelector('.line').style.transform = `rotate(${e[5]}deg)`;
            document.querySelector('.line').style.width = `${e[7]}%`;
            stepCount = 0;
            turn = "X";
            winSound.play();
            winSound.addEventListener('ended', () => {
                winSound.currentTime = 0;
                winSound.play();
            });

        }
    })

}


let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(box => {
    let boxText = box.querySelector('.boxText');
    box.addEventListener('click', () => {
        if (boxText.innerHTML === '') {
            turnAudio.play();
            boxText.innerHTML = turn;
            turn = changeTurn();
            WinLogic();
            if (!isGameOver) document.getElementsByClassName('WhoseTurn')[0].innerHTML = "Turn For " + turn;
            stepCount++;
            if (stepCount === 9) {
                gameOverSound.play();
                setTimeout(() =>{
                    reset.click();
                }, 2000)
            }
        }
        

    })

})


reset.addEventListener('click', () => {
    let boxtesxts = document.querySelectorAll('.boxText');

    Array.from(boxtesxts).forEach(ele => {
        ele.innerText = "";
    })
    document.querySelector('.line').style.width = '0';
    document.getElementsByTagName('img')[0].style.width = "0";
    winSound.pause();
    winSound.currentTime = 0;

    turn = "X";
    stepCount = 0;
    isGameOver = false;

})
