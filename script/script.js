//Getting the variables
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var nine = document.getElementById("nine");

var gameHeadline = document.getElementById("gameHeadline");


//Add eventlistener for startbutton
var startButton = document.getElementById("gameStart");
startButton.addEventListener('click', start);

//Define boolean for game state
var sombodyWon = true;

//Define boolean for playerstate:
//playerAState == true : Player A is playing, false : Player B is playing
var aIsPlaying = true;

function start() {
    playerAState();
    emptyTable();
    aIsPlaying = true;
    somebodyWon = false;
}

//Empty table: replace all cell content with empty string  
function emptyTable() {
    one.innerHTML = "";
    two.innerHTML = "";
    three.innerHTML = "";
    four.innerHTML = "";
    five.innerHTML = "";
    six.innerHTML = "";
    seven.innerHTML = "";
    eight.innerHTML = "";
    nine.innerHTML = "";
}

/*"Resets" the button to start text*/
function resetButton() {
    var start = "RE-START";
    startButton.innerHTML = start;
}

//Playerstate: Player A
function playerAState() {
    var playerAText = "Player A is on";
    gameHeadline.innerHTML = playerAText;
    table.style.display = "block";

    var reset = "RESET";
    startButton.innerHTML = reset;
}

//Playerstate: Player B  
function playerBState() {
    var playerBText = "Player B is on";
    gameHeadline.innerHTML = playerBText;
}

//Adding eventListener to table, calling on fillAndChange
var table = document.getElementById("table");
table.addEventListener('click', fillAndChange);

/*The main game method:
1. tests if someone won, so you "cannot click" anymore
2. tests if cell is empty and which player is playing
3. fills cell accordingly and changes player
4. tests end (wins or draw)
*/
function fillAndChange(e) {

    if (!somebodyWon) {

        console.log(e);
        console.log(e.target.innerHTML);

        var td = e.target;

        if (td.innerHTML == "" && aIsPlaying) {
            console.log("Feld war leer");
            td.innerHTML = "<img src='src/x.png'>";
            aIsPlaying = false;
            playerBState();
        }
        if (td.innerHTML == "" && !aIsPlaying) {
            console.log("Feld war leer");
            td.innerHTML = "<img src='src/o.png'>";
            aIsPlaying = true;
            playerAState();
        }
        testEnd();
    }
}

/*The Win Testster of the game
Tests if cells have the same content for each winning pattern
Also checking if cells are emppty, if not, what the content is
If not empty, checks content and hands it over to winning()
*/
function testEnd() {
    testDeadEnd();
    //pattern1 horizontal
    if (one.innerHTML == two.innerHTML && two.innerHTML == three.innerHTML) {
        if (one.innerHTML != "") {
            winning(one.innerHTML);
            console.log("pattern1");
        }
    }
    //pattern2 horizontal
    if (four.innerHTML == five.innerHTML && four.innerHTML == six.innerHTML) {
        if (four.innerHTML != "") {
            winning(four.innerHTML);
        }
    }
    //pattern3 horizontal
    if (seven.innerHTML == eight.innerHTML && seven.innerHTML == nine.innerHTML) {
        if (seven.innerHTML != "") {
            winning(seven.innerHTML);
        }
    }
    //pattern4 vertical
    if (one.innerHTML == four.innerHTML && four.innerHTML == seven.innerHTML) {
        if (one.innerHTML != "") {
            winning(one.innerHTML);
        }
    }
    //pattern5 vartical
    if (two.innerHTML == five.innerHTML && two.innerHTML == eigth.innerHTML) {
        if (two.innerHTML != "") {
            winning(two.innerHTML);
        }
    }
    //pattern6 vertical
    if (three.innerHTML == six.innerHTML && two.innerHTML == eigth.innerHTML) {
        if (two.innerHTML != "") {
            winning(two.innerHTML);
        }
    }
    //pattern7 diagonal
    if (one.innerHTML == five.innerHTML && one.innerHTML == nine.innerHTML) {
        if (one.innerHTML != "") {
            winning(one.innerHTML);
        }
    }
    //pattern8 diagonal
    if (three.innerHTML == five.innerHTML && three.innerHTML == seven.innerHTML) {
        if (three.innerHTML != "") {
            winning(three.innerHTML);
        }
    }
}

/*Tests which of our players is the winner:
1. changes Headline
2. resets button
3. sets somebodyWon so nothing can be clicked anymore
*/
function winning(player) {
    // console.log("winning");
    //console.log(player);
    somebodyWon = true;
    let play = player;
    console.log(play);

    if (player == "<img src=\"src/x.png\">") {
        var playerAwin = "Player A wins!";

        gameHeadline.innerHTML = playerAwin;

        startButton.style.display = "block";
        resetButton();
        console.log("a wins");
    }
    if (player == "<img src=\"src/o.png\">") {
        var playerBwin = "Player B wins!";
        gameHeadline.innerHTML = playerBwin;

        startButton.style.display = "block";
        resetButton();
    }
}


/*tests if all cells are full, this is before we have a winner*/
function testDeadEnd() {
    if (one.innerHTML && two.innerHTML && three.innerHTML &&
        four.innerHTML && five.innerHTML && six.innerHTML &&
        seven.innerHTML && eight.innerHTML && nine.innerHTML != "") {
        var draw = "A draw! Everybody loses!";
        gameHeadline.innerHTML = draw;
        startButton.style.display = "block";
    }
}