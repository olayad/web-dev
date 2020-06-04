// let p1;
// let p2;
// $(document).ready(function() {
// 	p1 = prompt("Player A please enter your name");
// 	p2 = prompt("Player B please enter your name");
// 	console.log("playerA: ", p1);
// 	console.log("playerB: ", p2)    ;
// });

let board = {
	width: 7,
	height: 5
}

let p1Color = 'blue';
let p2Color = 'red';
let currTurnColor;
let p1Turn = true;
let gameRunning = true;

let rowIndexToUse = {
	0: 4,
	1: 4,
	2: 4,
	3: 4,
	4: 4,
	5: 4,
	6: 4
};

function getColClicked(e) {
	return e.target.parentNode.cellIndex;
};

function getRowIndex(col) {
	let index = rowIndexToUse[col];
	decrementRow(col)
	return index;
}

function decrementRow(col) {
	 rowIndexToUse[col]--;
};

function getTurnColor() {
	if (p1Turn) {
		return p1Color;
	} else {
		return p2Color;
	}
}

function markCircle(col) {
	let row = getRowIndex(col)
	updateCircleColor(col, row);
}

function updateCircleColor(colIndex, rowIndex) {
	let row = "tr:eq("+rowIndex+")";
	let col = "td:eq("+colIndex+")";
	let color = getTurnColor();
	$('#roundtable').find(row).find(col).find('span').toggleClass('grey');
	$('#roundtable').find(row).find(col).find('span').toggleClass(color);
}

function choiceIsValid(col) {
	return rowIndexToUse[col] >= 0;
}

function changeTurn() {
	p1Turn = !p1Turn;
	if (p1Turn) {
		console.log($('#player-turn').html('p1 - blue'));
	} else {
		console.log($('#player-turn').html('p2 - red'));
	}
}

function getScore() {
	let isWinner = false;
	isWinner = getScoreVertically();
	if (!isWinner) {
		isWinner = getScoreHorizontally();
	}
	console.log("getScore() - isWinner:"+isWinner);
	return isWinner;
}

function getScoreVertically() {
	console.log('getScoreVertically-----')
	let score = 0;
	let isWinner = false;
	for (let col = 0 ; col < board.width ; col++) {
		for (let row = 0 ; row < board.height ; row ++) {
			if (playerCheckerFound(col, row)) {
				// found color!
				score++;
				console.log("Scored at row:"+row+", col:"+col+" - Total score:"+" "+score);
			}
			else {
				// reset score
				score = 0;
			}
			if (score === 4) {
				//congrats you win
				isWinner = true;
			}
		}
	}
	return isWinner;
}

function getScoreHorizontally() {
	console.log('getScoreHorizontally-----')
	let score = 0;
	let isWinner = false;
	for (let row = 0 ; row < board.height ; row ++) {
		for (let col = 0 ; col < board.width ; col++) {
			if (playerCheckerFound(col, row)) {
				// found color!
				score++;
				console.log("Scored at row:"+row+", col:"+col+" - Total score:"+" "+score);
			}
			else {
				// reset score
				score = 0;
			}
			if (score === 4) {
				//congrats you win
				isWinner = true;
			}
		}
	}
	return isWinner;
}

function playerCheckerFound(col, row) {
	//TODO: Fix the 4, change to column
	let color = getTurnColor();
	return $('#roundtable').find('tr').eq(row).find('td').eq(col).find('span').hasClass(color);
}

let click = $('td').click(function (e) {
	console.log('\n');
	if (gameRunning){
		let col;
		// User selection
		col = getColClicked(e);
		let userSelectionIsValid = false;
		userSelectionIsValid = choiceIsValid(col);
		if (!userSelectionIsValid) {
			console.log('[ERROR] - Invalid selection, try again');
			return false;
		}
		console.log('User selection is valid col:'+col);
		markCircle(col);

		let isWinner = false;
		isWinner = getScore();
		if (isWinner){
			gameRunning = false;
			console.log('********* WINNER *********')
		}
		changeTurn();
	}
});
