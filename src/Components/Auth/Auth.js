import React, { Component } from 'react';
import { Formik } from 'formik';
import './Auth.css';
import { auth } from '../../redux/AuthActionCreators';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';

const mapStateToProps = state => {
  return {
    authLoading: state.authLoading,
    authFailedMsg: state.authFailedMsg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode))
  }
}

class Auth extends Component {
  state = {
    mode: "Sign Up"
  }
  switchModeHandle = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
    })
  }
  render() {
    let error = null;
    if (this.props.authFailedMsg !== null) {
      error = (<Alert color='danger'>{this.props.authFailedMsg}</Alert>)
    }
    let form = null;
    if (this.props.authLoading) {
      form = (<Spinner />)
    } else {
      form = (
        <Formik
          initialValues={
            {
              email: "",
              password: "",
              passwordConfirm: ""
            }
          }
          onSubmit={
            (values) => {
              this.props.auth(values.email, values.password, this.state.mode)
            }
          }
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required *"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "Invalid Email!"
            }
            if (!values.password) {
              errors.password = "Required *"
            } else if (values.password.length < 6) {
              errors.password = "Must be at least 6 characters!"
            }
            if (this.state.mode === "Sign Up") {
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Required *"
              } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "Password doesn't match!"
              }
            }
            return errors;
          }}
        >
          {
            ({ values, handleChange, handleSubmit, errors }) => (
              <div>

                <button
                  className='SwitchButton'
                  onClick={this.switchModeHandle}
                >
                  Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
                </button>

                <form onSubmit={handleSubmit}>
                  <span style={{ color: "red" }}>{errors.email}</span>
                  <input
                    name='email'
                    placeholder='example@gmail.com'
                    className='form-control'
                    value={values.email}
                    onChange={handleChange}
                  />
                  <br />
                  <span style={{ color: "red" }}>{errors.password}</span>
                  <input
                    name='password'
                    placeholder='Enter Your Password'
                    className='form-control'
                    value={values.password}
                    onChange={handleChange}
                  />
                  <br />
                  {this.state.mode === "Sign Up" ? <div>
                    <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                    <input
                      name='passwordConfirm'
                      placeholder='Confirm Your Password'
                      className='form-control'
                      value={values.passwordConfirm}
                      onChange={handleChange}
                    />
                    <br />
                  </div> : null}
                  <button type='submit' className='btn btn-success'>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                </form>
              </div>
            )
          }
        </Formik>
      )
    }
    return (
      <div style={{
        border: "1px solid grey",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "1px 5px 5px 5px grey",
        width: "50%",
        margin: "0 auto"
      }}>
        {error}
        {form}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);