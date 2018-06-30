import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import IssuePage from './pages/IssuePage';
import { UserProvider, UserConsumer } from './contexts/UserContext';
import DetailProjectPage from './pages/DetailProjectPage';
import './App.css';
// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateProjectForm from './components/CreateProjectForm';
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
                      component={CreateProjectForm}
                    />
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
