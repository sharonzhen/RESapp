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
def login_session():
    """ """
    if session.get("user"):
        return render_template('homepage.html')
    

@app.route('/create', methods=['POST'])
def create_account():
    """ """
    if session.get("user"):
        return render_template('homepage.html')
    
        


@app.route('/profile')
def view_contact():
    if session.get("user"):
        return render_template('profile.html')
    else:
        return render_template('login_create.html')


@app.route('/resume')
def view_resume():
    if session.get("user"):
        return render_template('resume.html')
    else:
        return render_template('login_create.html')


@app.route('/generate')
def pick_resume():
    if session.get("user"):
        return render_template('generate.html')
    else:
        return render_template('login_create.html')

def generate_pdf():
    pass



if __name__ == "__main__":
    app.debug = True
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0")
