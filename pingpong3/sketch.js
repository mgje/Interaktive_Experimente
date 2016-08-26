// Martin Guggisberg
// http://mgje.github.com


var t,
    counter,pos,oldpos,step,n,nn,r_k,dimx,R,ping,pong,r,
    schale,kor,
    fontA,
    s,
    speed,
    blob,
    showhelp=false;

function drawKreis(k){
   x=Math.round(Math.sin(k*2*Math.PI/n)*R);
   y=Math.round(Math.cos(k*2*Math.PI/n)*R);
   ellipse(x+width/2,y+height/2, r_k, r_k);
}

// Hintergrund Kreise
function kreiseZeichnen(){   
   noFill();
   stroke(229);
   for (i=0; i<34; i++){
       ellipse(width/2,height/2, 160+i*14, 160+i*14);
    }
}

function LinienZeichnen(){
  noFill();
  stroke(209);
  R = 60;
  for (i=0; i<n; i++){
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
  for (i=0; i<n; i++){
       drawKreis(i);
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
 s = "Press h for help";
 text(s, 10, 790); 
}

// Anzeige oben links
function pingpongvalue(){
  var s1,s2,s3;
  fill(255);
  noStroke();
  rect(0,0, 160, 88);

  textAlign(LEFT);
  s1 = "Ping = "+ping;
  s2 = "Pong = "+pong;
  s3 = "n = "+n;
  fill(color(0,0,160));
  text(s1,10,20);
  fill(color(0,160,0));
  text(s2,10,42);
  fill(0);
  text(s3,10,64);
}

function setup(){
    // START init variables
    ping=3;
    pong=4;
    speed=23;
    pos=0;
    counter=1;
    step=1;
    n=8;
    r_k=22;
     
    myCanvas = createCanvas(800, 800); 
    myCanvas.parent('canvasWrapper');
    initbackground();
    initdraw();    

    s=counter.toString();
    pingpongvalue();

    //User Interface
    
    //so = select("#btn_soundon");
    //so.mousePressed(restart);

    select("#btn_restart").mousePressed(restart);
    select("#btn_pingp").mousePressed(incping);
    select("#btn_pingm").mousePressed(decping);
     select("#btn_pongp").mousePressed(incpong);
    select("#btn_pongm").mousePressed(decpong);

    //select('#slidergamespeed').changed(setspeed);
    

 }

function writeNum(){
  if ((counter%ping==0)&&(counter%pong==0)){
      pingpongsound.play("pingpong");
      s="PiPo";
      blob = color(230,0,0);
      kor=0;
  }else{ 
    if (counter%ping==0) {
       s="Ping";
       pingpongsound.play("ping");
       blob = color(0,0,160);
       kor=3;
       step= step*(-1);
       schale=schale+1;
    }else { 
       if(counter%pong==0){
          pingpongsound.play("pong");
          s="Pong";
          blob = color(0,160,0);
          kor=3;
          step = step*(-1);
          schale=schale+1;
       }else{
          pingpongsound.play("tac");
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
  r=R+20+schale*7;
  x=Math.round(Math.sin(pos*2*Math.PI/n)*(r-kor));
  y=Math.round(Math.cos(pos*2*Math.PI/n)*(r-kor)); 
  fill(blob);
  noStroke();
  ellipse(x+width/2,y+height/2, 8, 8);
}

function draw(){
  speed = round(110.0/select('#slidergamespeed').value());
  nn = constrain(round(select('#slidernumber', 1, 35);
    if (nn != n) {
        setnumber(nn);
    }

  if (frameCount%speed==0){
    initdraw();
    counter = counter + 1;
    pos = pos+step;
    fill(color(117,215,0));
    drawKreis(pos);
    drawcurve();
    writeNum();
    drawblob();
  
  }  
}

//Events
// KEYS
// SPACE             : restart
// f                 : faster
// s                 : slower
// +                 : increase total-number
// -                 : decrease total-number
// 1                 : increase ping-number
// 2                 : decrease ping-number
// 3                 : increase pong-number
// 4                 : decrease pong-number
function keyPressed() {
  switch(key) {
    case ' ': counter = 1;pos=0;step=1;initbackground();initdraw();break;
    case 'f': speed--; break;
    case 's': speed++; break;
    case '+': n++;initbackground();break;
    case '-': n--;initbackground();break;
    case '1': ping++; break;
    case '2': ping--; break;
    case '3': pong++; break;
    case '4': pong--; break;
    case 'p': savepdf();break;
    case 'P': savepdf();break;
    case 'h': infoPanel();break;
    case 'H': infoPanel();break;
  }
  speed = constrain(speed, 1, 80);
  ping = constrain(ping, 1, 100);
  pong = constrain(pong, 1, 100);
  n = constrain(n, 1, 35);
  pingpongvalue();
}

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
  speed = Math.round(1.0/sp * 70);
}

function infoPanel(){
  if (showhelp){
     showhelp = false;
     counter = 1;
     pos=0;
     step=1;
     initbackground();
     initdraw();
    }else{
     showhelp = true;
     fill(color(54,54,54));
     textAlign(LEFT);
     textSize(24);
     sk = "Keys / Aktionstasten";
     text(sk, 240, 660); 
     textSize(21);
     s = "Space / Leertaste: Neustart";  
     text(s, 240, 692); 
     s = "f  : faster / schneller     s: slower / langsamer"; 
     text(s, 240, 716); 
     s = "+ : erhöhen                  -: verkleinern (Anzahl Spieler)" ;
     text(s, 240, 740);
      s = "1 : Ping erhöhen           2: Ping verkleinern "; 
     text(s, 240, 764);  
      s = "3 : Pong erhöhen          4: Pong verkleinern "; 
     text(s, 240, 788);  
   }
}



