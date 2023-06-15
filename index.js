/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {TextEncoder, TextDecoder} from 'text-encoding-utf-8';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

AppRegistry.registerComponent(appName, () => App);