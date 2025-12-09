import {FlatList, View} from 'react-native';
import React from 'react';
import {AppStyles, Colors, Fonts} from '../../theme';
import styles from './styles';
import Text from '../Text';
import moment from 'moment';
import EmptyList from '../EmptyList';
import util, {formatNumber} from '../../util';

export default function ChallengesListPoints(props) {
  const {weeklydata, data, listName} = props;

  function generateWeekDates(startDate, numberOfDays) {
    const dates = [];
    for (let i = 0; i < numberOfDays; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  }
  const dates = generateWeekDates(weeklydata.startDate, data?.labels?.length);
  const combinedArray = data.labels.map((label, index) => ({
    label,
    data: data.datasets[0].data[index],
    date: dates[index].toDateString(),
  }));

  return (
    <View style={styles.container}>
      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={Fonts.size.normal}
        style={{fontWeight: '600'}}>
        {listName}
      </Text>
      <FlatList
        style={{marginTop: 5}}
        showsVerticalScrollIndicator={false}
        data={combinedArray}
        nestedScrollEnabled={true}
        renderItem={({item}) => {
          return (
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 5,
                flex: 1,
              }}>
              <View style={AppStyles.flex}>
                <Text
                  color={Colors.black2}
                  type={Fonts.type.base}
                  size={Fonts.size.xSmall}
                  style={{fontWeight: '600', flex: 1}}>
                  {item?.label}
                </Text>
                <Text
                  color={Colors.black2}
                  type={Fonts.type.base}
                  size={Fonts.size.xSmall}
                  style={{fontWeight: '400', flex: 1}}>
                  {moment(item?.date).format('DD-MMMM-YYYY')}{' '}
                </Text>
              </View>
              <Text
                color={Colors.black2}
                type={Fonts.type.base}
                size={Fonts.size.xSmall}
                style={{fontWeight: '600'}}>
                {item?.data ? formatNumber(item?.data) : 0}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View
            style={[
              AppStyles.flex,
              AppStyles.padding20,
              AppStyles.centerInner,
            ]}>
            <EmptyList />
          </View>
        )}
      />
    </View>
  );
}
