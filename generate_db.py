import os
from datetime import date
from model import (db, User, Contact, Resume, Work, Course,
                    Project, Tech, Detail, connect_to_db)
from crud import (create_user, create_contact, create_resume,
                    create_work, create_course, create_project,
                    create_tech, create_detail)
from server import app
from faker import Faker

os.system('dropdb --force resumes')
os.system('createdb resumes')

connect_to_db(app)
db.create_all()

