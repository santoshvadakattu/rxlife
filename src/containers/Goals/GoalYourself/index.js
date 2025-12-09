import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  Button,
  ButtonView,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Text,
} from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles.';
import {SCREENS, strings} from '../../../constants';
import CountryNamePicker from '../../../components/CountryNamePicker';
import {useSelector} from 'react-redux';

export default function GoalYourself({route}) {
  const {activityValue} = route.params || {};
  const {userProfile} = useSelector((state) => state.user);

  const [country, setCountry] = useState(() => '');
  const [age, setAge] = useState(() => (userProfile.age ? userProfile.age : 0));
  const [ageError, setAgeError] = useState(() => '');
  const [selectedGender, setSelectedGender] = useState(
    () => userProfile.gender,
  );
  const [selectedCountryError, setSelectedCountryError] = useState(() => '');
  const navigate = useNavigation();

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
    if (country === '') {
      isValid = false;
      setSelectedCountryError(strings.REQUIRED_FIELD);
    }
    if (age <= 0) {
      isValid = false;
      setAgeError(strings.REQUIRED_FIELD);
    }
    return isValid;
  }

  const renderYourSelf = () => {
    return (
      <View style={styles.viewYourself}>
        <Text
          size={20}
          type={Fonts.type.base}
          color={Colors.black}
          style={{fontWeight: '600', lineHeight: 30}}>
          Tell us a little bit about yourself
        </Text>
        <Text
          size={11}
          type={Fonts.type.base}
          color={Colors.text.blueGray}
          style={{fontWeight: '400', lineHeight: 15}}>
          Please select which sex we should use to calculate your calories needs
        </Text>
      </View>
    );
  };

  const renderBtns = () => {
    return (
      <View style={{marginBottom: 20, gap: 10, flexDirection: 'row'}}>
        <Button
          title="Male"
          onPress={() => {
            setSelectedGender('Male');
          }}
          style={[
            styles.btnStyleGender,
            selectedGender == 'Male' && {
              backgroundColor: Colors.background.primary,
            },
          ]}
        />
        <Button
          title="Female"
          onPress={() => {
            setSelectedGender('Female');
          }}
          style={[
            styles.btnStyleGender,
            selectedGender == 'Female' && {
              backgroundColor: '#FF294F',
            },
          ]}
        />
      </View>
    );
  };

  const renderBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Next"
          onPress={() => {
            if (validation()) {
              navigate.navigate(SCREENS.GOALS.goalYourselfWeight, {
                age: age,
                country: country,
                gender: selectedGender,
                activityValue: activityValue,
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
          {renderYourSelf()}
          {renderBtns()}
          <KeyboardAwareScrollViewComponent>
            <View style={styles.viewGender}>
              <Image
                style={{width: 19, height: 21}}
                source={Images.BirthdayIcon}
              />
              <TextInput
                value={age}
                onChangeText={(value) => {
                  setAge(value);
                  setAgeError('');
                }}
                placeholderTextColor={Colors.text.blueGray}
                selectionColor={Colors.text.blueGray}
                placeholder="How old are you?"
                style={{width: '100%', height: 40}}
                keyboardType="numeric"
                error={ageError}
              />
            </View>
            {ageError && (
              <Text
                type="medium"
                size="xxxSmall"
                color={Colors.red}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                {ageError}
              </Text>
            )}
            <CountryNamePicker
              _value={country}
              setSelectedCountryError={setSelectedCountryError}
              setCountry={setCountry}
            />
            {selectedCountryError && (
              <Text
                type="medium"
                size="xxxSmall"
                color={Colors.red}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                {selectedCountryError}
              </Text>
            )}
          </KeyboardAwareScrollViewComponent>
        </View>

        {renderBtn()}
      </View>
    </View>
  );
}
