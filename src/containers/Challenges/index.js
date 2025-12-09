import React, {useEffect, useMemo, useState} from 'react';
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import styles from './styles';
import {
  ButtonView,
  ChallengeBox,
  CustomNavbar,
  EmptyList,
  Loader,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {CHALLENGES, SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllChallengesPaginationRequest,
  getAllChallengesRequest,
} from '../../redux/slicers/challenge';
import {getUnReadChatRequest} from '../../redux/slicers/chat';

const Challenges = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [isPullToref, setIsPullToRef] = useState(() => false);

  const {allChallenges} = useSelector((state) => state?.challenge);
  const {userData} = useSelector((state) => state?.user);
  const {isUnread} = useSelector((state) => state?.chat);

  useEffect(() => {
    if (isFocused) initialRequest();
  }, [isFocused]);

  const initialRequest = () => {
    dispatch(
      getAllChallengesRequest({
        payloadData: {
          query: '',
        },
        responseCallback: () => {
          if (isLoading) {
            setIsLoading(false);
          }
          setIsPullToRef(false);
        },
      }),
    );

    dispatch(
      getUnReadChatRequest({
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: () => {},
      }),
    );
  };

  const pullToRefresh = () => {
    setIsPullToRef(true);

    initialRequest();
  };

  const scrollReachEnd = () => {
    dispatch(
      getAllChallengesPaginationRequest({
        payloadData: {
          query: `start=${allChallenges?.length}`,
        },
        responseCallback: (status) => {
          if (!status) {
          }
        },
      }),
    );
  };

  const openDrawer = () => {
    navigate.dispatch(DrawerActions.openDrawer());
  };
  const renderCustomNav = useMemo(() => {
    return (
      <CustomNavbar
        hasBorder={false}
        title={'Challenges'}
        rightBtnImage={Images.Notification}
        rightBtnImageSecond={Images.Chat}
        leftBtnImage={Images.Drawer}
        leftBtnPress={openDrawer}
        rightBtnPressSecond={() => {
          navigate.navigate(SCREENS.HOME.chatList);
        }}
        rightBtnPress={() => {
          navigate.navigate('notification');
        }}
        notificationCount={userData?.notificationCount}
        isUnread={isUnread}
      />
    );
  }, [userData?.notificationCount, isUnread]);

  // return <ChallengesUI navigate={navigate} openDrawer={openDrawer} />;
  return (
    <View style={[styles.container]}>
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
        <ButtonView
          onPress={() => {
            navigate.navigate(SCREENS.HOME.challengesSearch);
          }}
          style={[styles.field]}>
          <Image source={Images.Search} style={styles.imageStyle} />

          <Text
            size={Fonts.size.xSmall}
            type={Fonts.type.base}
            style={styles.text}
            color={Colors.placeHolderColor}>
            Search Challenges
          </Text>
        </ButtonView>

        {isLoading && (
          <ActivityIndicator size={'large'} style={AppStyles.mTop15} />
        )}

        {!isLoading && (
          <FlatList
            data={allChallenges ?? []}
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              marginTop: 10,
              // borderWidth: 1,
              // borderColor: 'black',
              height: 'auto',
              minHeight: Metrics.screenHeight - 300,
            }}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => <ChallengeBox data={item} />}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              scrollReachEnd();
            }}
            ListEmptyComponent={EmptyList}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Challenges;
