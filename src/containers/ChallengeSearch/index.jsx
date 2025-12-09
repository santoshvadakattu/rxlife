import {FlatList, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  ChallengeBox,
  CustomNavbar,
  EmptyList,
  TextInput,
} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSearchAllChallengesPaginationRequest,
  getSearchAllChallengesRequest,
} from '../../redux/slicers/challenge';

const ChallengeSearch = () => {
  const navigate = useNavigation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const [searchChallenges, setSearchChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  // const {searchChallenges} = useSelector((state) => state?.challenge);

  const handleChangeQuery = (text) => {
    setQuery(text);

    if (searchRef?.current) {
      clearTimeout(searchRef.current);
    }

    if (!text) {
      setSearchChallenges([]);
      setLoading(false);
      return;
    }
    searchRef.current = setTimeout(() => {
      setLoading(true);
      initialRequest(text);
    }, 300);
  };

  const initialRequest = (text) => {
    dispatch(
      getSearchAllChallengesRequest({
        payloadData: {
          query: `search=${text}`,
        },
        responseCallback: (status, data) => {
          if (status) {
            setSearchChallenges(data);
          }
          setLoading(false);
        },
      }),
    );
  };

  const scrollReachEnd = () => {
    if (!query) return;

    dispatch(
      getSearchAllChallengesPaginationRequest({
        payloadData: {
          query: `start=${searchChallenges?.length}&search=${query}`,
        },
        responseCallback: (status, data) => {
          if (status) {
            setSearchChallenges([...searchChallenges, ...data]);
          }
        },
      }),
    );
  };

  return (
    <View style={[AppStyles.flex, AppStyles.pTop30, styles.wrapper]}>
      <CustomNavbar
        title="Search Challenges"
        hasBorder={false}
        titleColor={Colors.black}
        hasBack
        leftBtnImage={Images.BackIcon}
        leftBtnPress={() => navigate.goBack()}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TextInput
          leftIcon={Images.Search}
          placeholder={'Search Challenge'}
          value={query}
          autoFocus={true}
          onChangeText={handleChangeQuery}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
        />

        {!loading && query?.length > 0 && (
          <FlatList
            data={searchChallenges}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <ChallengeBox data={item} />}
            onEndReached={scrollReachEnd}
            onEndReachedThreshold={0.5}
            style={{
              flex: 2,
              marginTop: 10,
              minHeight: Metrics.screenHeight - 300,
            }}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={EmptyList}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ChallengeSearch;
