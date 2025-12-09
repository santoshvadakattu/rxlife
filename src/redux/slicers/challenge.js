import {createSlice} from '@reduxjs/toolkit';

const ChallengeReducer = createSlice({
  name: 'challenge',
  initialState: {
    allChallenges: [],
    searchChallenges: [],
    ongoingChallenges: [],
    myCompletedChallenges: [],
    ongoingLeaderboard: [],
    ongoingTasks: [],
  },
  reducers: {
    getAllChallengesRequest() {},
    getAllChallengesSuccess(state, action) {
      state.allChallenges = action?.payload ?? [];
    },

    getAllChallengesPaginationRequest() {},
    getAllChallengesPaginationSuccess(state, action) {
      state.allChallenges = [...state.allChallenges, ...action?.payload];
    },

    getSearchAllChallengesRequest() {},
    getSearchAllChallengesSuccess(state, action) {
      state.searchChallenges = action?.payload ?? [];
    },

    getSearchAllChallengesPaginationRequest() {},
    getSearchAllChallengesPaginationSuccess(state, action) {
      state.searchChallenges = [...state.searchChallenges, ...action?.payload];
    },

    joinChallengeRequest() {},
    joinChallengeSuccess(state, action) {
      // const allChallenges = [...state.allChallenges];
      // state.allChallenges = allChallenges?.filter(
      //   (c) => c?.id != action?.payload?.id,
      // );
    },

    getOnGoingChallengesRequest() {},
    getOnGoingChallengesSuccess(state, action) {
      state.ongoingChallenges = action.payload;
    },

    getOnGoingChallengesPaginationRequest() {},
    getOnGoingChallengesPaginationSuccess(state, action) {
      state.ongoingChallenges = [...state.ongoingChallenges, ...action.payload];
    },

    createCompleteChallengeRequest() {},
    createCompleteChallengeSuccess() {},

    updateCompleteChallengeRequest() {},
    updateCompleteChallengeSuccess() {},

    getCompleteChallengeRequest() {},
    getCompleteChallengeSuccess() {},

    getMyCompletedChallengesRequest() {},
    getMyCompletedChallengesSuccess(state, action) {
      state.myCompletedChallenges = action.payload;
    },

    getMyCompletedChallengesPaginationRequest() {},
    getMyCompletedChallengesPaginationSuccess(state, action) {
      state.myCompletedChallenges = [
        ...state.myCompletedChallenges,
        ...action.payload,
      ];
    },

    challengeLogoutUser(state) {
      state.allChallenges = [];
      state.searchChallenges = [];
      state.ongoingChallenges = [];
    },

    getIndiviualLeaderboardRequest() {},
    getIndiviualLeaderboardSuccess() {},

    getOngoingChallengeLeaderboardsRequest() {},
    getOngoingChallengeLeaderboardsSuccess(state, action) {
      state.ongoingLeaderboard = action?.payload;
    },

    joinChallengeGroupRequest() {},
    joinChallengeGroupSuccess() {},

    getOneChallengeRequest() {},
    getOneChallengeSuccess(state, action) {
      if (action.payload.myChallenge) {
        state.ongoingChallenges = [
          ...state.ongoingChallenges,
          ...action.payload?.response,
        ];
      } else {
        state.allChallenges = [
          ...state.allChallenges,
          ...action.payload?.response,
        ];
      }
    },

    getDashboardTasksRequest() {},
    getDashboardTasksSuccess(state, action) {
      state.ongoingTasks = action.payload;
    },

    updateDashboardTasksRequest(state, action) {
      const allItems = action.payload?.allItems;
      const currentIndex = action.payload?.currentIndex;

      const ongoingTasks = [...state.ongoingTasks];
      if (ongoingTasks?.[currentIndex]?.tasks?.length > 0) {
        ongoingTasks[currentIndex].tasks = allItems;
        state.ongoingTasks = ongoingTasks;
      }
    },
    updateDashboardTasksSuccess() {},
  },
});

export const {
  getAllChallengesRequest,
  getAllChallengesSuccess,

  getAllChallengesPaginationRequest,
  getAllChallengesPaginationSuccess,

  getSearchAllChallengesRequest,
  getSearchAllChallengesSuccess,

  getSearchAllChallengesPaginationRequest,
  getSearchAllChallengesPaginationSuccess,

  joinChallengeRequest,
  joinChallengeSuccess,

  getOnGoingChallengesRequest,
  getOnGoingChallengesSuccess,
  getOnGoingChallengesPaginationRequest,
  getOnGoingChallengesPaginationSuccess,

  createCompleteChallengeRequest,
  createCompleteChallengeSuccess,

  getCompleteChallengeRequest,
  getCompleteChallengeSuccess,

  updateCompleteChallengeRequest,
  updateCompleteChallengeSuccess,

  getMyCompletedChallengesRequest,
  getMyCompletedChallengesSuccess,

  getMyCompletedChallengesPaginationRequest,
  getMyCompletedChallengesPaginationSuccess,

  challengeLogoutUser,

  getIndiviualLeaderboardRequest,
  getIndiviualLeaderboardSuccess,

  getOngoingChallengeLeaderboardsRequest,
  getOngoingChallengeLeaderboardsSuccess,

  joinChallengeGroupRequest,
  joinChallengeGroupSuccess,

  getOneChallengeRequest,
  getOneChallengeSuccess,

  getDashboardTasksRequest,
  getDashboardTasksSuccess,

  updateDashboardTasksRequest,
  updateDashboardTasksSuccess,
} = ChallengeReducer.actions;

export default ChallengeReducer.reducer;
