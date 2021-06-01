import React, {useEffect, useState, useContext}from 'react';
import {UserContext} from '../App';


const homeStyle = {
textAlign: 'center',
margin: '4rem',
}

function Home() {
    // let [userName, setUserName] = useState({name: ''});
    // let [greet, setGreet] = useState('');
    let {user} = useContext(UserContext);

    // async function fetchUserName(){
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
    //         // console.log(res.status)
    //         let data;
    //         if(res.status === 200){
    //             data = await res.json();
    //             setUserName(data);
    //             setGreet('Welcome Back.');
    //             // console.log(data)
    //         }
    //         if(res.status === 401){
    //             setGreet('');
    //             setUserName({name: 'Unauthorized User'});
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
// console.log(user.name)
    
    return (
        <div style = {homeStyle}>
            {/* <p style={{textTransform: 'uppercase'}}>{greet === ''? '': greet }</p> */}
            <p style={{fontSize: 'xx-large'}}>{user.name !== undefined? user.name: 'Login Please...'}</p>
        </div>
    )
}

export default Home
