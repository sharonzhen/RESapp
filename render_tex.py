import jinja2
import subprocess, os
from jinja2 import Template

with open ('output.tex')


latex_env = jinja2.Environment(
    block_start_string = '\BLOCK{', 
    block_end_string = '}', 
    variable_start_string = '\VAR{',
    variable_end_string = '}',
    comment_start_string = '\#{',
    comment_end_string = '}',
    line_statement_prefix = '%-',
    line_comment_prefix = '%#',
    trim_blocks = True,
    autoescape = False,
    loader = jinja2.FileSystemLoader(os.path('templates/tex'))
)

template = latex_env.get_template('templates/tex/template_1.tex')


# do something to reset environment
