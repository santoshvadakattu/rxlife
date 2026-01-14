import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  ButtonView,
  Calenders,
  CarouselListArrow,
  CarouselListDays,
  DatePicker,
  ExerciseItem,
  ExerciseModal,
  ModalCancel,
  NatritionListItem,
  NutritionListItem,
  SeperaterView,
  Text,
  WaterItem,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import util from '../../util';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  createDailyNutritionRequest,
  deleteMyDailyNutritionRequest,
  getDailyNutritionRequest,
  updateDailyNutritionRequest,
} from '../../redux/slicers/nutritions';
import moment from 'moment';

export default function Natrition() {
  //state
  const [nutritionHeader, setNritionHeader] = useState('Breakfast');
  const [showBottomSheet, setShowBottomSheet] = useState(() => false);
  const [showBottomMeal, setShowBottomMeal] = useState(() => false);
  const [showBottomExercise, setShowBottomExercise] = useState(() => false);
  const [isVisibleExercise, setIsVisibleExercise] = useState(() => false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();
  //ref
  const bottomSheetRef = useRef(null);
  const bottomSheetMealRef = useRef(null);
  const bottomSheetExerciseRef = useRef(null);
  const [isloader, setIsLoader] = useState(false);
  //memo
  const snapPoints = useMemo(() => ['33%'], []);
  const snapPointsMeal = useMemo(() => ['33%'], []);
  const snapPointsExercise = useMemo(() => ['25%'], []);
  const WeeksData = util.getCurrentMonthWeeks();
  const {top} = useSafeAreaInsets();
  const {userProfile, userData} = useSelector((state) => state.user);
  const {DailyNutritionData} = useSelector((state) => state.nutritions);
  const {goalCalories} = userProfile || {};
  const dispatch = useDispatch();
  let mealDataAfterFilter = DailyNutritionData?.filter(
    (item) => item?.mealName == nutritionHeader && item?.allData?.length > 0,
  );

  // useEffect
  useEffect(() => {
    apiCall(new Date());
  }, []);

  function apiCall(date) {
    setIsLoader(true);
    dispatch(
      getDailyNutritionRequest({
        payloadData: {
          userId: userData.id,
          date: moment(date).utc(false).format('YYYY-MM-DD'),
        },
        responseCallback: () => {
          setIsLoader(false);
        },
      }),
    );
  }

  //callback
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  //function

  function getFoodsForDailyNutrition(food, name, mealName) {
    if (name == 'allFood') {
      console.log('allFood called', food,mealName);
      createDailyNutritionOnDate(food, mealName);
    }
    if (name == 'myFood') {
      createDailyNutritionOnDate(food, mealName);
    }
    if (name == 'myMeals') {
      food.map((item) => {
        createDailyNutritionOnDate(item, mealName);
      });
    }
    if (name == 'myRecipes') {
      food.map((item) => {
        createDailyNutritionOnDate(item, mealName);
      });
    }
    util.topAlert('Food Logged!');
  }

  function createDailyNutritionOnDate(foodItem, mealName) {
    let allFoodIds = [];
    let myFoodIds = [];
    if (foodItem.addFromUSDA) {
      allFoodIds.push(foodItem.id);
    } else {
      myFoodIds.push(foodItem.id);
    }
    console.log('foodItemfoodItemfoodItem', foodItem);
    const payload = {
      data: {
        user: {
          disconnect: [],
          connect: [
            {
              id: userData?.id,
            },
          ],
        },
        date: new Date(date),
        mealName: mealName,
        all_foods: {
          connect: allFoodIds,
        },
        my_foods: {
          connect: myFoodIds,
        },
      },
    };
    dispatch(
      createDailyNutritionRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          console.log(`resssssss:${response.data}`);
        },
      }),
    );
  }

  function updateDailyNutritionOnDate(
    foodArr,
    mealName,
    id,
    disconnectMyfood = [],
    disconnectAllFood = [],
  ) {
    let allFoodIds = [];
    let myFoodIds = [];
    foodArr?.map((item) => {
      if (item.addFromUSDA) {
        allFoodIds.push(item.id);
      } else {
        myFoodIds.push(item.id);
      }
    });

    const payload = {
      Id: id,
      data: {
        user: {
          disconnect: [],
          connect: [
            {
              id: userData?.id,
            },
          ],
        },
        date: new Date(date),
        mealName: mealName,
        all_foods: {
          connect: allFoodIds,
          disconnect: disconnectAllFood,
        },
        my_foods: {
          connect: myFoodIds,
          disconnect: disconnectMyfood,
        },
      },
    };
    dispatch(
      updateDailyNutritionRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          console.log({response});
        },
      }),
    );
  }

  function removeNutritionFood(foodId, addFromUSDA, mealName, idNutrient) {
    let filterData = DailyNutritionData.filter((item) => item.id == idNutrient);
    let tempArr = filterData[0].allData.filter((item) => item.id != foodId);
    let disconnectMyfood = [];
    let disconnectAllFood = [];
    if (addFromUSDA) {
      disconnectAllFood.push(foodId);
    } else {
      disconnectMyfood.push(foodId);
    }
    updateDailyNutritionOnDate(
      tempArr,
      mealName,
      filterData[0].id,
      disconnectMyfood,
      disconnectAllFood,
    );
  }

  function deleteNutritionFood(nutrientId) {
    dispatch(
      deleteMyDailyNutritionRequest({
        payloadData: {
          Id: nutrientId,
        },
        responseCallback: () => {},
      }),
    );
    util.topAlert('Nutrition Deleted Successfully');
  }

  function addBtn() {
    if (nutritionHeader == 'Breakfast') {

      navigation.navigate('addNatrition', {
        selectedNutrion: nutritionHeader,
        getFoodsForDailyNutrition: getFoodsForDailyNutrition,
      });
    } else if (nutritionHeader == 'Lunch') {
      navigation.navigate('addNatrition', {
        selectedNutrion: nutritionHeader,
        getFoodsForDailyNutrition: getFoodsForDailyNutrition,
      });
    } else if (nutritionHeader == 'Snacks') {
      navigation.navigate('addNatrition', {
        selectedNutrion: nutritionHeader,
        getFoodsForDailyNutrition: getFoodsForDailyNutrition,
      });
    } else if (nutritionHeader == 'Dinner') {
      navigation.navigate('addNatrition', {
        selectedNutrion: nutritionHeader,
        getFoodsForDailyNutrition: getFoodsForDailyNutrition,
      });
    } else if (nutritionHeader == 'Exercise') {
      setShowBottomExercise(true);
    } else if (nutritionHeader == 'Water') {
      navigation.navigate('addWater');
    }
  }

  function getDateFromDatePicker(date) {
    setDate(date);
    apiCall(date);
  }

  //render
  const renderHeader = () => {
    return (
      <View style={[styles.headerContainer, {paddingTop: top + 10}]}>
        <Text
          size={Fonts.size.normal}
          type={Fonts.type.base}
          style={{fontWeight: '600'}}>
          Nutrition
        </Text>
        <View style={styles.headerIconView}>
          <ButtonView
            onPress={() => {
              navigation.navigate('nutritionGraphScreen');
            }}
            style={styles.headerIcon}>
            <Image source={Images.NatritionGraph} />
          </ButtonView>

          <ButtonView
            onPress={() => {
              navigation.navigate('nutritionSettings');
            }}
            style={styles.headerIcon}>
            <Image source={Images.NatritionSetting} />
          </ButtonView>
        </View>
      </View>
    );
  };

  const renderWeek = () => {
    return <CarouselListDays date={date} setDate={getDateFromDatePicker} />;
  };

  const renderCalorieChart = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.background.primary,
          borderRadius: 12,
          marginTop: 15,
          paddingHorizontal: 12,
          paddingVertical: 14,
        }}>
        <Text
          size={Fonts.size.xxxSmall}
          type={Fonts.type.base}
          color={Colors.white}
          style={{fontWeight: '500', lineHeight: 18}}>
          Daily Calories Remaining
        </Text>
        <View style={styles.separator} />
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* Goal */}
          <View>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '400', lineHeight: 15}}>
              Goal
            </Text>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '500', lineHeight: 18}}>
              {goalCalories ? goalCalories?.toFixed(0) : 0}
            </Text>
          </View>
          <View style={{height: 18, backgroundColor: Colors.white, width: 1}} />

          <View>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '400', lineHeight: 15}}>
              Food
            </Text>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '500', lineHeight: 18}}>
              {util.getSumOFKcalfoodNutrients(DailyNutritionData).toFixed(0) ||
                0}
            </Text>
          </View>
          <View style={{height: 18, backgroundColor: Colors.white, width: 1}} />
          <View>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '400', lineHeight: 15}}>
              Exercise
            </Text>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '500', lineHeight: 18}}>
              0
            </Text>
          </View>
          <View style={{height: 18, backgroundColor: Colors.white, width: 1}} />
          <View>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '400', lineHeight: 15}}>
              Remaining
            </Text>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              color={Colors.white}
              style={{fontWeight: '500', lineHeight: 18}}>
              {goalCalories
                ? goalCalories?.toFixed(0) -
                  util.getSumOFKcalfoodNutrients(DailyNutritionData)?.toFixed(0)
                : 0}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderNutritionHeader = () => {
    return (
      <View style={styles.nutritionHeader}>
        <FlatList
          data={['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Exercise', 'Water']}
          horizontal
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
          renderItem={({item}) => {
            return (
              <ButtonView
                onPress={() => setNritionHeader(item)}
                style={[nutritionHeader == item && styles.btnNutritionItem]}>
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

  const renderNutritionCountAndAdd = () => {
    return (
      <View style={styles.NutritionCountAndAddView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.bold}
            style={{fontWeight: '500'}}>
            {nutritionHeader}
          </Text>
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 1.5,
              backgroundColor: Colors.text.blueGray,
              marginHorizontal: 7,
            }}
          />
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={Colors.text.blueGray}
            style={{fontWeight: '500'}}>
            {mealDataAfterFilter?.length || 0}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ButtonView
            onPress={() => {
              addBtn();
            }}
            style={[AppStyles.mLeft10, {
              width: 30,                    // ← Added
              height: 30,                   // ← Added
              borderRadius: 28,             // ← Added for circular shape
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,                 // ← Android shadow
            }]}>
            <Image
              source={Images.NutritionPlus}
              style={{
                width: 20,                  // ← Increased from default
                height: 20,                 // ← Increased from default
                tintColor: '#36405B',
                resizeMode: 'contain'
              }}
            />
          </ButtonView>
          <ButtonView
            onPress={() => setShowBottomSheet(true)}
            style={[styles.threeDot]}>
            <Image
              style={{width: 20, height: 20}}
              source={Images.threeDots}
              resizeMode="contain"
            />
          </ButtonView>
        </View>
      </View>
    );
  };

  const renderNutritionList = () => {
    return (
      <>
        {util.isArrayEmpty(mealDataAfterFilter) ? (
          renderEmptyMeal()
        ) : (
          <>
            <FlatList
              data={mealDataAfterFilter}
              showsVerticalScrollIndicator={false}
              renderItem={(it) => {
                let item = it.item?.allData[0];
                if (Object.keys(item).length > 0) {
                  return (
                    <NutritionListItem
                      name={item?.name}
                      des={item?.description}
                      Kcal={item?.Kcal + ' Kcal'}
                      onPress={() =>
                        navigation.navigate('foodDetails', {
                          item,
                          isFromNutrition: true,
                          selectedmeal: nutritionHeader,
                        })
                      }
                      isAdd={item.isQuickAdded}
                      isAddQuick={item.isQuickAdded}
                      onPressIcon={() => {
                        deleteNutritionFood(it.item.id);
                      }}
                      addFromUSDA={item.addFromUSDA}
                      fdcId={item.fdcId}
                      iconImageSource={Images.DeleteIcon}
                      imageUrl={item?.image?.url}
                    />
                  );
                } else {
                  return null;
                }
              }}
            />
            {renderBtns()}
          </>
        )}
      </>
    );
  };

  const renderBtns = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Button
          title="Notes"
          onPress={() => {
            navigation.navigate('addNoteList');
          }}
          style={styles.btnStyle}
        />
        <Button
          title="Complete"
          onPress={() => {}}
          background={'#61D85E'}
          style={[styles.btnStyle, {marginLeft: 10}]}
        />
      </View>
    );
  };

  //Exercise
  const renderExercise = () => {
    return (
      <View style={styles.exerciseView}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            return <ExerciseItem isFromExercise={true} />;
          }}
        />
      </View>
    );
  };

  const renderExerciseBtn = () => {
    return (
      <View>
        <Button
          title="Connect a step tracker"
          onPress={() => {
            navigation.navigate('watchConnect');
          }}
          style={{
            height: 45,
            padding: 0,
            marginTop: 0,
            borderRadius: 6,
            marginBottom: 10,
          }}
        />
      </View>
    );
  };

  //Water
  const renderWater = () => {
    return (
      <View style={styles.waterView}>
        <WaterItem />
      </View>
    );
  };

  const renderEmptyMeal = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <Image
          resizeMode="cover"
          source={Images.NutritionEmpty}
          style={{marginTop: 50}}
        />
        <Button
          title="Let’s Add Meal"
          onPress={() => {
            navigation.navigate('addNatrition', {
              selectedNutrion: nutritionHeader,
              getFoodsForDailyNutrition: getFoodsForDailyNutrition,
            });
          }}
          style={[
            {
              height: 45,
              padding: 0,
              marginTop: 5,
              borderRadius: 6,
              marginBottom: 20,
            },
          ]}
        />
      </ScrollView>
    );
  };

  function handleDelete() {
    setIsDeleteVisible(false);
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderWeek()}
      {renderCalorieChart()}
      {renderNutritionHeader()}
      {renderNutritionCountAndAdd()}
      {isloader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={Colors.background.primary} />
        </View>
      ) : (
        renderNutritionList()
      )}

      {nutritionHeader == 'Exercise' && (
        <>
          {renderExercise()}
          {renderExerciseBtn()}
        </>
      )}

      {nutritionHeader == 'Water' && renderWater()}

      {showBottomSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          detached
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onClose={() => setShowBottomSheet(false)}
          onChange={handleSheetChanges}
          enablePanDownToClose>
          <View style={AppStyles.padding15}>
            <Text
              size={Fonts.size.medium}
              type={Fonts.type.base}
              style={{fontWeight: '600', lineHeight: 24}}>
              More Options
            </Text>
            <SeperaterView />
            <ButtonView style={AppStyles.mTop10}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500', lineHeight: 18}}>
                Save Meal
              </Text>
            </ButtonView>
            <ButtonView
              onPress={() => {
                setShowBottomSheet(false);
                setShowBottomMeal(true);
              }}
              style={AppStyles.mTop20}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500', lineHeight: 18}}>
                Duplicate Meal
              </Text>
            </ButtonView>
            <ButtonView
              onPress={() => {
                navigation.navigate('quickAddMeal');
                setShowBottomSheet(false);
              }}
              style={AppStyles.mTop20}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500'}}>
                Quick Add
              </Text>
            </ButtonView>
            <ButtonView style={AppStyles.mTop20}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500'}}>
                Reminders
              </Text>
            </ButtonView>
          </View>
        </BottomSheet>
      )}

      {showBottomMeal && (
        <BottomSheet
          ref={bottomSheetMealRef}
          index={0}
          detached
          snapPoints={snapPointsMeal}
          backdropComponent={renderBackdrop}
          onClose={() => setShowBottomMeal(false)}
          onChange={handleSheetChanges}
          enablePanDownToClose>
          <View style={AppStyles.padding15}>
            <Text
              size={Fonts.size.medium}
              type={Fonts.type.base}
              style={{fontWeight: '600', lineHeight: 24}}>
              Duplicate Meal
            </Text>
            <SeperaterView />
            <ButtonView style={AppStyles.mTop10}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500', lineHeight: 18}}>
                Breakfast
              </Text>
            </ButtonView>
            <ButtonView style={AppStyles.mTop20}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500', lineHeight: 18}}>
                Lunch
              </Text>
            </ButtonView>
            <ButtonView style={AppStyles.mTop20}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500'}}>
                Snacks
              </Text>
            </ButtonView>
            <ButtonView style={AppStyles.mTop20}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500'}}>
                Dinner
              </Text>
            </ButtonView>
          </View>
        </BottomSheet>
      )}

      {showBottomExercise && (
        <BottomSheet
          ref={bottomSheetExerciseRef}
          index={0}
          detached
          snapPoints={snapPointsExercise}
          backdropComponent={renderBackdrop}
          onClose={() => setShowBottomExercise(false)}
          onChange={handleSheetChanges}
          enablePanDownToClose>
          <View style={[AppStyles.padding15]}>
            <Text
              size={Fonts.size.medium}
              type={Fonts.type.base}
              style={{fontWeight: '600', lineHeight: 24}}>
              Exercises
            </Text>
            <SeperaterView />
            <ButtonView
              onPress={() => {
                navigation.navigate('cardiovascular');
                setShowBottomExercise(false);
              }}
              style={AppStyles.mTop10}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500', lineHeight: 18}}>
                Cardiovascular
              </Text>
            </ButtonView>
            <SeperaterView />
            <ButtonView style={AppStyles.mTop20}>
              <Text
                size={Fonts.size.xxxSmall}
                type={Fonts.type.base}
                style={{fontWeight: '500', lineHeight: 18}}>
                Strength
              </Text>
            </ButtonView>
          </View>
        </BottomSheet>
      )}

      {isDeleteVisible && (
        <ModalCancel
          title="Are you sure you want to delete?"
          actionTitle={'Delete'}
          isVisible={isDeleteVisible}
          setVisible={setIsDeleteVisible}
          setIsActive={handleDelete}
        />
      )}
    </View>
  );
}
