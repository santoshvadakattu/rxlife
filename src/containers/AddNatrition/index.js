import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  EmptyList,
  ModalCancel,
  NutritionListItem,
  SearchBar,
  Text,
  TextInput,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  createMyMealRequest,
  deleteMyFoodItemByIdRequest,
  getAllFoodSearchRequest,
  getAllFoodsRequest,
  getMealDetailsByIdRequest,
  getMyFoodRequest,
  getMyMealDataRequest,
  getMyMealSearchRequest,
  getMyRecipeSearchRequest,
  getRecipeDetailsByIdRequest,
  getRecipesListRequest,
  getSearchMyFoodRequest,
} from '../../redux/slicers/nutritions';
import util from '../../util';
import { fetchNutritionData } from '../../services/ninjaApi'; // Ensure fetchNutritionData is imported correctly

export default function AddNatrition({route}) {
  let limit = 10;
  const {
    selectedNutrion,
    addFoodInList,
    formCreateMeal,
    getFoodsForDailyNutrition,
  } = route.params || {};
  const [searchValue, setSearchValue] = useState(() => '');
  const [nutritionHeader, setNritionHeader] = useState(() => 'All');
  const [headerName, setHeaderName] = useState('Food');
  const [offsetAll, setOffsetAll] = useState(() => 0);
  const [isLoader, setIsLoader] = useState(() => false);
  const [isloaderMore, setIsLoaderMore] = useState(() => false);
  const [isloaderSearch, setIsLoaderSearch] = useState(() => false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isLoaderCopyMeal, setIsLoaderCopyMeal] = useState(false);
  const [itemIdForDelete, setItemIdForDelete] = useState(null);
  const [allFoodsDataSearch, setAllFoodsDataSearch] = useState([]); // Define state for search results
  const {
    AllFoodsData,
    AllFoodsDataSearch,
    MyFoodData,
    MyFoodsDataSearch,
    MyMealData,
    MyRecipeList,
    MyMealSearchData,
    MyRecipeSearchData,
  } = useSelector((state) => state.nutritions);
  const {userData} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigation();
  const searchRef = useRef(null);

  useEffect(() => {
    // setIsLoader(true);
    // dispatch(
    //   getAllFoodsRequest({
    //     payloadData: {
    //       query: `limit=${limit}&offset=${offsetAll}`,
    //     },
    //     responseCallback: () => {
    //       setIsLoader(false);
    //     },
    //   }),
    // );
    const payload = {
      userId: userData.id,
    };
    // dispatch(
    //   getMyFoodRequest({
    //     payloadData: payload,
    //     responseCallback: () => {},
    //   }),
    // );
    // dispatch(
    //   getMyMealDataRequest({
    //     payloadData: payload,
    //     responseCallback: () => {},
    //   }),
    // );
    // dispatch(
    //   getRecipesListRequest({
    //     payloadData: payload,
    //     responseCallback: () => {},
    //   }),
    // );
  }, []);

  function handlerSearch(text) {
    setSearchValue(text);
    setIsLoaderSearch(true);

    if (nutritionHeader == 'All') {
      fetchNutritionData(text.toLowerCase())
        .then((data) => {
          console.log('Fetched data from Ninja API:', data); // Debugging log for API response
          if (!Array.isArray(data)) {
            console.error('Expected an array but received:', data); // Log unexpected data structure
          }
          setAllFoodsDataSearch(data); // Assuming `setAllFoodsDataSearch` updates the list view
          setIsLoaderSearch(false);
        })
        .catch((error) => {
          console.error('Error fetching data from Ninja API:', error);
          setIsLoaderSearch(false);
        });
    }

    if (nutritionHeader == 'My Foods') {
      dispatch(
        getSearchMyFoodRequest({
          payloadData: {
            userId: userData.id,
            query: `limit=${200}&offset=${offsetAll}&search=${text.toLowerCase()}`,
          },
          responseCallback: () => {
            setIsLoaderSearch(false);
          },
        }),
      );
    }

    if (nutritionHeader == 'My Meals') {
      dispatch(
        getMyMealSearchRequest({
          payloadData: {
            userId: userData.id,
            query: `limit=${200}&offset=${offsetAll}&search=${text.toLowerCase()}`,
          },
          responseCallback: () => {
            setIsLoaderSearch(false);
          },
        }),
      );
    }

    if (nutritionHeader == 'My Recipes') {
      dispatch(
        getMyRecipeSearchRequest({
          payloadData: {
            userId: userData.id,
            query: `limit=${200}&offset=${offsetAll}&search=${text.toLowerCase()}`,
          },
          responseCallback: () => {
            setIsLoaderSearch(false);
          },
        }),
      );
    }
  }

  function handleDeleteMyQucikFood() {
    dispatch(
      deleteMyFoodItemByIdRequest({
        payloadData: {
          Id: itemIdForDelete,
        },
        responseCallback: (status, response) => {
          setIsDeleteVisible(false);
        },
      }),
    );
  }

  function moreEndReach() {
    let offset = limit * offsetAll - limit;
    setIsLoaderMore(true);
    dispatch(
      getAllFoodsRequest({
        payloadData: {
          query: `limit=${limit}&offset=${offset}`,
        },
        responseCallback: (status) => {
          console.log({status});
          setOffsetAll(offsetAll + 1);
          setIsLoaderMore(false);
        },
      }),
    );
  }

  function addBtn() {
    if (nutritionHeader == 'All') {
      navigate.navigate('createFood');
    }
    if (nutritionHeader == 'My Meals') {
      navigate.navigate('createMeal');
    }
    if (nutritionHeader == 'My Recipes') {
      navigate.navigate('newRecipe');
    }
    if (nutritionHeader == 'My Foods') {
      navigate.navigate('createFood');
    }
  }

  function addFoodInListHandler(item, fromListName) {
    if (addFoodInList) {
      addFoodInList(item, fromListName);
    }
  }

  function createCopyPreviousMeal() {
    setIsLoaderCopyMeal(true);
    dispatch(
      getMealDetailsByIdRequest({
        payloadData: {Id: MyMealData[0]?.id},
        responseCallback: (status, response) => {
          console.log('response', response);

          if (status) {
            const {
              allFoods,
              labelNutrients,
              foodNutrients,
              name,
              directions,
              image,
              shareWith,
            } = response;
            let allFoodIds = [];
            let myFoodIds = [];

            allFoods?.map((item) => {
              if (item.addFromUSDA) {
                allFoodIds.push(item.id);
              } else {
                myFoodIds.push(item.id);
              }
            });
            dispatch(
              createMyMealRequest({
                payloadData: {
                  data: {
                    user: {
                      disconnect: [],
                      connect: [
                        {
                          id: userData?.id,
                        },
                      ],
                    },
                    name: name,
                    directions: directions,
                    image: image?.id,
                    share: shareWith,
                    all_foods: {
                      connect: allFoodIds,
                    },
                    my_foods: {
                      connect: myFoodIds,
                    },
                    isCopyMeal: true,
                    labelNutrients: labelNutrients,
                    foodNutrients: foodNutrients,
                  },
                },
                responseCallback: (status) => {
                  setIsLoaderCopyMeal(false);
                },
              }),
            );
          }
        },
      }),
    );
    util.topAlert('Meal copied successfully');
  }

  function loadMoreDataSearch() {
    let offset = limit * offsetAll - limit;
    setIsLoaderMore(true);
    if (nutritionHeader == 'All') {
      dispatch(
        getAllFoodSearchRequest({
          payloadData: {
            query: `search=${searchValue.toLowerCase()}`,
          },
          responseCallback: () => {
            setOffsetAll(offsetAll + 1);
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
          placeholder={`Search for ${
            nutritionHeader == 'All' ? 'Food' : nutritionHeader
          }`}
          ref={searchRef}
          value={searchValue}
          onChangeText={(text) => {
            handlerSearch(text);
          }}
          maxLength={255}
          placeholderTextColor={Colors.placeHolderColor}
          leftIconStyle={{height: 20, width: 20}}
          leftIconWrapperStyle={{top: 22}}
        />
        {!util.isEmptyValue(searchValue) && (
          <View style={{position: 'absolute', right: 10, top: 30}}>
            {isloaderSearch ? (
              <ActivityIndicator color={'black'} />
            ) : (
              <TouchableOpacity onPress={() => setSearchValue('')}>
                <Image source={Images.crossGoalIcon} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderAddBtn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          size={12}
          color={'#36405B'}
          type={Fonts.type.bold}
          style={{fontWeight: '500', lineHeight: 18}}>
          {nutritionHeader}
        </Text>
        <TouchableOpacity
          style={{
            marginRight: 5,
            width: 40,
            height: 20,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onPress={addBtn}>
          {/* <Image source={Images.NutritionPlus} /> */}
        </TouchableOpacity>
      </View>
    );
  };

  const renderNutritionHeader = () => {
    return (
      <View style={styles.nutritionHeader}>
        <FlatList
          data={['All', 'My Meals', 'My Recipes', 'My Foods']}
          horizontal
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
          renderItem={({item}) => {
            return (
              <ButtonView
                onPress={() => {
                  setNritionHeader(item);
                }}
                style={[
                  {paddingHorizontal: 5},
                  nutritionHeader == item && styles.btnNutritionItem,
                ]}>
                <Text
                  size={Fonts.size.xxxSmall}
                  type={Fonts.type.base}
                  color={
                    nutritionHeader == item
                      ? Colors.background.primary
                      : Colors.text.blueGray
                  }
                  style={{fontWeight: '500'}}>
                  {item}
                </Text>
              </ButtonView>
            );
          }}
        />
      </View>
    );
  };

  const renderNutritionListAll = () => {
    return (
      <View style={{flex: 1}}>
        <Text
          size={12}
          color={'#36405B'}
          type={Fonts.type.bold}
          style={{fontWeight: '500', lineHeight: 18, marginVertical: 15}}>
          Suggestions
        </Text>
        {isLoader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={'black'} />
          </View>
        ) : (
          <FlatList
            data={
              util.isEmptyValue(searchValue) ? AllFoodsData : allFoodsDataSearch
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => {
              let calories = 0;

              // Check if the response contains valid numeric values for fat, carbohydrates, and protein
              if (item.fat_total_g && typeof item.fat_total_g === 'number') {
                calories += item.fat_total_g * 9;
              }
              if (item.carbohydrates_total_g && typeof item.carbohydrates_total_g === 'number') {
                calories += item.carbohydrates_total_g * 4;
              }
              if (item.protein_g && typeof item.protein_g === 'number') {
                calories += item.protein_g * 4;
              }
              return (
                <NutritionListItem
                  isAdd={true}
                  name={item.name}
                  des={item.description}
                  Kcal={calories +'Kcal'}
                  onPress={() =>
                    navigate.navigate('foodDetails', {
                      item,
                      getFoodsForDailyNutrition: getFoodsForDailyNutrition,
                      addFoodInList: addFoodInList,
                      addForm: 'allFood',
                      selectedmeal: selectedNutrion,
                    })
                  }
                  onPressIcon={() => {
                    if (formCreateMeal) {
                      addFoodInListHandler(item, 'allFood');
                    } else {
                      getFoodsForDailyNutrition(
                        item,
                        'allFood',
                        selectedNutrion,
                      );
                      navigate.goBack();
                    }
                  }}
                  addFromUSDA={item.addFromUSDA}
                  fdcId={item.fdcId}
                  iconImageSource={Images.NutritionPlus}
                />
              );
            }}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            ListEmptyComponent={() => {
              console.log('FlatList is empty'); // Debugging log for empty list
              return <EmptyList />;
            }}
            onEndReached={() =>
              !util.isEmptyValue(searchValue)
                ? loadMoreDataSearch()
                : moreEndReach()
            }
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
        )}
      </View>
    );
  };

  const renderNutritionListMeals = () => {
    return (
      <View style={{flex: 1}}>
        {renderAddBtn()}
        {isLoader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={'black'} />
          </View>
        ) : (
          <FlatList
            data={
              util.isEmptyValue(searchValue) ? MyMealData : MyMealSearchData
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => {
                              console.log('Nutrient item:', item); // Debugging log for each nutrient

              let calories = 0;
              let fat = 0;
              let carbs = 0;
              let protein = 0;
              item?.labelNutrients?.map((item) => {
                if (item.name.toLowerCase() === 'fat_total_g') {
                  calories += item.value * 9;
                  fat = item.value;
                }
                if (item.name.toLowerCase() === 'carbohydrates_total_g') {
                  calories += item.value * 4;
                  carbs = item.value;
                }
                if (item.name.toLowerCase() === 'protein') {
                  calories += item.value * 4;
                  protein = item.value;
                }
              });
              return (
                <NutritionListItem
                  isAdd={true}
                  name={item.isCopyMeal ? `Copy Meal ${item.name}` : item.name}
                  des={`Carbs ${carbs}g, Fat ${fat}g, Protein ${protein}g`}
                  onPress={() => {
                    navigate.navigate('mealDetails', {
                      item,
                      getFoodsForDailyNutrition: getFoodsForDailyNutrition,
                      addForm: 'myMeals',
                      selectedNutrion: selectedNutrion,
                    });
                  }}
                  onPressIcon={() => {
                    dispatch(
                      getMealDetailsByIdRequest({
                        payloadData: {Id: item?.id},
                        responseCallback: (status, response) => {
                          if (status) {
                            if (formCreateMeal) {
                              addFoodInListHandler(
                                response.mealsFoods,
                                'myMeals',
                              );
                            } else {
                              getFoodsForDailyNutrition(
                                response.mealsFoods,
                                'myMeals',
                                selectedNutrion,
                              );
                              navigate.goBack();
                            }
                          }
                        },
                      }),
                    );
                  }}
                  iconImageSource={Images.NutritionPlus}
                  imageUrl={item?.image?.url}
                />
              );
            }}
            ListEmptyComponent={() => {
              return <EmptyList />;
            }}
          />
        )}
        {!formCreateMeal && util.isEmptyValue(searchValue) && (
          <Button
            title="Copy Previous Meal"
            disabled={MyMealData.length == 0}
            isLoading={isLoaderCopyMeal}
            onPress={() => {
              createCopyPreviousMeal();
            }}
            style={styles.btnStyle}
          />
        )}
      </View>
    );
  };

  // Add this helper label render function
const renderHelperLabel = () => {
  return (
    <View style={{paddingHorizontal: 15, marginTop: 6, marginBottom: 6}}>
      <Text
        size={11}
        type={Fonts.type.base}
        color={Colors.text.blueGray}
        style={{fontWeight: '400', lineHeight: 16}}>
        Ex: 1lb Chicken
      </Text>
    </View>
  );
};

  const renderNutritionListRecipes = () => {
    return (
      <View style={{flex: 1}}>
        {renderAddBtn()}
        {isLoader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={'black'} />
          </View>
        ) : (
          <FlatList
            data={
              util.isEmptyValue(searchValue) ? MyRecipeList : MyRecipeSearchData
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => {
              let fat = 0;
              let carbs = 0;
              let protein = 0;
              item?.labelNutrients?.map((item) => {
                if (item.name.toLowerCase() === 'fat') {
                  fat = item.value;
                }
                if (item.name.toLowerCase() === 'carbohydrates') {
                  carbs = item.value;
                }
                if (item.name.toLowerCase() === 'protein') {
                  protein = item.value;
                }
              });
              return (
                <NutritionListItem
                  isAdd={true}
                  name={item?.name}
                  des={`Carbs ${carbs}g, Fat ${fat}g, Protein ${protein}g`}
                  onPress={() =>
                    navigate.navigate(SCREENS.NUTRITION.recipeDetails, {
                      id: item?.id,
                      getFoodsForDailyNutrition: getFoodsForDailyNutrition,
                      addForm: 'myRecipes',
                      selectedNutrion: selectedNutrion,
                    })
                  }
                  onPressIcon={() => {
                    dispatch(
                      getRecipeDetailsByIdRequest({
                        payloadData: {Id: item?.id},
                        responseCallback: (status, response) => {
                          if (status) {
                            if (formCreateMeal) {
                              addFoodInListHandler(
                                response?.ingredients,
                                'myRecipes',
                              );
                            } else {
                              getFoodsForDailyNutrition(
                                response?.ingredients,
                                'myRecipes',
                                selectedNutrion,
                              );
                              navigate.goBack();
                            }
                          }
                        },
                      }),
                    );
                  }}
                  imageUrl={item?.image?.url}
                  iconImageSource={Images.NutritionPlus}
                />
              );
            }}
            ListEmptyComponent={() => {
              return <EmptyList />;
            }}
          />
        )}
        {!formCreateMeal && (
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Button
              title="Discover Recipes"
              onPress={() => {
                navigate.navigate('discoverRecipes', {
                  getFoodsForDailyNutrition: getFoodsForDailyNutrition,
                  selectedNutrion: selectedNutrion,
                });
              }}
              style={[styles.btnStyle, {}]}
            />
          </View>
        )}
      </View>
    );
  };

  const renderNutritionListFood = () => {
    return (
      <View style={{flex: 1}}>
        {renderAddBtn()}
        <FlatList
          data={util.isEmptyValue(searchValue) ? MyFoodData : MyFoodsDataSearch}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item}) => {
            let calories = 0;
            item?.labelNutrients?.map((item) => {
              if (item.name.toLowerCase() === 'fat') {
                calories += item.value * 9;
              }
              if (item.name.toLowerCase() === 'carbohydrates') {
                calories += item.value * 4;
              }
              if (item.name.toLowerCase() === 'protein') {
                calories += item.value * 4;
              }
            });
            return (
              <NutritionListItem
                name={item.name}
                des={item.description}
                Kcal={calories ? calories : item.Kcal + ' Kcal'}
                onPress={() =>
                  navigate.navigate('foodDetails', {
                    item,
                    getFoodsForDailyNutrition: getFoodsForDailyNutrition,
                    addFoodInList: addFoodInList,
                    addForm: 'myFood',
                    selectedmeal: selectedNutrion,
                  })
                }
                onPressIcon={() => {
                  if (formCreateMeal) {
                    addFoodInListHandler(item, 'myFood');
                  } else {
                    getFoodsForDailyNutrition(item, 'myFood', selectedNutrion);
                    navigate.goBack();
                  }
                }}
                addFromUSDA={item.addFromUSDA}
                fdcId={item.fdcId}
                iconImageSource={Images.NutritionPlus}
                imageUrl={item?.image?.url}
                isAddQuick={item.isQuickAdded}
                onPressDelete={() => {
                  setIsDeleteVisible(true);
                  setItemIdForDelete(item.id);
                }}
                onPressEdit={() => {
                  navigate.navigate(SCREENS.NUTRITION.quickAddMeal, {
                    isEdit: true,
                    item: item,
                  });
                }}
              />
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyList />;
          }}
        />
        <Button
          title="Quick Add"
          onPress={() => {
            navigate.navigate('quickAddMeal');
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingHorizontal: 20,
      }}>
      <CustomHeaderNutrition title={`Add ${selectedNutrion}`} />
      {renderSearchBar()}
      {renderHelperLabel()}
      {renderNutritionHeader()}
      {nutritionHeader == 'All' && renderNutritionListAll()}
      {nutritionHeader == 'My Meals' && renderNutritionListMeals()}
      {nutritionHeader == 'My Recipes' && renderNutritionListRecipes()}
      {nutritionHeader == 'My Foods' && renderNutritionListFood()}
      {isDeleteVisible && (
        <ModalCancel
          title="Are you sure you want to delete?"
          actionTitle={'Delete'}
          isVisible={isDeleteVisible}
          setVisible={setIsDeleteVisible}
          setIsActive={handleDeleteMyQucikFood}
        />
      )}
    </View>
  );
}
