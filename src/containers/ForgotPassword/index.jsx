import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import util from '../../util';
import {SCREENS, strings} from '../../constants';
import ForgotPasswordUI from './ForgotPasswordUI';
import {useDispatch} from 'react-redux';
import {getOtpTokenRequest} from '../../redux/slicers/user';

const ForgotPassword = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  // Input states
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoding] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState('');

  // REFS
  const emailRef = useRef();

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError('');
  };

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

    Keyboard.dismiss();
    return isValid;
  }

  const handleSubmit = () => {
    if (validation()) {
      setIsLoding(true);
      dispatch(
        getOtpTokenRequest({
          payloadData: {
            email: email?.toLowerCase(),
            isSignup: false,
          },
          responseCallback: (status, message) => {
            setIsLoding(false);
            if (status) {
              navigate.navigate(SCREENS.AUTH.emailVerification, {
                fromSignup: false,
                payload: {
                  email: email?.toLowerCase(),
                },
              });
            }
          },
        }),
      );
    }
  };

  return (
    <ForgotPasswordUI
      // hooks
      navigate={navigate}
      // states
      isLoading={isLoading}
      email={email}
      emailError={emailError}
      // REFS
      emailRef={emailRef}
      // functions
      handleEmailChange={handleEmailChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ForgotPassword;
