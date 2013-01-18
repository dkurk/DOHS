import shelve

"""
Function:  add_teacher(string teacher) 
Purpose: Add a slot in the database for a teacher. Works reg
Return: 1 if the teacher was added, 0 if the teacher was already in the db.

Last edited: 1/8/13 at 12:24 by Oliver Ball
"""

def add_teacher(teacher):
    db = shelve.open('teachers.db')
    value = 0
    if not(teacher in db):
        db[teacher] = []
        for i in range(10):
            db[teacher].append(-1) 
        value = 1;

    db.close();
    return value


"""
Function:  add_room(string teacher, int period, int room) 
Purpose: Add/change what room a teacher is in during a certain period.
Return: 1

Last edited: 1/9/13 at 12:02 by Oliver Ball
"""

ef add_room(teacher, period, room):
    db = shelve.open('teachers.db')
    db[teacher][period] = room
    db.close()
    return 1


"""
Function:  get_teacher_schedule(string teacher)
Purpose: Return the schedule array for the given teacher.
Return: Returns the schedule array if the teacher is in the db, otherwise returns 0.   

Last edited: 1/8/13 at 12:24 by Oliver Ball
"""

def get_teacher_schedule(teacher):
    db = shelve.open('teachers.db')
    value = 0;
    if teacher in db:
        value = db['teacher']
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
    if (not ID in db):
        db = shelve.open("students.db")
        user = []
        user.append(first)#student[0] is the first name
        user.append(last)#student[1] is the last name
        user.append(grade)#student[2] is the grade
        user.append(schedule)#student[3] is the schedule
        db[ID] = user
        value = 1;
    
    db.close()
    return value
    

"""
Function:  make_student_schedule(stuff)
Purpose: Take schedule input from newprofile.html, and turn it into something usable by create_user().
Return: TBD

Last edited: 1/14/13 at 12:26 by Oliver Ball
"""

def make_student_schedule(tmp):
    return 0



if __name__ == "__main__":
    x = add_teacher('Oliver')
    print x
    
    x = floor(403)
    print x
    x = floor(1023)
    print x


#to do:
#return dictionary which is a copy of db
