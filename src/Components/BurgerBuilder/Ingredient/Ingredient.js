import React from 'react';
import BreadTop from '../../../assets/images/top.png';
import BreadBottom from '../../../assets/images/bottom.png';
import Cheese from '../../../assets/images/cheese.png';
import Meat from '../../../assets/images/meat.png';
import Salad from '../../../assets/images/salad.png';
import './Ingrediant.css';

const Ingredient = props => {
  let ingrediants = null;
  switch (props.type) {
    case 'breadTop':
      ingrediants = <div><img src={BreadTop} alt='Top Bread' /></div>;
      break;
    case 'breadBottom':
      ingrediants = <div><img src={BreadBottom} alt='Bottom Bread' /></div>;
      break;
    case 'cheese':
      ingrediants = <div><img src={Cheese} alt='Bottom Bread' /></div>;
      break;
    case 'meat':
      ingrediants = <div><img src={Meat} alt='Bottom Bread' /></div>;
      break;
    case 'salad':
      ingrediants = <div><img src={Salad} alt='Bottom Bread' /></div>;
      break;
    default:
      ingrediants = null;
  }
  return (
    <div className='Ingredient'>
      {ingrediants}
    </div>
  )
}

export default Ingredient