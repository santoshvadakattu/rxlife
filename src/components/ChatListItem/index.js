import {View, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import ButtonView from '../ButtonView';
import moment from 'moment';

const ChatListItem = (props) => {
  const {
    roomName,
    roomImage,
    id,
    latestMessage,
    handleLoadChat,
    unreadCount = 0,
  } = props;

  return (
    <ButtonView
      style={[styles.container, AppStyles.themeShadow]}
      onPress={handleLoadChat}>
      <Image
        source={roomImage ? {uri: roomImage} : Images.Placeholder}
        style={styles.image}
      />

      <View style={[AppStyles.mLeft15, AppStyles.flex]}>
        <View style={styles.titleWrapper}>
          <Text size={Fonts.size.xSmall} style={{flex: 1}} type={'medium'}>
            {roomName}
          </Text>

          <Text
            size={Fonts.size.xxxxxSmall}
            type={'base'}
            color={Colors.text.lightGray}>
            {moment(latestMessage?.createdAt)?.format('hh:mm A')}
          </Text>
        </View>

        <Text
          size={Fonts.size.xxxxxSmall}
          type={'base'}
          color={Colors.text.lightGray}
          multiline={false}
          numberOfLines={1}>
          {latestMessage?.text ?? ''}
        </Text>

        {unreadCount > 0 && (
          <View
            style={{
              height: 8,
              width: 8,
              backgroundColor: 'red',
              borderRadius: 4,
              position: 'absolute',
              right: 0,
              top: 20,
            }}
          />
        )}
      </View>
    </ButtonView>
  );
};

export default ChatListItem;
