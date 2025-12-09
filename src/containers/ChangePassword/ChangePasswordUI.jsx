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

const ChangePasswordUI = (props) => {
  const {
    // hooks
    navigate,
    // states
    isLoading,
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    showPassword,
    showConfirmPassword,
    // REFS
    passwordRef,
    confirmPasswordRef,
    // functions
    handlePasswordChange,
    handleConfirmPasswordChange,
    setShowPassword,
    setShowConfirmPassword,
    handleSubmit,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Reset password'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.navigate('forgotPassword')}
        leftBtnImage={Images.BackIcon}
      />

      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        containerStyle={styles.contentWrapper}>
        <AuthLogo />

        <TextInput
          leftIcon={Images.PasswordIcon}
          placeholder={'New Password'}
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
          containerStyle={styles.firstFieldMargin}
        />

        <TextInput
          leftIcon={Images.PasswordIcon}
          placeholder={'Confirm New Password'}
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
      </KeyboardAwareScrollViewComponent>
      <DisplayBottom>
        <Button
          indicatorColor={'white'}
          title="Reset password"
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </DisplayBottom>
    </View>
  );
};

export default ChangePasswordUI;
