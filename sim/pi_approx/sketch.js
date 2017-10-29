/*
* Buffon Nadel Problem
* from
* by mgje https://www.youtube.com/watch?v=_CbZMm8rOF4&t=30s
*/

//global Var
let P,x,y,N,N_in,d2,R2;
let Niter, speedv;

//Display Var
let outs,outN,outI;
let outPi,outPiApprox, outPiForm;
let speeds,outspeed;

function setup() {
  createCanvas(600, 600);
  background(255,255,255);
  ellipse(width/2,height/2,width,height);
  noSmooth();
  N = 0;
  N_in = 0;
  R2 = width*width/4;
  //init Output Elements
  outN = createElement('h2', '');
  outN.position(640, 300);
  outN.style('font-size: 24px; color: white');

  outI = createElement('h2', '');
  outI.position(640, 350);
  outI.style('font-size: 24px; color: white');

  outPiApprox = createElement('h2', '');
  outPiApprox.position(640, 400);
  outPiApprox.style('font-size: 24px; color: white');

  outPi = createElement('h2', '');
  outPi.position(640, 450);
  outPi.style('font-size: 24px; color: white');
  outs="&#960; &nbsp; &nbsp; &nbsp; &nbsp; = "+Math.PI+" ...";
  outPi.html(outs);

  speeds = createSlider(1, 14, 3);
  speeds.position(640,70);
  outspeed = createElement('div', '');
  outspeed.position(650, 45);
  outspeed.style('font-size: 24px; color: white');
  outs="s = "+Math.pow(2, speeds.value());
  outspeed.html(outs);
}

function draw() {
  speedv = speeds.value();
  if (frameCount % (16-speedv)===0){
    background(255,255,255,10);
    stroke(0);
    noFill();
    ellipse(width/2,height/2,width,height);
  }
  Niter = Math.pow(2, speedv);
  for (var i = 0; i < Niter; i++) {
    P = randomDot();
    x = P[0]-width/2;
    y = P[1]-height/2;
    d2 = x*x+y*y;
    //console.log(x,y,d2,R2);
    if (d2 <= R2){
      stroke(255,0,0);
      N_in += 1;
    } else {
      stroke(0,0,255);
    }
    drawDot(P);
    N += 1;
  }

  Niter = Math.pow(2, speeds.value());
  outs="s = "+Niter;
  outspeed.html(outs);
  displayStat();
}

function displayStat(){
  outs="N_total  = "+N;
  outN.html(outs);

  outs="N_circle = "+N_in;
  outI.html(outs);

  outs="&#960;_sim = "+4*N_in/N;
  outPiApprox.html(outs);
}


function drawDot(arr){
  point(arr[0],arr[1]);
}

function randomDot(){
  let x = random(height);
  let y = random(width);
  return [x,y]
}
