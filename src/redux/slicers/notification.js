import {createSlice} from '@reduxjs/toolkit';

const CommentsReducer = createSlice({
  name: 'user',
  initialState: {
    notifications: [],
    total: 0,
  },
  reducers: {
    getNotificationsListRequest() {},
    getNotificationsListSuccess(state, action) {
      state.notifications = action.payload?.notifications;
      state.total = action.payload?.total;
    },

    getNotificationsListPaginationRequest() {},
    getNotificationsListPaginationSuccess(state, action) {
      state.notifications = [
        ...state.notifications,
        ...action.payload?.notifications,
      ];
      state.total = action.payload?.total;
    },

    readNotificationRequest() {},
    readNotificationSuccess(state, action) {
      const allNotifications = [...state.notifications];

      const findIndex = allNotifications.findIndex(
        (item) => item?.id == action?.payload?.id,
      );

      if (findIndex > -1) {
        allNotifications[findIndex] = {
          ...allNotifications[findIndex],
          isRead: true,
        };

        state.notifications = [...allNotifications];
      }
    },
  },
});

export const {
  getNotificationsListRequest,
  getNotificationsListSuccess,

  getNotificationsListPaginationRequest,
  getNotificationsListPaginationSuccess,

  readNotificationRequest,
  readNotificationSuccess,
} = CommentsReducer.actions;

export default CommentsReducer.reducer;
