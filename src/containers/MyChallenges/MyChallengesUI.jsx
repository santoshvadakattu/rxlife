import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  ChallengeBox,
  CustomNavbar,
  EmptyList,
  SectionTabs,
} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import {ScrollView} from 'react-native-gesture-handler';
import {SCREENS} from '../../constants';
import Challenges from '../Challenges';

const MyChallengesUI = (props) => {
  const {
    navigate,
    active,
    isLoading,
    filteredChallenges,
    isPullToref,
    userData,
    isUnread,
    // functions
    setActive,
    openDrawer,
    getMoreChallenges,
    pullToRefresh,
  } = props;

  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        rightBtnImage={Images.Notification}
        rightBtnImageSecond={Images.Chat}
        leftBtnImage={Images.Drawer}
        leftBtnPress={openDrawer}
        rightBtnPressSecond={() => {
          navigate.navigate(SCREENS.HOME.chatList);
        }}
        rightBtnPress={() => navigate.navigate('notification')}
        title={'Challenges'}
        notificationCount={userData?.notificationCount}
        isUnread={isUnread}
      />
    );
  }, [userData?.notificationCount, isUnread]);

  return (
    <View style={[AppStyles.flex, styles.wrapper, styles.container]}>
      {renderCustomNav}
      <SectionTabs
        title1={'Challenges'}
        title2={'Ongoing'}
        title3={'Completed'}
        active={active}
        setActive={setActive}
      />
      {active == 'Challenges' ? (
        <View style={{flex: 1}}>
          <Challenges />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isPullToref}
              onRefresh={() => {
                pullToRefresh();
              }}
            />
          }
          style={{}}
          showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              style={[AppStyles.mTop10, AppStyles.mBottom10]}
            />
          ) : (
            <FlatList
              data={filteredChallenges}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              renderItem={({item}) => <ChallengeBox data={item} myChallenge />}
              onEndReached={getMoreChallenges}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={EmptyList}
              style={{minHeight: Metrics.screenHeight - 300}}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default MyChallengesUI;
