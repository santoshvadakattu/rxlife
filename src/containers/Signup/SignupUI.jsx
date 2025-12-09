import {View} from 'react-native';
import React from 'react';
import {
  AuthLogo,
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  SecondOption,
  Text,
  TextInput,
} from '../../components';
import styles from './styles';
import {Colors, Images} from '../../theme';
import util from '../../util';

const SignupUI = (props) => {
  const {
    //  hooks
    navigate,

    // states
    fullName,
    email,
    password,
    confirmPassword,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    showPassword,
    showConfirmPassword,
    isLoading,
    // refs
    fullNameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,

    // functions
    handleFullNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    setShowPassword,
    setShowConfirmPassword,
    loginGoogle,
    appleLogin,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Sign Up'}
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
          leftIcon={Images.UserIcon}
          placeholder={'Full name'}
          value={fullName}
          onChangeText={handleFullNameChange}
          maxLength={80}
          onSubmitEditing={() => emailRef?.current?.focus?.()}
          ref={fullNameRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={fullNameError}
          containerStyle={styles.firstFieldMargin}
        />

        <TextInput
          leftIcon={Images.EmailIcon}
          placeholder={'Email Address'}
          value={email}
          onChangeText={handleEmailChange}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => passwordRef?.current?.focus?.()}
          ref={emailRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={emailError}
          keyboardType="email-address"
          leftIconStyle={styles.emailIcon}
        />

        <TextInput
          leftIcon={Images.PasswordIcon}
          placeholder={'Password'}
          value={password}
          onChangeText={handlePasswordChange}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => confirmPasswordRef?.current?.focus?.()}
          ref={passwordRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={passwordError}
          secureTextEntry={!showPassword}
          leftIconStyle={styles.passwordIcon}
          leftIconWrapperStyle={styles.passwordIcoWrapper}
          rightIcon={
            showPassword ? Images.HidePasswordIcon : Images.ShowPasswordIcon
          }
          onPress={() => setShowPassword(!showPassword)}
        />

        <TextInput
          leftIcon={Images.PasswordIcon}
          placeholder={'Confirm Password'}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={handleSubmit}
          ref={confirmPasswordRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={confirmPasswordError}
          secureTextEntry={!showConfirmPassword}
          leftIconStyle={styles.passwordIcon}
          leftIconWrapperStyle={styles.passwordIcoWrapper}
          rightIcon={
            showConfirmPassword
              ? Images.HidePasswordIcon
              : Images.ShowPasswordIcon
          }
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <Button
          indicatorColor={'white'}
          isLoading={isLoading}
          title="SIGN UP"
          onPress={handleSubmit}
        />

        <SecondOption title="Sign up with" />

        <Button
          indicatorColor={'white'}
          isLoading={false}
          title="Sign up with Google"
          background="red"
          icon="googleButtonIcon"
          isSocialButton={true}
          onPress={loginGoogle}
        />

        {!util.isPlatformAndroid() && (
          <Button
            indicatorColor={'white'}
            isLoading={false}
            title="Sign up with apple"
            background="black"
            icon="appleButtonIcon"
            isSocialButton={true}
            onPress={appleLogin}
          />
        )}
        <View style={styles.alreadyHaveAnAccount}>
          <Text type="base" size="xSmall" color={Colors.black2}>
            I already have an account?{' '}
            <Text
              type="semiBold"
              size="xSmall"
              color={Colors.text?.theme}
              onPress={() => navigate.goBack()}>
              Sign in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollViewComponent>
    </View>
  );
};

export default SignupUI;
