import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';

export default function StateItem(props) {
  const {icon, title, des, imageStyle, hasBottomSeparater, unit} = props;
  return (
    <View style={styles.mainView}>
      <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
        <Image
          source={icon}
          style={[imageStyle, {tintColor: Colors.background.primary}]}
        />
        <View
          style={{
            marginLeft: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={Colors.black2}
            style={{fontWeight: '400'}}>
            {title}
          </Text>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={Colors.black2}
            style={{fontWeight: '400'}}>
            {des} {unit}
          </Text>
        </View>
      </View>
      {hasBottomSeparater && (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: Colors.text.Gray62,
          }}
        />
      )}
    </View>
  );
}
