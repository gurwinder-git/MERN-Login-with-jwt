import React, {useEffect, useState}from 'react';
import {useHistory} from 'react-router-dom';
import '../css/contact.css'

function Contact() {
    const history = useHistory();
    let [userData, setUserData] = useState({});
    let [userMessage, setUserMessage] = useState({message: ""});
    let [errorMessage, setErrorMessage] = useState('');
    let [successMessage, setSuccessMessage] = useState('');

    async function getUserData(){
        // console.log("user data")
        try {
            let res = await fetch('/contact', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            })
            if(res.status === 200){
                let data = await res.json();
                setUserData(data);
                // console.log(data)
            }
            if(res.status === 401){
                history.push('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }

    function handleInput(e){
        setUserMessage({message: e.target.value});
    }

    async function postMessage(e) {
        e.preventDefault();
        // console.log('button clicked')
        try{
            let res = await fetch("/contact", {
                method: "POST",  
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userMessage),
                credentials: 'include'
            })
            
            let data = await res.json();
            if(res.status === 422){
                setErrorMessage(data.error);
                setSuccessMessage('');
                console.log(data);
            }
            if(res.status === 200){
                setErrorMessage('');
                setSuccessMessage(data.message);
                setUserMessage({message: ""});
                setTimeout(clearSuccessMessage, 3000);
            }
    
            console.log(data)
        }
        catch(err){
            // console.log(err.message)
        }
    }

    function clearSuccessMessage(){
        setSuccessMessage('');
    }

    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div id="contactDiv">
           <h2>Get in Touch</h2>
           <form method = "POST">
               <div>
                   <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value={userData.name} disabled="true"/>
                   </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={userData.email} disabled="true"/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name="phone" value={userData.phone} disabled="true"/>
                    </div>
               </div>

                <textarea name="message" cols="30" rows="10" value={userMessage.message} onChange={handleInput}></textarea>

                {errorMessage !== ''? 
                <ul className="errorMessage">
                    <li>{errorMessage}</li>
                </ul>: ''}

                {successMessage !== ''? 
                <ul className="successMessage">
                    <li>{successMessage}</li>
                </ul>: ''}
                
                <button onClick={postMessage}> Send Message </button>
            </form>
        </div>
    )
}

export default Contact
