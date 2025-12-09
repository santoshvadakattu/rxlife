import {FlatList, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Text from '../Text';
import {Colors, Fonts} from '../../theme';
import {statisticData} from '../../constants';
export default function StatisticsList(props) {
  const {data, style} = props;

  const StatisticsListToShow = [
    {
      title: 'Days Active',
      value: data?.activeDays ?? 0,
    },
    {
      title: 'Days Active Streak',
      value: data?.activeDaysStreak ?? 0,
    },
    {
      title: 'Challenges Completed',
      value: data?.completeChallenges ?? 0,
    },
    {
      title: 'Challenges Won',
      value: data?.wonChallenges ?? 0,
    },
    {
      title: 'Active Challenges',
      value: data?.activeChallenges ?? 0,
    },
    {
      title: 'Daily Challenges Completed',
      value: data?.completeDailyChallenges ?? 0,
    },
    {
      title: 'Daily Challenge Streak',
      value: data?.dailyChallengesStreak ?? 0,
    },
  ];
  return (
    <View style={[styles.mainView, style]}>
      <Text
        size={Fonts.size.large}
        color={Colors.black2}
        type={Fonts.type.base}
        style={{fontWeight: '700'}}>
        Statistics
      </Text>
      <FlatList
        data={StatisticsListToShow}
        style={{marginTop: 10}}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                alignItems: 'center',
                borderBottomColor: Colors.text.Gray62,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: Colors.background.primary,
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 7,
                  flex: 1,
                }}>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxxSmall}
                  color={Colors.black2}
                  style={{fontWeight: '400'}}>
                  {item.title}
                </Text>
                <Text
                  type={Fonts.type.base}
                  size={Fonts.size.xxxSmall}
                  color={Colors.text.Gray62}
                  style={{fontWeight: '400'}}>
                  {item.value}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
