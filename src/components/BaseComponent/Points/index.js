import {Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import Text from '../../Text';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {connectedWatch} from '../../../constants';

export default function Points(props) {
  const {targetPoint, earnPoint, isActive} = props;
  const {
    userData,
    appleData,
    connectedWatchName,
    garminData,
    isWatchConnected,
  } = useSelector((state) => state?.user);
  const {instensityGoal, calorieGoal, stepsGoal} = userData;
  const progressRef = useRef();
  const progressRefSteps = useRef();
  const progressRefCalories = useRef();
  const progressRefIntensity = useRef();
  const navigate = useNavigation();
  const [firstTime, setFirstTime] = useState(true);

  useMemo(() => {
    progressRefSteps?.current?.reAnimate();
    progressRefIntensity?.current?.reAnimate();
    progressRefCalories?.current?.reAnimate();
    if (!firstTime) {
      if (progressRef?.current) {
        // progressRef?.current?.reAnimate();
      }
    }
  }, [
    targetPoint,
    earnPoint,
    connectedWatchName,
    garminData,
    appleData,
    stepsGoal,
  ]);

  useEffect(() => {
    setFirstTime(false);
  }, []);

  const value =
    earnPoint > 0 ? (targetPoint > 0 ? (earnPoint / targetPoint) * 60 : 0) : 0;

  const renderSteps = useMemo(() => {
    const currentValue =
      connectedWatchName === connectedWatch.GRAMIN
        ? garminData?.steps
        : appleData?.StepsCount;

    const safeValue = currentValue > stepsGoal ? stepsGoal : currentValue;
    return (
      <CircularProgress
        value={safeValue}
        key={`circular-progress-${stepsGoal}`}
        maxValue={Number(stepsGoal)}
        radius={90}
        ref={progressRefSteps}
        initialValue={0}
        activeStrokeWidth={15}
        inActiveStrokeWidth={15}
        duration={5000}
        clockwise={true}
        progressValueColor={Colors.text.primary}
        progressValueFontSize={1}
        activeStrokeColor={isActive ? '#0D82FF' : '#d7d9df'}
        inActiveStrokeColor={isActive ? '#cfe6ff' : '#d7d9df'}
      />
    );
  }, [connectedWatchName, garminData, appleData, progressRefSteps, stepsGoal]);

  const renderCalories = useMemo(() => {
    const currentValue =
      connectedWatchName == connectedWatch.GRAMIN
        ? garminData?.calories?.calories_value
        : parseInt(appleData.Calories?.toFixed(2)) || 0;

    const safeValue = currentValue > calorieGoal ? calorieGoal : currentValue;
    return (
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <CircularProgress
          value={safeValue}
          key={`circular-progress-${calorieGoal}`}
          radius={70}
          ref={progressRefCalories}
          maxValue={Number(calorieGoal)}
          initialValue={0}
          activeStrokeWidth={15}
          inActiveStrokeWidth={15}
          duration={5000}
          clockwise={true}
          progressValueColor={Colors.text.primary}
          progressValueFontSize={1}
          activeStrokeColor={isActive ? '#ff2950' : '#d7d9df'}
          inActiveStrokeColor={isActive ? '#ffd4dc' : '#d7d9df'}
        />
      </View>
    );
  }, [
    connectedWatchName,
    garminData,
    appleData,
    progressRefSteps,
    progressRefCalories,
    calorieGoal,
  ]);

  const renderIntensity = useMemo(() => {
    const currentValue =
      connectedWatchName == connectedWatch.GRAMIN
        ? garminData?.intensity
        : appleData?.Intensity;

    const safeValue =
      currentValue > instensityGoal ? instensityGoal : currentValue;
    return (
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginTop: 40,
        }}>
        <CircularProgress
          value={safeValue}
          key={`circular-progress-${instensityGoal}`}
          radius={50}
          ref={progressRefIntensity}
          maxValue={Number(instensityGoal)}
          initialValue={0}
          activeStrokeWidth={15}
          inActiveStrokeWidth={15}
          duration={5000}
          clockwise={true}
          progressValueColor={Colors.text.primary}
          progressValueFontSize={1}
          activeStrokeColor={isActive ? '#61d85e' : '#d7d9df'}
          inActiveStrokeColor={isActive ? '#def7df' : '#d7d9df'}
        />
      </View>
    );
  }, [
    connectedWatchName,
    garminData,
    appleData,
    progressRefIntensity,
    instensityGoal,
  ]);

  const renderPoints = useMemo(() => {
    return (
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginTop: 60,
        }}>
        <CircularProgress
          key={`circular-progress-${value}`}
          value={value}
          radius={30}
          ref={progressRef}
          maxValue={60}
          initialValue={0}
          activeStrokeWidth={15}
          inActiveStrokeWidth={15}
          duration={5000}
          clockwise={true}
          progressValueColor={Colors.text.primary}
          progressValueFontSize={1}
          activeStrokeColor={'#61d85e'}
          inActiveStrokeColor={'#def7df'}
        />
      </View>
    );
  }, [
    connectedWatchName,
    targetPoint,
    earnPoint,
    garminData,
    appleData,
    value,
    progressRef,
  ]);

  return (
    <TouchableOpacity
      onPress={() => isActive && navigate.navigate('activityWeeklyPoint')}
      style={{
        padding: 15,
        width: '100%',
        borderRadius: 12,
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.5,
        elevation: 2,
        marginTop: 20,
        paddingVertical: 10,
      }}>
      <View>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            AppStyles.spaceBetween,
          ]}>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={Fonts.size.normal}
            style={{fontWeight: '600'}}>
            Points
          </Text>

          <Image
            source={Images.LeftArrow}
            style={{
              width: 7,
              height: 12,
              transform: [{rotate: '180deg'}],
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            color={Colors.black}
            type={Fonts.type.base}
            size={10}
            style={{fontWeight: '400'}}>
            Target : {true ? targetPoint : '--'} pts
          </Text>
          <View style={{marginHorizontal: 3}}>
            {renderSteps}
            {renderCalories}
            {renderIntensity}
            {renderPoints}
          </View>
          <Text
            color={Colors.black}
            type={Fonts.type.base}
            size={10}
            style={{fontWeight: '400'}}>
            Earn : {true ? earnPoint : '--'} pts{' '}
          </Text>
        </View>
        <View
          style={{alignSelf: 'center', alignItems: 'center', marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Images.Steps2}
                style={[
                  {
                    width: 24,
                    height: 18,
                    resizeMode: 'contain',
                    marginRight: 5,
                    tintColor: '#0D82FF',
                  },
                ]}
              />
              <Text
                color={isActive ? Colors.black2 : Colors.disable}
                type={Fonts.type.base}
                size={Fonts.size.xxxSmall}
                style={{fontWeight: '500'}}>
                Steps
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 30,
              }}>
              <Image
                source={Images.Calories}
                style={[
                  {
                    width: 31,
                    height: 19,
                    resizeMode: 'contain',
                    marginRight: 5,
                    tintColor: '#ff2950',
                  },
                ]}
              />
              <Text
                color={isActive ? Colors.black2 : Colors.disable}
                type={Fonts.type.base}
                size={Fonts.size.xxxSmall}
                style={{fontWeight: '500'}}>
                Calories
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              justifyContent: 'center',
            }}>
            <Image
              source={Images.Intensity}
              style={[
                {
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  marginRight: 5,
                  tintColor: '#61D85E',
                },
              ]}
            />
            <Text
              color={isActive ? Colors.black2 : Colors.disable}
              type={Fonts.type.base}
              size={Fonts.size.xxxSmall}
              style={{fontWeight: '500'}}>
              Intensity Minutes
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
