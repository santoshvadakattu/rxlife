import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import SignupUI from './SignupUI';
import {Keyboard} from 'react-native';
import util from '../../util';
import {SCREENS, strings} from '../../constants';
import {
  appleLoginRequest,
  getOtpTokenRequest,
  loginSuccess,
  loginUserRequest,
} from '../../redux/slicers/user';
import {useDispatch} from 'react-redux';
import {appleSignIn} from '../../Helper/AppleLoginHelper';
import {GoogleLogin} from '../../Helper/GoogleLoginHelper';

const Signup = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  // Input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error states
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // REFS
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleFullNameChange = (text) => {
    setFullName(text);
    setFullNameError('');
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setConfirmPasswordError('');
  };

  function validation() {
    let isValid = true;

    if (util.isEmptyValueWithoutTrim(fullName)) {
      setFullNameError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(fullName)) {
      setFullNameError(strings.NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    }

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
    } else if (!util.isPasswordValid(password)) {
      setPasswordError(strings.PASSWORD_STRONGE);
      isValid = false;
    } else if (!util.strongePassword(password)) {
      setPasswordError(strings.PASSWORD_STRONGE);
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(confirmPassword)) {
      setConfirmPasswordError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (!util.areValuesEqual(password, confirmPassword)) {
      setConfirmPasswordError(strings.PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

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
  const handleSubmit = () => {
    if (validation()) {
      setIsLoading(true);
      const payload = {
        fullName,
        password,
        email: email?.toLowerCase(),
      };

      dispatch(
        getOtpTokenRequest({
          payloadData: {
            email: email?.toLowerCase(),
            isSignup: true,
          },
          responseCallback: (status, message, otp) => {
            setIsLoading(false);
            if (status) {
              navigate.navigate(SCREENS.AUTH.emailVerification, {
                fromSignup: true,
                payload,
                otp,
              });
            }
          },
        }),
      );
    }
  };

  return (
    <SignupUI
      // hooks
      navigate={navigate}
      // states
      fullName={fullName}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      fullNameError={fullNameError}
      emailError={emailError}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      isLoading={isLoading}
      // REFS
      fullNameRef={fullNameRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
      confirmPasswordRef={confirmPasswordRef}
      // functions
      handleFullNameChange={handleFullNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleConfirmPasswordChange={handleConfirmPasswordChange}
      handleSubmit={handleSubmit}
      setShowPassword={setShowPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      loginGoogle={loginGoogle}
      appleLogin={appleLogin}
    />
  );
};

export default Signup;
