//Getting variables
var cells = document.querySelectorAll("td");
var gameHeadline = document.getElementById("gameHeadline");

//Add eventlistener for startbutton
var startButton = document.getElementById("gameStart");
startButton.addEventListener('click', start);

//Define boolean for game state
var sombodyWon = false;

//Define boolean for playerstate:
//playerAState === true : Player A is playing, false : Player B is playing
var aIsPlaying = true;

function start() {
    playerAState();
    emptyTable();
    aIsPlaying = true;
    somebodyWon = false;
}

//Empty table: replace all cell content with empty string  
function emptyTable() {
    cells.forEach((cell) => cell.innerHTML = "");
}

//"Resets" the button to start text
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

        if (td.innerHTML === "") {
            if (aIsPlaying) {
                console.log("Feld war leer");
                td.innerHTML = "<img src='src/x.png'>";
                aIsPlaying = false;
                playerBState();
            } else {
                console.log("Feld war leer");
                td.innerHTML = "<img src='src/o.png'>";
                aIsPlaying = true;
                playerAState();
            }
        }
        testEnd();
    }
}

/*Tests which of our players is the winner:
1. changes Headline
2. resets button
3. sets somebodyWon so nothing can be clicked anymore
*/
function winning(player) {
    somebodyWon = true;
    let play = player;
    console.log(play);

    if (player === "<img src=\"src/x.png\">") {
        var playerAwin = "Player A wins!";

        gameHeadline.innerHTML = playerAwin;

        startButton.style.display = "block";
        resetButton();
        console.log("a wins");
    }
    if (player === "<img src=\"src/o.png\">") {
        var playerBwin = "Player B wins!";
        gameHeadline.innerHTML = playerBwin;

        startButton.style.display = "block";
        resetButton();
    }
}

//Defines the winning patterns and detects them in the table, using the array of table cells
function testEnd() {
    testDeadEnd();
    const winPatterns = [   [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Horizontal
                            [0, 3, 6], [1, 4, 7], [2, 5, 8],    // Vertical
                            [0, 4, 8], [2, 4, 6]    ];           // Diagonal

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const cellsContent = [cells[a].innerHTML, cells[b].innerHTML, cells[c].innerHTML];

        if (cellsContent[0] === cellsContent[1] && cellsContent[0] === cellsContent[2] && cellsContent[0] !== "") {
            winning(cellsContent[0]);
            console.log("We have a winner!");
            return;
        }
    }
}

// Tests if all cells are full, this is before we have a winner
function testDeadEnd() {
    var allCellsFilled = Array.from(cells).every(cell => cell.innerHTML !== "");

    if (allCellsFilled) {
        var draw = "A draw! Everybody loses!";
        gameHeadline.innerHTML = draw;
        startButton.style.display = "block";
    }
}
