import React from "react";
import pmAPI from "../pmAPI";

const { Provider, Consumer } = React.createContext();

class UserProvider extends React.Component {
  join = async (username, password) => {
    try {
      await pmAPI.post("users/register", {
        username: username,
        password: password
      });
      alert("회원가입이 완료되었습니다.");
    } catch (e) {
      if (e.response) {
        if (e.response.status >= 500) {
          alert("서버에 이상이 생겼습니다. 잠시 후에 다시 시도부탁드립니다.");
        } else if (e.response.status === 400) {
          alert("아이디가 중복되었습니다. 다시 입력부탁드립니다.");
        }
      }
    }
  };

  login = async (username, password) => {
    try {
      const res = await pmAPI.post("users/login", {
        username: username,
        password: password
      });
      localStorage.setItem("token", res.data.token);
      this.props.onLogin();
    } catch (e) {
      if (e.response) {
        if (e.response.status === 400) {
          alert("아이디와 비밀번호를 다시 확인해주십시요");
        }
      }
      window.location.reload();
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  render() {
    const value = {
      join: this.join,
      login: this.login,
      logout: this.logout
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
