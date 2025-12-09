import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import querystring from 'querystring';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import {OAUTH_ROOT, GARMIN} from 'configs/api';
// import {useConnectGarmin} from 'hooks/garmin';
import Loading from './Loading';
import {useConnectGarmin} from '../../hooks/useConnectGarmin';
import {GARMIN, OAUTH_ROOT} from '../../config/WebService';
import ButtonView from '../ButtonView';
import {Colors, Fonts, Images} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {deleteGarminUserRequest} from '../../redux/slicers/user';
import {useNavigation} from '@react-navigation/native';
import Text from '../Text';

const Garmin = ({
  handleSuccess,
  fitBitConnected,
  garminConnected,
  setShowModal,
  garminLoading,
  isFitBitLoading,
  setGarminLoading,
  fromSignup,
  setSignUp = () => {},
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [isGarminLoading, setIsGarminLoading] = useState(false);
  const userGarmin = useSelector(({user}) => user?.data?.user?.garmin);

  const {
    data,
    token,
    doRequest,
    doAccess,
    setState,
    loadingRequest,
    prevLoadingRequest,
    successRequest,
    loadingAccess,
    prevLoadingAccess,
    successAccess,
    getGarminUserInfo,
    createGarmin,
  } = useConnectGarmin(setIsGarminLoading);

  const onHide = () => {
    setVisible(false);
    setGarminLoading(false);
    setIsGarminLoading(false);
  };

  useEffect(() => {
    if (prevLoadingRequest && !loadingRequest) {
      if (successRequest) {
        setVisible(true);
        setIsGarminLoading(true);
        setGarminLoading(true);
      }
    }
  }, [loadingRequest, prevLoadingRequest]);

  useEffect(() => {
    if (prevLoadingAccess && !loadingAccess) {
      if (successAccess) {
        setIsGarminLoading(true);
        setGarminLoading(true);
        getGarminUserInfo(() => {
          setIsGarminLoading(false);
          setGarminLoading(true);
          if (fromSignup) {
            setSignUp();
          } else {
            navigate.goBack();
          }
        });
      }
    }
  }, [prevLoadingAccess, loadingAccess]);

  const onNavigationStateChange = (state) => {
    if (state?.url?.includes('oauth_verifier')) {
      const parse = querystring.parse(state.url.replace('?', '&'));
      if (parse?.oauth_verifier !== 'null') {
        setState({
          verifier: parse?.oauth_verifier,
        });
      } else {
        setState({
          verifier: '',
          token: {key: '', secret: ''},
          successAccess: false,
          successRequest: false,
        });
      }
      setVisible(false);
    }
  };

  const onCancel = () => {
    setState({
      verifier: '',
      token: {key: '', secret: ''},
      successAccess: false,
      successRequest: false,
    });
    setVisible(false);
    setIsGarminLoading(false);
    setGarminLoading(false);
  };

  const renderModal = () => {
    return (
      <Modal
        isVisible={visible}
        onDismiss={onHide}
        useNativeDriver
        hideModalContentWhileAnimating
        onBackButtonPress={onHide}
        onBackdropPress={onHide}
        onSwipeComplete={onHide}
        style={styles.modal}
        onModalHide={doAccess}>
        <View style={styles.containerModal}>
          <View style={styles.containerModalHeader}>
            <TouchableOpacity onPress={onCancel}>
              <Text>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
          <WebView
            source={{
              uri: OAUTH_ROOT + GARMIN.OAUTH_CONFIRM + token?.key,
            }}
            onNavigationStateChange={onNavigationStateChange}
            startInLoadingState
            // renderLoading={() => <Loading show={true} />}
            injectedJavaScript={injectScript(bottom)}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <ButtonView
        activeOpacity={fitBitConnected ? 0.3 : 1}
        disabled={fitBitConnected}
        onPress={() =>
          !isFitBitLoading &&
          !isGarminLoading &&
          !garminLoading &&
          (garminConnected ? setShowModal(true) : doRequest())
        }
        style={[styles.btnView]}>
        <View style={styles.deviceIconVIew}>
          <Image source={Images.Garmin} style={{width: 21, height: 19}} />
        </View>
        <Text
          color={Colors.white}
          type={Fonts.type.base}
          size={Fonts.size.xSmall}
          style={{
            fontWeight: '400',
            flex: 0.95,
            marginLeft: 15,
            color: Colors.black,
            fontSize: 14,
          }}>
          {garminConnected ? 'Disconnect Garmin' : 'Connect with Garmin '}
        </Text>

        {isGarminLoading || garminLoading ? (
          <ActivityIndicator size={'large'} color={Colors.background.primary} />
        ) : (
          <Image source={Images.forwordIcon} />
        )}
      </ButtonView>

      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  containerModal: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  containerModalHeader: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  btnView: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 2,
    justifyContent: 'center',
    height: 63,
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  deviceIconVIew: {
    backgroundColor: Colors.background.primary,
    width: 45,
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt2: {
    flex: 0.95,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
  },
});

const injectScript = (bottom) => `
  const style = document.createElement('style');
  style.innerHTML = 'body { padding-bottom: ${bottom}px }'
  document.head.appendChild(style);
`;

export default Garmin;
