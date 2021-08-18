from datetime import date
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """ holds login information """
    __tablename__ = "users"

    user_id  = db.Column(db.Integer, autoincrement=True, primary_key=True)
    login    = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    
    ### RELATIONSHIPS ###
    contact = db.relationship('Contact', uselist=False) # one-to-one
    stitems = db.relationship('Stitem', backref='user') # one-to-many
    dytems = db.relationship('Dytem', backref='user')

    def __repr__(self):
        return f"<User {self.user_id} created: {self.login}>"

class Contact(db.Model):
    """ data model for user's contact info """
    __tablename__ = "contacts"
    
    user_id  = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    first    = db.Column(db.String(20), nullable=False) 
    last     = db.Column(db.String(20), nullable=False) 
    loc      = db.Column(db.String(20), nullable=False)
    email    = db.Column(db.String(50), nullable=False)

    phone    = db.Column(db.String(20), nullable=True)
    github   = db.Column(db.String(50), nullable=True) 
    linkedin = db.Column(db.String(50), nullable=True)
    
    ### RELATIONSHIPS ###
    user = db.relationship('User', uselist=False)

    def __repr__(self):
        return f"<Contact for user {self.user.user_id} created>"

class Stitem(db.Model):
    """ stable items on resume
    example: 
        s_type: (1) education, 
                (2) tech skills, 
                (3) coursework """ 
    __tablename__ = "stable_items"

    item_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    s_type  = db.Column(db.Integer, nullable=False)

    name    = db.Column(db.String(100), nullable=True)
    date    = db.Column(db.Date, nullable=True)
    loc     = db.Column(db.String(50), nullable=True)
    des     = db.Column(db.Text, nullable=True) 

    ### RELATIONSHIPS ###
    # user

    def __repr__(self):
        return f"<stitem {self.item_id} created for user {self.user.user_id}>"

class Dytem(db.Model):
    """ dynamic items on resume 
    example: 
        d_type: (1) work experience
                (2) projects
                (3) extracurriculars """
    __tablename__ = "dynamic_items"

    item_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id  = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    d_type   = db.Column(db.Integer, nullable=False)
    name     = db.Column(db.String(100), nullable=False) # bolded

    role     = db.Column(db.String(50), nullable=True) # italicized
    loc      = db.Column(db.String(50), nullable=True)
    d_from   = db.Column(db.Date, nullable=True)
    d_to     = db.Column(db.Date, nullable=True)
    tags     = db.Column(db.Text, nullable=False)
    
    ### RELATIONSHIPS ###
    # user
    details = db.relationship('Detail', backref='dytem')

    def __repr__(self):
        return f"<dytem {self.item_id} created for user {self.user.user_id}>"


class Detail(db.Model):
    """ data model for all details """ 
    __tablename__ = "details"
    
    detail_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    dytem_id  = db.Column(db.Integer, db.ForeignKey('dynamic_items.item_id'), nullable=False)
    des       = db.Column(db.Text, nullable=False)

    ### RELATIONSHIPS ###
    # dytem

    def __repr__(self):
        return f"Added detail for {self.dytem.name}"

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
    
