import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import _ from 'lodash';
import {useSelector} from 'react-redux';
import AuthNavigate from './AuthNavigate';
import HomeNavigate from './HomeNavigate';
import SplashScreen from 'react-native-splash-screen';
import {SCREENS} from '../constants';

const Navigator = () => {
  SplashScreen.hide();

  const Stack = createStackNavigator();
  const {forLoginToken} = useSelector((state) => state.user);

  return (
    <Stack.Navigator>
      {forLoginToken ? (
        <Stack.Screen
          name={SCREENS.auth}
          component={HomeNavigate}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name={SCREENS.unAuth}
          component={AuthNavigate}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
