import React, { useContext, useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import '../css/navbar.css';
import {UserContext} from '../App';


function Navbar() {
    let {state, dispatch, setUser} = useContext(UserContext);
    // console.log(state)
    let history = useHistory();

    function logoutUser(){
        if(window.confirm('Are you sure?')){
            fetch('/logout', {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            }).then(res => {if(res.status === 200){ 
                dispatch({type: 'USER', payload: false});
                setUser({message: 'Please Login...'});
                history.push('/login');
    
            }})
            .catch(err => console.log(err))
        }
    }

    let [isClicked, setIsClicked] = useState(false);
    
    return (
        <>
        <div className="navbar">
           <h2 className = "logo">Win</h2>
           <ul className = "nav_links" style = {{transform: isClicked? "translatex(0%)": ""}}>
               {
                   state? 
                <>
                   <NavLink exact activeClassName = "active_class" to='/'>
                        <li>Home</li>
                    </NavLink>

                    <NavLink exact activeClassName = "active_class" to='/about'>
                        <li>Profile</li>
                    </NavLink>

                    <NavLink exact activeClassName = "active_class" to='/contact'>
                        <li>Contact Us</li>
                    </NavLink>
                    <a onClick={logoutUser} style={{cursor: 'pointer'}}><li>Logout</li></a>
                    
                </>:
                <>   
                    <NavLink exact activeClassName = "active_class" to='/'>
                        <li>Home</li>
                    </NavLink>

                    <NavLink exact activeClassName = "active_class" to='/login'>
                        <li>Login</li>
                    </NavLink>

                    <NavLink exact activeClassName = "active_class" to='/signup'>
                        <li>Sign Up</li>
                    </NavLink>
                </>
               }
           </ul>
           <i onClick = {()=> {setIsClicked(!isClicked); console.log("click")}} className="fas fa-bars menu"></i>
        </div>
        </>
    )
}

export default Navbar


