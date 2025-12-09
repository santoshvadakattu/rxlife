import {FlatList, View} from 'react-native';
import React from 'react';
import {AppStyles, Colors, Fonts} from '../../theme';
import styles from './styles';
import Text from '../Text';
import moment from 'moment';
import EmptyList from '../EmptyList';

export default function ChallengesList(props) {
  const {data} = props;
  return (
    <View style={styles.container}>
      <Text
        color={Colors.black2}
        type={Fonts.type.base}
        size={Fonts.size.normal}
        style={{fontWeight: '600'}}>
        Challenges
      </Text>
      <FlatList
        style={{marginTop: 5}}
        showsVerticalScrollIndicator={false}
        data={data}
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
                  {item?.title}
                </Text>
                <Text
                  color={Colors.black2}
                  type={Fonts.type.base}
                  size={Fonts.size.xSmall}
                  style={{fontWeight: '400', flex: 1}}>
                  {moment(item?.day?.date).format('DD-MMMM-YYYY')}{' '}
                  {moment(item?.endDate).isBefore(moment())
                    ? 'Completed'
                    : 'Ongoing'}
                </Text>
              </View>
              <Text
                color={Colors.black2}
                type={Fonts.type.base}
                size={Fonts.size.xSmall}
                style={{fontWeight: '600'}}>
                Points {item?.day?.earned ?? 0}
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
