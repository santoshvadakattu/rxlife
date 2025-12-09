import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import Text from '../../Text';
import styles from './styles';

export default function ActivitiesItem(props) {
  const {value, unit, title, onPress, image, imageStyle, isActive} = props;
  return (
    <TouchableOpacity
      onPress={() => isActive && onPress(title)}
      style={styles.mainView}>
      <View style={styles.innerView}>
        <Text
          type={Fonts.type.base}
          size={Fonts.size.xSmall}
          style={{fontWeight: '500'}}>
          {title}
        </Text>
        <Image
          source={image}
          style={[imageStyle, !isActive && {tintColor: Colors.disable}]}
        />
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            AppStyles.spaceBetween,
            AppStyles.pRight15,
          ]}>
          <Text
            color={isActive ? Colors.black2 : Colors.disable}
            type={Fonts.type.base}
            size={Fonts.size.medium}
            style={{fontWeight: '600'}}>
            {isActive ? value ?? 0 : '---'} {unit}
          </Text>

          <Image
            source={Images.LeftArrow}
            style={{width: 7, height: 12, transform: [{rotate: '180deg'}]}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
