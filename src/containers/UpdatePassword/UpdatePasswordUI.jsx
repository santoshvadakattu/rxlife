import {View} from 'react-native';
import React from 'react';
import {
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  TextInput,
} from '../../components';
import styles from './styles';
import {Colors, Images} from '../../theme';
import {DisplayBottom} from '../../Partials';

const UpdatePasswordUI = (props) => {
  const {
    // hooks
    navigate,
    // states
    isLoading,
    currentPassword,
    password,
    confirmPassword,
    currentPasswordError,
    passwordError,
    confirmPasswordError,
    showPassword,
    showConfirmPassword,
    showCurrentPassword,
    // REFS
    currentPasswordRef,
    passwordRef,
    confirmPasswordRef,
    // functions
    handlePasswordChange,
    handleConfirmPasswordChange,
    setShowPassword,
    setShowConfirmPassword,
    setShowCurrentPassword,
    handleSubmit,
    handleChangeCurrentPassword,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Change password'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        leftBtnImage={Images.BackIcon}
      />

      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        containerStyle={styles.contentWrapper}>
        <TextInput
          leftIcon={Images.PasswordIcon}
          placeholder={'Current Password'}
          value={currentPassword}
          onChangeText={handleChangeCurrentPassword}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => passwordRef?.current?.focus?.()}
          ref={currentPasswordRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={currentPasswordError}
          secureTextEntry={!showCurrentPassword}
          leftIconStyle={styles.passwordIcon}
          leftIconWrapperStyle={styles.passwordIcoWrapper}
          rightIcon={
            showCurrentPassword
              ? Images.HidePasswordIcon
              : Images.ShowPasswordIcon
          }
          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          containerStyle={styles.firstFieldMargin}
        />

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
          title="Change"
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </DisplayBottom>
    </View>
  );
};

export default UpdatePasswordUI;
