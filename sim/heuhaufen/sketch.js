var button;
var N;

function generateHeu() {
	background(0);
	var num = Math.round(Math.pow(2,N.value()));
	console.log(num);
	for (var i=1; i<num; i++){
		stroke(random(100),100,100,30);
		line(random(width), random(height),
				 random(width), random(height));
	 }
}

function setup() {
	createCanvas(1000, 700);
	colorMode(HSB,100);
	button = createButton('submit');
	button.position(30, 600);
	button.mousePressed(generateHeu);
	button.style("background","#AA9988");
	button.style("background-image","linear-gradient(to bottom, #AA9988, #888888)");
	button.style("border-radius","28px");
	button.style("font-family","Arial");
	button.style("color","#ffffff");
	button.style("font-size","32px");
	button.style("padding","10px 20px 10px 20px");
	button.style("text-decoration","none");

	N = createSlider(1, 14, 8);
  N.position(240,650);

}



function draw() {

}
