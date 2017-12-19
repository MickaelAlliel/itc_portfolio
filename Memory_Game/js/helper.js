function parseTime(time) {
	let timeString = "";
	let minutes = 0;
	let seconds = 0;

	minutes = time / 100;
	seconds = time % 100;

	timeString = minutes.toString() + ":" + seconds.toString();

	return timeString;
}

function incrementTime(currentTime) {
	var nextTime = 0;
	var minutes = 0;
	var seconds = 0;

	minutes = currentTime / 100;
	seconds = currentTime % 100;

	if (seconds == 59) {
		minutes += 1;
		seconds = 0;
	} else {
		seconds += 1;
	}

	nextTime = minutes * 100 + seconds;

	return nextTime;
}