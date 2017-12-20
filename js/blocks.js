'use strict';


// here will be stored object that is being return
// by createCanvas() function
var CANVAS;

// game object holder, here will be all parameters\stats stored
// functions like drawBoard(), drawShape(), drawGrid() 
var GAME; 

// here will be object holding reference to html section with id=stats
var STATS_HOLDER;

// colors object with default values
// every draw function takes values from here
// every time player changes colors (via colors button)
// they are being changed here
var COLORS = {
    LEFT_EYE : '#c80000',
    RIGHT_EYE: '#000FFF',
    GRID: '#141414', 
    BACKGROUND: "#141414"
};

// default values of board 
// size, createGame() will take them as input
var COLUMNS = 12;
var ROWS = 20;

// in game board is being represented by 2d array where ones are ground blocks
// and zeroes are free cells, I put this in separate variable for more convenient
// code (in my opinion) so some checks will look nicer, for example:
// "if (board[i][j] === CELL )" instead of "if (board[i][j] === 1)"
const CELL = 1;


// those are shape types:
//  T:   J:   L:   S:   Z:   O:   I:
//
//   X    X   X                   X
//  XXX   X   X    XX    XX  XX   X
//       XX   XX    XX  XX   XX   X
//                                x
//  
//  this array is being used in random shape generation
//  in order to generate random type we need to choose 
//  random element from that array:
//  var randomShapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
//  
var SHAPE_TYPES = ['T', 'J', 'L', 'S', 'Z', 'O', 'I'];

// this object stores possible shape forms for rotation function
// for example, 'T' shape has possible forms:
//
//  +---------------------+
//  |   X     x        x  |
//  |  XXX   xx   xxx  xx |
//  |         x    x   x  |
//  +---------------------+
//
// every shape has 2D array with offsets of coordinates of each block of the shape
// relative to its center (except for 'I' shape), offsets a defined by 3x3 matrix:
//
// +--------+-------+-------+
// | -1, -1 | -1, 0 | -1, 1 |
// +--------+-------+-------+
// |  0, -1 |  0, 0 |  0, 1 |
// +--------+-------+-------+
// |  1, -1 |  1, 0 |  1, 1 |
// +--------+-------+-------+
// 
// where: i - row number, j - column number
//     +-----+
//     | i, j|
//     +-----+
//
// example: shape coordinates are x = 5 and y = 3, to find coordinates of each 
// other cell of the shape we need to sum x with j and y with i see drawShape() function
var SHAPE_FORMS = {

    T: [
	    [[0,0], [-1,0], [1,0], [0,-1]],
	    [[0,0], [0,-1], [0,1], [1,0]],
	    [[0,0], [-1,0], [0,1], [1,0]],
	    [[0,0], [0,-1], [-1,0], [0,1]] ],

    L: [
	    [[0,-1], [0,0], [0,1], [1,1]], 
	    [[-1,0], [0,0], [1,0], [1,-1]], 
	    [[-1,-1], [0,-1], [0,0], [0,1]] , 
	    [[-1,0], [-1,1], [0,0], [1,0]]], 

    J: [
	    [[-1,1], [0,1], [0,0], [0,-1]], 
	    [[-1,0], [0,0], [1,0], [1,1]], 
	    [[1,-1], [0,-1], [0,0], [0,1]], 
	    [[-1,-1], [-1,0], [0,0], [1,0]]], 


    Z: [    [[-1,-1], [0,-1], [0,0], [1,0]],
	    [[1,-1], [1,0], [0,0], [0,1]]],

    S: [
	    [[1,-1], [0,-1], [0,0], [-1,0]],
	    [[0,-1], [0,0], [1,0], [1,1]]],

    O: [   
	    [[-1,-1], [-1,0], [0,-1], [0,0]]],

    I: [
	    [[0,-2], [0,-1], [0,0], [0,1]],
	    [[-2,0], [-1,0], [0,0], [1,0]]]

};

