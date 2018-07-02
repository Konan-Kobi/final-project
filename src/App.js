import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MainPage from './pages/MainPage';
import IssuePage from './pages/IssuePage';
import { UserProvider, UserConsumer } from './contexts/UserContext';
import DetailProjectPage from './pages/DetailProjectPage';
import './App.css';
// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CreateProjectPage from './pages/CreateProjectPage';
import CreateIssuePage from './pages/CreateIssuePage';

import { Dimmer, Loader } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route path="/join" component={JoinPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
          {localStorage.getItem('token') ? (
            <UserConsumer>
              {({ loading }) =>
                loading ? (
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                ) : (
                  <Switch>
                    <Route
                      path="/create-project"
                      component={CreateProjectPage}
                    />
                    <Route path="/create-issue" component={CreateIssuePage} />
                    <Route path="/join" component={JoinPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route exact path="/" component={MainPage} />
                    <Route
                      path="/project/:projectId/issue/:issueId"
                      component={IssuePage}
                    />
                    <Route
                      path="/project/:projectId"
                      component={DetailProjectPage}
                    />
                  </Switch>
                )
              }
            </UserConsumer>
          ) : (
            <Redirect to="/login" />
          )}
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
