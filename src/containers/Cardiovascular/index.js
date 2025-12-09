import {View, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Button,
  ButtonView,
  CustomHeaderNutrition,
  ExerciseItem,
  SearchBar,
  SearchInput,
  Text,
} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';

export default function Cardiovascular() {
  const [text, setSearchText] = useState('');
  const [header, setHeader] = useState('My Exercises');
  const navigate = useNavigation();

  const renderSearch = () => {
    return (
      <View style={{marginTop: 10}}>
        <SearchInput
          setText={setSearchText}
          text={text}
          placeholder={'Search for an Exercise'}
        />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.nutritionHeader}>
        <FlatList
          data={['My Exercises', 'History', 'Browse All']}
          horizontal
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
          renderItem={({item}) => {
            return (
              <ButtonView
                onPress={() => setHeader(item)}
                style={[header == item && styles.btnNutritionItem]}>
                <Text
                  size={Fonts.size.xxxSmall}
                  type={Fonts.type.base}
                  color={
                    header == item
                      ? Colors.background.primary
                      : Colors.text.blueGray
                  }
                  style={{fontWeight: '500'}}>
                  {item}
                </Text>
              </ButtonView>
            );
          }}
        />
      </View>
    );
  };

  const renderExercisesListing = () => {
    return (
      <View style={styles.listingView}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            return <ExerciseItem />;
          }}
        />
      </View>
    );
  };

  const renderHistory = () => {
    return (
      <View style={styles.listingView}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            return <ExerciseItem />;
          }}
        />
      </View>
    );
  };

  const renderBrowseAll = () => {
    return (
      <View style={styles.listingView}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            return <ExerciseItem />;
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNutrition title={'Cardiovascular'} />
      {renderSearch()}
      {renderHeader()}

      {header == 'My Exercises' && (
        <>
          {renderExercisesListing()}
          <Button
            title="Create an Exercise"
            onPress={() => {
              navigate.navigate('createExercise');
            }}
            style={{
              height: 45,
              padding: 0,
              marginTop: 0,
              borderRadius: 6,
              marginBottom: 30,
            }}
          />
        </>
      )}
      {header == 'History' && renderHistory()}
      {header == 'Browse All' && renderBrowseAll()}
    </View>
  );
}
