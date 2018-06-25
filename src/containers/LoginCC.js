import React from "react";
import { UserConsumer } from "../contexts/UserContext";
import LoginForm from "../components/LoginForm";

export default class LoginCC extends React.Component {
  render() {
    if (localStorage.getItem("token")) {
      return <div>로그인 성공</div>;
    } else {
      return (
        <React.Fragment>
          <UserConsumer>
            {({ login }) => (
              <LoginForm
                onLogin={async (username, password) => {
                  await login(username, password);
                }}
              />
            )}
          </UserConsumer>
        </React.Fragment>
      );
    }
  }
}
