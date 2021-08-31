import os, subprocess
import jinja2abspat
import pathlib

def render_template(user, skills, projects, works, schools, courses, extras):
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
        loader = jinja2.FileSystemLoader(os.path('tex/tex_templates'))
    )
    # load template into jinja environment
    template = env_for_latex.get_template('template_1.tex')
    
    # render template w/ variables
    rendered_temp = template.render(contact=user.contact, skills=skills, projects=projects,
                                workplaces=works, schools=schools, courses=courses, 
                                extracurriculars=extras)


    # write rendered_temp into a .tex file in folder associated with user
    dir_path = f'tex/{user.id}/'
    filename = 'resume'
    save_path = dir_path+filename+'.tex'
    pathlib.Path(save_path).mkdir(parents=True,exist_ok=True)
    try:
        with open(save_path, 'w') as output:
            output.write(rendered_temp)
    except:
        print('error writing in file')
        return None

    
    # create pdf file, runs typesetter on file and create file.pdf
    args_list = ['pdflatex']
    call_string = 'pdflatex --output-directory='+dir_path+' '+save_path
    try:
       subprocess.check_output(call_string)
    except subprocess.CalledProcessError as e:
        print(e.output)
        return None

    return dir_path+filename+'.pdf'

    



    