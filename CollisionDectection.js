// Function to check for collision between balls and against walll
function checkCueBallCollisions() {
  // Check collisions with red 
  for (var i = 0; i < balls.length; i++) {
    if (whiteball && Matter.SAT.collides(whiteball, balls[i]).collided) {
      handleCueBallCollision(whiteball, balls[i]);
    }
  }    
  // Check collisions with walls
  for (var i = 0; i < walls.length; i++) {
    if (whiteball && Matter.SAT.collides(whiteball, walls[i]).collided) {
      handleCueBallCollision(whiteball, walls[i]);
    }
  }

}

// Console log the outcome
function handleCueBallCollision(cueBall, otherObject, block) {
  // Print a corresponding message when collision happens
  if (otherObject.color === 'red') {
    console.log('Cue ball collided with a red ball');
  } else if (otherObject.render.fillStyle === 'blue' || 
            otherObject.render.fillStyle === 'yellow' || 
            otherObject.render.fillStyle === 'purple' ||
            otherObject.render.fillStyle === 'black' ||
            otherObject.render.fillStyle === 'orange' ||
            otherObject.render.fillStyle === 'brown') {
    console.log('Cue ball collided with a colored ball');
  } else if (walls.includes(otherObject)) {
    console.log('Cue ball collided with a wall');
  } else {
    console.log('Cue ball collided with an unknown object');
  }
}