// event listener for keyboard input
document.addEventListener("keydown", function(e) {

    // receive input only when game is in play
    // otherwise it will try to call function on undefined SHAPE
    // and BOARD
    if (typeof GAME !== 'undefined' && GAME.STATE === 'PLAY') {

	// left key pressed
	if (e.keyCode === 37) {
	    moveLeft(GAME.SHAPE, GAME.BOARD);
	}

	// right key pressed
	if (e.keyCode === 39) {
	    moveRight(GAME.SHAPE, GAME.BOARD);
	}

	// up key pressed
	if (e.keyCode === 38) {
	    rotate(GAME.SHAPE, GAME.BOARD);
	}

	// down key pressed
	if (e.keyCode === 40) {
	    moveDown(GAME.SHAPE, GAME.BOARD);
	}

	// space key pressed
	if (e.keyCode === 32) {
	    fireDown(GAME.SHAPE, GAME.BOARD);
	}
    }

    // on 'g' toggle grid
    if (e.keyCode === 71) {
	toggleGrid();
    }

    // on 'p' pause game
    if (e.keyCode === 80) {
	pauseGame();
    }

}, false);


// backup for supporting requestAnimationFrame in
// different browsers
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 
 
window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)} //fall back
 
// redraw canvas with new width and height in case browser
// window were resized
window.onresize = function() {

      // if there is canvas element 
      if (typeof CANVAS != "undefined") {

	// get visibility of old canvas
	// canvas can be hidden, for example we hiding canvas if
	// about button is being pressed, so we need to know current state
	// of canvas before recreating it with new width and height
        var display = CANVAS.cnv.style.display;

	// remove it
	document.body.removeChild(CANVAS.cnv);

	// create new canvas that will correspond new window size
	CANVAS = createCanvas(GAME.NUMBER_OF_ROWS, GAME.NUMBER_OF_COLUMNS);

	// set visibility of new canvas as it was before recreating
	CANVAS.cnv.style.display = display;
    }
}

// try to load saved color settings on a window load
window.onload = function() {
    loadColorSettings();
}

// sets with default values new game object
function createGame() {

    return {

	// grid drawing trigger, see draw() function
	GRID_ENABLED : true,

	// number of columns and rows for game board
	NUMBER_OF_COLUMNS : COLUMNS,
	NUMBER_OF_ROWS : ROWS,


	// defines interval of callin gameLogic() function
	DESCENT_RATE : 1000,

	// every time when DIFF_LEVEL is incremented, DESCENT_RATE 
	// is being decreased by DESCENT_RATE_INCREMENT
	DESCENT_RATE_INCREMENT : -25,

	// LEVEL_INC_STEP and DIFF_LEVEL define how many lines
	// need to be cleared to get to the next level, for each level it
	//  LEVEL_INC_STEP * DIFF_LEVEL^2
	LEVEL_INC_STEP : 5,
	DIFF_LEVEL : 1,

	// score for tetris event (when 4 lines cleared by 'I' shape)
	TETRIS_BONUS : 10,

	// basic score increment one cleared line
	BASIC_SCORE : 1,

	// how much time have passed since start of the game
	TIME_PLAYED : 0,

	// object of current shape
	SHAPE : {},

	// object for next shape
	NEXT_SHAPE : {},
	

	// game state, can be 'PAUSE', 'PLAY', 'GAMEOVER'
	STATE : '',
	
        // The request id, that uniquely identifies the entry in the callback list of
	// requestAnimationFrame() we need to keep track of this values
	// to be able pass them later to window.cancelAnimationFrame() 
	// in order to cancel the refresh callback request (stop animation, game logic etc)
	// see draw() function
	LOGIC_ID : 0,
	LOGIC_ID_TIMEOUT: 0,
	ANIMATION_ID : 0,

	// play board is represented as 2d array
	BOARD : [],

	// object with various game stats
	STATS : {
	
	    // total game score
	    SCORE : 0, 
	    // total lines cleared 
	    LINES : 0,
	    // total shapes spawned
	    SHAPES_COUNT : 0
	}

    };
}

// creates new shape, returns shape object
function createShape(type, cols) {
    
    var shape = {
	// type of the shape T, L ...
	name: type,
	// sets x - coordinate, new shape must be in the middle of the game field
	x: Math.floor(cols/2),
	// set y - coordinate, new shape must be at the top of game field
	y: 2,
	// sets basic form of the shape, new shape must not be rotated
	form: 0,
	// possible rotations of the shape, see SHAPE_FORMS
	forms: SHAPE_FORMS[type]
    };

    // before puting new shape on a game board we need to check for collisions
    // if it already collides we set GAME.STATE to 'GAMEOVER' and next call of
    // gameLogic() will call gameOver() function
    if(checkCollisions(shape, GAME.BOARD)) GAME.STATE = 'GAMEOVER';
    else {
	// if there is no collision continue
	return shape;
    }

}

