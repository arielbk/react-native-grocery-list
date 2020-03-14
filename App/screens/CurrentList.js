import React from 'react';
import {Text, SafeAreaView, ScrollView} from 'react-native';
import ListItem, {Separator} from '../components/ListItem';

import nachos from '../assets/data/nachos';

export default () => {
  console.log('list rendering');
  return (
    <SafeAreaView>
      <ScrollView>
        {nachos.map((ingredient, i) => (
          <React.Fragment key={ingredient.id}>
            <Separator />
            <ListItem
              name={ingredient.name}
              onStarPress={() => alert(`todo: favourite ${ingredient.name}`)}
            />
            {i === nachos.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
