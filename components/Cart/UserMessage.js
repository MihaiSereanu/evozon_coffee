import React from 'react';
import { Row, Col } from 'react-bootstrap'
import styles from '../../styles/Cart.module.css'

const UserMessage = props => {
  return (
    <Row>
      <Col className={styles.userMessage}>
        {props.message}
      </Col>
    </Row>
  )
}

UserMessage.defaultProps = {
  message: ''
}

export default UserMessage
