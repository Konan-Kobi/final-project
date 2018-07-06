import React from 'react';
import JoinContainer from './../containers/JoinFormContainer';
import { Redirect } from 'react-router-dom';

export default class JoinPage extends React.Component {
  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/" />;
    } else {
      return <JoinContainer />;
    }
  }
}
