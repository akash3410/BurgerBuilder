import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';
import './Controls.css';

const controls = [
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' }
]

const BuildControl = props => {
  return (
    <div className='d-flex'>
      <div className='me-auto ms-5' style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
      <button className='btn btn-danger btn-sm m-1' onClick={props.removeIngredientHandle}>Less</button>
      <button className='btn btn-success btn-sm m-1' onClick={props.addIngredientHandle}>More</button>
    </div>
  )
}

const Controls = props => {
  return (
    <div className='container ms-md-5' style={{ textAlign: "center" }}>
      <Card style={{
        marginBottom: "30px",
        textAlign: "center"
      }}>
        <CardHeader style={{
          backgroundColor: "#D70F64",
          color: "white"
        }}>
          <h4>Add some ingredients</h4>
        </CardHeader>
        <CardBody>
          {
            controls.map(item => {
              return <BuildControl
                type={item.type}
                label={item.label}
                addIngredientHandle={() => props.addIngredientHandle(item.type)}
                removeIngredientHandle={() => props.removeIngredientHandle(item.type)}
                key={Math.random()}
              />
            })
          }
        </CardBody>
        <CardFooter>
          <h5>Price: <strong>{props.price}</strong> BDT</h5>
        </CardFooter>
        <Button
          style={{ backgroundColor: "#D70F64", borderRadius: "0px" }}
          disabled={!props.purchasable}
          onClick={props.toggleModal}
          className='rounded-bottom'
        >Order Now</Button>
      </Card>
    </div>
  )
}

export default Controls