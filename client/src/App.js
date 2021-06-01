import React, { createContext, useReducer } from 'react';
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

function Routing(){
  return(
    <Switch>
        <Route exact path = "/" component = {Home}/>
        <Route exact path = "/about" component = {About}/>
        <Route exact path = "/contact" component = {Contact}/>
        <Route exact path = "/login" component = {Login}/>
        <Route exact path = "/signup" component = {Signup}/>
        <Route component = {ErrorPage}/>
      </Switch>
  )
}

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

  const [state, dispatch] = useReducer(reducer, initialState)
  // const [isLogedIn, setIsLogedIn] = useState(false)

  return (<>
    <div className="app">
    <UserContext.Provider value={{state, dispatch}}>
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