import {View, Image} from 'react-native';
import React from 'react';
import {ButtonView, Text} from '..';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import {useSelector} from 'react-redux';

const Participant = (props) => {
  const {
    id,
    fullName = '',
    fullname = '',
    image = '',
    showCross = false,
    isClickable = true,
    isSelected = false,
    isRemoved = false,
    isLeaved = false,

    // functions
    onPress = () => {},
    onPressAction = () => {},
  } = props;

  const {userData} = useSelector((state) => state?.user);

  const renderContent = () => {
    return (
      <>
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <Image
            source={image ? {uri: image} : Images.Placeholder}
            style={{height: 52, width: 52, borderRadius: 26}}
          />

          <Text
            size={Fonts.size.xSmall}
            type="medium"
            style={[AppStyles.mLeft15]}>
            {fullName || fullname}
          </Text>
        </View>

        {showCross && userData?.isAdmin && userData?.chatUserId != id && (
          <ButtonView onPress={onPressAction}>
            <Image source={Images.CrossRed} style={{height: 18, width: 18}} />
          </ButtonView>
        )}
      </>
    );
  };

  if (isLeaved || isRemoved) {
    return <></>;
  }

  if (isClickable) {
    return (
      <ButtonView
        style={[
          styles.subContainer,
          AppStyles.themeShadow,
          isSelected && {borderColor: Colors.background.primary},
        ]}
        onPress={onPress}>
        {renderContent()}
      </ButtonView>
    );
  }

  return (
    <View
      style={[
        styles.subContainer,
        AppStyles.themeShadow,
        isSelected && {borderColor: Colors.background.primary},
      ]}>
      {renderContent()}
    </View>
  );
};

export default Participant;
