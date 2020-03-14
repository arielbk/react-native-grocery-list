import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import ListItem, {Separator} from '../components/ListItem';
import AddItem from '../components/AddItem';

import nachos from '../assets/data/nachos';

export default () => {
  const [list, setList] = useState(nachos);
  console.log('list rendering');

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <AddItem
          onSubmitEditing={({nativeEvent: {text}}) => {
            setList([{id: uuidv4(), name: text}, ...list]);
          }}
        />
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onStarPress={() => alert(`todo: favourite ${item.name}`)}
              isStarred={index < 2}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator />}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  // return (
  //   <SafeAreaView>
  //     <ScrollView>
  //       {nachos.map((ingredient, i) => (
  //         <React.Fragment key={ingredient.id}>
  //           <Separator />
  //           <ListItem
  //             name={ingredient.name}
  //             onStarPress={() => alert(`todo: favourite ${ingredient.name}`)}
  //             isStarred={i < 2}
  //           />
  //           {i === nachos.length - 1 && <Separator />}
  //         </React.Fragment>
  //       ))}
  //     </ScrollView>
  //   </SafeAreaView>
  // );
};
