import React from 'react'
import { Col } from 'react-bootstrap'
import Ingredient from '../components/Ingredient'
import styles from '../styles/IngredientCategory.module.css'
import { emptyFn } from '../utils/helpers'

const IngredientCategory = (props) => {
  const { list, inputType, title, selectedOptions, onChange, notEnoughStockIngredients, ingredientsInCart, quantity, notEnoughAlert } = props

  return (
    <Col className={styles.ingredientsContainers}>
      <h1>{title}</h1>
      {list.map(ingredient => (
        <Ingredient
          key={ingredient.id}
          label={ingredient.label}
          inputType={inputType}
          id={ingredient.id}
          price={ingredient.price}
          name={ingredient.category}
          isSelected={!!selectedOptions[ingredient.id]}
          isOutOfStock={!!notEnoughStockIngredients[ingredient.id]}
          isInCart={!!ingredientsInCart[ingredient.id]}
          quantity={quantity}
          onChange={onChange}
        />
      ))}
      <p className={styles.notEnough}>{notEnoughAlert}</p>
    </Col>
  )
}

IngredientCategory.defaultProps = {
  list: [],
  inputType: '',
  title: '',
  selectedOptions: {},
  notEnoughStockIngredients: {},
  ingredientsInCart: {},
  notEnoughAlert: '',
  quantity: 0,
  onChange: emptyFn
}

export default IngredientCategory
