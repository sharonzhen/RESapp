import os
from datetime import date
from random import randint
from model import db, User, Contact, Stitem, Dytem, Detail, connect_to_db
from crud import *
from server import app
from faker import Faker

def populate_model():
    fake = Faker()
    for i in range(10):
        login = f"login_{i}"
        password = f"p_{i}"
        user = create_user(login, password)

        first = fake.first_name()
        last = fake.last_name()
        location = fake.city()+', '+fake.state()
        email = fake.email()
        phone = fake.phone_number()
        github = f"github_{i}"
        linkedin = f"linkedin_{i}"
        create_contact(user, first, last, location, email, phone, github, linkedin)

        for j in range(5):
            s_type = randint(1,3)
            s_name = fake.word()
            s_date = fake.date()
            s_loc = fake.city()+', '+fake.state()
            des = fake.sentence()
            create_stitem(user, s_type, s_name, s_date, s_loc, des)

            d_type = randint(1,3)
            d_role = fake.job()
            d_name = fake.word()
            d_loc = fake.city()+', '+fake.state()
            d_from = fake.date()
            d_to = fake.date()
            tags = fake.sentence()
            dyt = create_dytem(user, d_type, d_name, d_role, d_loc, d_from, d_to, tags)

            for k in range(3):
                bullet = fake.sentence()
                create_detail(dyt, bullet)



if __name__ == '__main__':
    os.system('dropdb --force resumes')
    os.system('createdb resumes')
    from server import app
    connect_to_db(app)
    populate_model()









