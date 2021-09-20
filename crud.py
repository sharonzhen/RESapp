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

def create_stitem(username, stable_type, name=None, date=None,
                    location=None, description=None):
    """ create and return new stable item """
    user_instance = get_user(username)
    stitem = Stitem(user_id=user_instance.id, 
                    s_type=stable_type, name=name, 
                    date=date, loc=location, 
                    des=description)
    user_instance.stitems.append(stitem)
    db.session.commit()
    return stitem

def create_dytem(username, dynamic_type, name, role=None, location=None,
                    date_from=None, date_to=None, tags=None):
    """ create and return new dynamic item """
    user_instance = get_user(username)
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

def get_details_by_id(detail_list):
    """ @param: list of detail ids
        return: list of detail items"""
    return_list = []
    for detail_id in detail_list:
        det = Detail.query.filter_by(id=detail_id).first()
        if det:
            return_list.append(det)
    return return_list


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
def delete_items(items):
    """ delete list of resume items. 
    Items in the list are the same type 
    for stable items call one delete
    for dynamic items delete dependencies first.
    
    @param items:           list of stitems or dytems or details
    return deleted_items:   list of deleted items to return 
                            from POST request in JSON, fit for 
    
    Immutable.deleteIn(keyPath: Iterable) function for Details
    Immutable.deleteAll([item.id, item.id,...]) function for Dytem/Stitems
    keyPath: [key, subkey, subsubkey, ... ]


    """
    
    deleted_items = {
        'item':[]
    }
    for item in items:
        if type(item)==Detail:
            # key: detail category
            # subkey: id to delete, subvalue: keyPath to find value of item.id
            deleted_items['detail']={item.id: [item.dytem.id, item.id]}
        else:
            # key: Dytem/Stitem category
            # value: list of item.id to delete
            deleted_items['item'].append(item.id)
        db.session.delete(item)
    db.session.commit()
    return deleted_items



if __name__ == '__main__':
    from server import app
    connect_to_db(app)