// draws grid on a canvas
// ctx - canvas context
// d - size of one cell (being calculated in a main function game()
// width - of canvas
// height - of canvas
// cols - number of columns
// color - color of grid
function drawGrid(ctx, d, width, height, cols, color) {
   
    // set grid color
    ctx.strokeStyle = color;
    
    // set grid width
    ctx.lineWidth = 2;

    // draw vertical lines
    for ( var i = 0; i < cols; i++) {
	ctx.beginPath();
	ctx.moveTo(i*d, 0);
	ctx.lineTo(i*d, height);
	ctx.stroke();

    }

    // calculate number of rows
    var rows = height / d;

    // draw horizontal lines
    for (var i = rows; i > 0; i--) {
	ctx.beginPath();
	ctx.moveTo(0, i*d);
	ctx.lineTo(width, i*d);
	ctx.stroke();
    }
}

// draws gameboard array on a canvas
// ctx - canvas context
// d - size of one cell (being calculated in a main function game()
// color - color of ground blocks
// bgcolor - background color
function drawBoard(ctx, d, board, color, bgcolor) {

    // declare vars for loops
    var i,
	j; 

    // board is 2d array (array of arrays)
    // number of rows is number of arrays in board
    var rows = board.length;
    
    // number of cols is number of elements
    // of inner array
    var cols = board[0].length;

    // set color for background
    ctx.fillStyle = bgcolor;

    // fill all canvas with that color
    // d * cols = width of canvas
    // d * rows = height of canvas
    ctx.fillRect(0, 0, d*cols, d*rows);

    // set color for ground blocks
    ctx.fillStyle = color;

    // loop through board array
    for (i = 0; i < rows; i++) {
	for (j = 0; j < cols; j++) {

	    // for each element containing CELL fill corresponding 
	    // square on a canvas
	    // ctx.fillRect(j*d, i*d, d + 1, d + 1); +1 is to provide
	    // seamless picture
	    if (board[i][j] === CELL) ctx.fillRect(j*d, i*d, d + 1, d + 1);
	    
	}
    }
}


// draws falling shape on a canvas
// ctx - canvas context
// d - size of one cell (being calculated in a main function game()
// color - color of a current block
// shape - object with inforamtion about current shape, see createShape()
function drawShape(ctx, d, color, shape) {

    var i;
    // get all possible coordinate offsets of shape
    var figure = shape.forms;

    // get current shape position
    var form = shape.form;

    // get current coordinates of main cell
    var x = shape.x;
    var y = shape.y;

    // set color of current shape
    ctx.fillStyle = color;


    // figure is an array with shape coordinate offsets
    // form is a number of current set of offsets
    // for example, assume that shape type is 'T' and form = 0, x = 4, y = 2
    // that means that figure[form] = [[0,0], [-1,0], [1,0], [0,-1]] (look at SHAPE_FORMS)
    // so on the 'offset matrix' it looks like this:
    //
    //     +-----+-----+-----+
    //     |     |-1, 0|     |
    //     +-----+-----+-----+
    //     | 0,-1| 0, 0|     |
    //     +-----+-----+-----+
    //     |     | 1, 0|     |
    //     +-----+-----+-----+
    //
    // and in order to get actual coordinates of it cells on a board array
    // we need to add x and y to each cell of shape:
    //     +-----+-----+-----+
    //     |     | 3, 2|     |
    //     +-----+-----+-----+
    //     | 4, 1| 4, 2|     |
    //     +-----+-----+-----+
    //     |     | 5, 2|     |
    //     +-----+-----+-----+
    //
    // figure[form][i][0] - x part of the i'th offset
    // figure[form][i][1] - y part of the i'th offset
    // loop through all possible offsets for current form (rotation)
    //  calculate their coordinates and draw them on a canvas
    for ( i = 0; i < figure[form].length; i++) {
	
	// again we add +1 to d in order to get "seamless" picture on the screen
	ctx.fillRect( (x + figure[form][i][0])*d, (y + figure[form][i][1])*d, d + 1, d + 1);
    }
}



