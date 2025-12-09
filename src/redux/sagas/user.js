import {take, put, call, fork, takeEvery, takeLatest} from 'redux-saga/effects';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import {
  ADD_ACTIVE_DAY,
  ADD_GOALS,
  APPLE_LOGIN,
  CHANGE_PASSWORD,
  CONFIRM_OTP,
  CREATE_GARMIN_USER,
  DELETE_GARMIN_USER,
  DELETE_TOKEN,
  ERROR_SOMETHING_WENT_WRONG,
  GARMIN_BASE_URL,
  GET_ALL_GOALS,
  GET_DAILY_POINTS,
  GET_GARMIN_HRV_DATA,
  GET_GARMIN_DAILY_DATA,
  GET_GARMIN_SLEEP_DATA,
  GET_GARMIN_VO2MAX_DATA,
  GET_GARMIN_USER_INFO,
  GET_GARMIN_USER_PERMISSIONS,
  GET_OTP_TOKEN,
  GET_QUOTES,
  GET_STATISTICS,
  GET_USER_GOALS,
  GET_USER_INFO,
  GET_WEEKLY_POINTS,
  PROFILE_SETUP,
  RESET_PASSWORD,
  SEND_WATCH_DATA,
  STATS_GRAPH_VIEW,
  UPDATE_PASSWORD,
  UPDATE_PROFILE_SETUP,
  UPDATE_TOKEN,
  UPDATE_USER,
  UPLOAD_MEDIA,
  USER_SIGNIN,
  USER_SIGNUP,
  callRequest,
} from '../../config/WebService';
import ApiSauce from '../../services/ApiSauce';
import Util from '../../util';
import {
  addActiveDayCountRequest,
  addUserGoalsRequest,
  appleLoginRequest,
  appleLoginSuccess,
  changePasswordRequest,
  confirmOtpRequest,
  connectAppleWatchRequest,
  connectAppleWatchSuccess,
  createGarminUserRequest,
  createGarminUserSuccess,
  deleteDeviceTokenRequest,
  deleteGarminUserRequest,
  deleteGarminUserSuccess,
  getAllGoalsRequest,
  getDailyPointsRequest,
  getDailyPointsSuccess,
  getGarminHrvDataRequest,
  getGarminHrvDataSuccess,
  getGarminHrvRangeDataRequest,
  getGarminDailyDataRequest,
  getGarminDailyDataSuccess,
  getGarminDailyRangeDataRequest,
  getGarminSleepDataRequest,
  getGarminSleepDataSuccess,
  getGarminSleepRangeDataRequest,
  getGarminVo2MaxDataRequest,
  getGarminVo2MaxDataSuccess,
  getGarminVo2MaxRangeDataRequest,
  getGarminUserInfoRequest,
  getGarminUserPermissionsRequest,
  getGraphViewRequest,
  getOtpTokenRequest,
  getQuotesRequest,
  getQuotesSuccess,
  getStatisticsRequest,
  getUserDataRequest,
  getUserDataSuccess,
  getUserGoalsRequest,
  getUserGoalsSuccess,
  getWeeklyPointsRequest,
  loginRequest,
  loginSuccess,
  profileSetUpRequest,
  resetNotificationCountRequest,
  resetNotificationCountSuccess,
  resetPasswordRequest,
  sendWatchDataRequest,
  sendWatchDataSuccess,
  signUpRequest,
  signUpSuccess,
  updateDeviceTokenRequest,
  updateDeviceTokenSuccess,
  updatePasswordRequest,
  updateProfileRequest,
  updateProfileSetUpRequest,
  updateProfileSetUpSuccess,
  updateUserNotificationSettingRequest,
  updateUserNotificationSettingSuccess,
  updateUserRequest,
  updateUserSuccess,
  uploadMediaRequest,
} from '../slicers/user';
import util from '../../util';
import {getPaymentMethods} from '../slicers/payment';
import {
  manipulateUserDataFromGetUser,
  quoteManipulator,
} from '../../Helper/userMainpulator';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signin() {
  while (true) {
    const {payload} = yield take(loginRequest.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        if (response?.user?.isDeleted) {
          util.topAlertError(
            'The account linked to this email has been deactivated. Kindly use the new email.',
          );
          responseCallback && responseCallback(false, null);
        } else {
          yield put(loginSuccess(response));
          responseCallback && responseCallback(true, response);
          util.topAlert(response.message, 'success');
        }
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
        util.topAlertError(error?.error?.message, 'error');
      }
    } catch (error) {
      util.topAlertError(error?.error?.message, 'error');
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* appleLogin() {
  while (true) {
    const {payload} = yield take(appleLoginRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...APPLE_LOGIN,
      route: APPLE_LOGIN?.route?.replace(
        ':authorizationCode',
        payloadData?.authorizationCode,
      ),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData.data,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        if (!response?.user?.isDeleted) {
          yield put(appleLoginSuccess(response));
          responseCallback && responseCallback(true, response);
        } else {
          util.topAlertError(
            'The account linked to this email has been deactivated. Kindly use the new email.',
          );
          responseCallback(false, response);
        }
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('appleLogin error ==>>', error);
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* signup() {
  while (true) {
    const {payload} = yield take(signUpRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      if (response) {
        if (response?.user?.isDeleted) {
          util.topAlertError(
            'The account linked to this email has been deactivated. Kindly use the new email.',
          );
          responseCallback && responseCallback(false, null);
        } else {
          yield put(signUpSuccess(response));
          responseCallback && responseCallback(true, response);
          util.topAlert(response.message, 'success');
        }
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getOtp() {
  while (true) {
    const {payload} = yield take(getOtpTokenRequest?.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        GET_OTP_TOKEN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
        responseCallback &&
          responseCallback(true, response?.message, response?.otp);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      util.topAlertError(error?.error?.message, 'error');
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* confirmOtp() {
  while (true) {
    const {payload} = yield take(confirmOtpRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CONFIRM_OTP,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      util.topAlertError(error?.error?.message, 'error');
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getUserData() {
  while (true) {
    const {payload} = yield take(getUserDataRequest.type);
    const {responseCallback, payloadData} = payload;

    const url = {
      ...GET_USER_INFO,
      route: GET_USER_INFO?.route?.replace(':userId', payloadData?.userId),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);

      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(getUserDataSuccess(response));
        yield put(getPaymentMethods(response));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      // util.topAlertError(error?.error?.message);
    }
  }
}

function* resetPassword() {
  while (true) {
    const {payload} = yield take(resetPasswordRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* changePassword() {
  while (true) {
    const {payload} = yield take(changePasswordRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.user) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* updatePassword() {
  while (true) {
    const {payload} = yield take(updatePasswordRequest?.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        UPDATE_PASSWORD,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        responseCallback && responseCallback(true, response?.message);
        util.topAlert(response?.data?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      util.topAlertError(error?.error?.message, 'error');
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* uploadMedia() {
  while (true) {
    const {payload} = yield take(uploadMediaRequest?.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        UPLOAD_MEDIA,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* profileSetUp() {
  while (true) {
    const {payload} = yield take(profileSetUpRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        PROFILE_SETUP,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* updateProfileSetUp() {
  while (true) {
    const {payload} = yield take(updateProfileSetUpRequest?.type);
    const {payloadData, responseCallback} = payload;

    const url = {
      ...UPDATE_PROFILE_SETUP,
      route: UPDATE_PROFILE_SETUP?.route?.replace(
        ':userProfileId',
        payloadData?.userProfileId,
      ),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData.data,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(updateProfileSetUpSuccess(response));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('updateProfileSetUp error ==>>', error);
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* getAllGoals() {
  while (true) {
    const {payload} = yield take(getAllGoalsRequest?.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        GET_ALL_GOALS,
        {},
        '',
        {},
        '',
        ApiSauce,
      );
      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* getUserGoals() {
  while (true) {
    const {payload} = yield take(getUserGoalsRequest?.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_USER_GOALS,
      route: GET_USER_GOALS?.route?.replace(':userId', payloadData?.userId),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);

      if (response) {
        responseCallback && responseCallback(true, response.data);
        yield put(getUserGoalsSuccess(response.data));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* addUserGoals() {
  while (true) {
    const {payload} = yield take(addUserGoalsRequest?.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...ADD_GOALS,
      route: ADD_GOALS?.route?.replace(':userId', payloadData?.userId),
    };
    try {
      const response = yield call(
        callRequest,
        url,
        payloadData.data,
        '',
        {},
        '',
        ApiSauce,
      );
      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getGarminUserInfo() {
  while (true) {
    const {payload} = yield take(getGarminUserInfoRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers} = payloadData;

    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_USER_INFO,
        {},
        '',
        {...headers},
        '',
        ApiSauce,
        GARMIN_BASE_URL,
      );

      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminUserInfo error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminUserPermissions() {
  while (true) {
    const {payload} = yield take(getGarminUserPermissionsRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers} = payloadData;

    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_USER_PERMISSIONS,
        {},
        '',
        {...headers},
        '',
        ApiSauce,
        GARMIN_BASE_URL,
      );

      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminUserPermissions error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}
function* createGarminUser() {
  while (true) {
    const {payload} = yield take(createGarminUserRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CREATE_GARMIN_USER,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        responseCallback && responseCallback(true, response);
        yield put(createGarminUserSuccess(response?.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err), err);
      console.warn('createGarminUser error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminDailyData() {
  while (true) {
    const {payload} = yield take(getGarminDailyDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_DAILY_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      // console.log('GET GARMIN DAILY DATA  RESPONSE =>>> ', JSON.stringify(response, null, 2));
      if (response?.length || response?.length == 0) {
        responseCallback && responseCallback(true, response);
        // yield put(getGarminDailyDataSuccess(response));
      } else {
        // yield put(getGarminDailyDataSuccess(GARMIN_SAMPLE_DAILY));
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminDailyData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}
function* getGarminSleepData() {
  while (true) {
    const {payload} = yield take(getGarminSleepDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_SLEEP_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      if (response?.length || response?.length == 0) {
        responseCallback && responseCallback(true, response);
        // yield put(getGarminSleepDataSuccess(response));
      } else {
        // yield put(getGarminSleepDataSuccess(GARMIN_SAMPLE_SLEEP));
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminSleepData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminHrvData() {
  while (true) {
    const {payload} = yield take(getGarminHrvDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_HRV_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      if (response?.length || response?.length == 0) {
        responseCallback && responseCallback(true, response);
        // yield put(getGarminHrvDataSuccess(response));
      } else {
        // yield put(getGarminHrvDataSuccess(GARMIN_SAMPLE_BR));
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminHrvData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminVo2MaxData() {
  while (true) {
    const {payload} = yield take(getGarminVo2MaxDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_VO2MAX_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      if (response?.length) {
        responseCallback && responseCallback(true, response);
        // yield put(getGarminVo2MaxDataSuccess(response));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminVo2MaxData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* takeEveryGarminSleepData() {
  yield takeEvery(getGarminSleepRangeDataRequest.type, garminRangeSleepData);
}

function* garminRangeSleepData({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_SLEEP_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback && responseCallback(false, {params, response: {}});
    }
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.warn('garminRangeSleepData error: ', err);
    responseCallback && responseCallback(false, {params, response: {}});
  }
}

function* takeEveryGarminDailyData() {
  yield takeEvery(getGarminDailyRangeDataRequest.type, garminRangeDailyData);
}

function* garminRangeDailyData({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_DAILY_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback && responseCallback(false, {params, response: {}});
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    console.warn('garminRangeDailyData error: ', err);
    responseCallback && responseCallback(false, {params, response: {}});
  }
}

function* takeEveryGarminVo2MaxData() {
  yield takeEvery(getGarminVo2MaxRangeDataRequest.type, garminRangeVo2MaxData);
}

function* garminRangeVo2MaxData({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_VO2MAX_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback && responseCallback(false, {params, response: {}});
    }
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.warn('garminRangeVo2MaxData error: ', err);
    responseCallback && responseCallback(false, {params, response: {}});
  }
}

function* takeEveryGarminHrvData() {
  yield takeEvery(getGarminHrvRangeDataRequest.type, garminRangeHrvData);
}

function* garminRangeHrvData({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_HRV_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback && responseCallback(false, {params, response: {}});
    }
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.warn('garminRangeHrvData error: ', err);
    responseCallback && responseCallback(false, {params, response: {}});
  }
}

function* deleteGarminUser() {
  while (true) {
    const {payload} = yield take(deleteGarminUserRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        DELETE_GARMIN_USER,
        {},
        `${payloadData?.id}`,
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        responseCallback && responseCallback(true, response);
        yield put(deleteGarminUserSuccess(response?.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('deleteGarminUser error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getDailyPoints({payload}) {
  const {responseCallback, query = ''} = payload;

  try {
    const response = yield call(
      callRequest,
      GET_DAILY_POINTS,
      {},
      ``,
      {},
      query,
      ApiSauce,
    );

    if (response?.status) {
      responseCallback && responseCallback(true, response?.data);
      if (query == '') yield put(getDailyPointsSuccess(response?.data));
    } else {
      // alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    console.warn('getDailyPoints error: ', err);
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* getWeeklyPoints() {
  while (true) {
    const {payload} = yield take(getWeeklyPointsRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_WEEKLY_POINTS,
        {},
        ``,
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.data);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('getWeeklyPoints error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getStatistics() {
  while (true) {
    const {payload} = yield take(getStatisticsRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_STATISTICS,
        {},
        ``,
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.data?.statistics);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('getStatistics error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* addActiveDayCount() {
  while (true) {
    const {payload} = yield take(addActiveDayCountRequest.type);
    const {responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        ADD_ACTIVE_DAY,
        {},
        ``,
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('addActiveDayCount error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGraphView() {
  while (true) {
    const {payload} = yield take(getGraphViewRequest.type);
    const {responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        STATS_GRAPH_VIEW,
        {},
        ``,
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.data);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('getGraphView error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* updateUser() {
  while (true) {
    const {payload} = yield take(updateUserRequest.type);
    const {payloadData, params, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        {...UPDATE_USER, route: UPDATE_USER.route + '/' + params},
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.id) {
        responseCallback && responseCallback(true, response);
        yield put(updateUserSuccess(response));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('updateUser error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* sendWatchData({payload}) {
  const {payloadData} = payload;

  try {
    const response = yield call(
      callRequest,
      SEND_WATCH_DATA,
      payloadData,
      '',
      {},
      '',
      ApiSauce,
    );
  } catch (err) {}
}

function* updateUserNotificationSetting() {
  while (true) {
    const {payload} = yield take(updateUserNotificationSettingRequest.type);
    const {payloadData, params, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        {...UPDATE_USER, route: UPDATE_USER.route + '/' + params},
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.id) {
        responseCallback && responseCallback(true, response);
        yield put(
          updateUserNotificationSettingSuccess(
            manipulateUserDataFromGetUser(response),
          ),
        );
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.error('updateUserNotificationSetting error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* updateDeviceToken() {
  while (true) {
    const {payload} = yield take(updateDeviceTokenRequest.type);
    const {payloadData, params, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        // {...UPDATE_USER, route: UPDATE_USER.route + '/' + params},
        UPDATE_TOKEN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.id) {
        responseCallback && responseCallback(true, response);
        yield put(updateDeviceTokenSuccess());
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.error('updateDeviceToken error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* deleteDeviceToken() {
  while (true) {
    const {payload} = yield take(deleteDeviceTokenRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        DELETE_TOKEN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.id) {
        responseCallback && responseCallback(true, response);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('deleteDeviceToken error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* resetNotificationCount() {
  while (true) {
    const {payload} = yield take(resetNotificationCountRequest.type);
    const {payloadData, params, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        {...UPDATE_USER, route: UPDATE_USER.route + '/' + params},
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.id) {
        responseCallback && responseCallback(true, response);
        yield put(resetNotificationCountSuccess());
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('resetNotificationCount error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* connectAppleWatch() {
  while (true) {
    const {payload} = yield take(connectAppleWatchRequest.type);
    const {payloadData, params, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        {...UPDATE_USER, route: UPDATE_USER.route + '/' + params},
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.id) {
        responseCallback && responseCallback(true, response);
        yield put(connectAppleWatchSuccess(response));
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('connectAppleWatch error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getQuotes() {
  while (true) {
    const {payload} = yield take(getQuotesRequest.type);
    const {responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_QUOTES,
        {},
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        responseCallback &&
          responseCallback(true, quoteManipulator(response?.data));

        yield put(getQuotesSuccess(quoteManipulator(response?.data)));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('getQuotes error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

export default function* root() {
  yield fork(signup);
  yield fork(appleLogin);
  yield fork(signin);
  yield fork(getOtp);
  yield fork(confirmOtp);
  yield fork(getUserData);
  yield fork(resetPassword);
  yield fork(changePassword);
  yield fork(updatePassword);
  yield fork(uploadMedia);
  yield fork(profileSetUp);
  yield fork(getAllGoals);
  yield fork(addUserGoals);
  yield fork(updateProfileSetUp);
  yield fork(getUserGoals);
  yield fork(getGarminUserInfo);
  yield fork(getGarminUserPermissions);
  yield fork(createGarminUser);
  yield fork(getGarminDailyData);
  yield fork(getGarminSleepData);
  yield fork(getGarminHrvData);
  yield fork(getGarminVo2MaxData);
  yield fork(takeEveryGarminSleepData);
  yield fork(takeEveryGarminDailyData);
  yield fork(takeEveryGarminVo2MaxData);
  yield fork(takeEveryGarminHrvData);
  yield fork(deleteGarminUser);
  yield takeEvery(getDailyPointsRequest.type, getDailyPoints);
  yield fork(getWeeklyPoints);
  yield fork(getStatistics);
  yield fork(addActiveDayCount);
  yield fork(getGraphView);
  yield fork(updateUser);
  yield takeLatest(sendWatchDataRequest.type, sendWatchData);
  yield fork(updateUserNotificationSetting);
  yield fork(updateDeviceToken);
  yield fork(deleteDeviceToken);
  yield fork(resetNotificationCount);
  yield fork(connectAppleWatch);
  yield fork(getQuotes);
}
