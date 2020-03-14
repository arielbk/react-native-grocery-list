import React from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export const Separator = () => <View style={styles.separator} />;

const ListItem = ({name, onStarPress, isStarred}) => {
  console.log('render list item');
  const starIcon = isStarred
    ? require('../assets/icons/star-filled.png')
    : require('../assets/icons/star-outline.png');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      {onStarPress && (
        <TouchableOpacity onPress={onStarPress}>
          <Image source={starIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListItem;
