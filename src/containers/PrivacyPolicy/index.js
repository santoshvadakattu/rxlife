import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomNavbar, Text} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

export default function PrivacyPolicy() {
  const navigate = useNavigation();
  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Privacy Policy'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
      />
    );
  }, []);
  return (
    <View style={styles.container}>
      {renderCustomNav}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 10, marginBottom: 30}}>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 20}}>
          These RXLIFECHALLENGE Affiliates Terms and Conditions of Use (“Terms
          of Use”) comprise a legal agreement between RXLIFECHALLENGE Affiliates
          ("RXLIFECHALLENGE", “Company”, “we”, “our”, or “us”) and you, the
          person, who has legal capacity to enter contracts (“you”), accessing
          and/or using the RXLIFECHALLENGE software application, including when
          we provide any services or when you purchase, request, or obtain any
          services from us via any medium or platform, including.
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          Build long lasting health and lifestyle habits while competing with
          friends, gym mates, coworkers, or challenge the world while becoming
          healthier and winning prizes along the way.
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          Challenges are constantly being posted on the RX LIfe Challenge app
          where you can win cool prizes, like gift cards, gym memberships,
          supplement discounts, clothing, big cash prizes and more.
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          Our challenges vary from daily to yearly challenges where you will
          accumulate points and challenge yourself and others to become
          healthier and happier all while having the ability to win cool prizes
          for your hard work and sweat.
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          View your progress tracker to see how many days you have been active,
          challenges completed, body fat, weight, and many more.
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          This app is a game changer sign up for individual challenges or get a
          membership to access special challenges and content on our website.
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          Fitness, Challenge, Health, Lifestyle, Habits, Prizes, Wellness,
          Fitness Challenge, Healthy Habits, Gym.
        </Text>

        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10, fontWeight: '600'}}>
          Contact/Notices
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 5}}>
          If you have any questions about the Terms of Use, or need to provide
          notice to, or communicate with, RXLIFECHALLENGE under the Terms of
          Use, please contact RXLIFECHALLENGE in writing via either email or at
          the address specified below:
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          4255 Riverside Station
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 10}}>
          Boulevard Secaucus
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 20}}>
          New Jersey
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 20}}>
          07094
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 20}}>
          United States
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 20}}>
          E-mail:{' '}
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:rxlifechallenge@gmail.com')}>
            <Text
              type={Fonts.type.base}
              color={Colors.black2}
              size={Fonts.size.xSmall}
              style={styles.email}>
              rxlifechallenge@gmail.com
            </Text>
          </TouchableOpacity>
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 20}}>
          Phone:{' '}
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:  201-207-0701`)}>
            <Text
              type={Fonts.type.base}
              color={Colors.black2}
              size={Fonts.size.xSmall}
              style={styles.email}>
              201-207-0701
            </Text>
          </TouchableOpacity>
        </Text>
        <Text
          type={Fonts.type.base}
          color={Colors.black2}
          size={Fonts.size.xSmall}
          style={{marginTop: 20}}>
          These Terms of Use are personal to you, and are not assignable,
          transferable, or sublicensable by you except with RXLIFECHALLENGE
          prior written consent. RXLIFECHALLENGE may assign, transfer, or
          delegate any of its rights and obligations hereunder without your
          consent.
        </Text>
      </ScrollView>
    </View>
  );
}
