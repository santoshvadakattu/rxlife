import {View} from 'react-native';
import React, {useEffect} from 'react';
import {VideoPlayer} from '../../components';
import styles from './styles';
import {AppStyles, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {Image} from 'react-native-svg';

const VideoScreen = ({route}) => {
  const {videoUrl} = route?.params || {};
  const navigate = useNavigation();

  useEffect(() => {
    Orientation.unlockAllOrientations();
  }, []);

  return (
    <View style={[styles.modalWrapper]}>
      <View style={AppStyles.flex}>
        <VideoPlayer
          shouldPlayVideo={true}
          paused={false}
          resizeMode={'contain'}
          videoLink={
            videoUrl ?? require('../../assets/Videos/challengeVideo.mp4')
          }
          onClose={() => {
            Orientation.lockToPortrait();
            setTimeout(() => {
              navigate.goBack();
            }, 200);
          }}
          videoView={{
            maxHeight: '100%',
            width: '100%',
            objectFit: 'contain',
            resizeMode: 'contain',
            height: '100%',
          }}
        />
      </View>
    </View>
  );
};

export default VideoScreen;
