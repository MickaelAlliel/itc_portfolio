function checkPenTool() {
	var pens = $('[name="pens"]'); // 0 = round pen, 1 = square pen, 2 = eraser

	if (pens[0].checked) {
		$(document.body).css('cursor', 'initial'); // TODO: Change to a round pointer
		return 'roundPen';
	} else if (pens[1].checked) {
		$(document.body).css('cursor', 'initial'); // TODO: Change to a square pointer
		return 'squarePen';
	} else if (pens[2].checked) {
		$(document.body).css('cursor', 'cell'); 
		return 'eraser';
	} else {
		return 'roundPen';
	}
}

function getColor() {
	return $('#penColor').val();
}

function draw(canvas, penTool, size, locX, locY) {
	var drawedDiv = $('<div/>').attr('class', 'drawedDiv');

	drawedDiv.css('top', locY - (size / 2))
			.css('left', locX - (size / 2))
			.css('width', size)
			.css('height', size);

	if (penTool == 'roundPen') {
		drawedDiv.css('background-color', getColor());
		drawedDiv.addClass('round');
	}
	else if (penTool == 'squarePen') {
		drawedDiv.css('background-color', getColor());
	} else if (penTool == 'eraser') {
		drawedDiv.css('background-color', 'white');
	}

	canvas.append(drawedDiv);
}

function getCanvasWidth() {
	return parseInt($('#canvasWidth').val());
}

function getCanvasHeight() {
	return parseInt($('#canvasHeight').val());
}

function updateCanvasSize(canvas) {
	canvas.css('width', getCanvasWidth());
	canvas.css('height', getCanvasHeight());
}

function resetCanvas(canvas) {
	canvas.html('');
}


function generateHtmlStructure() {
	var body = $(document.body);
	var globalContainer = $('<div/>').attr('class', 'global-container');

	// Toolbar
	var toolbarContainer = $('<div/>').attr('class', 'container');
	var toolbar = $('<div/>').attr('id', 'toolbar');


	// Toolbar Size
	var toolbarSize = $('<div/>').attr('id', 'toolbarSize').attr('class', 'toolbar-section');

	var labelWidth = $('<label/>').append('Width');
	var labelHeight = $('<label/>').append('Height');
	var widthInput = $('<input/>').attr('type', 'text').attr('id', 'canvasWidth').attr('value', '500');
	var heightInput = $('<input/>').attr('type', 'text').attr('id', 'canvasHeight').attr('value', '500');

	var updateBtn = $('<button/>').attr('id', 'updateCanvasSize').append('Update');
	var resetBtn = $('<button/>').attr('id', 'resetCanvas').append('Clear Canvas');

	var toolbarBtns = $('<div/>').attr('id', 'toolbarBtns');
	

	toolbarSize.append(labelWidth)
				.append(widthInput)
				.append('<br/>')
				.append(labelHeight)
				.append(heightInput);

	toolbarBtns.append(updateBtn)
				.append('<br/>')
				.append(resetBtn);
				

	// Toolbar Colors
	var toolbarColors = $('<div/>').attr('id', 'toolbarColors').attr('class', 'toolbar-section');

	var colorInput = $('<input/>').attr('type', 'color').attr('id', 'penColor').css('width', '100px').css('height', '40px');

	toolbarColors.append(colorInput);

	// Toolbar Pens
	var toolbarPens = $('<div/>').attr('id', 'toolbarPens').attr('class', 'toolbar-section');

	var roundPenIcon = $('<img/>').attr('src', 'round-pen.png').attr('class', 'toolIcon');
	var squarePenIcon = $('<img/>').attr('src', 'square-pen.png').attr('class', 'toolIcon');
	var eraserIcon = $('<img/>').attr('src', 'eraser.png').attr('class', 'toolIcon');

	var roundPenTool = $('<input/>').attr('type', 'radio').attr('name', 'pens').attr('id', 'roundPen').attr('checked', true);
	var roundPenLabel = $('<label/>').append(roundPenIcon).append(roundPenTool);
	var squarePenTool = $('<input/>').attr('type', 'radio').attr('name', 'pens').attr('id', 'squarePen');
	var squarePenLabel = $('<label/>').append(squarePenIcon).append(squarePenTool);
	var eraserTool = $('<input/>').attr('type', 'radio').attr('name', 'pens').attr('id', 'eraser');
	var eraserLabel = $('<label/>').append(eraserIcon).append(eraserTool);

	var toolSizeLabel = $('<label/>').append('Tool Size');
	var toolSizeInput = $('<input/>').attr('type', 'range').attr('min', '2').attr('max', '50')
									.attr('step', '1').attr('id', 'toolSize').attr('value', '5');
	var toolSizeValueLabel = $('<label/>').attr('id', 'toolSizeValue').append(' 5');

	toolbarPens.append(roundPenLabel)
				.append('<br/>')
				.append(squarePenLabel)
				.append('<br/>')
				.append(eraserLabel)
				.append('<br/>')
				.append('<br/>')
				.append('<br/>')
				.append(toolSizeLabel)
				.append('<br/>')
				.append(toolSizeInput)
				.append(toolSizeValueLabel);

	// Toolbar SaveLoad
	var toolbarSaveLoad = $('<div/>').attr('id', 'toolbarSaveLoad');
	var saveBtn = $('<button/>').attr('id', 'saveBtn').append('Save');
	var loadBtn = $('<button/>').attr('id', 'loadBtn').append('Load');

	toolbarSaveLoad.append(saveBtn)
						.append('<br/>')
						.append(loadBtn);

	// ----------- TOOLBAR
	toolbar.append(toolbarSize)
			.append(toolbarBtns)
			.append(toolbarColors)
			.append(toolbarPens)
			.append(toolbarSaveLoad);


	// Canvas
	var canvasContainer = $('<div/>').attr('class', 'container canvas-container');
	var canvas = $('<div/>').attr('id', 'canvas');


	// -----------------------
	toolbarContainer.append(toolbar);
	canvasContainer.append(canvas);

	globalContainer.append(toolbarContainer);
	globalContainer.append(canvasContainer);

	body.append(globalContainer);
}

