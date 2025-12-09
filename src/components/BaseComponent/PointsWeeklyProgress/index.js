import {Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import Text from '../../Text';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {connectedWatch} from '../../../constants';
import util from '../../../util';

export default function PointsWeeklyProgress(props) {
  const {
    pointsValue,
    totalPoints,
    earnedPoints,
    stepsValue,
    caloriesValue,
    intensityValue,
  } = props;
  const {
    userData,
    appleData,
    connectedWatchName,
    garminData,
    isWatchConnected,
  } = useSelector((state) => state?.user);
  console.log({stepsValue});
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
    connectedWatchName,
    totalPoints,
    earnedPoints,
    garminData,
    appleData,
    stepsGoal,
  ]);

  useEffect(() => {
    setFirstTime(false);
  }, []);

  const renderSteps = useMemo(() => {
    const safeValue = stepsValue > stepsGoal ? stepsGoal : stepsValue;
    return (
      <CircularProgress
        value={safeValue}
        key={`circular-progress-${stepsGoal}`}
        maxValue={Number(stepsGoal * 7)}
        radius={90}
        ref={progressRefSteps}
        initialValue={0}
        activeStrokeWidth={15}
        inActiveStrokeWidth={15}
        duration={5000}
        clockwise={true}
        progressValueColor={Colors.text.primary}
        progressValueFontSize={1}
        activeStrokeColor={'#0D82FF'}
        inActiveStrokeColor={'#cfe6ff'}
      />
    );
  }, [stepsValue, progressRefSteps, stepsGoal]);

  const renderCalories = useMemo(() => {
    const safeValue = caloriesValue > calorieGoal ? calorieGoal : caloriesValue;
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
          maxValue={Number(calorieGoal * 7)}
          initialValue={0}
          activeStrokeWidth={15}
          inActiveStrokeWidth={15}
          duration={5000}
          clockwise={true}
          progressValueColor={Colors.text.primary}
          progressValueFontSize={1}
          activeStrokeColor={'#ff2950'}
          inActiveStrokeColor={'#ffd4dc'}
        />
      </View>
    );
  }, [progressRefCalories, calorieGoal, caloriesValue]);

  const renderIntensity = useMemo(() => {
    const safeValue =
      intensityValue > instensityGoal ? instensityGoal : intensityValue;
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
          maxValue={Number(instensityGoal * 7)}
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
  }, [intensityValue, progressRefIntensity, instensityGoal]);

  const renderPoints = useMemo(() => {
    return (
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginTop: 60,
          justifyContent: 'center',
        }}>
        <CircularProgress
          key={`circular-progress-${pointsValue}`}
          value={pointsValue}
          radius={30}
          ref={progressRef}
          maxValue={60}
          initialValue={0}
          activeStrokeWidth={15}
          inActiveStrokeWidth={15}
          duration={5000}
          title={`${earnedPoints} pt`}
          subtitle={`${totalPoints} pt`}
          clockwise={true}
          progressValueColor={Colors.text.primary}
          progressValueFontSize={1}
          activeStrokeColor={'#61d85e'}
          inActiveStrokeColor={'#def7df'}
          titleColor={Colors.text.primary}
          titleStyle={{fontFamily: Fonts.type.bold}}
          subtitleColor={Colors.text.primary}
          subtitleStyle={[
            {
              fontFamily: Fonts.type.medium,
            },
            util.isPlatformAndroid() ? {marginBottom: 20} : {},
          ]}
          titleFontSize={8}
          subtitleFontSize={6}
        />
      </View>
    );
  }, [
    connectedWatchName,
    totalPoints,
    earnedPoints,
    garminData,
    appleData,
    pointsValue,
    progressRef,
  ]);

  return (
    <View
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
            Target : {totalPoints} pts
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
            Earn : {earnedPoints} pts{' '}
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
                color={Colors.black2}
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
                color={Colors.black2}
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
              color={Colors.black2}
              type={Fonts.type.base}
              size={Fonts.size.xxxSmall}
              style={{fontWeight: '500'}}>
              Intensity Minutes
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
