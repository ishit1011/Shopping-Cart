export const cartReducer = (state,action) =>{
    switch(action.type){
        case 'ADD_TO_CART':
            return {...state, cart: [...state.cart,{...action.payload, qty:1}]};
        case 'REMOVE_FROM_CART':
            return {...state, cart: state.cart.filter((post) => post.id !== action.payload.id)};
        case 'CHANGE_CART_QTY':
            return {...state, cart: state.cart.filter((post) => post.id === action.payload.id ? post.qty = action.payload.qty : post.qty)}    
        default:
            return state;
    }
}; 

export const productReducer = (state,action) =>{
    switch(action.type){
        case 'SORT_BY_PRICE' :
            return {...state, sort: action.payload}
        case 'FILTER_BY_STOCK' :
            return {...state, searchByStock: !state.searchByStock}
        case 'FILTER_BY_DELIVERY' :
            return {...state, searchByFastDelivery: !state.searchByFastDelivery}
        case 'FILTER_BY_RATING' :
            return {...state, searchByRating: action.payload}
        case 'FILTER_BY_QUERY' :
            return {...state, searchQuery: action.payload}
        case 'CLEAR_FILTERS' :
            return {
                searchByStock: false,
                searchByFastDelivery: false,
                searchByRating: 0,
                // searchQuery: "",
            }    
        default:
            return state;
    }
}; 