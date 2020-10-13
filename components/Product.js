import React from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import styles from '../styles/Product.module.css'
import Link from 'next/link'
// https://www.slashgear.com/wp-content/uploads/2019/07/coffee_main_envat-1280x720.jpg
const Product = (props) => {
  return (
    <Col>
      <Card className={styles.productcard} style={{ width: '21.5rem' }}>
        <Link href='/products/[productdetails]' as={`/products/${props.product.id}`}>
          <Card.Img variant='top' style={{ cursor: 'pointer' }} src={props.product.image} fluid />
        </Link>
        <Card.Body>
          <Card.Title>{props.product.label}</Card.Title>
          <Card.Text>
            {`Price ${props.product.price} $`}
          </Card.Text>
          <Button variant='dark' className={styles.addBtn} onClick={() => props.addPredefined(props.product)}>Add to cart</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

Product.defaultProps = {
  product: 'kg10yda77k'
}

export default Product
