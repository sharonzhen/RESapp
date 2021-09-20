'use strict';
import { safeGet } from "./modules";
import { safePost } from "./modules";


let RenderChecked = ({parent, checked, setChecked}) => {

};



let GeneratePage = () => {
    const [tech, setTech] = React.useState(Immutable.Map()); 
    const [proj, setProj] = React.useState(Immutable.Map());
    const [edu, setEdu] = React.useState(Immutable.Map());
    const [course, setCourse] = React.useState(Immutable.Map());
    const [work, setWork] = React.useState(Immutable.Map());
    const [extra, setExtra] = React.useState(Immutable.Map());

    const [techChecked, setTechChecked] = React.useState(null);
    const [projChecked, setProjChecked] = React.useState(null);
    const [eduChecked, setEduChecked] = React.useState(null);
    const [courseChecked, setCourseChecked] = React.useState(null);
    const [workChecked, setWorkChecked] = React.useState(null);
    const [extraChecked, setExtraChecked] = React.useState(null);

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

    };
      
    return (
        <div>
            <RenderChecked 
                parent={tech} 
                checked={techChecked} 
                setChecked={setTechChecked}/>
            <Button 
                variant="outline-success"
                onClick={onSubmit}> Generate 
            </Button>
        </div>
    )

};

ReactDOM.render(<GeneratePage/>,
    document.getElementById('generate-root'));