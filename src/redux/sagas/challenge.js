import {call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  ADD_PARTICIPANT_ON_CHALLENGE_JOIN,
  COMPLETED_CHALLENGES,
  CREATE_COMPLETE_CHALLENGE,
  DASHBOARD_COMPLETED_TASKS,
  ERROR_SOMETHING_WENT_WRONG,
  GET_ALL_CHALLENGES,
  GET_CHALLENGES_TASK_DASHBOARD,
  GET_COMPLETE_CHALLENGE,
  GET_INDIVIUAL_LEADERBOARD,
  GET_ONE_CHALLENGE,
  GET_ONGOING_CHALLENGES,
  GET_ONGOING_CHALLENGES_LEADERBOARD,
  JOIN_CHALLENGE,
  UPDATE_COMPLETE_CHALLENGE,
  callRequest,
} from '../../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import ApiSauce from '../../services/ApiSauce';
import {default as Util, default as util} from '../../util';
import {
  createCompleteChallengeRequest,
  getAllChallengesPaginationRequest,
  getAllChallengesPaginationSuccess,
  getAllChallengesRequest,
  getAllChallengesSuccess,
  getCompleteChallengeRequest,
  getDashboardTasksRequest,
  getDashboardTasksSuccess,
  getIndiviualLeaderboardRequest,
  getIndiviualLeaderboardSuccess,
  getMyCompletedChallengesPaginationRequest,
  getMyCompletedChallengesPaginationSuccess,
  getMyCompletedChallengesRequest,
  getMyCompletedChallengesSuccess,
  getOnGoingChallengesPaginationRequest,
  getOnGoingChallengesPaginationSuccess,
  getOnGoingChallengesRequest,
  getOnGoingChallengesSuccess,
  getOneChallengeRequest,
  getOneChallengeSuccess,
  getOngoingChallengeLeaderboardsRequest,
  getOngoingChallengeLeaderboardsSuccess,
  getSearchAllChallengesPaginationRequest,
  getSearchAllChallengesPaginationSuccess,
  getSearchAllChallengesRequest,
  getSearchAllChallengesSuccess,
  joinChallengeGroupRequest,
  joinChallengeGroupSuccess,
  joinChallengeRequest,
  joinChallengeSuccess,
  updateCompleteChallengeRequest,
  updateDashboardTasksRequest,
} from '../slicers/challenge';
import {
  getAllChallengesManipulator,
  getCompleteChallengeManipulator,
  getCompleteChallengeManipulatorOnlyCreate,
  getMyCompletedChallengeManipulator,
  getOnChallengesManipulator,
  onGoingTasksManipulator,
} from '../../Helper/challengeManipulator';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getAllChallengesLatest() {
  yield takeLatest(getAllChallengesRequest?.type, getAllChallenges);
}
function* getAllChallenges({payload}) {
  const {payloadData, responseCallback} = payload;
  const {query} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_ALL_CHALLENGES,
      {},
      '',
      {},
      query,
      ApiSauce,
    );

    if (response) {
      yield put(
        getAllChallengesSuccess(getAllChallengesManipulator(response?.data)),
      );
      responseCallback && responseCallback(true, response.data);
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('getAllChallenges error ===>>> ', JSON.stringify(err));
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* getAllChallengesPaginationLatest() {
  yield takeLatest(
    getAllChallengesPaginationRequest?.type,
    getAllChallengesPagination,
  );
}
function* getAllChallengesPagination({payload}) {
  const {payloadData, responseCallback} = payload;
  const {query} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_ALL_CHALLENGES,
      {},
      '',
      {},
      query,
      ApiSauce,
    );

    if (response?.data) {
      yield put(
        getAllChallengesPaginationSuccess(
          getAllChallengesManipulator(response?.data),
        ),
      );
      responseCallback && responseCallback(true, response.data);
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('getAllChallenges error ===>>> ', JSON.stringify(err));
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* getSearchChallengeLatest() {
  yield takeLatest(getSearchAllChallengesRequest?.type, getSearchAllChallenges);
}

function* getSearchAllChallenges({payload}) {
  const {payloadData, responseCallback} = payload;
  const {query} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_ALL_CHALLENGES,
      {},
      '',
      {},
      query,
      ApiSauce,
    );

    if (response?.data) {
      yield put(
        getSearchAllChallengesSuccess(
          getAllChallengesManipulator(response?.data),
        ),
      );
      responseCallback &&
        responseCallback(true, getAllChallengesManipulator(response.data));
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, []);
    }
  } catch (err) {
    console.error('getSearchAllChallenges error ===>>> ', JSON.stringify(err));
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* getSearchChallengePaginationLatest() {
  yield takeLatest(
    getSearchAllChallengesPaginationRequest?.type,
    getSearchAllChallengesPagination,
  );
}

function* getSearchAllChallengesPagination({payload}) {
  const {payloadData, responseCallback} = payload;
  const {query} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_ALL_CHALLENGES,
      {},
      '',
      {},
      query,
      ApiSauce,
    );

    if (response?.data) {
      yield put(
        getSearchAllChallengesPaginationSuccess(
          getAllChallengesManipulator(response?.data),
        ),
      );
      responseCallback &&
        responseCallback(true, getAllChallengesManipulator(response.data));
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, response);
    }
  } catch (err) {
    console.error('getSearchAllChallenges error ===>>> ', JSON.stringify(err));
    responseCallback &&
      responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
  }
}

