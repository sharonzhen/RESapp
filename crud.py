""" CRUDs of model.py """

from datetime import date
from model import (db, User, Contact, Resume, Work, Course,
                    Project, Tech, Detail, connect_to_db)



def create_user(email, password):
    """ create and return user 
        email:      string(50) unique true
        password:   string(50) """
    user = User(login=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user

def create_contact(user_instance, first, last, 
                    email=None, phone=None, 
                    github=None, linkedin=None):
    """ create and return new contact info 
        user_pk: PK, FK from users.user_pk
        first:   string(20)
        last:    string(20) """
    contact = Contact(user_pk=user_instance.user_pk, first=first, last=last, 
                        email=email, phone=phone, github=github, 
                        linkedin=linkedin)
    user_instance.contact=contact
    db.session.commit()
    return contact

def create_resume(user_instance, 
    ):
    """ create and return new resume 
        user_pk: FK from users.user_pk """
    resume = None
    # TODO
    return resume

def create_work(user_instance, company, role, location, date_from,
                    date_to=None):
    """ create and return new work (employment) instance
        user_pk:    FK from users.user_pk 
        company:    string(20)
        role:       string(50)
        location:   string(50)
        date_from:  db.DateTime """
    work = Work(user_pk=user_instance.user_pk, company=company,
                role=role, location=location, date_from=date_from,
                date_to=date_to)
    user_instance.works.append(work)
    db.seession.commit()
    return work

def create_course(user_instance, name):
    """ create and return course 
        user_pk:    FK from users.user_pk 
        name:       string(50) """
    course = Course(user_pk=user_isntance.user_pk,
                        name=name)
    user_instance.courses.append(course)
    db.session.commit()
    return course

def create_project(user_instance, name, link=None):
    """ create and return project 
        user_pk:    FK from users.user_pk
        name:       string(50) """
    project = Project(user_pk=user_instance.user_pk, 
                        name=name, link=link)
    user_instance.projects.append(project)
    db.session.commit()
    return project

def create_tech(user_instance, label, values):
    """ create and return technologies 
        user_pk:    FK from users.user_pk
        label:      string(50) i.e. 'proficient in:'
        value:      text       i.e. 'c++, python, java' """
    tech = Tech(user_pk=user_isntance.user_pk,
                label=label, values=values)
    user_isntance.techs.append(tech)
    db.session.commit()
    return tech
    
def create_detail(user_instance, description,
                    work_instance=None, project_instance=None):
    """ create and return detail for work or project 
        user_pk:    FK from users.user_pk 
        bullet:     text
        work_pk:    FK from works.work_pk
        project_pk: FK from projects.project_pk """
    detail = Detail(user_pk=user_instance.user_pk,
                            bullet=description)
    if work_instance:
        work_instance.details.append(detail)
        db.commit()
        return detail
    elif project_instance:
        project_instance.details.append(detail)
        db.commit()
        return detail
    else:
        return None



