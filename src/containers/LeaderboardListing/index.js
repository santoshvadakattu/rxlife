import {Dimensions, FlatList, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  CustomNavbar,
  LeaderBoardPerson,
  LeaderboardItem,
} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default function LeaderboardListing({route}) {
  const leaderBoardData = route?.params?.leaderBoardData;
  const challengeTitle = route?.params?.challengeTitle;
  const isOngoing = route?.params?.isOngoing;
  const navigate = useNavigation();
  const verticalData = [
    {
      position: 1,
      positionimage: Images.firstPosition,
      image: Images.profile1,
      name: 'Ralph Edwards',
      points: 789,
    },
    {
      position: 2,
      positionimage: Images.SecondPosition,
      image: Images.profile2,
      name: 'Robert Fox',
      points: 789,
    },
    {
      position: 3,
      positionimage: Images.thirdPosition,
      image: Images.profile3,
      name: 'Jane Cooper',
      points: 789,
    },
    {
      image: Images.profile1,
      name: 'Ralph Edwards',
      points: 789,
    },
    {
      image: Images.profile2,
      name: 'Robert Fox',
      points: 789,
    },
    {
      image: Images.profile3,
      name: 'Jane Cooper',
      points: 789,
    },
    {
      image: Images.profile1,
      name: 'Ralph Edwards',
      points: 789,
    },
    {
      image: Images.profile2,
      name: 'Robert Fox',
      points: 789,
    },
    {
      image: Images.profile3,
      name: 'Jane Cooper',
      points: 789,
    },
  ];
  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={challengeTitle}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => {}}
        rightBtnImageStyle={{
          height: 22,
          width: 59,
          maxHeight: 22,
          maxWidth: 59,
        }}
        rightBtnText={isOngoing ? 'Ongoing' : null}
        rightBtnTextKeys={{
          size: Fonts.size.xxxxxSmall,
          type: 'medium',
          style: {
            color: Colors.text.theme,
          },
        }}
        rightBtnWrapper={{
          backgroundColor: 'rgba(13, 130, 255, 0.1)',
          padding: 10,
          borderRadius: 240,
        }}
      />
    );
  }, []);
  const renderListing = () => {
    return (
      <FlatList
        data={leaderBoardData}
        style={{marginVertical: 15}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({item, index}) => {
          return (
            <LeaderBoardPerson item={item} index={index} isListing={true} />
          );
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      {renderCustomNav}
      {renderListing()}
    </View>
  );
}
