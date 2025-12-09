import {View, Text, Keyboard, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  CustomHeaderNutrition,
  KeyboardAwareScrollViewComponent,
  NutritionInputText,
} from '../../components';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {create} from 'domain';
import {
  createMyFoodRequest,
  updateMyFoodItemByIdRequest,
} from '../../redux/slicers/nutritions';
import util from '../../util';
import {strings} from '../../constants';
import {uploadMediaRequest} from '../../redux/slicers/user';
import {id} from 'rn-emoji-keyboard';

export default function CreateFoodSecond({route}) {
  const {
    name,
    description,
    servingSize,
    servingSizeUnit,
    packageWeight,
    image,
    foodNutrients,
    isEdit,
    id,
  } = route.params;

  const [calories, setCalories] = useState('');
  const [caloriesError, setCaloriesError] = useState('');
  const [totalFat, setTotalFat] = useState('');
  const [totalFatError, setTotalFatError] = useState('');
  const [satureated, setSatureated] = useState('');
  const [satureatedError, setSatureatedError] = useState('');
  const [transFat, setTransFat] = useState('');
  const [transFatError, setTransFatError] = useState('');
  const [polyunsaturated, setPolyunsaturated] = useState('');
  const [polyunsaturatedError, setPolyunsaturatedError] = useState('');
  const [monounsaturated, setMonounsaturated] = useState('');
  const [monounsaturatedError, setMonounsaturatedError] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [sodiums, setSodiums] = useState('');
  const [totalCarbohydratess, setTotalCarbohydratess] = useState('');
  const [totalCarbohydratessError, setTotalCarbohydratessError] = useState('');
  const [dietaryFiber, setDietaryFiber] = useState('');
  const [sugar, setSugar] = useState('');
  const [addedSugar, setAddedSugar] = useState('');
  const [sugarAlcohols, setSugarAlcohols] = useState('');
  const [protien, setProtien] = useState('');
  const [protienError, setProtienError] = useState('');
  const [vitaminD, setVitaminD] = useState('');
  const [calcium, setCalcium] = useState('');
  const [iron, setIron] = useState('');
  const [potassium, setPotassium] = useState('');
  const [vitaminA, setVitaminA] = useState('');
  const [vitaminC, setVitaminC] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const nutrientArray = [
    {name: 'Calories', value: Number(calories), unit: 'kcal'},
    {name: 'Total Fat', value: Number(totalFat), unit: 'g'},
    {name: 'Satureated Fat', value: Number(satureated), unit: 'g'},
    {name: 'Trans Fat', value: Number(transFat), unit: 'g'},
    {name: 'Polyunsaturated Fat', value: Number(polyunsaturated), unit: 'g'},
    {name: 'Monounsaturated Fat', value: Number(monounsaturated), unit: 'g'},
    {name: 'Cholesterol', value: Number(cholesterol), unit: 'mg'},
    {name: 'Sodiums', value: Number(sodiums), unit: 'mg'},
    {
      name: 'Total Carbohydrates',
      value: Number(totalCarbohydratess),
      unit: 'g',
    },
    {name: 'Dietary Fiber', value: Number(dietaryFiber), unit: 'g'},
    {name: 'Sugar', value: Number(sugar), unit: 'g'},
    {name: 'Added Sugar', value: Number(addedSugar), unit: 'g'},
    {name: 'Sugar Alcohols', value: Number(sugarAlcohols), unit: 'g'},
    {name: 'Protien', value: Number(protien), unit: 'g'},
    {name: 'Vitamin D', value: Number(vitaminD), unit: '%'},
    {name: 'Calcium', value: Number(calcium), unit: '%'},
    {name: 'Iron', value: Number(iron), unit: '%'},
    {name: 'Potassium', value: Number(potassium), unit: 'mg'},
    {name: 'Vitamin A', value: Number(vitaminA), unit: '%'},
    {name: 'Vitamin C', value: Number(vitaminC), unit: '%'},
  ];
  const labelNutrientsArray = [
    {name: 'protein', value: Number(protien)},
    {name: 'fat', value: Number(totalFat)},
    {name: 'carbohydrates', value: Number(totalCarbohydratess)},
  ];
  const caloriesRef = useRef(null);
  const totalFatRef = useRef(null);
  const satureatedRef = useRef(null);
  const transFatRef = useRef(null);
  const polyunsaturatedRef = useRef(null);
  const monounsaturatedRef = useRef(null);
  const cholesterolRef = useRef(null);
  const sodiumsRef = useRef(null);
  const totalCarbohydratessRef = useRef(null);
  const dietaryFiberRef = useRef(null);
  const sugarRef = useRef(null);
  const addedSugarRef = useRef(null);
  const sugarAlcoholsRef = useRef(null);
  const protienRef = useRef(null);
  const vitaminDRef = useRef(null);
  const calciumRef = useRef(null);
  const ironRef = useRef(null);
  const potassiumRef = useRef(null);
  const vitaminARef = useRef(null);
  const vitaminCRef = useRef(null);

  const {userData} = useSelector((state) => state.user);

  const navigate = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      foodNutrients &&
        foodNutrients.map((item) => {
          switch (item.name) {
            case 'Calories':
              setCalories(item?.value?.toString());
              break;
            case 'Total Fat':
              setTotalFat(item?.value?.toString());
              break;
            case 'Satureated Fat':
              setSatureated(item?.value?.toString());
              break;
            case 'Trans Fat':
              setTransFat(item?.value?.toString());
            case 'Polyunsaturated Fat':
              setPolyunsaturated(item?.value.toString());
              break;
            case 'Monounsaturated Fat':
              setMonounsaturated(item.value.toString());
              break;
            case 'Cholesterol':
              setCholesterol(item.value.toString());
              break;
            case 'Sodiums':
              setSodiums(item.value.toString());
              break;
            case 'Total Carbohydrates':
              setTotalCarbohydratess(item.value.toString());
              break;
            case 'Dietary Fiber':
              setDietaryFiber(item.value.toString());
              break;
            case 'Sugar':
              setSugar(item.value.toString());
              break;
            case 'Added Sugar':
              setAddedSugar(item.value.toString());
              break;
            case 'Sugar Alcohols':
              setSugarAlcohols(item.value.toString());
              break;
            case 'Protien':
              setProtien(item.value.toString());
              break;
            case 'Vitamin D':
              setVitaminD(item.value.toString());
              break;
            case 'Calcium':
              setCalcium(item.value.toString());
              break;
            case 'Iron':
              setIron(item.value.toString());
              break;
            case 'Potassium':
              setPotassium(item.value.toString());
              break;
            case 'Vitamin A':
              setVitaminA(item.value.toString());
              break;
            case 'Vitamin C':
              setVitaminC(item.value.toString());
              break;
          }
        });
    }
  }, []);

  function validation() {
    let isValid = true;
    if (util.isEmptyValue(calories)) {
      setCaloriesError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (calories <= 0) {
      setCaloriesError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }
    if (util.isEmptyValue(totalFat)) {
      setTotalFatError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (totalFat <= 0) {
      setTotalFatError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }

    if (util.isEmptyValue(satureated)) {
      setSatureatedError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (satureated <= 0) {
      setSatureatedError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }
    if (util.isEmptyValue(polyunsaturated)) {
      setPolyunsaturatedError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (polyunsaturated <= 0) {
      setPolyunsaturatedError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }
    if (util.isEmptyValue(monounsaturated)) {
      setMonounsaturatedError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (monounsaturated <= 0) {
      setMonounsaturatedError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }
    if (util.isEmptyValue(transFat)) {
      setTransFatError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (transFat <= 0) {
      setTransFatError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }
    if (util.isEmptyValue(totalCarbohydratess)) {
      setTotalCarbohydratessError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (totalCarbohydratess <= 0) {
      setTotalCarbohydratessError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }
    if (util.isEmptyValue(protien)) {
      setProtienError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (protien <= 0) {
      setProtienError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
  }

  function btnSave() {
    console.log('btnSaveeeeeeeeeeeeeee');
    if (validation()) {
      setIsLoading(true);
      if (image.isEdit) {
        updateFoodDataApi(image?.id);
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
              console.log({uploadedFile});
              if (status) {
                isEdit
                  ? updateFoodDataApi(uploadedFile[0]?.id)
                  : createFoodDataApi(uploadedFile[0]?.id);
              }
            },
          }),
        );
      } else {
        isEdit ? updateFoodDataApi(null) : createFoodDataApi(null);
      }
    }
  }

  function createFoodDataApi(image) {
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
            name: name,
            description: description,
            image: image,
            servingSize: Number(servingSize),
            servingSizeUnit: servingSizeUnit,
            packageWeight: packageWeight,
            foodNutrients: nutrientArray,
            labelNutrients: labelNutrientsArray,
            Kcal: util.calculateTotalKcal(labelNutrientsArray),
          },
        },
        responseCallback: (status) => {
          setIsLoading(false);
          if (status) {
            util.topAlert('Food created successfully');
            navigate.pop(2);
          }
        },
      }),
    );
  }
  function updateFoodDataApi(image) {
    dispatch(
      updateMyFoodItemByIdRequest({
        payloadData: {
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
            name: name,
            description: description,
            image: image,
            servingSize: Number(servingSize),
            servingSizeUnit: servingSizeUnit,
            packageWeight: packageWeight,
            foodNutrients: nutrientArray,
            labelNutrients: labelNutrientsArray,
            Kcal: util.calculateTotalKcal(labelNutrientsArray),
          },
        },
        responseCallback: (status) => {
          setIsLoading(false);
          if (status) {
            util.topAlert('Food updated successfully');
            navigate.pop(3);
          }
        },
      }),
    );
  }

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title={`${isEdit ? 'Update' : 'Save'}`}
          isLoading={isLoading}
          onPress={() => {
            btnSave();
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition
        title={`${isEdit ? 'Update' : 'Create a'} Food Nutrient`}
      />
      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        containerStyle={{marginTop: 0, flex: 1, marginBottom: 20}}>
        <NutritionInputText
          placeholderText={'Calories*'}
          value={calories}
          onChangeText={(value) => {
            setCalories(value);
            setCaloriesError('');
          }}
          inputRef={caloriesRef}
          inputOnSubmitEditing={() => totalFatRef?.current?.focus?.()}
          keyboardType={'numeric'}
          error={caloriesError}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Total Fat (g)*'}
          value={totalFat}
          onChangeText={(value) => {
            setTotalFat(value);
            setTotalFatError('');
          }}
          inputRef={totalFatRef}
          inputOnSubmitEditing={() => satureatedRef?.current?.focus?.()}
          keyboardType={'numeric'}
          error={totalFatError}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Satureated Fat (g)*'}
          value={satureated}
          onChangeText={(value) => {
            setSatureated(value);
            setSatureatedError('');
          }}
          inputRef={satureatedRef}
          inputOnSubmitEditing={() => transFatRef?.current?.focus?.()}
          keyboardType={'numeric'}
          error={satureatedError}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Trans Fat (g)*'}
          value={transFat}
          onChangeText={(value) => {
            setTransFat(value);
            setTransFatError('');
          }}
          inputRef={transFatRef}
          inputOnSubmitEditing={() => polyunsaturatedRef?.current?.focus?.()}
          keyboardType={'numeric'}
          error={transFatError}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Polyunsaturated Fat (g)*'}
          value={polyunsaturated}
          onChangeText={(value) => {
            setPolyunsaturated(value);
            setPolyunsaturatedError('');
          }}
          inputRef={polyunsaturatedRef}
          inputOnSubmitEditing={() => monounsaturatedRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
          error={polyunsaturatedError}
        />
        <NutritionInputText
          placeholderText={'Monounsaturated Fat* (g)'}
          value={monounsaturated}
          onChangeText={(value) => {
            setMonounsaturated(value);
            setMonounsaturatedError('');
          }}
          inputRef={monounsaturatedRef}
          inputOnSubmitEditing={() => cholesterolRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
          error={monounsaturatedError}
        />
        <NutritionInputText
          placeholderText={'Cholesterol (mg)'}
          value={cholesterol}
          onChangeText={setCholesterol}
          inputRef={cholesterolRef}
          inputOnSubmitEditing={() => sodiumsRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Sodiums (mg)'}
          value={sodiums}
          onChangeText={setSodiums}
          inputRef={sodiumsRef}
          inputOnSubmitEditing={() =>
            totalCarbohydratessRef?.current?.focus?.()
          }
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Total Carbohydratess (g)*'}
          value={totalCarbohydratess}
          onChangeText={(value) => {
            setTotalCarbohydratess(value);
            setTotalCarbohydratessError('');
          }}
          inputRef={totalCarbohydratessRef}
          inputOnSubmitEditing={() => dietaryFiberRef?.current?.focus?.()}
          keyboardType={'numeric'}
          error={totalCarbohydratessError}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Dietary Fiber (g)'}
          value={dietaryFiber}
          onChangeText={setDietaryFiber}
          inputRef={dietaryFiberRef}
          inputOnSubmitEditing={() => sugarRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Sugars (g)'}
          value={sugar}
          onChangeText={setSugar}
          inputRef={sugarRef}
          inputOnSubmitEditing={() => addedSugarRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Added Sugars (g)'}
          value={addedSugar}
          onChangeText={setAddedSugar}
          inputRef={addedSugarRef}
          inputOnSubmitEditing={() => sugarAlcoholsRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Sugar Alcohols (g)'}
          value={sugarAlcohols}
          onChangeText={setSugarAlcohols}
          inputRef={sugarAlcoholsRef}
          inputOnSubmitEditing={() => protienRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Protein (g)*'}
          value={protien}
          onChangeText={(value) => {
            setProtien(value);
            setProtienError('');
          }}
          inputRef={protienRef}
          inputOnSubmitEditing={() => vitaminDRef?.current?.focus?.()}
          keyboardType={'numeric'}
          error={protienError}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Vitamin D (%)'}
          value={vitaminD}
          onChangeText={setVitaminD}
          inputRef={vitaminDRef}
          inputOnSubmitEditing={() => calciumRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Calcium (%)'}
          value={calcium}
          onChangeText={setCalcium}
          inputRef={calciumRef}
          inputOnSubmitEditing={() => ironRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Iron (%)'}
          value={iron}
          onChangeText={setIron}
          inputRef={ironRef}
          inputOnSubmitEditing={() => potassiumRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Potassium (mg)'}
          value={potassium}
          onChangeText={setPotassium}
          inputRef={potassiumRef}
          inputOnSubmitEditing={() => vitaminARef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Vitamin A (%)'}
          value={vitaminA}
          onChangeText={setVitaminA}
          inputRef={vitaminARef}
          inputOnSubmitEditing={() => vitaminCRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Vitamin C (%)'}
          value={vitaminC}
          onChangeText={setVitaminC}
          inputRef={vitaminCRef}
          inputOnSubmitEditing={btnSave}
          keyboardType={'numeric'}
          maxLength={4}
        />
      </KeyboardAwareScrollViewComponent>
      {rerderSaveBtn()}
    </View>
  );
}
