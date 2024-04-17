import * as actionTypes from './actionTypes';

const INGREDIENT_PRICES = {
  salad: 20,
  cheese: 40,
  meat: 100
}

const INITIAL_STATE = {
  ingredients: [
    { type: 'cheese', amount: 0 },
    { type: 'salad', amount: 0 },
    { type: 'meat', amount: 0 }
  ],
  totalPrice: 80,
  purchasable: false,
}

export const reducer = (state = INITIAL_STATE, action) => {
  const ingredients = [...state.ingredients];
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      for (let item of ingredients) {
        if (item.type === action.payload) item.amount++;
      }
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
      }

    case actionTypes.REMOVE_INGREDIENT:
      for (let item of ingredients) {
        if (item.type === action.payload) {
          if (item.amount === 0) {
            return state;
          }
          item.amount--;
        }
      }
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
      }

    case actionTypes.UPDATE_PURCHASABLE:
      const sum = ingredients.reduce((sum, element) => {
        return sum + element.amount;
      }, 0);
      return {
        ...state,
        purchasable: sum > 0
      }
    case actionTypes.RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          { type: 'cheese', amount: 0 },
          { type: 'salad', amount: 0 },
          { type: 'meat', amount: 0 }
        ],
        totalPrice: 80,
        purchasable: false,
      }
    default:
      return state;
  }
}