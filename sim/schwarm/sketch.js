
//Code from https://p5js.org/examples/simulate-flocking.html
var a_neighbordist = 50;
var c_neighbordist = 50;
var desiredseparation = 25.0;
const R = 3;

var flock;

var ands;
var cnds;
var seps;
var steerings;
var outand;
var speeds;
var outcnd;
var outsep;
var outsteering;
var outs;
var steeringv = 0.02;
var speedv = 3;
var outspeed;

function setup() {
  createCanvas(600,600);
  createP("Drag the mouse to generate new boids.");
  
  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 100; i++) {
    var b = new Boid(width/2,height/2);
    flock.addBoid(b);
  }
  userinteraction();
}

function draw() {
  background(51);
  flock.run();
  updateui();
  
}

// Add a new boid into the System
function mouseDragged() {
  if (mouseX < 550){
    flock.addBoid(new Boid(mouseX,mouseY));
  } 
}

function userinteraction(){
  ands = createSlider(1, 150, a_neighbordist);
  ands.position(620,60);
  outand = createElement('div', '');
  outand.position(620, 35);
  outand.style('font-size: 24px; color: gray');
  outs="Alignment distance = " + ands.value();
  outand.html(outs);



  cnds = createSlider(1, 150, c_neighbordist);
  cnds.position(620,110);
  outcnd = createElement('div', '');
  outcnd.position(620, 85);
  outcnd.style('font-size: 24px; color: gray');
  outs="Cohesion distance = " + ands.value();
  outcnd.html(outs);



  seps = createSlider(1, 150, desiredseparation);
  seps.position(620,160);
  outsep = createElement('div', '');
  outsep.position(620, 135);
  outsep.style('font-size: 24px; color: gray');
  outs="Separation distance = " + seps.value();
  outsep.html(outs);



  steerings = createSlider(1, 250, 20);
  steerings.position(620,210);
  outsteering = createElement('div', '');
  outsteering.position(620, 185);
  outsteering.style('font-size: 24px; color: gray');
  outs="Steering = " + steerings.value();
  outsteering.html(outs);


  speeds = createSlider(1, 100, 30);
  speeds.position(620,260);
  outspeed = createElement('div', '');
  outspeed.position(620, 235);
  outspeed.style('font-size: 24px; color: gray');
  outs="Max Speed = " + speeds.value();
  outspeed.html(outs);

}


function updateui(){
  a_neighbordist = ands.value();
  outs="Alignment distance = " + a_neighbordist;
  outand.html(outs);


  c_neighbordist = cnds.value();
  outs="Cohesion distance = " + c_neighbordist;
  outcnd.html(outs);

  desiredseparation = seps.value();
  outs="Separation distance  = " + desiredseparation;
  outsep.html(outs);


  if (steeringv !== steerings.value()){
    steeringv = steerings.value();
    outs="Steering = " + steeringv;
    outsteering.html(outs);
    flock.changeMaxForce(steeringv/1000);
  }

  if (speedv !== speeds.value()){
    speedv = speeds.value();
    outs="Max Speed = " + speedv;
    outspeed.html(outs);
    flock.changeMaxSpeed(speedv/10);
  }
  

}



// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// Change Max Speed
Flock.prototype.changeMaxSpeed = function(newspeed) {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].maxspeed = newspeed;
  }
}

// Change Max Speed
Flock.prototype.changeMaxForce = function(maxforce) {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].maxforce = maxforce;
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x,y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.position = createVector(x,y);
  this.r = R;
  this.maxspeed = speedv/10;    // Maximum speed
  this.maxforce = steeringv/1000; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids);   // Separation
  var ali = this.align(boids);      // Alignment
  var coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  // var desiredseparation = 25.0;
  var steer = createVector(0,0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position,boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  //var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < a_neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum,this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0,0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  //var neighbordist = 50;
  var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < c_neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0,0);
  }
}



