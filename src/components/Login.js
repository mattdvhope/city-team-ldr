import React from "react";
import { Redirect } from "react-router-dom";
import validator from 'validator'; // see https://www.npmjs.com/package/validator
import classNames from 'classnames'; // see https://www.npmjs.com/package/classnames
import axios from 'axios';
import Form from "./LoginForm";
import View from "./View";
import { handleLogin, isLoggedIn } from "../utils/auth";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {value: '', isValid: true, message: ''},
      password: {value: '', isValid: true, message: ''},
    };

    this.setState = this.setState.bind(this);
  }

  handleUpdate(event) {
    let state = this.state;
    state[event.target.name].value = event.target.value;

    state[event.target.name].message = '';
    this.setState(state);
  }

  handleSubmit(event) {
    this.resetValidationStates();
    if (this.formIsValid()) {
      let email = this.state.email.value || window.sessionStorage.email;
      email = email.toLocaleLowerCase();
      const password = this.state.password.value || window.sessionStorage.password;
      const promise = new Promise((resolve, reject) => {
        resolve(axios.post(`${process.env.GATSBY_API_URL}/sessions`, {email, password}));
      });
      promise
      .then((res) => {
        const { first_name, last_name, email } = res.data;
        // this.setState(this.state) // to reset state once 'isLoggedIn'
        handleLogin({first_name, last_name, email});
      })
      .then((res) => {
        this.setState(this.state) // to reset state once 'isLoggedIn'
        // this.props.handleClose(); //..of modal
      })
      .catch((err) => { 
        console.log(err);
        this.showErrorsAfterSubmission();
        document.getElementById('formControlsEmail').value=`${email || window.sessionStorage.email}`
        document.getElementById('formControlsPassword').value=`${password || window.sessionStorage.password}`
        window.sessionStorage.email = email === '' ? window.sessionStorage.email : email;
        window.sessionStorage.password = password === '' ? window.sessionStorage.password : password;
      });
    } 
  }

  formIsValid() {
    let state = this.state;

    if (!validator.isEmail(state.email.value) && validator.isEmpty(state.password.value)) {
      state.email.isValid = false;
      state.password.isValid = false;
      state.email.message = 'Not a valid email address';
      state.password.message = 'You must provide a password';
      this.setState(state);
      return false;
    }

    if (!validator.isEmail(state.email.value)) { // see https://www.npmjs.com/package/validator
      state.email.isValid = false;
      state.email.message = 'Not a valid email address';
      this.setState(state);
      return false;
    }

    if (validator.isEmpty(state.password.value)) {
      state.password.isValid = false;
      state.password.message = 'You must provide a password';
      this.setState(state);
      return false;
    }

    return true;
  }

  resetValidationStates() {
    let state = this.state;

    Object.keys(state).map(key => {
      if (state[key].hasOwnProperty('isValid')) {

        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }

  showErrorsAfterSubmission() {
    this.state.email.isValid = false
    this.state.password.isValid = false
    this.state.password.message = "Your email or password is not correct"
    this.setState(this.state);
  }

  render() {
    if (isLoggedIn()) {
      return <Redirect to={{ pathname: `/app/dashboard` }} />;
    }

    let {email, password} = this.state;
    let emailGroupClass = classNames('form-group', {'has-error': !email.isValid});
    let passwordGroupClass = classNames('form-group', {'has-error': !password.isValid});

    return (
      <View>
        <Form
          handleUpdate={e => this.handleUpdate(e)}
          handleSubmit={e => this.handleSubmit(e)}
          emailMessage={email.message}
          emailValue={email.value}
          passwordMessage={password.message}
          passwordValue={password.value}
          emailGroupClass={emailGroupClass}
          passwordGroupClass={passwordGroupClass}
          validEmail={email.isValid}
        />
      </View>
    )
  }
}


