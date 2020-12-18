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

  handleUserAuthentication = (username) => {
    
    this.setState({username: username})
  }

  render(){
    return (
      <Router>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">Панель администрирования</a>
          <ul class="navbar-nav mr-auto">
            </ul>
            {this.state.username !== "" && (
              <ul class="navbar-nav">
              <li class="nav-item shop-cart">
                <span style={{color: "#fff"}}>{this.state.username}</span>
              </li>
            </ul>
            )}
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
            <Login handleAuth={this.handleUserAuthentication}/>
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
