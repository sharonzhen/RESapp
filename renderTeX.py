import os, subprocess, glob
import jinja2
import pathlib

def make_clean_path(directory_path):
    """ checks if path exists
        if exists: delete files in it
        else: create path
    """
    if os.path.isdir(directory_path):
        str_to_del = directory_path+f"/*"
        files_to_del = glob.glob(str_to_del)
        for f in files_to_del:
            try:
                os.remove(f)
            except OSError as e:
                print(f"Error removing {f}: {e.strerror}")
                return False
    else:
        try:
            os.makedirs(directory_path)
        except OSError as e:
            print(f"Error making {directory_path}: {e.strerror}")
            return False
    return True


def rpdf(user, skills, projects, works, schools, courses, extras, key_form):
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
        loader = jinja2.FileSystemLoader(os.path.abspath('tex/tex_templates'))
    )
    # load template into jinja environment
    template = env_for_latex.get_template('template_1.tex')
    
    # render template w/ variables
    rendered_temp = template.render(contact=user.contact, skills=skills, projects=projects,
                                workplaces=works, schools=schools, courses=courses, 
                                extracurriculars=extras, kform = key_form)


    # write rendered_temp into a .tex file in folder associated with user
    dir_path = f'tex/{user.id}'
    if make_clean_path(dir_path):

        filename = '/resume.tex'
        save_path = dir_path+filename
        try:
            with open(save_path, 'w') as output:
                output.write(rendered_temp)
        except:
            print('error writing in file')
            return None

        
        # create pdf file, runs typesetter on file and create file.pdf
        try:
            print(save_path)
            subprocess.check_output(["pdflatex", f"-output-directory={dir_path}", save_path])
        except:
            print("error generating pdf")
            return None

        return dir_path
    else:
        print("error")
        return None

    

