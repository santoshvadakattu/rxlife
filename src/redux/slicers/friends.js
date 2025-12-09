import {createSlice} from '@reduxjs/toolkit';
import {
  manipulateUserDataFromRequestUser,
  manipulateUserDataFromSearchUser,
  manipulateUserDataFromViewProfileUser,
} from '../../Helper/friendsMainpulator';
import {manipulateUserDataFromGetUser} from '../../Helper/userMainpulator';
import DataHandler from '../../services/DataHandler';
import util from '../../util';

const FriendsReducer = createSlice({
  name: 'friends',
  initialState: {
    friendRequest: [],
    friends: [],
    friendProfile: {},
    searchFriends: [],
  },
  reducers: {
    getFriendsRequestRequest() {},
    getFriendsRequestSuccess(state, action) {
      state.friendRequest = manipulateUserDataFromRequestUser(action.payload);
    },

    getFriendsRequest() {},
    getFriendsSuccess(state, action) {
      state.friends = manipulateUserDataFromRequestUser(action.payload);
    },

    getSearchFriendsRequest() {},
    getSearchFriendsSuccess(state, action) {
      const {userId, data} = action.payload;
      state.searchFriends = manipulateUserDataFromSearchUser(data, userId);
    },

    getFriendsViewProfileRequest() {},
    getFriendsViewProfileSuccess(state, action) {
      state.friendProfile = manipulateUserDataFromViewProfileUser(
        action.payload,
      );
    },

    sendFriendRequestRequest() {},

    acceptFriendRequestRequest() {},

    rejectFriendRequestRequest() {},

    unFriendRequestRequest() {},

    removeRequestRequest() {},

    reducerAfterRequestSend(state, action) {
      let tempArr = util.cloneDeep(state.searchFriends);

      const mIndex = util.findIndexById(tempArr, action.payload.id);
      if (mIndex != -1) {
        tempArr[mIndex]['isRequestSent'] = true;
      }
      state.searchFriends = tempArr;
    },
    reducerAfterUnRequestSend(state, action) {
      let tempArr = util.cloneDeep(state.searchFriends);
      const mIndex = util.findIndexById(tempArr, action.payload.id);
      if (mIndex != -1) {
        tempArr[mIndex]['isRequestSent'] = false;
      }
      state.searchFriends = tempArr;
    },

    reducderAfterUnfriend(state, action) {
      let temArr = util.cloneDeep(state.friends);
      temArr = temArr.filter((item) => item.id != action.payload.id);

      state.friends = temArr;
    },
    removeSearchFriends(state, action) {
      state.searchFriends = [];
    },

    friendsLogoutUser(state) {
      state.friendProfile = {};
      state.friendRequest = [];
      state.friends = [];
      state.searchFriends = [];
    },
  },
});

export const {
  getFriendsRequestRequest,
  getFriendsRequestSuccess,
  getFriendsRequest,
  getFriendsSuccess,
  getSearchFriendsRequest,
  getSearchFriendsSuccess,
  getFriendsViewProfileRequest,
  getFriendsViewProfileSuccess,
  sendFriendRequestRequest,
  acceptFriendRequestRequest,
  rejectFriendRequestRequest,
  unFriendRequestRequest,
  removeRequestRequest,
  reducerAfterRequestSend,
  reducerAfterUnRequestSend,
  reducderAfterUnfriend,
  removeSearchFriends,
  friendsLogoutUser,
} = FriendsReducer.actions;

export default FriendsReducer.reducer;
