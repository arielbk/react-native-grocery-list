import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import ListItem, {Separator} from '../components/ListItem';
import AsyncStorage from '@react-native-community/async-storage';
import AddItem from '../components/AddItem';

const updateStoredCurrentList = list => {
  AsyncStorage.setItem('GroceryList/currentList', JSON.stringify(list));
};

export default () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const addItem = ({nativeEvent: {text}}) => {
    const newList = [{id: uuidv4(), name: text}, ...list];
    setList(newList);
    updateStoredCurrentList(newList);
  };

  const removeItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    updateStoredCurrentList(newList);
  };

  useEffect(() => {
    AsyncStorage.getItem('GroceryList/currentList')
      .then(data => JSON.parse(data))
      .then(data => {
        if (data) {
          setList(data);
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <AddItem onSubmitEditing={addItem} />
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onStarPress={() => alert(`todo: favourite ${item.name}`)}
              isStarred={index < 2}
              onAddedSwipe={() => removeItem(item.id)}
              onDeleteSwipe={() => removeItem(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator />}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
