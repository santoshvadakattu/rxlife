/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
console.warn = () => {};
AppRegistry.registerComponent(appName, () => App);
