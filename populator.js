function loadPeople() {
    $.getJSON('/loadPeople', function (people) {
	$(".person").remove();
	var svgns="http://www.w3.org/2000/svg";
	for (var i in people) {
	    if (balls[i][0]==name) continue;
	    var b = document.createElementNS(svgns, "circle");
	    b.setAttributeNS(null, 'class', 'person');
	    b.setAttributeNS(null, 'cx', balls[i][1]);
	    b.setAttributeNS(null, 'cy', balls[i][2]);
	    b.setAttributeNS(null, 'r', 20);
	    b.setAttributeNS(null, 'stroke', 'black');
	    b.setAttributeNS(null, 'fill', 'green');
	}
    });
}

function makePerson() {
    me = #('<