import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';

export default function WeeklyActivityItem({item, index, onPress}) {
  return (
    <TouchableOpacity
      onPress={() => onPress(index, item)}
      style={styles.mainView}>
      <View style={styles.innerView}>
        <View
          style={{
            width: 25,
            height: 40,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Image
            source={item.image}
            style={[item.imageStyle, {resizeMode: 'contain'}]}
          />
        </View>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={14}
          style={{fontWeight: '500', marginLeft: 10}}>
          {item.title}
        </Text>
      </View>

      <ImageBackground
        source={Images.ActivityWays}
        style={styles.bgImage}
        imageStyle={[styles.bgImageStyle, {tintColor: item.color}]}>
        <View
          style={[styles.bgInnerView, {backgroundColor: item.color}]}></View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
