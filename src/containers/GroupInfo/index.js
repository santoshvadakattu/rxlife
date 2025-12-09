import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  ButtonView,
  ChatHeader,
  EmptyList,
  ModalCancel,
  Participant,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {
  deleteChatRequest,
  getRoomInfoRequest,
  leaveGroupRequest,
  removeParticipantRequest,
} from '../../redux/slicers/chat';
import {DisplayBottom} from '../../Partials';
import {SCREENS} from '../../constants';

const CHAT_LIST = [
  {
    fullName: 'Test 1',
    message: 'Message 1',
    time: '2:10 PM',
    id: 1,
  },
  {
    fullName: 'Test 1',
    message: 'Message 1',
    time: '2:10 PM',
    id: 2,
  },
  {
    fullName: 'Test 1',
    message: 'Message 1',
    time: '2:10 PM',
    id: 3,
  },
  {
    fullName: 'Test 1',
    message: 'Message 1',
    time: '2:10 PM',
    id: 4,
  },
  {
    fullName: 'Test 1',
    message: 'Message 1',
    time: '2:10 PM',
    id: 5,
  },
];

const ChatMedia = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {selectedRoom} = useSelector((state) => state?.chat);
  const {userData} = useSelector((state) => state?.user);

  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [exitGroupVisible, setExitGroupVisible] = useState(false);
  const [removeParticipant, setRemoveParticipant] = useState({});

  const [mediaData, setMediaData] = useState({
    data: [],
    olderData: [],
    recentData: [],
    lastWeekData: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const payload = {
      payloadData: {
        query: `room_id=${selectedRoom?.id}`,
      },
      headers: {
        Authorization: `Bearer ${userData?.chatUserId}`,
      },
      responseCallback: (status, res) => {
        setIsLoading(false);
        if (status) {
          setMediaData(res);
        }
      },
    };

    dispatch(getRoomInfoRequest(payload));
  }, []);

  const handleRemoveParticipant = () => {
    const payload = {
      user_id: removeParticipant?.id,
      room_id: selectedRoom?.id,
    };

    dispatch(
      removeParticipantRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: () => {},
      }),
    );
  };

  const handleLeaveGroup = () => {
    dispatch(
      leaveGroupRequest({
        payloadData: {room_id: selectedRoom?.id},
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status) => {
          if (status) {
            navigate.navigate(SCREENS.HOME.chatList);
          }
        },
      }),
    );
  };

  const handleDeleteChat = () => {
    dispatch(
      deleteChatRequest({
        payloadData: {
          room_id: selectedRoom?.id,
        },
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: () => {},
      }),
    );
  };

  const findMe = selectedRoom?.members?.find(
    (item) => item?.id === userData?.chatUserId,
  );

  let disabled = false;

  if (findMe) {
    disabled = findMe?.isLeaved || findMe?.isRemoved || false;
  }

  const renderTitle = (title) => {
    return (
      <View
        style={[
          AppStyles.flex,
          AppStyles.flexRow,
          AppStyles.alignItemsCenter,
          AppStyles.spaceBetween,
          AppStyles.mTop15,
        ]}>
        <View style={styles.titleWrapper}>
          <Text size={Fonts.size.xxxxxSmall} type="base">
            {title}
          </Text>
        </View>
        <ButtonView onPress={() => navigate.navigate(SCREENS.HOME.chatMedia)}>
          <Text
            type="medium"
            size={Fonts.size.xxxSmall}
            color={Colors.background.primary}>
            See More
          </Text>
        </ButtonView>
      </View>
    );
  };

  const shouldDisplayBottom =
    !selectedRoom?.challengeId && userData.isAdmin && !disabled;

  let mediaDataAll = mediaData?.data?.sort(
    (a, b) => new Date(b?.created_at) - new Date(a?.created_at),
  );
  mediaDataAll = mediaDataAll?.slice(0, 8);
  return (
    <View style={styles.container}>
      <ChatHeader
        title={selectedRoom?.roomName}
        roomImage={selectedRoom?.roomImage}
        subTitle="Media"
        hasBorder={false}
        isClickable={false}
        // onTitlePress={() => navigate.navigate(SCREENS.HOME.chatMedia)}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
        rightBtnImage={Images.TrashRed}
        rightBtnPress={() => setIsDeleteVisible(true)}
        isEditAllowed={userData?.isAdmin && !disabled}
        editIconPress={() => navigate.navigate(SCREENS.HOME.editGroup)}
        leaveChat={!disabled && !userData?.isAdmin}
        leaveChatPress={() => setExitGroupVisible(true)}
      />

      {isLoading && (
        <ActivityIndicator size={'large'} style={AppStyles.mTop15} />
      )}

      {!isLoading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[AppStyles.flex, shouldDisplayBottom && {marginBottom: 100}]}>
          {mediaDataAll?.length > 0 && (
            <>
              {mediaData?.recentData?.length > 0
                ? renderTitle('Recent')
                : mediaData?.lastWeekData?.length > 0
                ? renderTitle('Last Week')
                : renderTitle('Last Month')}

              <View
                style={[
                  AppStyles.flex,
                  AppStyles.mTop10,
                  AppStyles.flexRow,
                  {flexWrap: 'wrap'},
                ]}>
                {mediaDataAll?.map((item) => (
                  <Image
                    key={item?.attachment_path}
                    source={{uri: item?.attachment_path}}
                    style={styles.imageStyle}
                  />
                ))}
              </View>
            </>
          )}

          {mediaDataAll?.length === 0 && (
            <View style={[AppStyles.flex, AppStyles.mTop25]}>
              <EmptyList
                title={'No Media Found'}
                subTitle={'You have not shared any media yet'}
              />
            </View>
          )}

          <Text size={Fonts.size.xSmall} type="medium" style={AppStyles.mTop25}>
            {selectedRoom?.members?.length} participant
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            data={selectedRoom?.members}
            ListEmptyComponent={EmptyList}
            renderItem={({item}) => {
              return (
                <Participant
                  {...item}
                  showCross={!disabled}
                  isClickable={true}
                  onPress={() => {
                    if (userData?.id != item?.userUniqueId)
                      navigate.navigate(SCREENS.HOME.friendProfile, {
                        userId: item?.userUniqueId,
                      });
                    else {
                      navigate.navigate(SCREENS.HOME.profile);
                    }
                  }}
                  onPressAction={() => {
                    setRemoveParticipant(item);
                    setIsVisible(true);
                  }}
                />
              );
            }}
          />
        </ScrollView>
      )}

      <ModalCancel
        title="Are you sure you want to remove the participant?"
        actionTitle={'Remove'}
        isVisible={isVisible}
        setVisible={setIsVisible}
        setIsActive={handleRemoveParticipant}
        // setIsActive={handleDeleteAccount}
      >
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            {
              borderWidth: 1,
              borderColor: Colors.background.primary,
              justifyContent: 'flex-start',
              width: '90%',
              paddingHorizontal: 10,
              paddingVertical: 12,
              borderRadius: 12,
            },
          ]}>
          <Image
            source={
              removeParticipant?.imageUrl
                ? {uri: removeParticipant?.imageUrl}
                : Images.Placeholder
            }
            style={{height: 44, width: 44, borderRadius: 22}}
          />
          <Text
            size={Fonts.size.xSmall}
            type="medium"
            style={[AppStyles.mLeft15, {textTransform: 'capitalize'}]}>
            {removeParticipant?.fullName}
          </Text>
        </View>
      </ModalCancel>

      <ModalCancel
        title="Are you sure to Exit the Group?"
        actionTitle={'Exit'}
        isVisible={exitGroupVisible}
        setVisible={setExitGroupVisible}
        setIsActive={handleLeaveGroup}
        // setIsActive={handleDeleteAccount}
      />

      <ModalCancel
        title="Are you sure you want to delete messages?"
        actionTitle={'Delete'}
        isVisible={isDeleteVisible}
        setVisible={setIsDeleteVisible}
        setIsActive={handleDeleteChat}
        // setIsActive={handleDeleteAccount}
      />

      {!isLoading && shouldDisplayBottom && (
        <DisplayBottom>
          <Button
            title={'Add People'}
            onPress={() => navigate.navigate(SCREENS.HOME.addParticipants)}
          />
        </DisplayBottom>
      )}
    </View>
  );
};

export default ChatMedia;
