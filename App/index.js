import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './navigation';
import SplashScreen from 'react-native-splash-screen';

export default () => {
  useEffect(() => SplashScreen.hide(), []);
  return <Navigation />;
};
