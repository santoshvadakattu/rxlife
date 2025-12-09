import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonView, CustomNavbar, Text, Garmin} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import AppleHealthKit from 'react-native-health';
import styles from './styles';
import util from '../../util';
import {
  connectAppleWatchRequest,
  getCalories,
  getFloorClimbed,
  getHeartRate,
  getRunning,
  getSleepHrs,
  getStepsCount,
  getSwimming,
  getWalking,
  watchConnectedreducer,
} from '../../redux/slicers/user';
import {useAppleData} from '../../hooks/useAppleData';

export default function WatchConnect({route}) {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {getAppleData} = useAppleData();
  const [isGarminLoading, setIsGarminLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fitBitConnected = useSelector((state) => state?.user?.fitBitConnected);
  const garminConnected = useSelector((state) => state?.user?.garminConnected);
  const userData = useSelector((state) => state?.user?.userData);

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title="Watch Connect"
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
      />
    );
  }, []);

  async function getAppleHealthData() {
    // const permissions = {
    //   permissions: {
    //     write: [],
    //     read: [
    //       AppleHealthKit.Constants.Permissions.HeartRate,
    //       AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    //       AppleHealthKit.Constants.Permissions.DistanceCycling,
    //       AppleHealthKit.Constants.Permissions.DistanceSwimming,
    //       AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    //       AppleHealthKit.Constants.Permissions.SleepAnalysis,
    //       AppleHealthKit.Constants.Permissions.StepCount,
    //       AppleHealthKit.Constants.Permissions.Steps,
    //       AppleHealthKit.Constants.Permissions.FlightsClimbed,
    //       AppleHealthKit.Constants.Permissions.SleepAnalysis,
    //       AppleHealthKit.Constants.Permissions.Workout,
    //       AppleHealthKit.Constants.Permissions.WorkoutRoute,
    //     ],
    //   },
    // };

    getAppleData(() => {
      dispatch(
        connectAppleWatchRequest({
          params: userData?.id,
          payloadData: {
            apple_connected: true,
          },
          responseCallback: () => {
            navigate.goBack();
          },
        }),
      );
    });

    // AppleHealthKit.initHealthKit(permissions, (error) => {
    //   if (error) {
    //   }

    //   dispatch(
    //     connectAppleWatchRequest({
    //       params: userData?.id,
    //       payloadData: {
    //         apple_connected: true,
    //       },
    //       responseCallback: () => {},
    //     }),
    //   );

    //   const options = {
    //     startDate: new Date(
    //       new Date().valueOf() - 1000 * 60 * 60 * 24,
    //     ).toISOString(),
    //   };

    //   AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
    //     dispatch(getHeartRate(results[0]?.value));
    //   });
    //   AppleHealthKit.getActiveEnergyBurned(
    //     options,
    //     (callbackError, results) => {
    //       dispatch(getCalories(results[0]?.value));
    //     },
    //   );

    //   AppleHealthKit.getSleepSamples(options, (callbackError, results) => {
    //     if (!util.isArrayEmpty(results)) {
    //       const startDate = new Date(results[0].startDate);
    //       const endDate = new Date(results[0].endDate);
    //       const durationInMilliseconds = endDate - startDate;
    //       const sleepDurationInHours =
    //         durationInMilliseconds / (1000 * 60 * 60);

    //       dispatch(getSleepHrs(sleepDurationInHours));
    //     } else {
    //       dispatch(getSleepHrs(0));
    //     }
    //   });

    //   AppleHealthKit.getDailyDistanceSwimmingSamples(
    //     options,
    //     (callbackError, results) => {
    //       dispatch(getSwimming(results[0]?.value));
    //     },
    //   );
    //   AppleHealthKit.getDailyStepCountSamples(
    //     {
    //       date: new Date(
    //         new Date().valueOf() - 1000 * 60 * 60 * 24,
    //       ).toISOString(),
    //     },
    //     (callbackError, results) => {
    //       if (!util.isArrayEmpty(results))
    //         dispatch(getStepsCount(results[0]?.value));
    //     },
    //   );
    //   AppleHealthKit.getDailyFlightsClimbedSamples(
    //     options,
    //     (callbackError, results) => {
    //       dispatch(getFloorClimbed(results[0]?.value));
    //     },
    //   );
    //   AppleHealthKit.getDailyDistanceWalkingRunningSamples(
    //     options,
    //     (callbackError, results) => {
    //       dispatch(getWalking(results[0]?.value));
    //     },
    //   );
    //   AppleHealthKit.getDistanceWalkingRunning(
    //     options,
    //     (callbackError, results) => {
    //       dispatch(getRunning(results?.value));
    //     },
    //   );
    //   AppleHealthKit.getAnchoredWorkouts(options, (callbackError, results) => {
    //     // dispatch(getRunning(results?.value));
    //   });

    // });
  }

  const renderApple = () => {
    return (
      <ButtonView
        onPress={() => {
          // navigate.goBack();
          getAppleHealthData();
        }}
        style={styles.individualView}>
        <View style={styles.innerView}>
          <View style={styles.appleView}>
            <Image source={Images.Apple} style={{width: 19, height: 23}} />
          </View>
          <Text
            color={Colors.white}
            type={Fonts.type.base}
            size={Fonts.size.xSmall}
            style={{fontWeight: '400', marginLeft: 15, color: Colors.black}}>
            Connect with Apple
          </Text>
        </View>
      </ButtonView>
    );
  };
  const renderWhoop = () => {
    return (
      <ButtonView
        onPress={() => {
          navigate.goBack();
        }}
        style={styles.individualView}>
        <View style={styles.innerView}>
          <View style={styles.appleView}>
            <Image source={Images.WhoopIcon} />
          </View>
          <Text
            color={Colors.white}
            type={Fonts.type.base}
            size={Fonts.size.xSmall}
            style={{fontWeight: '400', marginLeft: 15, color: Colors.black}}>
            Whoop
          </Text>
        </View>
      </ButtonView>
    );
  };
  const renderFitbit = () => {
    return (
      <ButtonView
        onPress={() => {
          navigate.goBack();
        }}
        style={styles.individualView}>
        <View style={styles.innerView}>
          <View style={styles.appleView}>
            <Image source={Images.FitbitIcon} />
          </View>
          <Text
            color={Colors.white}
            type={Fonts.type.base}
            size={Fonts.size.xSmall}
            style={{fontWeight: '400', marginLeft: 15, color: Colors.black}}>
            Fitbit
          </Text>
        </View>
      </ButtonView>
    );
  };

  return (
    <View style={styles.container}>
      {renderCustomNav}
      <View style={{flex: 1, width: '100%', marginTop: 15}}>
        {!util.isPlatformAndroid() && renderApple()}
        <Garmin
          handleSuccess={() => {}}
          fitBitConnected={fitBitConnected}
          garminConnected={garminConnected}
          setShowModal={setShowModal}
          garminLoading={isGarminLoading}
          isFitBitLoading={false}
          setGarminLoading={setIsGarminLoading}
        />
        {renderWhoop()}
        {renderFitbit()}
      </View>
    </View>
  );
}
