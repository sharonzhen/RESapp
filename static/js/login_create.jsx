'use strict';
class LoginForm extends React.Component {
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
        // handle login information here
        // change post request to here
    }
    render() {
        return (
        <form 
            id="login_form"
            action={this.props.action}
            method={this.props.method}
            onSubmit = {this.onSubmit}>
            <div> 
                <label for="login">Login: </label>
                <input 
                    name="login" 
                    type="text"
                    onChange={this.onChange}
                    required />
            </div>
            <div>
                <label for="pwd">Password: </label>
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
        );
    }

}



class CreateAccountForm extends React.Component {
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
        alert("in here");
        // post request handled here
    }
    render() { 
        return(
            <form 
                id="create_form"
                action={this.props.action}
                method={this.props.method}
                onSubmit = {this.onSubmit}>
                <div>
                    <div>
                        <label for="login_new">Username: </label>
                        <input 
                            type="text" 
                            name="login_new"
                            onChange={this.onChange}
                            required />
                    </div>
                    <div>
                        <label for="pwd_new">Password: </label>
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
                        <label for="first_name">First name: </label>
                        <input 
                            type="text" 
                            name="first_name" 
                            onChange={this.onChange}
                            required />
                        <label for="last_name">Last name: </label>
                        <input
                            type="text" 
                            name="last_name" 
                            onChange={this.onChange}
                            required />
                    </div>
                    <div>
                        <label for="location">Location: </label>
                        <input 
                            type="text" 
                            name="location" 
                            onChange={this.onChange}
                            required />
                    </div>
                    <div>
                        <label for="email">Email: </label>
                        <input 
                            type="text" 
                            name="email" 
                            onChange={this.onChange}
                            required />
                    </div>
                </div>
                <div>
                    <div>
                        <label for="phone">Phone: </label>
                        <input 
                            type="text" 
                            name="phone" 
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <label for="github">Github Username: </label>
                        <input 
                            type="text" 
                            name="github"
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <label for="linkedin">Linkedin URL: </label>
                        <input 
                            type="text" 
                            name="linkedin" 
                            onChange={this.onChange} />
                    </div>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        );  
    }

} 

ReactDOM.render(
    <LoginForm action="/login" method="POST"/>,
    document.getElementById('root_login')
);

ReactDOM.render(
    <CreateAccountForm action="/create" method="POST"/>,
    document.getElementById('root_create')
);
