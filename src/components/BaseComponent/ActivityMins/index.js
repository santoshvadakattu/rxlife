import {View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../theme';
import Text from '../../Text';
import styles from './syles';
import {useSelector} from 'react-redux';

export default function ActivityMins(props) {
  const {isActive} = props;
  const {garminData} = useSelector((state) => state?.user);
  const intensity = garminData?.intensity ?? 0;

  const hours = intensity > 60 ? Math.floor(intensity / 60) : 0;
  const minutes = intensity > 0 ? intensity % 60 : 0;

  return (
    <View style={styles.container}>
      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={Fonts.size.normal}
        style={{fontWeight: '600'}}>
        Activity Minutes
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginTop: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text
            color={isActive ? Colors.background.primary : Colors.disable}
            type={Fonts.type.base}
            size={Fonts.size.xLarge}
            style={{
              fontWeight: '600',
            }}>
            {isActive ? (hours < 10 ? `0${hours}` : hours) : '--'} {` `}
          </Text>
          <Text
            color={isActive ? Colors.background.primary : Colors.disable}
            size={Fonts.size.xxxSmall}
            style={{fontWeight: '600', marginTop: 5}}>
            :hours
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginLeft: 15,
          }}>
          <Text
            color={isActive ? Colors.background.primary : Colors.disable}
            type={Fonts.type.base}
            size={Fonts.size.xLarge}
            style={{
              fontWeight: '600',
            }}>
            {isActive ? (minutes < 10 ? `0${minutes}` : minutes) : '--'} {` `}
          </Text>
          <Text
            color={isActive ? Colors.background.primary : Colors.disable}
            size={Fonts.size.xxxSmall}
            style={{fontWeight: '600', marginTop: 5}}>
            :minutes
          </Text>
        </View>
      </View>
    </View>
  );
}
