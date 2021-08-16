from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Contact(db.Model):
    """data model for user's contact info """
    __tablename__ = "contacts"

    # primary key
    contact_pk = db.Column(db.Integer, primary_key=True, autoincrement = True)
    # non-nullables
    first = db.Column(db.String(20), nullable=False) 
    last = db.Column(db.String(20), nullable=False) 
    email = db.Column(db.String(50), nullable=False)
    # nullables
    phone = db.Column(db.String(20), nullable=True)
    github = db.Column(db.String(50), nullable=True) 
    linkedin = db.Column(db.String(50), nullable=True)
    
    # backrefs: resumes = db.relationship('Resume')

    def __repr__(self):
        return f"<>"

class Resume(db.Model):
    """ data model for user's resumes """ 
    __tablename__ = "resumes"
    # primary key
    resume_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign keys
    contact_id = db.Column(db.Integer, db.ForeignKey('contacts.contact_pk'), nullable=False)
    # non-nullables
    course_res = db.Column(db.Integer, nullable=False, autoincrement = True)  
    projects_res = db.Column(db.Integer ,nullable=False, autoincrement=True)
    tech_res = db.Column(db.Integer, nullable=False, autoincrement=True)
    work_res = db.Column(db.Integer, nullable=False, autoincrement=True)

    # relationships
    contact = db.relationship('Contact', backref = 'resumes')
    # rc.courses -> db.relationship('Course')
    # rp.projects -> db.relationship('Project)
    # rt.techs -> db.relationship('Tech')
    # rw.works -> db.relationship('Work')

    def __repr__(self):
        return f"<>"

class Work(db.Model):
    """ data model for all employment history """
    __tablename__ = "works"
    # primary key
    work_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign key 
    detail = db.Column(db.Integer, db.ForeignKey('details.detail_pk'), nullable=False)
    # non-nullables
    company = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    date_from = db.Column(db.DateTime, nullable=False)
    # nullables
    date_to = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f"<>"

class Course(db.Model):
    """ data model for all courses """ 
    __tablename__ = "courses"
    # primary key
    course_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # non-nullables
    name = db.Column(db.String(50), nullable=False)
    
    def __repr__(self):
        return f"<>"

class Project(db.Model):
    """ data model for all projects """ 
    __tablename__ = "projects"
    # primary key
    project_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # foreign keys
    detail = db.Column(db.Integer, db.ForeignKey('details.detail_pk'), nullable=False)
    # non-nullables
    name = db.Column(db.String(50), nullable=False)
    # nullables
    link = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f"<>"

class Tech(db.Model):
    """ data model for all technologies """ 
    __tablename__ = "techs"
    # primary key
    tech_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # non-nullable
    label = db.Column(db.String(50), nullable=False) # i.e. proficient in:
    values = db.Column(db.Text, nullable=False) # i.e. c++, java, etc.
    
    def __repr__(self):
        return f"<>"

class Detail(db.Model):
    """ data model for all details """ 
    __tablename__ = "details"
    # primary key
    detail_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # non-nullable
    bullet = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f"<>"

###############################################################
################ ASSOCIATION TABLES ###########################
###############################################################

class ResCourse(db.Model):
    """ Resume-Course association table"""   
    __tablename__ = "rescourse"
    course_pk = db.Column(db.Integer, db.ForeignKey('courses.course_pk'), primary_key = True, nullable=False)
    course_res = db.Column(db.Integer, db.ForeignKey('resumes.course_res'), primary_key = True, nullable=False)
    
    # relationships
    resumes = db.relationship('Resume', backref = 'rc')
    courses = db.relationship('Course', backref = 'rc')

    def __repr__(self):
        return f"<>"


class ResProject(db.Model):
    """ Resume-Project association table""" 
    __tablename__ = "resproject"
    project_pk = db.Column(db.Integer, db.ForeignKey('projects.project_pk'), primary_key = True, nullable=False)
    project_res = db.Column(db.Integer, db.ForeignKey('resumes.project_res'), primary_key = True, nullable=False)

    # relationships
    resumes = db.relationship('Resume', backref = 'rp')
    projects = db.relationship('Project', backref = 'rp')
    def __repr__(self):
        return f"<>"


class ResTech(db.Model):
    """ Resume-Technologies association table"""
    __tablename__ = "restech"
    tech_pk = db.Column(db.Integer, db.ForeignKey('techs.tech_pk'), primary_key = True, nullable=False)
    tech_res = db.Column(db.Integer, db.ForeignKey('resumes.tech_res'), primary_key = True, nullable=False)

    # relationships
    resumes = db.relationship('Resume', backref = 'rt')
    techs = db.relationship('Tech', backref = 'rt')
    def __repr__(self):
        return f"<>"


class ResWork(db.Model):
    """ Resume-Work association table"""
    __tablename__ = "reswork"
    work_pk = db.Column(db.Integer, db.ForeignKey('works.work_pk'), primary_key = True, nullable=False)
    work_res = db.Column(db.Integer, db.ForeignKey('resumes.work_res'), primary_key = True, nullable=False)

    # relationships
    resumes = db.relationship('Resume', backref = 'rw')
    works = db.relationship('Work', backref = 'rw')
    def __repr__(self):
        return f"<>"

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
    
