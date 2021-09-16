""" Flask site for resume-rendering and job app tracking """

from flask import (Flask, session, render_template, request,
                    flash, redirect, send_from_directory, jsonify)
from flask_debugtoolbar import DebugToolbarExtension
from jinja2 import StrictUndefined
from model import connect_to_db
import crud, os
from renderTeX import rpdf
from datetime import date
import json


app = Flask(__name__)
app.secret_key = "dev"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

RESTYPE = {
    "edu":('s', 1),
    "tech":('s',2),
    "course":('s',3),
    "work":('d',1),
    "proj":('d',2),
    "extra":('d',3)
}

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
    return render_template('profile.html')

@app.route('/profile/api')
def get_contact():
    if "user" not in session:
        return redirect('/')
    username = session.get('user')
    contact = crud.get_contact(username)
    contact_json = {
        'login': contact.user.login,
        'password': "******",
        'fname':contact.first,
        'lname':contact.last,
        'location':contact.loc,
        'email':contact.email,
        'phone':contact.phone,
        'github':contact.github,
        'linkedin':contact.linkedin
    }
    return jsonify(contact_json)

@app.route('/profile/edit', methods=['POST'])
def edit_contact():
    if "user" not in session:
        return redirect('/')
    username = session.get('user')
    contact = crud.get_contact(username)
    form_values = request.get_json()

    if form_values:
        if form_values['field']=='name':
            crud.update_table(contact, 'first', form_values['first'])
            crud.update_table(contact, 'last', form_values['last'])
        else:
            crud.update_table(contact, form_values['field'], form_values['value'])
        return jsonify({'res':'success'})
    return jsonify({'res':'something went wrong'})



def sort_items(stable_items, dynamic_items, edu, tech, 
            course, work, proj, extra):
    for s in stable_items:
        if s.s_type == 1:
            if s.date:
                dates = s.date.strftime('%B %Y')
            else:
                dates=None
            edu[s.id]= {
                'name': s.name,
                'date': dates,
                'location': s.loc,
                'description': s.des
            }
        elif s.s_type == 2:
            tech[s.id]= {
                'label': s.name,
                'description': s.des
            }
        else:
            course[s.id]={
                'category': s.name,
                'list': s.des
            }
    for d in dynamic_items:
        details_dict = {}
        for detail in d.details:
            details_dict[detail.id] = detail.des
        
        dates = d.d_from.strftime('%B %Y')

        if d.d_type == 1:
            dates += ' to '
            if d.d_to:
                dates+= d.d_to.strftime('%B %Y')
            else:
                dates+= "present"
            
            work[d.id] = {
                'name': d.name,
                'role': d.role,
                'location': d.loc,
                'dates': dates,
                'details': details_dict
            }
           
        elif d.d_type == 2:
            proj[d.id] = {
                'name': d.name,
                'role': d.role,             #technologies
                'location': d.loc,          #link
                'date': dates,
                'details':details_dict
            }
        else:
            dates += ' to '
            if d.d_to:
                dates+= d.d_to.strftime('%B %Y')
            else:
                dates+= "present"
            extra[d.id] = {
                'name': d.name,
                'role': d.role,
                'location': d.loc,
                'dates':dates,
                'details':details_dict
            }

@app.route('/resume')
def view_resume():
    if "user" not in session:
        return redirect('/')
    return render_template('resume.html')

@app.route('/resume/api')
def resume_api():
    if "user" not in session:
        return redirect('/')
    username = session.get('user')
    stable_items = crud.get_stable_items(username)
    dynamic_items = crud.get_dynamic_items(username)
    # stable
    edu = {} # 1
    tech = {} # 2
    course = {} # 3
    # dynamic
    work = {} # 1
    proj = {} # 2
    extra = {} # 3

    sort_items(stable_items, dynamic_items, edu, tech, 
            course, work, proj, extra)

    return jsonify({
        'edu': edu,
        'tech': tech,
        'course': course,
        'work': work,
        'proj': proj,
        'extra': extra
    })



