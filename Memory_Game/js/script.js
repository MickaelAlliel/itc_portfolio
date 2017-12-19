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
var card_back;

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
var SCORE = 0;
var SCORE_INCREMENT = 100;

var FAILED_TRIES = 0;

var TIME = 0;

var CARD_WIDTH = 200;
var CARD_HEIGHT = 250;

// --Global Vars

// Card Object
function Card(name, position) {
	this.name: 'animal-' + name,
	this.position: position,
	this.id: 'card' + this.position.x + this.position.y,
	this.matched: false,
	this.element: $('<div/>').attr('id', this.id).attr('name', this.name).addClass('card').addClass('card-back');,
	this.flip = function() {
		if (this.element.attr('class').contains('card-front')) {
			this.element.removeClass('card-front');
			this.element.addClass('card-back');
		} else {
			this.element.removeClass('card-back');
			this.element.addClass('card-front');
		}
	},
	this.setMatched = function() {
		this.matched = true;
	},
	this.unsetMatched = function() {
		this.matched = false;
	},
};
// --Card Object

// HTML Generation
// --HTML Generation

$().ready(function() {

});