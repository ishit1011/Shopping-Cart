import React from 'react'
import { Badge, Button, Container, FormControl, Nav, Navbar } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { CartState } from './context/Context';
import { AiFillDelete } from 'react-icons/ai';

import './Header.css'

const Header = () => {
    // Object destructuring : CartState ---> "state" ---> cart
    const {state: {cart}, dispatch, productState: {searchQuery}, productDispatch} = CartState()

    console.log(searchQuery);

  return (
    <Navbar  variant='dark' style={{height:80, backgroundColor:'black'}}>
        <Container>
            <Navbar.Brand>
                <Link to="/">Shopping Cart</Link>
            </Navbar.Brand>

            <Navbar.Text className='search'>
                <FormControl 
                    style={{width:500}}
                    placeholder='Search a product'
                    className=',-auto'
                    onChange={(event) => productDispatch({
                        type: 'FILTER_BY_QUERY',
                        payload: event.target.value
                    })}
                />
            </Navbar.Text>

            <Nav>
                <Dropdown alignRight >
                    <Dropdown.Toggle variant="success">
                        <FaShoppingCart color='white' fontsize='25px' />
                        <Badge style={{margin:5}}>{cart.length}</Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{minWidth:370}}>
                        {cart.length > 0 ? (
                            <>
                            {
                                cart.map((prod) => {return (
                                    <span className='cartitem' key={prod.id}>
                                        <img
                                        src={prod.image}
                                        className='cartItemImg'
                                        alt={prod.name}
                                        />
                                        <div className="cartItemDetail">
                                            <span>{prod.name}</span>
                                            <span>₹ {prod.price.split(".")[0]}</span>
                                        </div>
                                        <AiFillDelete
                                            fontSize="20px"
                                            style={{cursor: 'pointer'}}
                                            onClick={() => dispatch({
                                                type: 'REMOVE_FROM_CART', 
                                                payload: prod,
                                            })} 
                                        />
                                    </span>
                                    )
                                })
                            }
                                <Link to='/cart'>
                                    <Button style={{width: '95%',margin: '0 10px'}}>
                                        Go To Cart
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <span style={{padding:10}}>Cart is Empty!</span>
                        )}
                        
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header
