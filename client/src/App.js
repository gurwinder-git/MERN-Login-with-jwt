import React, { createContext, useReducer, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';
import Footer from './components/Footer';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import './css/mobile.css';

let UserContext = createContext()



function App() {
  const initialState = null;

  // dispatch function will call reducer function
  function reducer(state, action) {
      if(action.type === 'USER'){
        // now it will ipdate the state
          return action.payload;
        }
      return state;
  }

  let [state, dispatch] = useReducer(reducer, initialState)

  function Routing(){
    return(
        state? 
          <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/about" component = {About}/>
            <Route exact path = "/contact" component = {Contact}/>
            <Route component = {ErrorPage}/>
          </Switch>:
          <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/signup" component = {Signup}/>
            <Route component = {ErrorPage}/>
          </Switch>
    )
  }
  const [user, setUser] = useState({});

  async function fetchUserData(){
    let res = await fetch('/userinfo', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
      },
      credentials: 'include'
  })
  if(res.status === 200){
    let userData = await res.json();
    // console.log(data);
    setUser(userData);
    dispatch({type: 'USER', payload: true});
  }
  if(res.status === 401){
    setUser({message: 'Please Login...'});
    dispatch({type: 'USER', payload: false});
  }
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  return (
    Object.keys(user).length === 0 ?
    'Wait a While...':
    <>
      <div className="app">
      <UserContext.Provider value={{state, dispatch, user, setUser}}>
        <Navbar/>
        <Routing/>
      </UserContext.Provider>
      </div>
      <Footer/>
    </>
  
  );
}



export default App;
export {UserContext};