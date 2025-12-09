import {Image, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  Button,
  ButtonView,
  CustomNavbar,
  DatePicker,
  DropDown,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../theme';
import ActionSheet from 'react-native-actionsheet';

const GENDER_OPTIONS = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

const ProfileSetupUI = (props) => {
  const {
    // hooks
    navigate,
    // states
    isLoading,
    currentWeight,
    idealWeight,
    height,
    neck,
    waist,
    hip,
    abdomen,
    arm,
    calf,
    chest,
    thigh,
    bodyFat,
    options,
    file,
    gender,
    bmiValue,
    birthDay,
    genderError,
    birthDayError,
    currentWeightError,
    idealWeightError,
    heightError,
    neckError,
    waistError,
    hipError,
    abdomenError,
    armError,
    chestError,
    calfError,
    thighError,
    bodyFatError,
    fileError,
    // REFS
    actionSheetRef,
    genderRef,
    birthDayRef,
    currentWeightRef,
    idealWeightRef,
    heightRef,
    neckRef,
    waistRef,
    hipRef,
    abdomenRef,
    armRef,
    chestCalfRef,
    bodyFatRef,
    heightInchRef,
    calfRef,
    thighRef,
    // functions
    handleSubmit,
    openActionSheet,
    onActionPress,
    setGender,
    setBirthDay,
    handleChangeCurrentWeight,
    handleChangeIdealWeight,
    handleChangeHeight,
    handleChangeHip,
    handleChangeNeck,
    handleChangeWaist,
    handleChangeAbdomen,
    handleChangeArm,
    handleChangeChest,
    handleChangeCalf,
    handleChangeBodyFat,
    setGenderError,
    setBirthDayError,
    skipBtnOnpress,
    handleChangeThigh,
    calfValue,
    heightInch,
    handleChangeHeightInch,
  } = props;

  const profilePickRender = () => {
    return (
      <>
        <ButtonView style={styles.profileWrapper} onPress={openActionSheet}>
          <View style={[styles.imageWrapper]}>
            <Image
              source={file?.path ? {uri: file?.path} : Images.PickProfileIcon}
              style={styles?.profileImage}
            />
          </View>
        </ButtonView>
        {fileError && (
          <Text
            textAlign="center"
            type="medium"
            size="xxxSmall"
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {fileError}
          </Text>
        )}
      </>
    );
  };

  const renderBMI = useMemo(() => {
    return (
      <TextInput
        leftIcon={Images.BMI}
        placeholder={'BMI'}
        value={bmiValue}
        maxLength={80}
        autoCapitalize="none"
        returnKeyType="next"
        placeholderTextColor={Colors.placeHolderColor}
        leftIconStyle={{height: 20, width: 20, tintColor: Colors.black}}
        keyboardType="numeric"
        rightText={'Kg/m^2'}
        editable={false}
      />
    );
  }, [bmiValue]);

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Profile Setup'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPress={skipBtnOnpress}
        rightBtnText={'Skip'}
      />

      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        containerStyle={styles.contentWrapper}>
        {profilePickRender()}

        <DropDown
          data={GENDER_OPTIONS}
          value={gender}
          setValue={setGender}
          placeholder={'Select Gender'}
          leftIcon={Images.GenderIcon}
          rightIcon={Images.DropdownIcon}
          error={genderError}
          setError={setGenderError}
        />

        <DatePicker
          leftIcon={Images.BirthdayIcon}
          value={birthDay}
          setValue={setBirthDay}
          setError={setBirthDayError}
          error={birthDayError}
        />

        <TextInput
          leftIcon={Images.CurrentWeight}
          placeholder={'Current Weight'}
          value={currentWeight}
          onChangeText={handleChangeCurrentWeight}
          autoCapitalize="none"
          onSubmitEditing={() => idealWeightRef?.current?.focus?.()}
          ref={currentWeightRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={currentWeightError}
          leftIconStyle={{height: 18, width: 18}}
          keyboardType="numeric"
          rightText={'lb'}
        />

        <TextInput
          leftIcon={Images.IdealWeight}
          placeholder={'Ideal Weight'}
          value={idealWeight}
          onChangeText={handleChangeIdealWeight}
          maxLength={7}
          autoCapitalize="none"
          onSubmitEditing={() => heightRef?.current?.focus?.()}
          ref={idealWeightRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={idealWeightError}
          leftIconStyle={{height: 19, width: 18}}
          keyboardType="numeric"
          rightText={'lb'}
        />

        <View style={{flexDirection: 'row'}}>
          <TextInput
            leftIcon={Images.Height}
            placeholder={'Height '}
            value={height}
            onChangeText={handleChangeHeight}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => heightInchRef?.current?.focus?.()}
            ref={heightRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={heightError}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
            rightText={'Fts'}
          />
          <View style={{width: 10}} />
          <TextInput
            leftIcon={Images.Height}
            placeholder={'Height '}
            value={heightInch}
            onChangeText={handleChangeHeightInch}
            maxLength={80}
            autoCapitalize="none"
            onSubmitEditing={() => neckRef?.current?.focus?.()}
            ref={heightInchRef}
            returnKeyType="next"
            placeholderTextColor={Colors.placeHolderColor}
            error={heightError}
            leftIconStyle={{height: 18, width: 18}}
            keyboardType="numeric"
            rightText={'inch'}
          />
        </View>
        <TextInput
          leftIcon={Images.Neck}
          placeholder={'Neck'}
          value={neck}
          onChangeText={handleChangeNeck}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => waistRef?.current?.focus?.()}
          ref={neckRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={neckError}
          leftIconStyle={{height: 20, width: 20}}
          keyboardType="numeric"
          rightText={'Inch'}
        />

        <TextInput
          leftIcon={Images.Waist}
          placeholder={'Waist'}
          value={waist}
          onChangeText={handleChangeWaist}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => hipRef?.current?.focus?.()}
          ref={waistRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={waistError}
          leftIconStyle={{height: 18, width: 19}}
          keyboardType="numeric"
          rightText={'Inch'}
        />

        <TextInput
          leftIcon={Images.Hip}
          placeholder={'Hip'}
          value={hip}
          onChangeText={handleChangeHip}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => abdomenRef?.current?.focus?.()}
          ref={hipRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={hipError}
          leftIconStyle={{height: 22, width: 19}}
          keyboardType="numeric"
          rightText={'Inch'}
        />

        <TextInput
          leftIcon={Images.Abdomen}
          placeholder={'Abdomen'}
          value={abdomen}
          onChangeText={handleChangeAbdomen}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => armRef?.current?.focus?.()}
          ref={abdomenRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={abdomenError}
          leftIconStyle={{height: 18, width: 18}}
          keyboardType="numeric"
          rightText={'Inch'}
        />

        <TextInput
          leftIcon={Images.Arm}
          placeholder={'Arm'}
          value={arm}
          onChangeText={handleChangeArm}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => chestCalfRef?.current?.focus?.()}
          ref={armRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={armError}
          leftIconStyle={{height: 19, width: 19}}
          keyboardType="numeric"
          rightText={'Inch'}
        />

        <TextInput
          leftIcon={Images.ChestCalf}
          placeholder={'Chest'}
          value={chest}
          onChangeText={handleChangeChest}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => calfRef?.current?.focus?.()}
          ref={chestCalfRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={chestError}
          leftIconStyle={{height: 18, width: 18}}
          keyboardType="numeric"
          rightText={'Inch'}
        />
        <TextInput
          leftIcon={Images.calf}
          placeholder={'Calf'}
          value={calf}
          onChangeText={handleChangeCalf}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => thighRef?.current?.focus?.()}
          ref={calfRef}
          returnKeyType="next"
          error={calfError}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 18, width: 18}}
          keyboardType="numeric"
          rightText={'Inch'}
        />

        <TextInput
          leftIcon={Images.Thigh}
          placeholder={'Thigh'}
          value={thigh}
          onChangeText={handleChangeThigh}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={() => bodyFatRef?.current?.focus?.()}
          ref={thighRef}
          returnKeyType="next"
          error={thighError}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          keyboardType="numeric"
          rightText={'Inch'}
        />

        <TextInput
          leftIcon={Images.Fat}
          placeholder={'Body Fat%'}
          value={bodyFat}
          onChangeText={handleChangeBodyFat}
          maxLength={80}
          autoCapitalize="none"
          onSubmitEditing={handleSubmit}
          ref={bodyFatRef}
          returnKeyType="next"
          placeholderTextColor={Colors.placeHolderColor}
          error={bodyFatError}
          leftIconStyle={{height: 20, width: 20, tintColor: Colors.black}}
          keyboardType="numeric"
          editable={false}
          rightText={'%'}
        />
        {renderBMI}
        <Button
          indicatorColor={'white'}
          isLoading={isLoading}
          title="Next"
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollViewComponent>

      <ActionSheet
        ref={actionSheetRef}
        options={options}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        key={1}
        onPress={onActionPress}
      />
    </View>
  );
};

export default ProfileSetupUI;
