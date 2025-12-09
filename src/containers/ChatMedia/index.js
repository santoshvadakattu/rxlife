import {ActivityIndicator, Image, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ChatHeader, EmptyList, ModalCancel, Text} from '../../components';
import {AppStyles, Fonts, Images} from '../../theme';
import {deleteChatRequest, getRoomInfoRequest} from '../../redux/slicers/chat';

const ChatMedia = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {selectedRoom} = useSelector((state) => state?.chat);
  const {userData} = useSelector((state) => state?.user);

  const [mediaData, setMediaData] = useState({
    data: [],
    olderData: [],
    recentData: [],
    lastWeekData: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  useEffect(() => {
    const payload = {
      payloadData: {
        query: `room_id=${selectedRoom?.id}`,
      },
      headers: {
        Authorization: `Bearer ${userData?.chatUserId}`,
      },
      responseCallback: (status, res) => {
        setIsLoading(false);
        if (status) {
          setMediaData(res);
        }
      },
    };

    dispatch(getRoomInfoRequest(payload));
  }, []);

  const handleDeleteChat = () => {
    dispatch(
      deleteChatRequest({
        payloadData: {
          room_id: selectedRoom?.id,
        },
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: () => {},
      }),
    );
  };

  const renderTitle = (title) => {
    return (
      <View style={styles.titleWrapper}>
        <Text size={Fonts.size.xxxxxSmall} type="base">
          {title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ChatHeader
        title={selectedRoom?.roomName}
        roomImage={selectedRoom?.roomImage}
        subTitle="Media"
        hasBorder={false}
        isClickable={false}
        onTitlePress={() => {}}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
        rightBtnImage={Images.TrashRed}
        rightBtnPress={() => setIsDeleteVisible(true)}
      />

      {isLoading && <ActivityIndicator size="large" style={AppStyles.mTop15} />}

      {!isLoading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[AppStyles.flex]}>
          {mediaData?.recentData?.length > 0 && (
            <>
              {renderTitle('Recent')}

              <View
                style={[
                  AppStyles.flex,
                  AppStyles.mTop10,
                  AppStyles.flexRow,
                  {flexWrap: 'wrap'},
                ]}>
                {[...mediaData?.recentData]?.map((item) => (
                  <Image
                    key={item?.attachment_path}
                    source={{uri: item?.attachment_path}}
                    style={styles.imageStyle}
                  />
                ))}
              </View>
            </>
          )}

          {mediaData?.lastWeekData?.length > 0 && (
            <>
              {renderTitle('Last Week')}

              <View
                style={[
                  AppStyles.flex,
                  AppStyles.mTop10,
                  AppStyles.flexRow,
                  {flexWrap: 'wrap'},
                ]}>
                {mediaData?.lastWeekData?.map((item) => (
                  <Image
                    key={item?.attachment_path}
                    source={{uri: item?.attachment_path}}
                    style={styles.imageStyle}
                  />
                ))}
              </View>
            </>
          )}

          {mediaData?.olderData?.length > 0 && (
            <>
              {renderTitle('Last Month')}

              <View
                style={[
                  AppStyles.flex,
                  AppStyles.mTop10,
                  AppStyles.flexRow,
                  {flexWrap: 'wrap'},
                ]}>
                {mediaData?.olderData?.map((item) => (
                  <Image
                    key={item?.attachment_path}
                    source={{uri: item?.attachment_path}}
                    style={styles.imageStyle}
                  />
                ))}
              </View>
            </>
          )}

          {mediaData?.recentData?.length === 0 &&
            mediaData?.olderData?.length === 0 &&
            mediaData?.lastWeekData?.length === 0 && (
              <View
                style={[
                  AppStyles.flex,
                  AppStyles.mTop40,
                  AppStyles.centerInner,
                ]}>
                <EmptyList />
              </View>
            )}
        </ScrollView>
      )}

      <ModalCancel
        title="Are you sure you want to delete messages?"
        actionTitle={'Delete'}
        isVisible={isDeleteVisible}
        setVisible={setIsDeleteVisible}
        setIsActive={handleDeleteChat}
        // setIsActive={handleDeleteAccount}
      />
    </View>
  );
};

export default ChatMedia;
