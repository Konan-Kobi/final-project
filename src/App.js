import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/login" component={LoginPage} />
      </BrowserRouter>
    );
  }
}

export default App;
