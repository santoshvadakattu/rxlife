import {
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  KeyboardAwareScrollViewComponent,
  ModalCancel,
  NutritionGraph,
  NutritionInputText,
  SeperaterView,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  deleteMealItemByIdRequest,
  getMealDetailsByIdRequest,
} from '../../redux/slicers/nutritions';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import util from '../../util';

export default function MealDetails({route}) {
  const {item, getFoodsForDailyNutrition, addForm, selectedNutrion} =
    route.params || {};

  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [selectedMeal, setSelectedMeal] = React.useState('Breakfast');
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [showBottomServing, setShowBottomServing] = useState(false);
  const [NumberofServing, setNumberofServing] = useState('1');
  const [mealItems, setMealItems] = useState({});

  //ref
  const bottomSheetRef = useRef(null);
  const snapPointsServing = useMemo(() => ['36%'], []);
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

  const {
    addFromUSDA,
    servingSize,
    servingSizeUnit,
    labelNutrients,
    image,
    allFoods,
    directions,
    foodNutrients,
    mealsFoods,
  } = mealItems || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    apiCall();
  }, []);

  async function apiCall() {
    dispatch(
      getMealDetailsByIdRequest({
        payloadData: {Id: item?.id},
        responseCallback: (status, response) => {
          console.log('response', response);
          setMealItems(response);
        },
      }),
    );
  }

  function handleDelete() {
    dispatch(
      deleteMealItemByIdRequest({
        payloadData: {Id: item?.id},
        responseCallback: (status, response) => {
          if (status) {
            navigation.goBack();
            util.topAlert('Meal Deleted Successfully', 'success');
          }
          setIsDeleteVisible(false);
        },
      }),
    );
    util.topAlert('Meal Deleted Successfully', 'success');
  }

  const renderMealRow = (name, value, color, isEdit = false) => {
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
          <View
            style={{
              flexDirection: 'row',
              gap: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              size={12}
              type={Fonts.type.base}
              style={{fontWeight: '500'}}
              color={color}>
              {value}
            </Text>

            {isEdit && (
              <TouchableOpacity
                onPress={() => {
                  setShowBottomServing(true);
                }}>
                <Image
                  source={Images.EditPencil}
                  style={{width: 14, height: 14, tintColor: Colors.black}}
                />
              </TouchableOpacity>
            )}
          </View>
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
        <NutritionGraph
          // kcal={foodNutrients
          //   ?.find((item) => item.name == 'Energy')
          //   .value.toString()}
          labelNutrients={labelNutrients || []}
        />
      </>
    );
  };

  const renderNutrients = () => {
    return (
      <View>
        <FlatList
          data={foodNutrients || []}
          renderItem={({item}) => {
            return (
              <>
                {renderMealRow(
                  item?.name,
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

  const rerderSaveBtn = () => {
    return (
      <View style={{marginVertical: 30}}>
        <Button
          title="Save"
          onPress={() => {
            getFoodsForDailyNutrition(allFoods, addForm, selectedNutrion);
            navigation.pop(2);
          }}
          style={[styles.btnStyle, {}]}
        />
      </View>
    );
  };

  const renderMealItem = () => {
    return (
      <View style={styles.shareWithView}>
        <Text size={12} style={{fontWeight: '500'}}>
          {' '}
          Meal Items
        </Text>
        <FlatList
          data={mealsFoods}
          renderItem={({item}) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text
                    size={12}
                    type={Fonts.type.base}
                    style={{flex: 0.8, fontWeight: '500'}}>
                    {item.name || ''}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                  <Text
                    size={12}
                    type={Fonts.type.base}
                    style={{fontWeight: '500'}}
                    color={Colors.black}>
                    {item.packageWeight || ''}
                  </Text>
                  <View
                    style={{
                      height: 15,
                      width: 1,
                      backgroundColor: Colors.black,
                    }}
                  />
                  <Text
                    size={12}
                    type={Fonts.type.base}
                    style={{fontWeight: '500'}}
                    color={Colors.black}>
                    {item?.Kcal || ''}
                  </Text>
                </View>
                {renderSeparator()}
              </View>
            );
          }}
        />
      </View>
    );
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
          </View>
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

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <CustomHeaderNutrition
          title={'Meal Details'}
          ImageRightSecondSource={Images.Trash}
          ImageRightSource={Images.EditPencil}
          styleRightImageSecond={{tintColor: 'red', width: 14, height: 14}}
          styleRightImage={{tintColor: 'black'}}
          onPressImageRightSecond={() => {
            setIsDeleteVisible(true);
          }}
          onPressImageRight={() => {
            navigation.navigate('createMeal', {
              id: item?.id,
              isEdit: true,
            });
          }}
        />
      </View>
      <KeyboardAwareScrollViewComponent
        style={{flexGrow: 1, flex: 1, paddingHorizontal: 20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={
              image && Object?.keys(image)?.length > 0
                ? {uri: image.url}
                : Images.dummyImage3
            }
            style={{
              borderRadius: 20,
              height: 152,
              width: '100%',
              marginTop: 14,
            }}
          />
          <View style={styles.detailView}>
            <Text size={12} type={Fonts.type.base} style={{fontWeight: '500'}}>
              {item.name || ''}
            </Text>
            {renderSeparator()}
            {renderMealRow(
              'Number of Serving',
              NumberofServing,
              Colors.text.black,
              false,
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
          {!util.isArrayEmpty(allFoods) && renderMealItem()}
          {renderDirection()}
          {/* {rerderSaveBtn()} */}
        </ScrollView>

        <ModalCancel
          title="Are you sure you want to delete?"
          actionTitle={'Delete'}
          isVisible={isDeleteVisible}
          setVisible={setIsDeleteVisible}
          setIsActive={handleDelete}
        />

        {showBottomServing && (
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            detached
            snapPoints={snapPointsServing}
            backdropComponent={renderBackdrop}
            onClose={() => setShowBottomServing(false)}
            onChange={handleSheetChanges}
            enablePanDownToClose>
            <View style={[AppStyles.padding15]}>
              <Text
                size={Fonts.size.medium}
                type={Fonts.type.base}
                style={{fontWeight: '600', lineHeight: 24}}>
                How Much?
              </Text>
              <SeperaterView />

              <BottomSheetTextInput
                placeholder="Serving Size"
                accessibilityComponentType
                accessibilityTraits
                value={NumberofServing}
                onChangeText={(text) => setNumberofServing(text)}
                style={styles.ServingSizeInput}
                keyboardType="numeric"
                clearButtonMode="while-editing"
                onSubmitEditing={() => {
                  setShowBottomServing(false);
                  console.log('onSubmitEditing');
                }}
                returnKeyType="done"
              />
              <Button
                title="Save"
                onPress={() => {
                  navigation.pop(2);
                }}
                style={[
                  styles.btnStyle,
                  {
                    marginTop: 20,
                    marginBottom: 20,
                  },
                ]}
              />
            </View>
          </BottomSheet>
        )}
      </KeyboardAwareScrollViewComponent>
    </View>
  );
}