// collision detection function
// detects collision between falling blocks 
// and walls\ground blocks
// returns true in case there is a collision
function checkCollisions(shape, board) {

    // get number of columns
    var cols = board[0].length;

    // get number of rows
    var rows = board.length;

    // reference to array of possible forms
    // of current shape
    var figure = shape.forms;

    // current form of current shape
    var form = shape.form;

    var x,
	y,
	i;
    
    // loop through coordinates of the shape
    for ( i = 0; i < figure[form].length; i++) {

	// for coordinates calculation explanation
	// check drawShape() function
	x = shape.x + figure[form][i][0];
	y = shape.y + figure[form][i][1];

	// check for collision with walls
	if ( x > cols - 1 || x < 0 || y > rows - 1 ) return true;
	// check for collision with ground blocks
	else if ( y > 0 && board[y][x] === CELL) return true;
    }

    // if nothing collided return false
    return false;
    
}

// moves shape down, if possible
function moveDown(shape, board) {
    // increment y by 1 
    shape.y++;

    // check if it collides with something
    // if yes -> decrement y by 1
    // if no -> return
    if (checkCollisions(shape, board)) shape.y--;
    return;
} 

// moves shape right, if possible
function moveRight(shape, board) {
    // increment x by 1
    shape.x++;

    // check if it collides with something
    // if yes -> decrement x by 1
    // if no -> return
    if (checkCollisions(shape, board)) shape.x--;
    return;
}

// moves shape left, if possible
function moveLeft(shape, board) {
    // decrement x by 1
    shape.x--;

    // check if it collides with something
    // if yes -> increment x by 1
    // if no -> return
    if (checkCollisions(shape, board)) shape.x++;
    return;
}

// rotates shape, if possible
function rotate(shape, board) {
    // get all possible forms of given shape
    var forms = shape.forms;

    // save current shape form 
    var temp = shape.form;

    // we are "looping" through all possible shape forms
    // if it is already at its last form -> set it to 0 (first)
    // else set next form
    shape.form == forms.length - 1 ? shape.form = 0 : shape.form++;
    
    // check if new 'rotated' shape is colliding with something
    // if yes -> return previous form
    if (checkCollisions(shape, board)) shape.form = temp;
    return;
}

// drops down shape until first 
// collision occured
function fireDown(shape, board) {
    // until collision happens
    while(!checkCollisions(shape, board)) {
	// move shape down by 1
	shape.y++;
    }
    // lift shape after last collision, if we won't do
    // this shape will remain 'drowned' by 1 in a wall of in the
    // other shape
    shape.y--;
}



