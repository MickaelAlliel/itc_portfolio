// Helper Functions
function parseTime(time) {
	let timeString = "";
	let minutes = 0;
	let seconds = 0;

	minutes = parseInt(time / 100);
	seconds = parseInt(time % 100);

	if (minutes < 10) {
		minutes = "0" + minutes.toString();
	}

	if (seconds < 10) {
		seconds = "0" + seconds.toString();
	}

	timeString = minutes + ":" + seconds;

	return timeString;
}

function incrementTime(currentTime) {
	var nextTime = 0;
	var minutes = 0;
	var seconds = 0;

	minutes = parseInt(currentTime / 100);
	seconds = parseInt(currentTime % 100);

	if (seconds == 59) {
		minutes += 1;
		seconds = 0;
	} else {
		seconds += 1;
	}

	nextTime = minutes * 100 + seconds;

	return nextTime;
}

function getCardsFacingUp(cards) {
	let faceup = [];

	cards.forEach(function(card) {
		if (card.isSideUp() && card.matched === false) {
			faceup.push(card);
		}
	});

	return faceup;
}

function getCardsMatched(cards) {
	let matched = [];

	cards.forEach(function(card) {
		if (card.matched === true) {
			matched.push(card);
		}
	});

	return matched;
}

function flipAllFaceDown(cards) {
	cards.forEach(function(card) {
		if (card.isSideUp() && card.matched === false) {
			card.flip();
		}
	});
}

function timer(action) {
	if (action == 'start') {
		if (!TIMER_ELEMENT) {
			TIMER_ELEMENT = $('#timerText');
		}

		TIMER_INTERVAL = setInterval(function() {
			TIME = incrementTime(TIME);
			TIMER_ELEMENT.html(parseTime(TIME));
			//console.log(TIMER_ELEMENT);
		}, 1000);
	} else if (action == 'stop') {
		clearInterval(TIMER_INTERVAL);
	} else if (action == 'reset') {
		if (!TIMER_ELEMENT) {
			TIMER_ELEMENT = $('#timerText');
		}

		// Clearing previous interval
		clearInterval(TIMER_INTERVAL);

		// Resetting Time to 0
		TIME = 0;
		TIMER_ELEMENT.html(parseTime(TIME));

		TIMER_INTERVAL = setInterval(function() {
			TIME = incrementTime(TIME);
			TIMER_ELEMENT.html(parseTime(TIME));
			//console.log(TIMER_ELEMENT);
		}, 1000);
	} else {
		console.error('Invalid Timer Action. Valid actions are : start, stop, reset');
	}
}

// --Helper Functions

// State Management
var StateManager = {
	Idle: 'idle',
	StartGame: 'start_game',
	Playing: 'playing',
	RestartGame: 'restart_game',
	Win: 'win',
	Lose: 'lose',
};

var GameState = StateManager.Idle;
// --State Management

// Resources
var card_images = [];

// Setting images sources
var base_image_path = './assets/cards/';
var base_image_ext = '.jpg';
var img_qty = 12; // Images files start from 1, until img_qty
for (var i = 1; i <= img_qty; i++) {
	card_images.push(base_image_path + i + base_image_ext);
}

card_back = base_image_path + 'card_back' + base_image_ext;
// --Resources

// Global Vars
var GAMELOOP_INTERVAL = null;
var CAN_CLICK = true;

var FAILED_TRIES = 0;

var TIME = 0;
var TIMER_INTERVAL = null;
var TIMER_ELEMENT = null;

var CARDS_IN_GAME = [];

// --Global Vars

// HTML Generation
function generateRows() {
	let board = $('#board');

	for (var i = 0; i < 3; i++) {
		let row = $('<div/>').addClass('board-row').addClass('row-' + i);
		board.append(row);
	}
}

