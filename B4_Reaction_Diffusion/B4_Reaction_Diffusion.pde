// CAS Informatik am Gymnasium
// Modellierung und Simulation (MS)
// modified by Martin Guggisberg
// originally developed by Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/BV9ny785UNc

// Written entirely based on
// http://www.karlsims.com/rd.html

// Also, for reference
// http://hg.postspectacular.com/toxiclibs/src/44d9932dbc9f9c69a170643e2d459f449562b750/src.sim/toxi/sim/grayscott/GrayScott.java?at=default

Cell[][] next;
Cell[][] grid;

float dA = 1;
float dB = 0.5;
float feed = 0.055;
float k = 0.062;

int count    = 0;
int interval = 56;

class Cell {
  float a;
  float b;

  Cell(float x, float y) {
    a = x;
    b = y;
  }
}

void setup() {
  size(600, 400);
  colorMode(HSB, 100);
  pixelDensity(1);
  
  grid = new Cell[height][width];

  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j ++) {
      grid[i][j] = new Cell(1, 0);
    }
  }
  
  for (int n = 0; n < 20; n++) {
    int startx = int(random(20, height-20));
    int starty = int(random(20, width-20));

    for (int i = startx; i < startx+10; i++) {
      for (int j = starty; j < starty+10; j ++) {
        grid[i][j] = new Cell(1, 1);
      }
    }
  }
}




void draw() {
  //println(frameRate);

  boolean update = ++count >= interval;

  if (update) {
    count = 0;
    loadPixels();
  }

  for (int i = 1; i < height-1; i++) {

    Cell[] above  = grid[i-1];
    Cell[] here   = grid[i];
    Cell[] below = grid[i+1];

    int pos = i * width;

    for (int j = 1; j < width-1; j++) {

      Cell spot = here[j];

      float a = spot.a;
      float b = spot.b;

      Cell left  = here[j-1];
      Cell right = here[j+1];

      Cell up       = above[j];
      Cell up_left  = above[j-1];
      Cell up_right = above[j+1];

      Cell down       = below[j];
      Cell down_left  = below[j-1];
      Cell down_right = below[j+1];

      float laplaceA = -a
        +         up.a * 0.2
        +       down.a * 0.2
        +       left.a * 0.2
        +      right.a * 0.2
        +    up_left.a * 0.05
        +   up_right.a * 0.05
        +  down_left.a * 0.05
        + down_right.a * 0.05;

      float laplaceB = -b
        +         up.b * 0.2
        +       down.b * 0.2
        +       left.b * 0.2
        +      right.b * 0.2
        +    up_left.b * 0.05
        +   up_right.b * 0.05
        +  down_left.b * 0.05
        + down_right.b * 0.05;

      spot.a = a + (dA*laplaceA - a*b*b + feed*(1-a))*1;
      spot.b = b + (dB*laplaceB + a*b*b - (k+feed)*b)*1;

      spot.a = constrain(spot.a, 0, 1);
      spot.b = constrain(spot.b, 0, 1);

      if (update) {
        pixels[pos + j] = color((b*75+90)%100, 76, 84,78);
      }
    }
  }

  if (update) {
    updatePixels();
  }
}
