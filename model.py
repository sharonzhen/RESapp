from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Contact(db.Model):
    """data model for user's contact info """
    __tablename__ = "contact_info"

    # non-nullables
    con_id = db.Column(db.Integer, primary_key=True, autoincrement = True) # contact id
    f_name = db.Column(db.String(20), nullable=False) # first name
    l_name = db.Column(db.String(20), nullable=False) # last name
    email = db.Column(db.String(50), nullable=False)

    # nullables
    phone = db.Column(db.String(20), nullable=True)
    github = db.Column(db.String(50), nullable=True) 
    linkedin = db.Column(db.String(50), nullable=True)
    
    def __repr__(self):
        return f"<Contact id={self.con_id} \n   first={self.f_name} last={self.l_name} email={self.email}>"

class Resume(db.Model):
    """ data model for user's resumes """ 
    __tablename__ = "resumes"

    res_id = db.Column(db.Integer, primary_key=True, autoincrement = True) # resume id
    proj_id = db.Column(db.Integer, db.ForeignKey(''), nullable=False) # resume projects id
    tech_id = db.Column(db.Integer, db.ForeignKey(''), nullabale=False) # resume technologies id
    con_id = db.Column(db.Integer, db.ForeignKey('contact_info.con_id'), nullable=False)) # contact id
    
    def __repr__(self):
        return f"<User id={self.con_id} first={self.f_name} last={self.l_name} email={self.email}>"











if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    print('Connected to db!')
