import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  IngredientItem,
  ModalCancel,
  NutritionGraph,
  NutritionInputText,
  SeperaterView,
  Text,
  TextInput,
} from '../../components';

import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {handleSelectImagePress} from '../../Helper/handleSelectImagePress';
import util from '../../util';
import {SCREENS, strings} from '../../constants';

export default function NewRecipe({route}) {
  const {isEdit, item} = route.params || {};
  const [RecipeName, setRecipeName] = useState(item ? item.name : '');
  const [RecipeNameError, setRecipeNameError] = useState('');
  const [ServingsCount, setServingsCount] = useState(
    item ? item?.servingSize?.toString() : '',
  );
  const [ServingsCountError, setServingsCountError] = useState('');
  const [IngredientArray, setIngredientArray] = useState(
    isEdit ? item.ingredients : [],
  );
  const [removeIngredient, setRemoveIngredient] = useState([]);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [image, setImage] = useState(
    isEdit
      ? {
          isEdit: isEdit,
          path: item?.image.url,
        }
      : {},
  );
  const naviation = useNavigation();

  function onChangeRecipe(value) {
    setRecipeName(value);
    setRecipeNameError('');
  }

  function onChangeServings(value) {
    setServingsCount(value);
    setServingsCountError('');
  }

  function getImage(img) {
    setImage(img);
  }

  function addNewIngredient(item) {
    console.log('item', item);

    let tempArr = [...IngredientArray];
    const tempObj = {
      ...item,
      recipeId: Number(tempArr.length) + Number(1),
    };
    console.log('====================================');
    console.log('tempObj', tempObj);
    console.log('====================================');

    tempArr.unshift(tempObj);
    setIngredientArray(tempArr);
  }

  function validation() {
    let isValid = true;
    if (util.isEmptyValue(RecipeName)) {
      setRecipeNameError(strings.REQUIRED_FIELD);

      isValid = false;
    }
    if (util.isEmptyValue(ServingsCount)) {
      setServingsCountError(strings.REQUIRED_FIELD);

      isValid = false;
    } else if (ServingsCount <= 0) {
      setServingsCountError(strings.SHOULD_BE_GREATER_THAN_ZERO);
      isValid = false;
    } else if (IngredientArray.length == 0) {
      util.topAlertError('Please, add ingredient');
      isValid = false;
    }
    Keyboard.dismiss();
    return isValid;
  }

  function handleDelete() {
    let tempArr = [...IngredientArray];
    tempArr = tempArr?.filter((item) => item != selectedValue);
    setIngredientArray(tempArr);
    setIsDeleteVisible(false);
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

  const renderIngredient = () => {
    return (
      <View style={styles.shareWithView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500', lineHeight: 18}}>
            Add Ingredient
          </Text>
          <TouchableOpacity
            onPress={() => {
              naviation.navigate('addIngredient', {
                addNewIngredient: addNewIngredient,
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
        {renderSeparator()}
        <FlatList
          data={IngredientArray}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <IngredientItem
                  isDelete={true}
                  isEdit={false}
                  item={item}
                  onPressEdit={() => {
                    naviation.navigate('addIngredient', {
                      isEdit: true,
                    });
                  }}
                  onPressDelete={() => {
                    let tempArr = [...IngredientArray];
                    tempArr = tempArr?.filter((it) => it != item);
                    setIngredientArray(tempArr);
                    let tempRemoveArr = [...removeIngredient];
                    tempRemoveArr.push(item);
                    setRemoveIngredient(tempRemoveArr);
                  }}
                />
                <SeperaterView />
              </View>
            );
          }}
          keyExtractor={(item) => item.recipeId}
        />
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 20}}>
        <Button
          title="Next"
          onPress={() => {
            if (validation()) {
              naviation.navigate(SCREENS.NUTRITION.newRecipeSecond, {
                image: image,
                RecipeName: RecipeName,
                ServingsCount: ServingsCount,
                IngredientArray: IngredientArray,
                removeIngredient: removeIngredient,
                isEdit: isEdit,
                id: item?.id,
              });
            }
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={`${isEdit ? 'Edit' : 'New'} Recipe`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        {renderImagePicker()}
        <NutritionInputText
          value={RecipeName}
          onChangeText={(value) =>
            onChangeRecipe(value.replace(/[^a-zA-Z\s]/g, ''))
          }
          placeholderText={'Recipe Name'}
          error={RecipeNameError}
          maxLength={50}
        />
        <NutritionInputText
          value={ServingsCount}
          onChangeText={onChangeServings}
          placeholderText={'Servings Count'}
          error={ServingsCountError}
          maxLength={4}
          keyboardType={'numeric'}
        />
        {renderIngredient()}
      </ScrollView>
      <ModalCancel
        title="Are you sure you want to delete?"
        actionTitle={'Delete'}
        isVisible={isDeleteVisible}
        setVisible={setIsDeleteVisible}
        setIsActive={handleDelete}
      />
      {rerderSaveBtn()}
    </View>
  );
}
