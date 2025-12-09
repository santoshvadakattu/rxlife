import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import styles from './styles';
import SeperaterView from '../SeperaterView';
import ButtonView from '../ButtonView';

export default function ExerciseModal(props) {
  const {isVisible, setVisible, StrengthOnPress, CardiovascularOnPress} = props;
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      transparent={true}
      onBackdropPress={() => {
        setVisible(false);
      }}>
      <View style={styles.contain}>
        <Text
          type={Fonts.type.base}
          color={Colors.black}
          size={16}
          style={[styles.tilteTxt, {}]}>
          Exercises
        </Text>

        <SeperaterView />
        <ButtonView onPress={CardiovascularOnPress}>
          <Text
            type={Fonts.type.base}
            color={Colors.text.blueGray}
            size={12}
            style={{fontWeight: '400', lineHeight: 18, marginTop: 10}}>
            Cardiovascular
          </Text>
        </ButtonView>
        <SeperaterView />
        <ButtonView onPress={StrengthOnPress}>
          <Text
            type={Fonts.type.base}
            color={Colors.text.blueGray}
            size={12}
            style={{fontWeight: '400', lineHeight: 18, marginTop: 10}}>
            Strength
          </Text>
        </ButtonView>
      </View>
    </Modal>
  );
}
