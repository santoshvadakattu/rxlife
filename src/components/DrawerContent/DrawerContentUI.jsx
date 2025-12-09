import {Image, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './styles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import ButtonView from '../ButtonView';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SCREENS} from '../../constants';
import {logoutUserRequest} from '../../redux/slicers/user';
import util, {logoutUser} from '../../util';

const DrawerContentUI = (props) => {
  const {userData, userProfile} = props;
  const {image} = userProfile;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const toggleDrawer = () => {
    navigate.dispatch(DrawerActions.closeDrawer());
  };

  const handleLogout = () => {
    // dispatch(logoutUserRequest(
    logoutUser();
  };

  const renderProfile = () => {
    return (
      <View style={styles.Profile}>
        {image ? (
          <Image
            source={image ? {uri: image} : {uri: ''}}
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
        <View>
          <Text size={'medium'} type={'semiBold'} color={Colors.white}>
            {userData?.fullname}
          </Text>
          <Text
            size={'xxxSmall'}
            type={'base'}
            color={Colors.white}
            style={{margin: 0, padding: 0}}>
            {userData?.email}
          </Text>
        </View>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View style={styles.listContainer}>
        <ButtonView
          onPress={() => navigate.navigate(SCREENS.HOME.profile)}
          style={styles.itemWrapper}>
          <Image source={Images.ProfileIcon} style={styles.icon} />
          <Text size="xSmall" color={Colors.white}>
            Profile
          </Text>
        </ButtonView>
        <ButtonView
          onPress={() => navigate.navigate('weightTracker')}
          style={styles.itemWrapper}>
          <Image
            source={Images.TrackerIcon}
            style={[
              styles.icon,
              {
                tintColor: 'white',
              },
            ]}
          />
          <Text size="xSmall" color={Colors.white}>
            Tracker
          </Text>
        </ButtonView>

        <ButtonView
          onPress={() =>
            navigate.navigate(SCREENS.HOME.friendRequest, {
              date: new Date(),
            })
          }
          style={styles.itemWrapper}>
          <Image
            source={Images.FriendRequestWhite}
            style={[styles.icon, {width: 17, height: 21}]}
          />
          <Text size="xSmall" color={Colors.white}>
            Friend Request
          </Text>
        </ButtonView>

        <ButtonView
          onPress={() => navigate.navigate(SCREENS.HOME.friends)}
          style={styles.itemWrapper}>
          <Image
            source={Images.FriendsWhite}
            style={[styles.icon, {height: 18.26, width: 20}]}
          />
          <Text size="xSmall" color={Colors.white}>
            Friends
          </Text>
        </ButtonView>

        <ButtonView
          style={styles.itemWrapper}
          onPress={() => navigate.navigate(SCREENS.HOME.transaction)}>
          <Image
            source={Images.TransactionWhite}
            style={[styles.icon, {width: 21, height: 19}]}
          />
          <Text size="xSmall" color={Colors.white}>
            Transaction
          </Text>
        </ButtonView>

        <ButtonView
          onPress={() => navigate.navigate(SCREENS.HOME.termsConditions)}
          style={styles.itemWrapper}>
          <Image
            source={Images.TermsAndCondition}
            style={[styles.icon, {height: 21, width: 21}]}
          />
          <Text size="xSmall" color={Colors.white}>
            Terms & Conditions
          </Text>
        </ButtonView>

        <ButtonView
          onPress={() => navigate.navigate(SCREENS.HOME.privacyPolicy)}
          style={styles.itemWrapper}>
          <Image
            source={Images.PrivacyPolicyWhite}
            style={[styles.icon, {width: 17, height: 20}]}
          />
          <Text size="xSmall" color={Colors.white}>
            Privacy Policy
          </Text>
        </ButtonView>

        <ButtonView
          onPress={() => navigate.navigate(SCREENS.HOME.contactus)}
          style={styles.itemWrapper}>
          <Image
            source={Images.ContactUs}
            style={[styles.icon, {height: 19}]}
          />
          <Text size="xSmall" color={Colors.white}>
            Contact us
          </Text>
        </ButtonView>

        <ButtonView
          style={styles.itemWrapper}
          onPress={() => navigate.navigate(SCREENS.HOME.settings)}>
          <Image
            source={Images.SettingsWhite}
            style={[styles.icon, {height: 18.67, width: 18.67}]}
          />
          <Text size="xSmall" color={Colors.white}>
            Settings
          </Text>
        </ButtonView>
      </View>
    );
  };

  const renderCrossLogoAndIcon = () => {
    return (
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.33}}></View>
        <View style={{flex: 0.33, alignItems: 'center'}}>
          <Image source={Images.LogoWhite} style={styles.logo} />
        </View>
        <View style={{flex: 0.33, alignItems: 'flex-end'}}>
          <View style={styles.whiteBox}>
            <ButtonView
              style={[AppStyles.flex, AppStyles.centerInner]}
              onPress={toggleDrawer}>
              <Image source={Images.Cross} style={styles.cancelIcon} />
            </ButtonView>
          </View>
        </View>
      </View>
    );
  };

  const renderLogout = () => {
    return (
      <ButtonView style={styles.logoutBtn} onPress={handleLogout}>
        <Image source={Images.LogoutWhite} style={styles.logoutIcon} />
        <Text size="xSmall" color={Colors.white}>
          Logout
        </Text>
        <Image source={Images.ArrowRight2} style={styles.logoutArrow} />
      </ButtonView>
    );
  };

  return (
    <SafeAreaView
      style={[AppStyles.flex, {backgroundColor: Colors.background.primary}]}>
      {renderCrossLogoAndIcon()}
      <View style={styles.container}>
        {renderProfile()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderOptions()}
        </ScrollView>
        {renderLogout()}
      </View>
    </SafeAreaView>
  );
};

export default DrawerContentUI;
