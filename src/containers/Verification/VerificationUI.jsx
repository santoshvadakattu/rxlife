import {View} from 'react-native';
import React from 'react';
import {
  AuthLogo,
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Text,
} from '../../components';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import CircularProgress from 'react-native-circular-progress-indicator';
import util from '../../util';

const MAX_VALUE = 60;

const VerificationUI = (props) => {
  const {
    //  hooks
    navigate,

    // states
    disableReset,
    resetLoading,
    isLoading,
    prop,
    email,
    value,
    fromSignup,
    opt,

    // REFS
    fieldRef,
    progressRef,

    // functions
    getCellOnLayoutHandler,
    handleSubmit,
    handleResendOtp,
    toggleReset,
    handleChangeValue,
  } = props;

  const codeInputView = () => {
    return (
      <CodeField
        ref={fieldRef}
        {...prop}
        cellCount={4}
        value={value}
        onChangeText={handleChangeValue}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View style={styles.cellWrapper}>
            <Text
              type={Fonts.type.base}
              key={index}
              size={'xSmall'}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol ||
                (isFocused ? (
                  <Cursor />
                ) : (
                  <Text color={Colors.placeHolderColor}>0</Text>
                ))}
            </Text>
          </View>
        )}
      />
    );
  };

  const renderCircularProgress = () => {
    return (
      <View style={styles.progress}>
        <CircularProgress
          value={0}
          radius={MAX_VALUE}
          ref={progressRef}
          maxValue={MAX_VALUE}
          initialValue={MAX_VALUE}
          activeStrokeWidth={15}
          inActiveStrokeWidth={15}
          duration={MAX_VALUE * 1000}
          clockwise={false}
          progressValueColor={Colors.text.primary}
          progressValueFontSize={Fonts.size.xSmall}
          activeStrokeColor={Colors.background.primary}
          inActiveStrokeColor={Colors.background.themeLight}
          onAnimationComplete={toggleReset}
          progressFormatter={(value) => {
            'worklet';
            return `${Math.round(value)}`;
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Verification'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        leftBtnImage={Images.BackIcon}
      />

      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        containerStyle={styles.contentWrapper}>
        <AuthLogo />

        {/* <Text color={Colors.black} size="xSmall" type="base" textAlign="center">
          {opt}
        </Text> */}
        <View style={styles.infoWrapper}>
          <View style={styles.info}>
            <Text size="xSmall" type="base" textAlign="center">
              You'll get an email. Open the email and find the verification code
            </Text>
          </View>

          <View style={styles.alreadyHaveAnAccount}>
            <Text type="base" size="xSmall" color={Colors.black2}>
              {/* {email}{' '} */}
              {util.obfuscateEmail(email)}{' '}
              <Text
                type="semiBold"
                size="xSmall"
                color={Colors.text?.theme}
                onPress={() => {
                  navigate.goBack();
                }}>
                Not You?
              </Text>
            </Text>
          </View>
        </View>

        {codeInputView()}

        {renderCircularProgress()}

        <View>
          <Button
            indicatorColor={'white'}
            title={fromSignup ? 'Verify Email' : 'Reset Password'}
            isLoading={isLoading}
            onPress={handleSubmit}
          />

          <Button
            title="Resend Code"
            background="white"
            indicatorColor={Colors.text.theme}
            color={Colors.text.theme}
            style={styles.buttonBorders}
            disabled={disableReset}
            isLoading={resetLoading}
            onPress={handleResendOtp}
          />
        </View>
      </KeyboardAwareScrollViewComponent>
    </View>
  );
};

export default VerificationUI;
