import {createSlice} from '@reduxjs/toolkit';
import util, {convetStringToObject} from '../../util';
import {
  manipulateUserDataFromGetUser,
  manipulateUserDataFromProfileSetup,
  manipulateUserProfileFromGetUser,
  manipulateUserProfileFromProfileSetup,
} from '../../Helper/userMainpulator';
import moment from 'moment';
import {connectedWatch} from '../../constants';

const CommentsReducer = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    userProfile: {},
    userGoal: {},
    data: {},
    token: '',
    forLoginToken: '',
    isCardAdded: false,
    garminConnected: false,
    isWatchConnected: false,
    garminData: {},
    appleData: {},
    connectedWatchName: '',
    garminToken: {
      key: '',
      secret: '',
    },
    dailyPoints: {
      total: 0,
      earned: 0,
    },
    quotes: [],
  },
  reducers: {
    getUser(state, action) {
      state.userData = action.payload;
    },

    loginUserRequest(state) {
      const token = util.cloneDeep(state.token);
      state.forLoginToken = token;
    },

    logoutUserRequest(state) {
      state.forLoginToken = '';
      state.userData = {};
      state.userProfile = {};
      state.userGoal = {};
      state.data = {};
      state.token = '';
      state.isCardAdded = false;
      state.garminConnected = false;
      state.isWatchConnected = false;
      state.garminData = {};
      state.appleData = {};
      state.connectedWatchName = '';
      state.garminToken = {
        key: '',
        secret: '',
      };
    },

    loginRequest() {},
    loginSuccess(state, action) {
      state.userData = {
        ...action.payload.user,
        chatUserId: action.payload.user?.chat_user_id,
      };
      // state.forLoginToken = action.payload.jwt;
      state.token = action.payload.jwt;
    },
    signUpRequest() {},
    signUpSuccess(state, action) {
      state.userData = action.payload.user;
      state.token = action.payload.jwt;
    },

    getOtpTokenRequest() {},
    confirmOtpRequest() {},
    getUserDataRequest() {},
    getUserDataSuccess(state, action) {
      state.userData = manipulateUserDataFromGetUser(action.payload);
      state.userProfile = manipulateUserProfileFromGetUser(action.payload);
      const tokenKey = action?.payload?.garmin?.token_key;
      const tokenSecret = action?.payload?.garmin?.token_secret;

      state.garminToken = {
        key: action?.payload?.garmin?.token_key,
        secret: action.payload?.garmin?.token_secret,
        id: action.payload?.garmin?.id,
      };

      if (tokenKey && tokenSecret) {
        state.isWatchConnected = true;
        state.connectedWatchName = connectedWatch.GRAMIN;
      } else if (
        action?.payload?.apple_connected &&
        !util.isPlatformAndroid()
      ) {
        state.isWatchConnected = true;
        state.connectedWatchName = connectedWatch.APPLE;
      }
    },
    resetPasswordRequest() {},
    changePasswordRequest() {},
    updatePasswordRequest() {},
    uploadMediaRequest() {},
    updateProfileRequest() {},
    profileSetUpRequest() {},
    updateProfileSetUpRequest() {},
    updateProfileSetUpSuccess(state, action) {
      state.userData = manipulateUserDataFromProfileSetup(action.payload);
      state.userProfile = manipulateUserProfileFromProfileSetup(action.payload);
    },
    getAllGoalsRequest() {},
    getUserGoalsRequest() {},
    getUserGoalsSuccess(state, action) {
      state.userGoal = action.payload;
    },
    addUserGoalsRequest() {},
    setCardDetail(state, action) {
      state.isCardAdded = action.payload;
    },
    appleLoginRequest() {},
    appleLoginSuccess(state, action) {
      state.token = action.payload.jwt;
    },

    // garmin

    getGarminUserInfoRequest() {},
    getGarminUserInfoSuccess() {},

    getGarminUserPermissionsRequest() {},
    getGarminUserPermissionsSuccess() {},

    createGarminUserRequest() {},
    testingRequest() {},
    createGarminUserSuccess(state, action) {
      // state.data.user.garmin = {
      //   ...action.payload.attributes,
      //   id: action.payload?.id,
      // };
      state.isWatchConnected = true;
      state.connectedWatchName = connectedWatch.GRAMIN;
      state.garminToken = {
        id: action.payload?.id,
        key: action.payload.attributes?.token_key,
        secret: action.payload.attributes?.token_secret,
      };
    },

    getGarminDailyDataRequest() {},
    getGarminDailyDataSuccess(state, action) {
      const garminData = {...state.garminData};
      const response = [...action.payload];

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
              garminData.swimmingDistannce = SWIMMING_DATA?.[0]
                ?.distanceInMeters
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
            state.garminData = {...garminData};
          } else {
            state.garminData = {
              updated: moment(),
            };
          }
        } else {
          state.garminData = {
            updated: moment(),
          };
        }
      } catch (error) {
        console.error('getGarminDailyDataSuccess error ==>>>', error);
      }
    },

    getGarminSleepDataRequest() {},
    getGarminSleepDataSuccess(state, action) {
      const response = action.payload;

      if (response?.length > 0) {
        const todayDate = moment().local(true).format('YYYY-MM-DD');
        const todayData = response?.filter(
          (a) => a?.calendarDate === todayDate,
        );

        if (todayData.length > 0) {
          todayData?.sort(
            (a, b) => a?.durationInSeconds - b?.durationInSeconds,
          );

          const payload = todayData?.[todayData?.length - 1];

          const garminData = {...state.garminData};
          const sleep = {...garminData?.sleep};
          sleep.sleep_value = (payload?.durationInSeconds / (60 * 60)).toFixed(
            2,
          );
          sleep.sleep_target = 480;
          garminData.sleep = sleep;
          state.garminData = garminData;
        } else {
          state.garminData = {
            ...state.garminData,
            sleep: {
              sleep_value: 0,
            },
          };
        }
      } else {
        state.garminData = {
          ...state.garminData,
          sleep: {
            sleep_value: 0,
          },
        };
      }
    },

    getGarminHrvDataRequest() {},
    getGarminHrvDataSuccess(state, action) {
      const garminData = {...state.garminData};
      const response = action.payload;

      if (response?.length > 0) {
        const todayDate = moment().local(true).format('YYYY-MM-DD');
        const todayData = response?.filter(
          (a) => a?.calendarDate === todayDate,
        );

        if (todayData.length > 0) {
          todayData?.sort(
            (a, b) => a?.durationInSeconds - b?.durationInSeconds,
          );

          const payload = todayData?.[todayData?.length - 1];
          const dataObj = convetStringToObject(payload?.hrvValues);
          const values = Object.values(dataObj);
          const average = values.reduce((a, b) => a + b, 0) / values.length;

          garminData.hrv = average ? parseFloat(average?.toFixed(2)) : average;
          state.garminData = garminData;
        }
      }
    },

    getGarminVo2MaxDataRequest() {},
    getGarminVo2MaxDataSuccess(state, action) {
      const garminData = {...state.garminData};

      const response = action.payload;

      if (response?.length > 0) {
        const todayDate = moment().local(true).format('YYYY-MM-DD');
        const todayData = response?.filter(
          (a) => a?.calendarDate === todayDate,
        );

        if (todayData.length > 0) {
          todayData?.sort(
            (a, b) => a?.durationInSeconds - b?.durationInSeconds,
          );

          const payload = todayData?.[todayData?.length - 1];
          garminData.vo2Max = payload?.vo2Max ?? 0;
          state.garminData = garminData;
        }
      }
    },

    updateGarminData(state, action) {
      state.garminData = action.payload;
    },

    deleteGarminUserRequest() {},
    deleteGarminUserSuccess(state) {
      state.garminConnected = false;
      state.garminToken = null;
      state.isWatchConnected = false;
    },

    getGarminSleepRangeDataRequest() {},
    getGarminDailyRangeDataRequest() {},
    getGarminHrvRangeDataRequest() {},
    getGarminVo2MaxRangeDataRequest() {},

    /// apple watch

    getHeartRate(state, action) {
      state.appleData.heartRate = action.payload;
    },
    getHrv(state, action) {
      state.appleData.hrv = action.payload;
    },
    getSleepHrs(state, action) {
      state.appleData.SleepHrs = action.payload;
    },
    getStepsCount(state, action) {
      state.appleData.StepsCount = action.payload;
    },
    getFloorClimbed(state, action) {
      state.appleData.FloorClimbed = action.payload;
    },
    getRunning(state, action) {
      state.appleData.Running = action.payload;
    },
    getIntensity(state, action) {
      state.appleData.Intensity = action.payload;
    },
    getVo2Max(state, action) {
      state.appleData.vo2Max = action.payload;
    },
    getWalking(state, action) {
      state.appleData.Walking = action.payload;
    },
    getSwimming(state, action) {
      state.appleData.Swimming = action.payload;
    },
    getPushUps(state, action) {
      state.appleData.pushUps = action.payload;
    },
    getCalories(state, action) {
      state.appleData.Calories = action.payload;
    },

    updateAppleData(state, action) {
      state.appleData = action.payload;
    },

    watchConnectedreducer(state, action) {
      state.isWatchConnected = action.payload;
      if (action.payload) {
        state.connectedWatchName = 'apple';
      } else {
        state.connectedWatchName = '';
      }
    },

    getDailyPointsRequest() {},
    getDailyPointsSuccess(state, action) {
      state.dailyPoints = {
        total: action.payload?.total ?? 0,
        earned: action.payload?.earned ?? 0,
      };
    },

    getWeeklyPointsRequest() {},

    getStatisticsRequest() {},
    getStatisticsSuccess() {},

    addActiveDayCountRequest() {},

    getGraphViewRequest() {},
    getGraphViewSuccess() {},

    updateUserRequest() {},
    updateUserSuccess(state) {
      state.userData = {
        ...state.userData,
        isDeleted: true,
      };
    },

    sendWatchDataRequest() {},
    sendWatchDataSuccess() {},

    updateUserNotificationSettingRequest() {},
    updateUserNotificationSettingSuccess(state, action) {
      state.userData = {
        ...action.payload,
      };
    },

    updateDeviceTokenRequest() {},
    updateDeviceTokenSuccess() {},

    deleteDeviceTokenRequest() {},

    // NOTIFICATION COUNT

    notificationCountIncrease(state) {
      state.userData = {
        ...state.userData,
        notificationCount: state.userData?.notificationCount + 1,
      };
    },

    resetNotificationCountRequest() {},
    resetNotificationCountSuccess(state, action) {
      state.userData = {
        ...state.userData,
        notificationCount: 0,
      };
    },

    connectAppleWatchRequest() {},
    connectAppleWatchSuccess(state, action) {
      const payload = action?.payload;

      if (payload?.apple_connected) {
        state.isWatchConnected = true;
        state.connectedWatchName = connectedWatch.APPLE;
      } else {
        state.isWatchConnected = false;
        state.connectedWatchName = '';
      }
    },

    getQuotesRequest() {},
    getQuotesSuccess(state, action) {
      state.quotes = action.payload;
    },

    setTargetValue(state, action) {
      const {targetValue, calorieGoal, stepsGoal, instensityGoal} =
        action.payload || {};
      if (targetValue === 'calorie') {
        state.userData = {
          ...state.userData,
          calorieGoal: calorieGoal,
        };
      } else if (targetValue === 'steps') {
        state.userData = {
          ...state.userData,
          stepsGoal: stepsGoal,
        };
      } else if (targetValue === 'intensity') {
        state.userData = {
          ...state.userData,
          instensityGoal: instensityGoal,
        };
      }
    },
  },
});

