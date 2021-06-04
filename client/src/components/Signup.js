import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/signup.css'

const starStyle = {
    color: "red"
}

function Signup() {
    let history = useHistory();
    let [errorMessage, setErrorMessage] = useState('');
    let [disabled, setDisabled] = useState(false);
    let [btnValue, setBtnValue] = useState('Register');

    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        passwordHash: "",
        conformPassword: "",
    });

    let name, value;
    function handleInput(e){
        name = e.target.name;
        value = e.target.value;
        setData({...data, [name]: value});
    }

    async function postUser(e) {
        e.preventDefault();
        setErrorMessage('');
        setBtnValue('Please Wait...');
        setDisabled(true);
        try{
            let res = await fetch("/register", {
                method: "POST",  
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            })
            
            if(res.status === 422){
                let error = await res.json()
                setErrorMessage(error.error);
                setBtnValue('Register');
                setDisabled(false);
            }
            if(res.status === 201){
                setErrorMessage('');
                history.push("/login");
                setBtnValue('Register');
                setDisabled(false);
            }
            if(res.status === 500){
                let error = await res.json()
                // console.log(error)
                setErrorMessage(error.error);
                setBtnValue('Register');
                setDisabled(false);
            }
        }
        catch(err){
            console.log(err.message)
        }
    }
        
    return (
        <div id="signupFormDiv">
            <h2>User Registeration</h2>
            <form method = "POST">
                <label htmlFor="name">Full Name<span style={starStyle}>*</span></label>
                <input type="text" name="name" autoComplete="false" onChange={handleInput}/>

                <label htmlFor="email">Email<span style={starStyle}>*</span></label>
                <input type="email" name="email" autoComplete="false" onChange={handleInput}/>

                <label htmlFor="phone">Phone<span style={starStyle}>*</span></label>
                <input type="text" name="phone" autoComplete="false" onChange={handleInput}/>

                <label htmlFor="work">Work</label>
                <input type="text" name="work" autoComplete="false" onChange={handleInput}/>

                <label htmlFor="password">Password<span style={starStyle}>*</span></label>
                <input type="password" autoComplete="false" name="passwordHash" onChange={handleInput}/>

                <label htmlFor="conformPassword">Conform Password<span style={starStyle}>*</span></label>
                <input type="password" autoComplete="false" name="conformPassword" onChange={handleInput}/>

                {
                    errorMessage !== ''? <div id="errorMessageDiv">
                    <ul>
                        <li>{errorMessage}</li>
                    </ul>
                </div>: ''
                }
                
                <button onClick = {postUser} disabled={disabled}> {btnValue} </button>
            </form>
        </div>
    )
}

export default Signup
