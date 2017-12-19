
let w = 600;
let angle = 0.0;
let img;
let sq,outq,outs;
let sp,outp,sd,outd;




function setup() {
  createCanvas(w, w, WEBGL);
  //ortho(-width, width, height, -height/2, 0.1, 100);


  sq = createSlider(1, 22, 4);
  sq.position(30,525);
  outq = createElement('div', '');
  outq.position(50, 495);
  outq.style('font-size: 24px; color: white');
  outs="q = "+sq.value();
  outq.html(outs);

  sp = createSlider(1, 22, 3);
  sp.position(230,525);
  outp = createElement('div', '');
  outp.position(250, 495);
  outp.style('font-size: 24px; color: white');
  outs="p = "+sp.value();
  outp.html(outs);

  sd = createSlider(0, 60, 20);
  sd.position(430,525);
  outd = createElement('div', '');
  outd.position(450, 495);
  outd.style('font-size: 24px; color: white');
  outs="d = "+sd.value()/10;
  outd.html(outs);

 
  
}


function draw() {
  background(44);
  ambientLight(255,255,255);

  let beta = 0;
  
  rotateZ(angle);
  rotateY(angle*2);
  normalMaterial();

  outs="q = "+sq.value();
  outq.html(outs);

  outs="p = "+sp.value();
  outp.html(outs);

  outs="d = "+sd.value()/10;
  outd.html(outs);

  let p = sp.value();
  let q = sq.value();
  let d = sd.value()/10;

  let phi,r,x,y,z;


  while (beta < Math.PI){

    phi = 2*beta;
    r = cos(q *phi)+d;

    x = r * cos(p*phi)
    y = r * sin(p*phi)
    z = -sin(q*phi)

    x *=80;
    y *=80;
    z *=80;

    push();
    translate(x,y,z);
    sphere(10);
    pop();

    beta += 0.001;
  }
  //endShape();
  angle += 0.01;
  

  
  //console.log(angle);
  
}

