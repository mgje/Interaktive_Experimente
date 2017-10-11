
var input,button,outzahl,speed, posX, posY;

function drawdot(col){
	var px = 20+18*posX;
	if (px>width){
		px = 20;
		posX = 0
		posY +=1;
	}

	fill(col);
	ellipse(px, 180+18*posY, 18, 18);
	posX += 1;
}

function nextNum(z){
	var timestep = parseInt(40000/speed.value()/speed.value());

	outzahl.html(z);
	if (z < 2) {
		button.show();
		return true;
	}

	if (z%2===0){
		drawdot('#28b9cd');
		return setTimeout(function(){ nextNum(z/2) }, parseInt(timestep));
	} else {
		drawdot('#cc0066');
		return setTimeout(function(){ nextNum(3*z+1) }, parseInt(timestep));
	}
}


function calc_collatz(){
	var zahl = parseInt(input.value());
	if(zahl > 1){
	 posX = 0;
	 posY = 0;
	 background(255, 166, 0);
	 button.hide();
	 nextNum(zahl);
	 }

}


function setup() {
  //create canvas
  createCanvas(800, 600);
  input = createInput();
  input.position(20, 65);
  input.value(42);
  input.style("font-family","Arial");
  input.style("font-size","32px");
  input.size(300);

  button = createButton('submit');
  button.position(330, 55);
  button.mousePressed(calc_collatz);
  button.style("background","#AA9988");
  button.style("background-image","linear-gradient(to bottom, #AA9988, #888888)");
  button.style("border-radius","28px");
  button.style("font-family","Arial");
  button.style("color","#ffffff");
  button.style("font-size","32px");
  button.style("padding","10px 20px 10px 20px");
  button.style("text-decoration","none");

  outzahl = createElement('h2', '');
  outzahl.position(90, 100);
  outzahl.style('font-size: 70px; color: white');

  speed = createSlider(4, 48, 15);
  speed.position(30,420);

}



function draw() {

}
