// Declaring Global Variable

// Matter.js
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var engine;

// Balls variable
var whiteball;
var walls;
var balls;

// Pocket variable
var pockets = [];

// Setting counter variable
var coloredBallCount = 0;
var redBallCount = 0;

// Setting table's dimension
var tableWidth = 400;
var tableLength = tableWidth * 2;
var tableX;
var tableY;

function setup() {
  // Setting canvas
  createCanvas(windowWidth, windowHeight);
  tableWidth = 400;
  tableLength = tableWidth * 2;
  tableX = (width - tableWidth) / 2;
  tableY = (height - tableLength) / 2;

  // Creating a new engine with matter.js
  engine = Engine.create();
  engine.world.gravity.y = 0;

  // Set pockets/wall/balls to an empty array
  balls = [];
  walls = [];
  pockets = [];

  // Call whiteball function
  generatewhiteball(tableX, tableY);

  // Call wall function
  setupWalls(tableX, tableY);

  // Set up initial mode
  changeMode('startingPositions', tableX, tableY, tableWidth, tableLength); 

  // Call pocket function
  setupPockets(tableX, tableY);

  // Set the background color
  document.body.style.backgroundColor = "(1, 55, 32)"; 

  // Setting counter variable to zero
  coloredBallCount = 0;
  redBallCount = 0;
}


function draw() {
  background(1, 55, 32);
  drawTable();  
  drawBalls();
  checkBallPockets();
  checkCueBallCollisions();
  drawForceLine(mouseX, mouseY, whiteball.position.x, whiteball.position.y);
  drawPockets();

  // When whiteball is pocketed
  // Update the position of the new whiteball when user chose a new position
  if (placingWhiteball) {
    newWhiteballPosition = createVector(mouseX, mouseY);
  }

  // Draw the original or new whiteball based on the pocketed flag
  if (isWhiteballPocketed) {
  } else if (placingWhiteball) {
    // Draw the new whiteball at the mouse position
    drawTemporaryWhiteball(newWhiteballPosition.x, newWhiteballPosition.y);
  }

  // Display counters
  fill(255);
  textSize(16);
  textAlign(RIGHT);
  text('Colored Balls: ' + coloredBallCount, tableX - 20, tableY + 40);
  text('Red Balls: ' + redBallCount, tableX - 20, tableY + 20);

  // Update physics engine
  Engine.update(engine);

  // Draw the original whiteball after updating the physics engine
  if (!isWhiteballPocketed && !placingWhiteball) {
    drawwhiteball(whiteball.position.x, whiteball.position.y);
  }

  if (isHardMode) {
    drawObstacle();
  }
}

function drawTable() {
  
  push();
  rectMode(CENTER);

  // Calculate the center
  var centerX = tableX + tableWidth / 2;
  var centerY = tableY + tableLength / 2;

  // Draw Brown rails of the table
  fill(111, 78, 55);
  noStroke();
  rect(centerX, centerY, tableWidth + 20, tableLength + 20, 15);

  // Draw Yellow boxes indicator
  fill(247, 242, 5);
  rect(centerX, centerY - tableLength / 2, 20, 20); // top middle
  rect(centerX, centerY + tableLength / 2, 20, 20); // bottom middle
  pop();


  // Draw Green playing field
  push();
  rectMode(CENTER);
  fill(10, 108, 3);
  rect(centerX, centerY, tableWidth, tableLength, 10);
  noStroke();    

  noFill();
  stroke(128, 128, 128);

  // D line on the table
  var dLineX = tableX + tableWidth / 2;
  var dLineY = tableY + tableLength - 200;

  arc(dLineX, dLineY, 200, 200, 0, PI);
  line(dLineX - 200, dLineY, dLineX + 200, dLineY);
  pop(); 
 
  // Draw Wall Cusion
  fill(0, 0, 0, 100);
  for (var i = 0; i < walls.length; i++) {
    drawVertices(walls[i].vertices);
  } 

  // Yellow corners
  fill(0);
  noStroke();

  fill(247, 242, 5);
  // Top left
  rect(centerX - tableWidth / 2 - 10, centerY - tableLength / 2 - 10, 30, 30, 10, 0, 0, 0);
  // Top right
  rect(centerX + tableWidth / 2 - 20, centerY - tableLength / 2 - 10, 30, 30, 0, 10, 0, 0);
  // Bottom left
  rect(centerX - tableWidth / 2 - 10, centerY + tableLength / 2 - 20, 30, 30, 0, 0, 0, 10);
  // Bottom right
  rect(centerX + tableWidth / 2 - 20, centerY + tableLength / 2 - 20, 30, 30, 0, 0, 10, 0);

  // Middle left
  rect(centerX - tableWidth / 2 - 10, centerY, 10, 30);
  // Middle right
  rect(centerX + tableWidth / 2 , centerY, 10, 30);

  // Arcs for pool table pockets
  fill(10, 108, 3); // Match the color of the brown rails
  // Top left
  arc(centerX - tableWidth / 2 + 20, centerY - tableLength / 2 + 20, 40, 40, PI, PI + HALF_PI);
  // Top right
  arc(centerX + tableWidth / 2 - 20, centerY - tableLength / 2 + 20, 40, 40, -HALF_PI, 0);
  // Bottom left
  arc(centerX - tableWidth / 2 + 20, centerY + tableLength / 2 - 20, 40, 40, HALF_PI, PI);
  // Bottom right
  arc(centerX + tableWidth / 2 - 20, centerY + tableLength / 2 - 20, 40, 40, 0, HALF_PI);

}

