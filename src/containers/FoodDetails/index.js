import {View, Image, Dimensions, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  ModalCancel,
  NutritionGraph,
  SeperaterView,
  Text,
} from '../../components';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';
import {
  deleteMyFoodItemByIdRequest,
  getAllFoodItemByIdRequest,
  getMyFoodItemByIdRequest,
  createMyFoodRequest,
} from '../../redux/slicers/nutritions';
import util from '../../util';


export default function FoodDetails({route}) {
  const {
    item,
    getFoodsForDailyNutrition,
    addFoodInList,
    addForm,
    isFromNutrition,
    selectedmeal,
  } = route.params || {};

  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [selectedMeal, setSelectedMeal] = React.useState(
    selectedmeal ? selectedmeal : 'Breakfast',
  );
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [itemFoodDetail, setFoodItemDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(({user}) => user?.userData);
  const [allFoodsDataSearch, setAllFoodsDataSearch] = useState([]); // Add state to store fetched data
  const {
    addFromUSDA,
    foodNutrients,
    servingSize,
    servingSizeUnit,
    labelNutrients,
    image,
  } = itemFoodDetail || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    apiCall();
  }, []);
  async function apiCall() {
    setIsLoading(true);
    if (item.addFromUSDA) {
      dispatch(
        getAllFoodItemByIdRequest({
          payloadData: {
            Id: item.id,
          },
          responseCallback: (status, response) => {
            if (status) {
              console.log({response});
              setFoodItemDetails(response);
            }
            setIsLoading(false);
          },
        }),
      );
    } else {
      dispatch(
        getMyFoodItemByIdRequest({
          payloadData: {
            Id: item.id,
          },
          responseCallback: (status, response) => {
            if (status) {
              setFoodItemDetails(response);
            }
            setIsLoading(false);
          },
        }),
      );
    }
  }

  function handleDelete() {
    dispatch(
      deleteMyFoodItemByIdRequest({
        payloadData: {
          Id: item.id,
        },
        responseCallback: (status, response) => {
          if (status) {
          }
          util.topAlert('Food Deleted Successfully');
          navigation.goBack();
          setIsDeleteVisible(false);
        },
      }),
    );
  }

  //render Functions UI

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
    return (
      <>
        <NutritionGraph labelNutrients={labelNutrients || item || []} />
      </>
    );
  };

  const renderNutrients = () => {

    // Use itemFoodDetail (fetched data) instead of item (prop data) for complete nutrient info
    const dataSource = itemFoodDetail && Object.keys(itemFoodDetail).length > 0 ? itemFoodDetail : item;
    
    // Dynamically map the response keys to nutrient rows
    // Filter out object values - only include primitive values (strings, numbers, booleans)
    const nutrients = Object.entries(dataSource || {})
      .filter(([key, value]) => {
        // Skip object and array values, and skip internal fields
        return (typeof value !== 'object' || value === null) && 
               !['image', 'createdAt', 'updatedAt', 'publishedAt'].includes(key);
      })
      .map(([key, value]) => {
        // Format the key to make it more readable
        const formattedKey = key
          .replace(/_/g, ' ') // Replace underscores with spaces
          .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

        // Format the value (e.g., add units if necessary)
        let formattedValue = value;
        if (key.includes('Kcal') || key.includes('calories')) {
          formattedValue = `${value} Kcal`;
        } else if (
          key.includes('carbohydrates') ||
          key.includes('protein') ||
          key.includes('fat') ||
          key.includes('fiber') ||
          key.includes('sugar')
        ) {
          formattedValue = `${value} g`;
        } else if (
          key.includes('cholesterol') ||
          key.includes('sodium') ||
          key.includes('potassium')
        ) {
          formattedValue = `${value} mg`;
        }

        return {name: formattedKey, value: formattedValue};
      });

    return (
      <View>
        <FlatList
          data={nutrients}
          keyExtractor={(nutrient, index) => `${nutrient.name}-${index}`}
          renderItem={({item}) => {
            return (
              <>
                {renderMealRow(item.name, item.value, Colors.text.blueGray)}
              </>
            );
          }}
        />
      </View>
    );
  };

