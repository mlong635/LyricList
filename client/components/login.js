import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { submitLogin } from '../actions/actions';

class Login extends Component {

  onSubmit(props) {
    console.log("login submitted", props);
    this.props.submitLogin(props)
    .then((res) => {
      console.log("response received", res);
      if(res.payload.data==="Invalid Password"){
        alert("Invalid Password.  Please try again.");  // this is being depricated soon (Sept 2016), so need to come up with something better
      }
      else if(res.payload.data==="Invalid Username"){
        alert("Invalid Username.  Please try again.");
      }
      else {
        browserHistory.push('/user/'+res.payload.data._id);
      }
    })
  }

  onClick () {
    let guest = ({ username: 'guest', password: 'guest' });
    this.props.submitLogin(guest)
    .then((res) => {
      browserHistory.push('/user/'+res.payload.data._id);
    })
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

          <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/createaccount" className="btn btn-primary">Create an Account</Link>
          <p></p>
          <h4>- OR -</h4><p></p><p></p>
        <button onClick={this.onClick.bind(this)} className="btn btn-primary">Continue as Guest</button>
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

  if(values.password==="Invalid Password"){
    errors.password = "* Invalid Password";
  }

  return errors;
}

function mapStateToProps(state) {
  return { userProfile: state.userProfile };
}

export default reduxForm({
  form: 'Login',
  fields: ['username', 'password'],
  validate,
  mapStateToProps
}, null, { submitLogin })(Login);


// export default connect(mapStateToProps, { submitLogin })(Login);
