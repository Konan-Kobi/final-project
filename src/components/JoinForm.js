import React from "react";

export default class JoinForm extends React.Component {
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  handleLoginClick = async e => {
    const { onJoin } = this.props;
    onJoin(this.usernameRef.current.value, this.passwordRef.current.value);
  };

  render() {
    return (
      <React.Fragment>
        <h1>회원가입이 필요합니다.</h1>
        <form>
          <p>
            ID : <input type="text" ref={this.usernameRef} required />
          </p>
          <p>
            PW : <input type="password" ref={this.passwordRef} required />
          </p>
        </form>
        <button onClick={this.handleLoginClick}>회원가입 하기</button>
      </React.Fragment>
    );
  }
}
