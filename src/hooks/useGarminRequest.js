import {
  GET_GARMIN_HRV_DATA,
  GET_GARMIN_DAILY_DATA,
  GET_GARMIN_SLEEP_DATA,
  GET_GARMIN_VO2MAX_DATA,
} from '../config/WebService';
import {Oauth1Helper} from './oauth';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {
  getGarminHrvDataRequest,
  getGarminDailyDataRequest,
  getGarminSleepDataRequest,
  getGarminVo2MaxDataRequest,
  updateGarminData,
} from '../redux/slicers/user';
import _ from 'lodash';
import {convetStringToObject} from '../util';

function useGarminRequest() {
  const dispatch = useDispatch();

  const getGarminDailyDataSuccess = (res) => {
    let garminData = {};
    const response = [...res];

    try {
      if (response?.length > 0) {
        const todayDate = moment().local(true).format('YYYY-MM-DD');
        const todayData = response?.filter(
          (a) => a?.calendarDate === todayDate,
        );

        if (todayData?.length > 0) {
          todayData?.sort(
            (a, b) => a?.durationInSeconds - b?.durationInSeconds,
          );

          const WALKING_DATA = todayData?.filter(
            (item) => item?.activityType === 'GENERIC',
          );

          const RUNNING_DATA = todayData?.filter(
            (item) => item?.activityType === 'RUNNING',
          );

          const SWIMMING_DATA = todayData?.filter(
            (item) => item?.activityType === 'SWIMMING',
          );

          if (WALKING_DATA?.length > 0) {
            garminData.walkingDistance = WALKING_DATA?.[0]?.distanceInMeters
              ? WALKING_DATA?.[0]?.distanceInMeters / 1000
              : 0;
            garminData.activityDuration =
              WALKING_DATA?.[0]?.activeTimeInSeconds;
          }

          if (RUNNING_DATA?.length > 0) {
            garminData.runningDistance = RUNNING_DATA?.[0]?.distanceInMeters
              ? RUNNING_DATA?.[0]?.distanceInMeters / 1000
              : 0;
          }

          if (SWIMMING_DATA?.length > 0) {
            garminData.swimmingDistannce = SWIMMING_DATA?.[0]?.distanceInMeters
              ? SWIMMING_DATA?.[0]?.distanceInMeters
              : 0;
          }

          const payload = todayData?.[todayData?.length - 1];
          // const payload = action?.payload?.[0];
          garminData.steps = payload?.steps ?? 0;
          // garminData.steps = 2500 ?? 0;
          garminData.floorsClimbed = payload?.floorsClimbed ?? 0;
          garminData.stepsGoal = payload?.stepsGoal ?? 0;
          const calories = {...garminData.calories};
          calories.calories_value = payload?.activeKilocalories ?? 0;
          calories.calories_target = 2500;
          garminData.calories = calories;
          garminData.restingHeartRate =
            payload?.restingHeartRateInBeatsPerMinute ?? 0;

          const intensity =
            payload?.moderateIntensityDurationInSeconds +
            payload?.vigorousIntensityDurationInSeconds * 2;

          garminData.intensity = intensity ? parseInt(intensity / 60) : 0;

          garminData.updated = moment();
        } else {
          garminData = {
            updated: moment(),
          };
        }
      } else {
        garminData = {
          updated: moment(),
        };
      }
    } catch (error) {
      console.error('getGarminDailyDataSuccess error ==>>>', error);
    }

    return garminData;
  };

  const getGarminSleepDataSuccess = (res) => {
    const response = res;
    let garminData = {};
    console.log({response});

    if (response?.length > 0) {
      const todayDate = moment().local(true).format('YYYY-MM-DD');
      const todayData = response?.filter((a) => a?.calendarDate === todayDate);

      if (todayData.length > 0) {
        todayData?.sort((a, b) => a?.durationInSeconds - b?.durationInSeconds);

        const payload = todayData?.[todayData?.length - 1];

        const sleep = {};
        sleep.sleep_value = (payload?.durationInSeconds / (60 * 60)).toFixed(2);
        sleep.sleep_target = 480;
        garminData.sleep = sleep;
      } else {
        garminData = {
          sleep: {
            sleep_value: 0,
          },
        };
      }
    }

    return garminData;
  };

  const getGarminHrvDataSuccess = (res) => {
    let garminData = {};
    const response = res;

    if (response?.length > 0) {
      const todayDate = moment().local(true).format('YYYY-MM-DD');
      const todayData = response?.filter((a) => a?.calendarDate === todayDate);

      if (todayData.length > 0) {
        todayData?.sort((a, b) => a?.durationInSeconds - b?.durationInSeconds);

        const payload = todayData?.[todayData?.length - 1];
        const dataObj = convetStringToObject(payload?.hrvValues);
        const values = Object.values(dataObj);
        const average = values.reduce((a, b) => a + b, 0) / values.length;

        garminData.hrv = average ? parseFloat(average?.toFixed(2)) : average;
      }
    }

    return garminData;
  };

  const getGarminVo2MaxDataSuccess = (res) => {
    let garminData = {};
    const response = res;

    if (response?.length > 0) {
      const todayDate = moment().local(true).format('YYYY-MM-DD');
      const todayData = response?.filter((a) => a?.calendarDate === todayDate);

      if (todayData.length > 0) {
        todayData?.sort((a, b) => a?.durationInSeconds - b?.durationInSeconds);

        const payload = todayData?.[todayData?.length - 1];
        garminData.vo2Max = payload?.vo2Max ?? 0;
      }
    }

    return garminData;
  };

  const getAllGarminData = (token, callback = () => {}) => {
    if (_.isEmpty(token)) {
      callback();
      return;
    }
    const todayCurrentTime = parseInt(
      new Date(moment().local(true)).getTime() / 1000,
    );
    const todayStartTime = parseInt(
      new Date(
        moment().local(true).format('YYYY-MM-DD') + 'T00:00:00',
      ).getTime() / 1000,
    );

    const requestUrl = {
      ...GET_GARMIN_DAILY_DATA,
      url: `${GET_GARMIN_DAILY_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
    };
    const headers = Oauth1Helper.getAuthHeaderForRequest(requestUrl, token);
    let finalGarminData = {};

    dispatch(
      getGarminDailyDataRequest({
        payloadData: {
          headers: {...headers},
          params: {
            uploadStartTimeInSeconds: todayStartTime,
            uploadEndTimeInSeconds: todayCurrentTime,
          },
        },
        responseCallback: (status, data) => {
          if (status) {
            const _res = getGarminDailyDataSuccess(data);
            finalGarminData = {...finalGarminData, ..._res};
          }
          const requestUrl1 = {
            ...GET_GARMIN_SLEEP_DATA,
            url: `${GET_GARMIN_SLEEP_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
          };
          const headers1 = Oauth1Helper.getAuthHeaderForRequest(
            requestUrl1,
            token,
          );

          dispatch(
            getGarminSleepDataRequest({
              payloadData: {
                headers: {...headers1},
                params: {
                  uploadStartTimeInSeconds: todayStartTime,
                  uploadEndTimeInSeconds: todayCurrentTime,
                },
              },

              responseCallback: (status, data) => {
                if (status) {
                  const _res = getGarminSleepDataSuccess(data);
                  finalGarminData = {...finalGarminData, ..._res};
                }

                const requestUrl1 = {
                  ...GET_GARMIN_HRV_DATA,
                  url: `${GET_GARMIN_HRV_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
                };
                const headers1 = Oauth1Helper.getAuthHeaderForRequest(
                  requestUrl1,
                  token,
                );

                dispatch(
                  getGarminHrvDataRequest({
                    payloadData: {
                      headers: {...headers1},
                      params: {
                        uploadStartTimeInSeconds: todayStartTime,
                        uploadEndTimeInSeconds: todayCurrentTime,
                      },
                    },
                    responseCallback: (status, data) => {
                      if (status) {
                        const _res = getGarminHrvDataSuccess(data);
                        finalGarminData = {...finalGarminData, ..._res};
                      }

                      const requestUrl1 = {
                        ...GET_GARMIN_VO2MAX_DATA,
                        url: `${GET_GARMIN_VO2MAX_DATA.url}?uploadStartTimeInSeconds=${todayStartTime}&uploadEndTimeInSeconds=${todayCurrentTime}`,
                      };
                      const headers1 = Oauth1Helper.getAuthHeaderForRequest(
                        requestUrl1,
                        token,
                      );

                      dispatch(
                        getGarminVo2MaxDataRequest({
                          payloadData: {
                            headers: {...headers1},
                            params: {
                              uploadStartTimeInSeconds: todayStartTime,
                              uploadEndTimeInSeconds: todayCurrentTime,
                            },
                          },
                          responseCallback: (status, data) => {
                            if (status) {
                              const _res = getGarminVo2MaxDataSuccess(data);
                              finalGarminData = {...finalGarminData, ..._res};
                            }

                            dispatch(updateGarminData(finalGarminData));

                            callback();
                          },
                        }),
                      );
                    },
                  }),
                );
              },
            }),
          );
        },
      }),
    );
  };

  return {getAllGarminData};
}

export default useGarminRequest;
