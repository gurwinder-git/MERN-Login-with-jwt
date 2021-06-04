import React, {useEffect, useState, useContext}from 'react';
import {useHistory} from 'react-router-dom';
import '../css/about.css';
import {UserContext} from '../App';
import axios from 'axios';


function About() {
    // const history = useHistory();
    let {user, setUser} = useContext(UserContext);
    console.log(user)
    // let [profilePic, steProfilePic] = useState(user.avatarDetails.serverPath);
    const [disabled, setDisabled] = useState(false);
    const [btnValue, setBtnValue] = useState('Upload');
    const [uploadError, setuploadError] = useState('');
    // let [userData, setUserData] = useState({})

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
    let [avatar, setAvatar] = useState('');
    async function uploadAvatar(e){
        // console.log(avatar.size);
        setuploadError('');
        if(!avatar){
            setuploadError('Please select File.');
            return false;
        }
        
        if(avatar.size > 2097152){
            setuploadError('Maximum File Size 2MB.');
            return false;
        }
        setBtnValue('Please Wait...');
        setDisabled(true);
        let fd = new FormData();
        fd.append('avatar', avatar);
        let res = await axios.post('/uploadImage', fd);
        // console.log(res)
        setUser({...user, serverPath: res.data.dest});
        setBtnValue('Upload');
        setDisabled(false);
        setAvatar('')
        // console.log('user after midification:', user);
    }
    return (<>
        <h2 id="heading">Profile</h2>
    
        <div id="aboutDiv">
       
            <div className="cols dp">
                <img src={user.serverPath? user.serverPath: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt="avatar"/>
                <h4>Change Profile</h4>
                <input type="file" name="avatar" id="avatar" onChange={(e)=>setAvatar(e.target.files[0])}/>
                <small>{uploadError}</small>
                <button onClick={uploadAvatar} disabled={disabled}>{btnValue}</button>
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
