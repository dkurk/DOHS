var makeMap = function() {
    
    //gets the svg document
    map = $("#map");
    
    //gets the floor number
    floor = parseFloat($("#floor").attr("value"));
    console.log(floor);

    //gets svg document info
    var width = $("#map").attr("width");
    var height = $("#map").attr("height");
    
    //sets rows and columns
    var cols = 20;
    var rows = 3;

    //sets w h for each room
    var w = width / cols;
    var h = height / rows;
    
    //builds floor
    switch (floor) {
    case 0:
	$("#message").append('<p>No floor to display</p>');
	break;
    case 1:
	makeDefault(map, w, h);
	break;
    case 2:
	makeDefault(map, w, h);
	break;
    case 3:
	makeDefault(map, w, h);
	break;
    case 4:
	makeDefault(map, w, h);
	break;
    case 5:
	makeDefault(map, w, h);
	break;
    case 6:
	makeDefault(map, w, h);
	break;
    case 7:
	makeDefault(map, w, h);
	break;
    case 8:
	makeDefault(map, w, h);
	break;
    case 9:
	makeDefault(map, w, h);
	break;
    case 10:
	makeDefault(map, w, h);
	break;
    }
}

var makeDefault = function(map, w, h){
    var x = 0;
    var y = 0;

    for (var i = 0; i < 41; i = i + 2) {
        var newRoom = document.createElementNS(svgns, "rect");
        newCircle.setAttributeNS(null, 'class', 'room');
        newCircle.setAttributeNS(null, 'id', 300 + i);
        newCircle.setAttributeNS(null, 'rx', x);
        newCircle.setAttributeNS(null, 'ry', y);
        newCircle.setAttributeNS(null, 'r', 10);
        newCircle.setAttributeNS(null, 'stroke', 'black');
    }
}
    
$(document).ready(function() {
    makeMap();
});

