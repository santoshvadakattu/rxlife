import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import {SCREENS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

export default function DiscoverItem(props) {
  const {item, onPressIcon, style, selectedNutrion} = props;
  console.log('selectedNutrion', selectedNutrion);

  const navigate = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate(SCREENS.NUTRITION.foodDetails, {
          item,
          isFromNutrition: true,
          selectedmeal: selectedNutrion,
        });
      }}
      style={[{width: 162, height: 152, marginRight: 10}, style]}>
      <ImageBackground
        style={{
          width: 162,
          height: 152,
          borderRadius: 20,
          overflow: 'hidden',
        }}
        imageStyle={[{width: 162, height: 152}]}
        source={false ? {uri: item.image} : Images.dummyImage3}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.LinearView}>
        <View style={styles.desView}>
          <View>
            <Text
              size={14}
              type={Fonts.type.base}
              numberOfLines={1}
              color={Colors.white}
              style={{fontsWeight: '500', lineHeight: 21}}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                size={10}
                type={Fonts.type.base}
                color={Colors.white}
                style={{fontsWeight: '500', lineHeight: 15}}>
                {Number(item.Kcal).toFixed(0)} Kcal
              </Text>
              <TouchableOpacity
                onPress={onPressIcon}
                style={{
                  height: 20,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{tintColor: 'white'}}
                  source={Images.NutritionPlus}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
