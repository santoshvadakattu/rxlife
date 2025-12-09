import {Image, View} from 'react-native';
import React from 'react';
import Text from '../Text';
import {Colors, Fonts, Images} from '../../theme';
import ButtonView from '../ButtonView';
import SeperaterView from '../SeperaterView';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants';

export default function WaterItem() {
  const navigate = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text
            size={Fonts.size.xxxxxSmall}
            type={Fonts.type.base}
            color={Colors.text.blueGray}
            style={{fontWeight: '400', lineHeight: 15}}>
            Water
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              size={Fonts.size.xxxSmall}
              type={Fonts.type.base}
              style={{
                fontWeight: '500',
                lineHeight: 18,
              }}>
              750 ml
            </Text>
            <ButtonView
              onPress={() => {
                navigate.navigate(SCREENS.NUTRITION.addWater);
              }}
              style={{
                width: 20,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={Images.EditPencil} style={{tintColor: 'black'}} />
            </ButtonView>
          </View>
        </View>
      </View>
    </>
  );
}
