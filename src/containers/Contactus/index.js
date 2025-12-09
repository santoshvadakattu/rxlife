import {Linking, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomNavbar, Text} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

export default function Contactus() {
  const navigate = useNavigation();
  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Contact Us'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
      />
    );
  }, []);
  return (
    <View style={styles.container}>
      {renderCustomNav}
      <View style={{flex: 0.9, justifyContent: 'space-between'}}>
        <View style={{marginHorizontal: 10}}>
          <Text
            type={Fonts.type.base}
            color={Colors.black2}
            size={Fonts.size.xSmall}
            style={{marginTop: 20}}>
            RXLIFE CHALLENGE Build long lasting health and lifestyle habits
            while competing with friends, gym mates, and coworkers. Or challenge
            the world while becoming healthier and winning prizes along the way.
          </Text>
          <Text
            type={Fonts.type.base}
            color={Colors.black2}
            size={Fonts.size.xSmall}
            style={{marginTop: 20}}>
            Challenges are constantly posted on the RX LIfe Challenge app where
            you can win cool prizes like gift cards, gym memberships, supplement
            discounts, clothing, cash prizes and more.
          </Text>
          <Text
            type={Fonts.type.base}
            color={Colors.black2}
            size={Fonts.size.xSmall}
            style={{marginTop: 20}}>
            Our challenges vary daily to yearly where you will accumulate
            points, actively motivate yourself and others, develop healthier
            lifestyle habits, all with the possibility of earning bonus prizes
            at the end.
          </Text>
          <Text
            type={Fonts.type.base}
            color={Colors.black2}
            size={Fonts.size.xSmall}
            style={{marginTop: 20}}>
            View your progress tracker to see how many days you have been
            active, your completed challenges, body fat percentage, weight, and
            more.
          </Text>
          <Text
            type={Fonts.type.base}
            color={Colors.black2}
            size={Fonts.size.xSmall}
            style={{marginTop: 20}}>
            This app is a game changer! Sign up for individual challenges or
            secure a membership to access special challenges and content on our
            website.
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
          marginHorizontal: 10,
        }}>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.medium}
          style={{fontWeight: '600'}}>
          Contact Us
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://rxlifechallenge.com')}>
          <Text
            type={Fonts.type.base}
            color={Colors.black2}
            size={Fonts.size.xSmall}
            style={{
              fontWeight: '400',
              marginTop: 10,
              lineHeight: 21,
            }}>
            website:{' '}
            <Text
              type={Fonts.type.base}
              color={Colors.black2}
              size={Fonts.size.xSmall}
              style={{
                fontWeight: '400',
                lineHeight: 21,
                textDecorationLine: 'underline',
                color: 'blue',
              }}>
              https://rxlifechallenge.com
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:rxlifechallenge@gmail.com')}>
          <Text
            type={Fonts.type.base}
            color={Colors.black2}
            size={Fonts.size.xSmall}
            style={{fontWeight: '400', lineHeight: 21}}>
            Email: {'    '}
            <Text
              type={Fonts.type.base}
              color={Colors.black2}
              size={Fonts.size.xSmall}
              style={{
                fontWeight: '400',
                lineHeight: 21,
                textDecorationLine: 'underline',
                color: 'blue',
              }}>
              rxlifechallenge@gmail.com
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
