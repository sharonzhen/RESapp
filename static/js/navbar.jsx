'use strict';
const NavLink = (props) => {
    return (
        <li>
            <a href={props.href}>{props.name}</a>
        </li>
    );
};


const NavBar = () => {
    return (
        <ul>
            <NavLink name="Home" href="/"/>
            <NavLink name="Profile" href="/profile"/>
            <NavLink name="Resume" href="/resume"/>
            <NavLink name="Generate" href="/generate"/>
            <NavLink name="Logout" href="/logout"/>
        </ul>
    );
};

ReactDOM.render(
    <NavBar/>,
    document.getElementById('navbar')
);