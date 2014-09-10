 /**
 * Author Martin Guggisberg at unibas dot ch, Sept 2011
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
 * p/P               : save pdf
 */   

import processing.pdf.*;
import java.util.Calendar;

float t;
int counter,pos,oldpos,step,n,r_k,dimx,R,ping,pong;
int schale,kor;
PFont fontA;
String s;
int speed;
color blob;
boolean  showhelp=false;

void drawKreis(int k){
   int x=(int)(sin(k*2*PI/n)*R);
   int y=(int)(cos(k*2*PI/n)*R);
   smooth();
   stroke(0);
   strokeWeight(1);
   ellipse(x+width/2,y+height/2, r_k, r_k);
   strokeWeight(1);
}

void kreiseZeichnen(){   
   noFill();
   stroke(229);
   for (int i=0; i<34; i++){
       ellipse(width/2,height/2, 160+i*14, 160+i*14);
    }
}

void LinienZeichnen(){
   noFill();
   stroke(209);
   //R=int(1.0*n/5.5*r_k+1.0*r_k/n);
  //  if (R < 60)
      R = 60;
   for (int i=0; i<n; i++){
     int x1=(int)(sin(i*2*PI/n)*(R+20));
     int y1=(int)(cos(i*2*PI/n)*(R+20));  
     int x2=(int)(sin(i*2*PI/n)*(R+250));
     int y2=(int)(cos(i*2*PI/n)*(R+250)); 
     line(width/2+x1,height/2+y1,width/2+x2,height/2+y2);   
   }
}

void initdraw(){
  
  fill(color(255,140));
  for (int i=0; i<n; i++){
       drawKreis(i);
  }
  
  
  
}

void initbackground(){
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
  String skey = "Press h for help";
  text(skey, 10, 790); 
}

void pingpongvalue(){
  fill(255);
  noStroke();
  rect(0,0, 80, 80);

  textFont(fontA, 16);
  textAlign(LEFT);
  String s1 = "Ping = "+String.valueOf(ping);
  String s2 = "Pong = "+String.valueOf(pong);
  String s3 = "n = "+String.valueOf(n);
  fill(color(0,0,160));
  text(s1,10,20);
  fill(color(0,160,0));
  text(s2,10,40);
  fill(0);
  text(s3,10,60);
}

void setup()
  {
    ping=3;
    pong=4;
    speed=30;
    pos=0;
    counter=1;
    step=1;
    n=8;
    r_k=22;
   
    fontA = createFont("Helonia-Bold-36.vlw",28);
    //fontA = loadFont("Helonia-Bold-36.vlw");
    textAlign(CENTER);
    textFont(fontA, 28);
     
    size(800,800);
    
    initbackground();
    initdraw();    
    
   
    s=String.valueOf(counter);   
    pingpongvalue();
  }

void writeNum(){
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
          s=String.valueOf(counter);   
          blob = color(160,160,160);  
          kor=0;
       }
    }
  }
  
  
  fill(255);
  noStroke();
  rect(width/2-40,height/2-14, 80, 30);   
  fill(color(0,0,0));
  textFont(fontA, 28);
  textAlign(CENTER);
  text(s,width/2,height/2+9);
}

void drawcurve(){
  int r=R+20+schale*7;
  stroke(98);
  noFill();
  float w1=(pos-step)*2*PI/n;
  float w2=pos*2*PI/n;
  if (w1 > w2)
      arc(width/2,height/2, r*2, r*2,2.5*PI-w1,2.5*PI-w2);
  else
      arc(width/2,height/2, r*2, r*2,2.5*PI-w2,2.5*PI-w1);
  //arc(width/2,height/2, r*2, r*2,pos*2*PI/n,(pos-step)*2*PI/n);
}

void drawblob(){
  int r=R+20+schale*7;
  int x=(int)(sin(pos*2*PI/n)*(r-kor));
  int y=(int)(cos(pos*2*PI/n)*(r-kor)); 
  fill(blob);
  noStroke();
  ellipse(x+width/2,y+height/2, 8, 8);
}


  
  
void draw()
{
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


void keyPressed() {
  switch(key) {
    case ' ': counter = 0;pos=0;step=1;initbackground();initdraw();break;
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


// timestamp
String timestamp() {
  Calendar now = Calendar.getInstance();
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", now);
}

void infoPanel(){
  if (showhelp){
     showhelp = false;
     counter = 0;
     pos=0;
     step=1;
     initbackground();
     initdraw();
    }else{
     showhelp = true;
     fill(color(54,54,54));
     textAlign(LEFT);
     textSize(24);
     String sk = "Keys / Aktionstasten";
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

void savepdf(){
  //clear
  background(255);

  PGraphics pdf=beginRecord(PDF, timestamp()+".pdf");
  int maxCounter = counter;
  maxCounter = 55;
  smooth();
  noStroke();
  initbackground();
  initdraw();
  //beim Anfang beginnen
  pos=1;
  step=1;
  counter=1; 
  
  for (int c=0; c<maxCounter; c  ++){
    
    
    drawcurve();
    writeNum();
    drawblob();
    counter = counter +1;
    pos = pos+step;

  }
  
  fill(color(117,215,0));
  drawKreis(pos-step);
 
  
  endRecord();
  

}
