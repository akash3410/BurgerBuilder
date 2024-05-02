import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { resetIngredients } from '../../redux/actionCreators';

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId: state.userId,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetIngredients: () => dispatch(resetIngredients())
  }
}

class CheckOut extends Component {
  state = {
    values: {
      delivaryAddress: '',
      phone: '',
      paymentType: 'Cash on Delivary'
    },
    onClickGoBack: false,
    isLoading: false,
    isModalOpen: false,
    modalMess: ""
  }

  goBack = () => {
    this.setState({
      onClickGoBack: true
    })
  }

  inputChangeHandaler = e => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = () => {
    this.setState({
      isLoading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId,
    }
    axios.post("https://burger-builder-e6f78-default-rtdb.firebaseio.com/orders.json?auth=" + this.props.token, order)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMess: "Order Confirmed!"
          })
          this.props.resetIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMess: "Something went wrong! Place Your Order again!"
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMess: err.message + "! Place Your Order again!"
        })
      })
  }
  render() {
    let form = (
      <div>
        <form style={{
          border: "1px solid gray",
          boxShadow: "1px 5px 5px 5px #888888",
          borderRadius: "5px",
          padding: "20px",
          width: "90%",
          margin: "0px auto"
        }}>
          <label style={{
            fontSize: "25px",
            marginBottom: "20px",
            padding: "5px",
            fontWeight: "bold",
            textTransform: "uppercase"
          }}>Place Your Order</label>
          <textarea
            name='delivaryAddress'
            className='form-control'
            value={this.state.values.delivaryAddress} placeholder='Your Address'
            onChange={(e) => this.inputChangeHandaler(e)}
          />
          <br />
          <input
            name='phone'
            className='form-control'
            value={this.state.values.phone}
            placeholder='Your Phone Number'
            onChange={(e) => this.inputChangeHandaler(e)}
          />
          <br />
          <select
            name='paymentType'
            className='form-control'
            value={this.state.values.paymentType}
            onChange={(e) => this.inputChangeHandaler(e)}
          >
            <option>Cash on Delivary</option>
            <option>Bkash</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#D70F64" }} className='me-auto'
            onClick={this.handleSubmit}
            disabled={!this.props.purchasable}
          >Place Order</Button>
          <Button color='secondary' className='ms-1' onClick={this.goBack}>Cancel</Button>
          {this.state.onClickGoBack && <Navigate to="/" replace={true} />}
        </form>
      </div>
    )
    return (
      <div className='container'>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <h4 className='text-success'>{this.state.modalMess}</h4>
          </ModalBody>
          <ModalFooter>
            <Button style={{ backgroundColor: "#D70F64" }} onClick={this.goBack}> Ok </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);