export const {
  getUser,
  setCardDetail,
  loginUserRequest,
  logoutUserRequest,
  loginRequest,
  loginSuccess,
  signUpRequest,
  signUpSuccess,
  getOtpTokenRequest,
  confirmOtpRequest,
  getUserDataRequest,
  getUserDataSuccess,
  resetPasswordRequest,
  changePasswordRequest,
  updatePasswordRequest,
  uploadMediaRequest,
  updateProfileRequest,
  profileSetUpRequest,
  getAllGoalsRequest,
  addUserGoalsRequest,
  updateProfileSetUpRequest,
  updateProfileSetUpSuccess,
  getUserGoalsRequest,
  getUserGoalsSuccess,

  appleLoginRequest,
  appleLoginSuccess,
  // garmin
  getGarminUserInfoRequest,
  getGarminUserInfoSuccess,

  createGarminUserRequest,
  createGarminUserSuccess,
  testingRequest,

  getGarminDailyDataRequest,
  getGarminDailyDataSuccess,

  getGarminSleepDataRequest,
  getGarminSleepDataSuccess,

  getGarminHrvDataRequest,
  getGarminHrvDataSuccess,

  getGarminVo2MaxDataRequest,
  getGarminVo2MaxDataSuccess,

  updateGarminData,

  deleteGarminUserRequest,
  deleteGarminUserSuccess,

  getGarminUserPermissionsRequest,
  getGarminUserPermissionsSuccess,

  getGarminSleepRangeDataRequest,
  getGarminHrvRangeDataRequest,
  getGarminDailyRangeDataRequest,
  getGarminVo2MaxRangeDataRequest,
  getHeartRateDataRequest,
  getHeartRateDataSuccess,

  getHeartRateRangeDataRequest,
  // apple watch

  getHeartRate,
  getCalories,
  getFloorClimbed,
  getPushUps,
  getRunning,
  getSleepHrs,
  getStepsCount,
  getSwimming,
  getWalking,

  watchConnectedreducer,

  getDailyPointsRequest,
  getDailyPointsSuccess,

  getWeeklyPointsRequest,

  getStatisticsRequest,
  getStatisticsSuccess,
  addActiveDayCountRequest,

  getGraphViewRequest,
  getGraphViewSuccess,

  updateUserRequest,
  updateUserSuccess,

  sendWatchDataRequest,
  sendWatchDataSuccess,

  updateUserNotificationSettingRequest,
  updateUserNotificationSettingSuccess,

  updateDeviceTokenRequest,
  updateDeviceTokenSuccess,

  deleteDeviceTokenRequest,

  notificationCountIncrease,

  resetNotificationCountRequest,
  resetNotificationCountSuccess,

  connectAppleWatchRequest,
  connectAppleWatchSuccess,

  getQuotesRequest,
  getQuotesSuccess,
  getIntensity,
  getHrv,
  getVo2Max,

  updateAppleData,

  setTargetValue,
} = CommentsReducer.actions;

export default CommentsReducer.reducer;
