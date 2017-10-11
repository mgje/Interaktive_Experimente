// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

// modified by Martin Guggisberg 2017

var tree = [];
var walkers = [];
let r;

let maxTree = 500;
var maxWalkers = 50;
var iterations = 3000;
var radius = 8;
var hu = 0;
var shrink = 0.992;
let shrinkSlider;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  // for (var x = 0; x < width; x += r * 2) {
  //   tree.push(new Walker(x, height));
  // }


  shrinkSlider = createSlider(0,100,4);
  shrinkSlider.position(30,height+20);

  tree[0] = new Walker(width / 2, height / 2);
  radius *= shrink;
  for (var i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
    radius *= shrink;
  }
}

function draw() {
  background(0);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }

  for (var n = 0; n < iterations; n++) {
    for (var i = walkers.length - 1; i >= 0; i--) {
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        walkers[i].setHue(hu % 360);
        hu += 0.7;
        tree.push(walkers[i]);
        walkers.splice(i, 1);
      }
    }
  }

  //r = walkers[walkers.length - 1].r;
  while (walkers.length < maxWalkers && radius > 1.5 && tree.length < maxTree) {
    radius *= (shrink+shrinkSlider.value()/10000);
    walkers.push(new Walker());
  }

}
