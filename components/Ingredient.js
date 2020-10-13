import React from 'react'
import { Form } from 'react-bootstrap'

import { emptyFn } from '../utils/helpers'
import styles from '../styles/Ingredient.module.css'

const Ingredient = (props) => {
  const { label, id, inputType, price, name, isSelected, onChange, isOutOfStock, isInCart } = props
  const disabled = isSelected && isOutOfStock ? false : isOutOfStock
  return (
    <div>
      <Form.Group controlId={id}>
        <Form.Check
          type={inputType}
          label={label + ' - $' + price}
          id={id}
          name={name}
          checked={isSelected}
          onChange={() => onChange(id, price)}
          disabled={disabled}
        />
        {(isOutOfStock && !isInCart)
          ? <span className={styles.outOfStock}>(Out of Stock)</span>
          : (isOutOfStock && isInCart)
            ? <span className={styles.outOfStock}>(Not Enough Stock)</span> : ''}
      </Form.Group>
    </div>
  )
}

Ingredient.defaultProps = {
  label: '',
  inputType: '',
  id: '',
  price: '',
  name: '',
  isInCart: false,
  isSelected: false,
  isOutOfStock: false,
  quantity: 0,
  onChange: emptyFn
}

export default Ingredient