@app.route('/resume/edit', methods=['POST'])
def edit_resume():
    if "user" not in session:
        return redirect('/')
    pass
    # TODO after getting started on frontend


def jsonify_dytem(dytem):
    details_dict = {}
    for detail in dytem.details:
        details_dict[detail.id] = detail.des

    dates = dytem.d_from.strftime('%B %Y')

    if dytem.d_type != 2:
        dates += ' to '
        if dytem.d_to:
            dates+= dytem.d_to.strftime('%B %Y')
        else:
            dates+= "present"

    ret = {}
    ret[dytem.id] = {
                'name': dytem.name,
                'role': dytem.role,
                'location': dytem.loc,
                'dates': dates,
                'details': details_dict
            }
    return jsonify(ret)




@app.route('/resume/add', methods=['POST'])
def add_resume():
    if "user" not in session:
        return redirect('/')
    username = session.get('user')
    form_values = request.get_json()

    if form_values is None:
        return jsonify({'res':'failure to get form values'})

    model_type = RESTYPE.get(form_values['formType']) # (char, int)

    if model_type:
        item_type = model_type[0]
        type_id = model_type[1]

        name = form_values.get('name')
        datefrom = form_values.get('datefrom')
        location = form_values.get('location')        

        if item_type == 's':                        # stable item
            description = form_values.get('description')
            crud.create_stitem(username, type_id, 
                    name, datefrom, location, description)
        else: 
            role = form_values.get('role')
            dateto = form_values.get('dateto')
            tags = "test"
            details = form_values.get('details')
            dytem = crud.create_dytem(username, type_id, 
                    name, role, location, datefrom, dateto, tags)
            for detail in details:
                crud.create_detail(dytem, detail)
            return jsonify_dytem(dytem)
    else:
        return jsonify({'err':f'Error adding {model_type} to Resume'})
    
    return jsonify({'err':'something went wrong'})

@app.route('/generate')
def generate_resume():
    if "user" not in session:
        return redirect('/')
    username = session.get('user')
    stable_items = crud.get_stable_items(username)
    dynamic_items = crud.get_dynamic_items(username)
    # stable
    edu = [] # 1
    tech = [] # 2
    course = [] # 3
    # dynamic
    work = [] # 1
    proj = [] # 2
    extra = [] # 3
    # sort_items(stable_items, dynamic_items, edu, tech, 
    #         course, work, proj, extra)
    # return render_template('generate.html', education=edu, 
    #         technical_skills=tech, courses=course, 
    #         work_experiences=work, projects=proj, 
    #         extracurriculars=extra)



@app.route('/generate/download', methods=['POST'])
def generate_download_pdf():
    if "user" not in session:
        return redirect('/')
    username = session.get('user')
    user = crud.get_user(username)
    s_li = user.stitems
    d_li = user.dytems
    
    # stable
    edu = [] # 1
    tech = [] # 2
    course = [] # 3
    # dynamic
    work = [] # 1
    proj = [] # 2
    extra = [] # 3
    stable_items = []
    dynamic_items = []

    form_data = request.form.to_dict()
    for item in s_li:
        fstr = f's{item.id}'
        if fstr in form_data:
            stable_items.append(item)
    for item in d_li:
        fstr = f'd{item.id}'
        if fstr in form_data:
            dynamic_items.append(item)

    sort_items(stable_items, dynamic_items, edu, tech, 
            course, work, proj, extra)
    print(form_data)
    # call rpdf, save return value (type tuple) as download path
    path_filename = rpdf(user=user, skills=tech, projects=proj, 
            works=work, schools=edu, courses=course, 
            extras=extra, key_form=form_data)
    print(path_filename)
    session['dir']=path_filename
    # create link
    return redirect('/generate/show-pdf')

@app.route('/generate/show-pdf')
def show_pdf():
    if "user" not in session:
        return redirect('/')
    dirname = session.get('dir')
    if (dirname!=None):
        print(os.path.abspath(dirname))
        print("here")
        return send_from_directory(os.path.abspath(dirname), 'resume.pdf', as_attachment=True)

    return redirect('/generate')

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
