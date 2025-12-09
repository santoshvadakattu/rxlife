import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import util from '../util';
import {BASE_URL, BASE_URL_WITHOUT_API} from '../config/WebService';

GoogleSignin.configure({
  iosClientId:
    '267709865775-d4ncoqes4p5a0m2nse8sknvq4vubdtrg.apps.googleusercontent.com',
  webClientId:
    '267709865775-eesec89s1nscsbsnqqvjs0vm27hn3s3f.apps.googleusercontent.com',
  offlineAccess: true,
  androidClientId:
    '267709865775-g6fchsq40ek578g8hkec7h93k95d3pb9.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
});

export const GoogleLogin = async (loginRequest) => {
  try {
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const {accessToken} = await GoogleSignin.getTokens();

    const response = await fetch(
      `${BASE_URL_WITHOUT_API}/api/auth/google/callback?access_token=${accessToken}`,
      {
        method: 'GET',
        body: '',
        headers: new Headers({
          Authorization: `Bearer `,
        }),
      },
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.userData?.isDeleted) {
          util.topAlertError(
            'The account linked to this email has been deactivated. Kindly use the new email.',
          );
        } else {
          loginRequest(result);
        }
      });
    // await GoogleSignin.signOut();
    // const hasGooglePlayServices = await GoogleSignin.hasPlayServices();
    // if (!hasGooglePlayServices) {
    // }
    // const userInfo = await GoogleSignin.signIn();
    //
    // loginRequest(userInfo.idToken, 'google');
  } catch (error) {
    console.error('google login error ==>>>', error);
    util.topAlertError("Can't login with google. " + error?.code);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
    }
  }
};
