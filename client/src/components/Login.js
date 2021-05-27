import React from 'react';
import '../css/login.css';

function Login() {
    return (
        <div id="loginFormDiv">
            <h2>Login</h2>
            <form action="/login" method = "POST">
                <label htmlFor="email">Email:</label>
                <input type="email" name="name"/>

                <label htmlFor="password">Password:</label>
                <input type="password" name="password"/>

                <button type="submit"> Login </button>
            </form>
        </div>
    )
}

export default Login
