from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """ User with primary key, email, password """
    __tablename__ = "users"
    user_pk = db.Column(db.Integer, primary_key = True, autoincrement = True)
    login = db.Column(db.String(50), unique = True)
    password = db.Column(db.String(50))
    
    # relationships
    # one-to-one
    contact = db.relationship('Contact', uselist=False) 
    # one-to-many
    resumes = db.relationship('Resume')                 
    works = db.relationship('Work', backref = 'user')
    courses = db.relationship('Course', backref = 'user')
    projects = db.relationship('Project', backref = 'user')
    techs = db.relationship('Tech', backref = 'user')

    def __repr__(self):
        return f"<User {user_pk} created with login: {login}>"

class Contact(db.Model):
    """data model for user's contact info """
    __tablename__ = "contacts"
    # primary foreign key
    user_pk = db.Column(db.Integer, db.ForeignKey('users.user_pk'), primary_key=True)
    # non-nullables
    first = db.Column(db.String(20), nullable=False) 
    last = db.Column(db.String(20), nullable=False) 
    email = db.Column(db.String(50), nullable=False)
    # nullables
    phone = db.Column(db.String(20), nullable=True)
    github = db.Column(db.String(50), nullable=True) 
    linkedin = db.Column(db.String(50), nullable=True)
    # relationships
    # one-to-one
    user = db.relationship('User', uselist=False)   

    def __repr__(self):
        return f"<Contact for user {user_pk} created>"

class Resume(db.Model):
    """ data model for user's resumes """ 
    __tablename__ = "resumes"
    # primary key
    resume_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign keys
    user_pk = db.Column(db.Integer, db.ForeignKey('users.user_pk'), nullable=False)
    # nullables
    course_res = db.Column(db.Integer, nullable=True, autoincrement = True)  
    projects_res = db.Column(db.Integer, nullable=True, autoincrement=True)
    tech_res = db.Column(db.Integer, nullable=True, autoincrement=True)
    work_res = db.Column(db.Integer, nullable=True, autoincrement=True)

    # relationships
    # many-to-one
    user = db.relationship('User')  
    # many-to-many
    contact = db.relationship('Contact', backref = 'resumes') 
    works = db.relationship('Work', secondary = 'resume_work', backref = 'resumes')
    courses = db.relationship('Course', secondary = 'resume_course', backref = 'resumes')
    projects = db.relationship('Project', secondary = 'resume_project', backref = 'resumes')
    techs = db.relationship('Tech', secondary = 'resume_tech', backref = 'resumes')

    def __repr__(self):
        return f"<Resume {resume_pk} generated>"

class Work(db.Model):
    """ data model for all employment history """
    __tablename__ = "works"
    # primary key
    work_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign key
    user_pk = db.Column(db.Integer, db.ForeignKey('users.user_pk'), nullable=False)
    # non-nullables
    company = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    date_from = db.Column(db.DateTime, nullable=False)
    # nullables
    date_to = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f"<Added workplace at {company} for user {user_pk}>"

class Course(db.Model):
    """ data model for all courses """ 
    __tablename__ = "courses"
    # primary key
    course_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign key
    user_pk = db.Column(db.Integer, db.ForeignKey('users.user_pk'), nullable=False)
    # non-nullables
    name = db.Column(db.String(50), nullable=False)
    
    def __repr__(self):
        return f"<Added course {name} for {user_pk}>"

class Project(db.Model):
    """ data model for all projects """ 
    __tablename__ = "projects"
    # primary key
    project_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign key
    user_pk = db.Column(db.Integer, db.ForeignKey('users.user_pk'), nullable=False)
    # non-nullables
    name = db.Column(db.String(50), nullable=False)
    # nullables
    link = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f"<Added project {name} for user {user_pk}>"

class Tech(db.Model):
    """ data model for all technologies """ 
    __tablename__ = "techs"
    # primary key
    tech_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign key 
    user_pk = db.Column(db.Integer, db.ForeignKey('users.user_pk'), nullable=False)
    # non-nullable
    label = db.Column(db.String(50), nullable=False) # i.e. proficient in:
    values = db.Column(db.Text, nullable=False) # i.e. c++, java, etc.
    
    def __repr__(self):
        return f"<Added {tech} for {user_pk}>"

class Detail(db.Model):
    """ data model for all details """ 
    __tablename__ = "details"
    # primary key
    detail_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign key
    user_pk = db.Column(db.Integer, db.ForeignKey('users.user_pk'), nullable=False)
    # non-nullable
    bullet = db.Column(db.Text, nullable=False)
    # foreign keys
    work_pk = db.Column(db.Integer, db.ForeignKey('works.work_pk'), nullable=True)
    project_pk = db.Column(db.Integer, db.ForeignKey('projects.project_pk'), nullable=True)
    # relationships
    # many-to-one
    work = db.relationship('Work', backref = 'details')
    project = db.relationship('Project', backref = 'details')

    def __repr__(self):
        if work:
            return f"<Added employment detail for user {user_pk}>"
        elif project:
            return f"<Added project detail for user {user_pk}>"
        else:
            return f"Added detail for neither employment nor project"

###############################################################
################ ASSOCIATION TABLES ###########################
###############################################################

class ResumeCourse(db.Model):
    """ Resume-Course association table"""   
    __tablename__ = "resume_course"
    course_pk = db.Column(db.Integer, db.ForeignKey('courses.course_pk'), primary_key = True, nullable=False)
    course_res = db.Column(db.Integer, db.ForeignKey('resumes.course_res'), primary_key = True, nullable=False)
    


class ResumeProject(db.Model):
    """ Resume-Project association table""" 
    __tablename__ = "resume_project"
    project_pk = db.Column(db.Integer, db.ForeignKey('projects.project_pk'), primary_key = True, nullable=False)
    project_res = db.Column(db.Integer, db.ForeignKey('resumes.project_res'), primary_key = True, nullable=False)



class ResumeTech(db.Model):
    """ Resume-Technologies association table"""
    __tablename__ = "resume_tech"
    tech_pk = db.Column(db.Integer, db.ForeignKey('techs.tech_pk'), primary_key = True, nullable=False)
    tech_res = db.Column(db.Integer, db.ForeignKey('resumes.tech_res'), primary_key = True, nullable=False)



class ResumeWork(db.Model):
    """ Resume-Work association table"""
    __tablename__ = "resume_work"
    work_pk = db.Column(db.Integer, db.ForeignKey('works.work_pk'), primary_key = True, nullable=False)
    work_res = db.Column(db.Integer, db.ForeignKey('resumes.work_res'), primary_key = True, nullable=False)


###########################################################

def connect_to_db(flask_app, db_uri="postgresql:///resumes", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    
