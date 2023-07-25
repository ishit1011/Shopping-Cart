import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
import { CartState } from '../context/Context'

import './SingleProducts.css'


const SingleProducts = ({pd}) => {

  const {state: {cart}, dispatch,} = CartState()

  return (
    <div className='products'>
      <Card>
        <Card.Img
          variant='top'
          src={pd.image}
          alt={pd.name}
        />
        <Card.Body>
          <Card.Title>{pd.name}</Card.Title>
          <Card.Subtitle style={{paddingBottom:10}}>
            <span>₹ {pd.price}</span>
            {pd.fastDelivery ? (<div>Fast Delivery</div>) : (<div>4 day Delivery</div>)}
            <Rating rating={pd.ratings} />
          </Card.Subtitle>

          {/* if product "p" --is inside cart--> then only we can render Remove from Cart */}
          {cart.some((p) => p.id === pd.id) ? (
            <Button variant='danger'onClick={() => {
              dispatch({
                type: 'REMOVE_FROM_CART', 
                payload: pd})}}>
            Remove from cart
          </Button>
          ) : (
          <Button disabled={!pd.inStock} onClick={() => {
            dispatch({
              type: 'ADD_TO_CART', 
              payload: pd})}}
          >
            {!pd.inStock ? "Out of Stock" : "Add to cart"}
          </Button>)}
          
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProducts
