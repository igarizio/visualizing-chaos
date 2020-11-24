let backgroundColor = "#FFFF";
let nDisplayPoints = 50;

let attractors = [];
let nAttractors = 50;
let perturbation_magnitude = 1 / 100000;

let randomRangeX = [-15, 15];
let randomRangeY = [-18, 18];
let randomRangeZ = [14, 40];
let dt = 0.015;

function setup() {
  let canvas = createCanvas(600, 450);
  canvas.mousePressed(canvasMouseClicked);
  colorMode(HSB, nAttractors);
  initializeAttractors();
}

function canvasMouseClicked() {
  initializeAttractors();
}

function initializeAttractors() {
  let randX = random(randomRangeX[0], randomRangeX[1]);
  let randY = random(randomRangeY[0], randomRangeY[1]);
  let randZ = random(randomRangeZ[0], randomRangeZ[1]);

  for (let i = 0; i < nAttractors; i++) {
    let newX = randX + i * perturbation_magnitude;
    let newY = randY + i * perturbation_magnitude;
    let newZ = randZ + i * perturbation_magnitude;

    attractors[i] = new Attractor(newX, newY, newZ, dt, nDisplayPoints);
    attractors[i].primeSystem();
  }
}

function drawAttractors() {
  push();
  translate(300, 0);
  strokeWeight(0.2);
  noFill();
  scale(8);
  for (let i = 0; i < attractors.length; i++) {
    stroke(i, 100, 100);
    attractors[i].addNewLorenzPoint();
    attractors[i].drawPoints();
  }
  pop();
}

function drawBackgroundText() {
  push();
  textAlign(CENTER);
  txt = "Click anywhere\nto reset";
  text(txt, width - 45, 15);
  pop();
}

function draw() {
  background(backgroundColor);
  drawAttractors();
  drawBackgroundText();
}
