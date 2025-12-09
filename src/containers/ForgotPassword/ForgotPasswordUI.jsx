import {View} from 'react-native';
import React from 'react';
import {
  AuthLogo,
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  TextInput,
} from '../../components';
import styles from './styles';
import {Colors, Images} from '../../theme';
import {DisplayBottom} from '../../Partials';

const ForgotPasswordUI = (props) => {
  const {
    //  hooks
    navigate,

    // states
    isLoading,
    email,
    emailError,

    // refs
    emailRef,
    passwordRef,

    // functions
    handleEmailChange,
    handleSubmit,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Forgot password'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        leftBtnImage={Images.BackIcon}
      />

      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        containerStyle={styles.contentWrapper}>
        <AuthLogo />

        <TextInput
          leftIcon={Images.EmailIcon}
          placeholder={'Email Address'}
          value={email}
          onChangeText={handleEmailChange}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={handleSubmit}
          ref={emailRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={emailError}
          keyboardType="email-address"
          leftIconStyle={styles.emailIcon}
          containerStyle={styles.firstFieldMargin}
        />
      </KeyboardAwareScrollViewComponent>
      <DisplayBottom>
        <Button
          indicatorColor={'white'}
          title="Forgot password"
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </DisplayBottom>
    </View>
  );
};

export default ForgotPasswordUI;
