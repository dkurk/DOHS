var makeMap = function() {
    
    //gets the svg document
    var oddMap = $("#zoom-map-odd");
    var evenMap = $("#zoom-map-even");
    
    //gets the floor number
    var floor = parseFloat($("#floor").attr("value"));
    console.log(floor);

    //gets svg document info
    var width = parseFloat(oddMap.attr("width"));
    var height = parseFloat(oddMap.attr("height"));
    
    //sets rows and columns
    var cols = 20;

    //sets w h for each room
    var w = width / cols;
    var h = height;
    
    //builds floor
    switch (floor) {
    case 0:
	$("#message").append('<p>No floor to display</p>');
	break;
    case 1:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 2:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 3:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 4:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 5:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 6:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 7:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 8:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 9:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    case 10:
	makeDefault(oddMap, evenMap, floor, w, h);
	break;
    }
}

var makeDefault = function(oddMap, evenMap, floor, w, h){
    var x = 0;
    var y = 0;
    
    var svgns = "http://www.w3.org/2000/svg";

    oddMap.empty();
    evenMap.empty();

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
	
	oddMap.append(newRoom);
	
	x = x + w;
    }

    x = 0;

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

	evenMap.append(newRoom);
	x = x + w;
    }
}
    

var addPeople = function(){
    
    //gets the svg document
    var oddMap = $("#zoom-map-odd");
    var evenMap = $("#zoom-map-even");
    
    //gets the floor number
    var floor = parseFloat($("#floor").attr("value"));

    //gets svg document info
    var width = parseFloat(oddMap.attr("width"));
    var height = parseFloat(oddMap.attr("height"));
    
    //sets rows and columns
    var cols = 20;
    var rows = 3;

    //sets w h for each room
    var w = width / cols;
    var h = height;

    var room;
    var period = $("#period").attr('value');
    var ids = [];
    for (var i = 0; i < $(".ID").length; i++){
	ids.push($(".ID")[i].value);
    }
    
    console.log(ids);
    console.log(period);

    var svgns = "http://www.w3.org/2000/svg";

    for (var i in ids){
	$.getJSON("/getProfileItems", {id:ids[i]}, function(profile){
	    var room = profile[4][period - 1];
	    var roomId = '#' + room;
	    var myX = (parseFloat($(roomId).attr('x')) + 5) + (Math.floor(Math.random() * (w - 10)));
	    var myY = (parseFloat($(roomId).attr('y')) + 5) + (Math.floor(Math.random() * (h - 10)));
	    
	    var newCircle = document.createElementNS(svgns, "circle");
	    newCircle.setAttributeNS(null, 'class', 'person');
	    newCircle.setAttributeNS(null, 'id', ids[i]);
	    newCircle.setAttributeNS(null, 'cx', myX); 
	    newCircle.setAttributeNS(null, 'cy', myY);
	    newCircle.setAttributeNS(null, 'r', 10);
	    newCircle.setAttributeNS(null, 'stroke', 'black');
	    var color;
	    switch (profile[3]) {
	    case 0:
                color = "red";
                break;
	    case "9":
		color = "green";
                break;
	    case "10":
                color = "brown";
                break;
	    case "11":
                color = "magenta";
                break;
	    case "12":
                color = "yellow";
                break;
	    }
	    newCircle.setAttributeNS(null, 'fill', color);
	    newCircle.setAttributeNS(null, 'onclick', 'getProfile(evt)');

	    switch (room % 2) {
	    case 1:
		oddMap.append(newCircle);
		break;
	    case 0:
		evenMap.append(newCircle);
		break;
	    }
	});	
    }
}

/*func getProfile()
**@params: none  
**This function, assigned on click to each bubble representing a student or teacher on the 10 svg maps takes the ID number/keyword of the clicked user and calls the "getProfile" server-side method to return
the object the bubble represents. The profile information of this user/teacher will then be printed on a div at the bottom of the page. */

var getProfile = function(evt) {
    var circle = evt.target;
    var myID = circle.getAttribute("id");
    $.getJSON("/getProfile", {id:myID}, function(person) {
        $("#profile").empty();
        $("#profile").append(person);
    });
}

$(document).ready(function() {
    makeMap();
    addPeople();
});

