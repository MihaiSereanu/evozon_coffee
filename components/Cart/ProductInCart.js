import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import styles from '../../styles/Cart.module.css'

import { emptyFn } from '../../utils/helpers'

const ProductInCart = (props) => {
  const { id, label, price, quantity } = props.product
  return (
    <Row as='li' className={styles.coffeeItem}>
      <Col className={styles.colCenter}>
        <p className={styles.productName}>
          {label}
        </p>
      </Col>

      <Col className={`${styles.price} ${styles.colCenter}`}>
        <p className={styles.price}>
          ${price}
        </p>
      </Col>

      <Col className={`${styles.productQuantity} ${styles.colCenter}`}>
        <Button
          variant='dark'
          className={`${styles.increaseQuantity} ${styles.flexButton}`}
          onClick={() => props.increaseQuantity(id, quantity)}
        >
          +
        </Button>
        <span className={styles.currentQuantity}>{quantity}</span>
        <Button
          variant='dark'
          className={`${styles.decreaseQuantity} ${styles.flexButton}`}
          onClick={() => props.decreaseQuantity(id)}
        >
          -
        </Button>
      </Col>

      <Col className={styles.colCenter}>
        <Button
          variant='dark'
          className={styles.removeButton}
          onClick={() => props.removeProduct(id)}
        >
          Remove
        </Button>
      </Col>
    </Row>
  )
}

ProductInCart.defaultProps = {
  id: '',
  label: '',
  price: '',
  quantity: 0,
  increaseQuantity: emptyFn,
  decreaseQuantity: emptyFn,
  removeProduct: emptyFn
}

export default ProductInCart
