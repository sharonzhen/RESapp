import os
from datetime import date
from model import db, User, Contact, Stitem, Dytem, Detail, connect_to_db
import crud
from server import app
from faker import Faker

os.system('dropdb --force resumes')
os.system('createdb resumes')

connect_to_db(app)
db.create_all()


