import React, {useEffect, useState}from 'react';
import {useHistory} from 'react-router-dom';
import '../css/about.css';

function About() {
    const history = useHistory();
    let [userData, setUserData] = useState({})

    async function getUserData(){
        // console.log("user data")
        try {
            let res = await fetch('/about', {
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

    useEffect(() => {
        getUserData();
    }, [])
    return (<>
        <h2 id="heading">About Your</h2>
    
        <div id="aboutDiv">
        {Object.keys(userData).length !== 0?
        <>
            <div className="cols">
                <img src="https://picsum.photos/200/300" alt="avatar"/>
            </div>

            <div className="cols">
                <div id="bioDiv">
                    <h3>{userData.name}</h3>
                    <small>{userData.work}</small>
                </div>
                <div id="otherDetailesDiv">
                    <div className="row">
                        <div>
                            Id:
                        </div>
                        <div>
                        {userData._id}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            Email:
                        </div>
                        <div>
                        {userData.email}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            Phone:
                        </div>
                        <div>
                        {userData.phone}
                        </div>
                    </div>
                </div>
            </div>
        </>: 'Please Wait...'}
        </div>
        </>
    )
}

export default About
