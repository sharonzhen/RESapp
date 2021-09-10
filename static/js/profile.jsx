'use strict';
import { safeGet } from "./modules";
import { safePost } from "./modules";

/* things i need from get request:
    Login: contact.user.login 
    Password: contact.user.password 
    ---
    name: contact.first contact.last 
    location: contact.loc
    email: contact.email
    phone: contact.phone
    github: contact.github
    linkedin: contact.linkedin
*/

const labelDict = {
    'Name: ':'name',
    'Location: ':'loc',
    'Email: ':'email',
    'Phone: ':'phone',
    'Github handle: ':'github',
    'Linkedin URL: ':'linkedin'
}

/*  props: close, show, children
    hideModal is callback function from ContactField
*/

let Modal = (props) => {
    const isShown = props.show ? "modal display-block":"modal display-none";
    return (
        <div className = {isShown}>
            <section className="modal-main">
                <button type="button" onClick={props.close}>Close</button>
                {props.children}
            </section>
        </div>
    );
};


/* props: label, fname, lname, setFname, setLname 
    same as ContactField but for name
    <label> <fname> <lname> 
    setFname and setLname are callbacks
*/
let NameField = (props) => {
    let [modalState, setModalState] = React.useState(false)
    let showModal = () => {
        setModalState(true);
    };
    let hideModal = () => {
        setModalState(false);
    };

    let onSubmit = (event) => {
        event.preventDefault();
        let formBody = {
            field:"name",
            first:props.fname, // event.target.fnameEdit general js
            last:props.lname    // event.target.lnameEdit
        }
        console.log(formBody);
        let postResponse = safePost("/profile/edit", formBody);
        postResponse.then((data)=> {
            console.log(data);
        });

        
    };

    let onChange = (event, field) => { // handle both form inputs
        const target = event.target;
        const value = target.value;
        if (field=="fname") {
            props.setFname(value);
        } else {
            props.setLname(value);
        }
    }

    return (
        <div className="clickableDiv" onClick={showModal}>
            <Modal show={modalState} close={hideModal}>
            <form onSubmit = {onSubmit}>
                <div> 
                    Edit {props.label}
                    <label htmlFor="fnameEdit">First name: </label>
                    <input 
                        name="fnameEdit" 
                        type="text"
                        onChange={(event)=>{onChange(event, "fname")}}
                        required />
                    <label htmlFor="lnameEdit">Last name: </label>
                    <input 
                        name="lnameEdit" 
                        type="text"
                        onChange={onChange}
                        required />
                </div>
                <div>
                    <input type="submit" value="Update"/>
                </div>
            </form>
            </Modal>
            {props.label} {props.fname} {props.lname}
        </div>
    );

};


/*  props: label, field, callback
    i.e. "<Label> <field> "
    callback is setState function in parent
*/
let ContactField = (props) => {
    let [modalState, setModalState] = React.useState(false);

    let showModal = () => {
        setModalState(true);
    };
    let hideModal = () => {
        setModalState(false);
    };

    let onSubmit = (event) => {
        event.preventDefault(); // goes in here
        let formBody = {
            field:labelDict[props.label],
            value:props.field   // event.target.name
        };

        let postResponse = safePost("/profile/edit", formBody);
        postResponse.then((data)=> {
            console.log(data);
        });
    };

    let onChange = (event) => {
        const target = event.target;
        const value = target.value;
        props.callback(value);
    }

    if (!props.callback) {
        return (
            <div>{props.label} {props.field}</div>
        );
    }

    return (
        <div className="clickableDiv" onClick={showModal}>
            <Modal show={modalState} close={hideModal}>
            <form onSubmit = {onSubmit}>
                <div> 
                    <label htmlFor="formname">Edit {props.label} </label>
                    <input 
                        name="formname"
                        type="text"
                        onChange={(e)=>{props.callback(e.target.value)}}
                        required />
                </div>
                <div>
                    <input type="submit" value="Update"/>
                </div>
            </form>
            </Modal>
            {props.label} {props.field}
        </div>
    );
};


let GeneratePage = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [github, setGithub] = React.useState('');
    const [linkedin, setLinkedin] = React.useState('');

    
    React.useEffect(() => {
        let contactPromise = safeGet('/profile/api');
        contactPromise.then(data => {
            setLogin(data.login);
            setPassword(data.password);
            setFname(data.fname);
            setLname(data.lname);
            setLocation(data.location);
            setEmail(data.email);
            setPhone(data.phone);
            setGithub(data.github);
            setLinkedin(data.linkedin);
        });
        
    }, []);

    
    return (
        <div>
            <div>
                <h2>Account Information</h2>    
                <ul>
                    <ContactField 
                        label="Login: " 
                        field={login}/>
                    <ContactField 
                        label="Password: " 
                        field={password}/>
                </ul>
            </div>
            <div>
                <h2>Contact Information</h2>
                    <NameField
                        label="Name: "
                        fname={fname}
                        lname={lname}
                        setFname={setFname}
                        setLname={setLname}/>
                    <ContactField 
                        label="Location: " 
                        field={location}
                        callback={setLocation}/>
                    <ContactField 
                        label="Email: " 
                        field={email}
                        callback={setEmail}/>
                    <ContactField 
                        label="Phone: " 
                        field={phone}
                        callback={setPhone}/>
                    <ContactField 
                        label="Github handle: " 
                        field={github}
                        callback={setGithub}/>
                    <ContactField 
                        label="Linkedin URL: " 
                        field={linkedin}
                        callback={setLinkedin}/>
            </div>
        </div>
    );
};


ReactDOM.render(
    <GeneratePage/>,
    document.getElementById('root')
);