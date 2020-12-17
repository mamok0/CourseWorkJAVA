import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import React from 'react'
import Login from './components/Login';
import Products from './components/Products';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      username: ""
    }
  }

  handleUserAuthentication(username){
    debugger
    this.state.username = username
  }

  render(){
    return (
      <Router>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">Панель администрирования</a>
        </nav>
        <Switch>
          <Route exact path="/"
          render={() => {
            return (
              sessionStorage.getItem("auth") == "true" ?
              <Redirect to="/products" /> :
              <Redirect to="/login" /> 
            )
        }}
          />
          <Route path="/products">
            <Products/>
          </Route>
          <Route path="/login">
            <Login handleAuth={(username) => this.handleUserAuthentication(username)}/>
          </Route>
        </Switch>
      </Router>
    );
  }
 
}

window.onbeforeunload = function() {
  sessionStorage.removeItem('auth')
}

export default App;
