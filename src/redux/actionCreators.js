import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addIngredient = igType => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: igType
  }
}

export const removeIngredient = igType => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: igType
  }
}

export const updatePurchasable = () => {
  return {
    type: actionTypes.UPDATE_PURCHASABLE,
  }
}

export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS,
  }
}

export const loadOredr = orders => {
  return {
    type: actionTypes.LOAD_OREDR,
    payload: orders,
  }
}

export const oredrLoadFaield = () => {
  return {
    type: actionTypes.OREDR_LOAD_FAIELD,
  }
}

export const fetchOrder = (token, userId) => dispatch => {
  const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
  axios.get('https://burger-builder-e6f78-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
    .then(response => {
      dispatch(loadOredr(response.data));
    })
    .catch(err => {
      dispatch(oredrLoadFaield());
    })
}