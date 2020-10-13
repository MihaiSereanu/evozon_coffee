import React from 'react'
import { Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const SecondStep = (props) => {
  const { delivery, handleCheckDelivery, handleAddressChange } = props

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Card style={{ width: '80%' }}>
          <Card.Header><h3>Delivery/Pick-up</h3></Card.Header>
          <Container style={{ width: '80%', padding: '15px' }}>
            <Row className='justify-content-md-center'>
              <Col>
                <Form.Group>
                  <Form.Check
                    type='radio'
                    label='Pick-up'
                    id='pick-up'
                    name='delivery-option'
                    checked={!delivery.isChecked}
                    onChange={() => handleCheckDelivery('pick-up')}
                  />
                  <Form.Check
                    type='radio'
                    label='Delivery (by carefully trained pigeon)'
                    id='delivery'
                    name='delivery-option'
                    checked={delivery.isChecked}
                    onChange={() => handleCheckDelivery('delivery')}
                  />
                  {delivery.isChecked && (
                    <Form.Control type='text' placeholder='Address' value={delivery.address} onChange={handleAddressChange} />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Card>
      </Row>
    </Container>
  )
}

export default SecondStep
