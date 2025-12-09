import {FlatList, ScrollView, View, Switch} from 'react-native';
import React from 'react';
import styles from './styles';
import {CustomNavbar, Text} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {NOTIFICATIONS_SETTINGS} from '../../constants';
import ToggleSwitch from 'toggle-switch-react-native';

const NotificationSettingsUI = (props) => {
  const {navigate, options, userData, handleToggleSwitch} = props;

  const renderItem = (title, key) => {
    return (
      <View style={[styles.itemWrapper, AppStyles.themeShadow]}>
        <Text type="medium" size={Fonts.size.xSmall}>
          {title}
        </Text>

        <ToggleSwitch
          isOn={userData?.[key] ?? false}
          onColor="rgba(55,55,55,.1)"
          offColor="rgba(55,55,55,.1)"
          thumbOnStyle={{backgroundColor: Colors.background.primary}}
          size="small"
          onToggle={(isOn) => handleToggleSwitch(key, isOn)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Edit Notification'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        leftBtnImage={Images.BackIcon}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        {/* <FlatList
          data={options}
          renderItem={({item, index}) => renderItem(item, index)}
          style={AppStyles.mTop15}
        /> */}

        {renderItem('Challenger Reminders', 'challenge_reminder')}
        {renderItem('Friend Invitation', 'friend_invite')}
        {renderItem('Group Invitations', 'group_invite')}
        {renderItem('Events', 'events')}
        {renderItem('Messages', 'messages')}
        {/* {renderItem('News and Updates', 'news_updates')} */}
      </ScrollView>
    </View>
  );
};

export default NotificationSettingsUI;
