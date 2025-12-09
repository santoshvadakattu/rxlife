import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import util from '../../util';
import {SCREENS, strings} from '../../constants';
import LoginUI from './LoginUI';
import {useDispatch} from 'react-redux';
import {
  appleLoginRequest,
  loginRequest,
  loginSuccess,
  loginUserRequest,
} from '../../redux/slicers/user';
import {GoogleLogin} from '../../Helper/GoogleLoginHelper';
import {appleSignIn} from '../../Helper/AppleLoginHelper';

const Login = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('test1@user.com');
  // const [password, setPassword] = useState('Adobe110#');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // REFS
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError('');
  };

  function loginRequst(result) {
    dispatch(loginSuccess(result));
    result.user?.is_profile_created
      ? dispatch(loginUserRequest())
      : navigate.navigate(SCREENS.AUTH.profileSetup);
  }
  function loginGoogle() {
    GoogleLogin(loginRequst);
  }
  function appleRequest(data, authorizationCode) {
    const payload = {data, authorizationCode};
    dispatch(
      appleLoginRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          loginRequst(response);
        },
      }),
    );
  }
  function appleLogin() {
    appleSignIn(appleRequest);
  }

  function validation() {
    let isValid = true;
    if (util.isEmptyValueWithoutTrim(email)) {
      setEmailError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(email)) {
      setEmailError(strings.EMAIL_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    } else if (!util.isEmailValid(email)) {
      setEmailError(strings.INVALID_EMAIL);
      return false;
    }

    if (util.isEmptyValueWithoutTrim(password)) {
      setPasswordError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(password)) {
      setPasswordError(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  const handleSubmit = () => {
    if (validation()) {
      setisLoading(true);
      const payload = {
        identifier: email,
        password: password,
      };
      dispatch(
        loginRequest({
          payloadData: payload,
          responseCallback: (status, response) => {
            setisLoading(false);
            const {user} = response || {};

            if (status) {
              user?.is_profile_created
                ? dispatch(loginUserRequest())
                : navigate.navigate(SCREENS.AUTH.profileSetup);
            }
          },
        }),
      );
    }
  };

  return (
    <LoginUI
      // hooks
      navigate={navigate}
      // states
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      showPassword={showPassword}
      isLoading={isLoading}
      // REFS
      emailRef={emailRef}
      passwordRef={passwordRef}
      // functions
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      setShowPassword={setShowPassword}
      loginGoogle={loginGoogle}
      appleLogin={appleLogin}
    />
  );
};

export default Login;
