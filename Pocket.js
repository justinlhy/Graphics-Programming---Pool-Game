
function Pocket(x, y, radius) {
  this.body = Bodies.circle(x, y, radius, { isStatic: true });
  World.add(engine.world, [this.body]);

  this.show = function () {
    fill(0);
    noStroke();
    drawVertices(this.body.vertices);
  };
}

// Draw the pcokets
function drawPocket(pocket) {
  pocket.show();
}


// Set up the pockets at the fixed position
function setupPockets(tableX, tableY) {
  pockets.push(new Pocket(tableX, tableY, 11));
  pockets.push(new Pocket(tableX + tableWidth, tableY, 11));
  pockets.push(new Pocket(tableX, tableY + tableLength, 11));
  pockets.push(new Pocket(tableX + tableWidth, tableY + tableLength, 11));
  pockets.push(new Pocket(tableX , tableY + tableLength / 2 + 15, 11));
  pockets.push(new Pocket(tableX + tableWidth , tableY + tableLength / 2 + 15, 11));
} 

// Draw the pockets
function drawPockets() {
  for (var i = 0; i < pockets.length; i++) {
    drawPocket(pockets[i]);
  }
}

function isBallPocketed(ball, pocket) {
  return Matter.SAT.collides(ball, pocket.body).collided;
}

// Implementing different results when red ball/coloured ball/white ball is being pocketed
function checkBallPockets() {
  var ballRadius = tableWidth / 25 / 2;

  // Check white ball pocketing
  if (whiteball && !isWhiteballPocketed) {
    for (var j = 0; j < pockets.length; j++) {
      if (isBallPocketed(whiteball, pockets[j])) {
        // Set the restitution to 0 , so it wouldnt bounce off
        whiteball.restitution = 0;

        // Remove the pocketed whiteball
        World.remove(engine.world, whiteball);

        // Set the flag to start placing the whiteball at desired position
        placingWhiteball = true;

        // Set the pocketed flag to draw it
        isWhiteballPocketed = true;

        // Exit the loop 
        return;
      }
    }
  }

  // Check colored and red balls pocketing
  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < pockets.length; j++) {
      if (isBallPocketed(balls[i], pockets[j])) {
        balls[i].restitution = 0;
        // Reset the position of the colored ball to original position
        if (balls[i].render.fillStyle === 'blue') {
          coloredBallCount++;
          Body.setPosition(balls[i], { x: tableX + tableWidth / 2, y: tableY + tableLength - 100 });
        } else if (balls[i].render.fillStyle === 'yellow') {
          coloredBallCount++;
          Body.setPosition(balls[i], { x: tableX + tableWidth / 2 - 20 * ballRadius, y: tableY + tableLength - 200 });
        } else if (balls[i].render.fillStyle === 'purple') {
          coloredBallCount++;
          Body.setPosition(balls[i], { x: tableX + tableWidth / 2 + 20 * ballRadius, y: tableY + tableLength - 200 });
        } else if (balls[i].render.fillStyle === 'black') {
          coloredBallCount++;
          Body.setPosition(balls[i], { x: tableX + tableWidth / 2, y: tableY + tableLength -450 });
        } else if (balls[i].render.fillStyle === 'brown') {
          coloredBallCount++;
          Body.setPosition(balls[i], { x: tableX + tableWidth / 2 - 20 * ballRadius, y: tableY + tableLength - 600 });
        } else if (balls[i].render.fillStyle === 'orange') {
          coloredBallCount++;
          Body.setPosition(balls[i], { x: tableX + tableWidth / 2 + 20 * ballRadius, y: tableY + tableLength - 600 });
        } else if (balls[i].render.fillStyle === 'red') {
          
          // Remove red ball from the array
          World.remove(engine.world, balls[i]);
          balls.splice(i, 1);
          i--;
          redBallCount++;
        } else {
          // Colored ball is pocketed, increase colored ball count
          coloredBalls.push(balls[i]);
        }

        break;
      }
    }
  }

  // Check if two colored balls are pocketed if so restart the mode
if (coloredBallCount >= 2) {
  changeMode('reset', tableX, tableY, tableWidth, tableLength);
  console.log('Two colored balls pocketed! Game restarted.');
}


}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}





