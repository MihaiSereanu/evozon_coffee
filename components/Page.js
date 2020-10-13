import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Cart from '../components/Cart/Cart'
import styles from '../styles/Page.module.css'

import { handleShowCart } from '../redux/actions/cartActions'
import { numberOfProductsInCart } from '../utils/helpers'

const mapStateToProps = state => {
  return {
    productsInCart: state.cart.cart,
    showCart: state.cart.showCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleShowCart: () => dispatch(handleShowCart())
  }
}

const Page = (props) => {
  const { showCart, handleShowCart, productsInCart } = props
  const products = [...productsInCart.predefined, ...productsInCart.custom]

  const displayCart = () => {
    handleShowCart()
  }

  const numberOfProducts = numberOfProductsInCart(products)

  return (
    <>
      <Header showCart={displayCart} numberOfProducts={numberOfProducts} />
      <div className={styles.main_container}>
        {props.children}
      </div>
      {showCart && <Cart />}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
