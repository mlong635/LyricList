import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { submitLogin } from '../actions/actions';

class Login extends Component {

  onSubmit(props) {
    console.log("login submitted", props);
    // this.props.createSong(props)
    // .then(() => {
    //   alert('Song successfully saved!');
    // })
  }

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

          <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
            <label>Password</label>
            <input type="text" className="form-control" {...password}/>
            <div className="text-help">
              {password.touched ? password.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/createaccount" className="btn btn-primary">Create an Account</Link>
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
  form: 'Login',
  fields: ['username', 'password'],
  validate
}, null, { submitLogin })(Login);
