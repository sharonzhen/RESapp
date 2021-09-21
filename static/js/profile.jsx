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
};


/* props: label, fname, lname, setFname, setLname 
    same as ContactField but for name
    <label> <fname> <lname> 
    setFname and setLname are callbacks
*/
let NameField = (props) => {
    const [showName, setShowName] = React.useState(false);
    const handleCloseName=() => setShowName(false);
    const handleShowName=() => setShowName(true);


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
        handleCloseName();
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
        <div>
        <ListGroup.Item action onClick={handleShowName}>
            {props.label} {props.fname} {props.lname}
        </ListGroup.Item>
        <Modal 
            show={showName}
            onHide={handleCloseName}
            keyboard={false}>
            <Modal.Header closeButton/>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>First Name: </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="new first name" 
                        onChange={(event)=>{onChange(event, "fname")}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>Last Name: </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="new last name" 
                        onChange={(event)=>{onChange(event)}}/>
                </Form.Group>
                <Button 
                    variant="primary"
                    type="submit"
                    onClick={onSubmit}>Update
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    
    </div>
    );

};


/*  props: label, field, callback
    i.e. "<Label> <field> "
    callback is setState function in parent
*/
let ContactField = (props) => {
    const [show, setShow] = React.useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        handleClose();
    };

    if (!props.callback) {
        return (
            <ListGroup.Item>
                {props.label} {props.field}
            </ListGroup.Item>

        );
    }

    return (
        <div>
            <ListGroup.Item action onClick={handleShow}>
            {props.label} {props.field}
            </ListGroup.Item>
        <Modal
            show={show}
            onHide={handleClose}
            keyboard={false}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="formname">
                        <Form.Label>{props.label} </Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={(e)=>{props.callback(e.target.value)}}/>
                    </Form.Group>
                    <Button 
                        variant="primary"
                        type="submit"
                        onClick={onSubmit}>Update
                    </Button>
                    </Form>
                </Modal.Body>
        </Modal>
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
        <div class="content">
            <Card style={{ width: '36rem' }}>
                <Card.Header><h2>Account Information</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                    Edit feature coming soon...
                    </Card.Text>
                    <ListGroup>
                    <ContactField 
                        label="Login: " 
                        field={login}/>
                    <ContactField 
                        label="Password: " 
                        field={password}/>
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card style={{ width: '36rem' }}>
            <Card.Header><h2>Contact Information</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        Click to edit
                    </Card.Text>
                </Card.Body>
                <ListGroup>
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
                        label="Linkedin: linkedin.com/in/ " 
                        field={linkedin}
                        callback={setLinkedin}/>
                </ListGroup>
            </Card>  
        </div>
    );
};


ReactDOM.render(
    <GeneratePage/>,
    document.getElementById('root')
);