// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, SafeAreaView} from 'react-native';
import {Text, ButtonView, SearchBar} from '../';
import styles from './styles';
import {Images, AppStyles, Colors, Fonts} from '../../theme';

export default class CustomNavbar extends React.Component {
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
    notificationCount: PropTypes.number,
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
    rightBtnImageStyle: {},
    rightBtnTextKeys: {},
    rightBtnWrapper: {},
    notificationCount: 0,
    isUnread: false,
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
    rightBtnTextKeys,
    rightBtnWrapper,
    notificationCount,
    isUnread = false,
  ) {
    return (
      <View style={[styles.btnWrapper, styles.rightBtn]}>
        {!_.isEmpty(rightBtnText) && (
          <ButtonView onPress={rightBtnPress} style={[rightBtnWrapper]}>
            <Text
              type="base"
              numberOfLines={1}
              ellipsizeMode="tail"
              size="xSmall"
              {...rightBtnTextKeys}>
              {rightBtnText}
            </Text>
          </ButtonView>
        )}
        <View style={[AppStyles.flexRow, {justifyContent: 'space-between'}]}>
          {!_.isUndefined(rightBtnImageSecond) && (
            <ButtonView onPress={rightBtnPressSecond}>
              <Image
                source={rightBtnImageSecond}
                style={[styles.btnImage, {marginRight: 10}]}
              />

              {isUnread && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    position: 'absolute',
                    backgroundColor: 'red',
                    top: -5,
                    right: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              )}
            </ButtonView>
          )}
          {!_.isUndefined(rightBtnImage) && (
            <ButtonView onPress={rightBtnPress}>
              <Image source={rightBtnImage} style={[styles.btnImage]} />

              {notificationCount > 0 && (
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 10,
                    position: 'absolute',
                    backgroundColor: 'red',
                    top: -10,
                    right: -5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    color="white"
                    size="xxxxSmall"
                    style={{fontSize: 8}}>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Text>
                </View>
              )}
            </ButtonView>
          )}
        </View>
      </View>
    );
  }

  renderTitle(title, titleColor) {
    return (
      <View style={[AppStyles.flex, AppStyles.centerInner]}>
        <Text
          color={titleColor || Colors.black2}
          type={Fonts.type.base}
          numberOfLines={2}
          ellipsizeMode="tail"
          size={Fonts.size.medium}
          style={{fontWeight: '600', lineHeight: 27, textAlign: 'center'}}>
          {title || ''}
        </Text>
      </View>
    );
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
      rightBtnTextKeys,
      rightBtnWrapper,
      notificationCount,
      isUnread,
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
          {this.renderTitle(title, titleColor)}
          {this.renderRight(
            rightBtnImage,
            rightBtnImageSecond,
            rightBtnPress,
            rightBtnPressSecond,
            rightBtnText,
            rightBtnTextKeys,
            rightBtnWrapper,
            notificationCount,
            isUnread,
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
