import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import { Routes, Route } from 'react-router-dom';
import Orders from './Orders/Orders';
import CheckOut from './Orders/CheckOut';

const MainComponent = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<BurgerBuilder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/checkout' element={<CheckOut />} />
      </Routes>
    </div>
  )
}

export default MainComponent