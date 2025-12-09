import {FlatList, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomNavbar, WeeklyActivityItem} from '../../components';
import {Images} from '../../theme';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {connectedWatch, weeklyActivityData} from '../../constants';
import {useSelector} from 'react-redux';

export default function WeeklyActivityListing() {
  const navigate = useNavigation();
  const {connectedWatchName} = useSelector((state) => state.user);

  function onPressItem(index, item) {
    const screenToNavigate =
      connectedWatchName === connectedWatch.GRAMIN
        ? 'individualActivityGarmin'
        : 'individualActivity';

    const itemToSend = {
      ...item,
      title: item?.title?.toUpperCase(),
    };
    if (index === 0) {
      navigate.navigate(screenToNavigate, {
        item: itemToSend,
        value: 106,
        imageSytle: {width: 20, height: 17},
      });
    } else if (index === 1) {
      navigate.navigate(screenToNavigate, {
        item: itemToSend,
        value: 586,
        imageSytle: {width: 28, height: 19},
      });
    } else if (index === 2) {
      navigate.navigate(screenToNavigate, {
        item: itemToSend,
        value: 42,
        imageSytle: {width: 26, height: 27},
      });
    } else if (index === 3) {
      navigate.navigate(screenToNavigate, {
        item: {...itemToSend, title: 'RESTING HEART Rt.'},
        value: 60,
        imageSytle: {width: 23, height: 20},
      });
    } else if (index === 4) {
      navigate.navigate(screenToNavigate, {
        item: itemToSend,
        value: 16,
        imageSytle: {width: 24, height: 17},
      });
    } else if (index === 5) {
      navigate.navigate(screenToNavigate, {
        item: itemToSend,
        value: 26,
        imageSytle: {width: 21, height: 22},
      });
    } else if (index === 6) {
      navigate.navigate(screenToNavigate, {
        item: itemToSend,
        value: 23,
        imageSytle: {width: 21, height: 22},
      });
    } else if (index === 7) {
      navigate.navigate(screenToNavigate, {
        item: itemToSend,
        value: '2:40',
        imageSytle: {width: 21, height: 17},
      });
    } else if (index === 8) {
      navigate.navigate('activityWeeklyPoint', {
        item,
        value: '2:40',
        imageSytle: {width: 21, height: 17},
      });
    }
  }

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Your Weekly Activity'}
        leftBtnImage={Images.LeftArrow}
        leftBtnPress={() => navigate.goBack()}
        rightBtnPressSecond={() => {}}
        rightBtnPress={() => {}}
      />
    );
  }, []);

  const renderListing = () => {
    return (
      <FlatList
        data={weeklyActivityData}
        style={{marginVertical: 15}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({item, index}) => {
          return (
            <WeeklyActivityItem
              item={item}
              index={index}
              onPress={onPressItem}
            />
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
