import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import React from 'react'
import Login from './components/Login';
import Orders from './components/Orders';
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
          <a class="navbar-brand" href="#">Admin panel</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#"><Link to="/products">Товары</Link></a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#"><Link to="/orders">Заказы</Link></a>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <span>{this.state.username}</span>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/"
          render={() => {
            return (
              localStorage.getItem("auth") ?
              <Redirect to="/orders" /> :
              <Redirect to="/login" /> 
            )
        }}
          />
          <Route path="/orders">
            <Orders/>
          </Route>
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
  localStorage.clear();
}

export default App;
