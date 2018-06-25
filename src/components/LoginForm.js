import React from 'react';
import { Helmet } from 'react-helmet';

export default class LoginForm extends React.Component {
  static defualtProps = {
    username: '', // 아이디 입력 필드에 표시 될 값
    password: '', // 비밀번호 입력 필드에 표시될 값
    onUsernameChange: username => {}, // 아이디 입력 필드에 새로운 입력이 일어날 때 호출되는 함수
    onPasswordChange: password => {}, // 비밀번호 입력 필드에 새로운 입력이 일어날 때 호출되는 함수
  };
  render() {
    const {
      username,
      password,
      onUsernameChange,
      onPasswordChange,
      login,
    } = this.props;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <Helmet
          title="Login"
          meta={[
            {
              property: 'og:title',
              content: 'login',
            },
          ]}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={e => onUsernameChange(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
        />
        <button onClick={e => login(username, password)}>로그인</button>
      </React.Fragment>
    );
  }
}
