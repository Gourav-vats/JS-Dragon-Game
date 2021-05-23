score = 0;
cross = true;

audio = new Audio('assets/music.mp3');
audiogo = new Audio('assets/gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key Code is : ", e.keyCode);
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 115) + "px";
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 115) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstackle = document.querySelector('.obstackle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstackle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstackle, null).getPropertyValue('top'));

    offSetX = Math.abs(dx - ox);
    offSetY = Math.abs(dy - oy);
    // console.log(offSetX,offSetY);
    if (offSetX < 150 && offSetY < 52) {
        gameOver.style.visibility = 'visible';
        document.getElementById('scoreCount').innerHTML = "FINAL SCORE : " + score;
        obstackle.classList.remove('animateObstackle');
        gameOver.classList.add('transgameOver');
        audiogo.play();
        audio.pause();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
    }
    else if (offSetX < 160 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(obstackle, null).getPropertyValue('animation-duration'));
            newDuration = aniDuration - 0.1;
            if (newDuration > 2.5) {
                obstackle.style.animationDuration = newDuration + 's';
                console.log(newDuration);
            }
        }, 500);
    }

}, 100);


function updateScore(score) {
    document.getElementById('scoreCount').innerHTML = "SCORE : " + score;
}
