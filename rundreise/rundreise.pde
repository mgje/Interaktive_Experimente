  /**
 * Copyright (c) 2014 Martin Guggisberg
 * 
 * This demo & library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * http://creativecommons.org/licenses/LGPL/2.1/
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */
 
 

/** 
 * Handelsreisender.pde
 */

PFont myFont; 

//Layout Parameters
int videoScale = 47;
int offsetx=15;
int offsety=65;

// Number of columns and rows in our system
int cols, rows;

//Cities
int N = 83;
ArrayList<String> cities;
ArrayList<Integer> xkoords;
ArrayList<Integer> ykoords;
int[] path;
double distance;
String solution;
DistanceMatrix d;
SimulatedAnnealing annealing;
boolean showtext=false;
PFont mono;

void setup() {
  hint(ENABLE_RETINA_PIXELS);
  mono = loadFont("AndaleMono-48.vlw");
  textFont(mono,36);
  

   size(700,  920,"processing.core.PGraphicsRetina2D");  
   smooth();

  // Cities
  cities = new ArrayList<String>();
  xkoords = new ArrayList<Integer>();
  ykoords = new ArrayList<Integer>();
  
  drawGrid();
  genCities(N);
  drawCities(); 
  initCalcTSP();
  nextCalcTSP(); 
  drawSolution();
  drawTitle();
  //endRecord();
}


void draw() {   
 if (keyPressed == true) {
  nextCalcTSP(); 
  drawGrid();
  drawCities();
  drawTitle(); 
  drawSolution();
 }
}



void drawTitle(){
  textAlign(LEFT);
  fill(0);
  //String s=Double.toString(distance/100);
  textFont(mono,36);
  text("Rundreise durch "+ N + " Orte ",20,55);
  text("Länge = "+ Math.round(distance*10)/10+" km",20,755);
  textFont(mono,24);
  text("Tastenbelegung   +/-: mehr/weniger Orte",20,788);
  text("Space: Bessere Rundreise suchen",20,814);
  text("S: Experiment neu starten",20,836);
}

void drawGrid(){
  stroke(99);
  strokeWeight(0.8);
  noFill();
  smooth();
  background(255);

  
  //myFont = createFont("Monospaced",24,true);
  textAlign(CENTER);
  cols = width/videoScale;
  //rows = height/videoScale;
  rows = cols;
  
  // Draw Grid
  // Begin loop for columns
  for (int i = 0; i < cols; i++) {
    // Begin loop for rows
    for (int j = 0; j < rows; j++) {
      // Scaling up to draw a rectangle at (x,y)
      int x = i*videoScale+offsetx;
      int y = j*videoScale+offsety;
      // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
      rect(x,y,videoScale,videoScale); 
    }
  }
}


void drawSolution(){
  color c = color(255, 0, 0);
  stroke(c);
  strokeWeight(1.0);
  for(int j = 0; j < path.length-1; j++) {
   int x1=xkoords.get(path[j]);
   int y1=ykoords.get(path[j]);
   int x2=xkoords.get(path[j+1]);
   int y2=ykoords.get(path[j+1]);
   line(x1,y1,x2,y2);  
  
  }
  //close
  int x1=xkoords.get(path[0]);
   int y1=ykoords.get(path[0]);
   int x2=xkoords.get(path[path.length-1]);
   int y2=ykoords.get(path[path.length-1]);  
  line(x1,y1,x2,y2);  
  
  textAlign(LEFT);
  if (showtext){
    fill(0);
    text("Lösung: "+solution,20,775);
  }
  
}  


void genCities(int N){
  int x=0;
  int y=0; 
  for (int m=0; m<N; m++){
      boolean one_city=true;
      while(one_city){
        x =  int(random(cols-1)+1)*videoScale+offsetx;
        y =  int(random(rows-1)+1)*videoScale+offsety;
        int index = xkoords.indexOf(x);
        if (index== -1){
          one_city=false;
        }else{
          if (ykoords.get(index)!=y){
            one_city=false;
          }
        }
      }
      char c = (char) (m+97); // c is now 'a' 
    String s ="";
    s += c+" "+Integer.toString(x)+" "+Integer.toString(y);
      cities.add(s);
      xkoords.add(x);
      ykoords.add(y);
  }  
  
}

void drawCities(){
  int x,y;
  int r = 25;
  color co = color(0, 12, 53);
  stroke(co);
  strokeWeight(1.3);
  for(int j = 0; j < xkoords.size(); j++) {
    x=xkoords.get(j);
    y=ykoords.get(j);
    fill(255);
    ellipse(x,y,r,r);
    //textFont(myFont);       
    fill(0);
    char c = (char) (j+97); 
    if (showtext){
      text(c,x,y+6);
    }
  }
}



void initCalcTSP(){
//print("Start TSP");

// build the matrix with the distances 
  d = new DistanceMatrix(cities);
  double[][] distanceMatrix = d.getDistanceMatrix();

//do simulated annealing
	
  annealing = new SimulatedAnnealing(d);
  annealing.initSimulatedAnnealing();
  annealing.runSimulatedAnnealing();

//annealing.simulatedAnnealing();
		
  path=annealing.getPath();

  solution ="";
  for(int j = 0; j < path.length; j++) {
    char c = (char) (path[j]+97); // c is now 'a' 
    solution += c;
  }
}

void nextCalcTSP(){
  annealing.runSimulatedAnnealing();		
  path=annealing.getPath();
  distance=annealing.getCost();
}

void keyPressed() {
  if (key == 'S' || key == 's'){
    drawCities(); 
    initCalcTSP();
    nextCalcTSP(); 
    drawSolution();
    drawTitle();
  }
  
  if (key == '+'){
    N = constrain(N+1,5,140);
    cities.clear();
    xkoords.clear();
    ykoords.clear();
    drawGrid();
    genCities(N);
    drawCities(); 
    initCalcTSP();
    nextCalcTSP(); 
    drawSolution();
    drawTitle();
  }
  
  if (key == '-'){
    N = constrain(N-1,5,140);
    cities.clear();
    xkoords.clear();
    ykoords.clear();
    drawGrid();
    genCities(N);
    drawCities(); 
    initCalcTSP();
    nextCalcTSP(); 
    drawSolution();
    drawTitle();
  }
  
}

