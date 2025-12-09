import {Keyboard, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  KeyboardAwareScrollViewComponent,
  NutritionInputText,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  createMyFoodRequest,
  updateMyFoodItemByIdRequest,
} from '../../redux/slicers/nutritions';
import util from '../../util';
import {strings} from '../../constants';

export default function QuickAddMeal({route}) {
  const {isEdit, item} = route.params || {};
  const [meal, setMeal] = useState(item?.name ? item?.name : '');
  const [mealError, setMealError] = useState('');
  const [calories, setCalories] = useState(item?.Kcal ? item?.Kcal : '');
  const [caloriesError, setCaloriesError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  function validation() {
    let isValid = true;
    if (util.isEmptyValue(meal)) {
      setMealError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    if (util.isEmptyValue(calories)) {
      setCaloriesError(strings.REQUIRED_FIELD);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  function addBtn() {
    isEdit ? updateFoodDataApi() : createQucikFoodApi();
  }

  function createQucikFoodApi() {
    setIsLoading(true);
    dispatch(
      createMyFoodRequest({
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
            description: '',
            servingSize: Number(0),
            servingSizeUnit: '',
            packageWeight: '',
            foodNutrients: [],
            labelNutrients: [],
            Kcal: calories.toString(),
            isQuickAdded: true,
          },
        },
        responseCallback: (status) => {
          setIsLoading(false);
          if (status) {
            navigate.goBack();
          }
        },
      }),
    );
  }

  function updateFoodDataApi(image) {
    dispatch(
      updateMyFoodItemByIdRequest({
        payloadData: {
          Id: item.id,
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
            description: '',
            image: null,
            servingSize: Number(0),
            servingSizeUnit: '',
            packageWeight: '',
            foodNutrients: [],
            labelNutrients: [],
            Kcal: calories.toString(),
          },
        },
        responseCallback: (status) => {
          setIsLoading(false);
          if (status) {
            navigate.goBack();
          }
        },
      }),
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={`${isEdit ? 'Quick Edit' : 'Quick Add'}`} />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <KeyboardAwareScrollViewComponent>
          <NutritionInputText
            placeholderText={'Name'}
            value={meal}
            onChangeText={(value) => {
              setMeal(value.replace(/[^a-zA-Z\s]/g, ''));
            }}
            error={mealError}
          />
          <NutritionInputText
            placeholderText={'Calories'}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
            error={caloriesError}
          />
        </KeyboardAwareScrollViewComponent>
        <Button
          title={`${isEdit ? 'Update' : 'Add'}`}
          isLoading={isLoading}
          onPress={() => {
            if (validation()) {
              addBtn();
            }
          }}
          style={[styles.btnStyle]}
        />
      </View>
    </View>
  );
}
