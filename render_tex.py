import os
import jinja2
from pdflatex import PDFLaTeX
import pathlib

def render_template(user, skills, projects, works, schools, courses, extras):
    # folder associated with user
    u_path = f'tex/{user.id}'
    pathlib.Path(u_path).mkdir(parents=True,exist_ok=True)
    
    env_for_latex = jinja2.Environment(
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
        loader = jinja2.FileSystemLoader(os.path('u_path'))
    )
    # load template into jinja environment
    template = env_for_latex.get_template('tex/tex_templates/template_1.tex')
    
    # render template w/ variables
    rendered_temp = template.render(contact=user.contact, skills=skills, projects=projects,
                                workplaces=works, schools=schools, courses=courses, 
                                extracurriculars=extras)
    
    # create .tex file
    f_path = 'doc.tex'
    pathlib.Path(f_path).mkdir(parents=True,exist_ok=True)

    # try to write document into file else handle error
    try:
        with open(f_path) as output:
            output.write(tendered_temp)
    except: 
        print('problem writing latex file')
        return None

    # create pdf file
    pdfl = PDFLaTeX.from_textfile(f_path)
    pdf, log, completed_process = pdfl.create_pdf(keep_pdf_file=True, keep_log_fie=True, )

    return f_path

    



    