import React from 'react';

const Order = props => {
  const ingredientSummary = props.order.ingredients.map(item => {
    return (
      <span style={{
        border: "1px solid grey",
        borderRadius: "5px",
        padding: "10px",
        margin: "5px"
      }} key={item.type}> {item.amount} x <span style={{ textTransform: "capitalize" }}>{item.type}</span></span>
    )
  })
  return (
    <div style={{
      border: "1px solid grey",
      boxShadow: "1px 5px 5px #888888",
      borderRadius: "5px",
      padding: "20px",
      marginBottom: "10px"
    }}>
      <p>Order Number: {props.order.id}</p>
      <p>Delivary Address: {props.order.customer.delivaryAddress}</p>
      <p>Contact: {props.order.customer.phone}</p>
      <hr />
      {ingredientSummary}
      <hr />
      <p>Total: {props.order.price} BDT</p>
      <p>{props.order.orderTime}</p>
    </div>
  )
}

export default Order