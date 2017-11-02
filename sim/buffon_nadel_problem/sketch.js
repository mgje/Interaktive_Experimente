/*
 * Buffon Nadel Problem
 * from 
 * by mgje https://www.youtube.com/watch?v=_CbZMm8rOF4&t=30s
 */

//global Var
let nr_of_line = 16; // >4
let xlines = [];
let x0,dx;
let px0,px1,py0,py1;
let N = 0;
let Nint = 0;
let Niter = 100;
let needle;

//Display Var
let outs,outN,outI;
let outPi,outPiApprox, outPiForm;
let speeds,outspeed;

function setup() {
  createCanvas(800, 400);
  stroke(0,0,0);
  background(255,255,255);
  x0 = 10;
  dx = int((width-2*x0)/(nr_of_line-1));
  for (let i = 0; i < nr_of_line; i++) {
    xlines[i] = x0+i*dx
  }
  
  definePlayField();
  

  //init Output Elements
  outN = createElement('h2', '');
  outN.position(20, 500);
  outN.style('font-size: 24px; color: white');

  outI = createElement('h2', '');
  outI.position(20, 530);
  outI.style('font-size: 24px; color: white');

  outPiApprox = createElement('h2', '');
  outPiApprox.position(315, 500);
  outPiApprox.style('font-size: 24px; color: white');

  outPi = createElement('h2', '');
  outPi.position(315, 530);
  outPi.style('font-size: 24px; color: white');
  outs="&#960; &nbsp; &nbsp; &nbsp; &nbsp; = "+Math.PI+" ...";
  outPi.html(outs);

  outPiForm = createElement('h2', '');
  outPiForm.position(315, 450);
  outPiForm.style('font-size: 24px; color: white');
  outs="&#960;_sim = 2 * throws / intersections";
  outPiForm.html(outs);

  speeds = createSlider(1, 12, 3);
  speeds.position(30,470);
  outspeed = createElement('div', '');
  outspeed.position(50, 445);
  outspeed.style('font-size: 24px; color: white');
  outs="s = "+Math.pow(2, speeds.value());
  outspeed.html(outs);
   
}




function draw() {
  background(255,255,255,20);
  drawgrid();
  
  Niter = Math.pow(2, speeds.value());
  outs="s = "+Niter;
  outspeed.html(outs);

  // draw x times
  for (var i = 0; i < Niter; i++) {
    needle = randomNeedle();
    N +=1;
    if (checkIntersect(needle)){
      Nint += 1;
    }
    drawNeedle(needle);
  }

 

  displayStat();

   
}

function displayStat(){
  
  outs="throws &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; = "+N;
  outN.html(outs);

  outs="intersections = "+Nint;
  outI.html(outs);

  outs="&#960;_sim = "+2*N/Nint;
  outPiApprox.html(outs);
}


function checkIntersect(arr){
  for (var i = 0; i < nr_of_line; i++) {
    if (arr[0]<xlines[i]&&arr[2]>xlines[i]||arr[0]>xlines[i]&&arr[2]<xlines[i]){
      return true;
    }
  }
  return false;

}

function drawgrid(){
  for (var i = 0; i < xlines.length; i++) {
    line(xlines[i],0,xlines[i],height);
  }
}

function definePlayField(){
  px0 = xlines[1];
  px1 = xlines[nr_of_line-2];
  py0 = dx;
  py1 = height-dx;

}

function drawNeedle(arr){
  line(arr[0],arr[1],arr[2],arr[3]);
}

function randomNeedle(){
  let x = px0+random(px1-px0);
  let y = py0+random(py1-py0);
  //ellipse(x,y,20,20);
  let w = random()*2*Math.PI;
  let x1 = x+Math.cos(w)*dx;
  let y1 = y+Math.sin(w)*dx;
  return [x,y,x1,y1]
}



