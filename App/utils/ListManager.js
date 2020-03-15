import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {v4 as uuidv4} from 'uuid';

const updateStoredCurrentList = list => {
  AsyncStorage.setItem('GroceryList/currentList', JSON.stringify(list));
};

export const useCurrentList = () => {
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

  return {
    list,
    isLoading,
    addItem,
    removeItem,
  };
};
