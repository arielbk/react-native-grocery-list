import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="shoppingList"
          component={CurrentList}
          options={{title: 'Shopping List'}}
        />
        <Stack.Screen
          name="details"
          component={ItemDetails}
          options={({route}) => ({
            title: route.params.item.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
