import React from 'react';
import {
  SafeAreaView,
  SectionList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import ListItem, {Separator, SectionHeader} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../utils/ListManager';

export default ({navigation}) => {
  const {
    list,
    isLoading,
    addItem,
    removeItem,
    addToCart,
    cart,
  } = useCurrentList();

  console.log(cart);

  const handleRowPress = item => () => {
    navigation.navigate('details', {item});
  };

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
        <SectionList
          // data={list}
          sections={[{title: 'List', data: list}, {title: 'Cart', data: cart}]}
          renderSectionHeader={({section}) => (
            <SectionHeader title={section.title} />
          )}
          renderItem={({item, index}) => (
            <ListItem
              onRowPress={handleRowPress(item)}
              name={item.name}
              onStarPress={() => alert(`todo: favourite ${item.name}`)}
              isStarred={index < 2}
              onAddedSwipe={() => addToCart(item)}
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
