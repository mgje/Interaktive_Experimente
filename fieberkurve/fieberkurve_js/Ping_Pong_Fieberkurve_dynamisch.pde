
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
    xInterval = 10,
    yInterval = 2,
    yIntervalMinor = 1,  
    stroke_size;

void setup() {
  size(980,800);
  
  n     = 17;
  ping 	= 5;
  pong 	= 7;
  ZMax	= 500;	
  x_= new int[ZMax];
  y_= new int[ZMax];
  
   
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


void draw() {
  
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
   stroke(#5679C1);
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

void calcPingPong(){
  int step 	= 1;
  int pos 	= 0;
  for (int i= 0; i < ZMax; i++){
    x_[i]=i;  
    y_[i]=pos;
    //XOR
    if ((i % ping==0)^(i % pong==0))
      step = step * (-1);
    pos = pos + step;
    
  }
}

void drawPlotArea(){
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

void drawCircleArea(){
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

void drawTitle() {
  fill(0);
  textSize(20);
  textAlign(LEFT);
  String title = "Ping-Pong Fieberkurve    , n: "+n+"    ,   Ping-Zahl: "+ping+"  ,  Pong-Zahl: "+pong;
  text(title, plotX1, plotY1 - 10);
}

void drawAxisLabels() {
  fill(0);
  textSize(18);
  textLeading(15);
  
  float x = labelX;
  float y = (plotY1+plotY2)/2;
  textAlign(CENTER,BOTTOM);
  pushMatrix();
  translate(x,y);
  rotate(-HALF_PI);
  text("Position",0,0);
  popMatrix();
  textAlign(CENTER);
  text("Zahl", (plotX1+plotX2)/2, labelY);
}

void drawXLabels() {
  fill(0);
  textSize(15);
  textAlign(CENTER);
  
  // Use thin, gray lines to draw the grid
  stroke(224);
  strokeWeight(1);
  
  for (int x = 1; x < xMax; x++) {
    if (x_[x] % xInterval == 0) {
      float xpos = map(x_[x], xMin, xMax, plotX1, plotX2);
      text(""+x_[x], xpos, plotY2 + textAscent() + 10);
      line(xpos, plotY1, xpos, plotY2);
      stroke(128);
      line(xpos, plotY2+4, xpos, plotY2);     // Draw major tick
      stroke(224);
    }
  }
}

void drawYLabels() {
  fill(0);
  textSize(15);
  textAlign(RIGHT);
  stroke(128);
  strokeWeight(1);
  for (float v = yMin+yIntervalMinor; v < yMax; v += yIntervalMinor) {
    if (v % yIntervalMinor == 0) {     // If a tick mark
      float y = map(v, yMin, yMax, plotY2, plotY1);  
      if (v % yInterval == 0) {        // If a major tick mark
        float textOffset = textAscent()/2;  // Center vertically
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

void drawDataPoints(int tMax) {
  for (int t = 1; t < tMax; t++) {
      float value = y_[t];
      float x = map(t, xMin, xMax, plotX1, plotX2);
      float y = map(value, yMin, yMax, plotY2, plotY1);
      stroke(#5679C1);
      if ((t % ping==0)&&(t % pong==0)){
        stroke(#990000);}
      point(x, y);    
  }
}

void drawCircles(){
  for (int i = 0; i < n; i++){
    drawKreis(i);
  }
}

void drawKreis(int k){
   float x0=cos(k*2*PI/n);
   float y0=sin(k*2*PI/n);
   stroke(0);
   float x = map(x0, -1.1, 1.1, circleX1, circleX2);
   float y = map(y0, -1.1, 1.1, circleY2, circleY1);
   ellipse(x,y, r_k, r_k);
}

void drawfillKreis(int k){
   float x0=cos(k*2*PI/n);
   float y0=sin(k*2*PI/n);
   stroke(#5679C1);
   float x = map(x0, -1.1, 1.1, circleX1, circleX2);
   float y = map(y0, -1.1, 1.1, circleY2, circleY1);
   point(x, y);
}


void drawDataLine(int tMax) {  
  beginShape();
  for (int t = 1; t < tMax; t++) {
      float value = y_[t];
      float x = map(t, xMin, xMax, plotX1, plotX2);
      float y = map(value, yMin, yMax, plotY2, plotY1);      
      vertex(x, y);
  }
  endShape();
}

void writeNum(){
  String s;
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

void drawinfoPanel(){
     var x0 = 40, dy=32, y0=580;
     fill(color(54,54,54));
     textAlign(LEFT);
     textSize(24);
     String sk = "Keys / Aktionstasten";
     text(sk, x0, y0); 
     textSize(21);
     s = "Space / Leertaste: Neustart";  
     text(s, x0, y0+dy); 
     s = "f  : faster / schneller     s: slower / langsamer                       q / w: x-Bereich zoomen"; 
     text(s, x0, y0+2*dy); 
     s = "+ : erhöhen                  -: verkleinern (Anzahl Spieler)          v / b: y-Bereich zoomen";
     text(s, x0, y0+3*dy);
      s = "1 : Ping erhöhen           2: Ping verkleinern "; 
     text(s, x0, y0+4*dy);  
      s = "3 : Pong erhöhen          4: Pong verkleinern "; 
     text(s, x0, y0+5*dy);  
}

void incnumber(){
   if (n < 40) {
      n = n + 1;
    }
}

void decnumber(){
   if (n > 4) {
      n = n - 1;
    }
}

void incping(){
    if (ping < 100) {
      ping = ping + 1;
      calcPingPong();
    }
}

void decping(){
  if (ping > 2) {
      ping = ping - 1;
      calcPingPong();
    }
}

void incpong(){
  if (pong < 100) {
      pong = pong + 1;
      calcPingPong();
    }
}

void decpong(){
  if (pong > 3) {
      pong = pong - 1;
      calcPingPong();
    }
}



void keyPressed() {
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

