import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from '../Text';
import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';

export default function IngredientItem(props) {
  const navigate = useNavigation();
  const {onPressDelete, isEdit, item, onPressEdit, isDelete} = props || {};
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 0.8}}>
          {isDelete && (
            <TouchableOpacity onPress={onPressDelete} style={{paddingRight: 7}}>
              <Image
                source={Images.crossGoalIcon}
                style={{width: 14, height: 14, tintColor: 'red'}}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigate.navigate('foodDetails', {
                item,
                isFromNutrition: true,
              });
            }}>
            <Text
              size={12}
              numberOfLines={1}
              ellipsizeMode="tail"
              type={Fonts.type.base}
              style={{fontWeight: '500', lineHeight: 18}}>
              {item?.name || ''}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Text
            size={12}
            color={Colors.black}
            style={{fontWeight: '500', lineHeight: 18}}>
            {item.servingSize
              ? `${item.servingSize} ${item.servingSizeUnit}`
              : ''}{' '}
            | {item.Kcal ? `${item.Kcal} Kcal` : ''}
          </Text>
        </View>
      </View>
    </View>
  );
}
