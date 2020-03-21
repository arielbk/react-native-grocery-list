import React from 'react';
import {
  Animated,
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

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
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'center',
  },
  rightAction: {
    flex: 1,
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
  sectionContainer: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
  },
  sectionText: {
    fontWeight: '600',
  },
});

export const Separator = () => <View style={styles.separator} />;

const LeftActions = (progress, dragX) => {
  const opacity = dragX.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.2, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, {opacity}]}>
        Add to cart
      </Animated.Text>
    </View>
  );
};

const RightActions = (progress, dragX) => {
  const opacity = dragX.interpolate({
    inputRange: [-100, -50, 0],
    outputRange: [1, 0.2, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.rightAction}>
      <Animated.Text style={[styles.actionText, {opacity}]}>
        Delete
      </Animated.Text>
    </View>
  );
};

export const SectionHeader = ({title}) => (
  <View style={[styles.container, styles.sectionContainer]}>
    <Text style={styles.sectionText}>{title}</Text>
  </View>
);

const ListItem = ({
  name,
  onStarPress,
  isStarred,
  onAddedSwipe,
  onDeleteSwipe,
  onRowPress,
}) => {
  const starIcon = Platform.select({
    ios: isStarred ? 'ios-star' : 'ios-star-outline',
    android: isStarred ? 'md-star' : 'ios-star-ourline',
  });

  return (
    <Swipeable
      renderLeftActions={onAddedSwipe && LeftActions}
      renderRightActions={onDeleteSwipe && RightActions}
      onSwipeableLeftOpen={onAddedSwipe}
      onSwipeableRightOpen={onDeleteSwipe}>
      <TouchableOpacity onPress={() => onRowPress(name)}>
        <View style={styles.container}>
          <Text style={styles.text}>{name}</Text>
          {onStarPress && (
            <TouchableOpacity onPress={onStarPress}>
              <Icon
                name={starIcon}
                size={30}
                color={isStarred ? '#FFCC01' : '#bbb'}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ListItem;
