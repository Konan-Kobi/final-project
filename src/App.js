import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './App.css';
import { UserProvider } from './contexts/UserContext';

// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import JoinPage from './pages/JoinPage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
