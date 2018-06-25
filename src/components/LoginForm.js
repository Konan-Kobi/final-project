import React from "react";

export default class Login extends React.Component {
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  handleLoginClick = async e => {
    const { onLogin } = this.props;
    onLogin(this.usernameRef.current.value, this.passwordRef.current.value);
  };

  render() {
    return (
      <React.Fragment>
        <h1>로그인이 필요합니다.</h1>
        <form>
          <p>
            ID : <input type="text" ref={this.usernameRef} required />
          </p>
          <p>
            PW : <input type="password" ref={this.passwordRef} required />
          </p>
        </form>
        <button onClick={this.handleLoginClick}>로그인 하기</button>
      </React.Fragment>
    );
  }
}
