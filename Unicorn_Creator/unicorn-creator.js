function UnicornCreator(name, hornColor) {
	this.name = name;
	this.hornColor = hornColor;
	this.weight = null;
	this.sound = null;
	this.alive = true;
}

UnicornCreator.prototype.setName = function(newName) {
	if (this.alive)
		this.name = newName;
	else
		console.log(this.name + ' is dead. How can you change its name?');
}

UnicornCreator.prototype.setWeight = function(newWeight){
	if (this.alive)
		this.weight = newWeight;
	else
		console.log(this.name + ' is dead. I guess it will only weigh less from now on...');
}

UnicornCreator.prototype.setSound = function(newSound) {
	if (this.alive)
		this.sound = newSound;
	else
		console.log(this.name + ' is dead. How can you change its sound?');
}

UnicornCreator.prototype.makeSound = function() {
	if (this.alive)
		this.name = newName;
	else
		console.log('... *crows*');
}

UnicornCreator.prototype.kill = function() {
	this.alive = false;
	console.log(this.name + ' has been killed in a heroic attempt to save its child.');
}

