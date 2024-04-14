import React from 'react';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import './Controls.css';

const controls = [
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' }
]

const BuildControl = props => {
  return (
    <div className='d-flex'>
      <div className='ml-5' style={{ fontWeight: "bold", fontSize: "1.2rem", marginRight: "auto" }}>{props.label}</div>
      <button className='btn btn-danger btn-sm m-1' onClick={props.removeIngredientHandle}>Less</button>
      <button className='btn btn-success btn-sm m-1' onClick={props.addIngredientHandle}>More</button>
    </div>
  )
}

const Controls = props => {
  return (
    <div className='container'>
      <Card className='Control'>
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
          <h5>Price: BDT</h5>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Controls