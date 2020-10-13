import Head from 'next/head'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { checkout } from '../redux/actions/cartActions'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Wizard, Steps, Step } from 'react-albus'

import Page from '../components/Page'
import FirstStep from '../components/Checkout/FirstStep'
import SecondStep from '../components/Checkout/SecondStep'
import ThirdStep from '../components/Checkout/ThirdStep'
import Navigation from '../components/Checkout/Navigation'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.cart
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkout: () => dispatch(checkout())
  }
}

const Checkout = (props) => {
  const { cartProducts, checkout } = props
  const [delivery, setDelivery] = useState({ isChecked: false, address: '' })
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleCheckDelivery = (option) => {
    if (option === 'delivery') {
      setDelivery({ isChecked: true, address: '' })
    } else {
      setDelivery({ isChecked: false, address: '' })
    }
  }

  const handleCheckPaymentMethod = (option) => {
    if (option === 'card') {
      setPaymentMethod('card')
    } else {
      setPaymentMethod('cash')
    }
  }

  const handleAddressChange = (e) => {
    console.log(e.target.value)
    setDelivery({ isChecked: true, address: e.target.value })
  }

  const handleFinishOrder = () => {
    if (cartProducts.predefined.length > 0 || cartProducts.custom.length > 0) {
      let order = { orderID: Date.now(), delivery: delivery, payment: paymentMethod, products: cartProducts }
      console.log(order)
      checkout()
      handleShow()
      window.open('https://youtu.be/dQw4w9WgXcQ', '_blank')
    } else {
      console.log('empty cart - buy something first, alo')
    }
  }

  return (
    <div>
      <Head>
        <title>ROFL</title>
        <link rel='icon' href='/favicon.ico' />
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet' />
      </Head>

      <Page>
        <Container>
          <Row className='justify-content-md-center'>
            <h1>Checkout</h1>
          </Row>
          <Row className='justify-content-md-center'>
            <Col>
              <Wizard>
                <Navigation handleFinishOrder={handleFinishOrder} />
                <Steps>
                  <Step id='first-step'>
                    <FirstStep products={[...cartProducts.predefined, ...cartProducts.custom]} />
                  </Step>
                  <Step id='second-step'>
                    <SecondStep delivery={delivery} handleAddressChange={handleAddressChange} handleCheckDelivery={handleCheckDelivery} />
                  </Step>
                  <Step id='third-step'>
                    <ThirdStep paymentMethod={paymentMethod} handleCheckPaymentMethod={handleCheckPaymentMethod} />
                  </Step>
                </Steps>
              </Wizard>
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Order confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Successfully finished order!</Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Go back
              </Button>
            </Modal.Footer>
          </Modal>

        </Container>
      </Page>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
