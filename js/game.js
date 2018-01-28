const snake = new Snake()
let food

//Usando la libreria p5js
function setup() {
   createCanvas(600, 600)
   generateFood()
   frameRate(15)
}

function draw() {
   background(51)
   if(snake.eatFood(food)) {
      generateFood()
	}
	
	snake.selfFood()
	snake.move()
   snake.show()

   fill(62, 198, 7)
   rect(food.x, food.y, 20, 20)
}

function keyPressed() {
	switch(keyCode) {
		case LEFT_ARROW:
			snake.direction(-1, 0)
			break
		case UP_ARROW:
			snake.direction(0, -1)
			break
		case RIGHT_ARROW:
			snake.direction(1, 0)
			break
		case DOWN_ARROW:
			snake.direction(0, 1)
			break
	}
}

function generateFood() {
	let cols = floor(width / 20)
	let rows = floor(height / 20)
	food = createVector(floor(random(cols)), floor(random(rows)))
	food.mult(20)
}