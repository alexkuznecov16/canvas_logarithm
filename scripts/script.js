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

// Function (Bisection method) inequality finding roots
// Divide to 2 parts
const findRoot = (a, b, c, d, x1, x2) => {
	const precision = 0.000001; // Precision for root finding
	let mid, yMid, y1, y2; // Middle, y middle, initial y, and final y values

	const f = x => a * Math.log(b * x + c) + d; // Function to find the root of

	y1 = f(x1);
	y2 = f(x2);

	// Ensure that the interval contains a root
	if (y1 * y2 > 0) {
		console.error(`No root in interval [${x1}, ${x2}]: f(${x1}) = ${y1}, f(${x2}) = ${y2}`);
		throw new Error('The interval does not contain a root.');
	}

	while (x2 - x1 > precision) {
		mid = (x1 + x2) / 2; // Middle of the interval
		yMid = f(mid);

		if (yMid * y1 < 0) {
			x2 = mid; // Root is in the first part of interval
		} else {
			x1 = mid; // Root is in the second part of interval
			y1 = yMid; // Update y1 for the next interval
		}
	}

	return (x1 + x2) / 2; // Return the midpoint as the root
};

// Function to solve and find roots
const solveAndFindRoots = (a, b, c, d) => {
	const exponent = d / a; // exponent
	const exponentValue = Math.exp(exponent); // exponent value
	const root = (exponentValue - c) / b; // root
	console.log(`1) ${a} ln (${b}x + ${c}) - ${d} > 0  | +${d}`);
	console.log(`2) ${a} ln (${b}x + ${c}) > ${d}  | /${a}`);
	console.log(`3) ln (${b}x + ${c}) > ${d} / ${a}`);
	console.log(`4) ${b}x + ${c} > e^${exponent}  | -${c}`);
	console.log(`5) ${b}x > e^${exponent} - ${c}  | /${b}`);
	console.log(`6) x > (e^${exponent} - ${c}) / ${b}`);
	console.log(`Root: (e^${exponent} - ${c}) / ${b}, +${Infinity})`);
	console.log(`Root: (${root.toFixed(2)}, +${Infinity})`);
	
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
	for (let x = 0; x < myCanvas.width; x++) {
		let y = a * Math.log((b * (x - myCanvas.width / 2)) / 20 + c) + d;
		// if y-value is negative
		if (y < 0) {
			y = -myCanvas.height;
		}
		ctx.lineTo(x, myCanvas.height / 2 - y);
	}
	ctx.stroke();
	ctx.closePath();
};
