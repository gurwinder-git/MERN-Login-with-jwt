import React from 'react';
import '../css/signup.css'

function Signup() {
    return (
        <div id="signupFormDiv">
            <h2>User Registeration</h2>
            <form action="/signup" method = "POST">
                <label htmlFor="name">Full Name:</label>
                <input type="text" name="name"/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email"/>

                <label htmlFor="phone">Phone:</label>
                <input type="text" name="phone"/>

                <label htmlFor="work">Work:</label>
                <input type="text" name="work"/>

                <label htmlFor="password">Password:</label>
                <input type="password" name="password"/>

                <label htmlFor="conformPassword">Conform Password:</label>
                <input type="password" name="conformPassword"/>

                <button type="submit"> Register </button>
            </form>
        </div>
    )
}

export default Signup
