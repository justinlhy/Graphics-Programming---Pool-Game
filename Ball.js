// Declaring variable that is needed for reset ball
var placingWhiteball = false;
var newWhiteballPosition;
var isWhiteballPocketed = false;


//-------------------------------------------------------------------------------------
// Function to allow new placement for whiteball 
function mouseClicked() {
  // Check if the user is placing 
  if (placingWhiteball && isMouseInDLine(mouseX, mouseY)) {
    // Set the new whiteball based on the mouse position
    newWhiteballPosition = createVector(mouseX, mouseY);

    // Generate a new whiteball at the new position
    generateNewWhiteball(newWhiteballPosition.x, newWhiteballPosition.y);


      // Reset the flag
      placingWhiteball = false;
      isWhiteballPocketed = false;
    } else {
      console.log("Mouse click must be within the D-line.");
    }
  }

// Function to check if the mouse position is in D-line area
function isMouseInDLine(mouseX, mouseY) {
    var dLineX = tableX + tableWidth / 2;
    var dLineY = tableY + tableLength - 200;
    var dLineRadius = 100;
  
    // Check if the mouse is in D Area
    return (
      mouseX >= dLineX - dLineRadius && 
      mouseX <= dLineX + dLineRadius && 
      mouseY >= dLineY && 
      mouseY <= dLineY + dLineRadius 
    );
  }

function mouseMoved() {
  // Check if the user is placing whiteball
  if (placingWhiteball) {
    // Draw a temporary whiteball to mouse position
    drawTemporaryWhiteball(mouseX, mouseY);
  }
}

// Function to draw the temporary placed white ball
function drawTemporaryWhiteball(x, y) {
  var pos = whiteball.position;
  var r = whiteball.circleRadius;

  if (x !== undefined && y !== undefined) {
    pos = createVector(x, y);
  }

  fill(150, 150, 150, 100);
  ellipse(pos.x + 4, pos.y + 4, r * 2, r * 2);

  //Styling
  var ballColor = color(255);
  var highlightColor = color(255, 255, 255, 150);
  var shadowColor = color(100, 100, 100, 150);

  noStroke();
  for (var j = 0; j < r; j++) {
    var inter = map(j, 0, r, 0, 1);
    var c = lerpColor(ballColor, shadowColor, inter);
    fill(c);
    ellipse(pos.x, pos.y, (r - j) * 2, (r - j) * 2);
  }

  fill(highlightColor);
  ellipse(pos.x, pos.y - r * 0.25, r * 1.5, r * 1.5);
}

// Generate the new white ball based on the new position
function generateNewWhiteball(x, y) {
  whiteball = Bodies.circle(x, y, whiteball.circleRadius, { restitution: 0.05, friction: 0.1 });
  World.add(engine.world, [whiteball]);
}

//--------------------------------------------------------------------------------------
// For Original White Ball
// Generate white ball starting position for all modes
function generatewhiteball(tableX, tableY) {
  var ballRadius = tableWidth / 36 / 2;
  var initialXPosition = tableX + tableWidth / 2 + 3;
  var initialYPosition = tableY + tableLength / 2 + 150;

  whiteball = Bodies.circle(initialXPosition, initialYPosition, ballRadius / 2, { restitution: 0.05, friction: 0.1 });
  whiteball.circleRadius = ballRadius;
  World.add(engine.world, [whiteball]);
}

// Draw starting position white ball 
function drawwhiteball(x, y) {
  var pos = whiteball.position;
  var r = whiteball.circleRadius;

  if (x !== undefined && y !== undefined) {
    pos = createVector(x, y);
  }

  fill(150, 150, 150, 100);
  noStroke(); 
  ellipse(pos.x + 4, pos.y + 4, r * 2, r * 2);

  //Styling
  var ballColor = color(255);
  var highlightColor = color(255, 255, 255, 150);
  var shadowColor = color(100, 100, 100, 150);

  noStroke();
  for (var j = 0; j < r; j++) {
    var inter = map(j, 0, r, 0, 1);
    var c = lerpColor(ballColor, shadowColor, inter);
    fill(c);
    ellipse(pos.x, pos.y, (r - j) * 2, (r - j) * 2);
  }

  fill(highlightColor);
  ellipse(pos.x, pos.y - r * 0.25, r * 1.5, r * 1.5);
}

//--------------------------------------------------------------------------------------
// For Red Ball
// Draw red ball, position is called in modes
function drawBalls() {
  for (var i = 0; i < balls.length; i++) {
    var pos = balls[i].position;
    var r = balls[i].circleRadius;

    if (balls[i].render && balls[i].render.fillStyle) {
      fill(balls[i].render.fillStyle);
    } else {
      fill(150, 150, 150, 100);
    }

    ellipse(pos.x + 3, pos.y + 3, r * 2, r * 2);

    //Styling
    var highlightColor = color(100, 100, 100, 50);
    var shadowColor = color(100, 100, 100, 50);

    noStroke();
    for (var j = 0; j < r; j++) {
      var inter = map(j, 0, r, 0, 1);
      var c = lerpColor(color(255), shadowColor, inter);
      fill(c);
      ellipse(pos.x, pos.y, (r - j) * 2, (r - j) * 2);
    }

    fill(highlightColor);
    ellipse(pos.x, pos.y - r * 0.25, r * 1.5, r * 1.5);
  }
}
