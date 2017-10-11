/*
 * @name Game of Life
 * @description A basic implementation of John Conway's Game of Life CA
 * (<a href="http://natureofcode.com">natureofcode.com</a>)
 */

var w;
var columns;
var rows;
var board;
var next;
var speed, nspeed, speedSlider;
var SPEED_INV=24;
var t0;
var outt;
var outs;


function setup() {
  createCanvas(800, 800);
  w = 5;
  // Calculate columns and rows
  columns = floor(width/w);
  rows = floor(height/w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();

  outt = createElement('h2', '');
  outt.position(width+50, 200);
  outt.style('font-size: 18px; color: gray');
  outs="t = " + t0;
  outt.html(outs);
}


function nextgen(){
  background(255);
    generate();
    for ( var i = 0; i < columns;i++) {
      for ( var j = 0; j < rows;j++) {
        if ((board[i][j] == 1)) fill(0);
        else fill(255);
        stroke(0);
        rect(i*w, j*w, w-1, w-1);
      }
    }
}


function draw() {
    nextgen();
    outs="t = " + t0;
  outt.html(outs);
  t0 +=1;
}

// reset board when mouse is pressed
// function mousePressed() {
//   init();
// }

function keyPressed() {
  if (keyCode === 32) { //space
    nextgen();
  }
  if (keyCode === 110 || keyCode === 78 ) { //n
    init();
  }  
} 

// Fill board randomly
function init() {
  t0 = 0;
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      // Lining the edges with 0s
      // if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // // Filling the rest randomly
      // else board[i][j] = floor(random(2));
      board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {
  let x_,y_, neighbors;
  // Loop through every spot in our 2D array and check spots neighbors
  for (var x = 0; x < columns; x++) {
    for (var y = 0; y < rows; y++) {
      // Add up all the states in a 3x3 surrounding grid
      neighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          x_ = (x+i)%columns !== -1 ? (x+i)%columns : columns-1;
          y_ = (y+j)%rows !== -1 ? (y+j)%rows : rows-1;
          neighbors += board[x_][y_];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x%columns][y%rows];
      // Rules of Life
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else                                             next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  var temp = board;
  board = next;
  next = temp;
}
