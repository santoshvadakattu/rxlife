import {createSlice} from '@reduxjs/toolkit';

const CommentsReducer = createSlice({
  name: 'user',
  initialState: {
    isFirst: true,
    goalFromSignUp: true,
    isGoalSet: false,
  },
  reducers: {
    setFirstTime(state, action) {
      state.isFirst = action.payload;
    },
    getUser(state, action) {
      state.userData = action.payload;
    },
    setGoalFromSignUp(state, action) {
      state.goalFromSignUp = action.payload;
    },
    setIsGoalSet(state, action) {
      state.isGoalSet = action.payload;
    },
  },
});

export const {getUser, setFirstTime, setGoalFromSignUp, setIsGoalSet} =
  CommentsReducer.actions;

export default CommentsReducer.reducer;
