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

def add_room(teacher, period, room):
    db = shelve.open('teachers.db')
    db[teacher][period] = room
    db.close()
    return 1


"""
Function:  get_teacher_schedule(string teacher)
Purpose: Return the schedule array for the given teacher.
Return: Returns the schedule array if the teacher is in the db, otherwise returns 0.   

Last edited: 1/8/12 at 12:24 by Oliver Ball
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
Purpose: Return the floor that a room is located on. Basically just a shortcut so you don't have to do the conversion later. Kind of pointless but hey
Return: An int of which floor the room is on.

Last edited: 1/8/12 at 12:24 by Oliver Ball
"""
def floor(room):
    return room/100



if __name__ == "__main__":
    x = add_teacher('Oliver')
    print x

    x = get_floor(403)
    print x


#to do:
#return dictionary which is a copy of db
