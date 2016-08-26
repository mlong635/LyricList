import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Login extends Component {

  render() {

    const { fields: { username, password }, handleSubmit } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h2>Login</h2>
          <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}`}>
            <label>Username</label>
            <input type="text" className="form-control" {...username}/>
            <div className="text-help">
              {username.touched ? username.error : ''}
            </div>
          </div>

            <div>
              <label for="username">Username:</label>
              <input id="username" type="text" name="username">
            </div>
            <div>
              <label for="password">Password:</label>
              <input id="password" type="password" name="password">
            </div>
            <div>
              <input type="submit" value="Login">
            </div>
            <p>
          <Link to="/createaccount" className="btn btn-primary">Create an Account</Link>
            <p>
            <h4>- OR -</h4>
          <button className="btn btn-primary">Continue as Guest</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.username){
    errors.username = "* Username Required"
  }

  if(!values.password){
    errors.password = "* Password Required"
  }
  return errors;
}

export default reduxForm({
  form: 'Login',
  fields: ['username', 'password'],
  validate
}, null, { createSong })(Login);
