import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  Linking,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import {ButtonView, ChatHeader, Text, VideoPlayer} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  getAllMessagesFromParentMessageRequest,
  getRoomMessagesRequest,
  removeReactionRequest,
  sendMessageRequest,
} from '../../redux/slicers/chat';
import SocketIO from '../../services/SocketIO';
import {
  reactMsgManipulator,
  singleMessageManipulator,
} from '../../Helper/chatManipulator';
import EmojiPicker from 'rn-emoji-keyboard';
import {emojis} from 'rn-emoji-picker/dist/data';
import {SCREENS} from '../../constants';
import {MessageBubble} from './components';
import {BlurView} from '@react-native-community/blur';
import {FlatList} from 'react-native-gesture-handler';
import util, {groupAndCount} from '../../util';
import Video from 'react-native-video';
const Chat = ({route}) => {
  const params = route?.params ?? {};

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state?.user);
  const {selectedRoom} = useSelector((state) => state?.chat);
  const actionSheetRef = useRef();
  const [messages, setMessages] = useState([]);
  const [openPicker, setOpenPicker] = useState(false);
  const [total, setTotal] = useState(0);
  const [getEarlier, setGetEarlier] = useState(false);
  const [sentLoading, setSentLoading] = useState(false);
  const [reactionMsgData, setReactionMsgData] = useState(null);
  const [showBlurView, setShowBlurView] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetReactions, setBottomSheetReactions] = useState([]);
  const [selectedReaction, setSelectedReaction] = useState('All');
  const [replyChatObj, setReplyChatobj] = useState({});
  const [
    isNotificationRedirectedToReactedMessage,
    setIsNotificationRedirectedToReactedMessage,
  ] = useState(false);

  // ref
  const bottomSheetRef = useRef(null);
  const giftedChatRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (selectedRoom?.id) {
      if (params?.fromReactionNotification && params?.reactionMessageId) {
        const payload = {
          payloadData: {
            query: `room_id=${selectedRoom?.id}&parentMessageId=${params?.reactionMessageId}`,
          },
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback(status, res) {
            if (status) {
              setMessages(res?.messages);
              setTotal(res?.total ?? 0);
            }
          },
        };

        dispatch(getAllMessagesFromParentMessageRequest(payload));
      } else {
        const payload = {
          payloadData: {
            query: `room_id=${selectedRoom?.id}`,
          },
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback(status, res) {
            if (status) {
              setMessages(res?.messages);
              setTotal(res?.total ?? 0);
            }
          },
        };

        dispatch(getRoomMessagesRequest(payload));
      }

      handleMessageRecieved();
    }
  }, [selectedRoom, selectedRoom?.id]);

  useEffect(() => {
    if (selectedRoom?.id) {
      handleReactRecieved();
      handleRemoveReactEvent();

      if (
        params?.fromReactionNotification &&
        params?.reactionMessageId &&
        !isNotificationRedirectedToReactedMessage &&
        messages?.length > 0
      ) {
        const findMessageIdx = messages?.findIndex(
          (item) => item?._id == params?.reactionMessageId,
        );

        if (findMessageIdx > -1)
          setTimeout(() => {
            giftedChatRef?.current.scrollToIndex({
              animated: true,
              index: findMessageIdx,
            });
          }, 1000);
        setIsNotificationRedirectedToReactedMessage(true);
      }
    }
  }, [messages, selectedRoom]);

  const handleReactRecieved = () => {
    SocketIO.onReactionRecieved((res) => {
      const manipulateRes = reactMsgManipulator(res);
      if (
        res?.reactor_id !== userData?.chatUserId &&
        selectedRoom?.id == manipulateRes?.roomId
      ) {
        handleAddReaction(manipulateRes);
      }
    });
  };

  const handleRemoveReactEvent = () => {
    SocketIO.onRemoveReaction((res) => {
      if (selectedRoom?.id != res?.room_id) return;

      const allMessages = [...messages];

      const findMessageIdx = allMessages?.findIndex(
        (item) => item?.id == res?.message_id,
      );

      if (findMessageIdx > -1) {
        allMessages[findMessageIdx] = {
          ...allMessages[findMessageIdx],
          reactions: allMessages[findMessageIdx]?.reactions?.filter(
            (item) => item?.id != res?.id,
          ),
        };

        setMessages(allMessages);
      }
    });
  };

  const getMoreMessages = () => {
    if (total > messages?.length) {
      setGetEarlier(true);
      dispatch(
        getRoomMessagesRequest({
          payloadData: {
            query: `room_id=${selectedRoom?.id}&offset=${messages?.length}`,
          },
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback(status, res) {
            if (status) {
              // setMessages(res?.messages);
              setMessages((previousMessages) =>
                GiftedChat.append(res?.messages, previousMessages),
              );
              setTotal(res.total);
            }
            setGetEarlier(false);
          },
        }),
      );
    }
  };

  /**
   * Listen for new messages and dispatch to the messages array
   */
  const handleMessageRecieved = () => {
    SocketIO.onMessageRecieved((res) => {
      const manipulateRes = singleMessageManipulator(res);
      if (
        res?.senderId !== userData?.chatUserId &&
        selectedRoom?.id == manipulateRes?.roomId
      )
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [manipulateRes]),
        );
      setTotal(total + 1);
    });
  };

  const openActionSheet = () => {
    if (sentLoading) return;
    Keyboard.dismiss();
    actionSheetRef.current?.show();
  };

  const onActionPress = (key) => {
    if (key === 2) return;

    if (key === 1) {
      launchImageLibraryAction();
    }

    if (key === 0) {
      launchCameraAction();
    }
  };

  const launchImageLibraryAction = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: false,
      compressImageQuality: 0.7,
      multiple: false,
      showsSelectedCount: true,
      mediaType: 'any',
      cropperChooseText: 'Send',
    })
      .then((image) => {
        handleSendMessage(image);
      })
      .catch((e) => {
        if (
          (e.code && e.code === 'E_PERMISSION_MISSING') ||
          e.code === 'E_PICKER_NO_CAMERA_PERMISSION' ||
          e.code === 'E_NO_CAMERA_PERMISSION' ||
          e?.code === 'E_NO_LIBRARY_PERMISSION'
        ) {
          Alert.alert(
            'Permission Required',
            'Cannot access images. Please allow access if you want to be able to select images.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  Linking.openSettings();
                },
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      });
  };

  const launchCameraAction = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
      cropperChooseText: 'Send',
      // mediaType:
    })
      .then((image) => {
        handleSendMessage(image);
      })
      .catch((e) => {
        if (
          (e.code && e.code === 'E_PERMISSION_MISSING') ||
          e.code === 'E_PICKER_NO_CAMERA_PERMISSION' ||
          e.code === 'E_NO_CAMERA_PERMISSION' ||
          e?.code === 'E_NO_LIBRARY_PERMISSION'
        ) {
          Alert.alert(
            'Permission Required',
            'Please allow this app to use your camera.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  // OpenSettings.openSettings();
                  Linking.openSettings();
                },
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          Alert.alert('Error', 'No camera on simulator');
        }
      });
  };

  const onSend = useCallback(
    (messages = []) => {
      if (messages?.[0]?.text?.trim()?.length === 0) return;

      const messagePayload = {
        message_text: messages?.[0]?.text?.trim() ?? '',
        message_type: 'text',
        room_id: selectedRoom?.id,
        senderID: userData?.chatUserId,
        receiverID: selectedRoom?.otherPerson?.id,
        parent_message_id: replyChatObj?.id,
      };

      setSentLoading(true);

      dispatch(
        sendMessageRequest({
          payloadData: messagePayload,
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback: (status, res) => {
            setSentLoading(false);
            setReplyChatobj({});

            if (status == true) {
              setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [res]),
              );
            }
          },
        }),
      );
    },
    [selectedRoom, replyChatObj],
  );

  const handleSendMessage = (image) => {
    const path = image.path;
    const data = new FormData();

    data.append('files', {
      type: image?.mime,
      name: `filename.${image?.mime}`,
      uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
    });

    data.append('message_text', '');
    data.append('room_id', selectedRoom?.id);
    data.append('senderID', userData?.chatUserId);
    data.append('receiverID', selectedRoom?.otherPerson?.id);
    data.append('message_type', 'file');

    setSentLoading(true);

    dispatch(
      sendMessageRequest({
        payloadData: data,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status, res) => {
          setSentLoading(false);

          if (status) {
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, [res]),
            );
          }
        },
      }),
    );
  };

  const handleScrollEvent = ({nativeEvent}) => {
    const contentSize = parseFloat(
      nativeEvent?.contentSize?.height?.toFixed(2),
    );

    const scrollHeight = parseFloat(
      (
        nativeEvent?.contentOffset?.y + nativeEvent?.layoutMeasurement?.height
      ).toFixed(2),
    );

    if (scrollHeight >= contentSize - 10) {
      getMoreMessages();
    }
  };

  const handleOpenBlurViewForReaction = (msgData) => {
    Keyboard.dismiss();
    setReactionMsgData(msgData);
    setShowBlurView(true);
  };

  const handleClosePopUp = () => {
    setShowBlurView(false);
    setReactionMsgData(null);
  };

  const handleBottomSheetOpen = (reactions = []) => {
    Keyboard.dismiss();
    setShowBottomSheet(true);
    setSelectedReaction('All');
    setBottomSheetReactions(reactions);
  };

  const handleRemoveReaction = (reactionDetail) => {
    if (reactionDetail?.reactorDetails?.id !== userData?.chatUserId) return;

    const allMessages = [];

    for (let item of messages) {
      let payload = {...item};

      if (payload?.id == reactionDetail?.messageId) {
        let reactions = [...item?.reactions];
        reactions = reactions?.filter(
          (react) => react?.id != reactionDetail?.id,
        );

        setBottomSheetReactions(reactions);
        payload = {
          ...payload,
          reactions: [...reactions],
        };
      }

      allMessages.push(payload);
    }

    setMessages([...allMessages]);

    dispatch(
      removeReactionRequest({
        payloadData: {
          react_id: reactionDetail?.id,
          reactor_id: userData?.chatUserId,
        },
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: () => {},
      }),
    );
  };

  const handleAddReaction = (reactionDetail) => {
    const allMessages = [];

    const findMessage = messages?.find(
      (item) => item?.id == reactionDetail?.messageId,
    );

    const allReactions = [...findMessage?.reactions];

    const findSameReactionIndex = allReactions?.findIndex(
      (r) =>
        r?.emoji == reactionDetail?.emoji &&
        r?.reactorDetails?.id == userData?.chatUserId,
    );

    if (findSameReactionIndex > -1) {
      return;
    }

    for (let item of messages) {
      const payload = {...item};
      if (payload?.id == reactionDetail?.messageId) {
        const reactions = [...payload?.reactions];
        reactions.push(reactionDetail);
        payload.reactions = [...reactions];
      }

      allMessages.push(payload);
    }

    setMessages([...allMessages]);
  };

  const onVideoPress = (videoUrl) => {
    navigate.navigate(SCREENS.HOME.videoScreen, {
      videoUrl,
    });
  };

  const handleSwipeToReply = (message) => {
    setReplyChatobj(message);
  };

  const renderBubbleMessage = (props) => {
    return (
      <MessageBubble
        {...props}
        handleOpenBlurViewForReaction={handleOpenBlurViewForReaction}
        reactionMsgData={reactionMsgData}
        handleBottomSheetOpen={handleBottomSheetOpen}
        handleAddReaction={handleAddReaction}
        onVideoPress={onVideoPress}
        setReplyChatobj={setReplyChatobj}
        onSwipe={handleSwipeToReply}
        reactionMessageId={params?.reactionMessageId}
        giftedChatRef={giftedChatRef}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.alignItemsCenter,
          {justifyContent: 'flex-end'},
          AppStyles.mLeft10,
          AppStyles.mRight10,
        ]}>
        <ButtonView onPress={openActionSheet}>
          <Image source={Images.FilePicker} style={{height: 17, width: 15}} />
        </ButtonView>

        {}
        <Send
          {...props}
          containerStyle={{
            height: 22,
            marginLeft: 10,
          }}
          disabled={sentLoading}>
          {sentLoading && (
            <ActivityIndicator
              size={'small'}
              color={Colors.background.primary}
            />
          )}

          {!sentLoading && (
            <Image
              source={Images.SendMessage}
              style={{height: 18.53, width: 18.53}}
            />
          )}
        </Send>
      </View>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <View
        style={
          Object?.keys(replyChatObj)?.length > 0
            ? {
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(55, 55, 55, 0.1)',
                paddingHorizontal: 19,
                paddingVertical: 13,
              }
            : {flex: 1}
        }>
        {Object?.keys(replyChatObj)?.length > 0 && (
          <View
            style={[
              styles.replyView,
              !util.isPlatformAndroid() &&
                Keyboard.isVisible() && {marginBottom: 20},
            ]}>
            <Text size={11}>{replyChatObj?.messageSender?.fullName}</Text>
            <Text
              size={14}
              style={{fontWeight: '400', lineHeight: 21}}
              numberOfLines={3}
              ellipsizeMode="tail">
              {replyChatObj?.messageText}
            </Text>
            {replyChatObj?.image && (
              <Image
                style={{width: 40, height: 40, borderRadius: 4}}
                source={{uri: replyChatObj?.image}}
              />
            )}
            {replyChatObj?.video && (
              <Video
                source={{uri: replyChatObj?.video}}
                muted={true}
                paused={false}
                style={{
                  height: 40,
                  width: 40,
                }}
                volume={0.0}
              />
            )}
            <TouchableOpacity
              onPress={() => setReplyChatobj({})}
              style={styles.crossBtnView}>
              <Image
                source={Images.crossImage}
                style={{width: 5.24, height: 5.24}}
              />
            </TouchableOpacity>
          </View>
        )}

        <InputToolbar
          {...props}
          containerStyle={[
            {
              marginHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.borders.input,
              borderRadius: 12,
            },
            Object?.keys(replyChatObj)?.length > 0 && {
              marginBottom: 20,
            },
          ]}
          primaryStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
          renderSend={renderSend}
        />
      </View>
    );
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const renderBottomSheetContent = () => {
    const uniqueReactions = groupAndCount(bottomSheetReactions, 'emoji');

    const _ureactions = [
      {
        emoji: 'All',
        count: bottomSheetReactions?.length,
        items: [...bottomSheetReactions],
      },
      ...uniqueReactions,
    ];

    const filteredReactions =
      selectedReaction == 'All'
        ? bottomSheetReactions
        : bottomSheetReactions?.filter(
            (item) => item?.emoji == selectedReaction,
          );

    return (
      <View style={AppStyles.flex}>
        <View style={[styles.bottomSheetListContainer]}>
          <FlatList
            horizontal
            data={_ureactions}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            renderItem={({item}) => (
              <ButtonView
                style={[
                  styles.reactionItem,
                  selectedReaction == item?.emoji && {
                    backgroundColor: '#D6D9DD',
                  },
                ]}
                onPress={() => setSelectedReaction(item?.emoji)}>
                <Text
                  size={Fonts.size.xSmall}
                  type="semiBold"
                  color={'#9B9B9B'}>
                  {item?.emoji}
                </Text>
                <Text
                  size={Fonts.size.xSmall}
                  type="semiBold"
                  style={AppStyles.mLeft5}
                  color={'#9B9B9B'}>
                  {item?.count ?? 0}
                </Text>
              </ButtonView>
            )}
          />
        </View>

        <View
          style={[
            AppStyles.flex,
            AppStyles.pLeft10,
            AppStyles.pRight10,
            AppStyles.mTop15,
          ]}>
          <FlatList
            data={filteredReactions}
            ItemSeparatorComponent={() => (
              <View
                style={[
                  {height: 1, backgroundColor: Colors.background.chatColor},
                  AppStyles.mTop10,
                  AppStyles.mBottom10,
                ]}
              />
            )}
            renderItem={({item}) => (
              <ButtonView
                style={[
                  AppStyles.flex,
                  AppStyles.flexRow,
                  AppStyles.spaceBetween,
                  AppStyles.alignItemsCenter,
                  AppStyles.pLeft5,
                ]}
                disabled={item?.reactorDetails?.id != userData?.chatUserId}
                onPress={() => handleRemoveReaction(item)}>
                <View
                  style={[
                    AppStyles.flex,
                    AppStyles.flexRow,
                    AppStyles.alignItemsCenter,
                  ]}>
                  <Image
                    source={
                      item?.reactorDetails?.image
                        ? {uri: item?.reactorDetails?.image}
                        : Images.Placeholder
                    }
                    style={{height: 26, width: 26, borderRadius: 13}}
                  />

                  <View>
                    <Text
                      size={Fonts.size.xSmall}
                      type="semiBold"
                      style={AppStyles.mLeft10}>
                      {item?.reactorDetails?.id == userData?.chatUserId
                        ? 'You'
                        : item?.reactorDetails?.fullName}

                      {item?.reactorDetails?.id == userData?.chatUserId && (
                        <Text
                          size={Fonts.size.xxxSmall}
                          style={AppStyles.mLeft10}
                          color={'#9B9B9B'}>
                          {' '}
                          (Tap to remove.)
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>

                <Text> {item?.emoji} </Text>
              </ButtonView>
            )}
          />
        </View>
      </View>
    );
  };

  const options = ['Take Photo', 'Choose from Library', 'Cancel'];

  const findMe = selectedRoom?.members?.find(
    (item) => item?.id === userData?.chatUserId,
  );

  let disabled = false;
  let giftedChatDisabledProps = {};

  if (findMe) {
    disabled = findMe?.isLeaved || findMe?.isRemoved || false;
    if (disabled) {
      giftedChatDisabledProps = {
        minComposerHeight: 0,
        maxComposerHeight: 0,
        minInputToolbarHeight: 0,
        renderInputToolbar: () => null,
      };
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'rgba(255,255,255,1)'}
      />

      <ChatHeader
        title={selectedRoom?.roomName}
        roomImage={selectedRoom?.roomImage}
        hasBorder={false}
        isClickable={true}
        onTitlePress={() => {
          if (selectedRoom?.roomType === 'individual') {
            navigate.navigate(SCREENS.HOME.chatMedia);
          } else {
            navigate.navigate(SCREENS.HOME.groupInfo);
          }
        }}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <View style={[AppStyles.flex, AppStyles.mBottom40]}>
        <GiftedChat
          messageContainerRef={giftedChatRef}
          keyboardShouldPersistTaps={'handled'}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userData?.chatUserId || null,
          }}
          messagesContainerStyle={
            Object?.keys(replyChatObj)?.length > 0 && {
              flex: 1,
            }
          }
          isKeyboardInternallyHandled={false}
          alwaysShowSend
          showAvatarForEveryMessage={
            selectedRoom?.roomType == 'group' ? false : true
          }
          renderUsername={() => <></>}
          renderAvatar={() => <></>}
          renderBubble={renderBubbleMessage}
          renderInputToolbar={renderInputToolbar}
          renderActions={() => {
            return (
              <ButtonView
                style={[AppStyles.mLeft5, AppStyles.padding5]}
                onPress={() => setOpenPicker(true)}>
                <Image source={Images.Emoji} style={{height: 20, width: 20}} />
              </ButtonView>
            );
          }}
          textInputStyle={{
            color: Colors.text.primary,
            fontSize: Fonts.size.xSmall,
          }}
          infiniteScroll={true}
          renderAvatarOnTop={true}
          isLoadingEarlier={getEarlier}
          loadEarlier={getEarlier}
          renderTime={() => <></>}
          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: handleScrollEvent,
          }}
          {...giftedChatDisabledProps}
          {...(selectedRoom?.roomType == 'group'
            ? {
                renderAvatar: (props) => {
                  return (
                    <ButtonView
                      style={[
                        AppStyles.alignItemsCenter,
                        {width: 36, alignItems: 'flex-start'},
                      ]}
                      onPress={() => {
                        if (userData?.id != props?.currentMessage?.user?.userId)
                          navigate.navigate(SCREENS.HOME.friendProfile, {
                            userId: props?.currentMessage?.user?.userId,
                          });
                        else {
                          navigate.navigate(SCREENS.HOME.profile);
                        }
                      }}>
                      <Image
                        source={
                          props?.currentMessage?.messageSender?.image
                            ? {
                                uri: props?.currentMessage?.messageSender
                                  ?.image,
                              }
                            : Images.Placeholder
                        }
                        style={{height: 26, width: 26, borderRadius: 13}}
                      />
                    </ButtonView>
                  );
                },
              }
            : {})}
        />
        {!util.isPlatformAndroid() && <KeyboardSpacer />}
        <EmojiPicker
          open={openPicker}
          emojis={emojis} // emojis data source see data/emojis
          autoFocus={false} // autofocus search input
          loading={false} // spinner for if your emoji data or recent store is async
          darkMode={false} // to be or not to be, that is the question
          perLine={7} // # of emoji's per line
          onClose={() => setOpenPicker(false)}
          expandable={false}
          onEmojiSelected={(emoji) => {
            onSend([{text: emoji?.emoji}]);
          }}
        />
      </View>

      <ActionSheet
        ref={actionSheetRef}
        options={options}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        key={1}
        onPress={onActionPress}
      />
      {showBlurView && (
        <ButtonView
          style={[styles.absolute, styles.reactionContainer]}
          onPress={handleClosePopUp}
          activeOpacity={0}>
          <BlurView
            style={[styles.absolute]}
            blurType="light"
            overlayColor={'#00000000'}
            blurAmount={5}
            blurRadius={10}
            reducedTransparencyFallbackColor="rgba(255, 255, 255, 0)"
          />
          <View style={[AppStyles.flex]}>
            <MessageBubble
              {...reactionMsgData}
              shouldTriggerLongPress={false}
              handleClosePopUp={handleClosePopUp}
              handleAddReaction={handleAddReaction}
              onVideoPress={onVideoPress}
            />
          </View>
        </ButtonView>
      )}

      {showBottomSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          detached
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onClose={() => setShowBottomSheet(false)}
          onChange={handleSheetChanges}
          enablePanDownToClose>
          {renderBottomSheetContent()}
        </BottomSheet>
      )}
    </View>
  );
};

export default Chat;
