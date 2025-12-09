// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {MessageBar} from './components';
import configureStore from './store';
import AppStyles from './theme/AppStyles';
import Navigator from './navigator';
import {NavigationContainer} from '@react-navigation/native';
import DataHandler from './services/DataHandler';
import ForegroundNotification from './firebase/ForegroundNotification';
import Orientation from 'react-native-orientation-locker';

import {
  notificationSerivces,
  requestUserPermission,
} from './firebase/PushNotification';
const reducers = require('./redux/slicers').default;

// applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    // requestUserPermission();
    // notificationSerivces();
  }

  componentDidMount() {
    requestUserPermission();
    notificationSerivces();
    DataHandler.setStore(this.state.store);
    Orientation.lockToPortrait();
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={[AppStyles.flex, {backgroundColor: 'white'}]}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'rgba(255,255,255,0.0)'}
        />
        <ForegroundNotification />
        <Provider store={this.state.store}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </Provider>
        <MessageBar />
      </View>
    );
  }
}
