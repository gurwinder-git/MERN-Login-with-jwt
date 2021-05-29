import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navbar.css';
const navItems = [
    {
        button: 'Home',
        link: '/'
    },
    {
        button: 'About',
        link: '/about'
    },
    {
        button: 'Contact',
        link: '/contact'
    },
    {
        button: 'Login',
        link: '/login'
    },
    {
        button: 'Sign Up',
        link: '/signup'
    }
];

function Navbar() {
    let [isClicked, setIsClicked] = useState(false);
    return (
        <>
        <div className="navbar">
           <h2 className = "logo">Win</h2>
           <ul className = "nav_links" style = {{transform: isClicked? "translatex(0%)": ""}}>
               {
                   navItems.map((item, index) =>
                    <NavLink exact key = {index} 
                    activeClassName = "active_class"
                    to={item.link}>
                        <li className = {item.link === '/signup'? "signup": ''}>{item.button}</li>
                    </NavLink>
                 )
               }
           </ul>
           <i onClick = {()=> {setIsClicked(!isClicked); console.log("click")}} className="fas fa-bars menu"></i>
        </div>
        </>
    )
}

export default Navbar


