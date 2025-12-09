import {View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {
  Button,
  CustomHeaderNutrition,
  NutritionDropDown,
  NutritionInputText,
} from '../../components';
import {useNavigation} from '@react-navigation/native';

export default function Units() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [distance, setDistance] = useState('');
  const [energy, setEnergy] = useState('');
  const [water, setWater] = useState('');

  const weightRef = useRef(null);
  const heightRef = useRef(null);
  const distanceRef = useRef(null);
  const energyRef = useRef(null);
  const waterRef = useRef(null);

  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Units'} />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <NutritionInputText
            value={weight}
            keyboardType="numeric"
            placeholderText={'Weight: Kilogram'}
            onChangeText={(text) => setWeight(text)}
            mainViewStyle={{marginTop: 10}}
            inputRef={weightRef}
            inputOnSubmitEditing={() => heightRef.current.focus()}
          />
          <NutritionInputText
            value={height}
            keyboardType="numeric"
            placeholderText={'Height: Feet/inches'}
            onChangeText={(text) => setHeight(text)}
            mainViewStyle={{marginTop: 10}}
            inputRef={heightRef}
            inputOnSubmitEditing={() => distanceRef.current.focus()}
          />
          <NutritionInputText
            value={distance}
            keyboardType="numeric"
            placeholderText={'Distance: kilometers'}
            onChangeText={(text) => setDistance(text)}
            mainViewStyle={{marginTop: 10}}
            inputRef={distanceRef}
            inputOnSubmitEditing={() => energyRef.current.focus()}
          />
          <NutritionInputText
            value={energy}
            keyboardType="numeric"
            placeholderText={'Energy: Calories'}
            onChangeText={(text) => setEnergy(text)}
            mainViewStyle={{marginTop: 10}}
            inputRef={energyRef}
            inputOnSubmitEditing={() => waterRef.current.focus()}
          />
          <NutritionInputText
            value={water}
            keyboardType="numeric"
            placeholderText={'Water: Milliliters'}
            onChangeText={(text) => setWater(text)}
            mainViewStyle={{marginTop: 10}}
            inputRef={waterRef}
            inputOnSubmitEditing={() => navigate.goBack()}
          />
        </View>
        <Button
          title="Save"
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
