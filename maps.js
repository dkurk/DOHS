var loadMaps = function() {

    $.getJSON("/getPeople", function(people) {
	$(".person").remove();
	var svgns = "http://www.w3.org/2000/svg";
	for (var i in people) {
	    var newCircle = document.createElementNS(svgns, "circle");
	    newCircle.setAttributeNS(null, 'class', 'person');
	    newCircle.setAttributeNS(null, 'cx', Math.floor(Math.random()*500));
	    newCircle.setAttributeNS(null, 'cy', Math.floor(Math.random()*250));
	    newCircle.setAttributeNS(null, 'r', 10);
	    newCircle.setAttributeNS(null, 'stroke', 'black');
	    newCircle.setAttributeNS(null, 'fill', 'green');
	    switch (people['rooms'][0] % 100) {
	    case 1:
		$("#svg-one").append(newCircle);
		break;
	    case 2:
		$("#svg-two").append(newCircle);
		break;
	    case 3:
		$("#svg-three").append(newCircle);
		break;
	    case 4:
		$("#svg-four").append(newCircle);
		break;
	    case 5:
		$("#svg-five").append(newCircle);
		break;
	    case 6:
		$("#svg-six").append(newCircle);
		break;
	    case 7:
		$("#svg-seven").append(newCircle);
		break;
	    case 8:
		$("#svg-eight").append(newCircle);
		break;
	    case 9:
		$("#svg-nine").append(newCircle);
		break;
	    case 10:
		$("#svg-ten").append(newCircle);
		break;
	    }
	}
    });
}

$(document).ready(function() {
    loadMaps();
}