const handleSave = () => {
  console.log('=== handleSave Called ===');
  console.log('Item received:', item);
  console.log('User ID:', user?.id);

  // Map the API response to foodNutrients format
  const foodNutrients = [
    { name: 'Carbohydrates', value: item.carbohydrates_total_g || 0, unit: 'g' },
    { name: 'Cholesterol', value: item.cholesterol_mg || 0, unit: 'mg' },
    { name: 'Fat (Saturated)', value: item.fat_saturated_g || 0, unit: 'g' },
    { name: 'Total Fat', value: item.fat_total_g || 0, unit: 'g' },
    { name: 'Fiber', value: item.fiber_g || 0, unit: 'g' },
    { name: 'Potassium', value: item.potassium_mg || 0, unit: 'mg' },
    { name: 'Protein', value: item.protein_g || 0, unit: 'g' },
    { name: 'Sodium', value: item.sodium_mg || 0, unit: 'mg' },
    { name: 'Sugar', value: item.sugar_g || 0, unit: 'g' },
  ];

  // Calculate labelNutrients from foodNutrients
  const labelNutrients = foodNutrients.map((nutrient) => ({
    name: nutrient.name,
    value: nutrient.value,
  }));

  // Prepare the payload - Match your Strapi schema exactly
  const payloadData = {
    name: item.name || '',
    description: item.description || '',
    Kcal: item.calories?.toString() || '0',
    servingSize: item.serving_size_g || 0,
    servingSizeUnit: item.servingSizeUnit || 'g',
    packageWeight: item.packageWeight || '',
    foodNutrients: foodNutrients,
    labelNutrients: labelNutrients,
    isQuickAdded: false,
    user: user?.id,
  };

  console.log('=== Payload being sent ===');
  console.log(JSON.stringify(payloadData, null, 2));

  dispatch(
    createMyFoodRequest({
      payloadData,
      responseCallback: (status, response) => {
        console.log('=== API Response ===');
        console.log('Status:', status);
        console.log('Response Data:', JSON.stringify(response, null, 2));

        if (status) {
          // Extract the saved food ID - Check response structure
          const savedFoodId = response?.id || response?.data?.id;
          console.log('Saved Food ID:', savedFoodId);

          if (!savedFoodId) {
            console.error('No ID in response!');
            util.topAlert('Food saved but no ID returned');
            return;
          }

          // Create the saved food item with correct structure
          const savedFoodItem = {
            ...item,
            id: savedFoodId,
            name: response?.attributes?.name || item.name,
            description: response?.attributes?.description || item.description,
            Kcal: response?.attributes?.Kcal || item.calories,
            addFromUSDA: false,
            foodNutrients: foodNutrients,
            labelNutrients: labelNutrients,
          };
          console.log('=== Saved Food Item ===');
          console.log(JSON.stringify(savedFoodItem, null, 2));

          // Check if coming from CreateMeal or Nutrition
          if (addFoodInList) {
            console.log('Calling addFoodInList with:', savedFoodItem);
            addFoodInList(savedFoodItem, addForm);
          } else if (getFoodsForDailyNutrition) {
            console.log('Calling getFoodsForDailyNutrition with:', savedFoodItem);
            getFoodsForDailyNutrition(savedFoodItem, addForm, selectedmeal);
          }

          util.topAlert('Food saved successfully!');

          
        } else {
          console.error('Failed to save food:', response);
          util.topAlert('Failed to save food.');
        }
      },
    }),
  );
};

  const rerderSaveBtn = () => {
    return (
      <View style={{marginBottom: 30}}>
        <Button
          title="Save"
          onPress={() => {
            handleSave(); // Call the handleSave function
            navigation.pop(2);
          }}
          style={[styles.btnStyle, {}]}
        />
      </View>
    );
  };

  const renderBreakfastDropDown = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
            Meal
          </Text>
          <ButtonView
            onPress={() => setOpenDropDown(!openDropDown)}
            style={styles.breakfastView}>
            <Text
              size={12}
              type={Fonts.type.base}
              style={{fontWeight: '500'}}
              color={Colors.black}>
              {selectedMeal}
            </Text>
            <Image source={Images.dropDrop} />
          </ButtonView>
        </View>
      </View>
    );
  };

  const fetchNutritionForItem = selectedItem => {
    const {name, quantity} = selectedItem; // Extract name and quantity from the selected item
    const query = `${name}&quantity=${quantity}`; // Construct the query string

    // Placeholder for fetching nutrition data
    console.log(`Fetching nutrition data for query: ${query}`);

    // Simulate fetching data
    setTimeout(() => {
      const simulatedData = [
        {
          name: name,
          fat_total_g: 10,
          carbohydrates_total_g: 20,
          protein_g: 15,
        },
      ];

      console.log('Fetched data for selected item:', simulatedData);

      // Map the response to the current code structure
      const mappedData = simulatedData.map(item => {
        let calories = 0;

        if (item.fat_total_g && typeof item.fat_total_g === 'number') {
          calories += item.fat_total_g * 9;
        }
        if (
          item.carbohydrates_total_g &&
          typeof item.carbohydrates_total_g === 'number'
        ) {
          calories += item.carbohydrates_total_g * 4;
        }
        if (item.protein_g && typeof item.protein_g === 'number') {
          calories += item.protein_g * 4;
        }

        return {
          name: item.name,
          description: `Carbs: ${item.carbohydrates_total_g || 0}g, Fat: ${item.fat_total_g || 0}g, Protein: ${item.protein_g || 0}g`,
          calories: `${calories} Kcal`,
        };
      });

      setAllFoodsDataSearch(mappedData); // Update the state with the mapped data
      console.log('Nutrition data updated successfully.');
    }, 1000); // Simulate a 1-second delay
  };

  useEffect(() => {
    apiCall();
    if (item) {
      const selectedItem = {name: item.name, quantity: '1 serving'}; // Example quantity
      fetchNutritionForItem(selectedItem);
    }
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition
        title={` ${isFromNutrition ? 'Food Details ' : `Add ${selectedMeal}`}`}
        ImageRightSecondSource={!addFromUSDA && Images.Trash}
        ImageRightSource={!addFromUSDA && Images.EditPencil}
        styleRightImageSecond={
          !addFromUSDA && {tintColor: 'red', width: 14, height: 14}
        }
        styleRightImage={!addFromUSDA && {tintColor: 'black'}}
        onPressImageRightSecond={() => {
          !addFromUSDA && setIsDeleteVisible(true);
        }}
        onPressImageRight={() => {
          !addFromUSDA &&
            navigation.navigate('createFood', {
              item: item,
              isEdit: true,
            });
        }}
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={
            image && typeof image === 'object' && image.url
              ? {uri: image.url}
              : item?.image && typeof item.image === 'object' && item.image.url
              ? {uri: item.image.url}
              : Images.dummyImage3
          }
          style={{borderRadius: 20, height: 152, width: '100%', marginTop: 14}}
        />
        <View style={styles.detailView}>
          <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
            {itemFoodDetail?.name || item?.name || ''}
          </Text>
          {!isFromNutrition && renderBreakfastDropDown()}
          {renderSeparator()}
          {renderMealRow(
            'Serving Size Unit',
            servingSizeUnit || '',
            Colors.text.black,
          )}
          {renderSeparator()}
          {renderMealRow(
            'Serving size',
            servingSize || `${itemFoodDetail?.serving_size_g || item?.serving_size_g || '0'} g`,
            Colors.text.black,
          )}
          {renderSeparator()}
          {renderGraph()}
          {renderNutrients()}
          {openDropDown && (
            <View style={styles.dropDrowView}>
              <FlatList
                data={['Breakfast', 'Lunch', 'Snacks', 'Dinner']}
                renderItem={({item}) => {
                  return (
                    <ButtonView
                      onPress={() => {
                        setOpenDropDown(false);
                        setSelectedMeal(item);
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
        {!isFromNutrition && rerderSaveBtn()}
      </ScrollView>
      )}
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
