import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import moment from 'moment';
import ButtonView from '../ButtonView';

export default function NotificationItem(props) {
  const {item, onPress} = props;
  return (
    <ButtonView
      onPress={onPress}
      style={[
        styles.cantainer,
        !item.isRead && {
          borderWidth: 1,
          borderColor: Colors.background.primary,
        },
      ]}>
      <View style={styles.iconView}>
        {item.type == 1 && (
          <Image
            source={Images.NotificationAlarms}
            style={{width: 19, height: 21}}
          />
        )}
        {item.type == 2 && (
          <Image
            source={Images.FriendRequest}
            style={{width: 20, height: 19}}
          />
        )}
        {item.type == 3 && (
          <Image source={Images.PeopleGroup} style={{width: 21, height: 21}} />
        )}
      </View>

      <View style={{marginLeft: 10}}>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{fontWeight: '500', lineHeight: 21}}>
          {item.title}
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xxxSmall}
          style={{
            fontWeight: '400',
            lineHeight: 18,
            paddingRight: 35,
          }}>
          {item.description}
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.text.Gray62}
          size={Fonts.size.xxxSmall}
          style={{fontWeight: '400', lineHeight: 16}}>
          {moment(item.date).format('MMM DD')} at{' '}
          {moment(item.date).format('hh:mm A')}
        </Text>
      </View>
    </ButtonView>
  );
}
