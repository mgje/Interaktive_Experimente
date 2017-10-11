// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/bqF9w9TTfeo

// var x;
// var y;
var pos;
var prev;

function setup() {
  createCanvas(400, 400);
  background(51);
  stroke(255,255,255,188);
  noFill();
  strokeWeight(1);

  walkers = []
  for (let i = 0; i< 500; i++) {
    walkers.push(new Walker(200,200));
  }

}

function draw() {
  background(51);

  for (var i = walkers.length - 1; i >= 0; i--) {
    walkers[i].walk();
  }


}

class Walker {


  constructor(x,y){
    this.x = x
    this.y = y
    this.nx = x
    this.ny = y
    this.r = 4

  }

  walk(){
    const BR=10;
    let step = p5.Vector.random2D();

    let r = random(100);
    if (r < 5) {
      step.mult(random(1, 10));
    } else {
      step.setMag(2);
    } 

    this.nx = this.x + step.x;
    this.ny = this.y + step.y;

    //line(this.x, this.y, this.nx, this.ny);
    ellipse(this.x,this.y,this.r*2)

    this.x = this.nx;
    this.y = this.ny;

    //boundary condition
    if (this.x < -BR)  this.x = width +BR;
    if (this.y < -BR)  this.y = height+BR;
    if (this.x > width +BR) this.x = -BR;
    if (this.y > height+BR) this.y = -BR;

  }

}
