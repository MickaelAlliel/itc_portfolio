var quizTitle = 'Are you a good person ?';

var scoreRules = '0-5 points - Do you really want me to tell you if you are a good person or not?<br/>6-10 points - You are normal, as average as the normal american can be.<br/>11-16 points - You are a saint. Continue doing what you\'re doing!';

var questions = [
	'You see a homeless person sleeping on the street, what do you do?',
	'There is a smartphone on a bench, obviously forgotten by someone - what do you do?',
	'How many times have you done something just to help, not gaining anything from it?',
	'Have you ever told a lie? Even for good purpose.',
	'Are you often jealous of other people?'
];

var answers = [
	[
		"Kick him in the stomach. Twice.",
        "Steal from his beggar-cup all his money",
        "Leave him be",
        "Wake him up gently and buy him lunch"
	],
	[
		"Casually put it in your pocket - it's yours after all...",
        "*Look around* - Take it with you to 'find it's rightful owner'",
        "I don't really care this much",
        "Try and call someone from the contact list in order to give it back"
	],
	[
		"I prefer to ask for help than to give it.",
        "Only when I feel they really need it",
        "A few times..",
        "Giving is my motto!"
	],
	[
		"The real question is have I ever told the truth?",
        "Here and there, lies are needed in life",
        "Only for a good purpose.",
        "I never lie - I prefer to be upfront about everything"
	],
	[
		"Always - I should be the favored one, they don't deserve it",
        "Pfft, I don't get jealous, I'm better that these people",
        "No.",
        "Should I? I'm happy with who I am!"
	]
];

var textInputName = 'text-input';
var radioInputName = 'radio-input';
var checkboxInputName = 'checkbox-input';
var textareaInputName = 'textarea-input';
var selectInputName = 'select-input';



function appendTextInput(mainForm, question) {
	var textInput = $('<div/>').attr('id', 'text-input-container').attr('class', 'form-group')
	.append($('<label/>').attr('for', textInputName).attr('class', 'question').append(questions[question]))
	.append($('<input/>').attr('type', 'text').attr('id', textInputName).attr('class', 'form-control'));

	mainForm.append(textInput);
}

function appendRadioInput(mainForm, question) {
	var radioInputDiv = $('<div/>').attr('id', 'radio-input-container').attr('class', 'form-check');

	var radioInputQuestion = $('<p/>').attr('class', 'question').append(questions[question]);
	radioInputDiv.append(radioInputQuestion);

	for (var i = 0; i < 4; i++) {
		radioInputDiv.append($('<label/>').attr('for', radioInputName).attr('class', 'form-check-label')
								.append($('<input/>').attr('type', 'radio').attr('name', radioInputName)
							 				.attr('id', radioInputName + i.toString()).attr('class', 'form-check-input')).append(answers[question][i]));
		radioInputDiv.append($('<br/>'));

	}

	mainForm.append(radioInputDiv);
}

function appendCheckboxInput(mainForm, question) {
	var checkBoxDiv = $('<div/>').attr('id', 'checkbox-input-container').attr('class', 'form-check');

	var checkboxInputQuestion = $('<p/>').attr('class', 'question').append(questions[question]);
	checkBoxDiv.append(checkboxInputQuestion);

	for (var i = 0; i < 4; i++) {
		checkBoxDiv.append($('<label/>').attr('for', checkboxInputName).attr('class', 'form-check-label').append($('<input/>').attr('type', 'checkbox').attr('name', checkboxInputName)
										.attr('id', checkboxInputName + i.toString()).attr('class', 'form-check-input'))
					.append(answers[question][i]));
		checkBoxDiv.append($('<br/>'));
	}

	mainForm.append(checkBoxDiv);
}

function appendTextareaInput(mainForm, question) {
	var textareaInput = $('<div/>').attr('id', 'textarea-input-container').attr('class', 'form-group')
	.append($('<label/>').attr('for', textareaInputName).attr('class', 'question').append(questions[question]))
	.append($('<textarea/>').attr('rows', '5').attr('id', textareaInputName).attr('class', 'form-control'));

	mainForm.append(textareaInput);
}

function appendSelectInput(mainForm, question) {
	var selectInputDiv = $('<div/>').attr('id', 'select-input-container').attr('class', 'form-group');

	var selectQuestion = selectInputDiv.append($('<label/>').attr('for', selectInputName).attr('class', 'question').append(questions[question]));
	var selectInput = $('<select/>').attr('id', selectInputName).attr('class', 'form-control');

	for (var i = 0; i < 4; i++) {
		selectInput.append($('<option/>').attr('value', i).attr('id', selectInputName + i.toString()).append(answers[question][i]))
	}

	selectInputDiv.append(selectInput);

	mainForm.append(selectInputDiv);
}

function appendQuizTitle(mainForm) {
	var title = $('<h1/>').attr('id', 'quiz-title').append(quizTitle);

	mainForm.append(title);
}

function appendLegend() {
	var legend = $('#legend');

	var legendText = $('<p/>').append(scoreRules);

	legend.append(legendText);
}


function generateHtml(mainForm) {
	appendQuizTitle(mainForm);
	appendLegend(mainForm);

	appendTextInput(mainForm, 0);
	appendTextareaInput(mainForm, 1);
	appendCheckboxInput(mainForm, 2);
	appendRadioInput(mainForm, 3);
	appendSelectInput(mainForm, 4);
}

function calcScore() {
	var textAnswer, textareaAnswer;
	var checkboxAnswers = [];
	var radioAnswers = [];
	var selectAnswer;

	var totalScore = 0; // Max of 16 points
	var maxScore = 16;

	textAnswer = document.getElementById(textInputName);
	textareaAnswer = document.getElementById(textareaInputName);
	selectAnswer = document.getElementById(selectInputName);

	for (var i = 0; i < 4; i++) {
		checkboxAnswers.push(document.getElementById(checkboxInputName + i.toString()));
		//console.log(checkboxAnswers[i].checked);
	}

	for (var i = 0; i < 4; i++) {
		radioAnswers.push(document.getElementById(radioInputName + i.toString()));
		//console.log(radioAnswers[i].checked);
	}

	/*console.log(textAnswer.value);
	console.log(textareaAnswer.value);
	console.log(selectAnswer.selectedIndex);*/


	if (textAnswer.value.length > 10) {
		totalScore += 2;
	} else { // I know its not needed but it is for the future modularity
		totalScore += 0;
	}

	if (textareaAnswer.value.length > 25) {
		totalScore += 2;
	} else {
		totalScore += 0;
	}

	totalScore += selectAnswer.selectedIndex; // 0-3


	for (var i = 0; i < 4; i++) { // (0-3)(0-3)(0-3)
		if (checkboxAnswers[i].checked) {
			totalScore += i;
		}
	}

	for (var i = 0; i < 4; i++) { // 0-3
		if (radioAnswers[i].checked) {
			totalScore += i;
		}
	}

	var scoreText = $('<h2/>').attr('id', 'score-text').append('Your score is : ' + totalScore.toString() + ' / ' + maxScore);
	$('#score').html(scoreText);

}

$(function() {
	var mainForm = $('#main-form');

	generateHtml(mainForm);

	$("#submit").click(function() {
		calcScore()
	});
})