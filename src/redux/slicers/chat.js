import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {groupMessagesByDate} from '../../util';
import {getAllUsersManipulator} from '../../Helper/userMainpulator';

const ChatReducer = createSlice({
  name: 'chat',
  initialState: {
    selectedRoom: {},
    allRooms: [],
    messages: [],
    groupedMessages: [],
    total: 0,
    isUnread: false,
    selectedGroupUsers: [],
    allUsers: [],
  },
  reducers: {
    loadRoomRequest() {},
    loadRoomSuccess(state, action) {
      if (state.selectedRoom?.id != action?.payload?.id) {
        state.selectedRoom = action.payload;
        state.groupedMessages = [];
        state.messages = [];
        state.total = 0;
      }
    },

    loadRoomAction(state, action) {
      const allRooms = [...state.allRooms];

      const findRoom = allRooms?.find((item) => item?.id == action?.payload);

      if (findRoom) {
        state.selectedRoom = findRoom;
      }
    },

    // getRoomMessages
    getRoomMessagesRequest() {},
    getRoomMessagesSuccess(state, action) {
      const allMessages = action.payload?.messages;
      const sortedMessages = _.sortBy(allMessages, ['createdAt']);
      const groupedMessages = groupMessagesByDate(sortedMessages);

      state.groupedMessages = groupedMessages;
      state.messages = [...sortedMessages];
      state.total = action.payload.total;

      // setting unread message count to zero

      const selectedRoom = {...state?.selectedRoom};

      if (selectedRoom?.id && selectedRoom?.unreadCount) {
        const allRooms = [...state?.rooms];
        const myRoomIdx = allRooms?.findIndex(
          (item) => item?.id == selectedRoom?.id,
        );

        if (myRoomIdx > -1) {
          allRooms[myRoomIdx].unreadCount = 0;

          state.rooms = [...allRooms];
        }
      }
    },

    sendMessageRequest() {},
    sendMessageSuccess() {},

    getRoomInfoRequest() {},
    getRoomInfoSuccess() {},

    getAllRoomsRequest() {},
    getAllRoomsSuccess(state, action) {
      state.allRooms = action.payload?.rooms ?? [];
    },

    getAllUsersRequest(state) {
      state.selectedGroupUsers = [];
    },
    getAllUsersSuccess(state, action) {
      const manipulatedResponse = getAllUsersManipulator(
        action.payload,
        state.selectedGroupUsers,
      );
      state.allUsers = [...manipulatedResponse];
      // state.allUsers = action.payload;
    },

    getMoreUsersRequest() {},
    getMoreUsersSuccess(state, action) {
      const manipulatedResponse = getAllUsersManipulator(action.payload, []);
      state.allUsers = [...state.allUsers, ...manipulatedResponse];
    },

    addUserInSelectedList(state, action) {
      state.selectedGroupUsers = [...state.selectedGroupUsers, action.payload];
    },
    removeUserFromSelectedList(state, action) {
      const selectedGroupUsers = [...state.selectedGroupUsers];
      state.selectedGroupUsers = selectedGroupUsers?.filter(
        (item) => item?.id !== action?.payload?.id,
      );
    },

    selectChallengeParticipants(state, action) {
      state.selectedGroupUsers = action.payload;
    },

    createGroupRequest() {},
    createGroupSuccess(state, action) {
      state.selectedRoom = action.payload;
      state.groupedMessages = [];
      state.messages = [];
      state.total = 0;
    },

    removeParticipantRequest() {},
    removeParticipantSuccess(state, action) {
      const selectedRoom = {...state.selectedRoom};

      if (selectedRoom?.id == action?.payload?.room_id) {
        selectedRoom.members = selectedRoom.members?.filter(
          (m) => m?.id !== action.payload?.user_id,
        );

        state.selectedRoom = {...selectedRoom};
      }
    },

    emptySelectedUsers(state) {
      state.selectedGroupUsers = [];
    },

    leaveGroupRequest() {},
    leaveGroupSuccess() {},

    updateGroupRequest() {},
    updateGroupSuccess(state, action) {
      state.selectedRoom = action.payload;

      const allRooms = [...state.allRooms];

      const findRoomIdx = allRooms?.findIndex(
        (item) => item?.id == action?.payload?.id,
      );

      if (findRoomIdx > -1) {
        allRooms[findRoomIdx] = {
          ...allRooms[findRoomIdx],
          roomName: action.payload?.roomName,
          roomImage: action.payload?.roomImage,
        };

        state.allRooms = allRooms;
      }
    },

    addMoreParticipantRequest() {},
    addMoreParticipantSuccess(state, action) {
      const selectedRoom = {...state.selectedRoom};
      selectedRoom.members = [...selectedRoom.members, ...action.payload];

      state.selectedRoom = {...selectedRoom};
    },

    addReceiveMessageToRoom(state, action) {
      if (state.selectedRoom?.id === action.payload?.roomId) {
        state.messages = [...state.messages, action.payload];
        state.total = state.total + 1;
      }
    },

    deleteChatRequest() {},
    deleteChatSuccess(state) {
      state.selectedRoom = {
        ...state.selectedRoom,
        latestMessage: {},
      };
      state.messages = [];
      state.total = 0;
    },

    emptyChatOnLogout(state) {
      state.allRooms = [];
      state.selectedRoom = {};
      state.selectedGroupUsers = [];
      state.messages = [];
      state.groupedMessages = [];
      state.total = 0;
      state.allUsers = [];
    },

    getUnReadChatRequest() {},
    getUnReadChatSuccess(state, action) {
      state.isUnread = action.payload;
    },

    sendReactionRequest() {},
    sendReactionSuccess() {},

    removeReactionRequest() {},
    removeReactionSuccess() {},

    getAllMessagesFromParentMessageRequest() {},
    getAllMessagesFromParentMessageSuccess() {},
  },
});

export const {
  loadRoomRequest,
  loadRoomSuccess,

  getRoomMessagesRequest,
  getRoomMessagesSuccess,

  sendMessageRequest,
  sendMessageSuccess,

  getRoomInfoRequest,
  getRoomInfoSuccess,

  getAllRoomsRequest,
  getAllRoomsSuccess,

  loadRoomAction,

  getAllUsersRequest,
  getAllUsersSuccess,

  addUserInSelectedList,
  removeUserFromSelectedList,
  selectChallengeParticipants,

  getMoreUsersRequest,
  getMoreUsersSuccess,

  createGroupRequest,
  createGroupSuccess,

  removeParticipantRequest,
  removeParticipantSuccess,

  leaveGroupRequest,
  leaveGroupSuccess,

  updateGroupRequest,
  updateGroupSuccess,

  emptySelectedUsers,

  addMoreParticipantRequest,
  addMoreParticipantSuccess,

  deleteChatRequest,
  deleteChatSuccess,

  emptyChatOnLogout,

  getUnReadChatRequest,
  getUnReadChatSuccess,

  sendReactionRequest,
  sendReactionSuccess,

  removeReactionRequest,
  removeReactionSuccess,

  getAllMessagesFromParentMessageRequest,
  getAllMessagesFromParentMessageSuccess,
} = ChatReducer.actions;

export default ChatReducer.reducer;
