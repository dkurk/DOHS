import shelve

gradelist = {'Freshman' : 9,
            'Sophomore' : 10,
            'Junior' : 11,
            'Senior' : 12,

             '9' : 'Freshman',
            '10' : 'Sophomore',
            '11' : 'Junior',
            '12' : 'Senior',

             '0' : 'Teacher',
            }

"""
Function:  add_teacher(string teacher) 
Purpose: Add a slot in the database for a teacher. Works reg
Return: 1 if the teacher was added, 0 if the teacher was already in the db.

Last edited: 1/20/13 at 6:42 by Oliver Ball
Tested: Yes
"""

def add_teacher(ID, first, last, schedule ):
    db = shelve.open('people.db')
    value = 0
    ID = str(ID)

    if (not ID in db):
        teacher = []

        teacher.append(ID)#teacher[0] is the ID
        teacher.append(first)#teacher[1] is the first name
        teacher.append(last)#teacher[2] is the last name
        teacher.append(0)#teacher[3] is the 'grade'
        teacher.append(schedule)#student[4] is the schedule

        db[ID] = teacher
        value = 1;
        
        
    db.close();
    return value


"""
Function:  edit_room(string ID, int period, int room) 
Purpose: Add/change what room a teacher is in during a certain period.
Return: 1

Last edited: 1/20/13 at 6:27 by Oliver Ball
"""

def edit_room(ID, period, room):
    ID = str(ID)
    db = shelve.open('people.db')
    db[ID][4][period] = room
    db.close()
    return 1


"""
Function:  get_schedule(string ID)
Purpose: Return the schedule array for the given ID.
Return: Returns the schedule array if the person is in the db, otherwise returns 0.   

Last edited: 1/20/13 at 6:43 by Oliver Ball
"""

def get_schedule(ID):
    ID = str(ID)
    db = shelve.open('people.db')
    value = 0;
    if ID in db:
        value = db[ID][4]
    db.close()
    return value


"""
Function:  floor(int room)
Purpose: Return the floor that a room is located on. Basically just a shortcut so you don't have to do the conversion later. Kind of pointless but hey.
Return: An int of which floor the room is on.

Last edited: 1/8/13 at 12:24 by Oliver Ball
"""
def floor(room):
    return room/100


"""
Function:  create_user(string first, string last, string grade, something schedule)
Input: 
Purpose: Create an account for a user given their signup information, and then store it in the shelf.
Return: 1 if succesful 0 if unsuccesful

Last edited: 1/14/13 at 12:26 by Oliver Ball
"""
def create_user(ID, first, last, grade, schedule):
    value = 0
    db = shelve.open('people.db')
    ID = str(ID)
    if (not ID in db):
        user = []
        user.append(ID)#student[0] is the ID
        user.append(first)#student[1] is the first name
        user.append(last)#student[2] is the last name
        
        user.append(grade)#student[3] is the grade
        
        user.append(schedule)#student[4] is the schedule
        db[ID] = user
        value = 1;
    
    db.close()
    return value
    

"""
Function:  getProfile(int ID)
Input: An int ID corresponding to the person you want to get
Purpose: Get the account array of a person of id = ID
Return: The account array if the Profile exists, 0 if unsuccesful

Last edited: 1/20/13 at 6:48 by Oliver Ball
"""

def getProfile(ID):
    ID = str(ID)

    db = shelve.open('people.db')
    value = 0
    
    if ID in db:
        value = db[ID]
    
    db.close()
    return value


"""
Function:  getPeople()
Input: None
Purpose: Return a complete dictionary of all teachers and students. This relies on students and teachers not having any overlapping ID's, but that shouldn't be an issue.
Return: A dictionary with dict[ID] corresponding to each teacher and student

Last edited: 1/20/13 at 6:50 by Oliver Ball
"""

def getPeople():
    db = shelve.open('people.db')
    
    a = list(db.items())

    return dict(a)
    

"""
Function:  get_students_by_grade(grade)
Purpose: Get every student in a given grade. Right now the grade should be an int, but this can be changed to an array if needs be.
Return: An array containing every student matching the criteria.

Last edited: 1/20/13 at 6:51 by Oliver Ball
"""

def get_students_by_grade(grade):
    db = shelve.open("people.db")
    students = []
    for user in db:
        if db[user][2] == grade:
            students.append(db[user])

    return students


"""
Function:  translate_master()
Purpose: Translate the master file and insert the profiles into the db.
Return: No return value

Last edited: 1/20/13 at 6:51 by Oliver Ball
"""

def translate_master():
    file = open("master")
    line = file.readline()
    


"""
Function:  toString()
Purpose: Create an easy to read string for a given ID and its corresponding profile.
Return: A formatted string.
Tested: Yes

Last edited: 1/20/13 at 7:28 by Oliver Ball
"""

def toString(ID):
    ID = str(ID)
    profile = getProfile(ID)
    schedule = profile[4]
    
    string = ''
    string += 'ID: ' + str(profile[0]) + '\n'
    string += 'Name: ' + profile[1] +' '+ profile[2] + '\n'
    string += 'Grade: ' + gradelist[str(profile[3])] + '\n'
    string += 'Schedule: \n'

    i = 0
    for period in schedule:
        string += '\tPeriod ' +str(i)+ ': Room ' + str(period) + '\n'
        i = i+1
    
    return string


"""
Function: start_fresh()
Purpose: Creates a brand new shelf, deleting all remnants of any pre-existing one.
Return: A printable string of the db, which should be empty other than 'New ID' : 1

Last edited 1/20/13 at 8:37 by Oliver Ball
"""

def start_fresh():
    db = shelve.open('people.db')
    for entry in db:
        del db[entry]
    db['New ID'] = 1 

    return str(db)


"""
Function: dump()
Purpose: Just prints out a dump of the database. Simple stuff.
Return: No return.

Last edited 1/20/13 at 8:40 by Oliver Ball
"""

def dump():
    db = shelve.open('people.db')
    print db
    db.close()



if __name__ == "__main__":
    x = add_teacher(8454, 'Oliver', 'Ball', [101,202,303,404,505,606,707,808,909,1011])
    print x

    print '\nTesting toString:\n'
    print toString(8454) + '\n'


#to do:
#return dictionary which is a copy of db



#3. saveData(person): saves the person in parameter into database. returns true if person is saved successfully, false if person already exists in database

#translation of master file
#toString file
