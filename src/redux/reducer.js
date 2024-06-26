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
  orders: [],
  orderErr: false,
  orderLoading: true,
  token: null,
  userId: null,
  authLoading: false,
  authFailedMsg: null
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
    case actionTypes.LOAD_OREDR:
      let orders = [];
      for (let key in action.payload) {
        orders.push({
          ...action.payload[key],
          id: key,
        })
      }
      return {
        ...state,
        orders: orders,
        orderLoading: false,
      }
    case actionTypes.OREDR_LOAD_FAIELD:
      return {
        ...state,
        orderErr: true,
        orderLoading: false,
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        authFailedMsg: null,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        authFailedMsg: null,
        token: null,
        userId: null
      }
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authFailedMsg: null,
        authLoading: action.payload
      }
    case actionTypes.AUTH_FAIELD:
      return {
        ...state,
        authFailedMsg: action.payload,
        authLoading: false
      }
    default:
      return state;
  }
}

//#2B2D2B youtube on Dark Theme