import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MainPage from './pages/MainPage';
import IssuePage from './pages/IssuePage';
import { UserProvider, UserConsumer } from './contexts/UserContext';
import DetailProjectPage from './pages/DetailProjectPage';
import './App.css';
// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateProjectPage from './pages/CreateProjectPage';
import CreateIssuePage from './pages/CreateIssuePage';

import { Container, Dimmer, Loader } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <UserConsumer>
            {({ loading }) =>
              loading ? (
                <Dimmer active inverted>
                  <Loader size="large">Loading</Loader>
                </Dimmer>
              ) : (
                <Container style={{ padding: '5em 0em' }}>
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
                </Container>
              )
            }
          </UserConsumer>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
