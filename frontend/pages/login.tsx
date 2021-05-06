import React from "react";
import LoginForm from "@components/LoginForm/LoginForm";
import initialize from "../src/utils/initialize";

class Login extends React.Component {
  static async getInitialProps(ctx: any) {
    initialize(ctx);
  }

  render() {
    return <LoginForm />;
  }
}
export default Login;
