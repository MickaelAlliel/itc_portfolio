function Card(position, imageSrc) {
	this.id = 'card-' + position.x + '-' + position.y;
	this.position = position;
	this.parentId = 'cell-' + position.x + '-' + position.y;
	this.matched = false;
	this.imageSrc = imageSrc;
	this.element = $('<div/>')
					.attr('id', this.parentId)
					.attr('name', this.name)
					.addClass('card')
					.append($('<img/>').attr('src', imageSrc).attr('id', 'img-' + this.id).addClass('card-back'));

	return this;
};

Card.prototype.flip = function() {
	if (this.element.children().hasClass('card-front')) {
		this.element.children().removeClass('card-front');
		this.element.children().addClass('card-back');
	} else {
		this.element.children().removeClass('card-back');
		this.element.children().addClass('card-front');
	}

	return this;
};

Card.prototype.isSideUp = function() {
	if (this.element.children().hasClass('card-front'))
		return true;
	return false;
};

Card.prototype.setMatched = function() {
	this.matched = true;

	return this;
};

Card.prototype.unsetMatched = function() {
	this.matched = false;

	return this;
};

Card.prototype.addToView = function() {
	if ($('#board').find(this.id).length == 0) {
		$('.row-' + this.position.y).append(this.element);
	}

	return this;
};