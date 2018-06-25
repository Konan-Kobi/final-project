import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

import LoginPage from "./pages/LoginPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <LoginPage />
          {/* <Route path="join" component={JoinPage} />
          <Route path="login" component={LoginPage} /> */}
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
