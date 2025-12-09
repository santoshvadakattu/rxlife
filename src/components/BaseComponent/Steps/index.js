import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Images, Metrics} from '../../../theme';
import React, {useEffect, useRef, useState} from 'react';
import Text from '../../Text';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {connectedWatch} from '../../../constants';

export default function Steps(props) {
  const {isActive, isPullToref} = props;
  const {appleData, connectedWatchName, garminData} = useSelector(
    (state) => state.user,
  );
  const [runnnerWidth, setRunnerWIdth] = useState(0);
  const [progressWidth, setProgressWIdth] = useState(0);
  const animatedRunner = useRef(new Animated.Value(50)).current;
  const animatedProgressBar = useRef(new Animated.Value(40)).current;
  const navigate = useNavigation();

  const distance =
    garminData?.walkingDistance > 0 ? garminData?.walkingDistance : 0;

  const walkDuration =
    garminData?.activityDuration > 0
      ? garminData?.activityDuration / (60 * 60)
      : 0;

  const speed =
    distance > 0 && walkDuration > 0 ? (distance / walkDuration).toFixed(2) : 0;

  const feetDistance = 3.28084 * distance ?? 0;

  const stepLength = (feetDistance / (garminData?.steps ?? 1)).toFixed(2) ?? 0;

  const target =
    connectedWatchName == connectedWatch.GRAMIN
      ? garminData?.stepsGoal || 5000
      : 5000;

  useEffect(() => {
    setTimeout(() => {
      const value =
        connectedWatchName == connectedWatch.GRAMIN
          ? garminData?.steps
          : appleData.StepsCount;

      const target =
        connectedWatchName == connectedWatch.GRAMIN
          ? garminData?.stepsGoal || 5000
          : 5000;

      isActive &&
        Animated.timing(animatedRunner, {
          toValue: value
            ? value <= target
              ? Number((value / target) * 100)
              : 100
            : 20,
          delay: 10,
          duration: 2000,
          useNativeDriver: false,
        }).start();

      isActive &&
        Animated.timing(animatedProgressBar, {
          toValue: value
            ? value <= target
              ? Number((value / target) * 100)
              : 100
            : 10,
          delay: 10,
          duration: 2000,
          useNativeDriver: false,
        }).start();
    }, 1000);
  }, [
    isPullToref,
    connectedWatchName,
    garminData?.steps,
    appleData?.StepsCount,
  ]);

  const handleNavigate = () => {
    if (!isActive) return;
    const screenName =
      connectedWatchName == connectedWatch?.GRAMIN
        ? 'activityAllChartGarmin'
        : 'activityAllChart';

    navigate.navigate(screenName);
  };

  const renderProgressBar = () => {
    animatedProgressBar.addListener((progress) => {
      setProgressWIdth(progress.value);
    });
    animatedRunner.addListener((progress) => {
      setRunnerWIdth(progress.value);
    });

    const stepsValue =
      connectedWatchName == connectedWatch.GRAMIN
        ? garminData?.steps
        : appleData.StepsCount;
    return (
      <View
        onLayout={(event) => {
          let {width} = event.nativeEvent.layout;
          // setViewWIdth(width);
        }}>
        <Animated.View
          style={{
            width: `${runnnerWidth}%`,
            marginLeft: runnnerWidth > 10 ? 0 : 30,
          }}>
          <Image
            source={Images.StepsRunner}
            style={[
              {
                width: 44,
                height: 44,
                marginBottom: 5,
                alignSelf: 'flex-end',
              },
              !isActive && {tintColor: Colors.disable},
            ]}
          />
        </Animated.View>
        <View
          style={[
            {
              height: 30,
              width: '100%',
              borderRadius: 22,
              justifyContent: 'center',
            },
            isActive
              ? {backgroundColor: 'rgba(106, 55, 252, 0.2)'}
              : {backgroundColor: 'rgba(155, 155, 155, 0.3)'},
          ]}>
          {isActive && (
            <Animated.View
              style={{
                height: 30,
                width: `${progressWidth}%`,
                borderRadius: 22,
                backgroundColor: '#FF294F',
                justifyContent: 'center',
              }}
            />
          )}
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={10}
            style={styles.stepTotalCount}>
            {isActive ? `${stepsValue ?? 0} / ${target}` : '---'}
          </Text>
        </View>
      </View>
    );
  };

  const renderStepsItem = (image, value, unit, title, imageStyle) => {
    return (
      <View>
        <Image
          source={image}
          style={[
            imageStyle,
            {marginBottom: 5},
            !isActive && {tintColor: Colors.disable},
          ]}
        />
        <Text
          color={isActive ? Colors.black2 : Colors.disable}
          type={Fonts.type.base}
          size={10}
          style={{fontWeight: '500'}}>
          {isActive ? value : '---'} {unit}
        </Text>
        <Text
          color={isActive ? Colors.black2 : Colors.disable}
          type={Fonts.type.base}
          size={9}
          style={{fontWeight: '400'}}>
          {title}
        </Text>
      </View>
    );
  };

  const renderStepsDetail = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {renderStepsItem(
          Images.DistanceIcon,
          garminData?.walkingDistance ?? 0,
          'km',
          'Distance',
          {
            width: 30,
            height: 29,
          },
        )}
        <View style={styles.separaterView} />
        {renderStepsItem(
          Images.FootArrowIcon,
          stepLength ?? '0.0',
          'm',
          ' Step length',
          {
            width: 35,
            height: 29,
          },
        )}
        <View style={styles.separaterView} />

        {renderStepsItem(
          Images.WalkingFoot,
          speed ?? '0.0',
          'km/h',
          'Walking speed',
          {
            width: 38,
            height: 29,
          },
        )}
        <View style={styles.separaterView} />

        {renderStepsItem(
          Images.KcalIcon,
          connectedWatchName == connectedWatch.GRAMIN
            ? garminData?.calories?.calories_value
            : appleData.Calories
            ? appleData.Calories.toFixed(0)
            : 0,
          'kcal',
          ' Fat Burn',
          {
            width: 22,
            height: 29,
          },
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={{
        padding: 15,
        width: '100%',
        height: 237,
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
      }}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={Fonts.size.normal}
          style={{fontWeight: '600'}}>
          Steps
        </Text>

        {renderProgressBar()}
        {renderStepsDetail()}
      </View>
    </TouchableOpacity>
  );
}
