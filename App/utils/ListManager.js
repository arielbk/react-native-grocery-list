import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {v4 as uuidv4} from 'uuid';

const updateStoredCurrentList = list => {
  AsyncStorage.setItem('GroceryList/currentList', JSON.stringify(list));
};
const updateStoredCartList = list => {
  AsyncStorage.setItem('GroceryList/currentCart', JSON.stringify(list));
};

export const useCurrentList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [cart, setCart] = useState([]);

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

  const addToCart = item => {
    const newList = [item, ...cart];
    setCart(newList);
    updateStoredCartList(newList);
    removeItem(item.id);
  };

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('GroceryList/currentList'),
      AsyncStorage.getItem('GroceryList/currentCart'),
    ])
      .then(([listItems, cartItems]) => [
        JSON.parse(listItems),
        JSON.parse(cartItems),
      ])
      .then(([listItems, cartItems]) => {
        if (listItems) {
          setList(listItems);
        }
        if (cartItems) {
          setCart(cartItems);
        }
        setIsLoading(false);
      });
  }, []);

  return {
    list,
    isLoading,
    addItem,
    removeItem,
    addToCart,
    cart,
  };
};
