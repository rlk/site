window.onkeydown = function(event) {
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");

	console.log(event);

	switch (event.keyCode) {
		case 37:
			if (prev) {
				window.location.href = prev.href;
			}
			break;
		case 39:
			if (next) {
				window.location.href = next.href;
			}
			break;
	}
}
