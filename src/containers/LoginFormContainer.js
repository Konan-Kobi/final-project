import React from 'react';
import { UserConsumer } from '../contexts/UserContext';
import LoginForm from '../components/LoginForm';
import { Redirect } from 'react-router-dom';
export default class LoginContainer extends React.Component {
  state = {
    success: false,
    username: '',
    password: '',
  };
  onUpdateUsername = username => this.setState({ username });
  onUpdatePassword = password => this.setState({ password });
  render() {
    const { username, password, success } = this.state;
    if (!success) {
      return (
        <UserConsumer>
          {({ login }) => (
            <LoginForm
              username={username}
              password={password}
              onUsernameChange={this.onUpdateUsername}
              onPasswordChange={this.onUpdatePassword}
              login={async (username, password) => {
                try {
                  await login(username, password);
                  this.setState({
                    success: true,
                  });
                } catch (e) {
                  if (e.response && e.response.status === 400) {
                    alert('아이디와 비밀번호를 확인해 주세요.');
                  } else {
                    alert('네트워크 에러가 발생했습니다. 잠시 뒤 실행해주세요');
                  }
                }
              }}
            />
          )}
        </UserConsumer>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
