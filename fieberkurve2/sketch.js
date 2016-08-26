// Martin Guggisberg, Sept 2016
// http://mgje.github.com

 /**
 * Author Martin Guggisberg at unibas dot ch, Sept 2014
 * 
 * KEYS
 * SPACE             : restart
 * f                 : faster
 * s                 : slower
 * +                 : increase total-number
 * -                 : decrease total-number
 * 1                 : increase ping-number
 * 2                 : decrease ping-number
 * 3                 : increase pong-number
 * 4                 : decrease pong-number
 * [                 : decrease x - scale
 * ]                 : increase x - scale
 * }                 : decrease y - scale
 * {                 : increase y - scale
 * .                 : decrease point size
 * ,                 : increase point size
 */

var circleX1, circleY1,
    circleX2, circleY2,
    plotX1, plotY1,
    plotX2, plotY2,
    labelX, labelY,
    ZMax,
    ping, pong,n,counter,  
    xMin, xMax,yMin, yMax,
    years,
    x_,
    y_,
    r_k =10,speed =20,
    xvarerval = 10,
    yvarerval = 2,
    yvarervalMinor = 1,  
    stroke_size,
    myCanvas;

function setup() {
  myCanvas = createCanvas(1000, 600); 
  myCanvas.parent('canvasWrapper');
  
  n     = 17;
  ping  = 5;
  pong  = 7;
  ZMax  = 500;  
  x_= [];
  y_= [];
  
   
  calcPingPong();
  
  stroke_size = 8;
  xMin = 0;
  xMax = 150;
  
  yMin = -10;
  yMax = 10;
  counter = 0;
  
  // Corners of the plotted time series
  plotX1 = 260; 
  plotX2 = width - 30;
  labelX = 30;
  plotY1 = 60;
  plotY2 = height - 280;
  labelY = height - 222;
  
  // Corner of the plotted CircleArea
  circleX1 = labelX + 10; 
  circleX2 = plotX1 - 33;
  circleY1 = height/2-(circleX2-circleX1)/2-110;
  circleY2 = height/2 +(circleX2-circleX1)/2-110;

  smooth();
}


function draw() {
  
  if (frameCount%speed==0){
   drawPlotArea();
   drawCircleArea();
   drawTitle();
   drawinfoPanel();
   drawAxisLabels();
   drawXLabels();
   drawYLabels();
   if (counter < xMax-1){
     counter = counter + 1;
   } else { 
     counter =1;
   }    
   stroke('#5679C1');
   strokeWeight(stroke_size);
   drawDataPoints(counter);
   strokeWeight(r_k);
   drawfillKreis(y_[counter-1]);
   noFill();
   strokeWeight(stroke_size/5);
   drawDataLine(counter);  
   drawCircles(); 
   writeNum(); 
  }  
}

function calcPingPong(){
  var step  = 1;
  var pos   = 0;
  for (var i= 0; i < ZMax; i++){
    x_[i]=i;  
    y_[i]=pos;
    //XOR
    if ((i % ping==0)^(i % pong==0))
      step = step * (-1);
    pos = pos + step;
    
  }
}

function drawPlotArea(){
  background(224);
  
  // Show the plot area as a white box  
  fill(255);
  rectMode(CORNERS);
  noStroke();
  rect(plotX1, plotY1, plotX2, plotY2);
  fill(0);
  stroke(128);
  strokeWeight(2);
  line(plotX1, plotY1, plotX1, plotY2);
  line(plotX2, plotY1, plotX2, plotY2);
  line(plotX1, plotY1, plotX2, plotY1);
  line(plotX1, plotY2, plotX2, plotY2);
}  

function drawCircleArea(){
  // Show the plot area as a white box  
  fill(255);
  rectMode(CORNERS);
  noStroke();
  rect(circleX1, circleY1, circleX2, circleY2);
  fill(0);
  stroke(128);
  strokeWeight(0.5);
  line(circleX1, circleY1, circleX1, circleY2);
  line(circleX2, circleY1, circleX2, circleY2);
  line(circleX1, circleY1, circleX2, circleY1);
  line(circleX1, circleY2, circleX2, circleY2);
} 

function drawTitle() {
  fill(0);
  textSize(20);
  textAlign(LEFT);
 var title = "Ping-Pong Fieberkurve    , n: "+n+"    ,   Ping-Zahl: "+ping+"  ,  Pong-Zahl: "+pong;
  text(title, plotX1, plotY1 - 10);
}

function drawAxisLabels() {
  fill(0);
  textSize(18);
  textLeading(15);
  
  var x = labelX;
  var y = (plotY1+plotY2)/2;
  textAlign(CENTER,BOTTOM);
  push();
  translate(x,y);
  rotate(-HALF_PI);
  text("Position",0,0);
  pop();
  textAlign(CENTER);
  text("Zahl", (plotX1+plotX2)/2, labelY);
}

function drawXLabels() {
  fill(0);
  textSize(15);
  textAlign(CENTER);
  
  // Use thin, gray lines to draw the grid
  stroke(224);
  strokeWeight(1);
  
  for (var x = 1; x < xMax; x++) {
    if (x_[x] % xvarerval == 0) {
      var xpos = map(x_[x], xMin, xMax, plotX1, plotX2);
      text(""+x_[x], xpos, plotY2 + textAscent() + 10);
      line(xpos, plotY1, xpos, plotY2);
      stroke(128);
      line(xpos, plotY2+4, xpos, plotY2);     // Draw major tick
      stroke(224);
    }
  }
}

