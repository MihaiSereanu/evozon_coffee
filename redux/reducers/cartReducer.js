import { ADD_PREDEFINED_COFFEE, ADD_CUSTOM_COFFEE, REMOVE_PREDEFINED_COFFEE, REMOVE_CUSTOM_COFFEE, INCREASE_PREDEFINED_COFFEE, INCREASE_CUSTOM_COFFEE, DECREASE_PREDEFINED_COFFEE, DECREASE_CUSTOM_COFFEE, CHECKOUT, HANDLE_SHOW_CART } from '../actions/actionTypes'
import { STOCK } from '../../constants/data'
import { HYDRATE } from 'next-redux-wrapper'
import _ from 'lodash'
import {
  addCustomCoffee,
  addPredefinedCoffee, checkout, decreaseCustomCoffee, decreasePredefinedCoffee, increaseCustomCoffee,
  increasePredefinedCoffee,
  removeCustomCoffee,
  removePredefinedCoffee
} from '../../utils/helpers'

const initialState = {
  cart: {
    predefined: [{ id: 'kg10yda77k', label: 'Coffee Mocha', price: 9, quantity: 2 }],
    custom: [
      { id: 'ceva', label: 'Cafea smechera', ingredients: ['p96tbt8ot8', '9vcjpxckykd'], price: 6, quantity: 3 },
      { id: 'sth else', label: 'test', ingredients: ['p96tbt8ot8', '9vcjpxckykd'], price: 9, quantity: 3 },
      { id: 'sth else1', label: 'test', ingredients: ['p96tbt8ot8', '2p03cnu269d'], price: 9, quantity: 3 }
    ]
  },
  temp_ingredients: { p96tbt8ot8: 9, '9vcjpxckykd': 6, '2p03cnu269d': 3 },
  stock: _.cloneDeep(STOCK),
  showCart: false
}

export const cartReducer = (state = initialState, action) => {
  console.log('cart reducer:', action)

  switch (action.type) {
    case HYDRATE:
      return [...state, ...action.payload]

    case ADD_PREDEFINED_COFFEE:
    {
      // TO DO - manipulate action.payload (coffee object)
      const newCart = addPredefinedCoffee(action.payload, _.cloneDeep(state.cart))
      return ({
        cart: newCart,
        temp_ingredients: state.temp_ingredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case ADD_CUSTOM_COFFEE:
    {
      // TO DO - manipulate action.payload (coffee object)
      const [newCart, newTempIngredients] = addCustomCoffee(action.payload, _.cloneDeep(state.cart), _.cloneDeep(state.temp_ingredients))
      return ({
        cart: newCart,
        temp_ingredients: newTempIngredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case REMOVE_PREDEFINED_COFFEE:
    {
      // TO DO - manipulate action.payload (id)
      const newCart = removePredefinedCoffee(action.payload, _.cloneDeep(state.cart))
      return ({
        cart: newCart,
        temp_ingredients: state.temp_ingredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case REMOVE_CUSTOM_COFFEE:
    {
      // TO DO - manipulate action.payload (id)
      const [newCart, newTempIngredients] = removeCustomCoffee(action.payload, _.cloneDeep(state.cart), _.cloneDeep(state.temp_ingredients))
      return ({
        cart: newCart,
        temp_ingredients: newTempIngredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case INCREASE_PREDEFINED_COFFEE:
    {
      // TO DO - manipulate action.payload (id)
      const newCart = increasePredefinedCoffee(action.payload, _.cloneDeep(state.cart))
      return ({
        cart: newCart,
        temp_ingredients: state.temp_ingredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case INCREASE_CUSTOM_COFFEE:
    {
      // TO DO - manipulate action.payload (id)
      const [newCart, newTempIngredients] = increaseCustomCoffee(action.payload, _.cloneDeep(state.cart), _.cloneDeep(state.temp_ingredients))
      return ({
        cart: newCart,
        temp_ingredients: newTempIngredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case DECREASE_PREDEFINED_COFFEE:
    {
      // TO DO - manipulate action.payload (id)
      const newCart = decreasePredefinedCoffee(action.payload, _.cloneDeep(state.cart))
      return ({
        cart: newCart,
        temp_ingredients: state.temp_ingredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case DECREASE_CUSTOM_COFFEE:
    {
      // TO DO - manipulate action.payload (id)
      const [newCart, newTempIngredients] = decreaseCustomCoffee(action.payload, _.cloneDeep(state.cart), _.cloneDeep(state.temp_ingredients))
      return ({
        cart: newCart,
        temp_ingredients: newTempIngredients,
        stock: state.stock,
        showCart: state.showCart
      })
    }

    case CHECKOUT:
    {
      // TO DO - manipulate action.payload
      const newStock = checkout(_.cloneDeep(state.cart), _.cloneDeep(state.temp_ingredients), _.cloneDeep(state.stock))
      console.log(newStock)
      return ({
        cart: {
          predefined: [],
          custom: []
        },
        temp_ingredients: {},
        stock: newStock,
        showCart: state.showCart
      })
    }

    case HANDLE_SHOW_CART: {
      return {
        ...state,
        showCart: !state.showCart
      }
    }

    default:
      return state
  }
}
