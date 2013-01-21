/*func loadMaps()
**@params: none
**This function calls the serve method "getPeople" and pulls out a list of people dictionaries, consisting of student users and pre-added teachers from the database. For each person, it creates a new <circle> element that will be added to the svg that corresponds with the floor this user/teacher should be on during first period. A later update method will respond to changes in floor
*/

var loadMaps = function() {

    $.getJSON("/getPeople", function(people) {
	console.log(people);
	$(".person").remove();
	var svgns = "http://www.w3.org/2000/svg";
	for (var i in people) {
	    var newCircle = document.createElementNS(svgns, "circle");
	    newCircle.setAttributeNS(null, 'class', 'person');
	    newCircle.setAttributeNS(null, 'id', people[i][0]);
	    newCircle.setAttributeNS(null, 'cx', Math.floor(Math.random()*500));
	    newCircle.setAttributeNS(null, 'cy', Math.floor(Math.random()*50));
	    newCircle.setAttributeNS(null, 'r', 10);
	    newCircle.setAttributeNS(null, 'stroke', 'black');
	    newCircle.setAttributeNS(null, 'fill', 'green');
	    
	    //added temporary if statement b/c the database has empty lists for rooms --Helen
	    if (people[i][4] && people[i][4][0]){
		switch (Math.floor(people[i][4][0] / 100)) {
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
	} 
    });
}


/*func getProfile()
**@params: none
**This function, assigned on click to each bubble representing a student or teacher on the 10 svg maps takes the ID number/keyword of the clicked user and calls the "getProfile" server-side method to return the object the bubble represents. The profile information of this user/teacher will then be printed on a div at the bottom of the page. 
*/
var getProfile = function() {

    var myID = $(this).attr("id");
    $.getJSON("/getProfile", {id:myID}, function(person) {
	$("#profile").text(JSON.stringify(person));
    });

}

/*
var loadMapsByGrade() = function() {

    var grade = $(".choose-grade")[0].value;

    $.getJSON("/getPeopleByGrade", {grade:grade}, function(people) {
	$(".person").remove();
	var svgns = "http://www.w3.org/2000/svg";
	for (var i in people) {
	    var newCircle = document.createElementNS(svgns, "circle");
	    newCircle.setAttributeNS(null, 'class', 'person');
	    newCircle.setAttributeNS(null, 'id', people['id']);
	    newCircle.setAttributeNS(null, 'cx', Math.floor(Math.random()*500));
	    newCircle.setAttributeNS(null, 'cy', Math.floor(Math.random()*50));
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

*/

$(document).ready(function() {
    loadMaps();
    $(".person").click(getProfile);
    //$(".choose-grade").change(loadMapsByGrade);
});