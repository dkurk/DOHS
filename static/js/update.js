var loadUserInfo = function() {

    var myID = $("#idnum")[0].value;
    
    $.getJSON("/getProfileItems", {id:myID}, function(person) {
	$("#first").val(person[1]);
	$("#last").val(person[2]);
	$("#grade")[0].value = person[3];
	for (var i=0; i<10; i++) 
	    $(".rooms")[i].value = person[4][i];
    });

}

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
    updateAccount(p1);
}


var updateAccount = function(p1) {
    $.getJSON("/editData", {id:p1['id'], first:p1['first'], last:p1['last'], grade:p1['grade'], room1:p1['rooms'][0], room2:p1['rooms'][1], room3:p1['rooms'][2], room4:p1['rooms'][3], room5:p1['rooms'][4], room6:p1['rooms'][5], room7:p1['rooms'][6], room8:p1['rooms'][7], room9:p1['rooms'][8], room10:p1['rooms'][9]}, function(bool) {
	console.log(bool);
	if (!bool)
	    $("#message").text("Sorry, for some strange reason we were unable to edit your data.");
    });
}

var deleteUser = function() {
    $.getJSON("/deleteUser", {id:$("#idnum")[0].value});
}

$(document).ready(function() {
    loadUserInfo();
    $("#submit").click(createAccount);
    $("#delete").click(deleteUser);
});