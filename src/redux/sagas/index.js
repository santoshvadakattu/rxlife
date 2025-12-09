import {fork} from 'redux-saga/effects';
import user from './user';
import friends from './friends';
import challenge from './challenge';
import payment from './payment';
import chat from './chat';
import notification from './notification';
import nutritions from './nutritions';

export default function* root() {
  yield fork(user);
  yield fork(friends);
  yield fork(challenge);
  yield fork(payment);
  yield fork(chat);
  yield fork(notification);
  yield fork(nutritions);
}
