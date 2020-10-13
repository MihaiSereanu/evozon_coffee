import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProductInCart from './ProductInCart'
import UserMessage from './UserMessage'
import CartHeader from './CartHeader'
import CartFooter from './CartFooter'
import styles from '../../styles/Cart.module.css'

import {
  increaseCustomCoffee, increasePredefinedCoffee, removeCustomCoffee,
  removePredefinedCoffee, decreaseCustomCoffee, decreasePredefinedCoffee, handleShowCart
} from '../../redux/actions/cartActions'

import { validatePredefinedCoffee, validateCustomCoffee } from '../../utils/validationHelpers'


const mapStateToProps = state => {
  return {
    productsInCart: state.cart.cart,
    tempIngredients: state.cart.temp_ingredients,
    stock: state.cart.stock,
    showCart: state.cart.showCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increasePredefinedCoffee: payload => dispatch(increasePredefinedCoffee(payload)),
    increaseCustomCoffee: payload => dispatch(increaseCustomCoffee(payload)),
    decreasePredefinedCoffee: payload => dispatch(decreasePredefinedCoffee(payload)),
    decreaseCustomCoffee: payload => dispatch(decreaseCustomCoffee(payload)),
    removePredefinedCoffee: payload => dispatch(removePredefinedCoffee(payload)),
    removeCustomCoffee: payload => dispatch(removeCustomCoffee(payload)),
    handleShowCart: () => dispatch(handleShowCart())
  }
}

const Cart = props => {
  const {
    productsInCart, increasePredefinedCoffee, decreaseCustomCoffee,
    increaseCustomCoffee, decreasePredefinedCoffee, removeCustomCoffee,
    removePredefinedCoffee, tempIngredients, stock, handleShowCart
  } = props

  const [userMessage, setUserMessage] = useState('')
  const isCartEmpty = !(productsInCart.predefined.length || productsInCart.custom.length)

  const increasePredefined = (id, quantity) => {
    setUserMessage('')
    validatePredefinedCoffee(id, quantity, stock)
      ? increasePredefinedCoffee(id) : setUserMessage('This coffee is out of stock!')
  }

  const decreasePredefined = id => {
    setUserMessage('')
    decreasePredefinedCoffee(id)
  }

  const removePredefined = id => {
    setUserMessage('')
    removePredefinedCoffee(id)
  }

  const increaseCustom = (id, quantity) => {
    setUserMessage('')
    validateCustomCoffee(id, quantity, productsInCart, stock, tempIngredients)
      ? increaseCustomCoffee(id) : setUserMessage('An ingredient is out of stock!')
  }

  const decreaseCustom = id => {
    setUserMessage('')
    decreaseCustomCoffee(id)
  }

  const removeCustom = id => {
    setUserMessage('')
    removeCustomCoffee(id)
  }

  const hideCart = () => {
    handleShowCart()
  }

  return (
    <Container className={styles.cartContainer}>

      <CartHeader hideCart={hideCart} />

      <ul className={styles.cart}>
        {productsInCart.predefined.map(product => (
          <ProductInCart
            key={product.id}
            product={product}
            removeProduct={removePredefined}
            increaseQuantity={increasePredefined}
            decreaseQuantity={decreasePredefined}
          />
        ))}
        {productsInCart.custom.map(product => (
          <ProductInCart
            key={product.id}
            product={product}
            increaseQuantity={increaseCustom}
            decreaseQuantity={decreaseCustom}
            removeProduct={removeCustom}
          />
        ))}
      </ul>

      {userMessage && <UserMessage message={userMessage} />}

      <CartFooter productsInCart={productsInCart} isCartEmpty={isCartEmpty} />

    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
