import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import styles from './styles';

export default function ModalCancel(props) {
  const {
    title,
    actionTitle,
    isVisible,
    setVisible,
    setIsActive = () => {},
    children,
  } = props;
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      transparent={true}
      onBackdropPress={() => {
        setVisible(false);
      }}>
      <View style={styles.cancelModal}>
        <Text
          type={Fonts.type.base}
          color={Colors.black}
          style={[styles.tilteTxt, {marginTop: 49}]}>
          {title}
        </Text>
        {children}
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
            marginTop: 25,
            paddingBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsActive();
            }}
            style={styles.btnView}>
            <Text
              type={Fonts.type.base}
              color={Colors.white}
              size={Fonts.size.xSmall}
              style={{fontWeight: '500'}}>
              {actionTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={[
              styles.btnView,
              {backgroundColor: Colors.background.primary},
            ]}>
            <Text
              type={Fonts.type.base}
              color={Colors.white}
              size={Fonts.size.xSmall}
              style={{fontWeight: '500'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