function generateCards() {
	// Easy Difficulty
	let totalCells = 3 * 4;
	let totalImagesNeeded = totalCells / 2;
	let imagesToUse = [];
	let imagesAlreadyChosen = [];

	// Choosing randomly {totalImagesNeeded} images
	for (var i = 0; i < totalImagesNeeded; i++) {
		let unusedImgFound = false;

		while (!unusedImgFound) {
			let imgIndex = Math.floor((Math.random() * card_images.length));
			if (imagesAlreadyChosen.includes(imgIndex) === false) {
				imagesToUse.push({
					src: card_images[imgIndex],
					timesUsed: 0,
				});
				imagesAlreadyChosen.push(imgIndex);

				unusedImgFound = true;
			}
		}
	}


	// Generating and setting cards to cells randomly
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 4; col++) {
			let foundAppropriateCard = false;

			while (foundAppropriateCard === false) {
				let image = imagesToUse[Math.floor((Math.random() * imagesToUse.length))];
				if (image.timesUsed < 2) {
					let card = new Card({x: col, y: row}, image.src);
					CARDS_IN_GAME.push(card);
					card.addToView();

					image.timesUsed++;
					foundAppropriateCard = true;
				}
			}
		}
	}
	// --Easy Difficulty
}

function generateGame() {
	generateRows();
	generateCards();
	generateGameEvents();
}

function degenerateGame() {
	$('#board').html('');
}
// --HTML Generation

// Event Listeners
function generateEvents() {
	$('#newGameBtn').click(function(e) {
		if (GameState == StateManager.Idle) {
			GameState = StateManager.StartGame;
			
			$(e.target).removeClass('btn-success');
			$(e.target).addClass('btn-danger');
		} else {
			GameState = StateManager.RestartGame;
		}
	});

	$('#overlayNewGame').click(function(e) {
		restart();
	});
}

function generateGameEvents() {
	CARDS_IN_GAME.forEach(function(card) {
		// FLIPPING LOGIC
		$(card.element).click(function() {
			if (card.matched == false && CAN_CLICK == true) {
				if (card.isSideUp() == false) {
					card.flip();
				}	
			}
		});
		// --FLIPPING LOGIC


		// MATCHING LOGIC
		$(card.element).click(function(e) {
			if (CAN_CLICK) {
				let faceup = getCardsFacingUp(CARDS_IN_GAME);

				if (faceup.length == 2) {
					CAN_CLICK = false;

					if (faceup[0].imageSrc == faceup[1].imageSrc) {
						faceup[0].setMatched();
						faceup[1].setMatched();

						$(faceup[0].element).addClass('card-success');
						$(faceup[1].element).addClass('card-success');

						setTimeout(function() {
							$(faceup[0].element).removeClass('card-success');
							$(faceup[1].element).removeClass('card-success');
						}, 1000);
					} else {
						FAILED_TRIES++;

						$(faceup[0].element).addClass('card-fail');
						$(faceup[1].element).addClass('card-fail');

						setTimeout(function() {
							$(faceup[0].element).removeClass('card-fail');
							$(faceup[1].element).removeClass('card-fail');
						}, 1000);

						setTimeout(function() {
							flipAllFaceDown(CARDS_IN_GAME);
						}, 1000);
					}

					setTimeout(function() {
						CAN_CLICK = true;
					}, 1000);
				}
			}
		});
		// --MATCHING LOGIC
	});
}
// --Event Listeners

// Game State Handlers
function start() {
	generateGame();
	timer('start');

	GameState = StateManager.Playing;
}

function restart() {
	degenerateGame();
	generateGame();
	timer('reset');
	FAILED_TRIES = 0;

	GameState = StateManager.Playing;
}
// --Game State Handlers

// Game Loop
function game() {
	if (GameState == StateManager.StartGame) {
			start();
		} else if (GameState == StateManager.RestartGame) {
			restart();
		} else if (GameState == StateManager.Playing) {
			// Updating Failed Tries Text
			$('#failedTriesText').html(FAILED_TRIES);

			if (getCardsMatched(CARDS_IN_GAME).length == 12) {
				GameState = StateManager.Win;
			}

		} else if (GameState == StateManager.Win) {
			timer('stop');

			// Set overlay text
			$('#overlayTimerText').html(parseTime(TIME));
			$('#overlayFailedTriesText').html(FAILED_TRIES);

			// Pop up Win overlay
			$('#winOverlay').modal('show');
		} else if (GameState == StateManager.Lose) {
			timer('stop');
			//console.log('inside lose');
		}
}
//--Game Loop

$().ready(function() {
	generateEvents();

	GAMELOOP_INTERVAL = setInterval(function() {
		game();
	}, 16.66);
	
});