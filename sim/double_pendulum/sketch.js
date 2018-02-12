
// double pendulum
const PI = Math.PI;
// global Var
let r1,r2,m1,m2,a1,a2,a1_v,a2_v,a1_a,a2_a,g,damping;
let path = [];
// gui Elements
let button, sliderr1,outr1,outs,sliderr2,sliderm1,outr2,outm1,sliderg,outg;
let sliderdamp,outdamp;

function setup() {
  createCanvas(600,600);
  init_values();
  sliderr1 = createSlider(10,300,r1);
  sliderr1.position(620, 140);
  sliderr1.changed(change_r1);
  outr1 = createElement('div', '');
  outr1.position(650, 110);
  outr1.style('font-size: 24px; color: white');
  outs="r1 = "+sliderr1.value();
  outr1.html(outs);

  sliderr2 = createSlider(10,300,r2);
  sliderr2.position(620, 190);
  sliderr2.changed(change_r2);
  outr2 = createElement('div', '');
  outr2.position(650, 160);
  outr2.style('font-size: 24px; color: white');
  outs="r2 = "+sliderr2.value();
  outr2.html(outs);

  //mass
  sliderm1 = createSlider(1,30,m1);
  sliderm1.position(620, 240);
  sliderm1.changed(change_m1);
  outm1 = createElement('div', '');
  outm1.position(650, 210);
  outm1.style('font-size: 24px; color: white');
  outs="m1 = "+sliderm1.value();
  outm1.html(outs);


  sliderm2 = createSlider(1,30,m2);
  sliderm2.position(620, 290);
  sliderm2.changed(change_m2);
  outm2 = createElement('div', '');
  outm2.position(650, 260);
  outm2.style('font-size: 24px; color: white');
  outs="m2 = "+sliderm2.value();
  outm2.html(outs);

  //gravity
  sliderg = createSlider(1,30,int(g*10));
  sliderg.position(620, 350);
  sliderg.changed(change_g);
  outg = createElement('div', '');
  outg.position(650, 320);
  outg.style('font-size: 24px; color: white');
  outs="g = "+sliderg.value();
  outg.html(outs);

  //damping
  sliderdamp = createSlider(1,200,70);
  sliderdamp.position(620, 410);
  sliderdamp.changed(change_damp);
  outdamp = createElement('div', '');
  outdamp.position(650, 380);
  outdamp.style('font-size: 24px; color: white');
  change_damp();
 

  
  button = createButton('restart');
  button.position(620, 30);
  button.mousePressed(restart);

  button.style("background","#AA9988");
  button.style("background-image","linear-gradient(to bottom, #AA9988, #888888)");
  button.style("border-radius","28px");
  button.style("font-family","Arial");
  button.style("color","#ffffff");
  button.style("font-size","32px");
  button.style("padding","10px 20px 10px 20px");
  button.style("text-decoration","none");
 
}


function draw() {

  num1 = -g * (2 * m1 + m2) * sin(a1);
  num2 = -m2 * g * sin(a1-2*a2);
  num3 = -2*sin(a1-a2)*m2;
  num4 = a2_v*a2_v*r2 +a1_v*a1_v*r1*cos(a1-a2);
  den = r1* (2* m1+m2-m2*cos(2*a1-2*a2));
  a1_a = (num1 + num2 + num3 *num4)/den;

  num1 = 2* sin(a1-a2);
  num2 = (a1_v*a1_v*r1*(m1+m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v*a2_v*r2*m2*cos(a1-a2);
  den = r2 * (2*m1+m2-m2*cos(2*a1-2*a2));
  a2_a = (num1*(num2+num3+num4)) / den;

  background(255);
  stroke(0);
  strokeWeight(2);
  translate(300,100);
  

  x1 = r1*sin(a1);
  y1 = r1*cos(a1);

  x2 = x1+r2*sin(a2);
  y2 = y1+r2*cos(a2);

  updatePath(x2,y2);

  strokeWeight(2);
  stroke(11,11,11);
  fill(0)
  line(0,0,x1,y1); 
  ellipse(x1,y1,m1,m1);


  line(x1,y1,x2,y2);
  ellipse(x2,y2,m2,m2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
  
  

a1_v *= damping;
a2_v *= damping;
a1_a *= damping;
a2_a *= damping;

}

function updatePath(x,y){


  path.push([x,y]);

  strokeWeight(3);
  stroke(77,183,166,90);
  

  noFill();
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i][0],path[i][1]);
  }
  endShape();
  if (path.length > 600){
    path.shift();
  }

}

function restart() {
  path =[];
  init_values();
  change_r1(1);
  change_r2(1);
  change_m1(1);
  change_m2(1);
  change_g(1);
  change_damp(1);
  

}

function init_values() {
r1 = 150;
r2 = 0.75*r1;
m1 = 20;
m2 = 19;
a1 = 1.7*PI/4;
a2 = 5*PI/8;
a1_v = 0.;
a2_v = 0.;
a1_a = 0.;
a2_a = 0.;
g = 1.9
damping = 0.99973
}

function change_r1(fnn){
  r1=sliderr1.value();
  outs="r1 = "+sliderr1.value();
  outr1.html(outs);
}

function change_r2(fnn){
  r2=sliderr2.value();
  outs="r2 = "+sliderr2.value();
  outr2.html(outs);
}

function change_m1(fnn){
  m1=sliderm1.value();
  outs="m1 = "+sliderm1.value();
  outm1.html(outs);
}

function change_m2(fnn){
  m2=sliderm2.value();
  outs="m2 = "+sliderm2.value();
  outm2.html(outs);
}

function change_g(fnn){
  g=sliderg.value()/10;
  outs="g = "+sliderg.value();
  outg.html(outs);
}

function change_damp(fnn){
  damping=1-sliderdamp.value()/10000;
  outs="daming = "+damping;
  outdamp.html(outs);
}
