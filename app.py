from flask import request,Flask,render_template, url_for,redirect,request
from flask import session
from functools import wraps
import urllib2,json
import db

app = Flask(__name__)
app.secret_key="blah"

def requireauth(page):
    def decorator(f):
        @wraps(f)
        def wrapper(*args,**kwargs):
            if 'username' not in session:
                session['redirectpage']=page
                return redirect("/login")
            else:
                return f(*args,**kwargs)
        return wrapper
    return decorator


@app.route("/login",methods=['GET','POST'])
def login():
    if request.method=='GET':
        return render_template('login.html')
    else:
        session['username']=request.form['username']
        return redirect(session['redirectpage'])

@app.route("/logout")
def logout():
    session.pop('username',None)
    return redirect("/login")

@app.route("/FloorMaps")
@requireauth("/FloorMaps")
def index():
    
    return render_template("FloorMaps.html",name=session['username'])


@app.route("/newProfile")
@requireauth("/newProfile")
def two():
    
    return render_template("newProfile.html",name=session['username'])

#perhaps not necessary
@app.route("/<page>")
def page(page="index"):
    page="%s.html"%(page)
    return render_template(page)


@app.route("/getPeople")
def getPeople():
    #transfer to db.py
    result = []
    database = []
    
    for i in range(0, 10):
        result.append([])
        for j in range(0, 10):
            result[i].append({})
            
    for person in database:
        for k in range(0, 10):
            room = database[person][k]
            floor = db.floor(room)
            result[floor][k][person] = room
    #end transfer to db.py

    result = db.getPeople()
    return json.dumps(result)

@app.route("/getProfile")
def getProfile():
    id = request.args.get('id', '')
    result = db.getProfile(id)
    return json.dumps(result)

@app.route("/saveData")
def saveData():
    person = request.args.get('person', '')
    boolean = db.saveData(person)
    return json.dumps(boolean)

@app.route("/getLocsByGrade")
def getLocsByGrade():
    #grade = request.args.get('grade', '')
    #result = db.getLocsByGrade(grade)
    result = 'getLocsByGrade result'
    return json.dumps(result)

if __name__ == "__main__":
    app.debug=True
    #app.run()
    print getAllLocs()
    print
    print getLocsByGrade()
    print
    print getLocsByID()
