
var input,button,outzahl,speed, posX, posY;

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
	if (z < 2) return true

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
     nextNum(zahl);

	// while (zahl > 1){
	// 	console.log(zahl);
	// 	outzahl.html(zahl);
	// 	zahl=nextNum(zahl);
	// }
	// outzahl.html(zahl);
}


function setup() {

  //create canvas

  createCanvas(600, 400);
  

  input = createInput();
  input.position(20, 65);
  input.value(42);

  button = createButton('submit');
  button.position(150, 65);
  button.mousePressed(calc_collatz);

  outzahl = createElement('h2', '');
  outzahl.position(40, 90);
  outzahl.style('font-size: 60px; color: white');

  speed = createSlider(4, 48, 15);
  speed.position(30,420);




}



function draw() {
  
}