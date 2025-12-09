import {View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  CustomHeaderNutrition,
  KeyboardAwareScrollViewComponent,
  NutritionDropDown,
  NutritionInputText,
} from '../../components';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {strings} from '../../constants';
import util from '../../util';
import {useDispatch} from 'react-redux';
import {create} from 'apisauce';
import {CreateIngredientRequest} from '../../redux/slicers/nutritions';

export default function AddNewIngredient() {
  const [name, setName] = useState('');
  const [ServingSize, setServingSize] = useState('');
  const [ServingSizeError, setServingSizeError] = useState('');

  const [Unit, setUnit] = useState('');
  const [UnitError, setUnitError] = useState('');
  const [nameError, setNameError] = useState('');
  const [Kcal, setKcal] = useState('');
  const [KcalError, setKcalError] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  function validation() {
    let isValid = true;

    if (util.isEmptyValue(name)) {
      setNameError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    if (util.isEmptyValue(ServingSize)) {
      setServingSizeError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    if (util.isEmptyValue(Kcal)) {
      setKcalError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    return isValid;
  }

  function btnIntredientApiCall() {
    // Api call
    setIsLoader(true);
    const payload = {
      data: {
        name: name,
        servingSize: ServingSize,
        Kcal: Kcal.toString(),
      },
    };
    dispatch(
      CreateIngredientRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsLoader(false);
          if (status) {
            navigate.goBack();
          }
        },
      }),
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title="Add New Ingredient" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <KeyboardAwareScrollViewComponent>
          <NutritionInputText
            placeholderText={'Name'}
            value={name}
            onChangeText={(value) => {
              setName(value);
              setNameError('');
            }}
            error={nameError}
          />
          <NutritionInputText
            placeholderText={'Serving Size'}
            value={ServingSize}
            onChangeText={(value) => {
              setServingSize(value);
              setServingSizeError('');
            }}
            error={ServingSizeError}
          />
          <NutritionInputText
            placeholderText={'Kcal'}
            value={Kcal}
            onChangeText={(value) => {
              setKcal(value);
              setKcalError('');
            }}
            error={KcalError}
            keyboardType="numeric"
          />
        </KeyboardAwareScrollViewComponent>
        <Button
          title="Add Ingredient"
          isLoading={isLoader}
          onPress={() => {
            if (validation()) {
              btnIntredientApiCall();
            }
          }}
          style={styles.btnStyle}
        />
      </View>
    </View>
  );
}
