import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "./APIManager";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    var SignUpData = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email_address: e.target.email_address.value.toLowerCase(),
      password: e.target.password.value,
    };

    var signUpInformation = await signUpUser(SignUpData);
    console.log(signUpInformation);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>First Name: </label>
          <input name="first_name"></input>
          <label>Last Name: </label>
          <input name="last_name"></input>
          <label>Email: </label>
          <input name="email_address"></input>
          <label>Password: </label>
          <input name="password"></input>
          <button>Submit</button>
        </form>

        <Link to="/">Sign In</Link>
      </div>
    );
  }
}
