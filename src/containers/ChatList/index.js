import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonView,
  ChatListItem,
  CustomNavbar,
  EmptyList,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getAllRoomsRequest, loadRoomAction} from '../../redux/slicers/chat';
import ActionButton from 'react-native-action-button';
import {FloatingAction} from 'react-native-floating-action';

const ChatList = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {userData} = useSelector((state) => state?.user);
  const {allRooms} = useSelector((state) => state?.chat);

  const [isPullToRef, setIsPullToRef] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      dispatch(
        getAllRoomsRequest({
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback: () => {
            setIsLoading(false);
          },
        }),
      );
    }
  }, [isFocused]);

  const pullToRefresh = () => {
    setIsPullToRef(true);
    dispatch(
      getAllRoomsRequest({
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: () => {
          setIsPullToRef(false);
        },
      }),
    );
  };

  const handleLoadChat = (id) => {
    if (id) {
      dispatch(loadRoomAction(id));

      navigate.navigate(SCREENS.HOME.chat);
    }
  };

  const renderNewChat = () => {
    return (
      <ButtonView
        style={styles.newMessageWrapper}
        onPress={() => navigate.navigate(SCREENS.HOME.chatSearchList)}>
        <Image
          source={Images.ChatWhite}
          style={styles.newMessageWrapperImage}
        />
      </ButtonView>
    );
  };

  const actions = [
    {
      text: 'Chat',
      icon: Images.ChatWhite,
      name: 'chat',
      position: 2,
      color: Colors.background.primary,
      buttonSize: 58,
      margin: 0,
    },
    {
      text: 'Create Group',
      icon: Images.FriendsWhite2,
      name: 'group',
      position: 1,
      color: Colors.background.primary,
      buttonSize: 58,
      margin: 0,
    },
  ];

  const renderActionButton = () => {
    return (
      <FloatingAction
        actions={actions}
        buttonSize={58}
        color={Colors.background.primary}
        onPressItem={(name) => {
          if (name === 'chat') {
            navigate.navigate(SCREENS.HOME.chatSearchList);
          } else {
            navigate.navigate(SCREENS.HOME.selectParticipants);
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={'Chat'}
        hasBorder={false}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      {isLoading && (
        <View style={AppStyles.flex}>
          <ActivityIndicator size={'large'} style={[AppStyles.mTop15]} />
        </View>
      )}

      {!isLoading && (
        <>
          <ScrollView
            style={AppStyles.flex}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isPullToRef}
                onRefresh={() => {
                  pullToRefresh();
                }}
              />
            }>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allRooms ?? []}
              style={[AppStyles.flex]}
              renderItem={({item}) => (
                <ChatListItem
                  {...item}
                  handleLoadChat={() => handleLoadChat(item?.id)}
                />
              )}
              ListEmptyComponent={() => (
                <View
                  style={[
                    AppStyles.flex,
                    AppStyles.alignItemsCenter,
                    {height: Metrics.screenHeight - 160},
                  ]}>
                  <EmptyList />
                </View>
              )}
            />
          </ScrollView>

          {!userData?.isAdmin && renderNewChat()}
          {userData?.isAdmin && renderActionButton()}
        </>
      )}
    </View>
  );
};

export default ChatList;
