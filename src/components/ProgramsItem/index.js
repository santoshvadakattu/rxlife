import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BlurView} from '@react-native-community/blur';

import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import Text from '../Text';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';
import moment from 'moment';

const ProgramsItem = (props) => {
  const {onPress} = props || {};

  const navigate = useNavigation();
  const [bgImage, setBgImage] = useState('');

  const onVideoPlayClick = () => {};

  const hasVideoLink = '';

  const renderContent = () => {
    return (
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={Images.dummyImage1}
          style={styles.box}
          imageStyle={styles.bgImage}>
          <View style={styles.marginView}>
            <View
              style={{
                overflow: 'hidden',
                width: '100%',
                height: 87,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 12,
              }}>
              <BlurView
                style={{
                  position: 'absolute',
                  bottom: 0,
                  top: 0,
                  right: 0,
                  left: 0,
                  borderRadius: 12,
                }}
                blurRadius={5}
                blurAmount={10}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    width: '90%',
                    height: 80,
                  }}>
                  <View style={styles.titleWrapper}>
                    <Text
                      size={Fonts.size.xSmall}
                      color={Colors.white}
                      type={'medium'}>
                      4 Weeks Fat Loss Program
                    </Text>
                    <Text
                      size={Fonts.size.xxxxxSmall}
                      color={Colors.white}
                      type={'medium'}>
                      04 Exersice
                    </Text>
                  </View>

                  <View style={styles.challengeInfo}>
                    <Text
                      size={Fonts.size.xSmall}
                      color={Colors.white}
                      style={{fontWeight: '500'}}>
                      $10.00
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <ButtonView
      rippleOnAndroid={true}
      onPress={() => {
        navigate.navigate(
          myChallenge
            ? SCREENS.HOME.myChallengeDetail
            : SCREENS.HOME.challengeDetail,
          {
            challengeId: data?.id,
            myChallenge,
          },
        );
      }}>
      {renderContent()}
    </ButtonView>
  );
};

export default ProgramsItem;
