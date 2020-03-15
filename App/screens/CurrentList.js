import React from 'react';
import {
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import ListItem, {Separator} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../utils/ListManager';

export default () => {
  const {list, isLoading, addItem, removeItem} = useCurrentList();

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
