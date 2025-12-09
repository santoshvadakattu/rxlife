import {call, fork, put, take, takeEvery} from 'redux-saga/effects';
import {
  ADD_PARTICIPANTS,
  CHAT_APP_BASE_URL,
  CREATE_GROUP,
  DELETE_CHAT,
  ERROR_SOMETHING_WENT_WRONG,
  GET_ALL_ROOMS,
  GET_ROOM_ALL_MESSAGES,
  GET_ROOM_INFO,
  GET_ROOM_PARENT_ALL_MESSAGES,
  GET_USERS_BY_ADMIN,
  GET_USERS_FOR_ROOM,
  LEAVE_GROUP,
  LOAD_ROOM,
  REMOVE_PARTICIPANT,
  REMOVE_REACTION,
  SEND_MESSAGE_WITH_ATTACHMENTS,
  SEND_REACTION,
  UNREAD_CHATS,
  UPDATE_GROUP,
  callRequest,
} from '../../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import ApiSauce from '../../services/ApiSauce';
import {default as Util, default as util} from '../../util';
import {
  addMoreParticipantRequest,
  addMoreParticipantSuccess,
  createGroupRequest,
  createGroupSuccess,
  deleteChatRequest,
  deleteChatSuccess,
  getAllMessagesFromParentMessageRequest,
  getAllRoomsRequest,
  getAllRoomsSuccess,
  getAllUsersRequest,
  getAllUsersSuccess,
  getMoreUsersRequest,
  getMoreUsersSuccess,
  getRoomInfoRequest,
  getRoomMessagesRequest,
  getUnReadChatRequest,
  getUnReadChatSuccess,
  leaveGroupRequest,
  leaveGroupSuccess,
  loadRoomRequest,
  loadRoomSuccess,
  removeParticipantRequest,
  removeParticipantSuccess,
  removeReactionRequest,
  removeReactionSuccess,
  sendMessageRequest,
  sendMessageSuccess,
  sendReactionRequest,
  sendReactionSuccess,
  updateGroupRequest,
  updateGroupSuccess,
} from '../slicers/chat';
import {
  attachmentsManipulator,
  getAllRoomsManipulator,
  getMessagesManipulator,
  loadRoomDataManipulator,
  singleMemberManipulator,
  singleMessageManipulator,
} from '../../Helper/chatManipulator';
import {getAllUsersManipulator} from '../../Helper/userMainpulator';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* loadRoom() {
  while (true) {
    const {payload} = yield take(loadRoomRequest.type);
    const {payloadData, responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        LOAD_ROOM,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        yield put(loadRoomSuccess(loadRoomDataManipulator(response.data)));
        responseCallback && responseCallback(true, response.data);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('loadRoom error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getRoomMessages() {
  while (true) {
    const {payload} = yield take(getRoomMessagesRequest.type);
    const {payloadData, responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ROOM_ALL_MESSAGES,
        {},
        '',
        headers,
        payloadData?.query,
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      console.log('getRoomMessages res ==>>', JSON.stringify(response));

      if (response?.status) {
        const manipulatedResponse = getMessagesManipulator(
          response?.data?.messages,
        );

        responseCallback &&
          responseCallback(true, {
            messages: manipulatedResponse,
            total: response?.data?.total,
          });
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('getRoomMessages error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* sendMessage({payload}) {
  const {payloadData, responseCallback, headers} = payload;
  console.log('payloadDatapayloadData =>', payloadData);
  try {
    const response = yield call(
      callRequest,
      SEND_MESSAGE_WITH_ATTACHMENTS,
      payloadData,
      '',
      headers,
      '',
      ApiSauce,
      CHAT_APP_BASE_URL,
    );

    if (response?.status) {
      console.error('sendMessage data ==>>', response.data);
      const manipulatedResponse = singleMessageManipulator(response?.data);
      console.log('Senndddddd=>', manipulatedResponse);
      responseCallback && responseCallback(true, manipulatedResponse);
      yield put(sendMessageSuccess(manipulatedResponse));
    } else {
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  } catch (error) {
    console.error('sendMessage error ==>>', error, JSON.stringify(error));
    responseCallback &&
      responseCallback(
        false,
        error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
      );
  }
}

function* getRoomInfo() {
  while (true) {
    const {payload} = yield take(getRoomInfoRequest.type);
    const {payloadData, responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ROOM_INFO,
        {},
        '',
        headers,
        payloadData?.query,
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        const manipulatedResponse = attachmentsManipulator(
          response?.data?.attachments ?? [],
        );

        responseCallback && responseCallback(true, manipulatedResponse);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('getRoomInfo error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getAllRooms() {
  while (true) {
    const {payload} = yield take(getAllRoomsRequest.type);
    const {responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ALL_ROOMS,
        {},
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      console.log('getAllRooms response ==>>', JSON.stringify(response));

      if (response?.status) {
        const manipulatedResponse = getAllRoomsManipulator(
          response?.data?.rooms ?? [],
        );

        responseCallback && responseCallback(true, manipulatedResponse);

        yield put(
          getAllRoomsSuccess({
            tota: response?.data?.total,
            rooms: manipulatedResponse,
          }),
        );
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('getAllRooms error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getAllUsers() {
  while (true) {
    const {payload} = yield take(getAllUsersRequest.type);
    const {responseCallback, payloadData} = payload;

    try {
      const response = yield call(
        callRequest,
        payloadData?.fromAddParticipants
          ? GET_USERS_FOR_ROOM
          : GET_USERS_BY_ADMIN,
        {},
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.data);
        yield put(getAllUsersSuccess(response?.data));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('getAllUsers error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getMoreUsers() {
  while (true) {
    const {payload} = yield take(getMoreUsersRequest.type);
    const {responseCallback, payloadData} = payload;

    try {
      const response = yield call(
        callRequest,
        payloadData?.fromAddParticipants
          ? GET_USERS_FOR_ROOM
          : GET_USERS_BY_ADMIN,
        {},
        '',
        {},
        payloadData?.query,
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.data);
        yield put(getMoreUsersSuccess(response?.data));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('getMoreUsers error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* createGroup() {
  while (true) {
    const {payload} = yield take(createGroupRequest.type);
    const {responseCallback, payloadData, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        CREATE_GROUP,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      console.log('createGroup res ==>>', JSON.stringify(response));

      if (response?.status) {
        const manipulatedResponse = loadRoomDataManipulator(response?.data);
        yield put(createGroupSuccess(manipulatedResponse));
        responseCallback && responseCallback(true, manipulatedResponse);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('createGroup error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* removeParticipant() {
  while (true) {
    const {payload} = yield take(removeParticipantRequest.type);
    const {responseCallback, payloadData, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        REMOVE_PARTICIPANT,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.data);
        yield put(removeParticipantSuccess(payloadData));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error(
        'removeParticipant error ==>>',
        error,
        JSON.stringify(error),
      );
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* leaveGroup() {
  while (true) {
    const {payload} = yield take(leaveGroupRequest.type);
    const {responseCallback, payloadData, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        LEAVE_GROUP,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.data);
        yield put(leaveGroupSuccess(payloadData));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('leaveGroup error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* updateGroup() {
  while (true) {
    const {payload} = yield take(updateGroupRequest.type);
    const {responseCallback, payloadData, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        UPDATE_GROUP,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        const manipulatedResponse = loadRoomDataManipulator(response?.data);
        responseCallback && responseCallback(true, manipulatedResponse);
        yield put(updateGroupSuccess(manipulatedResponse));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('updateGroup error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* addParticipant() {
  while (true) {
    const {payload} = yield take(addMoreParticipantRequest.type);
    const {responseCallback, payloadData, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        ADD_PARTICIPANTS,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        const manipulatedResponse = singleMemberManipulator(response?.data);
        responseCallback && responseCallback(true, manipulatedResponse);
        yield put(addMoreParticipantSuccess(manipulatedResponse));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('addParticipant error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* deleteChat() {
  while (true) {
    const {payload} = yield take(deleteChatRequest.type);
    const {responseCallback, payloadData, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        DELETE_CHAT,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response);
        yield put(deleteChatSuccess());
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('deleteChat error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getUnReadChat() {
  while (true) {
    const {payload} = yield take(getUnReadChatRequest.type);
    const {responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        UNREAD_CHATS,
        {},
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response);
        yield put(getUnReadChatSuccess(response?.isUnread));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('getUnReadChat error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* sendReaction() {
  while (true) {
    const {payload} = yield take(sendReactionRequest.type);
    const {payloadData, responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        SEND_REACTION,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      console.log('sendReaction ==>>>', JSON.stringify(response));

      if (response?.status) {
        responseCallback && responseCallback(true, response);
        yield put(sendReactionSuccess(response?.isUnread));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('sendReaction error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* removeReaction() {
  while (true) {
    const {payload} = yield take(removeReactionRequest.type);
    const {payloadData, responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        REMOVE_REACTION,
        payloadData,
        '',
        headers,
        '',
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      console.log('removeReaction ==>>>', JSON.stringify(response));

      if (response?.status) {
        responseCallback && responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error('removeReaction error ==>>', error, JSON.stringify(error));
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* getAllMessagesFromParentMessage() {
  while (true) {
    const {payload} = yield take(getAllMessagesFromParentMessageRequest.type);
    const {payloadData, responseCallback, headers} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ROOM_PARENT_ALL_MESSAGES,
        {},
        '',
        headers,
        payloadData?.query,
        ApiSauce,
        CHAT_APP_BASE_URL,
      );

      if (response?.status) {
        const manipulatedResponse = getMessagesManipulator(
          response?.data?.messages,
        );

        responseCallback &&
          responseCallback(true, {
            messages: manipulatedResponse,
            total: response?.data?.total,
          });
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.error(
        'getAllMessagesFromParentMessage error ==>>',
        error,
        JSON.stringify(error),
      );
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

export default function* root() {
  yield fork(loadRoom);
  yield fork(getRoomMessages);
  yield takeEvery(sendMessageRequest.type, sendMessage);
  yield fork(getRoomInfo);
  yield fork(getAllRooms);
  yield fork(getAllUsers);
  yield fork(getMoreUsers);
  yield fork(createGroup);
  yield fork(removeParticipant);
  yield fork(leaveGroup);
  yield fork(updateGroup);
  yield fork(addParticipant);
  yield fork(deleteChat);
  yield fork(getUnReadChat);
  yield fork(sendReaction);
  yield fork(removeReaction);
  yield fork(getAllMessagesFromParentMessage);
}
