import {
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  IngredientItem,
  ModalCancel,
  NutritionGraph,
  SeperaterView,
  Text,
} from '../../components';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  deleteMyRecipeRequest,
  getRecipeDetailsByIdRequest,
} from '../../redux/slicers/nutritions';
import util from '../../util';

export default function RecipeDetails({route}) {
  const {id, getFoodsForDailyNutrition, addForm, selectedNutrion} =
    route.params || {};
  const navigation = useNavigation();
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [getItem, setgetItem] = useState({});
  const {
    image,
    name,
    ingredients,
    foodNutrients,
    labelNutrients,
    Kcal,
    servingSize,
  } = getItem || {};
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      Id: id,
    };
    dispatch(
      getRecipeDetailsByIdRequest({
        payloadData: payload,
        responseCallback: (state, response) => {
          console.log('response', response);
          setgetItem(response);
        },
      }),
    );
  }, []);

  const renderMealRow = (name, value, color) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
            {name}
          </Text>
          <Text
            size={12}
            type={Fonts.type.base}
            style={{fontWeight: '500'}}
            color={color}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderGraph = () => {
    let totalNutrients = util.getlabelNutrientsFromMyMealFood(ingredients);
    return <NutritionGraph labelNutrients={totalNutrients} />;
  };

  const renderBarChart = () => {
    return (
      <View>
        <FlatList
          data={foodNutrients}
          renderItem={({item}) => {
            return (
              <>
                {renderMealRow(
                  item.name,
                  `${Number(item?.value).toFixed(
                    1,
                  )} ${item?.unit?.toLowerCase()}`,
                  Colors.text.blueGray,
                )}
              </>
            );
          }}
        />
      </View>
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
            Ingredients
          </Text>
        </View>
        {renderSeparator()}
        <FlatList
          data={ingredients}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <IngredientItem
                  isEdit={false}
                  item={item}
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

  const rerderSaveBtn = () => {
    return (
      <View style={{marginVertical: 30}}>
        <Button
          title="Add to nutration"
          onPress={() => {
            getFoodsForDailyNutrition(ingredients, addForm, selectedNutrion);
            navigation.pop(2);
          }}
          style={[styles.btnStyle, {}]}
        />
      </View>
    );
  };

  function handleDelete() {
    dispatch(
      deleteMyRecipeRequest({
        payloadData: {
          Id: id,
        },
        responseCallback: () => {
          setIsDeleteVisible(false);
          util.topAlert('Recipe deleted successfully');
          navigation.goBack();
        },
      }),
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition
        title={`Recipe Details`}
        ImageRightSecondSource={Images.Trash}
        ImageRightSource={Images.EditPencil}
        styleRightImageSecond={{tintColor: 'red', width: 14, height: 14}}
        styleRightImage={{tintColor: 'black'}}
        onPressImageRightSecond={() => {
          setIsDeleteVisible(true);
        }}
        onPressImageRight={() => {
          navigation.navigate('newRecipe', {
            isEdit: true,
            item: getItem,
          });
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={
            image && Object?.keys(image)?.length > 0
              ? {uri: image.url}
              : Images.dummyImage3
          }
          style={{borderRadius: 20, height: 152, width: '100%', marginTop: 14}}
        />
        <View>
          <View style={styles.detailView}>
            <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
              {name || ''}
            </Text>
            {renderSeparator()}
            {renderMealRow('Number of Serving', servingSize, Colors.text.black)}
            {renderSeparator()}
            {renderGraph()}
            {renderBarChart()}
          </View>
          {renderIngredient()}
        </View>
        {rerderSaveBtn()}
      </ScrollView>
      <ModalCancel
        title="Are you sure you want to delete?"
        actionTitle={'Delete'}
        isVisible={isDeleteVisible}
        setVisible={setIsDeleteVisible}
        setIsActive={handleDelete}
      />
    </View>
  );
}
