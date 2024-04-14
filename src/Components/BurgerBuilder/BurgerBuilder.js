import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from './Summary/Summary';
import { Navigate } from 'react-router-dom';

const INGREDIENT_PRICES = {
  salad: 20,
  cheese: 40,
  meat: 100
}

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { type: 'cheese', amount: 0 },
      { type: 'salad', amount: 0 },
      { type: 'meat', amount: 0 }
    ],
    totalPrice: 80,
    modalOpen: false,
    purchasable: false,
    onClickCheckout: false
  }

  updatePurchasable = ingredients => {
    const sum = ingredients.reduce((sum, element) => {
      return sum + element.amount;
    }, 0);

    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandle = type => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    for (let item of ingredients) {
      if (item.type === type) item.amount++;
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice
    });
    this.updatePurchasable(ingredients);
  }

  removeIngredientHandle = type => {
    const ingredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    for (let item of ingredients) {
      if (item.type === type) {
        if (item.amount === 0) {
          return;
        }
        item.amount--;
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice
    })
    this.updatePurchasable(ingredients);
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  handleCheckout = () => {
    this.setState({
      onClickCheckout: true
    })
  }
  render() {
    return (
      <div className='container'>
        <div className='d-flex flex-md-row flex-column'>
          <Burger ingredients={this.state.ingredients} />
          <Controls
            addIngredientHandle={this.addIngredientHandle}
            removeIngredientHandle={this.removeIngredientHandle}
            price={this.state.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.state.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <Summary ingredients={this.state.ingredients} />
            <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT</h5>
          </ModalBody>
          <ModalFooter>
            <Button style={{ backgroundColor: "#D70F64" }} onClick={this.handleCheckout}>Continue to CheckOut</Button>
            <Button onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
          {this.state.onClickCheckout && <Navigate to="/checkout" replace={true} />}
        </Modal>
      </div>
    )
  }
}
