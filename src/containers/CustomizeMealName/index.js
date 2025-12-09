import {View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  NutritionInputText,
  Text,
} from '../../components';
import {Colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';

export default function CustomizeMealName() {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Customize Meal Name'} />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <FlatList
            data={['Breakfast', 'Lunch', 'Dinner', 'Snacks']}
            renderItem={({item}) => {
              return (
                <NutritionInputText
                  placeholderText={item}
                  value={item}
                  // onChangeText={setTotalVolume}
                />
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigate.pop(2);
            }}
            style={styles.newMealView}>
            <Text
              size={12}
              color={Colors.background.primary}
              style={{fontWeight: '500'}}>
              Add New Meal
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title={'Save'}
          onPress={() => {
            navigate.goBack();
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
    </View>
  );
}
