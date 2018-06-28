import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import IssuePage from './pages/IssuePage';
import './App.css';
import { UserProvider } from './contexts/UserContext';

// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateProjectForm from './components/CreateProjectForm';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route path="/create-project" component={CreateProjectForm} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/" component={MainPage} />
            <Route
              path="/project/:projectId/issue/:issueId"
              component={IssuePage}
            />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
