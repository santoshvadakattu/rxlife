import {Image, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Bubble,
  MessageImage,
  MessageText,
  Time,
} from 'react-native-gifted-chat';
import EmojiPicker from 'rn-emoji-keyboard';
import {emojis} from 'rn-emoji-picker/dist/data';
import {useDispatch, useSelector} from 'react-redux';
import {AppStyles, Colors, Fonts, Images} from '../../../../theme';
import {ButtonView, Text, VideoPlayer} from '../../../../components';
import styles from './styles';
import {sendReactionRequest} from '../../../../redux/slicers/chat';
import {reactMsgManipulator} from '../../../../Helper/chatManipulator';
import {Swipeable} from 'react-native-gesture-handler';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../../constants';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import util, {isCheckVideo} from '../../../../util';
const ReactionItems = [
  {
    id: 2,
    emoji: '👍',
    title: 'care',
  },
  {
    id: 1,
    emoji: '❤️',
    title: 'love',
  },
  {
    id: 0,
    emoji: '😂',
    title: 'like',
  },
  {
    id: 4,
    emoji: '😲',
    title: 'laugh',
  },
  {
    id: 5,
    emoji: '😡',
    title: 'cool',
  },
];

const MessageBubble = ({
  shouldTriggerLongPress = true,
  reactionMsgData = {},
  handleOpenBlurViewForReaction = () => {},
  handleClosePopUp = () => {},
  handleBottomSheetOpen = () => {},
  handleAddReaction = () => {},
  onVideoPress = () => {},
  onSwipe = () => {},
  scrollToReactedMessage = () => {},
  giftedChatRef,
  reactionMessageId = '',
  messagePositions,
  ...props
}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {selectedRoom} = useSelector((state) => state.chat);
  const {userData} = useSelector((state) => state.user);
  const [openPicker, setOpenPicker] = useState(false);
  const [currentMessageText, SetCurrentMessageText] = useState(
    props?.currentMessage,
  );

  const translateX = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      if (translateX.value < -100 || translateX.value > 100) {
        runOnJS(onSwipe)(currentMessageText);
      }
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
        mass: 1,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const reactions = props?.currentMessage?.reactions;
  const uniqueReactions = [
    ...new Set(reactions?.map((item) => item?.emoji)),
  ].slice(0, 2);

  const handleSendReaction = (reaction) => {
    const payload = {
      emoji: reaction?.emoji,
      message_id: props?.currentMessage?.id,
      room_id: selectedRoom?.id,
      senderID: userData?.chatUserId,
    };

    const findReactionIdx = props?.currentMessage?.reactions?.findIndex(
      (r) =>
        r?.emoji == payload?.emoji &&
        r?.reactorDetails?.id == userData?.chatUserId,
    );

    if (findReactionIdx > -1) {
      handleClosePopUp();
      return;
    }

    dispatch(
      sendReactionRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status, response) => {
          if (status) {
            const reactMsg = reactMsgManipulator(response?.data);
            handleAddReaction(reactMsg);
          }
        },
      }),
    );

    handleClosePopUp();
  };

  const renderReactionsUI = () => {
    return (
      <ButtonView
        onPress={() => {
          handleBottomSheetOpen(reactions);
        }}
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: 10,
            position: 'absolute',
            backgroundColor: Colors.background.chatColor,
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 20,
            bottom: props.currentMessage.parentMessageId ? -20 : -25,
            padding: 5,
            zIndex: 100,
            width: uniqueReactions?.length > 1 ? 70 : 50,
          },
          AppStyles.themeShadow,
          props?.currentMessage?.user?._id == userData?.chatUserId && {
            right: 0,
          },
          props?.currentMessage?.user?._id != userData?.chatUserId && {left: 0},
        ]}>
        {uniqueReactions.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // padding: 5,
                  marginLeft: 5,
                },
              ]}>
              <Text style={{fontSize: 12}}>{item}</Text>
            </View>
          );
        })}
        <Text
          style={{fontSize: 12, marginLeft: 10, color: '#9B9B9B'}}
          type="semiBold">
          {reactions?.length}
        </Text>
      </ButtonView>
    );
  };

  const renderTime = (messageProps) => {
    return (
      <Time
        {...messageProps}
        containerStyle={{
          right: {
            marginRight: 0,
          },
          left: {
            marginLeft: 0,
            marginTop: 0,
          },
        }}
        timeTextStyle={{
          right: {
            color: Colors.text.lightGray,
            fontSize: Fonts.size.xxxSmall,
            textAlign: 'right',
          },
          left: {
            color: Colors.text.lightGray,
            fontSize: Fonts.size.xxxSmall,
            textAlign: 'left',
          },
        }}
      />
    );
  };

  const renderUserName = () => {
    return (
      <>
        {props?.currentMessage?.user?._id !== userData?.chatUserId &&
          props?.currentMessage?.user?._id !==
            props?.previousMessage?.user?._id &&
          selectedRoom?.roomType == 'group' && (
            <ButtonView
              onPress={() => {
                if (userData?.id != props?.currentMessage?.user?.userId)
                  navigate.navigate(SCREENS.HOME.friendProfile, {
                    userId: props?.currentMessage?.user?.userId,
                  });
                else {
                  navigate.navigate(SCREENS.HOME.profile);
                }
              }}>
              <Text
                type="medium"
                size={Fonts.size.xSmall}
                style={{textAlign: 'left'}}>
                {props?.currentMessage?.user?.name}
              </Text>
            </ButtonView>
          )}
      </>
    );
  };

  const renderMessage = () => {
    return (
      <Bubble
        {...props}
        renderUsernamePosition="top"
        wrapperStyle={{
          right: {
            backgroundColor: Colors.white,
          },
          left: {
            backgroundColor: Colors.white,
          },
        }}
        renderTime={() => <></>}
        onLongPress={() => {
          if (shouldTriggerLongPress) {
            handleOpenBlurViewForReaction(props);
          }
        }}
        renderMessageText={(messageProps) => {
          let attachmentsArray =
            messageProps.currentMessage.parentMessage.message_attachments;
          return (
            <PanGestureHandler
              activeOffsetX={[-10, 10]}
              failOffsetY={[-5, 5]}
              onGestureEvent={gestureHandler}>
              <Animated.View style={[styles.messageContainer, animatedStyle]}>
                <View>
                  {renderUserName()}
                  {renderTime(messageProps)}
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingTop: messageProps.currentMessage.parentMessageId
                        ? 10
                        : 0,
                      backgroundColor: Colors.background.chatColor,
                      borderRadius: 12,
                      borderBottomRightRadius:
                        messageProps.currentMessage?.user?._id ==
                        userData?.chatUserId
                          ? 0
                          : 12,
                      borderBottomLeftRadius:
                        messageProps.currentMessage?.user?._id !=
                        userData?.chatUserId
                          ? 0
                          : 12,
                      marginBottom: uniqueReactions?.length > 0 && 30,
                    }}>
                    {messageProps?.currentMessage?.parentMessageId && (
                      <View
                        style={{
                          minHeight: 58,
                          backgroundColor: 'rgba(2, 116, 235, 0.08)',
                          borderLeftWidth: 4,
                          borderRadius: 4,
                          padding: 8,
                          borderColor: '#0274EB',
                        }}>
                        <Text size={11}>
                          {
                            messageProps?.currentMessage?.parentMessage
                              ?.message_sender?.user_fullname
                          }
                        </Text>
                        <Text
                          size={14}
                          style={{fontWeight: '400', lineHeight: 21}}
                          numberOfLines={3}
                          ellipsizeMode="tail">
                          {
                            messageProps?.currentMessage?.parentMessage
                              ?.message_text
                          }
                        </Text>
                        {attachmentsArray[0]?.attachment_path &&
                          !isCheckVideo(
                            attachmentsArray[0]?.attachment_name,
                          ) && (
                            <Image
                              style={{width: 40, height: 40, borderRadius: 4}}
                              source={{
                                uri: attachmentsArray[0]?.attachment_path,
                              }}
                            />
                          )}
                        {attachmentsArray[0]?.attachment_path &&
                          isCheckVideo(
                            attachmentsArray[0]?.attachment_name,
                          ) && (
                            <Video
                              source={{
                                uri: attachmentsArray[0]?.attachment_path,
                              }}
                              muted={true}
                              paused={true}
                              style={{
                                height: 40,
                                width: 40,
                              }}
                              volume={0.0}
                            />
                          )}
                      </View>
                    )}

                    <MessageText
                      {...messageProps}
                      containerStyle={{
                        right: {
                          backgroundColor: Colors.background.chatColor,
                          borderRadius: 12,
                          borderBottomRightRadius: 0,
                          padding: 6,
                          paddingHorizontal: 0,
                          // marginBottom: uniqueReactions?.length > 0 && 30,
                        },

                        left: {
                          backgroundColor: Colors.background.chatColor,
                          borderRadius: 12,
                          marginLeft: 0,
                          padding: 6,
                          borderBottomLeftRadius: 0,
                          paddingHorizontal: 0,
                          // marginBottom: uniqueReactions?.length > 0 && 30,
                        },
                      }}
                      textStyle={{
                        right: {
                          color: Colors.text.primary,
                          fontSize: Fonts.size.xSmall,
                        },
                        left: {
                          color: Colors.text.primary,
                          fontSize: Fonts.size.xSmall,
                          textAlign: 'left',
                          // marginLeft: 0,
                        },
                      }}
                    />
                    {shouldTriggerLongPress &&
                      uniqueReactions?.length > 0 &&
                      renderReactionsUI()}
                  </View>
                </View>
              </Animated.View>
            </PanGestureHandler>
          );
        }}
        renderMessageImage={(imageProps) => {
          return (
            <PanGestureHandler
              activeOffsetX={[-10, 10]}
              failOffsetY={[-5, 5]}
              onGestureEvent={gestureHandler}>
              <Animated.View style={[styles.messageContainer, animatedStyle]}>
                <View>
                  {renderUserName()}
                  {renderTime(imageProps)}
                  <View
                    style={{
                      marginBottom: uniqueReactions?.length > 0 ? 30 : 0,
                    }}>
                    <MessageImage
                      {...imageProps}
                      lightboxProps={{
                        onLongPress: () => {
                          if (shouldTriggerLongPress) {
                            handleOpenBlurViewForReaction(props);
                          }
                        },
                      }}
                      imageStyle={{
                        marginBottom: 0,
                      }}
                    />

                    {shouldTriggerLongPress &&
                      uniqueReactions?.length > 0 &&
                      renderReactionsUI()}
                  </View>
                </View>
              </Animated.View>
            </PanGestureHandler>
          );
        }}
        renderMessageVideo={(videoProps) => {
          const {currentMessage} = videoProps;
          return (
            <PanGestureHandler
              activeOffsetX={[-10, 10]}
              failOffsetY={[-5, 5]}
              onGestureEvent={gestureHandler}>
              <Animated.View style={[styles.messageContainer, animatedStyle]}>
                <ButtonView
                  onLongPress={() => {
                    if (shouldTriggerLongPress) {
                      handleOpenBlurViewForReaction(props);
                    }
                  }}
                  onPress={() => {
                    if (!shouldTriggerLongPress) return;
                    onVideoPress(currentMessage?.video);
                  }}
                  style={{
                    height: uniqueReactions?.length > 0 ? 130 : 100,
                    width: 150,
                    borderRadius: 12,
                    position: 'relative',
                    zIndex: 2,
                    marginBottom: uniqueReactions?.length > 0 ? 30 : 0,
                  }}>
                  {renderUserName()}
                  {renderTime(videoProps)}
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      zIndex: 1,
                    }}
                  />
                  <VideoPlayer
                    videoLink={currentMessage?.video}
                    paused={true}
                    shouldPlayVideo={false}
                    videoView={{
                      height: 100,
                      borderRadius: 12,
                      position: 'absolute',
                      zIndex: 0,
                    }}
                  />

                  <Image
                    source={Images.Video}
                    style={{
                      height: 20,
                      width: 20,
                      position: 'absolute',
                      left: 65,
                      top: 40,
                    }}
                  />

                  {shouldTriggerLongPress &&
                    uniqueReactions?.length > 0 &&
                    renderReactionsUI()}
                </ButtonView>
              </Animated.View>
            </PanGestureHandler>
          );
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {!shouldTriggerLongPress && (
        <View
          style={[
            styles.reactionContainer,
            AppStyles.themeShadow,
            AppStyles.mBottom10,
            props?.currentMessage?.user?._id == userData?.chatUserId && {
              alignSelf: 'flex-end',
            },
          ]}>
          {ReactionItems.map((item, index) => {
            return (
              <Text
                key={index}
                onPress={() => {
                  // handleOpenBlurViewForReaction(item);
                  // handleClosePopUp();
                  handleSendReaction(item);
                }}
                style={{
                  fontSize: 32,
                  padding: 5,
                  borderRadius: 16,
                }}>
                {item.emoji}
              </Text>
            );
          })}

          <ButtonView
            onPress={() => {
              setOpenPicker(true);
            }}
            style={{borderRadius: 16, padding: 5}}>
            <Image
              source={Images.Plus}
              style={{
                tintColor: Colors.background.primary,
                height: 32,
                width: 32,
              }}
            />
          </ButtonView>
        </View>
      )}

      {renderMessage()}

      <EmojiPicker
        open={openPicker}
        emojis={emojis} // emojis data source see data/emojis
        autoFocus={false} // autofocus search input
        loading={false} // spinner for if your emoji data or recent store is async
        darkMode={false} // to be or not to be, that is the question
        perLine={7} // # of emoji's per line
        onClose={() => setOpenPicker(false)}
        expandable={true}
        onEmojiSelected={(emoji) => {
          handleSendReaction(emoji);
        }}
      />
    </View>
  );
};

export default MessageBubble;
