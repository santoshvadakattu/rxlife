import {call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  ACCEPTS_FRIENDS_REQUEST,
  ERROR_SOMETHING_WENT_WRONG,
  GET_FRIENDS,
  GET_FRIENDS_REQUEST,
  REJECTS_FRIENDS_REQUEST,
  SEARCH_USER,
  SEND_FRIENDS_REQUEST,
  UNFRIEND_REQUEST,
  USER_SIGNIN,
  VIEW_OTHER_PERSON_PROFILE,
  callRequest,
} from '../../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import ApiSauce from '../../services/ApiSauce';
import {default as Util, default as util} from '../../util';
import {loginRequest, loginSuccess} from '../slicers/user';
import {
  acceptFriendRequestRequest,
  getFriendsRequest,
  getFriendsRequestRequest,
  getFriendsRequestSuccess,
  getFriendsSuccess,
  getFriendsViewProfileRequest,
  getFriendsViewProfileSuccess,
  getSearchFriendsRequest,
  getSearchFriendsSuccess,
  rejectFriendRequestRequest,
  removeRequestRequest,
  sendFriendRequestRequest,
  unFriendRequestRequest,
} from '../slicers/friends';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getFriendR() {
  while (true) {
    const {payload} = yield take(getFriendsRequestRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_FRIENDS_REQUEST,
      route: GET_FRIENDS_REQUEST?.route?.replace(
        ':userId',
        payloadData?.userId,
      ),
    };

    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
      if (response) {
        yield put(getFriendsRequestSuccess(response.requests));
        responseCallback && responseCallback(true, response.requests);
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
function* getFriends() {
  while (true) {
    const {payload} = yield take(getFriendsRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...GET_FRIENDS,
      route: GET_FRIENDS?.route?.replace(':userId', payloadData?.userId),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);

      if (response) {
        yield put(getFriendsSuccess(response.friends));
        responseCallback && responseCallback(true, response);
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

function* searchFriends() {
  yield takeLatest(getSearchFriendsRequest?.type, searchFriendApiCall);
}
function* searchFriendApiCall({payload}) {
  const {payloadData, responseCallback} = payload;
  const {text, userId} = payloadData;
  const url = {
    ...SEARCH_USER,
    route: SEARCH_USER?.route
      ?.replace(':userId', userId)
      .replace('[search]', text),
  };

  try {
    const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);

    if (response) {
      yield put(getSearchFriendsSuccess({data: response.data, userId}));
      responseCallback && responseCallback(true, response.data);
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* viewFriendProfile() {
  while (true) {
    const {payload} = yield take(getFriendsViewProfileRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...VIEW_OTHER_PERSON_PROFILE,
      route: VIEW_OTHER_PERSON_PROFILE?.route?.replace(
        ':userId',
        payloadData?.userId,
      ),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(getFriendsViewProfileSuccess(response));
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
function* sendFriendRequest() {
  while (true) {
    const {payload} = yield take(sendFriendRequestRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...SEND_FRIENDS_REQUEST,
      route: SEND_FRIENDS_REQUEST?.route?.replace(
        ':senderId',
        payloadData?.senderId,
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
      } else {
        // responseCallback &&
        //   responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      // responseCallback &&
      //   responseCallback(
      //     false,
      //     error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
      //   );
    }
  }
}
function* removeRequest() {
  while (true) {
    const {payload} = yield take(removeRequestRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...SEND_FRIENDS_REQUEST,
      route: SEND_FRIENDS_REQUEST?.route?.replace(
        ':senderId',
        payloadData?.senderId,
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
function* acceptRequest() {
  while (true) {
    const {payload} = yield take(acceptFriendRequestRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...ACCEPTS_FRIENDS_REQUEST,
      route: ACCEPTS_FRIENDS_REQUEST?.route?.replace(
        ':userId',
        payloadData?.userId,
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
function* rejectRequest() {
  while (true) {
    const {payload} = yield take(rejectFriendRequestRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...REJECTS_FRIENDS_REQUEST,
      route: REJECTS_FRIENDS_REQUEST?.route?.replace(
        ':userId',
        payloadData?.userId,
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
      } else {
        // responseCallback &&
        //   responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      // responseCallback &&
      //   responseCallback(
      //     false,
      //     error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
      //   );
    }
  }
}
function* unfriendRequest() {
  while (true) {
    const {payload} = yield take(unFriendRequestRequest.type);
    const {payloadData, responseCallback} = payload;
    const url = {
      ...UNFRIEND_REQUEST,
      route: UNFRIEND_REQUEST?.route?.replace(':userId', payloadData?.userId),
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
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

export default function* root() {
  yield fork(getFriendR);
  yield fork(getFriends);
  yield fork(searchFriends);
  yield fork(viewFriendProfile);
  yield fork(sendFriendRequest);
  yield fork(removeRequest);
  yield fork(acceptRequest);
  yield fork(rejectRequest);
  yield fork(unfriendRequest);
}
