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

// Function to solve and find roots
const solveAndFindRoots = (a, b, c, d) => {
	const exponent = -d / a; // Exponent (negative value for correct endline)
	const exponentValue = Math.exp(exponent); // Exponent value
	const root = (exponentValue - c) / b; // Root

	// Inequality sign symbol check
	const inequalitySign = a < 0 || b < 0 ? '>' : '<';

	// Get interval by inequality sign
	let interval;
	if (inequalitySign === '>') {
		interval = `(${root.toFixed(2)}, +∞)`;
	} else {
		interval = `(-∞, ${root.toFixed(2)})`;
	}

	// Console log (correct solution) - удалить потом эти логи!!!
	console.log(`1) ${a} ln(${b}x ${c < 0 ? c : '+ ' + c}) ${d < 0 ? '- ' + Math.abs(d) : '+ ' + d} < 0`);
	console.log(`2) ${a} ln(${b}x ${c < 0 ? c : '+ ' + c}) < ${-d} | /${a}`);
	console.log(`3) ln(${b}x ${c < 0 ? c : '+ ' + c}) ${a < 0 ? '>' : '<'} ${-d / a}`);
	console.log(`4) ${b}x ${c < 0 ? c : '+ ' + c} ${a < 0 ? '>' : '<'} e^${exponent}`);
	console.log(`5) ${b}x ${inequalitySign} e^${exponent} ${c < 0 ? '+ ' + c : '- ' + c}`); /*

	Как -d/a превратилось в степень экспонента?

	Я использовал свойство натурального логарифма: если ln(a) = b, значит a = e^b
	Пример: ln(7x + 3) < -2.5

	Шаги:
	1) используем: ln(a) = b, значит a = e^b
	2) получаем: 7x + 3 < e^(-2.5)
	3) Продолжаем решать неравенство.

	Оно помогает нам устранить логарифм для решения неравенства.

	Поэтому получилось => bx + c (< или >) e^(-d / a)

	*/
	console.log(`6) x ${inequalitySign} (e^${exponent} ${c < 0 ? '+ ' + c : '- ' + c}) / ${b}`);
	console.log(`Root: ${interval}`);

	document.getElementById('result-area').value = `Root: ${interval}`; // print result
};

// Function to output the result
const outputFunction = (checkResult, a, b, c, d) => {
	if (checkResult[0]) {
		// If data is valid, start graph and solve inequality
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
