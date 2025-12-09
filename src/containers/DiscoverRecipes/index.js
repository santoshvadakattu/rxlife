import {
  ActivityIndicator,
  SectionList,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Button, CustomHeaderNutrition, Text, TextInput} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {FlatList} from 'react-native-gesture-handler';
import DiscoverItem from '../../components/DiscoverItem';
import {useNavigation} from '@react-navigation/native';
import {title} from 'process';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFoodsRequest} from '../../redux/slicers/nutritions';
import util from '../../util';

export default function DiscoverRecipes({route}) {
  const {getFoodsForDailyNutrition, selectedNutrion} = route.params;
  const [searchValue, setSearchValue] = useState('');
  const {AllFoodsData, AllFoodsDataSearch} = useSelector(
    (state) => state.nutritions,
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    dispatch(
      getAllFoodsRequest({
        payloadData: {
          query: `limit=${100}&offset=${page}`,
        },
        responseCallback: (status, response) => {
          const sections = response.reduce((acc, item) => {
            const category = item.foodCategory;
            const section = acc.find((sec) => sec.title === category);

            if (section) {
              section.data.push(item);
            } else {
              acc.push({
                title: category,
                data: [item],
              });
            }

            return acc;
          }, []);
          setData(sections);
          setLoading(false);
          setLoader(false);
        },
      }),
    );
  }, []);

  const renderFooter = () => {
    if (loading) {
      return (
        <ActivityIndicator size="small" color={Colors.background.primary} />
      );
    } else {
      return (
        <View>
          <Button
            style={{width: '95%'}}
            title="Load More"
            onPress={loadMoreData}
          />
        </View>
      );
    }
  };

  const fetchMoreData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(
          getAllFoodsRequest({
            payloadData: {
              query: `limit=${100}&offset=${page}`,
            },
            responseCallback: (status, response) => {
              if (status) {
                const sections = response.reduce((acc, item) => {
                  const category = item.foodCategory;
                  const section = acc.find((sec) => sec.title === category);

                  if (section) {
                    section.data.push(item);
                  } else {
                    acc.push({
                      title: category,
                      data: [item],
                    });
                  }

                  return acc;
                }, []);
                resolve(sections);
              }
              setLoading(false);
            },
          }),
        );
      }, 2000);
    });
  };

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true);
    const newData = await fetchMoreData();
    const mergeArr = util.mergeArraysDiscoverRecipe(data, newData);
    setData(mergeArr);
    setLoading(false);
    setPage((prevPage) => prevPage + 1);
  };

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

  function onPressPlus(item) {
    getFoodsForDailyNutrition(item, 'allFood', selectedNutrion);
    navigation.pop(2);
  }

  const renderHorizontalItem = ({item}) => (
    <View style={styles.horizontalItem}>
      <DiscoverItem
        item={item}
        onPressIcon={() => onPressPlus(item)}
        selectedNutrion={selectedNutrion}
      />
    </View>
  );

  const renderItem = (item) => {
    if (item?.item?.length > 1) {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 20,
              marginTop: 10,
            }}>
            <Text size={14} type={Fonts.type.base} style={{fontsWeight: '600'}}>
              {item.section.title}
            </Text>

            {item?.item?.length >= 2 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('discoverRecipesDetails', {
                    title: item.section.title,
                    getFoodsForDailyNutrition,
                    selectedNutrion: selectedNutrion,
                  });
                }}>
                <Text
                  size={12}
                  color={Colors.background.primary}
                  type={Fonts.type.base}
                  style={{fontsWeight: '500'}}>
                  View All
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            horizontal
            data={item.item}
            style={{marginTop: 15}}
            renderItem={(item) => {
              if (item.index < 3) {
                return renderHorizontalItem(item);
              } else {
                return null;
              }
              // renderHorizontalItem(item);
            }}
            keyExtractor={(item, index) => item + index}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <CustomHeaderNutrition title="Discover Recipes" />

        {/* {renderSearchBar()} */}
      </View>
      <View style={{paddingLeft: 20, flex: 1, paddingBottom: 20}}>
        {!loader ? (
          !util.isArrayEmpty(data) && (
            <View style={{flex: 1}}>
              <SectionList
                sections={data?.map((section) => ({
                  title: section.title,
                  data: [section.data],
                }))}
                keyExtractor={(item, index) => item + index}
                style={{marginTop: 15}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
              />
              {/* {renderFooter()} */}
            </View>
          )
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="small" color={Colors.background.primary} />
          </View>
        )}
      </View>
    </View>
  );
}
