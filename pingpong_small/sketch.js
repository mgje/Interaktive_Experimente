// Martin Guggisberg
// http://mgje.github.com
"use strict"

var t,
    counter,pos,oldpos,step,n,nn,r_k,dimx,R,ping,nping,npong,pong,r,
    schale,kor,
    fontA,
    s,x_,y_,
    speed,nspeed,
    blob,
    speedSlider,pingSlider,pongSlider,nSlider,myCanvas,
    showhelp=false,
    SPEED_INV=80;

function drawKreis(k,rr){
   var x,y
   x=Math.round(Math.sin(k*2*Math.PI/n)*R);
   y=Math.round(Math.cos(k*2*Math.PI/n)*R);
   ellipse(x+width/2,y+height/2, rr, rr);
}

// Hintergrund Kreise
function kreiseZeichnen(){   
   noFill();
   stroke(229);
   for (var i=0; i<34; i++){
       ellipse(width/2,height/2, 160+i*14, 160+i*14);
    }
}

function LinienZeichnen(){
  var x1,y1,x2,y2
  noFill();
  stroke(209);
  R = 60;
  for (var i=0; i<n; i++){
      x1=sin(i*2*PI/n)*(R+20);
      y1=cos(i*2*PI/n)*(R+20);  
      x2=sin(i*2*PI/n)*(R+250);
      y2=cos(i*2*PI/n)*(R+250); 
     line(width/2+x1,height/2+y1,width/2+x2,height/2+y2);   
   }
}

function initdraw(){  
  fill(color(255,140));
   smooth();
   stroke(0);
   strokeWeight(1);
  for (var i=0; i<n; i++){
       drawKreis(i,r_k);
  }
}

// Initialisierung den Hintergrund
function initbackground(){
 blob = color(160,160,160);
 kor=0;
 schale=0;
 background(255);
 smooth();
 noStroke();
 kreiseZeichnen();
 LinienZeichnen();
 fill(color(44,44,44));
 textAlign(LEFT);
 textSize(22);
 // s = "Press h for help";
 // text(s, 10, 790); 
}

// Anzeige oben links
function pingpongvalue(){
  var s1,s2,s3,s4;
  fill(255);
  noStroke();
  rect(0,0, 140, 54);
  rect(0,height-70, 140, height);
  rect(width-110,0,width,77);

  textAlign(LEFT);
  s1 = "ping = "+ping;
  s2 = "pong = "+pong;
  s3 = "n = "+n;
  s4 = "speed = "+round(SPEED_INV/speed);
  fill(color(0,0,160));
  text(s1,width-110,20);
  fill(color(0,160,0));
  text(s2,width-110,70);
  fill(0);
  text(s3,10,20);
  text(s4,0,height-30);
}

function setup(){
    // START init variables
    var offset=120;
    ping=3;
    pong=4;
    speed=4;
    pos=0;
    counter=1;
    step=1;
    n=8;
    r_k=22;
     
    myCanvas = createCanvas(600, 600); 
    myCanvas.parent('canvasWrapper');
    initbackground();
    initdraw();    

    s=counter.toString();
    pingpongvalue();
    pingSlider = createSlider(3,14,3);
    pingSlider.parent('canvasWrapper');
    pingSlider.position(width-135,24+offset);

    pongSlider = createSlider(3,14,4);
    pongSlider.parent('canvasWrapper');
    pongSlider.position(width-135,76+offset);

    nSlider = createSlider(4,30,9);
    nSlider.parent('canvasWrapper');
    nSlider.position(0,24+offset);

    speedSlider = createSlider(1,12,3);
    speedSlider.parent('canvasWrapper');
    speedSlider.position(0,height-20+offset);

    select("#btn_restart").mousePressed(restart);
    smooth();


 }

function writeNum(){
  if ((counter%ping==0)&&(counter%pong==0)){
      s="PiPo";
      blob = color(230,0,0);
      kor=0;
  }else{ 
    if (counter%ping==0) {
       s="Ping";
       blob = color(0,0,160);
       kor=3;
       step= step*(-1);
       schale=schale+1;
    }else { 
       if(counter%pong==0){
          s="Pong";
          blob = color(0,160,0);
          kor=3;
          step = step*(-1);
          schale=schale+1;
       }else{
          s=counter.toString();   
          blob = color(160,160,160);  
          kor=0;
       }
    }
  }
} 
  
function drawcurve(){
    var r,w1,w2;
    r=R+20+schale*7;
    stroke(98);
    noFill();
    w1=(pos-step)*2*Math.PI/n;
    w2=pos*2*Math.PI/n;
    if (w1 > w2){
      arc(width/2,height/2, r*2, r*2,2.5*PI-w1,2.5*PI-w2);
    } else {
      arc(width/2,height/2, r*2, r*2,2.5*PI-w2,2.5*PI-w1);
    }
}
//Punkte Zeichnen
function drawblob(){
  var r,x,y
  r=R+20+schale*7;
  x=Math.round(Math.sin(pos*2*Math.PI/n)*(r-kor));
  y=Math.round(Math.cos(pos*2*Math.PI/n)*(r-kor)); 
  fill(blob);
  noStroke();
  ellipse(x+width/2,y+height/2, 8, 8);
}


// Main LOOP
function draw(){
  nspeed = Math.round(1.0/speedSlider.value()*SPEED_INV);
  if (nspeed != speed){
    setspeed(nspeed);
  }

  nn = nSlider.value();
  if (nn != n){
    setnumber(nn);
  }
  nping = pingSlider.value();
  if (nping != ping){
    setpingnumber(nping);
  }


  npong = pongSlider.value();
  if (npong != pong){
    setpongnumber(npong);
  }


  if (frameCount%speed==0){
    //initdraw();
    fill(color(255,255,255));
    drawKreis(pos,r_k*0.90);
    counter = counter + 1;
    pos = pos+step;
    fill(color(117,215,0));
    drawKreis(pos,r_k*0.90);
    drawcurve();
    writeNum();
    drawblob();
    x_=width/2-20;
    y_=height/2+10;
    fill(255);
    noStroke();
    rect(x_,y_-30,58,50);
    fill(44);
    text(s,x_,y_);

  }  
}

// Methods
function incnumber(){
  n++;
  n = constrain(n, 1, 35);
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function setnumber(numb){
  n=numb;
  n = constrain(n, 1, 35);
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function decnumber(){
  n--;
  n = constrain(n, 1, 35);
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function incping(){
  ping++;
  
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function setpingnumber(pingnumb){
  ping=pingnumb
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function decping(){
  ping--;
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function incpong(){
  pong++;
  n = constrain(n, 1, 35);
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function setpongnumber(pongnumb){
  pong=pongnumb
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function restart(){
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function decpong(){
  pong--;
  n = constrain(n, 1, 35);
  counter = 1;pos=0;step=1;
  initbackground();
  initdraw();
  pingpongvalue();
}

function setspeed(sp){
  // speed = Math.round(1.0/sp * SPEED_INV);
  speed = sp;
  pingpongvalue();
}

