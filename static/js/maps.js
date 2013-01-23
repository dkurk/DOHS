/*func loadMaps()
**@params: none
**This function calls the serve method "getPeople" and pulls out a list of people dictionaries, consisting of student users and pre-added teachers from the database. For each person, it creates a new <circle> element that will be added to the svg that corresponds with the floor this user/teacher should be on during first period. A later update method will respond to changes in floor
*/



//sets the current period as a global variable
var currPd;


var loadMaps = function() {

    $.getJSON("/getPeople", function(people) {
	console.log(people);
	$(".person").remove();
	var svgns = "http://www.w3.org/2000/svg";
	for (var i in people) {
	    var newCircle = document.createElementNS(svgns, "circle");
	    newCircle.setAttributeNS(null, 'class', 'person');
	    newCircle.setAttributeNS(null, 'id', people[i][0]);
	    newCircle.setAttributeNS(null, 'cx', Math.floor(5 + Math.random()*490));
	    newCircle.setAttributeNS(null, 'cy', Math.floor(5 + Math.random()*40));
	    newCircle.setAttributeNS(null, 'r', 3);
	    newCircle.setAttributeNS(null, 'stroke', 'black');
	    var color;
	    switch (people[i][3]) {
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
	    
	    //checks if currently outside school hours
	    if (currPd == -1){
		break;
	    }
	    
	    try {

	    switch (Math.floor(people[i][4][currPd-1] / 100)) {
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
	    catch(err){
	    }
	}
    });
}


/*func getProfile()
**@params: none
**This function, assigned on click to each bubble representing a student or teacher on the 10 svg maps takes the ID number/keyword of the clicked user and calls the "getProfile" server-side method to return the object the bubble represents. The profile information of this user/teacher will then be printed on a div at the bottom of the page. 
*/
var getProfile = function(evt) {
    var circle = evt.target;
    var myID = circle.getAttribute("id");
    $.getJSON("/getProfile", {id:myID}, function(person) {
	$("#profile").empty();
	$("#profile").append(person);
  
	//JSON.stringify(person)	
    });

}


var loadMapsByGrade = function() {

    var grade = $(".choose-grade")[0].value;

    $.getJSON("/getPeopleByGrade", {grade:grade}, function(people) {
	console.log(people);
	
	$(".person").remove();
	var svgns = "http://www.w3.org/2000/svg";
	for (var i in people) {
	    var newCircle = document.createElementNS(svgns, "circle");
	    newCircle.setAttributeNS(null, 'class', 'person');
	    newCircle.setAttributeNS(null, 'id', people[i][0]);
	    newCircle.setAttributeNS(null, 'cx', Math.floor(5 + Math.random()*490));
	    newCircle.setAttributeNS(null, 'cy', Math.floor(5 + Math.random()*40));
	    newCircle.setAttributeNS(null, 'r', 3);
	    newCircle.setAttributeNS(null, 'stroke', 'black');
	    var color;
	    switch (people[i][3]) {
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
	    
	    //checks if currently outside school hours
	    if (currPd == -1){
		break;
	    }

	    switch (Math.floor(people[i][4][currPd-1] / 100)) {
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


var setPeriod = function() {
    //gets current time in a string
    //var currTime = "01/01/2011 ".concat(new Date().toString().split(" ")[4]);

    //uncomment the next line to test during outside school hours
    var currTime = "01/01/2011 09:09:09";

    console.log(currTime);

    //makes a list of the beginnings of pds                          
    var pds = ["01/01/2011 08:00:00", "01/01/2011 08:45:00", 
	       "01/01/2011 09:30:00", "01/01/2011 10:19:00", 
	       "01/01/2011 11:04:00", "01/01/2011 11:49:00", 
	       "01/01/2011 12:34:00", "01/01/2011 13:19:00", 
	       "01/01/2011 14:04:00", "01/01/2011 14:49:00"]
    
    //compares currTime with pds to find currPd    
    if (Date.parse(currTime) < Date.parse(pds[0]) ||
        Date.parse(currTime) > Date.parse(pds[9])){
        currPd = -1;
    }
    else{
        for (var i = 1; i < 10; i++){
	    if (Date.parse(currTime) < Date.parse(pds[i])){
                currPd = i;
		break;
	    }
	}
    }
}


//varName = "";

var zoom = function() {
    //TINY.box.show({html: "<style> #svg-zoom {border-style:solid;} </style> <svg id='svg-zoom' xmlns='http://www.w3.org/2000/svg' version='1.1' width='400' height='400'></svg>", width:450, height:450});
    var circles = $("circle", $(this));
    var ids = [];
    $(circles).each(function() {
	ids.push($(this).attr("id"));
    });
   
    //console.log(ids);

    var idString = ids.join(",");

    console.log(idString);

    /*
    for (var i=0; i<ids.length; i++) {
	var varName = "id" + i;
	window[varName] = ids[i];

    }*/
   
    var svgID = ($(this).attr("id"));
    var myFloor = svgID.substring(4);

    //console.log(myFloor);

    switch(myFloor) {
    case "ten":
	myFloor = 10;
	break;
    case "nine":
	myFloor = 9;
	break;
    case "eight":
	myFloor = 8;
	break;
    case "seven":
	myFloor = 7;
	break;
    case "six":
	myFloor = 6;
	break;
    case "five":
	myFloor = 5;
	break;
    case "four":
	myFloor = 4;
	break;
    case "three":
	myFloor = 3;
	break;
    case "two":
	myFloor = 2;
	break;
    case "one":
	myFloor = 1;
	break;
    }

    //console.log(myFloor);

    $.getJSON("/getTinyBoxData", {floor:myFloor, period:currPd, idString:idString}, function(data) {
    });

    var content = '<Iframe Id="FrameTiny" Src="' + 'tinyBoxPage' + '" Width="100%" Height="100%" Scrolling="Yes" Frameborder="Yes" Marginwidth="0" Marginheight="0"></Iframe>';
    TINY.box.show({html: content, width:1200, height:400});
}
 
$(document).ready(function() {
    setPeriod();
    var now = currPd;
    console.log(now);
    $.getJSON("/getPeriod", {period:now}, function(data) {
    });
    loadMaps();

    $(".choose-grade").change(loadMapsByGrade);
    $("#svg-ten").click(zoom);
    $("#svg-nine").click(zoom);
    $("#svg-eight").click(zoom);
    $("#svg-seven").click(zoom);
    $("#svg-six").click(zoom);
    $("#svg-five").click(zoom);
    $("#svg-four").click(zoom);
    $("#svg-three").click(zoom);
    $("#svg-two").click(zoom);
    $("#svg-one").click(zoom);

    setInterval(function() {
	var pdBefore = currPd;
	setPeriod();
	var pdAfter = currPd;
	if (pdBefore != pdAfter) {
	    $.getJSON("/getPeriod", {period:currPd}, function(data){
	    });
	    loadMaps();
	}
    }, 500);

});