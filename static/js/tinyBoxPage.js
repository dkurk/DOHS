var makeMap = function() {
    
    //gets the svg document
    map = $("#zoom-map");
    
    //gets the floor number
    floor = parseFloat($("#floor").attr("value"));
    console.log(floor);

    //gets svg document info
    var width = parseFloat(map.attr("width"));
    var height = parseFloat(map.attr("height"));
    
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
	makeDefault(map, floor, w, h);
	break;
    case 2:
	makeDefault(map, floor, w, h);
	break;
    case 3:
	makeDefault(map, floor, w, h);
	break;
    case 4:
	makeDefault(map, floor, w, h);
	break;
    case 5:
	makeDefault(map, floor, w, h);
	break;
    case 6:
	makeDefault(map, floor, w, h);
	break;
    case 7:
	makeDefault(map, floor, w, h);
	break;
    case 8:
	makeDefault(map, floor, w, h);
	break;
    case 9:
	makeDefault(map, floor, w, h);
	break;
    case 10:
	makeDefault(map, floor, w, h);
	break;
    }
}

var makeDefault = function(map, floor, w, h){
    var x = 0;
    var y = 0;
    
    var svgns = "http://www.w3.org/2000/svg";

    map.empty();

    for (var i = 1; i < 41; i = i + 2) {
	
	room = floor * 100 + i;

        var newRoom = document.createElementNS(svgns, "rect");
        newRoom.setAttributeNS(null, 'class', 'room');
        newRoom.setAttributeNS(null, 'id', room);
        newRoom.setAttributeNS(null, 'x', x);
        newRoom.setAttributeNS(null, 'y', y);
        newRoom.setAttributeNS(null, 'width', w);
	newRoom.setAttributeNS(null, 'height', h);
        newRoom.setAttributeNS(null, 'stroke', 'black');
        newRoom.setAttributeNS(null, 'fill', 'white');	
	
	map.append(newRoom);
	
	x = x + w;
    }

    x = 0;
    y = 2 * h;

    for (var i = 0; i < 41; i = i + 2) {
	room = floor * 100 + i;
	
        var newRoom = document.createElementNS(svgns, "rect");
        newRoom.setAttributeNS(null, 'class', 'room');
        newRoom.setAttributeNS(null, 'id', room);
        newRoom.setAttributeNS(null, 'x', x);
        newRoom.setAttributeNS(null, 'y', y);
        newRoom.setAttributeNS(null, 'width', w);
	newRoom.setAttributeNS(null, 'height', h);
        newRoom.setAttributeNS(null, 'stroke', 'black');
        newRoom.setAttributeNS(null, 'fill', 'white');	

	map.append(newRoom);
	x = x + w;
    }
}
    

var addPeople = function(){
    var period = $("#period").attr('value');
    var ids = [];
    for (id in $("#ID")){
	ids.push($("#ID")[id].value);
    }
    var room;
    
    console.log(ids);
    console.log(period);


    //console.log(IDs);
    
    /*
    for (var i in IDs){
	$.getJSON("/getProfileItems", {id:IDs[i]}, function(profile){
	    room = profile[4][period - 1];
	    console.log(room);
	});
    }
    */
}

    
$(document).ready(function() {
    makeMap();
    addPeople();
});

