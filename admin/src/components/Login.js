import '../App.css';
import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from "axios";

class Login extends React.Component {
  constructor(props){
    super(props)

    this.state={
      username: "",
      password: "",
      isAuthenticated: false,
      authError: false,
      passwordSaved: false
    }
  }

  login(){
    const user = this.state.username
    axios.post("http://localhost:8080/users", {username: this.state.username, password: this.state.password}).then((res)=> {
      this.setState({isAuthenticated: true})
      
      this.props.handleAuth(user)
      sessionStorage.setItem("auth", "true")
    }).catch(err => {
      
      if(err.response.status == 401){
        this.setState({authError: true})
      }
      else{
        console.log(err.response.status)
      }
    })
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handlePasswordSaveCheck = (e) => {
    this.setState({ passwordSaved: e.target.value });
  };


  render(){
    if(sessionStorage.getItem("auth") == "true"){
      return <Redirect to="/products"/>
    }
    
    return (
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-sm">
              <div class="form-group">
                <label for="exampleInputUsername">Логин</label>
                <input type="text" class="form-control" id="exampleInputUsername" placeholder="Введите логин" onChange={this.handleUsernameChange}/>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword">Пароль</label>
                <input type="password" class="form-control" id="exampleInputPassword" placeholder="Введите пароль" onChange={this.handlePasswordChange}/>
              </div>
              <button type="submit" class="btn btn-primary" onClick={() => this.login()}>Submit</button>
              {this.state.authError && <p class="text-danger">Логин или пароль неправильный</p>}
          </div>
      </div>
      </div>
    );
  }
 
}

export default Login;