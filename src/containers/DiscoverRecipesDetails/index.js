import {Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomHeaderNutrition, Text, TextInput} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import DiscoverItem from '../../components/DiscoverItem';
import {useDispatch} from 'react-redux';
import {getDiscoveryCategoryRequest} from '../../redux/slicers/nutritions';
import {useNavigation} from '@react-navigation/native';
import {utc} from 'moment';
import util from '../../util';

export default function DiscoverRecipesDetails({route}) {
  let limit = 10;
  const {title, getFoodsForDailyNutrition, selectedNutrion} = route.params;
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloaderMore, setIsLoaderMore] = useState(false);
  const [isHasMoreData, setIsHasMoreData] = useState(true);
  const navigate = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getDiscoveryCategoryRequest({
        payloadData: {
          category: title,
          query: `limit=${200}&offset=${page}`,
        },
        responseCallback: (status, response) => {
          console.log('response', response);
          setData(response);
          setLoading(false);
        },
      }),
    );
  }, []);

  function onPressPlus(item) {
    getFoodsForDailyNutrition(item, 'allFood', selectedNutrion);
    navigate.pop(3);
  }

  function moreEndReach() {
    let offset = limit * page - limit;
    if (isHasMoreData) {
      setIsLoaderMore(true);
      dispatch(
        getDiscoveryCategoryRequest({
          payloadData: {
            category: title,
            query: `limit=${limit}&offset=${offset}`,
          },
          responseCallback: (status, response) => {
            if (status) {
              setData([...data, ...response]);
              util.isArrayEmpty(response) && setIsHasMoreData(false);
            }
            console.log({status});
            setPage(page + 1);
            setIsLoaderMore(false);
          },
        }),
      );
    }
  }

  const renderSearchBar = () => {
    return (
      <View style={{height: 70}}>
        <TextInput
          leftIcon={Images.Search}
          placeholder={'Search Recipes'}
          value={searchValue}
          onChangeText={() => {
            setSearchValue();
          }}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
        />
      </View>
    );
  };

  const renderItemsList = () => {
    return (
      <View style={{marginTop: 20, flex: 1, paddingBottom: 20}}>
        <Text size={12} type={Fonts.type.base} style={{fontsWeight: '500'}}>
          {title}
        </Text>
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 15}}
          columnWrapperStyle={{flexGrow: 1}}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({item}) => {
            return (
              <DiscoverItem
                onPressIcon={() => onPressPlus(item)}
                item={item}
                style={{marginTop: 10}}
                selectedNutrion={selectedNutrion}
              />
            );
          }}
          onEndReached={moreEndReach}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isloaderMore ? (
              <View
                style={{
                  height: 50,
                  paddingBottom: 30,
                  justifyContent: 'center',
                }}>
                <Text
                  size={Fonts.size.xxxSmall}
                  type={Fonts.type.base}
                  color={Colors.text.blueGray}
                  style={{textAlign: 'center'}}>
                  Loading...
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={title} />
      {/* {renderSearchBar()} */}
      {renderItemsList()}
    </View>
  );
}
