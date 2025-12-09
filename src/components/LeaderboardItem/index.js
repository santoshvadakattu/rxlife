import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Text from '../Text';
import {Colors, Fonts, Images} from '../../theme';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';

export default function LeaderboardItem({item, index}) {
  const navigate = useNavigation();
  return (
    <View style={styles.mainView}>
      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={16}
        style={{fontWeight: '600'}}>
        {item.rank ? item.rank : index + 1}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flex: 0.9,
          alignItems: 'center',
        }}>
        <ButtonView
          onPress={() =>
            navigate.navigate(SCREENS.HOME.friendProfile, {
              singleBtnTxt: 'Send Request',
              isFriendProfile: false,
            })
          }>
          <Image
            source={item.image}
            style={{width: 46, height: 46, borderRadius: 23}}
          />
          {item.position && (
            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: -4,
              }}>
              <Image
                source={item.positionimage}
                style={{width: 19, height: 19, borderRadius: 9.5}}
              />
            </View>
          )}
        </ButtonView>
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={14}
            style={{fontWeight: '500'}}>
            {item.name}
          </Text>
          <Text
            color={Colors.text.Gray62}
            type={Fonts.type.base}
            size={10}
            style={{fontWeight: '500'}}>
            {item.points} Points
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        {item.position ? (
          <Image source={Images.Chat} style={{width: 17, height: 17}} />
        ) : (
          <Image
            source={Images.requestPersonalIcon}
            style={{width: 17, height: 21}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
