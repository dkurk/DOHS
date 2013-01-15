from flask import request,Flask,render_template, url_for,redirect,request
import urllib2,json
#import db

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("home.html")
    else:
        return

@app.route("/getTeacherLocByName")
def getAllNames():
    #result = db.getAllNames() or something like that
    
    #fake result for testing
    result = {'Zamansky': [000, 111, 222, 333, 444, 555, 666, 777, 888, 999]}

    return json.dumps(result)

@app.route("/getTeacherLovByFloor")
def getAllFloors():
    #result = db.getAllFloors() or something like that
    
    #fake result for testing
    allScheds = {'Zamansky': [000, 111, 222, 333, 444, 555, 666, 777, 888, 999]}

    result = []
    
    for i in range(0, 10):
        result.append([])
        for j in range(0, 10):
            result[i].append({})
            
    for teacher in allScheds:
        for k in range(0, 10):
            room = allScheds[teacher][k]
            #floor = db.floor(room)
            floor = room / 100 
            result[floor][k][teacher] = room

    return json.dumps(result)

if __name__ == "__main__":
    #app.run(debug=True, port=5000)
    floors = getAllFloors()
    print floors
    
