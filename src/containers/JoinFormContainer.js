import React from "react";
import { UserConsumer } from "../contexts/UserContext";
import JoinForm from "../components/JoinForm";

export default class JoinContainer extends React.Component {
  render() {
    return (
      <UserConsumer>
        {({ join }) => (
          <JoinForm
            onJoin={async (username, password) => {
              await join(username, password);
            }}
          />
        )}
      </UserConsumer>
    );
  }
}