function drawYLabels() {
  fill(0);
  textSize(15);
  textAlign(RIGHT);
  stroke(128);
  strokeWeight(1);
  for (var v = yMin+yvarervalMinor; v < yMax; v += yvarervalMinor) {
    if (v % yvarervalMinor == 0) {     // If a tick mark
      var y = map(v, yMin, yMax, plotY2, plotY1);  
      if (v % yvarerval == 0) {        // If a major tick mark
        var textOffset = textAscent()/2;  // Center vertically
        if (v == yMin) {
          textOffset = 0;                   // Align by the bottom
        } else if (v == yMax) {
          textOffset = textAscent();        // Align by the top
        }
        text(floor(v), plotX1 - 10, y + textOffset);
        line(plotX1 - 4, y, plotX1, y);     // Draw major tick
        stroke(224);
        line(plotX1, y, plotX2, y);
        stroke(128);
      } else {
        line(plotX1 - 2, y, plotX1, y);     // Draw minor tick
      }
    }
  }
}

function drawDataPoints(tMax) {

  for (var t = 1; t < tMax; t++) {
      var value = y_[t];
      
      var x = map(t, xMin, xMax, plotX1, plotX2);
      var y = map(value, yMin, yMax, plotY2, plotY1);

      
      stroke("#5679C1");
      if ((t % ping==0)&&(t % pong==0)){
        stroke("#990000");}
        point(x, y);    
      }
}

function drawCircles(){
  for (var i = 0; i < n; i++){
    drawKreis(i);
  }
}

function drawKreis(k){
   var x0=cos(k*2*PI/n);
   var y0=sin(k*2*PI/n);
   stroke(0);
   var x = map(x0, -1.1, 1.1, circleX1, circleX2);
   var y = map(y0, -1.1, 1.1, circleY2, circleY1);
   ellipse(x,y, r_k, r_k);
}

function drawfillKreis(k){
   var x0=cos(k*2*PI/n);
   var y0=sin(k*2*PI/n);
   stroke("#5679C1");
   var x = map(x0, -1.1, 1.1, circleX1, circleX2);
   var y = map(y0, -1.1, 1.1, circleY2, circleY1);
   point(x, y);
}


function drawDataLine(tMax) {  
  beginShape();
  for (var t = 1; t < tMax; t++) {
      var value = y_[t];
      var x = map(t, xMin, xMax, plotX1, plotX2);
      var y = map(value, yMin, yMax, plotY2, plotY1);      
      vertex(x, y);
  }
  endShape();
}

function writeNum(){
 var s;
  if (((counter-1)%ping==0)&&((counter-1)%pong==0)){
      s="Ping-Pong";
  }else{ 
    if ((counter-1)%ping==0) {
       s="Ping";
    }else { 
       if((counter-1)%pong==0){
          s="Pong";
       }else{
          s=""+counter-1;   
       }
    }
  }
  
  //fill(155);
  //noStroke();
  //rect(circleX1+20,circleY1+30, 80, 40);   
  fill(color(0,0,0));
  //textFont(fontA, 28);
  textSize(18);
  textLeading(15);
  textAlign(CENTER);
  text(s,circleX1+90,circleY1+95);
}

function drawinfoPanel(){

}

function incnumber(){
   if (n < 40) {
      n = n + 1;
    }
}

function decnumber(){
   if (n > 4) {
      n = n - 1;
    }
}

function incping(){
    if (ping < 100) {
      ping = ping + 1;
      calcPingPong();
    }
}

function decping(){
  if (ping > 2) {
      ping = ping - 1;
      calcPingPong();
    }
}

function incpong(){
  if (pong < 100) {
      pong = pong + 1;
      calcPingPong();
    }
}

function decpong(){
  if (pong > 3) {
      pong = pong - 1;
      calcPingPong();
    }
}



function keyPressed() {
  if (key == 'q') {
    if (xMax > 5) {
      xMax = xMax - 4;
    }
  } else if (key == 'w') {
    if (xMax < ZMax-5) {
      xMax = xMax + 4;
    }
  } else if (key == 'b') {
    if (yMax < 40) {
      yMax = yMax + 1;
      yMin = yMin - 1;
    }
  }else if (key == 'v') {
    if (yMax > 3) {
      yMax = yMax - 1;
      yMin = yMin + 1;
    }
  }else if (key == ',') {
    if ( stroke_size < 15) {
      stroke_size = stroke_size + 1;
    }
  }else if (key == '.') {
    if (stroke_size > 3) {
      stroke_size = stroke_size - 1;
    }
  }else if (key == '2') {
    if (ping > 2) {
      ping = ping - 1;
      calcPingPong();
    }
  }else if (key == '1') {
    if (ping < 100) {
      ping = ping + 1;
      calcPingPong();
    }
  }else if (key == '4') {
    if (pong > 3) {
      pong = pong - 1;
      calcPingPong();
    }
  }else if (key == '3') {
    if (pong < 100) {
      pong = pong + 1;
      calcPingPong();
    }
  }else if (key == '-') {
    if (n > 4) {
      n = n - 1;
    }
  }else if (key == '+') {
    if (n < 40) {
      n = n + 1;
    }
  }else if (key == ' ') {
     counter =0;
  }else if (key == 'f') {
    if (speed > 3) {
      speed = speed - 1;
    }
  }else if (key == 's') {
    if ( speed < 100) {
      speed = speed + 1;
    }
  }
}



