import React from 'react'

const Summary = props => {
  const ingredientSummary = props.ingredients.map(item => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}> {item.type}</span>: {item.amount}
      </li>
    )
  })
  return (
    <div>
      <ul style={{ listStyle: "none", padding: "0px" }}>{ingredientSummary}</ul>
    </div>
  )
}

export default Summary