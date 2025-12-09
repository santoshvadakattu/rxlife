import React, {useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import util from '../../util';
import {strings} from '../../constants';
import ChangePasswordUI from './ChangePasswordUI';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {resetPasswordRequest} from '../../redux/slicers/user';

const ChangePassword = ({route}) => {
  const {email} = route.params ?? {};
  const navigate = useNavigation();
  const dispatch = useDispatch();

  // Input states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoding] = useState(false);

  // Error states
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // REFS
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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

  const handleSubmit = () => {
    if (validation()) {
      setIsLoding(true);

      dispatch(
        resetPasswordRequest({
          payloadData: {
            email: email,
            password,
          },
          responseCallback: (status, message) => {
            setIsLoding(false);
            if (status) {
              util.topAlert(
                'Password reset successfully. Now you can use a new password to login.',
              );
              navigate.navigate('login');
            }
          },
        }),
      );
      // setTimeout(() => {
      //   setIsLoding(false);
      //   util.topAlert('Password Changed successfully');
      //   navigate.navigate('login');
      // }, 1000);
    }
  };

  return (
    <ChangePasswordUI
      // hooks
      navigate={navigate}
      // states
      isLoading={isLoading}
      password={password}
      confirmPassword={confirmPassword}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      // REFS
      passwordRef={passwordRef}
      confirmPasswordRef={confirmPasswordRef}
      // functions
      handlePasswordChange={handlePasswordChange}
      handleConfirmPasswordChange={handleConfirmPasswordChange}
      setShowPassword={setShowPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default ChangePassword;
