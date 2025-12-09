import {combineReducers} from '@reduxjs/toolkit';

import user from './user';
import general from './general';
import friends from './friends';
import challenge from './challenge';
import payment from './payment';
import chat from './chat';
import notification from './notification';
import nutritions from './nutritions';
import recentSearches from './recentSearches';

export default combineReducers({
  user,
  general,
  friends,
  challenge,
  payment,
  chat,
  notification,
  nutritions,
  recentSearches,
});
