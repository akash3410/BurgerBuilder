import React from 'react'
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css';

const Burger = props => {
  let ingredientsArr = props.ingredients.map(item => {
    let amountArr = [...Array(item.amount).keys()];
    return amountArr.map(_ => {
      return <Ingredient type={item.type} key={Math.random()} />
    })
  }).reduce((arr, element) => {
    return arr.concat(element)
  }, []);

  if (ingredientsArr.length === 0) {
    ingredientsArr = <p>Please add some ingredients</p>
  }
  return (
    <div className='Burger'>
      <Ingredient type='breadTop' />
      {ingredientsArr}
      <Ingredient type='breadBottom' />
    </div>
  )
}

export default Burger