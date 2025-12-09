import {View, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomNavbar,
  ModalCancel,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {DisplayBottom} from '../../Partials';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserRequest} from '../../redux/slicers/user';
import {logoutUser} from '../../util';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {userData} = useSelector((state) => state?.user);

  const handleDeleteAccount = () => {
    setIsLoading(true);

    dispatch(
      updateUserRequest({
        params: userData?.id,
        payloadData: {
          isDeleted: true,
        },
        responseCallback: (status) => {
          setIsLoading(false);
          if (status) {
            logoutUser();
          }
        },
      }),
    );
  };

  const renderModal = () => {
    return (
      <ModalCancel
        title="Are you sure to Delete your account"
        actionTitle={'Delete'}
        isVisible={isVisible}
        setVisible={setIsVisible}
        setIsActive={handleDeleteAccount}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        title={'Settings'}
        titleColor={Colors.black}
        hasBack={true}
        leftBtnPress={() => navigate.goBack()}
        leftBtnImage={Images.BackIcon}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        <ButtonView
          style={[styles.settingBox, AppStyles.themeShadow]}
          onPress={() => navigate.navigate(SCREENS.HOME.notificationSettings)}>
          <View style={styles.imageWrapper}>
            <Image source={Images.NotificationLight} style={styles.notiImage} />
          </View>

          <Text size={Fonts.size.xSmall} type="medium">
            Notification Settings
          </Text>
        </ButtonView>

        {userData?.loginProvider !== 'apple' &&
          userData?.provider == 'local' && (
            <ButtonView
              style={[styles.settingBox, AppStyles.themeShadow]}
              onPress={() => navigate.navigate(SCREENS.HOME.updatePassword)}>
              <View style={styles.imageWrapper}>
                <Image
                  source={Images.PasswordLightIcon}
                  style={styles.passwordIcon}
                />
              </View>

              <Text size={Fonts.size.xSmall} type="medium">
                Change Password
              </Text>
            </ButtonView>
          )}
      </ScrollView>

      <DisplayBottom>
        <Button
          title={'Delete Account'}
          background={Colors.background.red}
          onPress={() => setIsVisible(true)}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </DisplayBottom>

      {renderModal()}
    </View>
  );
};

export default Settings;
