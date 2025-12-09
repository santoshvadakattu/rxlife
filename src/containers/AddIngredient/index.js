import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  SeperaterView,
  Text,
  TextInput,
} from '../../components';
import {AppStyles, Colors, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import util from '../../util';
import {strings} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllFoodSearchRequest,
  getIngredientsListRequest,
} from '../../redux/slicers/nutritions';

export default function AddIngredient({route}) {
  let limit = 10;
  const {isEdit, addNewIngredient} = route.params || {};
  const [searchValue, setSearchValue] = useState('');
  const [searchValueError, setSearchValueError] = useState('');
  const [data, setData] = useState([]);
  const [isLoaderSearch, setIsLoaderSearch] = useState(false);
  const {IngredientList} = useSelector((state) => state.nutritions);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const {AllFoodsDataSearch} = useSelector((state) => state.nutritions);

  function handlerSearch(text) {
    setSearchValue(text);
    setIsLoaderSearch(true);

    dispatch(
      getAllFoodSearchRequest({
        payloadData: {
          query: `limit=${200}&offset=${0}&search=${text.toLowerCase()}`,
        },
        responseCallback: (status, response) => {
          setData(response);
          if (status) {
          }
          setIsLoaderSearch(false);
        },
      }),
    );
  }

  const renderSearchBar = () => {
    return (
      <View style={{height: 70}}>
        <TextInput
          leftIcon={Images.Search}
          placeholder={'Search Ingredient'}
          value={searchValue}
          onChangeText={(value) => {
            handlerSearch(value);
          }}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
          error={searchValueError}
        />
        {isLoaderSearch && (
          <View style={styles.loaderView}>
            <ActivityIndicator size="small" color={Colors.background.primary} />
          </View>
        )}
      </View>
    );
  };

  const renderIngredientList = () => {
    return (
      <View style={styles.IngredientView}>
        <FlatList
          data={data}
          style={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, flexGrow: 1}}
          renderItem={({item}) => {
            return (
              <View style={{marginTop: 15, justifyContent: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 0.8,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        addNewIngredient(item);
                        navigate.goBack();
                      }}
                      style={{
                        width: 30,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image source={Images.NutritionPlus} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigate.navigate('foodDetails', {
                          item,
                          isFromNutrition: true,
                        });
                      }}>
                      <Text
                        size={12}
                        color={Colors.black}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontWeight: '500',
                          lineHeight: 18,
                          marginLeft: 5,
                        }}>
                        {item.name || ''}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      size={12}
                      color={Colors.black}
                      style={{fontWeight: '500', lineHeight: 18}}>
                      {item.servingSize
                        ? `${item.servingSize} ${item.servingSizeUnit}`
                        : ''}{' '}
                      | {item.Kcal ? `${item.Kcal} Kcal` : ''}
                    </Text>
                  </View>
                </View>
                <SeperaterView />
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text size={14}>Please Seach Ingredient</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title={'Save'}
          onPress={() => {
            navigate.goBack();
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition
        title={isEdit ? 'Edit Ingredient' : 'Add Ingredient'}
      />
      {renderSearchBar()}
      {renderIngredientList()}
      {/* {rerderSaveBtn()} */}
    </View>
  );
}
