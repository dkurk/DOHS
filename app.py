from flask import request,Flask,render_template, url_for,redirect,request
from flask import session
from functools import wraps
import urllib2,json
import db

app = Flask(__name__)
app.secret_key="blah"


"""
Function: requireauth(page)
Purpose: when wrapped around a page, requires that the user is logged in before viewing the page. Also redirects the user back to the page upon logging in.
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

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


"""
Function: login()
Purpose: page for login
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

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
            if 'redirectpage' in session:
                return redirect(session['redirectpage'])
            else:
                return redirect(url_for('maps'))
        elif button == 'Register':
            return redirect(url_for('account'))



"""
Function: account()
Purpose: page for creating a new account
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

@app.route("/account",methods=['GET','POST'])
def account():
    if request.method=='GET':
        return render_template("account.html")



"""
Function: maps()
Purpose: page for seeing where people are on a map made up of 10 floors
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

@app.route("/maps",methods=['GET','POST'])
@requireauth("maps")
def maps():
    if request.method=='GET':
        return render_template("maps.html")
    else:
        button = request.form['button']
        if button == "Logout":
            return redirect(url_for('logout'))


"""
Function: logout()
Purpose: logs the user out and redirects to login()
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

@app.route("/logout")
@requireauth("/maps")
def logout():
    session.pop('ID',None)
    return redirect("/")


"""
Function: getPeople()
Purpose: grabs a list of all the people, as well as their basic info and location, from the database to pass to frontend as JSON object
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

@app.route("/getPeople")
def getPeople():
    result = db.getPeople()
    return json.dumps(result)


"""
Function: getPeopleByGrade()
Purpose: Gets a grade number from frontend. Passes grade number to database. Datbase returns users in that grade. Passes list to frontend as JSON object.
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

@app.route("/getPeopleByGrade")
def getPeopleByGrade():
    grade = request.args.get('grade', '')
    result = db.get_students_by_grade(grade)
    return json.dumps(result)


"""
Function: getProfile()
Purpose: Gets an ID number from frontend. Passes the ID number to database. Gets the profile associated with the ID number from database. Passes the profile to frontend as a JSON object.
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

@app.route("/getProfile")
def getProfile():
    idnum = request.args.get('id', '')
    result = db.getProfile(idnum)
    return json.dumps(result)


"""
Function: saveData()
Purpose: Gets the info of a new user from frontend. Passes the info to database. If user already exists in database, passes False to frontend. If user does not exist, user is added to database, and True is passed to frontend.
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

@app.route("/saveData")
def saveData():
    myID = request.args.get('id', '')
    myFirst = request.args.get('first', '')
    myLast = request.args.get('last', '')
    myGrade = request.args.get('grade', '')
    myRooms = []
    for i in range(1,11):
        myRooms.append(request.args.get('room' + str(i), ''))
    
    boolean = db.create_user(myID, myFirst, myLast, myGrade, myRooms)
    if boolean == 1:
        return json.dumps(True)
    else:
        return json.dumps(False)



"""
Function: main
Purpose: runs the app
Return: N/A
Last edited: 1/21/13 at 12:24 by Helen Nie
"""

if __name__ == "__main__":
    app.debug=True
    app.run()
    
    #print saveData()
    #print
    #print getPeople()
    #print
    #print getProfile()
