import {View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  KeyboardAwareScrollViewComponent,
  NutritionInputText,
  Text,
} from '../../components';
import {Colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';

export default function AddWater() {
  const [totalVolume, setTotalVolume] = useState(0);
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Log your water intake'} />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <KeyboardAwareScrollViewComponent>
          <NutritionInputText
            placeholderText={'Total Volume'}
            value={totalVolume}
            onChangeText={setTotalVolume}
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              marginTop: 20,
              gap: 10,
            }}>
            <ButtonView
              onPress={() => {
                let ml = 250;
                let addmltotel = parseInt(totalVolume) + parseInt(ml);
                console.log({addmltotel});
                setTotalVolume(addmltotel.toString());
              }}
              style={styles.btnView}>
              <Text size={12} color={Colors.background.primary}>
                250 ml
              </Text>
            </ButtonView>
            <ButtonView
              onPress={() => {
                let ml = 500;
                let addmltotel = parseInt(totalVolume) + ml;
                setTotalVolume(addmltotel.toString());
              }}
              style={styles.btnView}>
              <Text size={12} color={Colors.background.primary}>
                500 ml
              </Text>
            </ButtonView>
            <ButtonView
              onPress={() => {
                let ml = 1000;
                let addmltotel = parseInt(totalVolume) + ml;
                setTotalVolume(addmltotel.toString());
              }}
              style={styles.btnView}>
              <Text size={12} color={Colors.background.primary}>
                1000 ml
              </Text>
            </ButtonView>
          </View>
        </KeyboardAwareScrollViewComponent>
        <Button
          title="Save"
          onPress={() => {
            navigate.goBack();
          }}
          style={[styles.btnStyle]}
        />
      </View>
    </View>
  );
}
