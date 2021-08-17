""" Flask site for resume-rendering and job app tracking """

from flask import (Flask, session, render_template, request,
                    flash, redirect)
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "dev"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


if __name__ == "__main__":
    app.debug = True
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0")
