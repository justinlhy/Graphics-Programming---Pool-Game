// Define a variable for the hard mode obstacle
var drawBlocks = [];
isHardMode = false;

//--------------------------------------------------------------------------
// Function to handle mode change
function changeMode(mode, tableX, tableY, tableWidth, tableLength) {
  // Reset counters when mode is changed
  coloredBallCount = 0;
  redBallCount = 0;

  // Clear existing balls and  block from the world when mode is changed
  for (var i = 0; i < balls.length; i++) {
      World.remove(engine.world, balls[i]);
  }
  // Reset Balls
  balls = []; 

  if (isHardMode) {
      // Remove the  blocks if they exist
      for (var i = 0; i < drawBlocks.length; i++) {
          World.remove(engine.world, drawBlocks[i]);
      }
      // Reset Blocks
      drawBlocks = []; 
  }

  // Reset the pos of the white ball to original pos
  generatewhiteball(tableX, tableY);

  // Clear existing balls
  for (var i = 0; i < balls.length; i++) {
      World.remove(engine.world, balls[i]);
  }
  balls = []; // Reset array

  // Reset counters when changing mode
  coloredBallCount = 0;
  redBallCount = 0;

  // Handle the reset option
  if (mode === 'reset') {
      // Regenerate balls and  block based on the mode
      if (currentMode === 'startingPositions') {
          generateStartingPositions(tableX, tableY);
      } else if (currentMode === 'randomReds') {
          generateRandomReds(tableX, tableY);
      } else if (currentMode === 'randomRedsAndColoured') {
          generateRandomRedsAndColoured(tableX, tableY);
      } else if (isHardMode) {
          generateHardMode(tableX, tableY);
      }
  } else {
      // Set the hard mode flag
      isHardMode = mode === 'hardMode';

      // Store  current mode
      currentMode = mode;

      // Generate balls and block based on the selected mode
      if (mode === 'startingPositions') {
          generateStartingPositions(tableX, tableY);
      } else if (mode === 'randomReds') {
          generateRandomReds(tableX, tableY);
      } else if (mode === 'randomRedsAndColoured') {
          generateRandomRedsAndColoured(tableX, tableY);
      } else if (isHardMode) {
          generateHardMode(tableX, tableY);
      }
  }
}