// prepares everything and starts new game 
function game() {

    var i,
	x,
	y;

    // create new canvas
    CANVAS = createCanvas(GAME.NUMBER_OF_ROWS, GAME.NUMBER_OF_COLUMNS);

    const hammertime = new Hammer(CANVAS.cnv);

   

    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    hammertime.on('swipeup', () => rotate(GAME.SHAPE, GAME.BOARD));
    hammertime.on('swipeleft', () => moveLeft(GAME.SHAPE, GAME.BOARD));
    hammertime.on('swiperight', () => moveRight(GAME.SHAPE, GAME.BOARD));
    hammertime.on('swipedown', () => fireDown(GAME.SHAPE, GAME.BOARD));

    // start game timer
    var start = Date.now();
    // this variable will help us calculate clean game time
    var curr;

    // get stats element
    STATS_HOLDER = document.getElementById('stats');

    // instaniate 2d array for game board
    GAME.BOARD = create2dArray(GAME.NUMBER_OF_COLUMNS, GAME.NUMBER_OF_ROWS); 
    // create next shape
    GAME.NEXT_SHAPE = createShape(SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)], GAME.NUMBER_OF_COLUMNS);
    // set current shape to be next
    GAME.SHAPE = GAME.NEXT_SHAPE;

    // draw() draws everything
    // on a canvas and is recursively calls
    // itself via requestAnimationFrame()
    function draw() {

	// clear everything before drawing new frame
	CANVAS.con.clearRect(0, 0, CANVAS.cnv.width, CANVAS.cnv.height);

	// draw game board
	drawBoard(CANVAS.con, CANVAS.p, GAME.BOARD, COLORS.RIGHT_EYE, COLORS.BACKGROUND);

	// draw current shape
	drawShape(CANVAS.con, CANVAS.p, COLORS.LEFT_EYE, GAME.SHAPE);

	// if grid is enabled, draw it
	GAME.GRID_ENABLED && drawGrid(CANVAS.con, CANVAS.p, CANVAS.cnv.width, CANVAS.cnv.height, GAME.NUMBER_OF_COLUMNS, COLORS.GRID);

	// update game stats
	updateStats();

	// recursive call via requestAnimationFrame
	// we alse keep track of animation frame ID in GAME.ANIMATION_ID
	// so we'll be able to stop it in some cases
        GAME.ANIMATION_ID = requestAnimationFrame(draw);
    }

    // gameLogic is responsible for all in game behavior
    function gameLogic() {

	// gameLogic calls itself via requestAnimationFrame AND setTimeout function
	// we need setTimeout because we need to change from time to time frequency of some 
	// events that happen in game
	
	// we keep track of setTimeout id in order to be albe stop it afterwards
	// timeout is set to GAME.DESCENT_RATE
	GAME.LOGIC_ID_TIMEOUT = setTimeout( function() {

	    // if current state is gameover -> call gameOver() function
	    if (GAME.STATE === 'GAMEOVER') gameOver();

	    // if game is not paused
	    if (GAME.STATE !== 'PAUSE') {

		// update game timer
		curr = Date.now();

		// increment total time played
		GAME.TIME_PLAYED += curr - start;
		// update start value 
		start = curr;

		// move shape down for one step
		GAME.SHAPE.y++;
		// if it collides return to previous step and put it on the board as ground block
		if (checkCollisions(GAME.SHAPE, GAME.BOARD)) {

		    // return shape to previous y coordinate
		    // if we won't do this it will remain 'dived' in a wall or in ground block
		    GAME.SHAPE.y--;

		    // loop through shape cordintates and put it on a board array as 
		    // ground blocks
		    for (i = 0; i < GAME.SHAPE.forms[GAME.SHAPE.form].length; i++) {

			// for coordinates calculation explanation
			// check drawShape() function
			x = GAME.SHAPE.x + GAME.SHAPE.forms[GAME.SHAPE.form][i][0];
			y = GAME.SHAPE.y + GAME.SHAPE.forms[GAME.SHAPE.form][i][1];

			GAME.BOARD[y][x] = CELL;
		    }

		    // check board for lines to clear
		    checkBoard(GAME.BOARD);

		    // set new shape from next shape
		    GAME.SHAPE = GAME.NEXT_SHAPE;

		    // increment total shapes count
		    GAME.STATS.SHAPES_COUNT += 1;

		    // create new shape
		    GAME.NEXT_SHAPE = createShape(SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)], GAME.NUMBER_OF_COLUMNS);
		}

	    } else {
		// if game is paused we 
		// should constatly update start to prevent
		// time counting for paused state
		start = Date.now();
	    }

	    // recursive call via requestAnimationFrame
	    // we alse keep track of animation frame ID in GAME.ANIMATION_ID
	    // so we'll be able to stop it in some cases
	    GAME.LOGIC_ID = requestAnimationFrame(gameLogic);
	    
	}, GAME.DESCENT_RATE);
    }
    

    // set game state to play
    GAME.STATE = 'PLAY';
	
    // call draw function
    requestAnimationFrame(draw);

    // call gameLogic function
    requestAnimationFrame(gameLogic);

}

// checks board for lines to clear
function checkBoard(board) {

    var i,j;
    var rows = board.length;
    var cols = board[0].length;
    var counter = 0;
    
    // check each row (starting from bottom to top)
    for (i = rows - 1; i > 0; i--) {

	// if there is a row that full of blocks we adding one counter
	// and shifting every row that is above - one row down
	if (board[i].every( function(cell) { return cell === CELL; })) {

	    counter++;
	    for (j = i; j > 0; j--) {
		board[j] = board[j-1].slice();
	    }
	    // after shifting we need to return i to line that was cleaned
	    // because now there is a row that was shifted down and we need to
	    // check it again
	    i++;
	}
    }

    // calculate score
    if (counter === 4) {

	// tetris event, 4 lines were cleared in a row
	// increase score by TETRIS_BONUS
	GAME.STATS.SCORE += GAME.TETRIS_BONUS;

	   // increase score by number of lines cleared
    } else GAME.STATS.SCORE += counter;

    // update number of total lines cleared
    GAME.STATS.LINES += counter;

    // check condition for going to the next level
    // LEVEL_INC_STEP = 10 
    // DIFF_LEVEL
    // level 1 - nothing
    // level 2 - 1^2 * 5 -> 5
    // level 3 - 2^2 * 5 -> 5 + 20 = 25
    // level 4 - 3^2 * 5 -> 5 + 20 + 45 = 70
    // level 5 - 4^2 * 5 -> 5 + 20 + 45 + 80 = 150
    // and so on...
    if (GAME.STATS.LINES >= GAME.DIFF_LEVEL * GAME.DIFF_LEVEL * GAME.LEVEL_INC_STEP) {

	// decrease DESCENT_RATE by DESCENT_RATE_INCREMENT (it is negative)
	GAME.DESCENT_RATE += GAME.DESCENT_RATE_INCREMENT;
	GAME.DIFF_LEVEL += 1;

    }
}


