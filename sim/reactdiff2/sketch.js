//Txt 
let outs;

let w = 580; 
let A = [];
let B = [];
let das;
let da = 1;
let outda;

let dbs;
let db = 0.5;
let outdb;
//float f = 0.055;
//float k = 0.062;

//float f = 0.021;
//float k = 0.05;
let fs;
let f = 0.037;
let outf;
let ks;
let k = 0.06;
let outk;

//float f = 0.029;
//float k = 0.057;

//float f = 0.0149;
//float k = 0.0401;

//float f = 0.053;
//float k = 0.0616;

let dt = 1.0;


function randstart(){
  for (let x=0; x<w; x++) {
    A[x]=[];
    B[x]=[];
    for ( let y=0; y<w; y++) {
      A[x][y] = 1;
      B[x][y] = 0;
      if ( random(1)<0.01) B[x][y] = 1;
    }
  }
}


function setup() {
  createCanvas(w, w);
  pixelDensity(1);
  

  randstart();

  
 
  fs = createSlider(1, 100, 37);
  fs.position(600,50);
  outf = createElement('div', '');
  outf.position(600, 20);
  outf.style('font-size: 24px; color: gray');
  outs="f = "+fs.value();
  outf.html(outs);


  ks = createSlider(1, 100, 60);
  ks.position(600,100);
  outk = createElement('div', '');
  outk.position(600, 80);
  outk.style('font-size: 24px; color: gray');
  outs="k = "+ks.value();
  outk.html(outs);

  das = createSlider(1, 100, 100);
  das.position(600,150);
  outda = createElement('div', '');
  outda.position(600, 130);
  outda.style('font-size: 24px; color: gray');
  outs="da = "+das.value();
  outda.html(outs);

  dbs = createSlider(1, 100, 50);
  dbs.position(600,200);
  outdb = createElement('div', '');
  outdb.position(600, 180);
  outdb.style('font-size: 24px; color: gray');
  outs="db = "+dbs.value();
  outdb.html(outs);

}

function updatetxt() {
  outs="f = "+fs.value();
  outf.html(outs);
  outs="k = "+ks.value();
  outk.html(outs);
  outs="da = "+das.value()
  outda.html(outs);
  outs="db = "+dbs.value();
  outdb.html(outs);

}

function draw() {
  noStroke();
  loadPixels();
  let pos;
  let col;
  for (let x=0; x<w; x++) {
    for ( let y=0; y<w; y++) {
      pos = (x+y*w)*4
      col =  255.0*A[x][y];
      pixels[pos] = col*1.0;
      pixels[pos+1] = col*0.91;
      pixels[pos+2] = col*0.4;
      pixels[pos+3] = 255;

    }
  }  
  updatePixels();
  //saveFrame("react-diff-######.png");
  update();
  updatetxt();
}

function update() {
  let At = [];
  let Bt = []; 
  let a,b,la,lb;
  f = fs.value()/1000; 
  k = ks.value()/1000; 
  da = das.value()/100;
  db = dbs.value()/100;

  for (let x=0; x<w; x++) {
    At[x] =[];
    Bt[x] =[];
    for ( let y=0; y<w; y++) {
      a = A[x][y];
      b = B[x][y];

      la = lap( A, x, y );
      lb = lap( B, x, y );
      At[x][y] = a + (da * la - a*b*b + f*(1-a))*dt;
      Bt[x][y] = b + (db * lb + a*b*b - (k+f)*b)*dt;
    }
  }  
  A = At;
  B = Bt;
}

function lap( arr, x,  y ) {
  let res = arr[x][y] * -1;

  res += arr[x == 0 ? w-1 : x-1][ y == 0 ? w-1 : y-1] * .05;
  res += arr[x == 0 ? w-1 : x-1][y] * .2;
  res += arr[x == 0 ? w-1 : x-1 ][y == w-1? 0 : y+1] * .05;

  res += arr[x][y == 0  ? w-1 : y-1] * .2;
  res += arr[x][y == w-1 ?  0 : y+1] * .2;

  res += arr[x == w-1 ? 0 : x+1][y ==0 ? w-1 : y-1] * .05;
  res += arr[x == w-1 ? 0 : x+1][y] * .2;
  res += arr[x == w-1 ? 0 : x+1][y == w-1 ? 0 : y+1] * .05;
  return res;
}

function keyPressed() {
  if (keyCode === 32) {
    randstart();
  } 
}




