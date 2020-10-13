import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap'

import Page from '../components/Page'
import IngredientCategory from '../components/IngredientCategory'
import CustomCoffeeDetails from '../components/CustomCoffeeDetails'
import { INGREDIENTS_ARR } from '../constants/data'
import { addCustomCoffee } from '../redux/actions/cartActions'

const mapStateToProps = (state) => {
  return {
    tempIngredients: state.cart.temp_ingredients,
    stock: state.cart.stock
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomCoffee: (payload) => dispatch(addCustomCoffee(payload))
  }
}

const RollYourOwn = (props) => {
  const { tempIngredients, stock, addCustomCoffee } = props

  const ingredientsIdArray = INGREDIENTS_ARR.map(el => el.id)
  const coffeeTypes = INGREDIENTS_ARR.filter(el => el.category === 'coffee')
  const milkIngredients = INGREDIENTS_ARR.filter(el => el.category === 'milk')
  const extrasIngredients = INGREDIENTS_ARR.filter(el => el.category === 'extra')
  const coffeeTypesIdArray = coffeeTypes.map(el => el.id)

  const [nameValue, setNameValue] = useState('')
  const [qtyValue, setQtyValue] = useState('1')
  const [selectedOptions, setSelectedOptions] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [coffeeNameAlert, setCoffeeNameAlert] = useState('')
  const [coffeeTypeAlert, setCoffeeTypeAlert] = useState('')
  const [outOfStockAlert, setOutOfStockAlert] = useState('')
  const [notEnoughAlert, setNotEnoughAlert] = useState('')
  const [notEnoughStockIngredients, setNotEnoughStockIngredients] = useState({})
  const [coffeeToAddToCart, setCoffeeToAddToCart] = useState({
    id: Math.random().toString(36).slice(2),
    label: '',
    price: 0,
    ingredients: [],
    quantity: 0
  })

  useEffect(() => {
    updateNotEnoughStockObject(1)
  }, [])

  useEffect(() => {
    updateNotEnoughStockObject(1)
  }, [tempIngredients])

  const updateNotEnoughStockObject = (qty = qtyValue) => {
    const notEnoughStockIngredientsCopy = { ...notEnoughStockIngredients }
    for (const ingId of ingredientsIdArray) {
      if ((tempIngredients[ingId] || 0) + parseInt(qty) > stock[ingId]) { // change with function from utils
        notEnoughStockIngredientsCopy[ingId] = true
      } else {
        delete notEnoughStockIngredientsCopy[ingId]
      }
    }
    setNotEnoughStockIngredients(notEnoughStockIngredientsCopy)
  }

  const calculateTotalPrice = (optionsArr = { ...selectedOptions }, qty = qtyValue) => {
    let total = 0
    for (const ingredient in optionsArr) {
      total += optionsArr[ingredient]
    }
    setTotalPrice(total * qty)
    setCoffeeToAddToCart({
      ...coffeeToAddToCart,
      price: total
    })
  }

  const validateRadioButtons = () => {
    let isValid = false
    for (const coffeeIngId of coffeeTypesIdArray) {
      for (const selectedIngId in selectedOptions) {
        if (coffeeIngId === selectedIngId) {
          isValid = true
        }
      }
    }
    return isValid
  }

  const checkStockOnSelectedIngredients = () => {
    let areInStock = true
    for (const ingId in selectedOptions) {
      if ((tempIngredients[ingId] || 0) + parseInt(qtyValue) > stock[ingId]) { // change with function from utils
        areInStock = false
      }
    }
    return areInStock
  }

  const validateInputsBeforeAddToCart = () => {
    let areValid = true
    if (nameValue === '') {
      setCoffeeNameAlert(' Please name your coffee!')
      areValid = false
    }
    if (!validateRadioButtons()) {
      setCoffeeTypeAlert(' Please choose a type of coffee!')
      areValid = false
    }
    return areValid
  }

  const handleNameChange = (e) => {
    setNameValue(e.target.value)
    setCoffeeNameAlert('')
  }

  const handleQtyChange = (e) => {
    const valueNumber = parseInt(e.target.value, 10)
    const value = valueNumber < 1 ? '1' : valueNumber > 100 ? '100' : isNaN(valueNumber) ? '1' : e.target.value
    setQtyValue(value)
    calculateTotalPrice(undefined, value)
    setCoffeeToAddToCart({
      ...coffeeToAddToCart,
      quantity: e.target.value
    })
    updateNotEnoughStockObject(e.target.value)
  }

  const handleCheckIngredient = (id, price) => {
    const selectedOptionsClone = { ...selectedOptions }
    if (selectedOptionsClone[id]) {
      delete selectedOptionsClone[id]
    } else {
      selectedOptionsClone[id] = price
    }
    setSelectedOptions(selectedOptionsClone)
    calculateTotalPrice(selectedOptionsClone)
    if (selectedOptionsClone.xfnu3t6igc && selectedOptionsClone.ym6w0tn0mq) {
      setNotEnoughAlert('Why would you do that?')
    } else {
      setNotEnoughAlert('')
    }
  }

  const handleSelectCoffee = (id, price) => {
    const selectedOptionsClone = { ...selectedOptions }
    if (!selectedOptionsClone[id]) {
      selectedOptionsClone[id] = price

      for (const coffee of coffeeTypesIdArray) {
        if (id !== coffee && selectedOptionsClone[coffee]) {
          delete selectedOptionsClone[coffee]
        }
      }
    }

    setSelectedOptions(selectedOptionsClone)
    calculateTotalPrice(selectedOptionsClone)
    setCoffeeTypeAlert('')
  }

  const handleAddToCart = () => {
    if (!validateInputsBeforeAddToCart()) {
      return
    }
    if (!checkStockOnSelectedIngredients()) {
      setOutOfStockAlert(`Sorry! We don't have enough of these ingredients for ${qtyValue} coffees.`)
      return
    }
    setOutOfStockAlert('')
    const coffeeToAddToCartFinal = {
      ...coffeeToAddToCart,
      label: nameValue,
      quantity: parseInt(qtyValue),
      ingredients: Object.keys(selectedOptions)
    }
    addCustomCoffee(coffeeToAddToCartFinal)
    setCoffeeToAddToCart({
      id: Math.random().toString(36).slice(2),
      label: '',
      price: 0,
      ingredients: [],
      quantity: 0
    })
    setSelectedOptions({})
    setQtyValue(1)
    setNameValue('')
    setTotalPrice(0)
    setNotEnoughStockIngredients({})
    updateNotEnoughStockObject()
  }

  return (
    <>
      <Head>
        <title>ROFL</title>
        <link rel='icon' href='/favicon.ico' />
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet' />
      </Head>
      <Page>
        <Container>
          <Row md={3}>
            <IngredientCategory
              list={coffeeTypes}
              inputType='radio'
              title='Coffee:'
              selectedOptions={selectedOptions}
              onChange={handleSelectCoffee}
              notEnoughStockIngredients={notEnoughStockIngredients}
              quantity={qtyValue}
              ingredientsInCart={tempIngredients}
            />
            <IngredientCategory
              list={milkIngredients}
              inputType='checkbox'
              title='Milk:'
              selectedOptions={selectedOptions}
              onChange={handleCheckIngredient}
              notEnoughStockIngredients={notEnoughStockIngredients}
              quantity={qtyValue}
              ingredientsInCart={tempIngredients}
            />
            <IngredientCategory
              list={extrasIngredients}
              inputType='checkbox'
              title='Extras'
              selectedOptions={selectedOptions}
              onChange={handleCheckIngredient}
              notEnoughStockIngredients={notEnoughStockIngredients}
              quantity={qtyValue}
              ingredientsInCart={tempIngredients}
              notEnoughAlert={notEnoughAlert}
            />
          </Row>
          <Row>
            <CustomCoffeeDetails
              nameValue={nameValue}
              qtyValue={qtyValue}
              onNameChange={handleNameChange}
              onQtyChange={handleQtyChange}
              totalPrice={totalPrice}
              onClickAddToCart={handleAddToCart}
              coffeeNameAlert={coffeeNameAlert}
              coffeeTypeAlert={coffeeTypeAlert}
              outOfStockAlert={outOfStockAlert}
            />
          </Row>
        </Container>
      </Page>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RollYourOwn)
// export default RollYourOwn;
