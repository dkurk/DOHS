function loadPeople() {
    $.getJSON('/loadPeople', function (people) {
	$(".person").remove();
	var svgns="http://www.w3.org/2000/svg";
	for (var i in people) {
	    if (people[i][0]==name) continue;
	    var p = document.createElementNS(svgns, "circle");
	    p.setAttributeNS(null, 'class', 'person');
	    p.setAttributeNS(null, 'cx', people[i][1]);
	    p.setAttributeNS(null, 'cy', people[i][2]);
	    p.setAttributeNS(null, 'r', 20);
	    p.setAttributeNS(null, 'stroke', 'black');
	    p.setAttributeNS(null, 'fill', 'green');
	    switch(people[i][3]) { }
	}
    });
}

var person = function(id, first, last, pd1, pd2, pd3, pd4, pd5, pd6, pd7, pd8, pd9, pd10) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.pd1 = pd1;
    this.pd2 = pd2;
    this.pd3 = pd3;
    this.pd4 = pd4;
    this.pd5 = pd5;
    this.pd6 = pd6;
    this.pd7 = pd7;
    this.pd8 = pd8;
    this.pd9 = pd9;
    this.pd10 = pd10;
}

function login(e) {
    if (e.charCode==13) {
	id = $(this).val();
	$.getJSON('/register', {name:name}, function(d) {
	    console.log(d);
	    if (d==false) {
		break;
	    }
	    else {
		id = d[0];
	    }
	});
    }
}

function makePerson() {
    me = #();
}