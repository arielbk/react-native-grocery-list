import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#696969',
  },
  icon: {
    height: 30,
    tintColor: '#696969',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export const Separator = () => <View style={styles.separator} />;

const ListItem = ({name, onStarPress}) => {
  console.log('render list item');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      {onStarPress && (
        <TouchableOpacity onPress={onStarPress}>
          <Image
            source={require('../assets/icons/star.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListItem;
