let tiles = Array.from(document.querySelectorAll('.tiles'));
let buttonDiv = document.getElementById('btn');
let tilesLength = tiles.length;
let score = 0;

// First function of the play button

function startButton() {
    buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn" onclick="onClick();">Start</button>';
}
startButton();

// Function performs when first button function is pressed

function onClick() {
    // Renders the button inactive so the user can't keep calling onClick function
    buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn">Timer Started</button>';

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

    // Shuffles the tiles array into a random order
    let i = tilesLength,
        rand, temp;
    while (--i > 0) {
        rand = Math.floor(Math.random() * (i + 1));
        temp = tiles[rand];
        tiles[rand] = tiles[i];
        tiles[i] = temp;
    }

    // Selects half of the shuffled array and adds the color class
    let bottomHalfTiles = tiles.slice(tilesLength / 2, tilesLength);
    bottomHalfTiles.forEach(function(i) {
        i.classList += (' green');
    });

    // Replaces the color class with an unused class after 6 seconds
    function clearBoard() {
        bottomHalfTiles.map(function(i) {
            i.classList.replace('green', 'in-play');
        });
    }
    setTimeout(clearBoard, 6000);
    console.log(tiles);

    // Activates the users ability to click and change the block color 6 seconds after the start button is pressed
    function allowUserClick() {
        tiles.forEach(function(i) {
            i.addEventListener('click', tileClicked);
        });

        function tileClicked() {
            this.classList.toggle('green');
        }
    }
    setTimeout(allowUserClick, 6000);
}


// Function checks the users answers on clicking the check button and displays a modal
function checkAttempt() {
    let modalBtn = document.getElementById('modal-btn');
    
    // Loops through the tiles array and increments 1 to the score if a condition is true
    function checkClasses() {
        tiles.forEach(function(it) {
            if ((it.classList.contains('in-play')) && (it.classList.contains('green'))) {
                score++;
            }
            else if ((it.classList.contains('tiles')) && (it.classList.contains('green')) && !(it.classList.contains('in-play'))) {
                score = tilesLength;
            }
        });
    }
    checkClasses();
    
    // Modal either gives a yes or no answer as to whether the user has succeeded
    if (score == tilesLength / 2) {
        document.getElementById('modal-head').textContent = ('CONGRATULATIONS');
        document.getElementById('modal-text').textContent = ('Your memory served you well');
        modalBtn.innerHTML = '<button type="button" class="btn btn-secondary" onclick="location.reload();">Play Again</button>';
    }else {
        document.getElementById('modal-head').textContent = ('OOPS, SORRY');
        document.getElementById('modal-text').textContent = ('Would you like to try again or Start New Game');
        modalBtn.innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="reveal();">Reveal</button>';
    }
    // resets the score to 0 to keep the users attempt accurate
    score = 0;
}

function reveal(){
    buttonDiv.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="play-btn" onclick="location.reload();">Play Again</button>';
    tiles.forEach(function(it){
        if( (it.classList.contains('green'))&& !(it.classList.contains('in-play')) ){
            it.classList.remove('green');
        }else if ( !(it.classList.contains('green'))&& (it.classList.contains('in-play')) ){
            it.classList.add('green');
        }
    });
}