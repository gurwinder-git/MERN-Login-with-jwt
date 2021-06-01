import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../css/login.css';
import {UserContext} from '../App';

const starStyle = {
    color: "red"
}

function Login() {
    let history = useHistory();
    let [loginData, setLoginData] = useState({email: "", passwordHash: ""});
    let [errorMessage, setErrorMessage] = useState('');

    //use context
    let {state, dispatch, user, setUser} = useContext(UserContext);

    let name, value;
    function handleInput(e){
        name = e.target.name;
        value = e.target.value;
        setLoginData({...loginData, [name]: value});
    }

    async function loginUser(e){
        e.preventDefault();
        setErrorMessage('');
        try{
            let res = await fetch("/login", {
                method: "POST",  
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(loginData),
            })
            
            if(res.status === 400){
                let error = await res.json()
                setErrorMessage(error.error);
            }
            if(res.status === 200){
                let data = await res.json();
                dispatch({type: 'USER', payload: true})
                // console.log(state);
                setErrorMessage('');
                setUser(data);
                // console.log(user)
                history.push("/");
            }
        }
        catch(err){
            console.log(err.message)
        }
    }

    return (
        <div id="loginFormDiv">
            <h2>Login</h2>
            <form method = "POST">
                <label htmlFor="email">Email<span style={starStyle}>*</span></label>
                <input type="email" autoComplete="false" name="email" onChange = {handleInput}/>

                <label htmlFor="passwordHash">Password<span style={starStyle}>*</span></label>
                <input type="password" autoComplete="false" name="passwordHash" onChange = {handleInput}/>

                { errorMessage !== ''? <div id="errorMessageForLoginUser">
                    <ul>
                        <li>{errorMessage}</li>
                    </ul>
                </div>: ''}

                <button onClick = {loginUser}> Login </button>
            </form>
        </div>
    )
}

export default Login
