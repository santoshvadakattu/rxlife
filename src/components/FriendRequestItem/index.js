import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import moment from 'moment';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';

export default function FriendRequestItem({
  item,
  onPressAccept,
  onPressReject,
}) {
  const navigate = useNavigation();
  const {image, fullname, updatedAt, id, requestTime} = item || {};
  return (
    <View style={styles.container}>
      <ButtonView
        onPress={() =>
          navigate.navigate(SCREENS.HOME.friendProfile, {
            positiveTxt: 'Accept',
            nagetiveTxt: 'Reject',
            isFriendProfile: true,
            positiveOnpress: onPressAccept,
            nagetiveOnpress: onPressReject,
            userId: item.id,
          })
        }>
        {image ? (
          <Image
            source={image ? {uri: image} : Images.profile1}
            style={styles.profileImage}
          />
        ) : (
          <View
            style={[
              styles.profileImage,
              {
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Image
              source={Images.ProfileIcon}
              style={[
                styles.icon,
                {
                  tintColor: Colors.background.primary,
                  marginRight: 0,
                },
              ]}
            />
          </View>
        )}
      </ButtonView>
      <View
        style={{
          marginLeft: 10,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={Fonts.size.xSmall}
            style={{fontWeight: '500'}}>
            {fullname}
          </Text>
          <Text
            color={Colors.text.Gray62}
            type={Fonts.type.base}
            size={Fonts.size.xxxxxSmall}
            style={{fontWeight: '500', lineHeight: 15}}>
            {moment(requestTime).format('MMM DD')} at{' '}
            {moment(requestTime).format('hh:mm A')}
          </Text>
        </View>
        <View style={styles.btnsView}>
          <ButtonView
            onPress={() => onPressAccept(id)}
            style={styles.acceptBtn}>
            <Text
              color={Colors.white}
              type={Fonts.type.base}
              size={Fonts.size.xxxSmall}
              style={{fontWeight: '500'}}>
              ACCEPT
            </Text>
          </ButtonView>
          <ButtonView
            onPress={() => onPressReject(id)}
            style={styles.rejectBtn}>
            <Text
              color={Colors.orange3}
              type={Fonts.type.base}
              size={Fonts.size.xxxSmall}
              style={{fontWeight: '500'}}>
              REJECT
            </Text>
          </ButtonView>
        </View>
      </View>
    </View>
  );
}
