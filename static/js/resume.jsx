'use strict';
import { safeGet } from "./modules";
import { safePost } from "./modules";

let EduForm = () => {
    let [schoolName, setSchoolName] = React.useState('');
    let [gradDate, setGradDate] = React.useState(Date.now());
    let [degree, setDegree] = React.useState('');
    let [eduLocation, setEduLocation] = React.useState('');

    let onSubmit = (e) => {};
    return (
        <Form>
            <Form.Group className="mb-3" controlId="school-name">
                <Form.Label>School Name: </Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e)=>{setSchoolName(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="grad-date">
                <Form.Label>Graduation Date: </Form.Label>
                <Form.Control
                    type="date"
                    onChange={(e)=>{setGradDate(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="degree">
                <Form.Label>Degree: </Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e)=>{setDegree(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="edu-loc">
                <Form.Control
                    type="text"
                    onChange={(e)=>{setEduLocation(e.target.value)}}/>
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}>
                Add
            </Button>
        </Form>
    );

};

let EduButton = () => {

};

let SkillsForm = () => {
    let [skill, setSkill] = React.useState('');
    let [skillList, setSkillList] = React.useState('');

    let onSubmit = (e) => {};
    return (
        <Form>
            <Form.Group className="mb-3" controlId="skill-label">
                <Form.Label>Category: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="i.e. Proficient"
                    onChange={(e)=>{setSkill(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="skill-list">
                <Form.Label>Items: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="i.e. C++, Python, Java, etc." 
                    onChange={(e)=>{setSkillList(e.target.value)}} />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}>
                Add
            </Button>
        </Form>        
    );
};

let CoursesForm = () => {
    let [course, setCourse] = React.useState('');
    let [courseList, setCourseList] = React.useState('');

    let onSubmit = (e) => {};
    return (
        <Form>
            <Form.Group className="mb-3" controlId="course-label">
                <Form.Label>Category: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="i.e. undergraduate" 
                    onChange={(e)=>{setCourse(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="course-list">
                <Form.Label>Items: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="i.e. Data Structures, Algorithms, etc." 
                    onChange={(e)=>{setCourseList(e.target.value)}} />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}>
                Add
            </Button>    
        </Form>        
    );
};

let AddDetail = ({id1, id2, parent, setParent}) => {
    const [oc, setOC] = useState(false);
    const ocClose = () => setOC(false);
    const ocShow = () => setOC(true);
    const [d, setD] = React.useState('');

    return (
        <Form.Group className="mb-3" controlID={id1}>
                <Form.Label>Details: </Form.Label>
                    <Button 
                        variant="outline-secondary"
                        onClick={ocShow}
                        className="me-2">
                            Add Detail
                    </Button>
                    <Form
                        show={oc}
                        onHide={ocClose}>
                                        <Form>
                                            <Form.Group className="mb-3" controlId={id2}>

                                                <Form.Control 
                                                    as="textarea" 
                                                    rows={4}
                                                    value={d}
                                                    onChange={(e)=>{setD(e.target.value)}}/>
                                            </Form.Group>
                                        </Form>
                                    <Button
                                        variant="outline-primary"
                                        onClick={()=> {
                                            setParent(prev => {
                                                prev = prev.push(d);
                                                return prev;
                                            });
                                            setD('');
                                            ocClose;
                                        }}>
                                        Add
                                    </Button>
                    </Form>
                <ListGroup>
                {
                        parent.map((item) => (
                            <ListGroup.Item>{item}</ListGroup.Item>
                        ))
                }
                </ListGroup>
            </Form.Group>
    );

};

let WorkForm = () => {
    let [workplace, setWorkplace] = React.useState('');
    let [workRole, setWorkRole] = React.useState('');
    let [workLoc, setWorkLoc] = React.useState('');
    let [wStartDate, setWStartDate] = React.useState(Date.now());
    let [wEndDate, setWEndDate] = React.useState(null);

    let [checked, setChecked] = React.useState(true);
    let [tags, setTags] = React.useState('test tag');
    let [details, setDetails] = React.useState(Immutable.List());
    
    let onSubmit = (e) => {};
    return (
        <Form>
            <Form.Group className="mb-3" controlId="work-place">
                <Form.Label>Workplace: </Form.Label>
                <Form.Control
                    type="text"
                    value={workplace}
                    placeholder="Mann Co."
                    onChange={(e)=>{setWorkplace(e.target.value)}}/>                
            </Form.Group>
            <Form.Group className="mb-3" controlID="work-role">
            <Form.Label>Role: </Form.Label>
                <Form.Control
                    type="text"
                    value={workRole}
                    placeholder="Demoman"
                    onChange={(e)=>{setWorkRole(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlID="work-loc">
            <Form.Label>Location: </Form.Label>
                <Form.Control
                    type="text"
                    value={workLoc}
                    placeholder="Mannhattan"
                    onChange={(e)=>{setWorkLoc(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="wstart-date">
                <Form.Label>Start Date: </Form.Label>
                <Form.Control
                    type="date"
                    value={wStartDate}
                    onChange={(e)=>{setWStartDate(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="wend-date">
                <Form.Label>End Date: </Form.Label>
                <Form.Check 
                    type="checkbox" 
                    label="Currently working here" 
                    checked={checked}
                    onChange={()=>{
                        setChecked(!checked);
                        if (checked) {
                            setWEndDate(null);
                        }
                        }}/>
                <Form.Control
                    type="date"
                    value={wEndDate}
                    disabled={checked}
                    onChange={(e)=>{
                        if (!checked) {
                            setWEndDate(e.target.value)};
                        }}/>
            </Form.Group> 
            <AddDetail id1="wd1" id2="wd2" parent={details} setParent={setDetails}/>
            <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}>
                Add
            </Button>    
        </Form>        
    );
};

let ProjectForm = () => {
    let [pName, setPName] = React.useState('');
    let [pDescription, setPDescription] = React.useState('');
    let [pLink, setPLink] = React.useState('');
    let [pDate, setPDate] = React.useState(Date.now());
    let [tags, setTags] = React.useState('test tag');
    let [details, setDetails] = React.useState(Immutable.List());


    let onSubmit = (e) => {};
    return (
        <Form>

            <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}>
                Add
            </Button>    
        </Form>        
    );
};

let ExtraForm = () => {
    let [org, setOrg] = React.useState('');
    let [orgRole, setOrgRole] = React.useState('');
    let [orgLoc, setOrgLoc] = React.useState('');
    let [oStartDate, setOStartDate] = React.useState(Date.now());
    let [oEndDate, setOEndDate] = React.useState(null);
    let [tags, setTags] = React.useState('test tag');
    let [details, setDetails] = React.useState(Immutable.List());
    
    let onSubmit = (e) => {};
    return (
        <Form>
            <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}>
                Add
            </Button>
        </Form>        
    );
};


/* props: techSkills, setTechSkills */
let TechField = ({techSkills, setTechSkills}) => {
    let pushList = [];
    for (let [key] of techSkills) {
        pushList.push(
                <ListGroup.Item action variant="light" eventKey={key}> 
                <div><b>{techSkills.getIn([key, 'label'])}</b>:</div> 
                <div>{techSkills.getIn([key, 'description'])}</div> 
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Technical Skills</h2>
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
        {pushList}
        </ListGroup>
        </Card>
    );
};
/* props: education, setEducation*/
let EduField = ({education, setEducation}) => {
    let pushList = [];
    for (let [key] of education) {
        pushList.push(
                <ListGroup.Item action variant="light" eventKey={key}> 
                <div><h4>{education.getIn([key, 'name'])}</h4></div> 
                <div><i>{education.getIn([key, 'description'])}</i></div>
                <div>{education.getIn([key, 'location'])}</div><div>Graduated {education.getIn([key, 'date'])}</div> 
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Education</h2>
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
        {pushList}
        </ListGroup>
        </Card>
    );

};

/* props: projects, setProjects*/
let ProjField = ({projects, setProjects}) => {
    let pushList = [];
    for (let [key] of projects) {
        let detailList = [];
        for (let [dkey] of projects.getIn([key, 'details'])) {
            detailList.push(
                <ListGroup.Item as="li" eventKey={dkey}>
                    {projects.getIn([key, 'details', dkey])}
                </ListGroup.Item>
            );
        }
        pushList.push(
                <ListGroup.Item action variant="light" eventKey={key}> 
                <div><h4>{projects.getIn([key, 'name'])}</h4></div>
                <Table responsive="sm">
                    <tr>
                        <td>Date </td>
                        <td>{projects.getIn([key, 'date'])}</td>
                    </tr>
                    <tr>
                        <td>Technologies </td>
                        <td>{projects.getIn([key, 'technologies'])}</td>
                    </tr>
                    <tr>
                        <td>Link </td>
                        <td>{projects.getIn([key, 'link'])}</td>
                    </tr>
                </Table>
                <div>Details:
                    <ListGroup as="ul">
                        {detailList} 
                    </ListGroup>
                </div>
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Technical Projects</h2>
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
        {pushList}
        </ListGroup>
        </Card>
    );
};

/* props: coursework, setCoursework*/
let CourseField = ({coursework, setCoursework}) => {
    let pushList = [];
    for (let [key] of coursework) {
        pushList.push(
                <ListGroup.Item action variant="light" eventKey={key}> 
                <div><b>{coursework.getIn([key, 'category'])}</b>:</div> 
                <div>{coursework.getIn([key, 'list'])}</div> 
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Relevant Coursework</h2>
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
        {pushList}
        </ListGroup>
        </Card>
    );
};

/* props: work, setWork*/
let WorkField = ({work, setWork}) => {
    let pushList = [];
    for (let [key] of work) {
        let detailList = [];
        for (let [dkey] of work.getIn([key, 'details'])) {
            detailList.push(
                <ListGroup.Item as="li" eventKey={dkey}>
                    {work.getIn([key, 'details', dkey])}
                </ListGroup.Item>
            );
        }
        pushList.push(
                <ListGroup.Item action variant="light" eventKey={key}> 
                <div><h4>{work.getIn([key, 'name'])}</h4></div>
                <Table responsive="sm">
                    <tr>
                        <td>Date </td>
                        <td>{work.getIn([key, 'dates'])}</td>
                    </tr>
                    <tr>
                        <td>Role </td>
                        <td>{work.getIn([key, 'role'])}</td>
                    </tr>
                    <tr>
                        <td>Location </td>
                        <td>{work.getIn([key, 'location'])}</td>
                    </tr>
                </Table>
                <div>Details:
                    <ListGroup as="ul">
                        {detailList} 
                    </ListGroup>
                </div>
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Work Experience</h2>
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
        {pushList}
        </ListGroup>
        </Card>
    );
};

/* props: extras, setExtras*/
let ExtraField = ({extras, setExtras}) => {
    let pushList = [];
    for (let [key] of extras) {
        let detailList = [];
        for (let [dkey] of extras.getIn([key, 'details'])) {
            detailList.push(
                <ListGroup.Item as="li" eventKey={dkey}>
                    {extras.getIn([key, 'details', dkey])}
                </ListGroup.Item>
            );
        }
        pushList.push(
                <ListGroup.Item action variant="light" eventKey={key}> 
                <div><h4>{extras.getIn([key, 'name'])}</h4></div>
                <Table responsive="sm">
                    <tr>
                        <td>Date </td>
                        <td>{extras.getIn([key, 'dates'])}</td>
                    </tr>
                    <tr>
                        <td>Role </td>
                        <td>{extras.getIn([key, 'role'])}</td>
                    </tr>
                    <tr>
                        <td>Location </td>
                        <td>{extras.getIn([key, 'location'])}</td>
                    </tr>
                </Table>
                <div>Details:
                    <ListGroup as="ul">
                        {detailList} 
                    </ListGroup>
                </div>
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Extracurriculars</h2>
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
        {pushList}
        </ListGroup>
        </Card>
    );

};





let GeneratePage = () => {
    const [techSkills, setTechSkills] = React.useState(Immutable.Map()); 
    const [projects, setProjects] = React.useState(Immutable.Map());
    const [education, setEducation] = React.useState(Immutable.Map());
    const [coursework, setCoursework] = React.useState(Immutable.Map());
    const [work, setWork] = React.useState(Immutable.Map());
    const [extras, setExtras] = React.useState(Immutable.Map());

    React.useEffect(()=> {
        let resumePromise = safeGet('/resume/api');
        resumePromise.then(data => {
            let edu = Immutable.fromJS(data.edu);
            let techSkill = Immutable.fromJS(data.tech);
            let course = Immutable.fromJS(data.course);
            let work = Immutable.fromJS(data.work);
            let proj = Immutable.fromJS(data.proj);
            let extra = Immutable.fromJS(data.extra);

            setTechSkills(techSkill);
            setEducation(edu);
            setCoursework(course);
            setProjects(proj);
            setWork(work);
            setExtras(extra);
        });
    }, []);


    return (
    <div>
        <TechField 
            techSkills={techSkills}
            setTechSkills={setTechSkills}/>
        <ProjField 
            projects={projects}
            setProjects={setProjects}/>
        <WorkField 
            work={work}
            setWork={setWork}/>
        <EduField 
            education={education}
            setEducation={setEducation}/>
        <CourseField 
            coursework={coursework}
            setCoursework={setCoursework}/>
        <ExtraField 
            extras={extras}
            setExtras={setExtras}/>

    </div>
    );
};

ReactDOM.render(<GeneratePage/>,
    document.getElementById('root'));