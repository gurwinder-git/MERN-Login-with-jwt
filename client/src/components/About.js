import React, {useEffect, useState, useContext}from 'react';
import {useHistory} from 'react-router-dom';
import '../css/about.css';
import {UserContext} from '../App';


function About() {
    const history = useHistory();
    let {user} = useContext(UserContext);

    let [userData, setUserData] = useState({})

    // async function getUserData(){
    //     // console.log("user data")
    //     try {
    //         let res = await fetch('/about', {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 "Content-Type": 'application/json'
    //             },
    //             credentials: 'include'
    //         })
    //         if(res.status === 200){
    //             let data = await res.json();
    //             setUserData(data);
    //             // console.log(data)
    //         }
    //         if(res.status === 401){
    //             history.push('/login');
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     getUserData();
    // }, [])
    return (<>
        <h2 id="heading">About Your</h2>
    
        <div id="aboutDiv">
       
            <div className="cols">
                <img src="https://picsum.photos/200/300" alt="avatar"/>
            </div>

            <div className="cols">
                <div id="bioDiv">
                    <h3>{user.name}</h3>
                    <small>{user.work}</small>
                </div>
                <div id="otherDetailesDiv">
                    <div className="row">
                        <div>
                            Id:
                        </div>
                        <div>
                        {user._id}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            Email:
                        </div>
                        <div>
                        {user.email}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            Phone:
                        </div>
                        <div>
                        {user.phone}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default About
