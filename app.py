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
            if 'ID' not in session:
                session['redirectpage']=page
                return redirect("/")
            else:
                return f(*args,**kwargs)
        return wrapper
    return decorator


@app.route("/",methods=['GET','POST'])
def login():
    if request.method=='GET':
        return render_template('login.html')
    else:
        ID = request.form['ID']
        button = request.form['button']
        if button == 'Login':
            #need ifUserExists(ID) method from db.py, is doesnt exist, direct to account page
            #also check if field is not empty
            session['ID'] = ID
            if session['redirectpage']:
                return redirect(session['redirectpage'])
            else:
                return redirect(url_for('maps'))
        elif button == 'Register':
            return redirect(url_for('account'))

@app.route("/account",methods=['GET','POST'])
def account():
    if request.method=='GET':
        return render_template("account.html")


@app.route("/maps",methods=['GET','POST'])
#@requireauth("maps")
def maps():
    if request.method=='GET':
        return render_template("maps.html")
    else:
        button = request.form['button']
        if button == "Logout":
            return redirect(url_for('logout'))

@app.route("/logout")
#@requireauth("/maps")
def logout():
    session.pop('ID',None)
    return redirect("/")

#perhaps not necessary
@app.route("/<page>")
def page(page="index"):
    page="%s.html"%(page)
    return render_template(page)

@app.route("/getPeople")
def getPeople():
    result = db.getPeople()
    return json.dumps(result)

@app.route("/getProfile")
def getProfile():
    idnum = request.args.get('id', '')
    result = db.getProfile(idnum)
    return json.dumps(result)

@app.route("/saveData")
def saveData():
    person = request.args.get('person', '')
    boolean = db.create_user(person['id'], person['first'], person['last'], person['grade'], person['rooms'])
    if boolean == 1:
        return json.dumps(True)
    else:
        return json.dumps(False)

@app.route("/getLocsByGrade")
def getPeopleByGrade():
    #grade = request.args.get('grade', '')
    #result = db.getPeopleByGrade(grade)
    result = 'getPeopleByGrade result'
    return json.dumps(result)

if __name__ == "__main__":
    app.debug=True
    app.run()
    
    #print saveData()
    #print
    #print getPeople()
    #print
    #print getProfile()
