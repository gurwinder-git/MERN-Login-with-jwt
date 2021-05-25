import React from 'react';
import '../css/navbar.css';

function Navbar() {
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
    return (
        <>
        <div className="navbar">
           <h2 className = "logo">Win</h2>
           <ul className = "nav_links">
               {
                   navItems.map((item, index) =>
                    <a key = {index} href={item.link}><li>{item.button}</li></a>
                 )
               }
           </ul>
        </div>
        </>
    )
}

export default Navbar


