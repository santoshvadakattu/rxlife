// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, SafeAreaView} from 'react-native';
import {Text, ButtonView, SearchBar} from '../';
import styles from './styles';
import {Images, AppStyles, Colors, Fonts} from '../../theme';

export default class ChatHeader extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string.isRequired,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnImage: PropTypes.number,
    rightBtnImageSecond: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnPressSecond: PropTypes.func,
    rightBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    roomImage: PropTypes.string,
    isEditAllowed: PropTypes.bool,
    editIconPress: PropTypes.func,
    leaveChat: PropTypes.bool,
    leaveChatPress: PropTypes.func,
  };

  static defaultProps = {
    hasBack: true,
    titleColor: '',
    leftBtnImage: undefined,
    leftBtnPress: () => {},
    leftBtnText: '',
    rightBtnImage: undefined,
    rightBtnImageSecond: undefined,
    rightBtnPress: () => {},
    rightBtnPressSecond: () => {},
    rightBtnText: '',
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    roomImage: '',
    isEditAllowed: false,
    editIconPress: () => {},
    leaveChat: false,
    leaveChatPress: () => {},
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView onPress={leftBtnPress} style={styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image source={leftBtnImage} style={styles.btnImage} />
        )}
        {renderBack && (
          <Image source={Images.back_btn} size={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderRight(
    rightBtnImage,
    rightBtnImageSecond,
    rightBtnPress,
    rightBtnPressSecond,
    rightBtnText,
    isEditAllowed,
    editIconPress,
    leaveChat,
    leaveChatPress,
  ) {
    return (
      <View style={[styles.btnWrapper, styles.rightBtn]}>
        {!_.isEmpty(rightBtnText) && (
          <ButtonView onPress={rightBtnPress}>
            <Text
              type="base"
              numberOfLines={1}
              ellipsizeMode="tail"
              size="xSmall">
              {rightBtnText}
            </Text>
          </ButtonView>
        )}
        <View style={[AppStyles.flexRow, {justifyContent: 'space-between'}]}>
          {isEditAllowed && (
            <ButtonView onPress={editIconPress}>
              <Image
                source={Images.EditGroup}
                style={[styles.btnImage, {marginRight: 10}]}
              />
            </ButtonView>
          )}
          {!_.isUndefined(rightBtnImage) && (
            <ButtonView onPress={rightBtnPress}>
              <Image
                source={rightBtnImage}
                style={[styles.btnImage, {marginRight: 10}]}
              />
            </ButtonView>
          )}

          {leaveChat && (
            <ButtonView onPress={leaveChatPress}>
              <Image source={Images.ExitGroup} style={[styles.btnImage]} />
            </ButtonView>
          )}
        </View>
      </View>
    );
  }

  renderTitle(
    title,
    titleColor,
    roomImage = '',
    subTitle = '',
    isClickable = false,
    onTitlePress = () => {},
  ) {
    const content = () => (
      <>
        <Image
          source={roomImage ? {uri: roomImage} : Images.Placeholder}
          style={{height: 34, width: 34, borderRadius: 17}}
        />

        <View style={[AppStyles.mLeft10, AppStyles.flex]}>
          <Text
            color={titleColor || Colors.text.primary}
            type={'medium'}
            numberOfLines={1}
            ellipsizeMode="tail"
            size={Fonts.size.xSmall}
            // style={{maxWidth: '90%'}}
          >
            {title || ''}
          </Text>

          {subTitle && (
            <Text
              color={titleColor || Colors.text.primary}
              type={'medium'}
              numberOfLines={1}
              ellipsizeMode="tail"
              size={Fonts.size.xSmall}>
              {subTitle || ''}
            </Text>
          )}
        </View>
      </>
    );

    if (isClickable) {
      return (
        <ButtonView
          onPress={onTitlePress}
          style={[
            AppStyles.flex,
            AppStyles.centerInner,
            {justifyContent: 'flex-start', flexDirection: 'row'},
          ]}>
          {content()}
        </ButtonView>
      );
    } else {
      return (
        <View
          style={[
            AppStyles.flex,
            AppStyles.centerInner,
            {justifyContent: 'flex-start', flexDirection: 'row'},
          ]}>
          {content()}
        </View>
      );
    }
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  render() {
    const {
      hasBack,
      title,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnPress,
      rightBtnPressSecond,
      rightBtnText,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      rightBtnImageSecond,
      roomImage,
      subTitle,
      isClickable,
      onTitlePress,
      isEditAllowed,
      editIconPress,
      leaveChat,
      leaveChatPress,
    } = this.props;
    return (
      <SafeAreaView
        style={[
          styles.container,
          style,
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
        ]}>
        <View style={AppStyles.flexRow}>
          {this.renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack)}
          {this.renderTitle(
            title,
            titleColor,
            roomImage,
            subTitle,
            isClickable,
            onTitlePress,
          )}
          {this.renderRight(
            rightBtnImage,
            rightBtnImageSecond,
            rightBtnPress,
            rightBtnPressSecond,
            rightBtnText,
            isEditAllowed,
            editIconPress,
            leaveChat,
            leaveChatPress,
          )}
        </View>

        {hasSearch && (
          <View style={AppStyles.centerInner}>
            {this.renderSearch(onSearchText, isSearching)}
          </View>
        )}
      </SafeAreaView>
    );
  }
}
