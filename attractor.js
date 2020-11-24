let inSyncThreshold = 2;

let a = 10;
let b = 28;
let c = 8.0 / 3.0;

class Attractor {
  constructor(initialX, initialY, initialZ, dt, maxPoints) {
    this.initialPoint = new p5.Vector(initialX, initialY, initialZ);
    this.maxPoints = maxPoints;
    this.points = [this.initialPoint];
    this.dt = dt;
  }

  primeSystem() {
    for (let j = 0; j < 200; j++) {
      this.addNewLorenzPoint();
    }
    this.points.length = 1;
  }

  addNewLorenzPoint() {
    let lastPoint = this.points[0];
    let x = lastPoint.x;
    let y = lastPoint.y;
    let z = lastPoint.z;

    let dx = a * (y - x) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;
    x += dx;
    y += dy;
    z += dz;

    this.addNewPoint(x, y, z);
  }

  addNewPoint(x, y, z) {
    let newPoint = new p5.Vector(x, y, z);
    this.points.unshift(newPoint);
    this.points.length = Math.min(this.points.length, this.maxPoints);
  }

  addNewRandomPoint() {
    let randX = random(randomRangeX[0], randomRangeX[1]);
    let randY = random(randomRangeY[0], randomRangeY[1]);
    let randZ = random(randomRangeZ[0], randomRangeZ[1]);
    this.addNewPoint(randX, randY, randZ);
  }

  drawPoints() {
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.z);
    }
    endShape();
  }

  draw3DPoints() {
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.z, v.y);
    }
    endShape();
  }

  checkInSync(otherAttractor) {
    let nPoints = Math.min(this.points.length, otherAttractor.points.length) - 1;
    let sumDistance = 0;
    for (let i = 0; i < nPoints; i++) {
      let diffX = this.points[i].x - otherAttractor.points[i].x;
      let diffY = this.points[i].y - otherAttractor.points[i].y;
      let diffZ = this.points[i].z - otherAttractor.points[i].z;
      sumDistance += (diffX ** 2 + diffY ** 2 + diffZ ** 2) ** 0.5;
    }
    let avgDistance = sumDistance / nPoints;
    return avgDistance < inSyncThreshold;
  }
}
