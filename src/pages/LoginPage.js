import React from 'react';
import LoginContainer from '../containers/LoginFormContainer';
import { UserProvider } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';
export default class LoginPage extends React.Component {
  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/" />;
    } else {
      return (
        <UserProvider>
          <LoginContainer />
        </UserProvider>
      );
    }
  }
}
