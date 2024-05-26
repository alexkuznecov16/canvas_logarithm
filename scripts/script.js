// main function - do check, get elements and send result
const mainFunction = () => {
	// Create variables
	let a = Number(document.getElementById('aVariable').value);
	let b = Number(document.getElementById('bVariable').value);
	let c = Number(document.getElementById('cVariable').value);
	let d = Number(document.getElementById('dVariable').value);

	// Check the input values
	let checkingResult = checkFunction(a, b, c, d);

	// Output the result
	outputFunction(checkingResult, a, b, c, d);
};

// check function - check a,b,c,d values
const checkFunction = (a, b, c, d) => {
	let result = ''; // result variable
	// Check if any input is empty
	if (a == '' || b == '' || c == '' || d == '') {
		result = [false, 'Invalid data: inputs cannot be empty.'];
	} else if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
		// Check if inputs are not numbers
		result = [false, 'Invalid data: enter only numbers.'];
	} else if (Number.isInteger(a) === false || Number.isInteger(b) === false || Number.isInteger(c) === false || Number.isInteger(d) === false) {
		// Check if inputs are not integers
		result = [false, 'Invalid data: enter only integer numbers.'];
	} else if (a < -100 || a > 100 || a == 0 || b < -100 || b > 100 || b == 0 || c < -100 || c > 100 || c == 0 || d < -100 || d > 100 || d == 0) {
		// Check if inputs are within the range of 0 to 100
		result = [false, 'Invalid data: numbers cannot be less than -100 or greater than 100 and be equals 0'];
	} else {
		// If all checks pass, data is valid
		result = [true, 'Valid data'];
	}
	return result;
};

// Функция для решения неравенства и нахождения корней
const solveAndFindRoots = (a, b, c, d) => {
	// Решение неравенства
	let positiveIntervals = '';
	let lastX = null;
	for (let x = 0; x < myCanvas.width; x += 1) {
		const y = a * Math.log((b * (x - myCanvas.width / 2)) / 20 + c) + d;
		if (y > 0) {
			if (lastX === null) {
				lastX = x;
			}
		} else {
			if (lastX !== null) {
				positiveIntervals += `[${lastX}, ${x}] `;
				lastX = null;
			}
		}
	}
	if (lastX !== null) {
		positiveIntervals += `[${lastX}, ${myCanvas.width}]`;
	}

	// Вывод результата
	document.getElementById('result-area').innerText = `Интервалы, на которых неравенство выполняется: ${positiveIntervals}`;
};

// Функция для нахождения корня методом половинного деления
const findRoot = (a, b, c, d, x1, x2) => {
	const EPS = 1e-6; // Точность
	while (x2 - x1 > EPS) {
		const mid = (x1 + x2) / 2;
		const y = a * Math.log((b * (mid - myCanvas.width / 2)) / 20 + c) + d;
		if (y * (a * Math.log((b * (x1 - myCanvas.width / 2)) / 20 + c) + d) < 0) {
			x2 = mid;
		} else {
			x1 = mid;
		}
	}
	return (x1 + x2) / 2;
};

// Function to output the result
const outputFunction = (checkResult, a, b, c, d) => {
	if (checkResult[0]) {
		// If data is valid, start graph
		startGraph(a, b, c, d);
		solveAndFindRoots(a, b, c, d);
	} else {
		// If data is invalid, alert the user
		alert(checkResult[1]);
	}
};

// Get canvas element
const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext('2d');

// Function to draw grid lines on canvas
const startGraph = (a, b, c, d) => {
	// Draw grid lines
	const cells = () => {
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

		for (let i = 0; i < myCanvas.width; i += 20) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, myCanvas.height);
		}

		for (let j = 0; j < myCanvas.height; j += 20) {
			ctx.moveTo(0, j);
			ctx.lineTo(myCanvas.width, j);
		}

		ctx.strokeStyle = 'black';
		ctx.lineWidth = 0.5;
		ctx.stroke();

		// x
		ctx.beginPath();
		ctx.moveTo(0, myCanvas.height / 2);
		ctx.lineTo(myCanvas.width, myCanvas.height / 2);
		ctx.lineWidth = 2;
		ctx.stroke();

		// y
		ctx.beginPath();
		ctx.moveTo(myCanvas.width / 2, 0);
		ctx.lineTo(myCanvas.width / 2, myCanvas.height);
		ctx.lineWidth = 2;
		ctx.stroke();
	};
	cells();

	// Draw function graph
	ctx.beginPath();
	ctx.strokeStyle = 'green';
	ctx.lineWidth = 2;
	for (let x = 0; x < myCanvas.width; x += 1) {
		let y = a * Math.log((b * (x - myCanvas.width / 2)) / 20 + c) + d;
		// if y-value is not negative
		if (y < 0) {
			y = 0;
		}
		ctx.lineTo(x, myCanvas.height / 2 - y);
	}
	ctx.stroke();
	ctx.closePath();
};