// Set up static walls (with matter.js function) around the table
function setupWalls(tableX, tableY) {
  var wallTop = Bodies.rectangle(tableX + tableWidth / 2 , tableY + tableLength +5, tableWidth, 10, { isStatic: true, resitution: 1 });
  var wallBottom = Bodies.rectangle(tableX + tableWidth / 2 , tableY -5, tableWidth, 10, { isStatic: true, resitution: 1});
  var wallLeftTop = Bodies.rectangle(tableX - 5, tableY + tableLength / 2 - 190, 10, tableLength / 2 -20, { isStatic: true, resitution: 1 });
  var wallLeftBottom = Bodies.rectangle(tableX - 5, tableY+ tableLength / 2 + 205, 10, tableLength / 2 -50, { isStatic: true, resitution: 1 });

  var wallRightTop = Bodies.rectangle(tableX + tableWidth + 5, tableY + tableLength / 2 - 190, 10, tableLength / 2 -20, { isStatic: true, resitution: 1 });
  var wallRightBottom = Bodies.rectangle(tableX + tableWidth + 5, tableY + tableLength / 2 + 205, 10, tableLength / 2 - 50, { isStatic: true, resitution: 1 });

  // Add walls to array
  walls.push(wallTop);
  walls.push(wallBottom);
  walls.push(wallLeftTop);
  walls.push(wallLeftBottom);
  walls.push(wallRightTop);
  walls.push(wallRightBottom);

  World.add(engine.world, [wallTop, wallBottom, wallLeftTop, wallLeftBottom, wallRightTop, wallRightBottom]);
}


//----------------------------------------------------------------
// Report Commentary 
// The design of the game that i have created is centered around a mouse based cue function. This is so that it enhances the users interaction and gameplay. While key press would provide a viable alternative to controlling the cue, there were some consideration set in place before i have made the decision for mouse interaction;

// 1. Realism sitmulation - As the game of snooker involves physical movement and interaction controlled by the cue stick. Having a mouse control allow users to have a more realistic and natural feel without identifying and learning the key functions.
// 2. Intuitive controls - As mouse based controls are more familiar by users, to point and click as we use it on a daily basis. It simplifies the controls of the game and focuses more on the objective of the game then learning the conplex key combination
//3. Cue functions - The precision and sensitiviy of the cue stick and power are also included in the mouse click and mouse distance from the cue ball, this allow a more visualised control when users play the game. Allowing them to do slight adjustments to control the impact of the outcome of the shots.

// Extensions 
// The idea of the snooker game is to situmulate the physical dynamic of a snooker table. 

// 1. Matter.js - The game leverages on the physics engine from matter.js in which allow the realisatic collision, bouncing of walls and moving of the balls.

// 2. Game Mode Extension - The game that i have created uses different game modeS for users to start with. This provides flexibity of preference to the users whether they want random position(Red and coloured/Red only) or riginal position. The mode also adds an extra layer of complexity in which requires user to stategize their shots and having to accomplish the objective of the game

// 3. User Interface - The idea of implementing a ball counter helps the users to keep track of the balls that went in, be it red balls or coloured balls. This is such that during the game play the users are aware of their progress and are able to work on their next step of the game.


// Unique implementation 
// The Unique implementation that I have made is the implemmentation of "Hard Mode". The hard mode consist of random red and coloured balls together with 3 random obstacles (blocks). This create a higher difficulty level of a game of snooker to the player, testing their skills and adaptability. The players are to consider the blocks in the way to make their shots while being concious of not to plot the coloured balls with the objective of plotting the rest of the red balls. I believe this creates a higher level of problem solving sales, while preventing a high chance of probability if it is not a fixed position but a random one, 
