import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data.js'
import reducer from './reducer.js'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => { //sepeti boşalt
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = (id) => { //bir ürünü sepetten kaldır
    dispatch({ type: 'REMOVE', payload: id })
  }

  const increase = (id) => { //bir ürünün sepetteki miktarını arttır
    dispatch({ type: 'INCREASE', payload: id })
  }

  const decrease = (id) => {//bir ürünün sepetteki miktarını azalt
    dispatch({ type: 'DECREASE', payload: id })
  }

  const toggleAmount = (id, type) => {//bir ürünün sepetteki miktarını arttır veya azalt
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }
  
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
