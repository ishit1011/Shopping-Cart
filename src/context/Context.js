import {createContext, useContext, useEffect, useReducer} from 'react'
import {faker} from '@faker-js/faker'
import {cartReducer} from './Reducer'
import { productReducer } from './Reducer';

const Cart = createContext();

faker.seed(99)

const Context = ({children}) => {

  const getLocalCartData = () => {
    let newCartData = localStorage.getItem("thapaCart");
    if(newCartData === []){
      return [];
    }
    else{
      return JSON.parse(newCartData);
    }
  }

    const products = [...Array(20)].map( () => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        inStock: faker.number.int({ min: 0, max: 10 }),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.number.int({ min: 1, max: 5 }),
    }));
    
    // All necessary items in "reducer" for adding/deleting/changing qty in CART
    const [state,dispatch] = useReducer(cartReducer,{
        products: products,
        // cart: []
        cart: getLocalCartData(),
    });

    useEffect(() => {
      localStorage.setItem("thapaCart",JSON.stringify(state.cart))
    },[state.cart])

    // All necessary items in "reducer" for filtering in HOME page
    // inStock / rating / fastDelivery / searchQuery
    const [productState,productDispatch] = useReducer(productReducer,{
      searchByStock: false,
      searchByFastDelivery: false,
      searchByRating: 0,
      searchQuery: "",
    })

  return (
    <Cart.Provider value={{state,dispatch,productState,productDispatch}} >
      {children}
    </Cart.Provider>
  )
} 

export default Context

// Function used to export "Cart" as a context
export const CartState = () => {
    return useContext(Cart);
    // as "Cart is a --> Provider here"
}
