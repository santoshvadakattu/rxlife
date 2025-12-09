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
  getAllUsersRequest,
  getMoreUsersRequest,
  removeUserFromSelectedList,
} from '../../redux/slicers/chat';

const SelectParticipants = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const searchRef = useRef(null);

  const {selectedGroupUsers, allUsers} = useSelector((state) => state?.chat);

  useEffect(() => {
    dispatch(
      getAllUsersRequest({
        payloadData: {
          query: `limit=${20}&offset=${0}`,
        },

        responseCallback: () => {
          setIsLoading(false);
        },
      }),
    );
  }, []);

  const getMoreParticipants = () => {
    if (isLoading) return;

    let queryPayload = `limit=${20}&offset=${allUsers?.length}`;
    if (query) {
      queryPayload += `&search=${query}`;
    }

    dispatch(
      getMoreUsersRequest({
        payloadData: {
          query: queryPayload,
        },
      }),
    );
  };

  const handleOnPressUser = (user) => {
    const findUser = selectedGroupUsers?.find((item) => item?.id == user?.id);

    if (findUser) {
      dispatch(removeUserFromSelectedList(user));
    } else dispatch(addUserInSelectedList(user));
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
              Selected {selectedGroupUsers?.length}/{allUsers?.length}
            </Text>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 25, flex: 1, flexGrow: 1}}
          data={allUsers}
          ListEmptyComponent={EmptyList}
          onEndReached={getMoreParticipants}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => {
            return (
              <Participant
                {...item}
                onPress={() => handleOnPressUser(item)}
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
          title={'Next'}
          disabled={selectedGroupUsers?.length === 0}
          onPress={() => {
            navigate.dispatch(StackActions.replace(SCREENS.HOME.createGroup));
          }}
        />
      </DisplayBottom>
    </View>
  );
};

export default SelectParticipants;
