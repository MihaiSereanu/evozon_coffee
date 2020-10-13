import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import styles from '../../styles/Cart.module.css'

import { emptyFn } from '../../utils/helpers'

const CartHeader = props => {
  return (
    <>
      <Row className={styles.cartTitle}>
        <Col md={6} className={styles.colCenter}>
          <h5 className={styles.basket}> Your basket</h5>
        </Col>
        <Col md={{ span: 2, offset: 4 }} className={styles.colCenter}>
          <Button
            variant='dark'
            className={`${styles.flexButton} ${styles.exitCart}`}
            onClick={() => props.hideCart()}
          >
            x
          </Button>
        </Col>
      </Row>

      <Row className={styles.cartHeader}>
        <Col className={styles.colCenter}>
          <p>Product</p>
        </Col>

        <Col className={styles.colCenter}>
          <p>Price</p>
        </Col>

        <Col className={styles.colCenter}>
          <p>Quantity</p>
        </Col>
        <Col className={styles.colCenter}>
          <p>Remove</p>
        </Col>
      </Row>
    </>
  )
}

CartHeader.defaultProps = {
  hideCart: emptyFn
}

export default CartHeader
