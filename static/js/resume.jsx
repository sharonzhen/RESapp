'use strict';
import { safeGet } from "./modules";
import { safePost } from "./modules";



/* *************************************************** */
/* *************** contain onSubmit ****************** */
/* *************************************************** */

let EduForm = ({ancestor, setAncestor}) => {
    const [schoolName, setSchoolName] = React.useState('');
    const [gradDate, setGradDate] = React.useState(Date.now());
    const [degree, setDegree] = React.useState('');
    const [eduLocation, setEduLocation] = React.useState('');

    let onSubmit = (e) => {
        e.preventDefault();
        let formBody = {
            formType:"edu",
            name:schoolName,
            datefrom:gradDate,
            location:eduLocation,
            description:degree
        };
        let postResponse = safePost("/resume/add", formBody);
        postResponse.then((data)=> {
            /* 
            data = {id: { name: name,
                          date: date,
                          location: location,
                          description: description}}
            */
            // set ancestor to update values
            let immutableUpdate = Immutable.fromJS(data);
            // set ancestor to update values
            setAncestor(prev => {
                return prev.merge(immutableUpdate);
            });
        });
        // clear form
        setSchoolName('');
        setGradDate(Date.now());
        setDegree('');
        setEduLocation('');
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="school-name">
                <Form.Label>School Name </Form.Label>
                <Form.Control 
                    type="text"
                    value={schoolName}
                    placeholder="e.g. Greendale Community College"
                    onChange={(e)=>{setSchoolName(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="grad-date">
                <Form.Label>Graduation Date </Form.Label>
                <Form.Control
                    type="date"
                    value={gradDate}
                    onChange={(e)=>{setGradDate(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="degree">
                <Form.Label>Degree </Form.Label>
                <Form.Control
                    type="text"
                    value={degree}
                    placeholder="e.g. Film Studies"
                    onChange={(e)=>{setDegree(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="edu-loc">
                <Form.Label>Location </Form.Label>
                <Form.Control
                    type="text"
                    value={eduLocation}
                    placeholder="e.g. Greendale County, CO"
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

let SkillsForm = ({ancestor, setAncestor}) => {
    const [skill, setSkill] = React.useState('');
    const [skillList, setSkillList] = React.useState('');

    let onSubmit = (e) => {
        e.preventDefault();
        let formBody = {
            formType:"tech",
            name:skill,            // label
            description:skillList      
        };
        let postResponse = safePost("/resume/add", formBody);
        postResponse.then((data)=> {
            /* 
            data = {id: { name: name,
                          description: description}}
            */
            // set ancestor to update values
            let immutableUpdate = Immutable.fromJS(data);
            // set ancestor to update values
            setAncestor(prev => {
                return prev.merge(immutableUpdate);
            });
        });
        // clear form
        setSkill('');
        setSkillList('');
    };
    
    return (
        <Form>
            <Form.Group className="mb-3" controlId="skill-label">
                <Form.Label>Category: </Form.Label>
                <Form.Control
                    type="text"
                    value={skill}
                    placeholder="e.g. Proficient"
                    onChange={(e)=>{setSkill(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="skill-list">
                <Form.Label>Items: </Form.Label>
                <Form.Control
                    type="text"
                    value={skillList}
                    placeholder="e.g. C++, Python, Java, etc." 
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

let CoursesForm = ({ancestor, setAncestor}) => {
    const [course, setCourse] = React.useState('');
    const [courseList, setCourseList] = React.useState('');

    let onSubmit = (e) => {
        e.preventDefault();
        let formBody = {
            formType:"course",
            name:course,            // category
            description:courseList,     // list 
        };
        let postResponse = safePost("/resume/add", formBody);
        postResponse.then((data)=> {
            /* 
            data = {id: { name: name,
                          description: description}}
            */
            // set ancestor to update values
            let immutableUpdate = Immutable.fromJS(data);
            // set ancestor to update values
            setAncestor(prev => {
                return prev.merge(immutableUpdate);
            });
        });
        // clear form
        setCourse('');
        setCourseList('');
    };
    
    return (
        <Form>
            <Form.Group className="mb-3" controlId="course-label">
                <Form.Label>Category: </Form.Label>
                <Form.Control
                    type="text"
                    value={course}
                    placeholder="e.g. undergraduate" 
                    onChange={(e)=>{setCourse(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="course-list">
                <Form.Label>Items: </Form.Label>
                <Form.Control
                    type="text"
                    value={courseList}
                    placeholder="e.g. Data Structures, Algorithms, etc." 
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


/* props:   parent      details    type 
            setParent   setDetails type */
let AddDetail = ({id1, parent, setParent}) => {
    const [d, setD] = React.useState('');
    return (
        <Form.Group className="mb-3" controlID={id1}>
            <ListGroup>
            {
                parent.map((item) => (
                    <ListGroup.Item>{item}</ListGroup.Item>
                ))
            }
            </ListGroup>
            <Form.Control 
                as="textarea" 
                rows={4}
                value={d}
                onChange={(e)=>{setD(e.target.value)}}/>                            
            <Button 
                variant="outline-secondary"
                className="me-2"
                onClick={()=> {
                    setParent(prev => {
                        prev = prev.push(d);
                        return prev;
                    });
                    setD('');
                }}>
                Add Detail
            </Button>
        </Form.Group>
    );

};

/* props:
    itemType            from ["work", "proj", "extra"]
    nameLabel           string
    roleLabel           string
    locationLabel       string
    startDateLabel      Date()
    endDateLabel        Date() or null 
    */
let DynamicForm = ({itemType, nameLabel, roleLabel, 
                    locationLabel, startDateLabel, endDateLabel=null,
                    ancestor, setAncestor}) => {
    const [placeInput, setPlaceInput] = React.useState('');
    const [roleInput, setRoleInput] = React.useState('');
    const [locationInput, setLocationInput] = React.useState('');
    const [startDateField, setStartDateField] = React.useState(Date.now());
    const [endDateField, setEndDateField] = React.useState(null);


    const [endDateChecked, setEndDateChecked] = React.useState(true);
    let [tags, setTags] = React.useState('test tag');
    let [details, setDetails] = React.useState(Immutable.List());
    
    let optionalEndDateField = [];
    if (endDateLabel) {
        optionalEndDateField.push(
            <Form.Group className="mb-3" controlId="input-end-date">
                <Form.Label>{endDateLabel}: </Form.Label>
                <Form.Check 
                    type="checkbox" 
                    label="Currently working here" 
                    checked={endDateChecked}
                    onChange={()=>{
                        setEndDateChecked(!endDateChecked);
                        if (endDateChecked) {
                            setEndDateField(null);
                        }
                        }}/>
                <Form.Control
                    type="date"
                    value={endDateField}
                    disabled={endDateChecked}
                    onChange={(e)=>{
                        if (!endDateChecked) {
                            setEndDateField(e.target.value)};
                        }}/>
            </Form.Group> 
        );
    }

    let placeHolderStr =  {
        "work":{"name": "e.g. Mann Co.",
                "role": "e.g. Demoman",
                "location": "e.g. Mannhattan"},
        "proj":{"name": "e.g. Resume Customizer",
                "role": "e.g. Python, SQLAlchemy, React, Flask, etc.",
                "location": "e.g. github.com/sharonzhen/RESapp"},
        "extra":{"name": "e.g. Nook Inc.",
                "role": "e.g. volunteer",
                "location": "e.g. Resident Services Building"},
    };

    let onSubmit = (e) => {
        e.preventDefault();
        let deets = details.toJSON();
        console.log(deets);
        let formBody = {
            formType:itemType,
            name:placeInput,
            role:roleInput,
            location:locationInput,
            datefrom:startDateField,
            dateto:endDateField,
            details:deets
        };
        console.log(formBody);
        let postResponse = safePost("/resume/add", formBody);
        postResponse.then((data)=> {
            /* 
            data = {id: { name: name,
                          role: role,
                          location: location,
                          dates: dates,
                          details: {
                              id_1: detail_1,
                              id_2: detail_2 }}}
            */
            let immutableUpdate = Immutable.fromJS(data);
            // set ancestor to update values
            setAncestor(prev => {
                return prev.merge(immutableUpdate);
            });
        });
        // clear form
        setPlaceInput('');
        setRoleInput('');
        setLocationInput('');
        setStartDateField(Date.now());
        setEndDateField(null);
        setEndDateChecked(true);
        setDetails(Immutable.List());
    };


    return (
        <Form>
            <Form.Group className="mb-3" controlId="input-name">
                <Form.Label>{nameLabel}: </Form.Label>
                <Form.Control
                    type="text"
                    value={placeInput}
                    placeholder={placeHolderStr[itemType]["name"]}
                    onChange={(e)=>{setPlaceInput(e.target.value)}}/>                
            </Form.Group>
            <Form.Group className="mb-3" controlID="input-role">
            <Form.Label>{roleLabel}: </Form.Label>
                <Form.Control
                    type="text"
                    value={roleInput}
                    placeholder={placeHolderStr[itemType]["role"]}
                    onChange={(e)=>{setRoleInput(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlID="input-loc">
            <Form.Label>{locationLabel}: </Form.Label>
                <Form.Control
                    type="text"
                    value={locationInput}
                    placeholder={placeHolderStr[itemType]["location"]}
                    onChange={(e)=>{setLocationInput(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input-start-date">
                <Form.Label>{startDateLabel}: </Form.Label>
                <Form.Control
                    type="date"
                    value={startDateField}
                    onChange={(e)=>{setStartDateField(e.target.value)}}/>
            </Form.Group>
            {optionalEndDateField}
            <AddDetail id1="wd1" parent={details} setParent={setDetails}/>
            <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}>
                Save
            </Button>    
        </Form>        
    );
};


/* *************************************************** */
/* *************** no submit ************************* */
/* *************************************************** */

/* props: name */
let OCSkeleton = (props) => {
    const [showOC, setShowOC] = React.useState(false);
    const ocClose = () => setShowOC(false);
    const ocShow = () => setShowOC(true);

    
  return (
    <div>
        <Button variant="outline-primary" size="sm" onClick={ocShow} className="me-2">
            Add
        </Button>
        <Offcanvas show={showOC} onHide={ocClose} placement="end" scroll="true" backdrop="false">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add {props.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {props.children}
            </Offcanvas.Body>
        </Offcanvas>
    </div>
    );

}

/* props:   techSkills      => ancestor={techSkills} 
            setTechSkills   => setAncestor={setTechSkills}
            in <SkillsForm/> */
let TechField = ({techSkills, setTechSkills}) => {
    let pushList = [];
    for (let [key] of techSkills) {
        pushList.push(
                <ListGroup.Item action variant="light" eventKey={key}> 
                <div><b>{techSkills.getIn([key, 'name'])}</b>:</div> 
                <div>{techSkills.getIn([key, 'description'])}</div> 
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Technical Skills</h2>
                    <OCSkeleton name="Technical Skill">
                        <SkillsForm ancestor={techSkills} setAncestor={setTechSkills}/>
                    </OCSkeleton>
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
                    <OCSkeleton name="Education">
                        <EduForm ancestor={education} setAncestor={setEducation}/>
                    </OCSkeleton>
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
                <div><b>{coursework.getIn([key, 'name'])}</b>:</div> 
                <div>{coursework.getIn([key, 'description'])}</div> 
                </ListGroup.Item>
        );
    }
    
    return (
        <Card style={{ width: '36rem' }}>
            <Card.Body>
                <Card.Title>
                    <h2>Relevant Coursework</h2>
                    <OCSkeleton name="Coursework">
                        <CoursesForm ancestor={coursework} setAncestor={setCoursework}/>
                    </OCSkeleton>
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
                        <td>{projects.getIn([key, 'dates'])}</td>
                    </tr>
                    <tr>
                        <td>Technologies </td>
                        <td>{projects.getIn([key, 'role'])}</td>
                    </tr>
                    <tr>
                        <td>Link </td>
                        <td>{projects.getIn([key, 'location'])}</td>
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
                    <OCSkeleton name="Project">
                        <DynamicForm
                            itemType="proj"
                            nameLabel="Project Name"
                            roleLabel="Technologies Used"
                            locationLabel="Link"
                            startDateLabel="Approximate Date"
                            ancestor={projects}
                            setAncestor={setProjects}/>
                    </OCSkeleton>
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
                    <OCSkeleton name="Work Experience">
                        <DynamicForm
                            itemType="work"
                            nameLabel="Workplace"
                            roleLabel="Role"
                            locationLabel="Location"
                            startDateLabel="Start Date"
                            endDateLabel="End Date"
                            ancestor={work}
                            setAncestor={setWork}/>
                    </OCSkeleton>
                </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
        {pushList}
        </ListGroup>
        </Card>
    );
};

/* props: extras, setExtras */
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
                    <OCSkeleton name="Extracurricular Activity">
                        <DynamicForm
                            itemType="extra"
                            nameLabel="Organization"
                            roleLabel="Role"
                            locationLabel="Location"
                            startDateLabel="Start Date"
                            endDateLabel="End Date"
                            ancestor={extras}
                            setAncestor={setExtras}/>
                    </OCSkeleton>
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
            console.log("inside useEffect");
            console.log(data.work);
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