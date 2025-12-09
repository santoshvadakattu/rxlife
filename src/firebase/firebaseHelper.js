import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import _ from 'lodash';
import DataHandler from '../services/DataHandler';
import {
  deleteDeviceTokenRequest,
  updateDeviceTokenRequest,
  updateUserRequest,
} from '../redux/slicers/user';

const updateDeviceToken = async () => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();

  const userData = DataHandler.getStore().getState().user.userData;

  if (fcmToken?.trim() && userData?.id) {
    // TODO: SEND TOKEN
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        payloadData: {
          fcm: fcmToken,
          timeOffset: new Date().getTimezoneOffset(),
        },
        responseCallback: () => {},
      }),
    );
  }

  return fcmToken;
};

const deleteDeviceToken = async () => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();

  const userData = DataHandler.getStore().getState().user?.userData;

  if (fcmToken && userData?.id) {
    // DELETE DEVICE TOKEN REQUEST
    DataHandler.getStore().dispatch(
      deleteDeviceTokenRequest({
        payloadData: {
          fcm: fcmToken,
        },
        responseCallback: () => {},
      }),
    );
  }

  return fcmToken;
};

export {updateDeviceToken, deleteDeviceToken};
