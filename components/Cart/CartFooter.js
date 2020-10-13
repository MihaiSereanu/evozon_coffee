import React from 'react'
import Link from 'next/link'
import { Row, Col, Button } from 'react-bootstrap'
import styles from '../../styles/Cart.module.css'

import { totalSum } from '../../utils/helpers'

const CartFooter = props => {

  const { productsInCart } = props
  const products = [...productsInCart.predefined, ...productsInCart.custom]
  const sum = totalSum(products)

  return (
    <Row className={styles.cartFooter}>

      <Col className={`${styles.totalSumContainer} ${styles.colCenter}`} md={4}>
        <span>Total: </span>
        <span className={styles.totalSum}> {sum} $</span>
      </Col>

      <Col md={{ span: 3, offset: 5 }} className={styles.colCenter}>
        <Button className={styles.checkout}>
          <Link href={props.isCartEmpty ? '' : '/Checkout'}>Checkout</Link>
        </Button>
      </Col>

    </Row>
  )
}

CartFooter.defaultProps = {
  productsInCart: {
    predefined: {},
    custom: {}
  },
  isCartEmpty: true
}

export default CartFooter
