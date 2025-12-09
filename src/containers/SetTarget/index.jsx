// @ts-nocheck
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Button, CustomNavbar, Text} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {setTargetValue, updateUserRequest} from '../../redux/slicers/user';
import {useDispatch, useSelector} from 'react-redux';

const SetTarget = () => {
  const {userData} = useSelector((state) => state?.user);
  const {instensityGoal, calorieGoal, stepsGoal} = userData;
  const [isSelectedCalories, setSelectedCalories] = useState(false);
  const [isSelectedSteps, setSelectedSteps] = useState(false);
  const [isSelectedIntensity, setSelectedIntensity] = useState(false);

  const [valueCalories, setValueCalories] = useState(
    calorieGoal ? calorieGoal.toString() : '',
  );
  const [valueSteps, setValueSteps] = useState(
    stepsGoal ? stepsGoal.toString() : '',
  );
  const [valueIntensity, setValueIntensity] = useState(
    instensityGoal ? instensityGoal.toString() : '',
  );

  const [errorCalories, setErrorCalories] = useState('');
  const [errorSteps, setErrorSteps] = useState('');
  const [errorIntensity, setErrorIntensity] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSteps, setIsLoadingSteps] = useState(false);
  const [isLoadingIntensity, setIsLoadingIntensity] = useState(false);

  const navigate = useNavigation();
  const dispatch = useDispatch();

  const renderCalories = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCalories(!isSelectedCalories);
          setSelectedSteps(false);
          setSelectedIntensity(false);
        }}
        style={styles.ViewContainer}>
        <View style={styles.innerView}>
          <View style={AppStyles.flexRow}>
            <Image
              source={Images.Calories}
              style={styles.caloriesImage}
              resizeMode="contain"
            />
            <View style={{justifyContent: 'center', marginLeft: 5}}>
              <Text
                type={Fonts.type.base}
                size={Fonts.size.xSmall}
                style={{fontWeight: '600'}}>
                Calories
              </Text>
              <Text
                type={Fonts.type.base}
                size={Fonts.size.xxxSmall}
                style={{fontWeight: '500'}}>
                Daily {calorieGoal} Calories
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.dropDownIconView}
            onPress={() => setSelectedCalories(!isSelectedCalories)}>
            <Image
              source={Images.DropdownIcon}
              style={[
                styles.dropDownIcon,
                isSelectedCalories && {transform: [{rotate: '180deg'}]},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {isSelectedCalories && (
          <View style={{marginTop: 18}}>
            <Text
              type={Fonts.type.base}
              size={Fonts.size.xSmall}
              style={{fontWeight: '500'}}>
              Set Target
            </Text>

            <TextInput
              placeholder={'Enter Calories'}
              value={valueCalories}
              style={styles.inPutStyle}
              autoFocus={true}
              keyboardType="numeric"
              onChangeText={(value) => {
                setValueCalories(value);
                setErrorCalories('');
              }}
              maxLength={255}
              placeholderTextColor={'#373737'}
            />
            <Text
              type={Fonts.type.base}
              color={Colors.red}
              size={Fonts.size.xxxxxSmall}
              style={{fontWeight: '500'}}>
              {errorCalories}
            </Text>
            <Button
              isLoading={isLoading}
              title={'Save'}
              style={{marginTop: 10}}
              onPress={() => CaloriesClick()}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  function CaloriesClick() {
    if (valueCalories != '') {
      setIsLoading(true);

      dispatch(
        updateUserRequest({
          params: userData?.id,
          payloadData: {
            calorie_goal: Number(valueCalories),
          },
          responseCallback: (status) => {
            setIsLoading(false);
            setSelectedCalories(false);
            dispatch(
              setTargetValue({
                calorieGoal: Number(valueCalories),
                targetValue: 'calorie',
              }),
            );
          },
        }),
      );
    } else {
      setErrorCalories('Required*');
    }
  }

  const renderSteps = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedSteps(!isSelectedSteps);
          setSelectedCalories(false);
          setSelectedIntensity(false);
        }}
        style={styles.ViewContainer}>
        <View style={styles.innerView}>
          <View style={AppStyles.flexRow}>
            <Image
              source={Images.Steps2}
              style={styles.stepsImage}
              resizeMode="contain"
            />
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <Text
                type={Fonts.type.base}
                size={Fonts.size.xSmall}
                style={{fontWeight: '600'}}>
                Steps
              </Text>
              <Text
                type={Fonts.type.base}
                size={Fonts.size.xxxSmall}
                style={{fontWeight: '500'}}>
                Daily {stepsGoal} Steps
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.dropDownIconView}
            onPress={() => setSelectedSteps(!isSelectedSteps)}>
            <Image
              source={Images.DropdownIcon}
              style={[
                styles.dropDownIcon,
                isSelectedSteps && {transform: [{rotate: '180deg'}]},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {isSelectedSteps && (
          <View style={{marginTop: 18}}>
            <Text
              type={Fonts.type.base}
              size={Fonts.size.xSmall}
              style={{fontWeight: '500'}}>
              Set Target
            </Text>

            <TextInput
              placeholder={'Enter Steps'}
              value={valueSteps}
              style={styles.inPutStyle}
              autoFocus={true}
              keyboardType="numeric"
              onChangeText={(value) => {
                setValueSteps(value);
                setErrorSteps('');
              }}
              maxLength={255}
              placeholderTextColor={'#373737'}
            />

            <Text
              type={Fonts.type.base}
              color={Colors.red}
              size={Fonts.size.xxxxxSmall}
              style={{fontWeight: '500'}}>
              {errorSteps}
            </Text>
            <Button
              isLoading={isLoadingSteps}
              title={'Save'}
              style={{marginTop: 10}}
              onPress={() => StepsSave()}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  function StepsSave() {
    if (valueSteps != '') {
      setIsLoadingSteps(true);
      dispatch(
        updateUserRequest({
          params: userData?.id,
          payloadData: {
            steps_goal: Number(valueSteps),
          },
          responseCallback: (status) => {
            setIsLoadingSteps(false);
            setSelectedSteps(false);
            dispatch(
              setTargetValue({
                stepsGoal: Number(valueSteps),
                targetValue: 'steps',
              }),
            );
          },
        }),
      );
    } else {
      setErrorSteps('Required*');
    }
  }

  const renderIntensity = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIntensity(!isSelectedIntensity);
          setSelectedCalories(false);
          setSelectedSteps(false);
        }}
        style={styles.ViewContainer}>
        <View style={styles.innerView}>
          <View style={AppStyles.flexRow}>
            <Image
              source={Images.Intensity}
              style={styles.intensityImage}
              resizeMode="contain"
            />
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <Text
                type={Fonts.type.base}
                size={Fonts.size.xSmall}
                style={{fontWeight: '600'}}>
                Intensity Minutes
              </Text>
              <Text
                type={Fonts.type.base}
                size={Fonts.size.xxxSmall}
                style={{fontWeight: '500'}}>
                Daily {instensityGoal} Minutes
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.dropDownIconView}
            onPress={() => setSelectedIntensity(!isSelectedIntensity)}>
            <Image
              source={Images.DropdownIcon}
              style={[
                styles.dropDownIcon,
                isSelectedIntensity && {transform: [{rotate: '180deg'}]},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {isSelectedIntensity && (
          <View style={{marginTop: 18}}>
            <Text
              type={Fonts.type.base}
              size={Fonts.size.xSmall}
              style={{fontWeight: '500'}}>
              Set Target
            </Text>

            <TextInput
              placeholder={'Enter Intensity'}
              value={valueIntensity}
              style={styles.inPutStyle}
              autoFocus={true}
              keyboardType="numeric"
              onChangeText={(value) => {
                setValueIntensity(value);
              }}
              maxLength={255}
              placeholderTextColor={'#373737'}
            />
            <Text
              type={Fonts.type.base}
              color={Colors.red}
              size={Fonts.size.xxxxxSmall}
              style={{fontWeight: '500'}}>
              {errorIntensity}
            </Text>

            <Button
              isLoading={isLoadingIntensity}
              title={'Save'}
              style={{marginTop: 10}}
              onPress={() => IntensitySave()}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  function IntensitySave() {
    if (valueIntensity != '') {
      setIsLoadingIntensity(true);
      dispatch(
        updateUserRequest({
          params: userData?.id,
          payloadData: {
            instensity_goal: Number(valueIntensity),
          },
          responseCallback: (status) => {
            setIsLoadingIntensity(false);
            setSelectedIntensity(false);
            dispatch(
              setTargetValue({
                instensityGoal: Number(valueIntensity),
                targetValue: 'intensity',
              }),
            );
          },
        }),
      );
    } else {
      setErrorIntensity('Required*');
    }
  }

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Set Target'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
      />
      <View style={{marginTop: 15}}>
        {renderCalories()}
        {renderSteps()}
        {renderIntensity()}
      </View>
    </View>
  );
};

export default SetTarget;
