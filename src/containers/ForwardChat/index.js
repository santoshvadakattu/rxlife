import {FlatList, Image, ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomNavbar,
  EmptyList,
  KeyboardAwareScrollViewComponent,
  Text,
  TextInput,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {StackActions, useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {DisplayBottom} from '../../Partials';
import Participant from '../../components/Participant';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  addUserInSelectedList,
  getAllRoomsRequest,
  getAllUsersRequest,
  getMoreUsersRequest,
  removeUserFromSelectedList,
  sendMessageRequest,
} from '../../redux/slicers/chat';

const ForwardChat = ({route}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sentLoading, setSentLoading] = useState(false);

  const searchRef = useRef(null);

  const {allRooms} = useSelector((state) => state?.chat);
  const {userData} = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(
      getAllRoomsRequest({
        headers: {
          Authorization: `Bearer ${userData?.chatUserId}`,
        },
        responseCallback: () => {},
      }),
    );
  }, []);

  const handleOnPressUser = (user) => {
    const findUser = selectedGroupUsers?.find((item) => item?.id == user?.id);

    if (findUser) {
      const filteredUsers = selectedGroupUsers?.filter(
        (item) => item?.id != user?.id,
      );
      setSelectedGroupUsers([...filteredUsers]);
    } else {
      setSelectedGroupUsers([...selectedGroupUsers, user]);
    }
  };

  const handleChangeQuery = (text) => {
    setQuery(text);

    if (searchRef?.current) {
      clearTimeout(searchRef?.current);
    }

    searchRef.current = setTimeout(() => {
      dispatch(
        getAllUsersRequest({
          payloadData: {
            query: `limit=${5}&offset=${0}&search=${text}`,
          },
        }),
      );
    }, 300);
  };

  const handleSendMessage = () => {
    const result = [];
    for (let selectedRoom of selectedGroupUsers) {
      const data = new FormData();

      data.append('files', route?.params?.file);
      data.append('message_text', '');
      data.append('room_id', selectedRoom?.id);
      data.append('senderID', userData?.chatUserId);
      data.append('receiverID', selectedRoom?.otherPerson?.id);
      data.append('message_type', 'file');

      dispatch(
        sendMessageRequest({
          payloadData: data,
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback: () => {
            setSentLoading(false);
            result.push(1);
            if (result?.length === selectedGroupUsers?.length) {
              sendMessageOnly();
            }
          },
        }),
      );
    }

    setSentLoading(true);
  };

  const sendMessageOnly = () => {
    const result = [];
    for (let selectedRoom of selectedGroupUsers) {
      const data = new FormData();

      data.append('message_text', route?.params?.message);
      data.append('room_id', selectedRoom?.id);
      data.append('senderID', userData?.chatUserId);
      data.append('receiverID', selectedRoom?.otherPerson?.id);
      data.append('message_type', 'file');

      dispatch(
        sendMessageRequest({
          payloadData: data,
          headers: {
            Authorization: `Bearer ${userData?.chatUserId}`,
          },
          responseCallback: (status, res) => {
            setSentLoading(false);
            result.push(1);
            if (result?.length === selectedGroupUsers?.length) {
              navigate.goBack();
            }
          },
        }),
      );
    }
  };

  const filteredRooms = allRooms?.filter((item) =>
    item?.roomName?.toLowerCase?.()?.match(query?.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={'Select Participants'}
        hasBorder={false}
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />

      <ScrollView
        style={[AppStyles.flex, {marginBottom: 110}]}
        showsVerticalScrollIndicator={false}>
        <TextInput
          leftIcon={Images.Search}
          placeholder={'Search Friend'}
          value={query}
          autoFocus={false}
          onChangeText={handleChangeQuery}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
        />

        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            AppStyles.spaceBetween,
            AppStyles.mTop10,
            {justifyContent: 'flex-end'},
          ]}>
          <View>
            <Text size={Fonts.size.xSmall} type="medium">
              Selected {selectedGroupUsers?.length}/{allRooms?.length}
            </Text>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 25, flex: 1, flexGrow: 1}}
          data={filteredRooms}
          ListEmptyComponent={EmptyList}
          renderItem={({item}) => {
            return (
              <Participant
                {...item}
                onPress={() => handleOnPressUser(item)}
                fullName={item?.roomName}
                image={item?.roomImage}
                isSelected={
                  selectedGroupUsers?.findIndex(
                    (user) => user?.id == item?.id,
                  ) > -1
                }
              />
            );
          }}
        />
      </ScrollView>

      <DisplayBottom>
        <Button
          title={'Send'}
          disabled={selectedGroupUsers?.length === 0 || sentLoading}
          onPress={handleSendMessage}
          isLoading={sentLoading}
        />
      </DisplayBottom>
    </View>
  );
};

export default ForwardChat;