//--------------------------------------------------------------------------
// First game mode set up
function generateStartingPositions(tableX, tableY) {
  var ballRadius = tableWidth / 36 / 2; 
  var pyramidHeight = 5;
  var startX = tableX + tableWidth /1.75 - pyramidHeight * ballRadius;
  var startYBottom = tableY + tableLength - ballRadius * 100;

  // Generate pyramid of red balls
  for (var i = pyramidHeight - 1; i >= 0; i--) {
    for (var j = 0; j <= i; j++) {
      var ball = Bodies.circle(
        startX + j * ballRadius * 2 - i * ballRadius,
        startYBottom - i * ballRadius * 2,
        ballRadius,
        { restitution: 1, friction: 0.2, render: { fillStyle: 'red' }, color: 'red' }
      );
      balls.push(ball);
    }
  }
  
    // Add colored balls at fixed pos
    var coloredBalls = [
      { x: tableX + tableWidth / 2, y: tableY + tableLength - 100, color: 'blue' },
      { x: tableX + tableWidth / 2 - 20 * ballRadius, y: tableY + tableLength - 200, color: 'yellow' },
      { x: tableX + tableWidth / 2 + 20 * ballRadius, y: tableY + tableLength - 200, color: 'purple' },
      { x: tableX + tableWidth / 2, y: tableY + tableLength -450 , color: 'black' },
      { x: tableX + tableWidth / 2 - 20 * ballRadius, y: tableY + tableLength - 600, color: 'brown' },
      { x: tableX + tableWidth / 2 + 20 * ballRadius, y: tableY + tableLength - 600, color: 'orange' },
    ];
  
    for (var i = 0; i < coloredBalls.length; i++) {
      var coloredBall = Bodies.circle(
        coloredBalls[i].x,
        coloredBalls[i].y,
        ballRadius,
        { restitution: 1, friction: 0.2, render: { fillStyle: coloredBalls[i].color } }
      );
      balls.push(coloredBall);
    }
  
    World.add(engine.world, balls);
  }

  //--------------------------------------------------------------------------
  // Second game mode set up
  function generateRandomReds(tableX, tableY) {
    var ballRadius = tableWidth / 36 / 2;
  
    // Generate red balls at random
    for (var i = 0; i < 15; i++) {
      var ball = Bodies.circle(
        tableX + Math.random() * (tableWidth - 2 * ballRadius) + ballRadius,
        tableY + Math.random() * (tableLength - 2 * ballRadius) + ballRadius,
        ballRadius,
        { restitution: 1, friction: 0.2, render: { fillStyle: 'red' }, color: 'red' }
      );
      balls.push(ball);
    }
        // Add colored balls at fixed pos
        var coloredBalls = [
          { x: tableX + tableWidth / 2, y: tableY + tableLength - 100, color: 'blue' },
          { x: tableX + tableWidth / 2 - 20 * ballRadius, y: tableY + tableLength - 200, color: 'yellow' },
          { x: tableX + tableWidth / 2 + 20 * ballRadius, y: tableY + tableLength - 200, color: 'purple' },
          { x: tableX + tableWidth / 2, y: tableY + tableLength -450 , color: 'black' },
          { x: tableX + tableWidth / 2 - 20 * ballRadius, y: tableY + tableLength - 600, color: 'brown' },
          { x: tableX + tableWidth / 2 + 20 * ballRadius, y: tableY + tableLength - 600, color: 'orange' },
        ];
    for (var i = 0; i < coloredBalls.length; i++) {
        var coloredBall = Bodies.circle(
          coloredBalls[i].x,
          coloredBalls[i].y,
          ballRadius,
          { restitution: 1, friction: 0.2, render: { fillStyle: coloredBalls[i].color } }
        );
        balls.push(coloredBall);
      }
    
      World.add(engine.world, balls);
  }

  //--------------------------------------------------------------------------
    // Third game mode set up
  function generateRandomRedsAndColoured(tableX, tableY) {
    var ballRadius = tableWidth / 36 / 2;
    var colors = ['blue', 'yellow', 'purple', 'black', 'orange', 'brown'];
  
    // Generate red and colored balls at random 
    for (var i = 0; i < 21; i++) {
      var color = i < colors.length ? colors[i] : 'red';
      var ball = Bodies.circle(
        tableX + Math.random() * (tableWidth - 2 * ballRadius) + ballRadius,
        tableY + Math.random() * (tableLength - 2 * ballRadius) + ballRadius,
        ballRadius,
        { restitution: 1, friction: 0.2, render: { fillStyle: color }, color: 'red' }
      );
      balls.push(ball);
      World.add(engine.world, ball);
    }
  }

  //--------------------------------------------------------------------------
  // Hard mode set uo
  function generateHardMode(tableX, tableY) {
    // Set the hard mode flag
    isHardMode = true;
  
    var ballRadius = tableWidth / 36 / 2;
    var colors = ['blue', 'yellow', 'purple', 'black', 'brown', 'orange'];
  
    // Generate red and colored balls at random 
    for (var i = 0; i < 21; i++) {
      var color = i < colors.length ? colors[i] : 'red';
      var ball = Bodies.circle(
        tableX + Math.random() * (tableWidth - 2 * ballRadius) + ballRadius,
        tableY + Math.random() * (tableLength - 2 * ballRadius) + ballRadius,
        ballRadius,
        { restitution: 1, friction: 0.2, render: { fillStyle: color }, color: 'red' }
      );
      balls.push(ball);
      World.add(engine.world, ball);
    }
  
    // Generate obstacle blocks at random positions
    var blockWidth = 100;
    var blockHeight = 20;

    for (var i = 0; i < 3; i++) {
        var block = Bodies.rectangle(
            tableX + Math.random() * (tableWidth - blockWidth),
            tableY + Math.random() * (tableLength - blockHeight),
            blockWidth,
            blockHeight,
            { isStatic: true, restitution: 0, friction: 0, render: { fillStyle: 'black' } }
        );
        // Push each block to array
        drawBlocks.push(block); 
    }

    World.add(engine.world, [...balls, ...drawBlocks]);
}

// Draw Obstable block
function drawObstacle() {
    for (var i = 0; i < drawBlocks.length; i++) {
        var blocks = drawBlocks[i];
        if (blocks) {
            var pos = blocks.position;
            var width = blocks.bounds.max.x - blocks.bounds.min.x;
            var height = blocks.bounds.max.y - blocks.bounds.min.y;

            push();
            translate(pos.x, pos.y);
            rotate(blocks.angle);

            // Styling 
            fill(51, 51, 51); 
            stroke(255);      
            strokeWeight(2);   

            // Rounded rectangle
            rectMode(CENTER);
            rect(0, 0, width, height, 10);

            pop();
        }
    }
}