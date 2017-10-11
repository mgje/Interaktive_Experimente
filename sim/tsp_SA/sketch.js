// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Evolve Traveling Salesperson

// Cities
var cities = [];
var totalCities = 16;
var distMatrix = []

// Best path overall
var StartDistance;
var recordDistance;
var bestEver;
var bestEverdist = 10e20;
var historyrange = 130;
var memcount;

// Population of possible orders
var tsp = null;
var tspBest = null;
// var popTotal = 600;
var sliderTC, sliderC;
var ord,i,j,newDist,val;

var Temp;
var TStart = 4.9e1;
var coolingMin = 0.99999;
var cooling = coolingMin;

var outT,outs,outN, outStart,outBest,outOpti,outbestever;
var button,button2,button3;

function setup() {
  createCanvas(600, 700);

  createNewCities(totalCities);


  sliderTC = createSlider(5, 50, totalCities);
  sliderTC.position(620, 140);

  sliderC = createSlider(0, 100, 50);
  sliderC.position(620, 390); 

  tsp = new SA(totalCities);

  tsp.randStart();
  tsp.setDisMatrix(distMatrix);

  StartDistance=tsp.calcDistance();
  recordDistance=StartDistance;

  tspBest = new SA(totalCities);
  tspBest.setOrder(tsp.getOrder());

  temperature = TStart;


  outN = createElement('h2', '');
  outN.position(620, 90);
  outN.style('font-size: 24px; color: white');
  outs="N= "+totalCities;
  outN.html(outs);

  outT = createElement('h2', '');
  outT.position(620, 470);
  outT.style('font-size: 24px; color: red');

  outStart = createElement('h2', '');
  outStart.position(620, 520);
  outStart.style('font-size: 18px; color: gray');
  outs="L Start : "+StartDistance.toFixed(1) +" km";
  outStart.html(outs);

  outBest = createElement('h2', '');
  outBest.position(620, 550);
  outBest.style('font-size: 18px; color: gray');
  outs="L Best   &nbsp;&nbsp;:  "+recordDistance.toFixed(1) +" km";
  outBest.html(outs);


  outOpti = createElement('h2', '');
  outOpti.position(620, 640);
  outOpti.style('font-size: 18px; color: gray');
  val = (StartDistance-recordDistance)/StartDistance*100;
  outs="Opt : "+val.toFixed(2) + "%";
  outOpti.html(outs);

  outbestever = createElement('h2', '');
  outbestever.position(620, 580);
  outbestever.style('font-size: 18px; color: gray');
  outs="Best Ever : " + bestEverdist.toFixed(1) + " km";
  outbestever.html(outs);

  outC = createElement('h2', '');
  outC.position(620, 340);
  outC.style('font-size: 24px; color: white');
  outs="cooling = "+cooling;
  outC.html(outs); 





  button = createButton('heat');
  button.position(620, 30);
  button.mousePressed(heat);

  button.style("background","#AA9988");
  button.style("background-image","linear-gradient(to bottom, #AA9988, #888888)");
  button.style("border-radius","28px");
  button.style("font-family","Arial");
  button.style("color","#ffffff");
  button.style("font-size","32px");
  button.style("padding","10px 20px 10px 20px");
  button.style("text-decoration","none");


  button2 = createButton('cool');
  button2.position(620, 190);
  button2.mousePressed(cool);

  button2.style("background","#AA9988");
  button2.style("background-image","linear-gradient(to bottom, #AA9988, #888888)");
  button2.style("border-radius","28px");
  button2.style("font-family","Arial");
  button2.style("color","#ffffff");
  button2.style("font-size","32px");
  button2.style("padding","10px 20px 10px 20px");
  button2.style("text-decoration","none");

  button3 = createButton('random');
  button3.position(620, 260);
  button3.mousePressed(randStart);

  button3.style("background","#AA9988");
  button3.style("background-image","linear-gradient(to bottom, #AA9988, #888888)");
  button3.style("border-radius","28px");
  button3.style("font-family","Arial");
  button3.style("color","#ffffff");
  button3.style("font-size","32px");
  button3.style("padding","10px 20px 10px 20px");
  button3.style("text-decoration","none");


}

function draw() {
  if (sliderTC.value() != totalCities){
    totalCities = sliderTC.value();
    createNewCities(totalCities);
    tsp.setTotalCities(totalCities);
    tspBest.setTotalCities(totalCities);

    tsp.randStart();
    tsp.setDisMatrix(distMatrix);
    tspBest.setOrder(tsp.getOrder());
    tspBest.setDisMatrix(distMatrix);
    recordDistance = tspBest.calcDistance();
    StartDistance=recordDistance;
    bestEverdist=StartDistance;

    temperature = TStart;

    

    outs="N= "+totalCities;
    outN.html(outs);
    outs="L Start : "+StartDistance.toFixed(1) +" km";
    outStart.html(outs);



  }

  
  // getOrder
  ord = tsp.getOrder();

  i = floor(random(ord.length));
  j = floor(random(ord.length));
  swap(ord,i,j);
  tsp.setOrder(ord);
  newDist = tsp.calcDistance();

// output
  if (frameCount % 16 ==0){
  //cooling
  cooling = coolingMin - sliderC.value()/100000;

  outs = "cooling = "+cooling;
  outC.html(outs);


  background(0);
  tsp.show();
  translate(0, height / 2);
  line(0, 0, width, 0);
  // Show the best ever!
  tspBest.show();
  outs= "T= "+temperature.toFixed(3);
  outT.html(outs);
  val = (StartDistance-recordDistance)/StartDistance*100;
  outs="Shorter : "+val.toFixed(2) + "%";
  outOpti.html(outs);
  outs="L Best   &nbsp;&nbsp;:  "+recordDistance.toFixed(1) +" km";
  outBest.html(outs);
  outs="Best Ever : " + bestEverdist.toFixed(1) + " km";
  outbestever.html(outs);
}

if (newDist < bestEverdist){
  memcount = historyrange;
  bestEverdist = newDist
  bestEver = tsp.getOrder();

}


  diff = newDist-recordDistance;
  if (diff < 0 || exp( -diff / temperature ) > random()){
    recordDistance = newDist;
    tspBest.setOrder(tsp.getOrder());
  }else{

    tsp.setOrder(tspBest.getOrder());
    memcount = memcount-1;

  }
  temperature *= cooling;

 if (memcount < 0){
   memcount = historyrange;
   tsp.setOrder(bestEver);
   tspBest.setOrder(bestEver);
   //alert('history used');
 }


}



function createNewCities(totalCities) {
  bestEverdist = 10e10;
  cities=[];
  recordDistance = Infinity;
  // Make random cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    cities[i] = v;
  }


  distMatrix = [];
  for (var i = 0; i < totalCities; i++) {
    var row = []
    for (var j = 0; j < totalCities; j++) {
      row[j]=dist(cities[i].x,cities[i].y,cities[j].x,cities[j].y);
    }
    distMatrix[i] = row;
  }



}

function heat() {
  temperature *=  1.2;
  bestEverdist = 10e20;
  recordDistance =  10e20;
}

function cool(){

  temperature *= 0.8;
  bestEverdist = 10e20;
  recordDistance =  10e20;
}

function randStart(){

  var tmp = shuffle(tsp.getOrder());
  //alert(tmp);
  bestEver=tmp;
  tsp.setOrder(tmp);
  tspBest.setOrder(tmp);
  StartDistance=tsp.calcDistance();
  recordDistance=StartDistance;
  bestEverdist=StartDistance;
  outs="L Start : "+StartDistance.toFixed(1) +" km";
  outStart.html(outs);
}
