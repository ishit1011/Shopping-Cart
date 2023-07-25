import React from 'react'
import {Form, Button} from 'react-bootstrap'
import Rating from './Rating'
import { CartState } from '../context/Context'

import './Filters.css'


const Filters = () => {

  const{productState:{
    searchByStock,searchByFastDelivery,searchByRating,sort,searchQuery
  }, productDispatch} = CartState()

  console.log(searchByRating,sort,searchByStock,searchByFastDelivery,searchQuery)
  return (
    <div className='filters'>
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label='Ascending'
          name='group1'
          type='radio'
          id={`inline-1`}
          onClick={() => productDispatch({
            type: 'SORT_BY_PRICE',
            payload: 'lowToHigh',
          })}
          checked={sort === 'lowToHigh' ? true : false}
        />
      </span>

      <span>
        <Form.Check
          inline
          label='Descending'
          name='group1'
          type='radio'
          id={`inline-1`}
          onClick={() => productDispatch({
            type: 'SORT_BY_PRICE',
            payload: 'highToLow',
          })}
          checked={sort === 'highToLow' ? true : false}
        />
      </span>

      <span>
        <Form.Check
          inline
          label='Include OUT of stock'
          name='group1'
          type='checkbox'
          id={`inline-3`}
          onClick={() => productDispatch({
            type: 'FILTER_BY_STOCK',
          })}
          checked={searchByStock}
        />
      </span>

      <span>
        <Form.Check
          inline
          label='Fast Delivery Only'
          name='group1'
          type='checkbox'
          id={`inline-4`}
          onClick={() => productDispatch({
            type: 'FILTER_BY_DELIVERY',
          })}
          checked={searchByFastDelivery}
        />
      </span>
      
      <span>
        <label style={{paddingRight:10}}>Rating:</label>
        <Rating 
          rating={searchByRating} 
          onClick={(currRating) => productDispatch({
            type: 'FILTER_BY_RATING',
            payload: currRating + 1,
          })}
          /*  The function is using the setRate function 
              to update the rating value to the index value plus one.

              The index value is passed into the function as an argument 
              and is incremented by one before being assigned to the 
              rating value. */
          style={{cursor:'pointer'}}/>
      </span>
      <Button variant='light' onClick={() => productDispatch({
        type: 'CLEAR_FILTERS'
      })}>Clear Filters</Button>
    </div>
  )
}

export default Filters
