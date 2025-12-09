import {call, fork, take, put} from 'redux-saga/effects';
import {
  ERROR_SOMETHING_WENT_WRONG,
  GET_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  callRequest,
} from '../../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import ApiSauce from '../../services/ApiSauce';
import {default as Util, default as util} from '../../util';

import {
  getNotificationsListPaginationRequest,
  getNotificationsListPaginationSuccess,
  getNotificationsListRequest,
  getNotificationsListSuccess,
  readNotificationRequest,
  readNotificationSuccess,
} from '../slicers/notification';
import {notificationListManipulator} from '../../Helper/notificationManipulator';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getNotificationsList() {
  while (true) {
    const {payload} = yield take(getNotificationsListRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS,
        {},
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      console.log('getNotificationsList res ==>>', response);

      if (response) {
        const notificationResponse = {
          notifications: notificationListManipulator(response?.data),
          total: response?.meta?.pagination?.total ?? 0,
        };
        yield put(getNotificationsListSuccess(notificationResponse));
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('getNotificationsList error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getNotificationsListPagination() {
  while (true) {
    const {payload} = yield take(getNotificationsListPaginationRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS,
        {},
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response) {
        const notificationResponse = {
          notifications: notificationListManipulator(response?.data),
          total: response?.meta?.pagination?.total ?? 0,
        };
        yield put(getNotificationsListPaginationSuccess(notificationResponse));
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('getNotificationsListPagination error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* readNotification() {
  while (true) {
    const {payload} = yield take(readNotificationRequest.type);
    const {payloadData, params, responseCallback} = payload;

    const _url = {
      ...UPDATE_NOTIFICATION,
      route: UPDATE_NOTIFICATION.route.replace(':id', params),
    };

    try {
      const response = yield call(
        callRequest,
        _url,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      console.log('readNotification res ==>>', JSON.stringify(response));

      if (response) {
        yield put(readNotificationSuccess(response?.data));
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('readNotification error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

export default function* root() {
  yield fork(getNotificationsList);
  yield fork(getNotificationsListPagination);
  yield fork(readNotification);
}
