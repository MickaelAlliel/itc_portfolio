function checkPenTool() {
	var pens = $('[name="pens"]'); // 0 = pen, 1 = eraser

	if (pens[0].checked) {
		$(document.body).css('cursor', 'initial');
		return 'pen';
	} else if (pens[1].checked) {
		$(document.body).css('cursor', 'cell');
		return 'eraser';
	} else {
		return 'pen';
	}
}

function getColor() {
	return $('#penColor').val();
}

function colorTile(tile, penTool) {
	if (tile) {
		if (penTool == 'pen') {
			tile.css('background-color', getColor());
		} else if (penTool == 'eraser') {
			tile.css('background-color', 'initial');
		}
	}
}

function getCanvasWidth() {
	return parseInt($('#canvasWidth').val());
}

function getCanvasHeight() {
	return parseInt($('#canvasHeight').val());
}

function updateCanvasSize(canvas, tileSize) {
	canvas.css('width', getCanvasWidth());
	canvas.css('height', getCanvasHeight());

	generateGrid(canvas, tileSize);
}

function generateGrid(canvas, tileSize) {
	// Resetting canvas
	canvas.html('');

	// Generating tiles
	for (var i = 0; i < getCanvasWidth(); i = i + tileSize) {
		for (var j = 0; j < getCanvasHeight(); j = j + tileSize) {
			var tileElem = $('<div/>').attr('id', 'tile-' + i + '-' + j).css('width', tileSize).css('height', tileSize).css('display', 'inline-block');
			canvas.append(tileElem);
		}
	}
}

function resetCanvas(canvas, tileSize) {
	generateGrid(canvas, tileSize);
}

function getTileFromLocation(locX, locY, tileSize) {
	for (var i = 0; i < getCanvasWidth(); i = i + tileSize) {
		for (var j = 0; j < getCanvasHeight(); j = j + tileSize) {
			var tile = $('#tile-' + i + '-' + j);
			
			var tileLoc = tile.offset();

			if ( (tileLoc.top < locY && tileLoc.top + tileSize > locY) && 
				(tileLoc.left < locX && tileLoc.left + tileSize > locX) ) {
				//console.log(tile.offset()); // Clicked tile
				return tile;
			}
		}
	}
}



function generateHtmlStructure() {
	var body = $(document.body);

	// Toolbar
	var toolbar = $('<div/>').attr('id', 'toolbar');


	// Toolbar Size
	var toolbarSize = $('<div/>').attr('id', 'toolbarSize');

	var labelWidth = $('<label/>').append('Width');
	var labelHeight = $('<label/>').append('Height');
	var widthInput = $('<input/>').attr('type', 'text').attr('id', 'canvasWidth').attr('value', '500');
	var heightInput = $('<input/>').attr('type', 'text').attr('id', 'canvasHeight').attr('value', '500');

	var updateBtn = $('<button/>').attr('id', 'updateCanvasSize').append('Update');
	var resetBtn = $('<button/>').attr('id', 'resetCanvas').append('Reset to blank');

	toolbarSize.append(labelWidth)
				.append(widthInput)
				.append(labelHeight)
				.append(heightInput)
				.append(updateBtn)
				.append(resetBtn);

	// Toolbar Colors
	var toolbarColors = $('<div/>').attr('id', 'toolbarColors');

	var labelColor = $('<label/>').append('Color');
	var colorInput = $('<input/>').attr('type', 'color').attr('id', 'penColor');

	toolbarColors.append(labelColor)
					.append(colorInput);

	// Toolbar Pens
	var toolbarPens = $('<div/>').attr('id', 'toolbarPens');

	var penTool = $('<input/>').attr('type', 'radio').attr('name', 'pens').attr('id', 'pen').attr('checked', true);
	var penLabel = $('<label/>').append('Pen').append(penTool);
	var eraserTool = $('<input/>').attr('type', 'radio').attr('name', 'pens').attr('id', 'eraser');
	var eraserLabel = $('<label/>').append('Eraser').append(eraserTool);

	toolbarPens.append(penLabel).append(eraserLabel);

	// ----------- TOOLBAR
	toolbar.append(toolbarSize)
			.append(toolbarColors)
			.append(toolbarPens);


	// Canvas
	var canvas = $('<div/>').attr('id', 'canvas');


	// -----------------------
	body.append(toolbar);
	body.append(canvas);
}

$(function() {
	// Initialize Html
	generateHtmlStructure();

	// Set global variables
	var canvas = $('#canvas');
	var tileSize = 10; // in pixels
	var penTool = checkPenTool(); // Defaults as pen tool

	// Set Event Listeners
	$('#updateCanvasSize').click(function() { updateCanvasSize(canvas, tileSize) });
	$('#resetCanvas').click(function() { resetCanvas(canvas, tileSize) });
	$('[name="pens"]').change(function() { penTool = checkPenTool() });
	
	$(document).mousedown(function(e) {
		colorTile(getTileFromLocation(e.pageX, e.pageY, tileSize), penTool);
	});

	// Initialize Canvas
	updateCanvasSize(canvas, tileSize);
});