// gameOver function is being called by
// game() when GAME.STATE is 'GAMEOVER'
function gameOver() {

    // if there is no GAME -> returns
    if (typeof GAME === 'undefined') return;

    // cancel all updates and animations
    window.cancelAnimationFrame(GAME.LOGIC_ID);
    window.cancelAnimationFrame(GAME.ANIMATION_ID);
    clearTimeout(GAME.LOGIC_ID_TIMEOUT);

    // set existing game to NULL
    GAME = null;

}

// creates 2d array 
function create2dArray(cols, rows) {

    var arr = [];
    var board = [];
    
    var i = 0;

    for (i = 0; i < cols; i++) {
	arr.push(0);
    }

    for (i = 0; i < rows; i++) {
	board.push(Array.from(arr));
    }

    return board;
    
}

// creates canvas and attaches it to the html
// body, called everytime whenever canvas is created
// returns custom canvas object
function createCanvas(rows, cols) {

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // height should be 95% of screen height
    var factor = 0.95;

    // get inner size of browser window
    var i_h = window.innerHeight;
    var i_w = window.innerWidth;

    // calculate actual canvas size
    var height = i_h * factor;
    var width = height * (cols/rows);

    // calculate margins to center canvas on page
    var marginTop = (i_h - height)/2;
    var marginLeft = (i_w - width)/2;
    
    //finally give canvas right height and width
    canvas.setAttribute("height", height);
    canvas.setAttribute("width", width);
    canvas.setAttribute('id','canvas');

    //center canvas on a page
    canvas.style.position = "absolute";
    canvas.style.top = marginTop + "px";
    canvas.style.left = marginLeft + "px";

    // add canvas element to the page
    document.body.appendChild(canvas);

    return {
	// canvas itself
	cnv: canvas,
	// canvas context 
	con: ctx,
	// size of the grid\block\column width
	p: width / cols
    };

}

// updates current game stats
// being called in draw()
function updateStats() {

    // get type of next shape 
    // first check if there is next shape 
    var next = (typeof GAME.NEXT_SHAPE === 'undefined') ? 'none' : GAME.NEXT_SHAPE.name; 

    // get seconds, minutes and hours played
    var s = Math.floor(GAME.TIME_PLAYED / 1000);
    var m = Math.floor(s / 60);
    var h = Math.floor(m / 60);

    // set new content for STATS_HOLDER
    STATS_HOLDER.innerHTML = 
	"<br />" +
	"<li>level</li>" +
	"<br />" +
	"<li>" + GAME.DIFF_LEVEL + "</li>" +
	"<br />" +
	"<li>score</li>" +
	"<br />" +
	"<li>" + GAME.STATS.SCORE + "</li>" +
	"<br />" +
	"<li>lines</li>" +
	"<br />" + 
	"<li>" + GAME.STATS.LINES + "</li>" +
	"<br />" + 
	"<li>shapes</li>" + 
	"<br />" + 
	"<li>" + GAME.STATS.SHAPES_COUNT + "</li>" +
	"<br />" + 
	"<li>time</li>" +
	"<br />" +
	"<li>" + h +'h ' + m%60 + 'm ' + s%60 + 's' + "</li>" +
	"<br />" +
	"<li>next</li>" +
	"<br />" +
	"<li>" + next + "</li>";
}

function unfocusButtons() {
    var buttons = document.getElementsByTagName('button');
    var i;
    for (i = 0; i < buttons.length; i++) {
	buttons[i].blur();
    }

}

// called onclick of 'New game' button
function startGame() {
    
    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // hide #about div
    document.getElementById('about').style.display = 'none';

    // if there is already canvas, remove it
    if (typeof CANVAS !== "undefined") document.body.removeChild(CANVAS.cnv);

    // if there is already game, end it
    if (GAME !== null) gameOver();

    // create new game
    GAME = createGame();
    // run it
    game();

    // reset pause button, to prevent situation whenever new game started
    // from paused game
    document.getElementById('pause').innerHTML = 'Pause';

    // set color picker values to current colors
    updateColorPickerValues();
}

