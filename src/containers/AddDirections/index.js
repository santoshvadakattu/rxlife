import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  CustomHeaderNutrition,
  KeyboardAwareScrollViewComponent,
  NutritionInputText,
} from '../../components';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../theme';

export default function AddDirections({route}) {
  const {addDirection, directionsValue} = route.params;
  const [directions, setDirections] = useState(directionsValue);
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title="Add Direction" />
      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        containerStyle={styles.contentWrapper}
        style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <NutritionInputText
            placeholderText={'Type here...'}
            value={directions}
            onChangeText={setDirections}
            multiline={true}
            maxLength={1000}
            containStyle={{
              height: 184,
              padding: 20,
              paddingTop: 20,
              textAlignVertical: 'top',
            }}
          />
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontSize: 12,
              fontFamily: Fonts.type.base,
            }}>
            {directions.length} / 1000
          </Text>
        </View>
      </KeyboardAwareScrollViewComponent>
      <Button
        onPress={() => {
          addDirection(directions);
          navigate.goBack();
        }}
        title={directionsValue ? 'Edit' : 'Add'}
        style={styles.btnStyle}
      />
    </View>
  );
}
