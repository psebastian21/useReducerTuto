import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../Input/Input';

const emailReducer = (state, action) => {
  switch (action.command) {
    case 'CHANGE_EMAIL':
      return { value: action.val, isValid: action.val.includes('@') }
    case 'INPUT_BLUR':
      return { value: state.value, isValid: state.value.includes('@') }
    default:
      return { value: '', isValid: false }
  }
}

const passwordReducer = (state, action) => {
  switch (action.command) {
    case 'CHANGE_PASSWORD':
      return { value: action.val, isValid: action.val.trim().length > 6 }
    case 'INPUT_BLUR':
      return { value: state.value, isValid: state.value.trim().length > 6 }
    default:
      return { value: '', isValid: false }
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ command: 'CHANGE_EMAIL', val: event.target.value })

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ command: 'CHANGE_PASSWORD', val: event.target.value })

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ command: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ command: 'INPUT_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" label="E-Mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
