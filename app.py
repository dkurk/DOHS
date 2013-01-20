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
                return redirect("/login")
            else:
                return f(*args,**kwargs)
        return wrapper
    return decorator


@app.route("/login",methods=['GET','POST'])
@requireauth("/maps")
def login():
    if request.method=='GET':
        return render_template('login.html')
    else:
        ID = request.form['ID']
        button = request.form['button']
        if button == 'Login':
            #need ifUserExists(ID) method from db.py
            if db.ifUserExists(ID):
                session['ID'] = ID
                return redirect(session['redirectpage'])
            else:
                return redirect(url_for('account'))
        elif button == 'Register':
            return redirect(url_for('account'))

@app.route("/account")
def account():
    return render_template("account.html",ID=session['id'])

@requireauth("/maps")
@app.route("/logout")
def logout():
    session.pop('ID',None)
    return redirect("/login")

@app.route("/maps")
@requireauth("maps")
def maps():
    return render_template("maps.html",ID=session['id'])

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
    #idnum = request.args.get('id', '')
    idnum = 8751
    result = db.getProfile(idnum)
    return json.dumps(result)

@app.route("/saveData")
def saveData():
    #person = request.args.get('person', '')
    person = {'id':8751 , 'first':"Helen", 'last':"Nie", 'grade':12, 'rooms':[000,111,222,333,444,555,666,777,888,999]}
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
    print saveData()
    print
    print getPeople()
    print
    print getProfile()
