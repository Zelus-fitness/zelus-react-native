import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logInUser } from "./APIManager";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    var logInData = {
      email_address: e.target.email_address.value.toLowerCase(),
      password: e.target.password.value,
    };

    var loginInformation = await logInUser(logInData);
    console.log(loginInformation);
    this.setState({
      token: loginInformation.token,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Email: </label>
          <input name="email_address"></input>
          <label>Password: </label>
          <input name="password"></input>
          <button>Submit</button>
        </form>

        <p>{this.state.token}</p>

        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
}
