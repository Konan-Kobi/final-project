import React, { Component } from 'react';
// import LoginPage from "./pages/LoginPage";
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import { UserProvider } from './contexts/UserContext';
import CreateProjectForm from './components/CreateProjectForm';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <CreateProjectForm />
          {/* <LoginPage /> */}
          {/* <Route path="/login" component={LoginPage} /> */}
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
