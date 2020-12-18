import React from 'react'
import Products from './components/Products';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">SafePlace</a>
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item shop-cart">
                <span><span class="material-icons header-icon">business</span>ул. Школьная, д.15</span><br/>
                <span><span class="material-icons header-icon">call</span>+3753460922</span>
              </li>
            </ul>
          </nav>
          <div className="container">
            <Products/>
          </div>
          <div className="footer text-center">
            SafePlace @2019-2020
          </div>
        </div>
    );
  }
 
}

export default App;
