import {Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../Text';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';
import {
  acceptFriendRequestRequest,
  reducerAfterRequestSend,
  reducerAfterUnRequestSend,
  removeRequestRequest,
  sendFriendRequestRequest,
  unFriendRequestRequest,
} from '../../redux/slicers/friends';
import {useDispatch, useSelector} from 'react-redux';
import {loadRoomRequest} from '../../redux/slicers/chat';

const LeaderBoardPerson = ({item, isListing}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state?.user);

  const [userInfo, setUserInfo] = useState(item);

  useEffect(() => {
    setUserInfo(item);
  }, [item]);

  const handleNavigate = () => {
    if (userInfo?.userId == userData?.id) {
      navigate.navigate(SCREENS.HOME.profile);
      return;
    }

    if (userInfo?.isFriend) {
      navigate.navigate(SCREENS.HOME.friendProfile, {
        positiveTxt: 'Message',
        nagetiveTxt: 'Unfriend',
        isFriendProfile: true,
        nagetiveOnpress: onPressUnFriend,
        userId: item.userId,
        positiveOnpress: handleLoadChatRoom,
      });
      return;
    }

    if (userInfo?.isRequest) {
      navigate.navigate(SCREENS.HOME.friendProfile, {
        positiveTxt: 'Message',
        nagetiveTxt: 'Unfriend',
        isFriendProfile: false,
        singleBtnTxt: 'Sent Request',
        userId: item.userId,
        positiveOnpress: handleLoadChatRoom,
      });
      return;
    }

    navigate.navigate(SCREENS.HOME.friendProfile, {
      positiveTxt: 'Message',
      nagetiveTxt: 'Unfriend',
      isFriendProfile: false,
      singleBtnTxt: 'Send Request',
      userId: item.userId,
      positiveOnpress: handleLoadChatRoom,
    });
  };

  function onPressUnFriend() {
    const payload = {
      data: {
        id: item?.userId,
      },
      userId: userData.id,
    };
    dispatch(
      unFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            const _userInfo = {
              ...userInfo,
              isFriend: false,
              isRequest: false,
            };
            setUserInfo({..._userInfo});
          }
        },
      }),
    );
  }

  function sendRequest() {
    const payload = {
      data: {
        requests: {
          connect: [
            {
              id: userData.id,
            },
          ],
        },
        isRequested: true,
      },
      senderId: item.userId,
    };
    dispatch(
      sendFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status) => {
          if (status) {
            const _userInfo = {
              ...userInfo,
              isRequest: true,
            };
            setUserInfo({..._userInfo});
          }
        },
      }),
    );
  }

  function removeRequest() {
    const payload = {
      data: {
        requests: {
          disconnect: [
            {
              id: userData.id,
            },
          ],
        },
      },
      senderId: item.userId,
    };
    dispatch(
      removeRequestRequest({
        payloadData: payload,
        responseCallback: (status) => {
          if (status) {
            const _userInfo = {
              ...userInfo,
              isRequest: false,
            };
            setUserInfo({..._userInfo});
          }
        },
      }),
    );
  }

  function acceptRequest() {
    const payload = {
      data: {
        id: item?.userId,
      },
      userId: userData.id,
    };
    dispatch(
      acceptFriendRequestRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          if (status) {
            const _userInfo = {
              ...userInfo,
              isFriend: true,
              isRequest: false,
            };
            setUserInfo({..._userInfo});
          }
        },
      }),
    );
  }

  const handleLoadChatRoom = () => {
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
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // height: 46,
          marginBottom: 15,
          backgroundColor: Colors.white,
          flex: 1,
        },
        isListing && AppStyles.mTop5,
        isListing && AppStyles.themeShadow,
        isListing && {
          padding: 12,
          borderRadius: 12,
        },
      ]}>
      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={16}
        style={{fontWeight: '600'}}>
        {userInfo?.rank}
      </Text>
      <View style={{flexDirection: 'row', flex: 1, paddingLeft: 20}}>
        <ButtonView onPress={handleNavigate}>
          <Image
            source={
              userInfo?.image?.url
                ? {uri: userInfo?.image?.url}
                : Images.Placeholder
            }
            style={{width: 46, height: 46, borderRadius: 23}}
          />
          {userInfo?.rank == 1 && userInfo?.points > 0 && (
            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: -4,
              }}>
              <Image
                source={Images.firstPosition}
                style={{width: 19, height: 19, borderRadius: 9.5}}
              />
            </View>
          )}

          {userInfo?.rank == 2 && userInfo?.points > 0 && (
            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: -4,
              }}>
              <Image
                source={Images.SecondPosition}
                style={{width: 19, height: 19, borderRadius: 9.5}}
              />
            </View>
          )}

          {userInfo?.rank == 3 && userInfo?.points > 0 && (
            <View
              style={{
                position: 'absolute',
                bottom: 3,
                right: -4,
              }}>
              <Image
                source={Images.thirdPosition}
                style={{width: 19, height: 19, borderRadius: 9.5}}
              />
            </View>
          )}
        </ButtonView>
        <View
          style={{
            marginLeft: 10,
            justifyContent: 'center',
          }}>
          <Text
            color={Colors.black2}
            type={Fonts.type.base}
            size={14}
            style={{fontWeight: '500'}}>
            {userInfo?.fullName}
          </Text>
          <Text
            color={Colors.text.Gray62}
            type={Fonts.type.base}
            size={10}
            style={{fontWeight: '500'}}>
            {userInfo?.points} Points
          </Text>
        </View>
      </View>

      {userInfo?.isFriend && userData?.id != userInfo?.userId && (
        <TouchableOpacity
          onPress={handleLoadChatRoom}
          style={{
            width: 30,
            height: 30,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.Chat}
            style={{width: 22.68, height: 22.68, objectFit: 'contain'}}
          />
        </TouchableOpacity>
      )}

      {!userInfo?.isFriend &&
        userInfo?.isRequest &&
        userData?.id != userInfo?.userId && (
          <TouchableOpacity
            onPress={removeRequest}
            style={{
              width: 30,
              height: 30,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.SendPersonalIcon}
              style={{width: 18, height: 20, objectFit: 'contain'}}
            />
          </TouchableOpacity>
        )}

      {!userInfo?.isFriend &&
        userData?.id != userInfo?.userId &&
        !userInfo?.isRequest && (
          <TouchableOpacity
            onPress={sendRequest}
            style={{
              width: 30,
              height: 30,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.requestPersonalIcon}
              style={{width: 17, height: 21, objectFit: 'contain'}}
            />
          </TouchableOpacity>
        )}
    </View>
  );
};

export default LeaderBoardPerson;
