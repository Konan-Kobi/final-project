import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MainPage from './pages/MainPage';
import IssuePage from './pages/IssuePage';
import { UserProvider } from './contexts/UserContext';
import DetailProjectPage from './pages/DetailProjectPage';
import './App.css';
// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateProjectPage from './pages/CreateProjectPage';
import CreateIssueForm from './components/CreateIssueForm';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route path="/create-project" component={CreateProjectPage} />
            <Route path="/create-issue" component={CreateIssueForm} />
            <Route path="/login" component={LoginPage} />
            <Route path="/join" component={JoinPage} />

            <Route exact path="/" component={MainPage} />
            <Route
              path="/project/:projectId/issue/:issueId"
              component={IssuePage}
            />
            <Route path="/project/:projectId" component={DetailProjectPage} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
