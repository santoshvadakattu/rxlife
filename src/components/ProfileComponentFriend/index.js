import {ActivityIndicator, Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';

export default function ProfileComponentFriend(props) {
  const {
    positiveTxt,
    nagetiveTxt,
    isFriendProfile,
    singleBtnTxt,
    onPressSingleBtn,
    userData,
    userProfile,
    friendProfile,
    positiveOnpress,
    nagetiveOnpress,
    friendId,
    isLoader,
  } = props;
  const navigate = useNavigation();
  const {image, fullname, email} = friendProfile || {};
  const renderProfilePic = () => {
    return (
      <View style={styles.profileView}>
        {!isLoader ? (
          <>
            {image ? (
              <Image
                source={image ? {uri: image} : {}}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={Images.ProfileIcon}
                style={{
                  width: 37,
                  height: 45,
                  tintColor: Colors.background.primary,
                }}
              />
            )}
          </>
        ) : (
          <ActivityIndicator size={'small'} color={Colors.background.primary} />
        )}
      </View>
    );
  };
  const renderNameEmail = () => {
    return (
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text
          color={Colors.black2}
          size={Fonts.size.normal}
          type={Fonts.type.base}
          style={{fontWeight: '600', lineHeight: 21}}>
          {fullname}
        </Text>
        <Text
          color={Colors.black2}
          size={Fonts.size.xSmall}
          type={Fonts.type.base}
          style={{fontWeight: '400', lineHeight: 21}}>
          {email}
        </Text>
      </View>
    );
  };

  const renderTwoBtns = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <ButtonView
          onPress={() => {
            positiveOnpress && positiveOnpress(friendId);
            // positiveOnpress && navigate.goBack();
          }}
          style={styles.positiveBtnView}>
          <Text
            color={Colors.white}
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            style={{fontWeight: '400', lineHeight: 18}}>
            {positiveTxt?.toUpperCase()}
          </Text>
        </ButtonView>
        <ButtonView
          onPress={() => {
            nagetiveOnpress(friendId);
            // navigate.goBack();
          }}
          style={styles.nageviteBtnView}>
          <Text
            color={Colors.white}
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            style={{fontWeight: '400', lineHeight: 18}}>
            {nagetiveTxt?.toUpperCase()}
          </Text>
        </ButtonView>
      </View>
    );
  };
  const renderMassageBtn = () => {
    return (
      <View
        style={{
          marginTop: 15,
          width: '100%',
        }}>
        <ButtonView
          onPress={onPressSingleBtn}
          style={[
            styles.requestBtnView,
            friendProfile?.isRequestSent && {
              backgroundColor: Colors.background.red,
            },
          ]}>
          <Text
            color={Colors.white}
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            style={{fontWeight: '400', lineHeight: 18}}>
            {singleBtnTxt?.toUpperCase()}
          </Text>
        </ButtonView>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderProfilePic()}
      {renderNameEmail()}
      {isFriendProfile ? renderTwoBtns() : renderMassageBtn()}
    </View>
  );
}
