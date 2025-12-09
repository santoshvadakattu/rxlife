import {Image, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import Text from '../Text';
import ButtonView from '../ButtonView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import util from '../../util';
import {addSearch} from '../../redux/slicers/recentSearches';
import {fetchNutritionData} from '../../services/ninjaApi';

export default function AddFriendsItem({item, sendRequest, removeRequest}) {
  const navigate = useNavigation();
  const {userData} = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.recentSearches.searches);

  const handleLoadRoom = () => {
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

  const handleSearchAndNutrition = async (query) => {
    try {
      const nutritionData = await fetchNutritionData(query);
      dispatch(addSearch(query));
      console.log('Nutrition Data:', nutritionData);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonView
        onPress={() =>
          navigate.navigate(SCREENS.HOME.friendProfile, {
            positiveTxt: 'Message',
            nagetiveTxt: 'Unfriend',
            isFriendProfile: false,
            singleBtnTxt: 'Send Request',
            userId: item.id,
            positiveOnpress: handleLoadRoom,
          })
        }>
        {item?.image ? (
          <Image
            source={item?.image ? {uri: item?.image} : {}}
            style={styles.profileImage}
          />
        ) : (
          <View
            style={[
              styles.profileImage,
              {
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.background.primary,
              },
            ]}>
            <Image
              source={Images.ProfileIcon}
              style={[
                styles.icon,
                {
                  tintColor: Colors.background.primary,
                  marginRight: 0,
                },
              ]}
            />
          </View>
        )}
      </ButtonView>
      <View
        style={{
          marginLeft: 10,
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          color={Colors.black2}
          type={Fonts.type.base}
          size={Fonts.size.xSmall}
          style={{fontWeight: '500'}}>
          {item.fullname}
        </Text>
        {item.isRequestSent ? (
          <ButtonView
            onPress={() => removeRequest(item)}
            style={styles.rejectBtn}>
            <Image
              source={Images.SendPersonalIcon}
              style={{width: 18, height: 20}}></Image>
          </ButtonView>
        ) : (
          <ButtonView
            onPress={() => sendRequest(item)}
            style={styles.rejectBtn}>
            <Image
              source={Images.requestPersonalIcon}
              style={{width: 17, height: 21}}></Image>
          </ButtonView>
        )}
      </View>
      <View>
        <Text>Recent Searches:</Text>
        {recentSearches.map((search, index) => (
          <Text key={index}>{search}</Text>
        ))}
      </View>
      <ButtonView onPress={() => handleSearchAndNutrition('example query')}>
        <Text>Fetch Nutrition</Text>
      </ButtonView>
    </View>
  );
}
