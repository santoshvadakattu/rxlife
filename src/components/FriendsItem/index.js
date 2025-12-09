import {Image, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import Text from '../Text';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {loadRoomRequest} from '../../redux/slicers/chat';

export default function FriendsItem({item, onPressUnFriend}) {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {image, fullname} = item || {};

  const {userData} = useSelector((state) => state?.user);

  const handleLoadRoom = () => {
    const payload = {
      receiverID: item?.chatUserId,
      senderID: userData?.chatUserId,
      room_type: 'individual',
    };

    dispatch(
      loadRoomRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status) => {
          if (status) {
            navigate.navigate(SCREENS.HOME.chat);
          }
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ButtonView
        onPress={() =>
          navigate.navigate(SCREENS.HOME.friendProfile, {
            positiveTxt: 'Message',
            nagetiveTxt: 'Unfriend',
            isFriendProfile: true,
            nagetiveOnpress: onPressUnFriend,
            userId: item.id,
            positiveOnpress: handleLoadRoom,
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
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ButtonView
          onPress={() =>
            navigate.navigate(SCREENS.HOME.friendProfile, {
              positiveTxt: 'Message',
              nagetiveTxt: 'Unfriend',
              isFriendProfile: true,
              nagetiveOnpress: onPressUnFriend,
              userId: item.id,
              positiveOnpress: handleLoadRoom,
            })
          }>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={Fonts.size.xSmall}
            style={{fontWeight: '500'}}>
            {fullname}
          </Text>
        </ButtonView>
        <ButtonView style={styles.rejectBtn} onPress={handleLoadRoom}>
          <Image source={Images.Chat} style={{width: 22, height: 22}}></Image>
        </ButtonView>
      </View>
    </View>
  );
}
