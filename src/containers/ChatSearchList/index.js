import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonView,
  CustomNavbar,
  EmptyList,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendsRequest} from '../../redux/slicers/friends';
import {loadRoomRequest} from '../../redux/slicers/chat';
import {SCREENS} from '../../constants';

const ChatSearchList = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {friends} = useSelector((state) => state?.friends);
  const {userData} = useSelector((state) => state?.user);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const payload = {
      userId: userData?.id,
    };
    dispatch(
      getFriendsRequest({
        payloadData: payload,
        responseCallback: () => {
          setIsLoading(false);
        },
      }),
    );
  }, []);

  const handleChangeQuery = (text) => {
    setQuery(text);
  };

  const handleLoadRoom = (item) => {
    const payload = {
      receiverID: item?.chatUserId,
      senderID: userData?.chatUserId,
      room_type: 'individual',
    };

    dispatch(
      loadRoomRequest({
        payloadData: payload,
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: (status) => {
          if (status) {
            navigate.navigate(SCREENS.HOME.chat);
          }
        },
      }),
    );
  };

  const filteredFriends =
    friends?.length > 0
      ? friends?.filter((friend) =>
          friend?.fullname
            ?.toLocaleLowerCase()
            ?.match(query?.toLocaleLowerCase()),
        )
      : [];

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={'New Chat'}
        hasBorder={false}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <ScrollView containerStyle={[AppStyles.flex]}>
        <TextInput
          leftIcon={Images.Search}
          placeholder={'Search'}
          value={query}
          autoFocus={true}
          onChangeText={handleChangeQuery}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
        />

        {isLoading && (
          <ActivityIndicator size={'large'} style={AppStyles.mTop10} />
        )}

        {!isLoading && (
          <FlatList
            data={filteredFriends}
            style={[AppStyles.flex, AppStyles.mTop25]}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ButtonView
                onPress={() => handleLoadRoom(item)}
                style={[styles.chatRow, AppStyles.themeShadow, AppStyles.flex]}>
                <Image
                  source={item?.image ? {uri: item?.image} : Images.Placeholder}
                  style={styles.profilePhoto}
                />

                <Text
                  size={Fonts.size.xSmall}
                  type="medium"
                  style={AppStyles.mLeft15}>
                  {item?.fullname}
                </Text>

                <View style={styles.chatBtnWrapper}>
                  <Image source={Images.Chat} style={styles.chatBtnImage} />
                </View>
              </ButtonView>
            )}
            ListEmptyComponent={EmptyList}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ChatSearchList;
