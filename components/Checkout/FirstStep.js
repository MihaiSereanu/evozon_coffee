import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { totalSum } from '../../utils/helpers'

const FirstStep = (props) => {
  return (
    <Container>

      <Row className='justify-content-md-center'>
        <Card style={{ width: '80%' }}>
          <Card.Header><h3>Cart Details</h3></Card.Header>
          <ListGroup variant='flush'>
            {
              props.products.map(product => {
                return <ListGroup.Item key={product.id}>{product.label}: {product.quantity} x ${product.price}</ListGroup.Item>
              })
            }
            <ListGroup.Item>TOTAL PRICE: ${totalSum(props.products)}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Row>
    </Container>
  )
}

export default FirstStep
