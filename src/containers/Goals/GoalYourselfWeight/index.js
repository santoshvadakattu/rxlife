import {View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {SCREENS, strings} from '../../../constants';
import util from '../../../util';
import {useSelector} from 'react-redux';
import {G} from 'react-native-svg';

export default function GoalYourselfWeight({route}) {
  const {age, country, activityValue, gender} = route.params;

  const {userProfile} = useSelector((state) => state.user);
  const [currentWeight, setCurrentWeight] = useState(
    userProfile.currentWeight || '',
  );
  const [WeightError, setWeightError] = useState('');
  const [height, setHeight] = useState(userProfile.height || '');
  const [heightError, setHeightErrorr] = useState('');
  const [heightInch, setHeightInch] = useState(userProfile.heightInch || '');
  const [heightInchError, setHeightInchError] = useState('');
  const navigate = useNavigation();
  const weightRef = useRef(null);
  const heightInchRef = useRef(null);

  const renderCustomerNavbar = useMemo(() => {
    return (
      <View>
        <CustomNavbar
          hasBorder={false}
          title={'You'}
          leftBtnImage={Images.LeftArrow}
          leftBtnPress={() => navigate.goBack()}
          titleColor={Colors.black}
        />
      </View>
    );
  }, []);

  function validation() {
    let isValid = true;
    if (util.isEmptyValue(height)) {
      isValid = false;
      setHeightErrorr(strings.REQUIRED_FIELD);
    }
    if (util.isEmptyValue(heightInch)) {
      isValid = false;
      setHeightInchError(strings.REQUIRED_FIELD);
    }
    if (util.isEmptyValue(currentWeight)) {
      setWeightError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    return isValid;
  }

  const renderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Next"
          onPress={() => {
            if (validation()) {
              navigate.navigate(SCREENS.GOALS.weeklyGoal, {
                age,
                country,
                gender,
                height,
                heightInch,
                currentWeight,
                activityValue,
              });
            }
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomerNavbar}
      <View
        style={[AppStyles.mTop15, {flex: 1, justifyContent: 'space-between'}]}>
        <View style={{flex: 1}}>
          <Text
            size={20}
            type={Fonts.type.base}
            color={Colors.black}
            style={{fontWeight: '600'}}>
            Just a few more questions
          </Text>
          <KeyboardAwareScrollViewComponent
            scrollEnabled={true}
            containerStyle={styles.contentWrapper}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                leftIcon={Images.Height}
                placeholder={'Height '}
                value={height}
                maxLength={80}
                onChangeText={(value) => {
                  setHeight(value);
                  setHeightErrorr('');
                }}
                autoCapitalize="none"
                onSubmitEditing={() => heightInchRef?.current?.focus?.()}
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
                maxLength={80}
                onChangeText={(value) => {
                  setHeightInch(value);
                  setHeightInchError('');
                }}
                autoCapitalize="none"
                onSubmitEditing={() => weightRef?.current?.focus?.()}
                ref={heightInchRef}
                returnKeyType="next"
                placeholderTextColor={Colors.placeHolderColor}
                error={heightInchError}
                leftIconStyle={{height: 18, width: 18}}
                keyboardType="numeric"
                rightText={'inch'}
              />
            </View>
            <TextInput
              leftIcon={Images.CurrentWeight}
              placeholder={'Weight'}
              value={currentWeight}
              onChangeText={(value) => {
                setCurrentWeight(value);
                setWeightError('');
              }}
              autoCapitalize="none"
              onSubmitEditing={() => {}}
              ref={weightRef}
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{height: 18, width: 18}}
              keyboardType="numeric"
              rightText={'lb'}
              error={WeightError}
            />
          </KeyboardAwareScrollViewComponent>
        </View>
        {renderSaveBtn()}
      </View>
    </View>
  );
}
