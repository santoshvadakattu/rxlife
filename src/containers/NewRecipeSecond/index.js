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
import {useDispatch, useSelector} from 'react-redux';
import {
  createMyRecipeRequest,
  updateMyRecipeRequest,
} from '../../redux/slicers/nutritions';
import {uploadMediaRequest} from '../../redux/slicers/user';
import {it} from 'rn-emoji-keyboard';

export default function NewRecipeSecond({route}) {
  const {
    id,
    image,
    RecipeName,
    ServingsCount,
    IngredientArray,
    removeIngredient,
    isEdit,
  } = route.params || {};
  const {userData} = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const naviation = useNavigation();
  const dispatch = useDispatch();

  function SaveBtn() {
    uploadImage();
  }

  function uploadImage() {
    setIsLoading(true);
    if (image?.isEdit) {
      updateApiCall(image.id);
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
                ? updateApiCall(uploadedFile[0]?.id)
                : CreateApiCall(uploadedFile[0]?.id);
            }
          },
        }),
      );
    } else {
      isEdit ? updateMealDataApi(null) : CreateApiCall(null);
    }
  }

  function CreateApiCall(imageId) {
    let allFoodIds = [];
    let myFoodIds = [];

    let tempAllFoodArr = [];
    IngredientArray?.map((item) => {
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
        name: RecipeName,
        servingSize: Number(ServingsCount),
        image: imageId,
        ingredients: [],
        all_foods: {
          connect: allFoodIds,
        },
        my_foods: {
          connect: myFoodIds,
        },
        recipesFoods: tempAllFoodArr,
        labelNutrients: util.getlabelNutrientsFromMyMealFood(IngredientArray),
        foodNutrients: util.getfoodNutrientsFromMyMealFood(IngredientArray),
      },
    };

    dispatch(
      createMyRecipeRequest({
        payloadData: payload,
        responseCallback: (response) => {
          setIsLoading(false);
          naviation.pop(2);
        },
      }),
    );
    util.topAlert('Recipe Created Successfully');
  }

  function updateApiCall(imageId) {
    let allFoodIds = [];
    let myFoodIds = [];
    let tempAllFoodArr = [];
    IngredientArray?.map((item) => {
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
    let allFoodIdsRemove = [];
    let myFoodIdsRemove = [];
    removeIngredient?.map((item) => {
      if (item.addFromUSDA) {
        allFoodIdsRemove.push(item.id);
      } else {
        myFoodIdsRemove.push(item.id);
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
        name: RecipeName,
        servingSize: Number(ServingsCount),
        image: imageId,
        ingredients: [],
        all_foods: {
          connect: allFoodIds,
          disconnect: allFoodIdsRemove,
        },
        my_foods: {
          connect: myFoodIds,
          disconnect: myFoodIdsRemove,
        },
        recipesFoods: tempAllFoodArr,
        // labelNutrients: util.getlabelNutrientsFromMyMealFood(IngredientArray),
        // foodNutrients: util.getfoodNutrientsFromMyMealFood(IngredientArray),
      },
    };

    dispatch(
      updateMyRecipeRequest({
        payloadData: payload,
        responseCallback: (status, response) => {
          setIsLoading(false);
          naviation.pop(3);
        },
      }),
    );

    util.topAlert('Recipe Updated Successfully');
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

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderGraph = () => {
    return (
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 0.5,
          elevation: 2,
          backgroundColor: Colors.white,
          marginTop: 15,
          borderRadius: 12,
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}>
        <NutritionGraph
          labelNutrients={util.getlabelNutrientsFromMyMealFood(IngredientArray)}
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
          onPress={() => {
            SaveBtn();
          }}
          style={styles.btnStyle}
        />
      </View>
    );
  };

  const renderIngredientShow = () => {
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
            Ingredients
          </Text>
        </View>
        {renderSeparator()}
        <FlatList
          data={IngredientArray}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 30}}
          renderItem={({item}) => {
            return (
              <View>
                <IngredientItem
                  item={item}
                  isEdit={false}
                  onPressDelete={() => {}}
                />
                <SeperaterView />
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={`${isEdit ? 'Edit' : 'New'} Recipe `} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        {renderImagePicker()}
        <NutritionInputText
          value={RecipeName}
          placeholderText={'Recipe Name'}
          disable={true}
        />
        <NutritionInputText
          value={ServingsCount}
          placeholderText={'Servings Count'}
          disable={true}
        />
        {renderGraph()}
        {renderIngredientShow()}
      </ScrollView>

      {rerderSaveBtn()}
    </View>
  );
}
