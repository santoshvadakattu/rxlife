import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import ButtonView from '../ButtonView';

export default function ProfileComponent(props) {
  const {
    positiveTxt,
    nagetiveTxt,
    isFriendProfile,
    singleBtnTxt,
    onPressSingleBtn,
    userData,
    userProfile,
  } = props;
  const {image} = userProfile || {};
  const renderProfilePic = () => {
    return (
      <View style={styles.profileView}>
        {image ? (
          <Image
            source={image ? {uri: image} : {}}
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
          {userData?.fullname}
        </Text>
        <Text
          color={Colors.black2}
          size={Fonts.size.xSmall}
          type={Fonts.type.base}
          style={{fontWeight: '400', lineHeight: 21}}>
          {userData?.email}
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
        <ButtonView style={styles.positiveBtnView}>
          <Text
            color={Colors.white}
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            style={{fontWeight: '400', lineHeight: 18}}>
            {positiveTxt?.toUpperCase()}
          </Text>
        </ButtonView>
        <ButtonView style={styles.nageviteBtnView}>
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
        <ButtonView onPress={onPressSingleBtn} style={styles.requestBtnView}>
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
