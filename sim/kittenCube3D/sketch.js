
let w = 600;
let angle = 2.0;
let img;

function preload(){
  img = loadImage("img/kitten.jpg");
}


function setup() {
  createCanvas(w, w, WEBGL);
  //ortho(-width, width, height, -height/2, 0.1, 100);
}


function draw() {
   background(155);
   // rectMode(CENTER);
   // fill(0,0,255);
   // noStroke();




  // ambientLight(255,255,255);
  //
  //
  rotateX(angle+1.2);
  rotateY(angle+1.5);
  rotateZ(angle);
  //

  texture(img);
  box(100);
  //rect(0,0,150,150);
  angle = angle + 0.03;
  //console.log(angle);


}
