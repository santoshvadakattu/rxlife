import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import VerificationUI from './VerificationUI';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import util from '../../util';
import {SCREENS} from '../../constants';
import {
  confirmOtpRequest,
  getOtpTokenRequest,
  signUpRequest,
} from '../../redux/slicers/user';
import {useDispatch} from 'react-redux';

const Verification = ({route}) => {
  const {payload, fromSignup, otp} = route?.params;
  const {email} = payload;
  const navigate = useNavigation();
  const dispatch = useDispatch();

  // Input states
  const [value, setValue] = useState('');
  const [disableReset, setDisableReset] = useState(true);
  const [resetLoading, setResetLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [isLoading, setIsLoading] = useState(false);
  const [opt, setOtp] = useState(otp ? otp : '');
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // REFS
  const progressRef = useRef();

  const handleResendOtp = () => {
    setResetLoading(true);
    setDisableReset(true);
    setValue('');
    if (!disableReset) {
      dispatch(
        getOtpTokenRequest({
          payloadData: {
            email: payload?.email?.toLowerCase(),
            isSignup: fromSignup,
          },
          responseCallback: (status, message, otp) => {
            setResetLoading(false);
            if (status) {
              setOtp(otp);
              progressRef.current.reAnimate();
              setDisableReset(false);
            }
          },
        }),
      );
    }
  };

  const handleSubmit = () => {
    if (isLoading) return;

    if (!value || value?.length !== 4) {
      util.topAlertError('OTP is required.');
      return;
    }

    setIsLoading(true);
    dispatch(
      confirmOtpRequest({
        payloadData: {
          otp: value,
          email: payload?.email?.toLowerCase(),
        },
        responseCallback: (status, message) => {
          setDisableReset(true);
          setValue('');
          if (!status) {
            setIsLoading(false);
            return;
          }
          if (fromSignup) handleCreateUser();
          else {
            setIsLoading(false);

            navigate.navigate(SCREENS.AUTH.changePassword, {
              email: payload?.email,
            });
          }
        },
      }),
    );
  };

  const handleCreateUser = () => {
    const data = {
      email: payload?.email,
      username: payload?.email,
      password: payload?.password,
      fullname: payload?.fullName,
      confirmed: true,
      login_provider: 'local',
    };

    dispatch(
      signUpRequest({
        payloadData: data,
        responseCallback: (status, message) => {
          setIsLoading(false);
          if (status) {
            fromSignup
              ? navigate.navigate(SCREENS.AUTH.profileSetup)
              : navigate.navigate(SCREENS.AUTH.changePassword, {email});
          }
        },
      }),
    );
  };

  const toggleReset = () => {
    setDisableReset(!disableReset);
  };

  const handleChangeValue = (val) => {
    setValue(val);
  };

  return (
    <VerificationUI
      // hooks
      navigate={navigate}
      // states
      disableReset={disableReset}
      resetLoading={resetLoading}
      isLoading={isLoading}
      prop={prop}
      email={email}
      value={value}
      fromSignup={fromSignup}
      opt={opt}
      // REFS
      fieldRef={ref}
      progressRef={progressRef}
      // functions
      getCellOnLayoutHandler={getCellOnLayoutHandler}
      handleSubmit={handleSubmit}
      handleResendOtp={handleResendOtp}
      toggleReset={toggleReset}
      handleChangeValue={handleChangeValue}
    />
  );
};

export default Verification;
