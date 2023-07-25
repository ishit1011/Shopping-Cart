import React from 'react'
import { CartState } from './context/Context'
import SingleProducts from './components/SingleProducts';
import Filters from './components/Filters'
import './Home.css'

const Home = () => {
  const {
    state: {products}, 
    productState: {searchByStock,searchByFastDelivery,
    searchByRating,sort,searchQuery}} = CartState()   // Used to destructure the "CartState" API ---to get---> state --further get--> products

  const transformProducts = () => {
    let sortedProducts = products;
     
    if(sort){
      sortedProducts = sortedProducts.sort((a,b) => 
          sort === 'lowToHigh' ? a.price-b.price : b.price-a.price)
    }

    if(!searchByStock){
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if(searchByFastDelivery){
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if(searchByRating){
      sortedProducts = sortedProducts.filter((prod) => prod.ratings === searchByRating)
    }

    if(searchQuery){
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }  

  return (
    <div className="home">
      <Filters/>
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return (
          <SingleProducts pd={prod} key={prod.id} />)
        })}
      </div>
    </div>
  )
}

export default Home
