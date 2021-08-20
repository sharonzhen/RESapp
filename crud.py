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

def get_user_by_id(user_id):
    """ return user instance by id """
    return User.query.filter_by(id=user_id).first()

def get_contact(user):
    """ @param: user instance 
        return: Contact associated with user """
    return user.contact

def get_stable_items(user):
    """ @param: user instance
        return: list of Stitems associated w/ user """
    return user.stitems

def get_stitem_by_id(id):
    pass

def get_dynamic_items(user):
    """ @param: user instance
        return: list of Dytems associated w/ user """
    return user.dytems

def get_dytem_by_id(id):
    pass

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

def del_details(obj_list):
    """  """
    parent = get_parent(obj)
    try:
        db.session.delete(obj)
        db.session.commit()
    except:
        print("error in del_detail")
        db.session.rollback()
        return None
    else:
        return parent.details

def del_stitems(obj):
    """ """
    parent = get_parent(obj)
    try:
        db.session.delete(obj)
        db.session.commit()
    except:
        print("error in del_stitem")
        db.session.rollback()
        return None
    else:
        return parent.stitems

def del_contacts(obj):
    """ deletes stable item
        @param obj:     instance to delete
        return:         parent"""
    parent = obj.user
    try:
        db.session.delete(obj)
        db.session.commit()
    except:
        print("error in del_contact")
        db.session.rollback()
        return None
    return parent.contact # should be none if delete was successful

def del_dytems(obj):
    """ """
    parent = get_parent(obj)
    children = obj.details
    while (children != []):
        children = del_detail(children[0])
    try:
        db.session.delete(obj)
        db.session.commit()
    except:
        print("error in del_dytem")
        db.session.rollback()
        return None
    else:
        return parent

def delete_user(obj):
    """ """
    if obj.contact:
        del_contact(obj.contact)
    s_list = obj.stitems
    while(s_list!=[]):
        s_list = del_stitem(s_list[0])
    d_list = obj.dytems
    while(d_list!=[]):
        d_list = del_dytem(d_list[0])
    try:
        db.session.delete(obj)
        db.session.commit()
    except: 
        print("error in delete_user")
        db.session.rollback()
        return None
    else:
        get_users()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

