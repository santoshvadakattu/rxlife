import messaging from '@react-native-firebase/messaging';
import DataHandler from '../services/DataHandler';
import {updateDeviceTokenRequest} from '../redux/slicers/user';
// import {notificationTokenRequest} from '../redux/slicers/gerenal';
import {PermissionsAndroid} from 'react-native';
import util from '../util';

export async function requestUserPermission() {
  if (util.isPlatformAndroid()) {
    const enabled = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (enabled === 'granted') {
      updateDeviceToken();
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      updateDeviceToken();
    }
  }
}
const updateDeviceToken = async () => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();

  const userData = DataHandler.getStore().getState().user.userData;

  if (fcmToken?.trim() && userData?.id) {
    // TODO: SEND NOTIFICATION TOKEN REQUEST
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

export const notificationSerivces = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {});

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
      }
    });
};
