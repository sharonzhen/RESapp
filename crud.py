""" CRUDs of model.py """

from datetime import date
from model import db, User, Contact, Stitem, Dytem, Detail, connect_to_db

################ CREATE ###################
def create_user(login, password):
    """ create and return user """
    user = User(login=login, password=password)
    db.session.add(user)
    db.session.commit()
    return user

def create_contact(user_instance, first, last, loc, email, 
                    phone=None, github=None, linkedin=None):
    """ create and return new contact info """

    contact = Contact(user_id=user_instance.user_id, 
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
    stitem = Stitem(user_id=user_instance.user_id, 
                    s_type=stable_type, name=name, 
                    date=date, loc=location, 
                    des=description)
    user_instance.stitems.append(stitem)
    db.session.commit()
    return stitem

def create_dytem(user_instance, dynamic_type, name, role=None, location=None,
                    date_from=None, date_to=None, tags=None):
    """ create and return new dynamic item """
    dytem = Dytem(user_id=user_instance.user_id, 
                    d_type=dynamic_type, name=name, 
                    role=role, loc=location, 
                    d_from=date_from, d_to=date_to, 
                    tags=tags)
    user_instance.dytems.append(dytem)
    db.session.commit()
    return dytem
    
def create_detail(dytem_instance, description):
    """ create and return detail for dynamic item """
    detail = Detail(dytem_id=dytem_instance.item_id,
                    des=description)
    dytem_isntance.details.append(detail)
    db.session.commit()
    return detail

################ GET ###################
def get_users():
    """ return: list of Users """
    return User.query.all()

def get_contact(user):
    """ @param: user instance 
        return: Contact associated with user """
    return user.contact

def get_stable_items(user):
    """ @param: user instance
        return: list of Stitems associated w/ user """
    return user.stitems

def get_dynamic_items(user):
    """ @param: user instance
        return: list of Dytems associated w/ user """
    return user.dytems

def get_details(dytem):
    """ @param: dynamic item instance 
        return: list of details associated /w dytem """
    return dytem.details

################ UPDATE ###################
def update_contact(user):

################ DELETE ###################




if __name__ == '__main__':
    from server import app
    connect_to_db(app)

