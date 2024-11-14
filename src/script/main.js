const stats = {
    view: {
        square: document.querySelectorAll(".square"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        enemy: document.querySelector(".enemy"),
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        countLive: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000)
    }
};

function countDown(){
    stats.values.currentTime--;
    stats.view.time.textContent = stats.values.currentTime;
    if(stats.values.currentTime <= 0){
        clearInterval(stats.actions.countDownTimeId);
        clearInterval(stats.actions.timerId);
        alert("game over! Seu resultado foi: " + stats.values.result);
    }
}

function playAudio(audioName){
    let audio = new Audio(`../src/audio/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare(){
    stats.view.square.forEach((square =>{
        square.classList.remove("enemy");
    }))

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = stats.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    stats.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    stats.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === stats.values.hitPosition){
                stats.values.result++;
                stats.view.score.textContent = stats.values.result;
                stats.values.hitPosition = null;
                playAudio("hit");
            }
            else{
                stats.values.countLive--;
                stats.view.lives.textContent = stats.values.countLive + "x"
                if(stats.values.countLive <= 0){
                    alert("game over! Seu resultado foi: " + stats.values.result);
                    clearInterval(stats.actions.countDownTimeId);
                    clearInterval(stats.actions.timerId);
                    location.reload();
                }
            }
        })
    });
}

function init(){
    countDown();
    addListenerHitBox();
}

init();