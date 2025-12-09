import {FlatList, Image, SafeAreaView, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  ButtonView,
  ChallengeBox,
  CustomNavbar,
  Text,
  TextInput,
} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {ScrollView} from 'react-native-gesture-handler';
import {CHALLENGES, SCREENS} from '../../constants';

const ChallengesUI = (props) => {
  const {navigate, openDrawer} = props;

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        rightBtnImage={Images.Notification}
        rightBtnImageSecond={Images.Chat}
        leftBtnImage={Images.Drawer}
        leftBtnPress={openDrawer}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => navigate.navigate('notification')}
        title={'Challenges'}
      />
    );
  }, []);

  return (
    <View style={[styles.container]}>
      {/* {renderCustomNav} */}
      <ScrollView
        contentContainerStyle={{flex: 1}}
        style={AppStyles.flex}
        showsVerticalScrollIndicator={false}>
        {/* <ButtonView
          onPress={() => navigate.navigate(SCREENS.HOME.challengesSearch)}
          style={[styles.field]}>
          <Image source={Images.Search} style={styles.imageStyle} />

          <Text
            size={Fonts.size.xSmall}
            type={Fonts.type.base}
            style={styles.text}
            color={Colors.placeHolderColor}>
            Search Challenges
          </Text>
        </ButtonView> */}

        <FlatList
          data={CHALLENGES}
          renderItem={({item}) => <ChallengeBox data={item} />}
        />
      </ScrollView>
    </View>
  );
};

export default ChallengesUI;
