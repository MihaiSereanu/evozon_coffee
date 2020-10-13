import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import styles from '../styles/CustomCoffeeDetails.module.css'
import { emptyFn } from '../utils/helpers'

export const CustomCoffeeDetails = (props) => {
  const { nameValue, qtyValue, onNameChange, onQtyChange, totalPrice, onClickAddToCart, coffeeNameAlert, coffeeTypeAlert, outOfStockAlert } = props
  return (
    <Col className={styles.detailsContainer}>
      <Form.Group as={Row}>
        <Col>
          <Form.Label>Name your coffee:</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Control size='lg' type='text' placeholder='Coffee Name' value={nameValue} onChange={onNameChange} />
        </Col>
        <Col xs={2}>
          <Form.Label>Quantity:</Form.Label>
        </Col>
        <Col xs={2}>
          <Form.Control size='lg' type='number' value={qtyValue} onChange={onQtyChange} />
        </Col>
        <Col>
          <div>
                        Price:
            <span> ${totalPrice}</span>
          </div>
        </Col>
      </Form.Group>
      <Row className={styles.buttonDiv}>
        <Button variant='dark' className={styles.addBtn} onClick={onClickAddToCart}>AddToCart</Button>
      </Row>
      <div className={styles.alertsDiv}>
        {coffeeNameAlert}
        {coffeeTypeAlert}
        {outOfStockAlert}
      </div>
    </Col>
  )
}

CustomCoffeeDetails.defaultProps = {
  nameValue: '',
  qtyValue: '1',
  totalPrice: '0',
  coffeeNameAlert: '',
  coffeeTypeAlert: '',
  outOfStockAlert: '',
  onNameChange: emptyFn,
  onQtyChange: emptyFn,
  onClickAddToCart: emptyFn
}

export default CustomCoffeeDetails
