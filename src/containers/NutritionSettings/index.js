import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  SeperaterView,
  Text,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {Switch} from 'react-native-switch';
import {useNavigation} from '@react-navigation/native';

export default function NutritionSettings() {
  const [nutritionHeader, setNritionHeader] = useState('Nutrition');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isSwitch, setIsSwitch] = useState(false);
  const [isSwitchInsight, setIsSwitchInsight] = useState(false);
  const [isSwitchNutrition, setIsSwitchNutrition] = useState(false);
  const [isSwitchFood, setIsSwitchFood] = useState(false);
  const [remindersArrray, setRemindersArray] = useState([
    {
      name: 'Breakfast',
      isSwitch: false,
      time: '10:06 am',
    },
    {
      name: 'Lunch',
      isSwitch: false,
      time: '10:06 am',
    },
    {
      name: 'Dinner',
      isSwitch: false,
      time: '10:06 am',
    },
  ]);

  const navigate = useNavigation();

  function switchChange(value, index) {
    let array = remindersArrray;
    array[index].isSwitch = value;
    setRemindersArray([...array]);
  }

  //header Nutrition and Reminders
  const renderNutritionHeader = () => {
    return (
      <View style={styles.nutritionHeader}>
        <ButtonView
          onPress={() => setNritionHeader('Nutrition')}
          style={[nutritionHeader == 'Nutrition' && styles.btnNutritionItem]}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={
              nutritionHeader == 'Nutrition'
                ? Colors.background.primary
                : Colors.text.blueGray
            }
            style={{fontWeight: '500'}}>
            Nutrition
          </Text>
        </ButtonView>
        <ButtonView
          onPress={() => setNritionHeader('Reminders')}
          style={[nutritionHeader == 'Reminders' && styles.btnNutritionItem]}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={
              nutritionHeader == 'Reminders'
                ? Colors.background.primary
                : Colors.text.blueGray
            }
            style={{fontWeight: '500'}}>
            Reminders
          </Text>
        </ButtonView>
      </View>
    );
  };

  //Nutrition Details
  const renderItemDetails = (name, isSwitch, setIsSwitch) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
        }}>
        <Text size={12} style={{fontWeight: '500', lineHeight: 17}}>
          {name}
        </Text>
        <ButtonView
          style={{
            borderWidth: 1,
            borderColor: isSwitch
              ? Colors.background.primary
              : Colors.text.primary,
            backgroundColor: isSwitch
              ? Colors.background.primary
              : Colors.white,
            height: 18,
            width: 18,
            borderRadius: 6,
            ...AppStyles.centerInner,
          }}
          onPress={() => setIsSwitch(!isSwitch)}>
          {isSwitch && (
            <Image
              source={Images.Check}
              style={{tintColor: Colors.white, height: 9, width: 12}}
            />
          )}
        </ButtonView>
      </View>
    );
  };

  const renderNutritonDetails = () => {
    return (
      <View style={styles.nutritionDetails}>
        {renderItemDetails(
          'Show Nutrition food insight',
          isSwitchInsight,
          setIsSwitchInsight,
        )}
        <SeperaterView />
        {renderItemDetails(
          'Always show water in Nutrition',
          isSwitchNutrition,
          setIsSwitchNutrition,
        )}
        <SeperaterView />
        <TouchableOpacity
          onPress={() => {
            navigate.navigate('customizeMealName');
          }}>
          <Text
            size={12}
            style={{fontWeight: '500', lineHeight: 17, marginTop: 10}}>
            Customize Meal Name
          </Text>
        </TouchableOpacity>
        <SeperaterView />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            size={12}
            style={{fontWeight: '500', lineHeight: 17, marginTop: 10}}>
            Nutrition Sharing
          </Text>
          <Text
            size={12}
            style={{fontWeight: '500', lineHeight: 17, marginTop: 10}}>
            Public
          </Text>
        </View>
        <SeperaterView />
        <Text
          size={12}
          style={{fontWeight: '500', lineHeight: 17, marginTop: 10}}>
          Search Settings
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text
            size={12}
            style={{fontWeight: '500', lineHeight: 17, marginTop: 10}}>
            Default Search Tabs
          </Text>
          <Text
            size={12}
            style={{fontWeight: '500', lineHeight: 17, marginTop: 10}}>
            All
          </Text>
        </View>
        <SeperaterView />
        {renderItemDetails(
          'Show All Foods in Lists',
          isSwitchFood,
          setIsSwitchFood,
        )}
      </View>
    );
  };

  const renderEditGoals = () => {
    return (
      <ButtonView
        onPress={() => {
          navigate.navigate('editGoals');
        }}
        style={styles.nutritionDetails}>
        <Text size={12} style={{fontWeight: '500', lineHeight: 17}}>
          Edit Goals
        </Text>
      </ButtonView>
    );
  };

  const renderUnit = () => {
    return (
      <ButtonView
        onPress={() => {
          navigate.navigate('units');
        }}
        style={styles.nutritionDetails}>
        <Text size={12} style={{fontWeight: '500', lineHeight: 17}}>
          Units
        </Text>
      </ButtonView>
    );
  };

  //Reminders

  const renderReminders = () => {
    return (
      <View style={styles.nutritionDetails}>
        <FlatList
          data={remindersArrray}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View>
                    <Text
                      size={Fonts.size.xxxxxSmall}
                      type={Fonts.type.base}
                      color={Colors.text.blueGray}
                      style={{fontWeight: '400', lineHeight: 15}}>
                      {item?.time}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        size={Fonts.size.xxxSmall}
                        type={Fonts.type.base}
                        style={{
                          fontWeight: '500',
                          lineHeight: 18,
                        }}>
                        {item.name}
                      </Text>
                      <ButtonView
                        onPress={() => {
                          navigate.navigate('addReminders', {
                            isEdit: true,
                          });
                        }}
                        style={{
                          width: 30,
                          height: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={Images.EditPencil}
                          style={{tintColor: 'black'}}
                        />
                      </ButtonView>
                    </View>
                  </View>
                  <Switch
                    value={item.isSwitch}
                    onValueChange={(value) => {
                      setIsSwitch(value);
                      switchChange(value, index);
                    }}
                    backgroundActive={'#dcd4c8'}
                    circleActiveColor={Colors.background.primary}
                    circleBorderActiveColor={Colors.background.primary}
                    backgroundInactive={'#dcd4c8'}
                    renderActiveText={false}
                    renderInActiveText={false}
                    circleBorderWidth={0}
                    barHeight={20}
                    circleSize={18}
                    circleInActiveColor={Colors.black}
                    circleBorderInactiveColor={Colors.black}
                  />
                </View>
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
      <CustomHeaderNutrition title="Nutrition Settings" />
      <View style={{flex: 1}}>
        {renderNutritionHeader()}
        {nutritionHeader == 'Nutrition' && (
          <>
            {renderNutritonDetails()}
            {renderEditGoals()}
            {renderUnit()}
          </>
        )}
        {nutritionHeader == 'Reminders' && (
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            {renderReminders()}
            <Button
              title="Add Reminder"
              onPress={() => {
                navigate.navigate('addReminders');
              }}
              style={{
                height: 45,
                padding: 0,
                marginTop: 0,
                borderRadius: 6,
                marginBottom: 30,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
