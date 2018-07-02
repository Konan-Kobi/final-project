import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import IssuePage from './pages/IssuePage';
import MainPage from './pages/MainPage';
import { UserProvider, UserConsumer } from './contexts/UserContext';
import DetailProjectPage from './pages/DetailProjectPage';
import './App.css';
// import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateProjectForm from './components/CreateProjectForm';

import { Container, Dimmer, Loader } from 'semantic-ui-react';
import JoinPage from './pages/JoinPage';

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
                <Switch>
                  <Route path="/create-project" component={CreateProjectForm} />
                  <Route path="/login" component={LoginPage} />
                  <Route
                    path="/project/:projectId/issue/:issueId"
                    component={IssuePage}
                  />
                  <Route
                    path="/project/:projectId"
                    component={DetailProjectPage}
                  />
                  <Route path="/myPage" component={MyPage} />
                  <Route path="/" exact component={MainPage} />
                  <Route path="/join" component={JoinPage} />
                </Switch>
              )
            }
          </UserConsumer>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