function save(canvas) {
	if (typeof(Storage) !== "undefined") {
		var saveObj = canvas.html();

    	localStorage.setItem('lastCanvas', saveObj);
	} else {
		alert('Sorry! No Web Storage support..');
	}
}

function load(canvas) {
	if (typeof(Storage) !== "undefined") {
    	var loadObj = localStorage.getItem('lastCanvas');

    	canvas.html(loadObj);
	} else {
		alert('Sorry! No Web Storage support..');
	}
}

$(function() {
	// Initialize Html
	generateHtmlStructure();

	// Set global variables
	var canvas = $('#canvas');
	var toolSize = 5;
	var penTool = checkPenTool(); // Defaults as pen tool

	var canDraw = false;

	// Set Event Listeners
	$('#updateCanvasSize').click(function() { updateCanvasSize(canvas) });
	$('#resetCanvas').click(function() { resetCanvas(canvas) });
	$('[name="pens"]').change(function() { penTool = checkPenTool() });
	$('#toolSize').change(function() {
 		toolSize = $('#toolSize').val();
		$('#toolSizeValue').html(' ' + toolSize); 
	});

	$('#saveBtn').click(function() { save(canvas) });
	$('#loadBtn').click(function() { load(canvas) });

	$(document).mousemove(function(e) {
		if ((e.pageX >= canvas[0].offsetLeft && e.pageX <= canvas[0].offsetLeft + canvas[0].offsetWidth - toolSize / 2)
			 && (e.pageY >= canvas[0].offsetTop && e.pageY <= canvas[0].offsetTop + canvas[0].offsetHeight - toolSize / 2)) {
				if (canDraw) {
					draw(canvas, penTool, toolSize, e.pageX, e.pageY);
				}
			}
	});

	$(document).mousedown(function(e) {
		canDraw = true;
		if ((e.pageX >= canvas[0].offsetLeft && e.pageX <= canvas[0].offsetLeft + canvas[0].offsetWidth - toolSize / 2)
			 && (e.pageY >= canvas[0].offsetTop && e.pageY <= canvas[0].offsetTop + canvas[0].offsetHeight - toolSize / 2)) {
			if (canDraw) {
				draw(canvas, penTool, toolSize, e.pageX, e.pageY);
			}
		}
	});

	$(document).mouseup(function(e) {
		canDraw = false;
	});

	// Initialize Canvas
	updateCanvasSize(canvas);
});