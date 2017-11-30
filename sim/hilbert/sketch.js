// TURTLE STUFF:
var x, y; // the current position of the turtle
var currentangle = 0; // which way the turtle is pointing
var step = 20; // how much the turtle moves with each 'F'
var angle = 90; // how much the turtle turns with a '-' or '+'
var x0 = 4;
var y0 = 4;

//faster with fix declaration
let r,g,b,a,radius;
let redpoint = true;

// Rulers
let dims;
let outs;
let outdim;
let pos;
let outpos;

// LINDENMAYER STUFF (L-SYSTEMS)
var thestring = 'A'; // "axiom" or start of the string
var numloops = 4; // how many iterations to pre-compute
var sizes = [600,598,210,92,42,20,10,5,2]
var step = sizes[numloops]
var therules = []; // array for rules
therules[0] = ['A', '-BF+AFA+FB-']; // first rule
therules[1] = ['B', '+AF-BFB-FA+']; // second rule

var whereinstring = 0; // where in the L-system are we?

function setup() {
  createCanvas(660, 660);

  stroke(77, 88, 99, 255);

  dims = createSlider(1, 7, 4);
  dims.position(680,150);
  outdim = createElement('div', '');
  outdim.position(680, 130);
  outdim.style('font-size: 24px; color: gray');
  outs="dim = "+dims.value();
  outdim.html(outs);


  pos = createSlider(1, 100, 45);
  pos.position(680,250);
  outpos = createElement('div', '');
  outpos.position(680, 230);
  outpos.style('font-size: 24px; color: gray');
  outs="P at t = "+pos.value()/100.0;
  outpos.html(outs);


  computeLSystem();

}

function draw() {

  for (var i = 0; i < 2*numloops; i++) {
  // draw the current character in the string:
  drawIt(thestring[whereinstring]);

  // Point close to position?
  if (Math.abs(whereinstring/thestring.length-pos.value()/100.0)< 1.1/thestring.length){
    redpoint = true;
  } else {
    redpoint = false;
  }

  // increment the point for where we're reading the string.
  // wrap around at the end.
  whereinstring++;

  if (dims.value() !== numloops){
    computeLSystem();
  }

  outs="P at t = "+pos.value()/100.0;
  outpos.html(outs);

  if (whereinstring > thestring.length-1)
    {
      initRoundValues()
    }
  }

}

// interpret an L-system
function lindenmayer(s) {
  var outputstring = ''; // start a blank output string

  // iterate through 'therules' looking for symbol matches:
  for (var i = 0; i < s.length; i++) {
    var ismatch = 0; // by default, no match
    for (var j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring+= s[i];
  }

  return outputstring; // send out the modified string
}


function initRoundValues(){
  background(44);
  x = x0;
  y = height-y0;
  whereinstring =0;
  currentangle = 0;
}



function computeLSystem(){
  numloops = dims.value();
  step = sizes[numloops];
  thestring = 'A';
  outs="dim = "+dims.value();
  outdim.html(outs);

  // COMPUTE THE L-SYSTEM
  for (var i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }

  initRoundValues();
}
// this is a custom function that draws turtle commands
function drawIt(k) {

  if (k=='F') { // draw forward
    // polar to cartesian based on step and currentangle:
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
    line(x, y, x1, y1); // connect the old and the new

    // update the turtle's position:
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle; // turn left
  } else if (k == '-') {
    currentangle -= angle; // turn right
  }

  // give me some random color values:
  r = random(248, 255);
  g = random(220, 255);
  b = random(190, 180);
  a = random(70, 100);


  // pick a gaussian (D&D) distribution for the radius:
  radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius/4;

  if (redpoint){
    r=255;
    g=90;
    b=0;
    a=200;
    radius=8;
  }

  // draw the stuff:
  fill(r, g, b, a);
  ellipse(x, y, radius, radius);
}
