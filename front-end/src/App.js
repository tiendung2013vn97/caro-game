import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board/Board';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './Account/SignIn/container-signIn';
import SignUp from './Account/SignUp/container-signUp';
import Home from './Home/container-home';
import Notify from './Notify/container-notify'
import 'antd/dist/antd.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Notify/>
          <Home />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
