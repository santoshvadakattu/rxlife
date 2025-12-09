import moment from 'moment';
import AppleHealthKit from 'react-native-health';
import util from '../util';
import {updateAppleData} from '../redux/slicers/user';
import {useDispatch} from 'react-redux';

export function useAppleData() {
  const dispatch = useDispatch();

  const getAppleData = async (callback = () => {}) => {
    const permissions = {
      permissions: {
        write: [],
        read: [
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.DistanceCycling,
          AppleHealthKit.Constants.Permissions.DistanceSwimming,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.FlightsClimbed,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.Workout,
          AppleHealthKit.Constants.Permissions.WorkoutRoute,
          AppleHealthKit.Constants.Permissions.HeartRateVariability,
          AppleHealthKit.Constants.Permissions.Vo2Max,
          AppleHealthKit.Constants.Permissions.AppleExerciseTime,
          AppleHealthKit.Constants.Permissions.RestingHeartRate,
        ],
      },
    };

    AppleHealthKit.initHealthKit(permissions, async (error) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }

      callback();

      const options = {
        startDate: moment().format('YYYY-MM-DDT00:00:00.000Z'),
      };

      const payload = {};

      const updateAppleDataFunc = (key, value, shouldCallDispatch = false) => {
        payload[key] = value;

        if (shouldCallDispatch) {
          dispatch(updateAppleData(payload));
        }
      };
      try {
        AppleHealthKit.getRestingHeartRateSamples(
          {
            ...options,
            limit: 1,
            ascending: false,
          },
          (callbackError, results) => {
            payload.heartRate = results?.[0]?.value ?? 0;
            updateAppleDataFunc('heartRate', results?.[0]?.value ?? 0);
            // dispatch(getHeartRate(results?.[0]?.value ?? 0));
            AppleHealthKit.getHeartRateVariabilitySamples(
              {
                ...options,
                ascending: false,
              },
              (callbackError, results) => {
                let val = 0;
                if (results?.length > 0) {
                  let total = 0;
                  for (let res of results) {
                    total += res.value * 1000;
                  }

                  total = total / results.length;
                  total = parseFloat(total?.toFixed(2));
                  val = total;
                }
                payload.hrv = parseFloat(val);
                updateAppleDataFunc('hrv', parseFloat(val));
                // dispatch(getHrv(parseFloat(val)));

                AppleHealthKit.getVo2MaxSamples(
                  {
                    ...options,
                  },
                  (callbackError, results) => {
                    payload.vo2Max = results?.[0]?.value ?? 0;
                    updateAppleDataFunc('vo2Max', results?.[0]?.value ?? 0);

                    AppleHealthKit.getActiveEnergyBurned(
                      options,
                      (callbackError, results) => {
                        if (results?.length > 0) {
                          let finalVal = 0;

                          results?.forEach((item) => {
                            finalVal += item.value;
                          });

                          finalVal = finalVal
                            ? parseFloat(finalVal?.toFixed(2))
                            : 0;

                          payload.Calories = finalVal;
                          updateAppleDataFunc('Calories', finalVal);
                        } else {
                          payload.Calories = 0;
                          updateAppleDataFunc('Calories', 0);
                        }

                        AppleHealthKit.getSleepSamples(
                          {
                            ...options,
                            limit: 1,
                            ascending: true,
                          },
                          (callbackError, results) => {
                            if (!util.isArrayEmpty(results)) {
                              const startDate = new Date(results[0].startDate);
                              const endDate = new Date(results[0].endDate);
                              const durationInMilliseconds =
                                endDate - startDate;
                              const sleepDurationInHours =
                                durationInMilliseconds / (1000 * 60 * 60);

                              payload.SleepHrs = sleepDurationInHours;

                              updateAppleDataFunc(
                                'SleepHrs',
                                sleepDurationInHours,
                              );
                            } else {
                              payload.SleepHrs = 0;
                              updateAppleDataFunc('SleepHrs', 0);
                            }

                            AppleHealthKit.getStepCount(
                              options,
                              (callbackError, results) => {
                                payload.StepsCount = results?.value ?? 0;
                                updateAppleDataFunc(
                                  'StepsCount',
                                  results?.value ?? 0,
                                );

                                AppleHealthKit.getAnchoredWorkouts(
                                  options,
                                  (callbackError, results) => {
                                    console.log(
                                      'getAnchoredWorkouts ==>>',
                                      JSON.stringify(results),
                                    );
                                    let totalDuration = 0;
                                    results?.data?.forEach((item) => {
                                      totalDuration += item.duration;
                                    });

                                    const durationInMinutes =
                                      totalDuration > 0
                                        ? totalDuration / 60
                                        : 0;
                                    payload.Intensity = durationInMinutes;
                                    updateAppleDataFunc(
                                      'Intensity',
                                      durationInMinutes,
                                    );

                                    AppleHealthKit.getDailyFlightsClimbedSamples(
                                      options,
                                      (callbackError, results) => {
                                        payload.FloorClimbed =
                                          results?.[0]?.value ?? 0;
                                        updateAppleDataFunc(
                                          'FloorClimbed',
                                          results?.[0]?.value ?? 0,
                                        );

                                        AppleHealthKit.getDailyDistanceWalkingRunningSamples(
                                          options,
                                          (callbackError, results) => {
                                            payload.Walking =
                                              results?.[0]?.value ?? 0;
                                            updateAppleDataFunc(
                                              'Walking',
                                              results?.[0]?.value ?? 0,
                                            );

                                            AppleHealthKit.getDistanceWalkingRunning(
                                              options,
                                              (callbackError, results) => {
                                                payload.Running =
                                                  results?.value ?? 0;
                                                updateAppleDataFunc(
                                                  'Running',
                                                  results?.value ?? 0,
                                                  true,
                                                );
                                              },
                                            );

                                            console.log({payload});
                                          },
                                        );
                                      },
                                    );
                                  },
                                );
                              },
                            );
                          },
                        );
                      },
                    );
                  },
                );
              },
            );
          },
        );
      } catch (error) {
        console.error('apple Data error- >>');
      }

      // AppleHealthKit.getHeartRateVariabilitySamples(
      //   {
      //     ...options,
      //     ascending: false,
      //   },
      //   (callbackError, results) => {
      //     let val = 0;

      //     if (results?.length > 0) {
      //       let total = 0;
      //       for (let res of results) {
      //         total += res.value * 1000;
      //       }

      //       total = total / results.length;
      //       total = parseFloat(total?.toFixed(2));
      //       val = total;
      //     }
      //     payload.hrv = parseFloat(val);
      //     // dispatch(getHrv(parseFloat(val)));
      //   },
      // );

      // AppleHealthKit.getVo2MaxSamples(
      //   {
      //     ...options,
      //   },
      //   (callbackError, results) => {
      //     payload.vo2Max = results?.[0]?.value ?? 0;
      //     // dispatch(getVo2Max(results?.[0]?.value));
      //   },
      // );

      // AppleHealthKit.getActiveEnergyBurned(
      //   options,
      //   (callbackError, results) => {
      //     if (results?.length > 0) {
      //       let finalVal = 0;

      //       results?.forEach((item) => {
      //         finalVal += item.value;
      //       });

      //       finalVal = finalVal ? parseFloat(finalVal?.toFixed(2)) : 0;

      //       payload.Calories = finalVal;
      //       // dispatch(getCalories(finalVal));
      //     } else {
      //       payload.Calories = 0;
      //       // dispatch(getCalories(0));
      //     }
      //   },
      // );

      // AppleHealthKit.getSleepSamples(
      //   {
      //     ...options,
      //     limit: 1,
      //     ascending: true,
      //   },
      //   (callbackError, results) => {
      //     if (!util.isArrayEmpty(results)) {
      //       const startDate = new Date(results[0].startDate);
      //       const endDate = new Date(results[0].endDate);
      //       const durationInMilliseconds = endDate - startDate;
      //       const sleepDurationInHours =
      //         durationInMilliseconds / (1000 * 60 * 60);
      //       // dispatch(getSleepHrs(sleepDurationInHours));
      //       payload.SleepHrs = sleepDurationInHours;
      //     } else {
      //       payload.SleepHrs = 0;
      //       // dispatch(getSleepHrs(0));
      //     }
      //   },
      // );

      // AppleHealthKit.getStepCount(options, (callbackError, results) => {
      //   payload.StepsCount = results?.value ?? 0;
      //   // dispatch(getStepsCount(results?.value ?? 0));
      // });

      // AppleHealthKit.getAnchoredWorkouts(options, (callbackError, results) => {
      //   console.log('getAnchoredWorkouts ==>>', JSON.stringify(results));
      //   let totalDuration = 0;
      //   results?.data?.forEach((item) => {
      //     totalDuration += item.duration;
      //   });

      //   const durationInMinutes = totalDuration > 0 ? totalDuration / 60 : 0;
      //   payload.Intensity = durationInMinutes;
      //   // dispatch(getIntensity(durationInMinutes));
      // });

      // AppleHealthKit.getDailyFlightsClimbedSamples(
      //   options,
      //   (callbackError, results) => {
      //     payload.FloorClimbed = results?.[0]?.value ?? 0;
      //     // dispatch(getFloorClimbed(results?.[0]?.value ?? 0));
      //   },
      // );
      // AppleHealthKit.getDailyDistanceWalkingRunningSamples(
      //   options,
      //   (callbackError, results) => {
      //     payload.Walking = results?.[0]?.value ?? 0;
      //     // dispatch(getWalking(results?.[0]?.value ?? 0));
      //   },
      // );
      // AppleHealthKit.getDistanceWalkingRunning(
      //   options,
      //   (callbackError, results) => {
      //     payload.Running = results?.value ?? 0;
      //     // dispatch(getRunning(results?.value ?? 0));
      //   },
      // );

      // dispatch(updateAppleData(payload));
    });
  };

  return {getAppleData};
}
