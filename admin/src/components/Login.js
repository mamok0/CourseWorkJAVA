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
    axios.post("http://localhost:8080/users", {username: this.state.username, password: this.state.password}).then((res)=> {
      if(res.status == 200){
        this.setState({isAuthenticated: true})
        localStorage.setItem("auth", true)
        this.props.handleAuth(this.state.username)
      }
      else{
        this.setState({authError: true})
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
    if(this.state.isAuthenticated){
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
          </div>
      </div>
      </div>
    );
  }
 
}

export default Login;