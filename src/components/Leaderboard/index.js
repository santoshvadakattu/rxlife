import React, {useMemo, useRef, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Images} from '../../theme';
import Button from '../Button';
import CarouselListArrow from '../CarouselListArrow';
import Text from '../Text';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import LeaderBoardPerson from '../LeaderBoardPerson';
import {useSelector} from 'react-redux';

export default function Leaderboard() {
  const refFlatlist = useRef(null);
  const navigate = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {ongoingLeaderboard} = useSelector((state) => state?.challenge);

  function clickOnRight(index) {
    if (index !== 0) {
      refFlatlist?.current?.scrollToIndex({
        index: index - 1,
        animated: true,
      });
      setCurrentIndex(index - 1);
    }
  }
  function clickOnLeft(index) {
    if (ongoingLeaderboard?.length - 1 !== index) {
      refFlatlist?.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
      setCurrentIndex(index + 1);
    }
  }

  const renderOngoingActivityVertical = useMemo(() => {
    return (
      <FlatList
        data={ongoingLeaderboard[currentIndex]?.leaderBoard?.slice(0, 3) ?? []}
        style={{marginTop: 15}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <LeaderBoardPerson item={item} />}
      />
    );
  }, [currentIndex, ongoingLeaderboard]);

  return (
    <View style={styles.container}>
      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={16}
        style={{fontWeight: '600'}}>
        Leader Board
      </Text>
      <View style={{justifyContent: 'space-between'}}>
        <CarouselListArrow
          data={ongoingLeaderboard}
          clickOnLeft={clickOnLeft}
          clickOnRight={clickOnRight}
          refFlatlist={refFlatlist}
          setCurrentIndex={() => {}}
        />
        {renderOngoingActivityVertical}
        <Button
          onPress={() =>
            navigate.navigate('leaderboardListing', {
              leaderBoardData: ongoingLeaderboard[currentIndex]?.leaderBoard,
              challengeTitle: ongoingLeaderboard[currentIndex]?.title,
              isOngoing: true,
            })
          }
          title={'See All'}
          style={styles.btnStyle}
          textStyle={styles.txtStyle}
        />
      </View>
    </View>
  );
}
