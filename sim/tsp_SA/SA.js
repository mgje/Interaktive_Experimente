
//  Martin Guggisberg, twiter @mgje


// Simulated Annealing Methode
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// function ashuffle(a) {
//     for (let i = a.length; i; i--) {
//         let j = Math.floor(Math.random() * i);
//         [a[i - 1], a[j]] = [a[j], a[i - 1]];
//     }
// }

// A SA object
var SA = function(total) {
  this.setTotalCities(total);
};


SA.prototype.calcDistance = function() {
  var d;
  var sum=0;
  for (var i = 0; i < this.order.length - 1; i++) {
    d = this.distMatrix[this.order[i]][this.order[i+1]];
    sum += d;
  }
  // closing Ring
  d = this.distMatrix[this.order[0]][this.order.length - 1];
  sum += d;

  this.dist = sum;
  return this.dist;
}




SA.prototype.setDisMatrix = function(mat){
  this.distMatrix=mat;
};

SA.prototype.setTotalCities = function(n){
  this.total=n;
};

SA.prototype.randStart = function() {
  tmp=[]
  for (var i = 0; i < this.total; i++) {
    tmp.push(i);
  }

  shuffle(tmp);
  this.order=shuffle(tmp);
  //console.log(this.order);
};


SA.prototype.getOrder = function(){
  return this.order.slice(0);
};

SA.prototype.setOrder = function(mord){
  this.order = mord
};

// Draw the path
SA.prototype.show = function() {
  // Lines
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();

  //console.log(this.order);


  for (var i = 0; i < this.order.length; i++) {
    var n = this.order[i];
    vertex(cities[n].x, cities[n].y);
  }
  vertex(cities[this.order[0]].x, cities[this.order[0]].y);
  endShape();

  // Cities
  fill(255);
  for (var i = 0; i < this.order.length; i++) {
    var n = this.order[i];
    ellipse(cities[n].x, cities[n].y, 8, 8);
  }
};
