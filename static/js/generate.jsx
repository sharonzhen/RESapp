'use strict';
import { safeGet } from "./modules";
import { safePost } from "./modules";
import { safeDownload } from "./modules";


let RenderChecked = ({itemType, parent, checkedList, setChecked, checkedDetails, setCheckedDetails}) => {
    let TYPEDICT = {
        course:"Relevant Coursework",
        edu:"Education",
        work:"Work Experience",
        proj:"Technical Projects",
        tech:"Technical Skills",
        extra:"Extracurriculars"
    }


    let ItemLabel = ({ID}) => {
        let detailList = [];
        if (itemType == "work" || itemType == "proj" || itemType == "extra") {
            for (let [dkey] of parent.getIn([ID, 'details'])) {
                let detailID = `det${dkey}`;
                detailList.push(
                <ListGroup horizontal>
                    <ListGroup.Item>
                    <Form.Check
                        type="switch"
                        id={detailID}
                        checked={checkedDetails.has(dkey)}
                        onChange={()=> {
                            if (checkedDetails.has(dkey)) {
                                setCheckedDetails(prev => {
                                    return prev.delete(dkey);
                                })
                            } else {
                                setCheckedDetails(prev => {
                                    return prev.add(dkey);
                                })
                            }
                        }}
                    />
                    </ListGroup.Item>
                    <ListGroup.Item className="detail-overwrites" eventKey={dkey}>
                        {parent.getIn([ID, 'details', dkey])}
                    </ListGroup.Item>
                </ListGroup>

                );
            }
    
        }



        if (itemType == "tech" || itemType == "course") {
            return (
                <ListGroup.Item className="item-overwrites" eventKey={ID}> 
                <div><b>{parent.getIn([ID, 'name'])}</b>:</div> 
                <div>{parent.getIn([ID, 'description'])}</div> 
                </ListGroup.Item>
            );
        }
        else if (itemType == "edu") {
            return (
                <ListGroup.Item className="item-overwrites" eventKey={ID}> 
                <div><h4>{parent.getIn([ID, 'name'])}</h4></div> 
                <div><i>{parent.getIn([ID, 'description'])}</i></div>
                <div>{parent.getIn([ID, 'location'])}</div><div>Graduated {parent.getIn([ID, 'dates'])}</div> 
                </ListGroup.Item>
            );
        } else if (itemType == "proj") {            
            return (
                    <ListGroup.Item className="item-overwrites" eventKey={ID}> 
                    <div><h4>{parent.getIn([ID, 'name'])}</h4></div>
                    <Table responsive="sm">
                        <tr>
                            <td>Date: </td><td> {parent.getIn([ID, 'dates'])}</td>
                        </tr>
                        <tr>
                            <td>Technologies:</td><td> {parent.getIn([ID, 'role'])}</td>
                        </tr>
                        <tr>
                            <td>Link: </td><td>{parent.getIn([ID, 'location'])}</td>
                        </tr>
                    </Table>
                    <div>Details:
                        <ListGroup as="ul">
                            {detailList} 
                        </ListGroup>
                    </div>
                    </ListGroup.Item>
            );
        } else if (itemType == "work") {
            return (
                    <ListGroup.Item className="item-overwrites" eventKey={ID}> 
                    <div><h4>{parent.getIn([ID, 'name'])}</h4></div>
                    <Table responsive="sm">
                        <tr>
                            <td>Date: </td><td> {parent.getIn([ID, 'dates'])}</td>
                        </tr>
                        <tr>
                            <td>Role: </td><td> {parent.getIn([ID, 'role'])}</td>
                        </tr>
                        <tr>
                            <td>Location: </td><td> {parent.getIn([ID, 'location'])}</td>
                        </tr>
                    </Table>
                    <div>Details:
                        <ListGroup as="ul">
                            {detailList} 
                        </ListGroup>
                    </div>
                    </ListGroup.Item>
            );
        } else {
            return (
                    <ListGroup.Item className="item-overwrites" eventKey={ID}> 
                    <div><h4>{parent.getIn([ID, 'name'])}</h4></div>
                    <Table responsive="sm">
                        <tr>
                            <td>Date: </td><td>{parent.getIn([ID, 'dates'])}</td>
                        </tr>
                        <tr>
                            <td>Role: </td><td>{parent.getIn([ID, 'role'])}</td>
                        </tr>
                        <tr>
                            <td>Location: </td><td>{parent.getIn([ID, 'location'])}</td>
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
    };

    let SelectButton = ({ID}) => {
        return (
            <ListGroup.Item>
                <Form.Check
                    type="switch"
                    id={ID}
                    checked={checkedList.get(ID)}
                    onChange={()=> {
                        setChecked(prev=> {
                            //console.log(checkedList);
                            return prev.set(ID, !prev.get(ID));
                        })
                    }}
                />
            </ListGroup.Item>
        );
    };

    
    let pushList = [];
    for (let [key] of parent) {
        pushList.push(
            <ListGroup horizontal>
                <SelectButton ID={key}/>
                <ItemLabel ID={key}/>
            </ListGroup>
        )
    } 

    return (
        <Form.Group>
            <h2>{TYPEDICT[itemType]}</h2>
            {pushList}
        </Form.Group>
    );

};



let GeneratePage = () => {
    const [tech, setTech] = React.useState(Immutable.Map()); 
    const [proj, setProj] = React.useState(Immutable.Map());
    const [edu, setEdu] = React.useState(Immutable.Map());
    const [course, setCourse] = React.useState(Immutable.Map());
    const [work, setWork] = React.useState(Immutable.Map());
    const [extra, setExtra] = React.useState(Immutable.Map());

    const [techChecked, setTechChecked] = React.useState(tech.map(x=>false));
    const [projChecked, setProjChecked] = React.useState(proj.map(x=>false));
    const [eduChecked, setEduChecked] = React.useState(edu.map(x=>false));
    const [courseChecked, setCourseChecked] = React.useState(course.map(x=>false));
    const [workChecked, setWorkChecked] = React.useState(work.map(x=>false));
    const [extraChecked, setExtraChecked] = React.useState(extra.map(x=>false));
    const [detailChecked, setDetailChecked] = React.useState(Immutable.Set());

    const [selectAll, setSelectAll] = React.useState(false);

    React.useEffect(()=> {
        let resumePromise = safeGet('/resume/api');
        resumePromise.then(data => {
            let eduData = Immutable.fromJS(data.edu);
            let techData = Immutable.fromJS(data.tech);
            let courseData = Immutable.fromJS(data.course);
            let workData = Immutable.fromJS(data.work);
            let projData = Immutable.fromJS(data.proj);
            let extraData = Immutable.fromJS(data.extra);

            setTech(techData);
            setEdu(eduData);
            setCourse(courseData);
            setProj(projData);
            setWork(workData);
            setExtra(extraData);

            setTechChecked(techData.map(x=>false));
            setProjChecked(projData.map(x=>false));
            setEduChecked(eduData.map(x=>false));
            setCourseChecked(courseData.map(x=>false));
            setWorkChecked(workData.map(x=>false));
            setExtraChecked(extraData.map(x=>false));
            
        });

    }, []);



    let onSubmit = (e) => {
        e.preventDefault();
        let techJS = techChecked.toJS();
        let projJS = projChecked.toJS();
        let workJS = workChecked.toJS();
        let eduJS = eduChecked.toJS();
        let courseJS = courseChecked.toJS();
        let extraJS = extraChecked.toJS();
        let detailJS = detailChecked.toJS();
        let formBody = {
            tech: techJS,
            proj: projJS,
            work: workJS,
            edu: eduJS,
            course: courseJS,
            extra: extraJS,
            detail: detailJS
        }

        let postResponse = fetch(
            "/generation/files",
            {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formBody)

            });
            postResponse.then(res => res.blob()).then(blob => {
                console.log(blob);
                const url = window.URL.createObjectURL(blob);
                console.log(url);
                const a = document.createElement('a');
                a.href = url;
                a.download = "resume.pdf";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
        // let postResponse = safePost("/generation/files", formBody);
        // postResponse.then(data => {
        //     if (data.path) {
        //         let getResponse = safeDownload("/generation/files/resume.pdf");
        //         getResponse.then(blob => {
        //             const url = window.URL.createObjectURL(blob);
        //             console.log(url);
        //             const a = document.createElement('a');
        //             a.href = url;
        //             a.download = "resume.pdf";
        //             document.body.appendChild(a);
        //             a.click();
        //             document.body.removeChild(a);
        //             window.URL.revokeObjectURL(url);
        //         });
        //     }
        // });


        setTechChecked(tech.map(x=>false));
        setProjChecked(proj.map(x=>false));
        setEduChecked(edu.map(x=>false));
        setCourseChecked(course.map(x=>false));
        setWorkChecked(work.map(x=>false));
        setExtraChecked(extra.map(x=>false));
        setDetailChecked(Immutable.Set());

    };



    return (
        <div id="form-container">
            <RenderChecked 
                itemType="tech"
                parent={tech} 
                checkedList={techChecked} 
                setChecked={setTechChecked}/>
            <RenderChecked 
                itemType="proj"
                parent={proj} 
                checkedList={projChecked} 
                setChecked={setProjChecked}
                checkedDetails={detailChecked}
                setCheckedDetails={setDetailChecked}/>
            <RenderChecked 
                itemType="work"
                parent={work} 
                checkedList={workChecked} 
                setChecked={setWorkChecked}
                checkedDetails={detailChecked}
                setCheckedDetails={setDetailChecked}/>
            <RenderChecked 
                itemType="edu"
                parent={edu} 
                checkedList={eduChecked} 
                setChecked={setEduChecked}/>
            <RenderChecked 
                itemType="course"
                parent={course} 
                checkedList={courseChecked} 
                setChecked={setCourseChecked}/>
            <RenderChecked 
                itemType="extra"
                parent={extra} 
                checkedList={extraChecked} 
                setChecked={setExtraChecked}
                checkedDetails={detailChecked}
                setCheckedDetails={setDetailChecked}/>
            <Button 
                variant="outline-success"
                onClick={onSubmit}> Generate 
            </Button>
        </div>
    )

};

ReactDOM.render(<GeneratePage/>,
    document.getElementById('generate-root'));