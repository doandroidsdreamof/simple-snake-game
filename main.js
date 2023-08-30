const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const showFPS = document.querySelector('.fps');
const scoreIndicator = document.querySelector('.score');

let tileCount = 25;
let score = 0;
let tileSize = canvas.width / tileCount;
let gameOver = false;

const FPS = 50;
const canvasSize = 600;

const arrowButtons = {
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40,
};

const applePosition = [
	{
		x: randomIntFromInterval(10, canvasSize - 10),
		y: randomIntFromInterval(10, canvasSize - 10),
	},
];

let snakePosition = [
	{
		x: 30,
		y: 0,
	},
];

const velocity = {
	dx: 10,
	dy: 0,
};

function createSnake() {
	const head = {
		x: snakePosition[0].x + velocity.dx,
		y: snakePosition[0].y + velocity.dy,
	};
	snakePosition.unshift(head);
	snakePosition.pop();
	checkCollision();
	if (
		Math.abs(snakePosition[0].x - applePosition[0].x) < tileSize &&
		Math.abs(snakePosition[0].y - applePosition[0].y) < tileSize
	) {
		snakePosition.unshift(head);
		score += 1;
		updateAppel();
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function createApple() {
	context.fillStyle = 'green';
	context.fillRect(
		applePosition[0].x,
		applePosition[0].y,
		tileSize,
		tileSize
	);
}

function updateAppel() {
	applePosition[0].x = randomIntFromInterval(10, canvasSize - 10);
	applePosition[0].y = randomIntFromInterval(10, canvasSize - 10);
}

function updateSnakePosition() {
	snakePosition = [
		{
			x: 0,
			y: 0,
		},
	];
	snakePosition[0].x = randomIntFromInterval(10, 590);
	snakePosition[0].y = randomIntFromInterval(10, 590);
}

function checkCollision() {
	if (snakePosition.length > 3) {
		for (let i = 1; i < snakePosition.length; ++i) {
			if (
				snakePosition[0].x === snakePosition[i].x &&
				snakePosition[0].y === snakePosition[i].y
			) {
				resetGame();
			}
		}
	}
}
function drawSnake() {
	context.fillStyle = 'red';
	snakePosition.forEach((item, index) => {
		if (snakePosition[index].x > canvasSize) {
			snakePosition[0].x = 0;
		}
		if (snakePosition[index].x < 0) {
			snakePosition[index].x = canvasSize - tileCount;
		}
		if (snakePosition[index].y >= canvasSize) {
			snakePosition[index].y = 0;
		}
		if (snakePosition[index].y < 0) {
			snakePosition[0].y = canvasSize - tileCount;
		} else {
			context.fillRect(
				snakePosition[index].x,
				snakePosition[index].y,
				tileSize,
				tileSize
			);
		}
	});
}

function handleNavigation(e) {
	if (e.keyCode === arrowButtons.LEFT && velocity.dx !== 10) {
		velocity.dy = 0;
		velocity.dx = -10;
	}
	if (e.keyCode === arrowButtons.RIGHT && velocity.dx !== -10) {
		velocity.dy = 0;
		velocity.dx = 10;
	}
	if (e.keyCode === arrowButtons.DOWN && velocity.dy !== -10) {
		velocity.dy = 10;
		velocity.dx = 0;
	}
	if (e.keyCode === arrowButtons.UP && velocity.dy !== 10) {
		velocity.dy = -10;
		velocity.dx = 0;
	}
}

const initIndicators = () => {
	showFPS.innerText = 'FPS: ' + FPS;
	scoreIndicator.innerText = 'Score: ' + score;
};

window.addEventListener('keydown', handleNavigation);

function resetGame() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	updateSnakePosition();
	updateAppel();
	tileCount = 30;
	score = 0;
	gameOver = true;
	console.log('🚀 ~ gameOver => ', gameOver);
	if (gameOver === true) {
		gameOver = false;
		return;
	}
}

function game() {
	if (gameOver === false) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		createApple();
		initIndicators();
		createSnake();
		drawSnake();
	}
}
setInterval(game, 1000 / FPS);
