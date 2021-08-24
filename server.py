""" Flask site for resume-rendering and job app tracking """

from flask import (Flask, session, render_template, request,
                    flash, redirect)
from flask_debugtoolbar import DebugToolbarExtension
from jinja2 import StrictUndefined
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "dev"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def show_homepage():
    """ show application's homepage if user is in session
        if user isn't in session, show login """
    if session.get("user"):
        return render_template('homepage.html')
    else:
        return render_template('login_create.html')


@app.route('/login', methods=['POST'])
def login_handler():
    """ checks database for username and password combo
        return: True if (username, password) exists in database 
                False otherweise """
    if "user" not in session:
        username = request.form.get('login')
        password = request.form.get('pwd')
   
        if crud.password_correct(username, password):
            session["user"]=username
            flash(f'Logged in as {username}')
        else:
            flash("Username or password aren't correct")
    
    return redirect('/')
    

@app.route('/create', methods=['POST'])
def create_account():
    """ create account and populate database """
    if session.get("user"):
        return redirect('/')

    username = request.form.get('login_new')
    password = request.form.get('pwd_new')

    if crud.username_exists(username):
        flash(f'Username already exists')
    else:
        user = crud.create_user(username, password)

        first = request.form.get('first_name')
        last = request.form.get('last_name')
        loc = request.form.get('location')
        email = request.form.get('email')
        phone = request.form.get('phone')
        github = request.form.get('github')
        linkedin = request.form.get('linkedin')
        
        crud.create_contact(user, first, last, loc, email, phone, github, linkedin)
        flash(f'User {username} created! Return to login')

    return redirect('/')
    

@app.route('/profile')
def view_contact():
    if "user" not in session:
        return redirect('/')
    username = session.get('user')
    contact = crud.get_contact(username)

    return render_template('profile.html', contact=contact)


@app.route('/resume')
def view_resume():
    if "user" not in session:
        return redirect('/')

    return render_template('resume.html')



@app.route('/generate')
def pick_resume():
    if "user" not in session:
        return redirect('/')


    return render_template('generate.html')


def generate_pdf():
    pass

@app.route('/logout')
def handle_logout():
    session.clear()
    return redirect('/')

if __name__ == "__main__":
    app.debug = True
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0")
