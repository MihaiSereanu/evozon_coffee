import React from 'react'
import { Row } from 'react-bootstrap'
import Product from './Product'
import { connect } from 'react-redux'
import { addPredefinedCoffee } from '../redux/actions/cartActions'
import { validateAddToCartPredefined } from '../utils/validationHelpers'

const mapStateToProps = state => {
  return {
    productsInCart: state.cart.cart,
    stock: state.cart.stock
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addPredefinedCoffee: payload => dispatch(addPredefinedCoffee(payload))
  }
}

const ProductsList = props => {
  const { addPredefinedCoffee, productsInCart, stock } = props

  const addPredefined = product => {
    if (validateAddToCartPredefined(product.id, productsInCart, stock)) {
      addPredefinedCoffee(product)
    }
  }

  return (
    <Row xs={1} md={3}>
      {props.products.map(product => {
        return <Product key={product.id} product={product} addPredefined={addPredefined} />
      })}
    </Row>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
