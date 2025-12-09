import React, {useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import util from '../../util';
import {SCREENS, strings} from '../../constants';
import UpdatePasswordUI from './UpdatePasswordUI';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePasswordRequest} from '../../redux/slicers/user';

const UpdatePassword = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);
  // Input states
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoding] = useState(false);

  // Error
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // REFS
  const currentPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleChangeCurrentPassword = (text) => {
    setCurrentPassword(text);
    setCurrentPasswordError('');
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

    if (util.isEmptyValueWithoutTrim(currentPassword)) {
      setCurrentPasswordError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(currentPassword)) {
      setCurrentPasswordError(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
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
    } else if (util.areValuesEqual(password, currentPassword)) {
      util.topAlertError(
        strings.PASSWORD_AND_CURRENT_PASS_SHOULD_BE_SAME,
        'error',
      );

      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  const handleSubmit = () => {
    if (validation()) {
      setIsLoding(true);
      const payload = {
        email: userData.email,
        currentPassword: currentPassword,
        password: password,
        passwordConfirmation: confirmPassword,
      };
      dispatch(
        updatePasswordRequest({
          payloadData: payload,
          responseCallback: (status, response) => {
            setIsLoding(false);
            if (status) {
              util.topAlert('Password Changed successfully');
              navigate.goBack();
            }
          },
        }),
      );
    }
  };

  return (
    <UpdatePasswordUI
      // hooks
      navigate={navigate}
      // states
      isLoading={isLoading}
      currentPassword={currentPassword}
      password={password}
      confirmPassword={confirmPassword}
      currentPasswordError={currentPasswordError}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      showCurrentPassword={showCurrentPassword}
      // REFS
      currentPasswordRef={currentPasswordRef}
      passwordRef={passwordRef}
      confirmPasswordRef={confirmPasswordRef}
      // functions
      handlePasswordChange={handlePasswordChange}
      handleConfirmPasswordChange={handleConfirmPasswordChange}
      handleChangeCurrentPassword={handleChangeCurrentPassword}
      setShowPassword={setShowPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      setShowCurrentPassword={setShowCurrentPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdatePassword;
