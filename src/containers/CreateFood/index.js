import {View, Image, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  KeyboardAwareScrollViewComponent,
  NutritionDropDown,
  NutritionGraph,
  NutritionInputText,
  Text,
  TextInput,
} from '../../components';
import {Switch} from 'react-native-switch';

import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {handleSelectImagePress} from '../../Helper/handleSelectImagePress';
import util from '../../util';
import {strings} from '../../constants';
import {
  createMyMealRequest,
  getMyFoodItemByIdRequest,
} from '../../redux/slicers/nutritions';
import {useDispatch, useSelector} from 'react-redux';

export default function CreateFood({route}) {
  const {item, isEdit} = route.params || {};
  const [RecipeName, setRecipeName] = useState('');
  const [RecipeNameError, setRecipeNameError] = useState('');
  const [despriction, setDespriction] = useState('');
  const [Unit, setUnit] = useState('');
  const [UnitError, setUnitError] = useState('');
  const [desprictionError, setDesprictionError] = useState('');
  const [ServingSize, setServingSize] = useState('');
  const [ServingSizeError, setServingSizeError] = useState('');
  const [servinfPerContainer, setServinfPerContainer] = useState('');
  const [servinfPerContainerError, setServinfPerContainerError] = useState('');
  const [ServingsCount, setServingsCount] = useState('');
  const [isIngredients, setIsIngredients] = useState(false);
  const [foodItemDetails, setFoodItemDetails] = useState({});

  const [image, setImage] = useState({});
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const desprictionRef = useRef(null);
  const ServingSizeRef = useRef(null);
  const servinfPerContainerRef = useRef(null);
  const unitRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      dispatch(
        getMyFoodItemByIdRequest({
          payloadData: {
            Id: item.id,
          },
          responseCallback: (status, response) => {
            if (status) {
              const {
                name,
                description,
                image,
                packageWeight,
                servingSize,
                servingSizeUnit,
              } = response || {};

              setRecipeName(name);
              setDespriction(description);
              setServingSize(servingSize?.toString());
              setUnit(servingSizeUnit);
              setServinfPerContainer(packageWeight);
              setImage({
                isEdit: true,
                path: image?.url,
                id: image.id,
              });
              setFoodItemDetails(response);
            }
          },
        }),
      );
    }
  }, []);

  function onChangeRecipe(value) {
    setRecipeName(value);
    setRecipeNameError('');
  }

  function onChangeServings(value) {
    setServingSize(value);
    setServingSizeError('');
  }

  function getImage(img) {
    setImage(img);
  }

  function validation() {
    let isValid = true;
    if (util.isEmptyValueWithoutTrim(RecipeName)) {
      setRecipeNameError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (util.isEmptyValue(RecipeName)) {
      setRecipeNameError(strings.NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      isValid = false;
    }

    // if (util.isEmptyValue(despriction)) {
    //   setDesprictionError(strings.REQUIRED_FIELD);
    //   isValid = false;
    // }
    if (util.isEmptyValue(ServingSize)) {
      setServingSizeError(strings.REQUIRED_FIELD);
      isValid = false;
    } else if (ServingSize <= 0) {
      setServingSizeError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    }
    if (util.isEmptyValue(servinfPerContainer)) {
      setServinfPerContainerError(strings.REQUIRED_FIELD);
      isValid = false;
    }
    if (util.isEmptyValue(Unit)) {
      setUnitError(strings.REQUIRED_FIELD);
      isValid = false;
    }

    Keyboard.dismiss();
    return isValid;
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
              style={styles.imgView}>
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

  function btnNext() {
    if (validation()) {
      navigate.navigate('createFoodSecond', {
        name: RecipeName,
        description: despriction,
        servingSize: ServingSize,
        servingSizeUnit: Unit,
        packageWeight: servinfPerContainer,
        image: image,
        foodNutrients: foodItemDetails?.foodNutrients,
        isEdit: isEdit,
        id: item?.id,
      });
    }
  }

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button title="Next" onPress={btnNext} style={styles.btnStyle} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={`${isEdit ? 'Update' : 'Create a'} Food`} />
      <KeyboardAwareScrollViewComponent style={{marginTop: 10, flex: 1}}>
        {renderImagePicker()}
        <NutritionInputText
          placeholderText={'Brand Name'}
          value={RecipeName}
          onChangeText={(value) =>
            onChangeRecipe(value.replace(/[^a-zA-Z\s]/g, ''))
          }
          error={RecipeNameError}
          inputRef={nameRef}
          inputOnSubmitEditing={() => desprictionRef?.current?.focus?.()}
          maxLength={50}
        />
        <NutritionInputText
          placeholderText={'Descriptions'}
          value={despriction}
          onChangeText={(value) => {
            setDespriction(value);
            setDesprictionError('');
          }}
          error={desprictionError}
          inputRef={desprictionRef}
          inputOnSubmitEditing={() => ServingSizeRef?.current?.focus?.()}
          maxLength={80}
        />
        <NutritionInputText
          placeholderText={'Serving Size'}
          value={ServingSize}
          onChangeText={onChangeServings}
          error={ServingSizeError}
          inputRef={ServingSizeRef}
          inputOnSubmitEditing={() => unitRef?.current?.focus?.()}
          keyboardType={'numeric'}
          maxLength={4}
        />
        <NutritionInputText
          placeholderText={'Serving Size Unit'}
          value={Unit}
          onChangeText={(value) => {
            setUnit(value);
            setUnitError('');
          }}
          error={UnitError}
          inputRef={unitRef}
          inputOnSubmitEditing={() =>
            servinfPerContainerRef?.current?.focus?.()
          }
          maxLength={20}
        />

        <NutritionInputText
          placeholderText={'Serving per container (package Weight)'}
          value={servinfPerContainer}
          onChangeText={(value) => {
            setServinfPerContainer(value);
            setServinfPerContainerError('');
          }}
          error={servinfPerContainerError}
          inputRef={servinfPerContainerRef}
          inputOnSubmitEditing={() => btnNext()}
          maxLength={20}
        />
      </KeyboardAwareScrollViewComponent>
      {rerderSaveBtn()}
    </View>
  );
}
