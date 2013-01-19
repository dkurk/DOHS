var person = function(id, first, last, grade, rooms) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.grade = grade;
    this.rooms = rooms;
}

var makeRoomList = function() {
    var rmlist = [];
    $(".rooms").each(function() {
	rmlist.append($(this).value);
    });
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
    var p1 = new person($("#idnum").value, $("#first").value, $("#last").value, $("#grade").value, makeRooms());
    saveAccount(p1);
}

$("#submit").click(createAccount);



var saveAccount = function(p1) {
    $.getJSON("/saveData", {person:p1}, function(bool) {
	if (bool)
	    $("#message").text("Sorry, an account by that ID already exists. Please sign up another account.");
    });
}