function* joinChallenge() {
  while (true) {
    const {payload} = yield take(joinChallengeRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        JOIN_CHALLENGE,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        responseCallback && responseCallback(true, response.data);
        yield put(joinChallengeSuccess(response?.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('joinChallenge error ===>>> ', JSON.stringify(err));
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getOnGoingChallenge() {
  while (true) {
    const {payload} = yield take(getOnGoingChallengesRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ONGOING_CHALLENGES,
        {},
        '',
        {},
        payloadData?.query ?? '',
        ApiSauce,
      );

      if (response?.data) {
        yield put(
          getOnGoingChallengesSuccess(
            getOnChallengesManipulator(response?.data),
          ),
        );

        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('getOnGoingChallenge error ===>>> ', JSON.stringify(err));
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getOnGoingChallengePagination() {
  while (true) {
    const {payload} = yield take(getOnGoingChallengesPaginationRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ONGOING_CHALLENGES,
        {},
        '',
        {},
        payloadData?.query ?? '',
        ApiSauce,
      );

      if (response?.data) {
        yield put(
          getOnGoingChallengesPaginationSuccess(
            getOnChallengesManipulator(response?.data),
          ),
        );

        responseCallback && responseCallback(true, response.data);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, response);
      }
    } catch (err) {
      console.error('getOnGoingChallenge error ===>>> ', JSON.stringify(err));
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* createCompleteChallenge() {
  while (true) {
    const {payload} = yield take(createCompleteChallengeRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CREATE_COMPLETE_CHALLENGE,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        responseCallback &&
          responseCallback(
            true,
            getCompleteChallengeManipulatorOnlyCreate([response.data]),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error(
        'createCompleteChallenge error ===>>> ',
        JSON.stringify(err),
      );
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* getCompleteChallenge() {
  while (true) {
    const {payload} = yield take(getCompleteChallengeRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_COMPLETE_CHALLENGE,
        payloadData,
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.data) {
        responseCallback &&
          responseCallback(
            true,
            getCompleteChallengeManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error('getCompleteChallenge error ===>>> ', err);
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* updateCompleteChallengeLatest() {
  yield takeEvery(
    updateCompleteChallengeRequest?.type,
    updateCompleteChallenge,
  );
}
function* updateCompleteChallenge({payload}) {
  const {payloadData, oldData, param, responseCallback} = payload;

  try {
    const response = yield call(
      callRequest,
      {
        ...UPDATE_COMPLETE_CHALLENGE,
        route: UPDATE_COMPLETE_CHALLENGE.route + '/' + param,
      },
      payloadData,
      '',
      {},
      'populate=days&populate=days.tasks',
      ApiSauce,
    );

    if (response) {
      responseCallback &&
        responseCallback(
          true,
          getCompleteChallengeManipulator([response.data]),
        );
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, oldData);
    }
  } catch (err) {
    console.error('updateCompleteChallenge error ===>>> ', JSON.stringify(err));
    responseCallback && responseCallback(false, oldData);
  }
}

function* getMyCompleteChallenge() {
  while (true) {
    const {payload} = yield take(getMyCompletedChallengesRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        COMPLETED_CHALLENGES,
        payloadData,
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.data) {
        yield put(
          getMyCompletedChallengesSuccess(
            getMyCompletedChallengeManipulator(response?.data),
          ),
        );

        responseCallback &&
          responseCallback(
            true,
            getCompleteChallengeManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error('getMyCompleteChallenge error ===>>> ', err);
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* getMyCompleteChallengePagination() {
  while (true) {
    const {payload} = yield take(
      getMyCompletedChallengesPaginationRequest.type,
    );
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        COMPLETED_CHALLENGES,
        payloadData,
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.data) {
        yield put(
          getMyCompletedChallengesPaginationSuccess(
            getMyCompletedChallengeManipulator(response?.data),
          ),
        );

        responseCallback &&
          responseCallback(
            true,
            getCompleteChallengeManipulator(response.data),
          );
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error('getMyCompleteChallenge error ===>>> ', err);
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* getIndiviualLeaderboard() {
  while (true) {
    const {payload} = yield take(getIndiviualLeaderboardRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_INDIVIUAL_LEADERBOARD,
        {},
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.data) {
        responseCallback && responseCallback(true, response.data?.leaderBoard);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error('getIndiviualLeaderboard error ===>>> ', err);
      // alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* getOngoingChallengeLeaderboards() {
  while (true) {
    const {payload} = yield take(getOngoingChallengeLeaderboardsRequest.type);
    const {responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ONGOING_CHALLENGES_LEADERBOARD,
        {},
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        responseCallback && responseCallback(true, response.data?.leaderBoard);

        yield put(getOngoingChallengeLeaderboardsSuccess(response?.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error('getOngoingChallengeLeaderboards error ===>>> ', err);
      // alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* joinChallengeGroup() {
  while (true) {
    const {payload} = yield take(joinChallengeGroupRequest.type);
    const {responseCallback, payloadData} = payload;

    try {
      const response = yield call(
        callRequest,
        ADD_PARTICIPANT_ON_CHALLENGE_JOIN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        responseCallback && responseCallback(true, response.data);

        yield put(joinChallengeGroupSuccess(response?.data));
      } else {
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error('joinChallengeGroup error ===>>> ', err);
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* getOneChallenge() {
  while (true) {
    const {payload} = yield take(getOneChallengeRequest.type);
    const {responseCallback, payloadData} = payload;

    const _url = {
      ...GET_ONE_CHALLENGE,
      route: GET_ONE_CHALLENGE.route.replace(':id', payloadData?.params),
    };

    try {
      const response = yield call(callRequest, _url, {}, '', {}, '', ApiSauce);

      if (response?.data) {
        const responseManipulated = payloadData?.myChallenge
          ? getOnChallengesManipulator([response?.data])
          : response?.data?.myChallenge
          ? getOnChallengesManipulator([response?.data])
          : getAllChallengesManipulator([response?.data]);

        responseCallback && responseCallback(true, response.data);

        yield put(
          getOneChallengeSuccess({
            myChallenge:
              payloadData?.myChallenge || response?.data?.myChallenge,
            response: responseManipulated,
          }),
        );
      } else {
        responseCallback && responseCallback(false, {});
      }
    } catch (err) {
      console.error('getOneChallenge error ===>>> ', err);
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false, {});
    }
  }
}

function* getDashboardTasks() {
  while (true) {
    const {payload} = yield take(getDashboardTasksRequest.type);
    const {responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_CHALLENGES_TASK_DASHBOARD,
        {},
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        const manipulatedRes = onGoingTasksManipulator(response?.data);
        // console.log(
        //   'manipulated quotes ===>>>',
        //   quoteManipulator(response?.data),
        // );
        responseCallback && responseCallback(true, manipulatedRes);
        yield put(getDashboardTasksSuccess(manipulatedRes));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('getDashboardTasks error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* updateDashboardTasksLatest() {
  yield takeEvery(updateDashboardTasksRequest?.type, updateDashboardTasks);
}
function* updateDashboardTasks({payload}) {
  const {payloadData, responseCallback} = payload;

  try {
    const response = yield call(
      callRequest,
      DASHBOARD_COMPLETED_TASKS,
      payloadData,
      '',
      {},
      '',
      ApiSauce,
    );

    if (response) {
      responseCallback &&
        responseCallback(
          true,
          getCompleteChallengeManipulator([response.data]),
        );
    } else {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback && responseCallback(false);
    }
  } catch (err) {
    console.error('updateDashboardTasks error ===>>> ', JSON.stringify(err));
    responseCallback && responseCallback(false);
  }
}

export default function* root() {
  yield fork(getAllChallengesLatest);
  yield fork(getAllChallengesPaginationLatest);
  yield fork(getSearchChallengeLatest);
  yield fork(getSearchChallengePaginationLatest);
  yield fork(joinChallenge);
  yield fork(getOnGoingChallenge);
  yield fork(getOnGoingChallengePagination);
  yield fork(createCompleteChallenge);
  yield fork(getCompleteChallenge);
  yield fork(updateCompleteChallengeLatest);
  yield fork(getMyCompleteChallenge);
  yield fork(getMyCompleteChallengePagination);
  yield fork(getIndiviualLeaderboard);
  yield fork(getOngoingChallengeLeaderboards);
  yield fork(joinChallengeGroup);
  yield fork(getOneChallenge);
  yield fork(getDashboardTasks);
  yield fork(updateDashboardTasksLatest);
}
