import {Image, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import Text from '../Text';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';

export default function ProgramDayItem(props) {
  const {isLock, title, des, value} = props || {};
  const progressRef = useRef(null);
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={isLock ? 1 : 0.5}
      style={styles.mainView}
      onPress={() => {
        if (!isLock) {
          navigate.navigate(SCREENS.PROGRAMS.programDays, {
            title: title,
          });
        }
      }}>
      <View>
        <Text
          size={16}
          type={Fonts.type.base}
          style={{fontWeight: '600', lineHeight: 24}}>
          {title}
        </Text>
        <Text
          size={14}
          type={Fonts.type.base}
          style={{fontWeight: '400', lineHeight: 21}}>
          {des}
        </Text>
      </View>
      <View>
        {isLock ? (
          <Image source={Images.LockIcon} />
        ) : (
          <View>
            <CircularProgress
              value={value}
              radius={20}
              ref={progressRef}
              maxValue={100}
              initialValue={0}
              activeStrokeWidth={5}
              inActiveStrokeWidth={5}
              progressValueColor={Colors.text.primary}
              activeStrokeColor={Colors.background.primary}
              inActiveStrokeColor={Colors.background.themeLight}
              clockwise={true}
              progressValueFontSize={10}
              progressFormatter={(value) => {
                'worklet';
                return `${Math.round(value)}%`;
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
