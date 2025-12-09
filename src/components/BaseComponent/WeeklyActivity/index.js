import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import Text from '../../Text';
import CircularProgress from 'react-native-circular-progress-indicator';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default function WeeklyActivity(props) {
  const {isActive} = props;
  const navigate = useNavigation();
  return (
    <View style={styles.contianer}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              color={Colors.black2}
              type={Fonts.type.base}
              size={Fonts.size.xxxSmall}
              style={{fontWeight: '500'}}>
              Your Weekly Activity
            </Text>
            <Text
              color={'rgba(55, 55, 55, 0.5)'}
              type={Fonts.type.base}
              size={Fonts.size.xxxxxSmall}
              style={{fontWeight: '500'}}>
              Last 7 days
            </Text>
          </View>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() =>
              isActive && navigate.navigate('weeklyActivityListing')
            }>
            <Image
              source={Images.LeftArrow}
              style={{width: 7, height: 12, transform: [{rotate: '180deg'}]}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'space-between',
            }}
            data={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    styles.eachItemView,
                    !isActive && {backgroundColor: 'rgba(155, 155, 155, 0.3)'},
                  ]}>
                  <Text
                    color={Colors.white}
                    type={Fonts.type.base}
                    size={Fonts.size.xxxSmall}
                    style={{fontWeight: '500'}}>
                    {item}
                  </Text>
                  <View style={styles.smallCircle} />
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
