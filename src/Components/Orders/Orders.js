import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../../redux/actionCreators';
import Order from './Order';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = state => {
  return {
    orders: state.orders,
    orderErr: state.orderErr,
    orderLoading: state.orderLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrder: () => dispatch(fetchOrder()),
  }
}

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrder();
  }

  render() {
    let orders = null;
    if (this.props.orderErr) {
      orders = <p style={{
        border: "1px solid grey",
        boxShadow: "1px 5px 5px #888888",
        borderRadius: "5px",
        padding: "20px",
        marginBottom: "10px",
        color: "red"
      }}>Sorry, Faield to load Orders!</p>
    } else {
      if (this.props.orders.length === 0) {
        orders = <p style={{
          border: "1px solid grey",
          boxShadow: "1px 5px 5px #888888",
          borderRadius: "5px",
          padding: "20px",
          marginBottom: "10px",
          color: "red"
        }}>You have no Orders!</p>
      } else {
        orders = this.props.orders.map(order => {
          return <Order order={order} key={order.id} />
        })
      }
    }

    return (
      <div className='container'>
        {this.props.orderLoading ? <Spinner /> : orders}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
