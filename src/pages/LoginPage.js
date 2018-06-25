import React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import { Redirect } from 'react-router-dom';
export default class LoginPage extends React.Component {
  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/" />;
    } else {
      return <LoginFormContainer />;
    }
  }
}
