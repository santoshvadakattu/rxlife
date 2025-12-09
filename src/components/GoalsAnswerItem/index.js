import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';

export default function GoalsAnswerItem(props) {
  const {title, isActive = false, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(title)}
      style={[
        styles.container,
        isActive && {
          borderColor: '#0D82FF',
          borderWidth: 1,
        },
      ]}>
      <View style={{flex: 0.9}}>
        <Text
          size={14}
          allowFontScaling={false}
          type={Fonts.type.base}
          style={{fontWeight: '500', lineHeight: 21}}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
          alignItems: 'flex-end',
          padding: 4,
        }}>
        <Image
          style={{width: 21, height: 21}}
          source={isActive ? Images.crossGoalIcon : Images.AddGoalIcon}
        />
      </View>
    </TouchableOpacity>
  );
}
