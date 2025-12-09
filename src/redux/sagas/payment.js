import {call, fork, take, put} from 'redux-saga/effects';
import {
  CREATE_PAYMENT_METHOD,
  ERROR_SOMETHING_WENT_WRONG,
  GET_ALL_TRANSACTIONS,
  REMOVE_PAYMENT_METHOD,
  callRequest,
} from '../../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import ApiSauce from '../../services/ApiSauce';
import {default as Util, default as util} from '../../util';

import {
  createPaymentMethodRequest,
  createPaymentMethodSuccess,
  getAllTransactionsRequest,
  getAllTransactionsSuccess,
  removePaymentMethodRequest,
  removePaymentMethodSuccess,
} from '../slicers/payment';
import {allTransactionsManipulator} from '../../Helper/transactionManipulator';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* createPaymentMethod() {
  while (true) {
    const {payload} = yield take(createPaymentMethodRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CREATE_PAYMENT_METHOD,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        yield put(createPaymentMethodSuccess(response?.data));
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('createPaymentMethod error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* removePaymentMethod() {
  while (true) {
    const {payload} = yield take(removePaymentMethodRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        REMOVE_PAYMENT_METHOD,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        yield put(removePaymentMethodSuccess(response?.data));
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('removePaymentMethod error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getAllTransactions() {
  while (true) {
    const {payload} = yield take(getAllTransactionsRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ALL_TRANSACTIONS,
        {},
        '',
        {},
        payloadData?.query ?? '',
        ApiSauce,
      );

      if (response) {
        yield put(
          getAllTransactionsSuccess(allTransactionsManipulator(response?.data)),
        );
        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('getAllTransactions error ===>>> ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

export default function* root() {
  yield fork(createPaymentMethod);
  yield fork(removePaymentMethod);
  yield fork(getAllTransactions);
}
