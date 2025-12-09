import {FlatList, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  AddNoteItem,
  Button,
  ButtonView,
  CustomHeaderNutrition,
  Text,
} from '../../components';
import {Colors, Fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

export default function AddNoteList() {
  const [isFood, setIsFood] = useState(true);
  const navigate = useNavigation();

  const renderHeadFood = () => {
    return (
      <View style={styles.headView}>
        <ButtonView
          onPress={() => setIsFood(true)}
          style={[isFood && styles.NotesBtns]}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={isFood ? Colors.background.primary : Colors.text.blueGray}
            style={{fontWeight: '500'}}>
            Food
          </Text>
        </ButtonView>
        <ButtonView
          onPress={() => setIsFood(false)}
          style={[!isFood && styles.NotesBtns]}>
          <Text
            size={Fonts.size.xxxSmall}
            type={Fonts.type.base}
            color={!isFood ? Colors.background.primary : Colors.text.blueGray}
            style={{fontWeight: '500'}}>
            Exercise
          </Text>
        </ButtonView>
      </View>
    );
  };

  const renderBtn = () => {
    return (
      <View style={{marginVertical: 10, marginBottom: 30}}>
        <Button
          title="Add New Note"
          onPress={() => {
            navigate.navigate('addNote');
          }}
          style={[styles.btnStyle, {}]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Add Note'} />
      {renderHeadFood()}
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        contentContainerStyle={{paddingBottom: 20, flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return <AddNoteItem name={`${isFood ? 'Food' : 'Exercise'} Note`} />;
        }}
      />
      {renderBtn()}
    </View>
  );
}
