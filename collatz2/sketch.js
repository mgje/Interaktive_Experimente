
var input,button,outzahl,speed, posX, posY, g_n, g_end;

function drawdot(col){
	var px = 20+10*posX;
	if (px>width){
		px = 20;
		posX = 0
		posY +=1;
	}
	fill(col);
	ellipse(px, 180+10*posY, 10, 10);
	posX += 1;
}

function nextNum(z){
	var timestep = parseInt(40000/speed.value()/speed.value());

	outzahl.html(z);
	if (z < 2) {
		if (g_n < g_end){
			g_n += 1;
			posX = 0;
	        posY = 0;
			background('#0fbfcf');
			input.value(g_n);
			return nextNum(g_n);

		} else {
			button.show();
			return true;
		}
		
	}

	if (z%2===0){
		drawdot('#fab125');
		return setTimeout(function(){ nextNum(z/2) }, parseInt(timestep));
	} else {
		drawdot('#438496');
		return setTimeout(function(){ nextNum(3*z+1) }, parseInt(timestep));
	}
}



function calc_collatz(){
	var zahl = parseInt(input.value());
	 posX = 0;
	 posY = 0;
	 background('#0fbfcf');
	 g_n = zahl;
	 g_end = zahl+1000;
	 button.hide();
     nextNum(zahl);
}


function setup() {

  //create canvas

  createCanvas(600, 400);
  

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