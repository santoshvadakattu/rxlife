import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../../Text';
import {Colors, Fonts, Images} from '../../../theme';

export default function ActivitiesItemDash(props) {
  const {image, imageStyle, onPress, txtColor, value, unit, title, isActive} =
    props;
  return (
    <TouchableOpacity
      onPress={() => isActive && onPress(title)}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={image}
        style={[imageStyle, !isActive && {tintColor: Colors.disable}]}
        resizeMode="contain"
      />

      <Text
        color={Colors.text.primary}
        type={'medium'}
        size={Fonts.size.xxxxxSmall}
        style={{marginTop: 6}}>
        {isActive && value ? value : 0} {isActive ? unit : '---'}
      </Text>

      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={9}
        style={{marginTop: 0}}>
        {title}
      </Text>

      <View
        style={{
          height: 14,
          width: 14,
          borderRadius: 7,
          backgroundColor: 'rgba(13, 130, 255, .1)',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
        }}>
        <Image
          source={Images.LeftArrow}
          style={{
            width: 5,
            height: 8,
            tintColor: Colors.background.primary,
            transform: [{rotate: '180deg'}],
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
