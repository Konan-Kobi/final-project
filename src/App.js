import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import { UserProvider } from './contexts/UserContext';

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
