import {Platform, View} from 'react-native';
import React from 'react';
import {
  AuthLogo,
  Button,
  ButtonView,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  SecondOption,
  Text,
  TextInput,
} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../theme';

const LoginUI = (props) => {
  const {
    //  hooks
    navigate,

    // states
    email,
    password,
    emailError,
    passwordError,
    showPassword,
    isLoading,
    // refs
    emailRef,
    passwordRef,
    confirmPasswordRef,

    // functions
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    setShowPassword,
    loginGoogle,
    appleLogin,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Sign in'}
        titleColor={Colors.black}
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
          onSubmitEditing={() => passwordRef?.current?.focus?.()}
          ref={emailRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={emailError}
          keyboardType="email-address"
          leftIconStyle={styles.emailIcon}
          containerStyle={styles.firstFieldMargin}
        />

        <TextInput
          leftIcon={Images.PasswordIcon}
          placeholder={'Password'}
          value={password}
          onChangeText={handlePasswordChange}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={handleSubmit}
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

        <View style={[AppStyles.alignItemsCenter, AppStyles.margin20]}>
          <ButtonView
            onPress={() => {
              navigate.navigate('forgotPassword');
            }}>
            <Text size="xSmall" type="base">
              Forgot Password
            </Text>
          </ButtonView>
        </View>

        <Button
          indicatorColor={'white'}
          isLoading={isLoading}
          title="sign in"
          onPress={handleSubmit}
        />

        <SecondOption title="Sign in with" />

        <Button
          indicatorColor={'white'}
          isLoading={false}
          title="sign in with Google"
          background="red"
          icon="googleButtonIcon"
          isSocialButton={true}
          onPress={loginGoogle}
        />

        {Platform.OS == 'ios' && (
          <Button
            indicatorColor={'white'}
            isLoading={false}
            title="sign in with apple"
            background="black"
            icon="appleButtonIcon"
            isSocialButton={true}
            onPress={appleLogin}
          />
        )}

        <View style={styles.alreadyHaveAnAccount}>
          <Text type="base" size="xSmall" color={Colors.black2}>
            Don't have an account?{' '}
            <Text
              type="semiBold"
              size="xSmall"
              color={Colors.text?.theme}
              onPress={() => {
                navigate.navigate('signup');
              }}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollViewComponent>
    </View>
  );
};

export default LoginUI;