// sets game to pause and continues it, depending on 
// the current state
function pauseGame() {

    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // if there is no game -> just return, do nothing
    if (typeof GAME === "undefined") return;

    if (GAME.STATE === 'PLAY') {

	// if in play set game state to pause
	GAME.STATE = 'PAUSE';
	// update content of pause button
	document.getElementById('pause').innerHTML = 'Continue';

    } else if (GAME.STATE === 'PAUSE') {

	// if paused we need to check if #about div is visible
	if (document.getElementById('about').style.display === '') {
	    // if it was visible - hide it
	    document.getElementById('about').style.display = 'none'
	    // and unhide canvas
	    CANVAS.cnv.style.display = '';
	}
	
	// set game state in play
	GAME.STATE = 'PLAY';
	// update content of pause button 
	document.getElementById('pause').innerHTML = 'Pause';
    }
}

// shows and hides #settings menu
function settings() {
    
    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // get #settings div
    var settings = document.getElementById('settings');

    // if #settings div is visible -> hide it, if no -> show it
    settings.style.display = (settings.style.display === 'block') ? settings.style.display = 'none' : settings.style.display = 'block';
}


// updates color settings onFineChange event
// http://jscolor.com/examples/ see more there
function leftEyeColor(jscolor) {
    COLORS.LEFT_EYE = '#' + jscolor;
}

// updates color settings onFineChange event
// http://jscolor.com/examples/ see more there
function rightEyeColor(jscolor) {
    COLORS.RIGHT_EYE = '#' + jscolor;
}

// updates color settings onFineChange event
// http://jscolor.com/examples/ see more there
function gridColor(jscolor) {
    COLORS.GRID = '#' + jscolor;
}

// updates color settings onFineChange event
// http://jscolor.com/examples/ see more there
function backgroundColor(jscolor) {
    COLORS.BACKGROUND = '#' + jscolor;
}

// save color settings in localStorage
function saveColorSettings() {

    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // add support for cookies 
    // if there is no localStorage object supported
    localStorage.setItem('COLORS',JSON.stringify(COLORS));

}

// loads color settings from
// localStorage if there are any
function loadColorSettings() {

    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // load settings
    var item = localStorage.getItem('COLORS');

    // check for null (if there aren't previously saved color settings)
    if (item !== null) COLORS = JSON.parse(item);
    else return;

    // set color picker values to current colors
    updateColorPickerValues();
}


// switches on and of grid
function toggleGrid() {

    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // if there is no game -> just return, do nothing
    if (typeof GAME === "undefined") return;

    // toggle grid
    if (GAME.GRID_ENABLED) GAME.GRID_ENABLED = false;
    else GAME.GRID_ENABLED = true;
}

// update values of color pickers
// we need this method for better indication
// of current color settings, for example when old settings
// are being loaded via loadColorSettings() function we need
// to update color pickers value
function updateColorPickerValues() {

    document.getElementById('leftEye').value = COLORS.LEFT_EYE;
    document.getElementById('rightEye').value = COLORS.RIGHT_EYE;
    document.getElementById('grid').value = COLORS.GRID;
    document.getElementById('background').value = COLORS.BACKGROUND;

}

// shows and hides #about on button click

// we pause game, hide canvas and show #about 
function about() {
    
    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // get #about div
    var info = document.getElementById('about');
	 
    if (typeof GAME !== "undefined") {

        // if about is being clicked while game is in play
	if (GAME.STATE === 'PLAY') pauseGame();

	// if canvas hidden already -> show it
	if (CANVAS.cnv.style.display === '') CANVAS.cnv.style.display = 'none';
	// if canvas is visible -> hide it
	else if (CANVAS.cnv.style.display === 'none') CANVAS.cnv.style.display = '';
    }

    // if #about div is visible -> hide it
    if (info.style.display === '') info.style.display = 'none'; 
    // if #about div is hideen -> show it
    else if (info.style.display === 'none') info.style.display = ''; 

}

// sets new number of columns and rows
function set() {
    
    // unfocus all buttons
    // to prevent unintended button presses during gameplay
    unfocusButtons();

    // set new value for COLUMNS
    COLUMNS = document.getElementById('col_count').value;
    // set new value for ROWS
    ROWS = document.getElementById('row_count').value;

    // start new game with new ROWS and COLS 
    startGame();
}
