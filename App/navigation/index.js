import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import FavouritesList from '../screens/FavouritesList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeListStack = () => (
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
);

const FavouritesListStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="shoppingList"
      component={FavouritesList}
      options={{title: 'Favourites'}}
    />
  </Stack.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = Platform.select({
                ios: 'ios-home',
                android: 'md-home',
              });
            }
            if (route.name === 'Favourites') {
              iconName = Platform.select({
                ios: focused ? 'ios-star' : 'ios-star-outline',
                android: focused ? 'md-star' : 'md-star-outline',
              });
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeListStack} />
        <Tab.Screen name="Favourites" component={FavouritesListStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
