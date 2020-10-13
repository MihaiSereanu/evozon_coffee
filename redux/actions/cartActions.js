import { ADD_PREDEFINED_COFFEE, ADD_CUSTOM_COFFEE, REMOVE_PREDEFINED_COFFEE, REMOVE_CUSTOM_COFFEE, INCREASE_PREDEFINED_COFFEE, INCREASE_CUSTOM_COFFEE, DECREASE_PREDEFINED_COFFEE, DECREASE_CUSTOM_COFFEE, CHECKOUT, HANDLE_SHOW_CART } from './actionTypes'

export const addPredefinedCoffee = (payload) => ({
  type: ADD_PREDEFINED_COFFEE,
  payload
})

export const addCustomCoffee = (payload) => ({
  type: ADD_CUSTOM_COFFEE,
  payload
})

export const removePredefinedCoffee = (payload) => ({
  type: REMOVE_PREDEFINED_COFFEE,
  payload
})

export const removeCustomCoffee = (payload) => ({
  type: REMOVE_CUSTOM_COFFEE,
  payload
})

export const increasePredefinedCoffee = (payload) => ({
  type: INCREASE_PREDEFINED_COFFEE,
  payload
})

export const increaseCustomCoffee = (payload) => ({
  type: INCREASE_CUSTOM_COFFEE,
  payload
})

export const decreasePredefinedCoffee = (payload) => ({
  type: DECREASE_PREDEFINED_COFFEE,
  payload
})

export const decreaseCustomCoffee = (payload) => ({
  type: DECREASE_CUSTOM_COFFEE,
  payload
})

export const checkout = () => ({
  type: CHECKOUT
})

export const handleShowCart = payload => ({
  type: HANDLE_SHOW_CART,
  payload
})
