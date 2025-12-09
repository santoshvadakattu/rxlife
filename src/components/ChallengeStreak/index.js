import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Text from '../Text';
import {Colors, Fonts, Images} from '../../theme';

export default function ChallengeStreak({streak = 0, points = 0}) {
  return (
    <View style={styles.container}>
      <View style={styles.fireView}>
        <Image source={Images.Fire} style={{width: 21, height: 28}} />
      </View>
      <View style={{marginLeft: 10}}>
        <Text
          type={Fonts.type.base}
          size={Fonts.size.xSmall}
          color={Colors.black2}
          style={{fontWeight: '500', lineHeight: 21}}>
          {streak} daily challenge streak
        </Text>
        <Text
          type={Fonts.type.base}
          size={Fonts.size.xxxSmall}
          color={Colors.black2}
          style={{fontWeight: '400', lineHeight: 18}}>
          You're on a role. Keep it up!
        </Text>
        <Text
          type={Fonts.type.base}
          size={Fonts.size.xxxSmall}
          color={Colors.orange3}
          style={{fontWeight: '400', lineHeight: 18}}>
          {points} Bonus Points
        </Text>
      </View>
    </View>
  );
}
