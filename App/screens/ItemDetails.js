import React from 'react';
import {View, Text} from 'react-native';
export default ({route}) => (
  <View>
    <Text>{route.params.item.name}</Text>
  </View>
);
