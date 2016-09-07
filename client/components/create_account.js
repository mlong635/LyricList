import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { submitCreateAccount, createUserProfile } from '../actions/actions';

class CreateAccount extends Component {

  onSubmit(props) {
    console.log("createAccount submitted", props);
    // this.props.submitCreateAccount(props)
    this.props.createUserProfile(props)

    .then(() => {
      alert("Your account has been created, "+ props.username +"! Please login with your new username and password!");
    })
    .then(() => {
      // redirect to index
      browserHistory.push('/')
    })
  }

  render() {

    const { fields: { username, password }, handleSubmit } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h2>Create New Account</h2>
          <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}`}>
            <label>Username</label>
            <input type="text" className="form-control" {...username}/>
            <div className="text-help">
              {username.touched ? username.error : ''}
            </div>
          </div>

          <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
            <label>Password</label>
            <input type="text" className="form-control" {...password}/>
            <div className="text-help">
              {password.touched ? password.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit Username and Password</button>
          <Link to="/login" className="btn btn-primary">Already Have an Account?</Link>
            <p></p>
            <h4>- OR -</h4><p></p><p></p>
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
  form: 'CreateAccount',
  fields: ['username', 'password'],
  validate
}, null, { submitCreateAccount, createUserProfile })(CreateAccount);
