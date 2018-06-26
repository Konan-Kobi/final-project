import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './App.css';
import { UserProvider } from './contexts/UserContext';

// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateProjectForm from './components/CreateProjectForm';
import CreateIssueForm from './components/CreateIssueForm';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route path="/create-project" component={CreateProjectForm} />
            <Route path="/create-issue" component={CreateIssueForm} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
