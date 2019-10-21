let blocks = Array.from(document.querySelectorAll('.block'));
let buttonDiv = document.getElementById('btn');
let blocksLength = blocks.length;
let score = 0;

// First function of the play button

function startButton() {
    buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn" onclick="onClick();">Start</button>';
}
startButton();

// Function performs when first button function is pressed

function onClick() {
    // Renders the button inactive so the user can't keep calling onClick function
    buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn">Start</button>';

    // Countdown timer shown in the button text
    // Once time is up the buttons function changes to check users attempt
    let timeleft = 5;
    let countdownTimer = setInterval(function() {
        buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn"></button>';
        document.getElementById('play-btn').textContent = timeleft;
        timeleft -= 1;
        if (timeleft < 0) {
            clearInterval(countdownTimer);
            buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn" onclick="checkAttempt();" data-toggle="modal" data-target="#exampleModal">Check</button>';
        }
    }, 1000);

    // Shuffles the blocks array into a random order
    let i = blocksLength,
        rand, temp;
    while (--i > 0) {
        rand = Math.floor(Math.random() * (i + 1));
        temp = blocks[rand];
        blocks[rand] = blocks[i];
        blocks[i] = temp;
    }

    // Selects half of the shuffled array and adds the color class
    let bottomHalfblocks = blocks.slice(blocksLength / 2, blocksLength);
    bottomHalfblocks.forEach(function(i) {
        i.classList.replace('blue', 'green');
    });

    // Replaces the color class with an unused class after 6 seconds
    function clearBoard() {
        bottomHalfblocks.map(function(i) {
            i.classList.replace('green', 'blue');
            i.classList.add('marker')
        });
    }
    setTimeout(clearBoard, 6000);
    console.log(blocks);

    // Activates the users ability to click and change the block color 6 seconds after the start button is pressed
    function allowUserClick() {
        blocks.forEach(function(i) {
            i.addEventListener('click', tileClicked);
        });

        function tileClicked() {
            this.classList.toggle('green');
            this.classList.toggle('blue');
        }
    }
    setTimeout(allowUserClick, 6000);
}

let modalBtn1 = document.getElementById('modal-btn1');
let modalBtn2 = document.getElementById('modal-btn2');
// Function checks the users answers on clicking the check button and displays a modal
function checkAttempt() {

    // Loops through the blocks array and increments 1 to the score if a condition is true
    function checkClasses() {
        blocks.forEach(function(it) {
            if ((it.classList.contains('marker')) && (it.classList.contains('green'))) {
                score++;
            }
            else if ((it.classList.contains('green')) && !(it.classList.contains('marker'))) {
                score = blocksLength;
            }
        });
    }
    checkClasses();

    // Modal either gives a yes or no answer as to whether the user has succeeded
    if (score == blocksLength / 2) {
        document.getElementById('modal-head').textContent = ('CONGRATULATIONS!');
        modalBtn1.innerHTML = '<button type="button" class="btn btn-primary" onclick="location.reload();">New Game</button>';
        modalBtn2.innerHTML = '';
    }
    else {
        document.getElementById('modal-head').textContent = ('SORRY NOT THIS TIME!');
        modalBtn1.innerHTML = '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="revealAttempt();">Reveal</button>';
        modalBtn2.innerHTML = '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="tryAgain();">Try Again</button>';
    }
    // resets the score to 0 to keep the users attempt accurate
    score = 0;
}

function tryAgain() {
    blocks.forEach(function(it) {
        if (it.classList.contains('green')) {
            it.classList.replace('green', 'blue');
        }
    });
}

// Replaces green class with blue class
function revealAttempt() {
    setInterval(revealCorrect, 2000);
    buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn" onclick="location.reload();">New Game</button>';
    function revealCorrect(){
    blocks.forEach(function(it) {
        if ((it.classList.contains('green')) && !(it.classList.contains('marker'))) {
            it.classList.replace('green', 'blue');
        }
        else if (!(it.classList.contains('green')) && (it.classList.contains('marker'))) {
            it.classList.replace('blue', 'green');
        }
    });
}
}