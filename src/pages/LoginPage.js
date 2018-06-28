import React from 'react';
import LoginContainer from '../containers/LoginFormContainer';
// import { UserProvider } from '../contexts/UserContext'; // APP.js에서 UserProvider사용하고 있어서 수정함
import { Redirect } from 'react-router-dom';
export default class LoginPage extends React.Component {
  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/" />;
    } else {
      return <LoginContainer />;
    }
  }
}
