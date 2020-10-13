import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Form } from 'react-bootstrap'

const ThirdStep = (props) => {
  const { paymentMethod, handleCheckPaymentMethod } = props

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Card style={{ width: '80%' }}>
          <Card.Header><h3>Payment Method</h3></Card.Header>
          <Container style={{ width: '80%', padding: '15px' }}>
            <Row className='justify-content-md-center'>
              <Col>
                <Form.Group>
                  <Form.Check
                    type='radio'
                    label='Cash'
                    id='cash'
                    name='payment-method'
                    checked={paymentMethod === 'cash'}
                    onChange={() => handleCheckPaymentMethod('cash')}
                  />
                  <Form.Check
                    type='radio'
                    label='Card'
                    id='card'
                    name='payment-method'
                    checked={paymentMethod === 'card'}
                    onChange={() => handleCheckPaymentMethod('card')}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Card>
      </Row>
    </Container>
  )
}

export default ThirdStep
