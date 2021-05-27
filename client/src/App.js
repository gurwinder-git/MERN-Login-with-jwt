import React from 'react';
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
import './css/mobile.css'

function App() {
  return (<>
    <div className="app">
      <Navbar/>
      <Switch>
        <Route exact path = "/" component = {Home}/>
        <Route exact path = "/about" component = {About}/>
        <Route exact path = "/contact" component = {Contact}/>
        <Route exact path = "/login" component = {Login}/>
        <Route exact path = "/signup" component = {Signup}/>
        <Route component = {ErrorPage}/>
      </Switch>
    </div>
    <Footer/>
    </>
  );
}

export default App;
