""" CRUDs of model.py """

from datetime import date
from model import db, User, Contact, Stitem, Dytem, Detail, connect_to_db


################ CREATE ###################
def create_user(login, password):
    """ create and return user """
    user = User(login=login, pwd=password)
    db.session.add(user)
    db.session.commit()
    return user

def create_contact(user_instance, first, last, loc, email, 
                    phone=None, github=None, linkedin=None):
    """ create and return new contact info """

    contact = Contact(id=user_instance.id, 
                        first=first, last=last, loc=loc,
                        email=email, phone=phone, 
                        github=github, linkedin=linkedin, 
                        user=user_instance)
    db.session.add(contact)
    db.session.commit()
    return contact

def create_stitem(user_instance, stable_type, name=None, date=None,
                    location=None, description=None):
    """ create and return new stable item """
    stitem = Stitem(user_id=user_instance.id, 
                    s_type=stable_type, name=name, 
                    date=date, loc=location, 
                    des=description)
    user_instance.stitems.append(stitem)
    db.session.commit()
    return stitem

def create_dytem(user_instance, dynamic_type, name, role=None, location=None,
                    date_from=None, date_to=None, tags=None):
    """ create and return new dynamic item """
    dytem = Dytem(user_id=user_instance.id, 
                    d_type=dynamic_type, name=name, 
                    role=role, loc=location, 
                    d_from=date_from, d_to=date_to, 
                    tags=tags)
    user_instance.dytems.append(dytem)
    db.session.commit()
    return dytem
    
def create_detail(dytem, description):
    """ create and return detail for dynamic item """
    detail = Detail(dytem_id=dytem.id,
                    des=description)
    dytem.details.append(detail)
    db.session.commit()
    return detail

################ GET ###################
def get_users():
    """ return: list of Users """
    return User.query.all()

def username_exists(username):
    """ return whether username exists or not """
    return User.query.filter_by(login=username).count()

def password_correct(username, password):
    """ returns true if pair exists in database """
    user = User.query.filter_by(login=username).first()
    if user != None:
        return user.pwd == password
    return False

# get by username since username is what's stored in session
def get_user(username):
    """ return user instance by username """
    return User.query.filter_by(login=username).first()

def get_contact(username):
    """ @param: username 
        return: Contact associated with username """
    user = get_user(username)
    return user.contact

def get_stable_items(username):
    """ @param: username 
        return: list of Stitems associated w/ user """
    user = get_user(username)
    return user.stitems

def get_dynamic_items(username):
    """ @param: username
        return: list of Dytems associated w/ user """
    user = get_user(username)
    return user.dytems

def get_details(dytem):
    """ @param: dynamic item instance 
        return: list of details associated /w dytem """
    return dytem.details

def get_detail_by_id(id):
    pass

################ UPDATE ###################

def update_table(obj, field, value):
    """ update an object instance 
        @param obj:     isntance/row to update
        @param field:   field/column to update 
        @param value:   value to update to 
        return:         updated object """
    t = type(obj)
    db.session.query(t).filter(t.id==obj.id).update({field:value}, synchronize_session=False)
    db.session.commit()
    return obj

################ DELETE ###################


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

