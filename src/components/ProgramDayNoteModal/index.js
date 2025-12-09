import {View, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Colors, Fonts, Images} from '../../theme';
import Text from '../Text';
import styles from './styles';

export default function ProgramDayNoteModal(props) {
  const {
    title,
    actionTitle,
    isVisible,
    setVisible,
    setIsActive = () => {},
    children,
  } = props;
  const [addNote, setAddNote] = useState('');
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
          style={[styles.tilteTxt]}>
          Note
        </Text>
        <TextInput
          value={addNote}
          placeholder={'Add Note'}
          placeholderTextColor={'rgba(55, 55, 55, 0.2)'}
          onChangeText={(text) => {
            setAddNote(text);
          }}
          multiline
          style={{
            borderColor: 'rgba(55, 55, 55, 0.2)',
            borderRadius: 12,
            borderWidth: 1,
            height: 184,
            padding: 20,
            paddingTop: 20,
            textAlignVertical: 'top',
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 25,
            paddingBottom: 10,
            alignSelf: 'center',
            gap: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={styles.btnView}>
            <Text
              type={Fonts.type.base}
              color={Colors.white}
              size={Fonts.size.xSmall}
              style={{fontWeight: '500'}}>
              DISCARD
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
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
