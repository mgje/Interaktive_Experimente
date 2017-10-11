function setup() {
	createCanvas(1200, 700);
	stroke(255);
  strokeWeight(3);
  background(0,0,0);
}

function draw() {
	var dx = random(-100,100);
	var dy = random(-100,100);
	stroke(random(220), random(155), random(100));
	line(mouseX,mouseY,mouseX+dx,mouseY+dy);
	fill (0, 0, 0, 10);
	noStroke();
	rect (0, 0, width, height);
}
