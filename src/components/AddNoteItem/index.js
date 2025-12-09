import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Text from '../Text';
import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
export default function AddNoteItem(props) {
  const {name} = props;
  const navigate = useNavigation();

  return (
    <View
      style={{
        height: 142,
        marginTop: 10,
      }}>
      <View style={styles.titleView}>
        <View style={styles.titleIconView}>
          <Text
            size={14}
            type={Fonts.type.bold}
            style={{fontWeight: '500', lineHeight: 21}}>
            {name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate('addNote', {
                isEdit: true,
              });
            }}
            style={styles.iconView}>
            <Image
              style={{width: 8, height: 8, tintColor: Colors.black}}
              source={Images.EditPencil}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.triangle} />
      </View>
      <View style={styles.container}>
        <Text
          size={12}
          type={Fonts.type.base}
          ellipsizeMode="tail"
          numberOfLines={5}
          style={{fontWeight: '400', lineHeight: 18}}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virgini. it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virgini.
        </Text>
      </View>
    </View>
  );
}
