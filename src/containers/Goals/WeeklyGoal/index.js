import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomNavbar,
  GoalCheckItem,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SCREENS, strings} from '../../../constants';
import GoalsAnswerItem from '../../../components/GoalsAnswerItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUserRequest,
  updateProfileSetUpRequest,
} from '../../../redux/slicers/user';
import {setIsGoalSet} from '../../../redux/slicers/general';
import util, {
  calculateBMRbyUser,
  calculateUserGoalCalories,
} from '../../../util';

export default function WeeklyGoal({route}) {
  const {
    age,
    country,
    activityValue,
    gender,
    height,
    heightInch,
    currentWeight,
  } = route.params;

  const {userData, userProfile} = useSelector((state) => state.user);
  const [idealWeight, setIdealWeight] = useState(userProfile.idealWeight || '');
  const [WeightError, setWeightError] = useState('');
  const [gainWeight25, setGainWeight25] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {goalFromSignUp} = useSelector((state) => state.general);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const renderCustomerNavbar = useMemo(() => {
    return (
      <View>
        <CustomNavbar
          hasBorder={false}
          title={'Weekly Goal'}
          leftBtnImage={Images.LeftArrow}
          leftBtnPress={() => navigate.goBack()}
          titleColor={Colors.black}
        />
      </View>
    );
  }, []);

  function validation() {
    let isValid = true;
    if (util.isEmptyValue(idealWeight)) {
      isValid = false;
      setWeightError(strings.REQUIRED_FIELD);
    }

    return isValid;
  }

  const renderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Next"
          isLoading={isLoading}
          onPress={() => {
            if (validation()) {
              userProfileApiCall();
            }
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  function userProfileApiCall() {
    const goalCalories = calculateUserGoalCalories(
      gender,
      age,
      currentWeight,
      height,
      heightInch,
      idealWeight,
      activityValue,
    );

    setIsLoading(true);
    const payload = {
      data: {
        data: {
          user: {
            disconnect: [],
            connect: [
              {
                id: userData?.id,
              },
            ],
          },
          gender: gender,
          age: age,
          current_weight: currentWeight,
          ideal_weight: idealWeight,
          height_in_feet: height,
          height_in_inches: heightInch,
          hasNutrition: true,
          country: country,
          goalCalories: goalCalories,
        },
      },
      userProfileId: userProfile?.id,
    };

    dispatch(
      updateProfileSetUpRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsLoading(false);
          console.log({status, response});
          if (status) {
            if (goalFromSignUp) {
              dispatch(loginUserRequest());
              dispatch(setIsGoalSet(true));
            } else {
              dispatch(setIsGoalSet(true));
              navigate.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: SCREENS.NUTRITION.nutrition}],
                }),
              );
            }
          }
        },
      }),
    );
  }

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
            What’s your goal weight?
          </Text>
          <KeyboardAwareScrollViewComponent
            scrollEnabled={true}
            containerStyle={styles.contentWrapper}>
            <TextInput
              leftIcon={Images.CurrentWeight}
              placeholder={'Weight'}
              value={idealWeight}
              onChangeText={(value) => {
                setIdealWeight(value);
              }}
              autoCapitalize="none"
              onSubmitEditing={() => {}}
              returnKeyType="next"
              placeholderTextColor={Colors.placeHolderColor}
              leftIconStyle={{height: 18, width: 18}}
              keyboardType="numeric"
              rightText={'lb'}
              error={WeightError}
            />
            <View style={{marginTop: 20}}>
              <Text
                size={20}
                type={Fonts.type.base}
                color={Colors.black}
                style={{fontWeight: '600'}}>
                What is your weekly Goal?
              </Text>
              <GoalsAnswerItem
                title={'Gain 0.5 lb per week'}
                isActive={gainWeight25}
                onPress={() => {
                  setGainWeight25(true);
                }}
              />
              <GoalsAnswerItem
                title={'Gain 1 lb per week'}
                isActive={!gainWeight25}
                onPress={() => {
                  setGainWeight25(false);
                }}
              />
            </View>
          </KeyboardAwareScrollViewComponent>
        </View>
        {renderSaveBtn()}
      </View>
    </View>
  );
}
