// Variable is set such that there is a time pause before the next click is activated
var lastClickTime = 0;
var clickCooldown = 1000;  

// Drawing of force line
function drawForceLine(startX, startY, endX, endY) {
  stroke(255);
  line(startX, startY, endX + 3 * (endX - startX), endY + 3 * (endY - startY));
}

function mousePressed() {
  var currentTime = millis(); 

  // Check if enough time 
  if (currentTime - lastClickTime > clickCooldown && isWithinCanvas(mouseX, mouseY)) {
    // Adjustment of the force 
    var force = 100000; 
    var forceX = (whiteball.position.x - mouseX) / force;
    var forceY = (whiteball.position.y - mouseY) / force;
    var appliedForce = { x: forceX, y: forceY };
    
    // Apply force 
    Body.applyForce(whiteball, { x: whiteball.position.x, y: whiteball.position.y }, appliedForce);

    // Update the last click time
    lastClickTime = currentTime;
  }
}


function isWithinCanvas(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}

// Fumction of cue using mouse click to shoot
function Cue(helpEnabled) {
  this.begin = new p5.Vector();
  this.direction = new p5.Vector(0, 0);
  this.helpEnabled = helpEnabled;

  this.move = function (whiteBall, mouseX, mouseY) {
    this.begin = whiteBall.pos.copy();

    if (isWithinCanvas(mouseX, mouseY)) {
      var end = new p5.Vector(mouseX, mouseY);
      this.direction = end.sub(this.begin);

      if (this.direction.mag() > MAX_STRIKE) {
        this.direction.setMag(MAX_STRIKE);
      }
    }
  };

  this.show = function () {
    // Draw the cue line
    line(this.begin.x, this.begin.y, this.begin.x + this.direction.x, this.begin.y + this.direction.y);

    if (this.helpEnabled) {
      // Draw the helper line  (opposite the cue stick)
      line(this.begin.x, this.begin.y, this.begin.x - this.direction.x, this.begin.y - this.direction.y);
    }
  };

  // Striking function for the ball to move forward
  this.strike = function (ball) {
    var direction = this.direction.copy();
    direction.mult(-1);
    direction.div(STRIKE_FACTOR);

    if (direction.mag() > MAX_STRIKE) {
      direction.setMag(MAX_STRIKE);
    }

    ball.vel.add(direction);
  };
}
