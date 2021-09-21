'use strict';

class OldLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            pwd: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
    }
    onSubmit(event) {
        
    }
    render() {

        return (
            <Card className="existing-acc" style={{ width: '45rem' }}>
        <form 
            id="login_form"
            action={this.props.action}
            method={this.props.method}
            onSubmit = {this.onSubmit}>
            <div> 
                <label htmlFor="login">Login: </label>
                <input 
                    name="login" 
                    type="text"
                    onChange={this.onChange}
                    required />
            </div>
            <div>
                <label htmlFor="pwd">Password: </label>
                <input 
                    name="pwd"
                    type="password"
                    onChange={this.onChange}  
                    required />
            </div>
            <div>
                <input type="submit" value="Submit"/>
            </div>
        </form>
        </Card>
        ); 
    }

}



class OldCreateAccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // required
            login_new: '',
            pwd_new: '',
            first_name: '',
            last_name:'',
            location:'',
            email:'', 
            // not required
            phone:'',
            github:'',
            linkedin:''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
    }

    onSubmit(event) {
        // post request handled here
    }
    render() { 
        return(
            <Card className="new-acc" style={{ width: '45rem' }}>
            <Form 
                id="create_form"
                action={this.props.action}
                method={this.props.method}
                onSubmit = {this.onSubmit}>
                <div>
                    <div>
                        <label htmlFor="login_new">New Login: </label>
                        <input 
                            type="text" 
                            name="login_new"
                            onChange={this.onChange}
                            required />
                    </div>
                    <div>
                        <label htmlFor="pwd_new">Password: </label>
                        <input 
                            type="password" 
                            name="pwd_new"
                            onChange={this.onChange}
                            required />
                    </div>
                </div>
                Contact information on resume (changeable later)
                <div>    
                    <div>
                        <label htmlFor="first_name">First name: </label>
                        <input 
                            type="text" 
                            name="first_name" 
                            onChange={this.onChange}
                            required />
                        <label htmlFor="last_name">Last name: </label>
                        <input
                            type="text" 
                            name="last_name" 
                            onChange={this.onChange}
                            required />
                    </div>
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input 
                            type="text" 
                            name="location" 
                            onChange={this.onChange}
                            required />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="text" 
                            name="email" 
                            onChange={this.onChange}
                            required />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="phone">Phone: </label>
                        <input 
                            type="text" 
                            name="phone" 
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <label htmlFor="github">Github.com/ </label>
                        <input 
                            type="text" 
                            name="github"
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <label htmlFor="linkedin">Linkedin.com/in/ </label>
                        <input 
                            type="text" 
                            name="linkedin" 
                            onChange={this.onChange} />
                    </div>
                </div>
                <input type="submit" value="Submit"/>
            </Form>
            </Card>
        );  
    }

} 




let LoginForm = () => {
    const [username, setUsername] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    
    let onSubmit = (e) => {
        let formBody = {
            username: username,
            pwd: pwd
        };
        let postResponse = safePost("/login", formBody);
        postResponse.then((data) => {
            }
        );
        
    }
    return (
        <Card className="existing-acc" style={{ width: '48rem' }}>
            <Card.Body>
            <Card.Title>Login</Card.Title>
            <Card.Text>
                <Form>
                    <Form.Group className="mb-3" controlId="logon">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control 
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}} 
                            placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            value={pwd}
                            onChange={(e)=>{setPwd(e.target.value)}}
                            type="password" 
                            placeholder="Password" />
                    </Form.Group>
                </Form>
            </Card.Text>
            <Button 
                variant="outline-primary"
                onChange={onSubmit}>Login</Button>
            </Card.Body>
        </Card>
    );

};


let CreateAccountForm = () => {
    const [loginNew, setLoginNew] = React.useState('');
    const [pwdNew, setPwdNew] = React.useState('');
    const [first, setFirst] = React.useState('');
    const [last, setLast] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [github, setGithub] = React.useState('');
    const [linkedin, setLinkedin] = React.useState('');


    let onSubmit = (e) => {
        e.preventDefault();
        let formBody = {
            
        };
        // post request handled here
    }

    return (
        <Card className="new-acc" style={{ width: '48rem' }}>
            <Card.Body>
            <Card.Title>Create a New Account</Card.Title>
            <Card.Text>
            <p id="contact-info">Login information (not changeable!)</p> 
                <Form>
                    <Form.Group className="mb-3" controlId="newLogon">
                        <Form.Label>New username: </Form.Label>
                        <Form.Control 
                            value={loginNew}
                            onChange={(e)=>{setLoginNew(e.target.value)}} 
                            placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control 
                            value={pwdNew}
                            onChange={(e)=>{setPwdNew(e.target.value)}}
                            type="password" 
                            placeholder="Password" />
                    </Form.Group>
                </Form>
                <p id="contact-info">Contact information (changeable later)</p> 
                <Form>
                    <Form.Group className="mb-3" controlId="first">
                        <Form.Label>First name</Form.Label>
                        <Form.Control 
                            value={first}
                            onChange={(e)=>{setFirst(e.target.value)}}
                            placeholder="Jane" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="last">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            value={last}
                            onChange={(e)=>{setLast(e.target.value)}}
                            placeholder="Doe" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control 
                            value={location}
                            onChange={(e)=>{setLocation(e.target.value)}}
                            placeholder="Bay Area, CA" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            placeholder="boink@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control 
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                            placeholder="514-000-0000" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Github username</Form.Label>
                        <Form.Control 
                            value={github}
                            onChange={(e)=>{setGithub(e.target.value)}}
                            placeholder="sharonzhen" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Linkedin URL</Form.Label>
                        <Form.Control 
                            value={linkedin}
                            onChange={(e)=>{setLinkedin(e.target.value)}}
                            placeholder="linkedin.com/in/sharon-zhen/" />
                    </Form.Group>
                </Form>
            </Card.Text>
            <Button 
                variant="outline-primary"
                onChange={onSubmit}>Create Account</Button>
            </Card.Body>
        </Card>
    );

}
let GeneratePage = () => {
    const [tabKey, setTabKey] = React.useState('create');

    return (
      <Tabs fill
      activeKey={tabKey}
      onSelect={(k) => setTabKey(k)}
      className="mb-3">
        <Tab eventKey="create" title="Create Account">
            <OldCreateAccountForm action="/new-user" method="POST"/>
        </Tab>
        <Tab eventKey="login" title="Login to Existing Account">
            <OldLoginForm action="/login" method="POST"/>
        </Tab>
      </Tabs>
    );
}

ReactDOM.render(
    <GeneratePage/>, document.getElementById('login-root')
);

