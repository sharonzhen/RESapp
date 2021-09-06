'use strict';
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            pwd: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
    }
    handleSubmit(event) {
        alert('login:' + this.state.login+'pwd'+this.state.pwd)
        event.preventDefault();
        // post request
        
    }
    render() {
        return (
        <form onSubmit = {this.handleSubmit}>
            <div> 
                <label for="login">
                Login: 
                </label>
                <input 
                    name="login" 
                    type="text"
                    onChange={this.handleChange}
                    required />
            </div>
            <div>
                <label for="pwd">
                    Password: 
                </label>
                <input 
                    name="pwd"
                    type="password"
                    onChange={this.handleChange}  
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
        super(props)

    }
    render() {
        
    }

} 

ReactDOM.render(
    <LoginForm />,
    document.getElementById('root')
);

