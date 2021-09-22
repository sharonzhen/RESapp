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
        <Form 
            id="login_form"
            action={this.props.action}
            method={this.props.method}
            onSubmit = {this.onSubmit}>
            <div> 
                <Form.Group className="mb-3">
                <Form.Label htmlFor="login">Login: </Form.Label>
                <Form.Control 
                    name="login" 
                    type="text"
                    onChange={this.onChange}
                    required />
                </Form.Group>
                
            </div>
            <div>
                <Form.Label htmlFor="pwd">Password: </Form.Label>
                <Form.Control 
                    name="pwd"
                    type="password"
                    onChange={this.onChange}  
                    required />
            </div>
            <div className="submit-button">
                <Button variant="primary" type="submit"> Submit </Button>
            </div>
        </Form>
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
                <h4>Account information:</h4>
            <Form 
                id="create_form"
                action={this.props.action}
                method={this.props.method}
                onSubmit = {this.onSubmit}>
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="login_new">New Login: </Form.Label>
                        <Form.Control 
                            type="text" 
                            name="login_new"
                            onChange={this.onChange}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pwd_new">Password: </Form.Label>
                        <Form.Control 
                            type="password" 
                            name="pwd_new"
                            onChange={this.onChange}
                            required />
                    </Form.Group>
                </div>
                <h4>Contact information:</h4>
                <div>    
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="first_name">First name: </Form.Label>
                        <Form.Control 
                            type="text" 
                            name="first_name" 
                            onChange={this.onChange}
                            required />
                        <Form.Label htmlFor="last_name">Last name: </Form.Label>
                        <Form.Control
                            type="text" 
                            name="last_name" 
                            onChange={this.onChange}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="location">Location: </Form.Label>
                        <Form.Control 
                            type="text" 
                            name="location" 
                            onChange={this.onChange}
                            required />
                            <Form.Text className="text-muted">
                changeable later
                </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email: </Form.Label>
                        <Form.Control 
                            type="text" 
                            name="email" 
                            onChange={this.onChange}
                            required />
                    </Form.Group>
                </div>
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="phone">Phone: </Form.Label>
                        <Form.Control 
                            type="text" 
                            name="phone" 
                            onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="github">Github.com/ </Form.Label>
                        <Form.Control 
                            type="text" 
                            name="github"
                            onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="linkedin">Linkedin.com/in/ </Form.Label>
                        <Form.Control 
                            type="text" 
                            name="linkedin" 
                            onChange={this.onChange} />
                    </Form.Group>
                </div>
                <div className="submit-button">
                <Button variant="primary" type="submit"> Submit </Button>
                </div>
            </Form>
            </Card>
        );  
    }

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

