import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

export default function Welcome() {
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate.navigate('login')}>
        <Text>Welcome</Text>
      </TouchableOpacity>
    </View>
  );
}
