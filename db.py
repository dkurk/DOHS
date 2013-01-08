import shelve

"""
Function:  add_teacher(string teacher) 
Purpose: Add a slot in the database for a teacher. Works reg
Return: 1 if the teacher was added, 0 if the teacher was already in the db.

Last edited: 1/8/12 at 12:24 by Oliver Ball
"""

def add_teacher(teacher):
    db = shelve.open('teachers.db')
    if not(teacher in db):
        db[teacher] = []
        for i in range(10):
            db[teacher].append(-1) 
        db.close();
        return 1;
    else:
        db.close();
        return 0;

def add_room(teacher, room, period):
    db = shelve.open('teachers.db')
    db[teacher][period] = room
    db.close()
    return 1

if __name__ == "__main__":
    x = add_teacher('Oliver')
    
    print x
    
