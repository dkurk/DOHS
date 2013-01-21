var person = function(id, first, last, grade, rooms) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.grade = grade;
    this.rooms = rooms;
}

var makeRoomList = function() {
    var rmlist = [];
    for (var i=0; i<$(".rooms").length; i++) 
	rmlist.push($(".rooms")[i].value);
    console.log(rmlist);
    return rmlist;
    /*rmlist.append($("#rm1").val);
    rmlist.append($("#rm2").val);
    rmlist.append($("#rm3").val);
    rmlist.append($("#rm4").val);
    rmlist.append($("#rm5").val);
    rmlist.append($("#rm6").val);
    rmlist.append($("#rm7").val);
    rmlist.append($("#rm8").val);
    rmlist.append($("#rm9").val);
    rmlist.append($("#rm10").val);*/
}

var createAccount = function() {
    var p1 = new person($("#idnum")[0].value, $("#first")[0].value, $("#last")[0].value, $("#grade")[0].value, makeRoomList());
    console.log(JSON.stringify(p1));
    //var p1 = {"id":$("#idnum")[0].value, "first":$("#first")[0].value, "last": $("#last")[0].value, "grade":$("#grade")[0].value, "rooms": makeRoomList()}
    //console.log(p1)
    saveAccount(p1);
}


var saveAccount = function(p1) {
    $.getJSON("/saveData", {id:p1['id'], first:p1['first'], last:p1['last'], grade:p1['grade'], rooms:p1['rooms']}, function(bool) {
	if (bool)
	    $("#message").text("Sorry, an account by that ID already exists. Please sign up another account.");
    });
}


$(document).ready(function() {
    $("#submit").click(createAccount);
});