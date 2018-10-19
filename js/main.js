var w = 1.5;
var cells;

var generation = 0;

var ruleset = [0, 0, 0, 1, 1, 1, 1, 0]; // Rule 30 !
//var ruleset = [0, 0, 1, 0, 1, 1, 0, 1]; // Rule 45 !
// var ruleset = [0, 0, 1, 1, 1, 1, 1, 0]; // Rule 62
// var ruleset = [0, 1, 0, 1, 1, 0, 1, 0]; // Rule 90
// var ruleset = [0, 1, 0, 1, 1, 1, 1, 0]; // Rule 94
// var ruleset = [0, 0, 1, 1, 0, 1, 1, 0]; // Rule 54
// var ruleset = [0, 0, 1, 1, 1, 0, 0, 1]; // Rule 57
// var ruleset = [0, 0, 1, 1, 1, 1, 1, 0]; // Rule 62
// var ruleset = [0, 1, 0, 0, 1, 0, 0, 1]; // Rule 73 !
// var ruleset = [0, 1, 1, 0, 1, 0, 0, 1]; // Rule 105
// var ruleset = [1, 0, 0, 0, 0, 1, 0, 1]; // Rule 133
// var ruleset = [1, 0, 0, 0, 0, 1, 1, 1]; // Rule 135
// var ruleset = [1, 0, 0, 0, 1, 0, 1, 0]; // Rule 138
// var ruleset = [1, 0, 0, 1, 0, 1, 1, 0]; // Rule 150
// var ruleset = [1, 0, 0, 1, 1, 1, 0, 0]; // Rule 156
// var ruleset = [1, 0, 0, 1, 1, 1, 0, 1]; // Rule 157
// var ruleset = [1, 0, 1, 0, 0, 1, 1, 1]; // Rule 167
// var ruleset = [1, 0, 1, 1, 1, 1, 1, 0]; // Rule 190
// var ruleset = [1, 1, 0, 0, 0, 0, 0, 1]; // Rule 193
// var ruleset = [1, 1, 0, 0, 0, 0, 1, 1]; // Rule 195
// var ruleset = [1, 1, 0, 1, 0, 0, 1, 0]; // Rule 210
// var ruleset = [1, 1, 0, 1, 0, 1, 1, 0]; // Rule 214
// var ruleset = [1, 1, 0, 1, 1, 0, 1, 0]; // Rule 218
// var ruleset = [1, 1, 1, 0, 0, 0, 0, 1]; // Rule 225

function setup() {
  	createCanvas(windowWidth, windowHeight);
	background(10);
	cells = Array(floor(width/w));
	for (var i = 0; i < cells.length; i++) {
		cells[i] = 0;
	}
	cells[cells.length/2] = 1;
}

// game = setInterval(draw,1);

function draw() {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i] === 0) {
      	// fill(169, 147, 255);
      	fill(color(random(50, 169),random(100, 174),random(100, 255)));
      	noStroke();
      	rect(i*w, generation*w, w, w);
	    if (mouseX > i*w-w && mouseX < i*w+w) {
	    	fill(0, 255, 0);
	      	noStroke();
	      	rect(i*w, generation*w, 2*w, 2*w);
	    }
    }
  }
  if (generation < height/w) {
    generate();
  }
}

function generate() {
  // First we create an empty array for the new values
  var nextgen = Array(cells.length);
  // For every spot, determine new state by examing current state, and neighbor states
  // Ignore edges that only have one neighor
  for (var i = 1; i < cells.length-1; i++) {
    var left   = cells[i-1];   // Left neighbor state
    var me     = cells[i];     // Current state
    var right  = cells[i+1];   // Right neighbor state
    nextgen[i] = rules(left, me, right); // Compute next generation state based on ruleset
  }
  // The current generation is the new generation
  cells = nextgen;
  generation++; 
}

function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}