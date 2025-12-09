import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleSelectImagePress} from '../../Helper/handleSelectImagePress';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  ModalCancel,
  NutritionGraph,
  NutritionInputText,
  NutritionListItem,
  SeperaterView,
  Text,
} from '../../components';
import {SCREENS, strings} from '../../constants';
import {
  createMyMealRequest,
  deleteMyFoodRequest,
  getAllFoodItemByIdRequest,
  getMealDetailsByIdRequest,
  getMyFoodItemByIdRequest,
  updateMealItemByIdRequest,
} from '../../redux/slicers/nutritions';
import {uploadMediaRequest} from '../../redux/slicers/user';
import {Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

export default function CreateMeal({route}) {
  const {id, isEdit} = route.params || {};

  const [openDropDown, setOpenDropDown] = useState(false);
  const [shareWith, setShareWith] = useState('Public');
  const [image, setImage] = useState({});

  const navigate = useNavigation();
  const [meal, setMeal] = useState('');
  const [mealError, setMealError] = useState('');
  const [addFoodsArr, setAddFoodsArr] = useState([]);
  const [removeFoodArr, setRemoveFoodArr] = useState([]);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [directions, setDirections] = useState('');
  const dispatch = useDispatch();

  const {userData} = useSelector((state) => state.user);

  useEffect(() => {
    if (isEdit) {
      dispatch(
        getMealDetailsByIdRequest({
          payloadData: {
            Id: id,
          },
          responseCallback: (status, MealDetails) => {
            if (status) {
              setMeal(MealDetails?.name);
              setDirections(MealDetails?.directions);

              setShareWith(MealDetails?.share ? MealDetails?.share : 'Public');
              setImage({
                path: MealDetails?.image?.url,
                id: MealDetails?.image?.id,
                isEdit: true,
              });

              setAddFoodsArr(MealDetails?.mealsFoods);
            }
          },
        }),
      );
    }
  }, []);

  function addDirection(vale) {
    setDirections(vale);
  }

  function onChangeMeal(value) {
    setMeal(value);
    setMealError('');
  }

  function getImage(img) {
    setImage(img);
  }

  function validation() {
    let isValid = true;
    if (util.isEmptyValue(meal)) {
      setMealError(strings.REQUIRED_FIELD);

      isValid = false;
    } else if (util.isEmptyValue(directions)) {
      util.topAlertError('Please add directions');
      isValid = false;
    }
    if (util.isArrayEmpty(addFoodsArr)) {
      util.topAlertError('Please add food to create meal');
      isValid = false;
    }
    Keyboard.dismiss();
    return isValid;
  }

  function handleDelete() {
    let tempArr = [...addFoodsArr];
    tempArr = tempArr?.filter((item) => item != selectedValue);
    setAddFoodsArr(tempArr);
  }

  function createMealDataApi(image) {
    if (!util.isArrayEmpty(addFoodsArr)) {
      let allFoodIds = [];
      let myFoodIds = [];
      let tempAllFoodArr = [];
      addFoodsArr?.map((item) => {
        if (item.addFromUSDA) {
          allFoodIds.push(item.id);
          let obj = {
            all_food: {
              connect: [item.id],
            },
            my_food: {
              connect: [],
            },
          };
          tempAllFoodArr.push(obj);
        } else {
          myFoodIds.push(item.id);
          let obj = {
            all_food: {
              connect: [],
            },
            my_food: {
              connect: [item.id],
            },
          };
          tempAllFoodArr.push(obj);
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
              name: meal,
              directions: directions,
              image: image,
              share: shareWith,
              all_foods: {
                connect: allFoodIds,
              },
              my_foods: {
                connect: myFoodIds,
              },
              mealsFoods: tempAllFoodArr,
              labelNutrients: util.getlabelNutrientsFromMyMealFood(addFoodsArr),
              foodNutrients: util.getfoodNutrientsFromMyMealFood(addFoodsArr),
            },
          },
          responseCallback: (status) => {
            setIsLoading(false);
            if (status) {
              navigate.goBack();
              dispatch(deleteMyFoodRequest([]));
            }
          },
        }),
      );
      util.topAlert('Meal created successfully');
    } else {
      setIsLoading(false);
      util.topAlertError('Please add food to create meal');
    }
  }

  function updateMealDataApi(image) {
    let allFoodIds = [];
    let myFoodIds = [];

    let allFoodIdsRemove = [];
    let myFoodIdsRemove = [];
    let tempAllFoodArr = [];
    addFoodsArr?.map((item) => {
      if (item.addFromUSDA) {
        allFoodIds.push(item.id);
        let obj = {
          all_food: {
            connect: [item.id],
          },
          my_food: {
            connect: [],
          },
        };
        tempAllFoodArr.push(obj);
      } else {
        myFoodIds.push(item.id);
        let obj = {
          all_food: {
            connect: [],
          },
          my_food: {
            connect: [item.id],
          },
        };
        tempAllFoodArr.push(obj);
      }
    });
    removeFoodArr?.map((item) => {
      if (item.addFromUSDA) {
        allFoodIdsRemove.push(item.id);
      } else {
        myFoodIdsRemove.push(item.id);
      }
    });

    dispatch(
      updateMealItemByIdRequest({
        payloadData: {
          Id: id,
          data: {
            id: id,
            user: {
              disconnect: [],
              connect: [
                {
                  id: userData?.id,
                },
              ],
            },
            name: meal,
            directions: directions,
            image: image,
            share: shareWith,
            all_foods: {
              connect: allFoodIds,
              disconnect: allFoodIdsRemove,
            },
            my_foods: {
              connect: myFoodIds,
              disconnect: myFoodIdsRemove,
            },
            mealsFoods: tempAllFoodArr,
            // labelNutrients: util.getlabelNutrientsFromMyMealFood(addFoodsArr),
            // foodNutrients: util.getfoodNutrientsFromMyMealFood(addFoodsArr),
          },
        },
        responseCallback: (status, response) => {
          setIsLoading(false);
          if (status) {
            navigate.pop(2);
            dispatch(deleteMyFoodRequest([]));
          }
        },
      }),
    );
    util.topAlert('Meal updated successfully');
  }

  function SaveBtn() {
    if (validation()) {
      setIsLoading(true);
      if (image.isEdit) {
        updateMealDataApi(image.id);
        return;
      }
      if (Object.keys(image).length > 0) {
        const path = image.path;
        const data = new FormData();
        data.append('files', {
          type: image?.mime,
          name: `filename.${image?.mime}`,
          uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
        });
        dispatch(
          uploadMediaRequest({
            payloadData: data,
            responseCallback: (status, uploadedFile) => {
              if (status) {
                isEdit
                  ? updateMealDataApi(uploadedFile[0]?.id)
                  : createMealDataApi(uploadedFile[0]?.id);
              }
            },
          }),
        );
      } else {
        isEdit ? updateMealDataApi(null) : createMealDataApi(null);
      }
    }
  }

  async function addFoodInList(objectFood, listName) {
    if (listName == 'allFood') {
      let tempArr = [...addFoodsArr];
      let tempObj = {
        ...objectFood,
      };
      tempObj['tempId'] = Number(tempArr.length) + 1;
      tempArr.unshift(tempObj);
      setAddFoodsArr(tempArr);
      util.topAlert('Food added successfully');
      navigate.goBack();
    }
    if (listName == 'myFood') {
      let tempArr1 = util.cloneDeepArray(addFoodsArr);
      let tempObj = {
        ...objectFood,
      };
      tempObj.tempId = Number(tempArr1.length) + 1;
      tempArr1.unshift(tempObj);
      console.log('objectFood', objectFood, tempArr1);
      setAddFoodsArr(tempArr1);
      util.topAlert('Food added successfully');
      navigate.goBack();
    }
    if (listName == 'myMeals') {
      getMealFoodDetails(objectFood);
      util.topAlert('Meal Foods added successfully');
    }
    if (listName == 'myRecipes') {
      getMealFoodDetails(objectFood);
      util.topAlert('Recipes Foods added successfully');
    }
  }

  async function getMealFoodDetails(array) {
    let tempArr = [...addFoodsArr];

    for (let i = 0; i < array.length; i++) {
      if (array[i].addFromUSDA) {
        await dispatch(
          getAllFoodItemByIdRequest({
            payloadData: {
              Id: array[i].id,
            },
            responseCallback: (status, response) => {
              if (status) {
                tempArr.unshift(response);
              }
            },
          }),
        );
      } else {
        await dispatch(
          getMyFoodItemByIdRequest({
            payloadData: {
              Id: array[i].id,
            },
            responseCallback: (status, response) => {
              if (status) {
                tempArr.unshift(response);
              }
            },
          }),
        );
      }
    }

    setAddFoodsArr(tempArr);
    navigate.goBack();
  }

  const renderImagePicker = () => {
    return (
      <>
        {image?.path ? (
          <View>
            <Image
              source={{uri: image.path}}
              resizeMode="cover"
              style={styles.imageView}
            />
            <TouchableOpacity
              onPress={() => setImage({})}
              style={styles.imgViewCross}>
              <Image
                style={{width: 12, height: 12}}
                source={Images.crossImage}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleSelectImagePress(getImage)}
            style={styles.pickImage}>
            <Image source={Images.ImagePicker} />
            <Text
              style={{
                color: '#61D85E',
                fontSize: 12,
                marginTop: 6,
                fontWeight: '500',
                lineHeight: 18,
              }}>
              Upload Photo
            </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderShareWith = () => {
    return (
      <View style={styles.shareWithView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500', lineHeight: 18}}>
            Share With
          </Text>
          <ButtonView
            onPress={() => setOpenDropDown(!openDropDown)}
            style={styles.publicView}>
            <Text
              size={12}
              type={Fonts.type.base}
              style={{fontWeight: '500', lineHeight: 18}}
              color={Colors.black}>
              {shareWith}
            </Text>
            <Image
              style={{
                width: 7,
                height: 12,
                transform: [{rotate: openDropDown ? '90deg' : '270deg'}],
              }}
              source={Images.LeftArrow}
            />
          </ButtonView>
        </View>
        {renderSeparator()}
        {renderGraph()}
        {openDropDown && (
          <View style={styles.dropDrowView}>
            <FlatList
              data={['Public', 'Private']}
              renderItem={({item}) => {
                return (
                  <ButtonView
                    onPress={() => {
                      setOpenDropDown(false);
                      setShareWith(item);
                    }}
                    style={{padding: 10}}>
                    <Text
                      size={12}
                      color={Colors.black}
                      style={{fontWeight: '400'}}>
                      {item}
                    </Text>
                    <SeperaterView />
                  </ButtonView>
                );
              }}
            />
          </View>
        )}
      </View>
    );
  };

  const renderGraph = () => {
    let totalNutrients = util.getlabelNutrientsFromMyMealFood(addFoodsArr);
    return <NutritionGraph labelNutrients={totalNutrients} />;
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderDirection = () => {
    return (
      <View style={styles.shareWithView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              size={12}
              type={Fonts.type.base}
              style={{fontWeight: '500', lineHeight: 18}}>
              Directions
            </Text>
            <Text
              size={10}
              type={Fonts.type.base}
              color={Colors.text.blueGray}
              style={{fontWeight: '500', lineHeight: 18}}>
              Add instructions for making this meal
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate('addDirections', {
                addDirection,
                directionsValue: directions,
              });
            }}>
            <Text
              size={12}
              type={Fonts.type.base}
              color={Colors.background.primary}
              style={{fontWeight: '500', lineHeight: 18}}>
              {isEdit ? 'Edit' : ' Add'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderSeparator()}
        {directions && (
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500', lineHeight: 21, marginTop: 10}}>
            {directions}
          </Text>
        )}
      </View>
    );
  };

  const renderAddFood = () => {
    return (
      <View style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500', lineHeight: 18}}>
            Add Foods
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate(SCREENS.NUTRITION.myFoodList, {
                selectedNutrion: 'Food',
                addFoodInList: addFoodInList,
                formCreateMeal: true,
              });
            }}>
            <Text
              size={12}
              type={Fonts.type.base}
              color={Colors.background.primary}
              style={{fontWeight: '500', lineHeight: 18}}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={addFoodsArr}
          style={{marginTop: 10}}
          renderItem={({item, index}) => {
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
                isAdd={true}
                onPressIcon={() => {
                  let tempData = addFoodsArr.filter((_, ind) => ind !== index);
                  setAddFoodsArr(tempData);
                  let tempRemoveFoodArr = [...removeFoodArr];
                  tempRemoveFoodArr.push(item);
                  setRemoveFoodArr(tempRemoveFoodArr);
                }}
                iconImageSource={Images.DeleteIcon}
                name={item.name}
                des={item.description}
                Kcal={calories ? calories : item.Kcal + ' Kcal'}
                onPress={() =>
                  navigate.navigate('foodDetails', {
                    item,
                  })
                }
                isAddQuick={item.isQuickAdded}
                imageUrl={item?.image?.url}
              />
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
          title={`${isEdit ? 'Update' : 'Save'}`}
          isLoading={isLoading}
          onPress={() => SaveBtn()}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition
        title={`${isEdit ? 'Update' : 'Create a'}  Meal`}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: 20, flex: 1, marginBottom: 30}}>
        {renderImagePicker()}
        <NutritionInputText
          value={meal}
          onChangeText={(value) =>
            onChangeMeal(value.replace(/[^a-zA-Z\s]/g, ''))
          }
          placeholderText={'Meal Name'}
          error={mealError}
          maxLength={50}
        />
        {renderShareWith()}
        {renderDirection()}
        {renderAddFood()}
        {isDeleteVisible && (
          <ModalCancel
            title="Are you sure you want to delete?"
            actionTitle={'Delete'}
            isVisible={isDeleteVisible}
            setVisible={setIsDeleteVisible}
            setIsActive={handleDelete}
          />
        )}
      </ScrollView>
      {rerderSaveBtn()}
    </View>
  );
}
