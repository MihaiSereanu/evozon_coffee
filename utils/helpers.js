export const emptyFn = () => {}

export const addPredefinedCoffee = (coffee, cart) => {
  const product = cart.predefined.find((elem) => { return elem.id === coffee.id })

  // if the product is not in the cart - we add it to the cart
  if (product === undefined) {
    cart.predefined.push(Object.assign(coffee, { quantity: 1 }))
    return cart
  } else {
    // if the product already exists - we increase the quantity
    product.quantity++
    return cart
  }
}

export const addCustomCoffee = (coffee, cart, tempIngredients) => {
  // we add the custom coffee to the cart
  cart.custom.push(coffee)

  // we add the ingredients to temp_ingredients (used for checking available stock)
  coffee.ingredients.forEach((ingredient) => {
    if (ingredient in tempIngredients) { tempIngredients[ingredient] += coffee.quantity } else { tempIngredients[ingredient] = coffee.quantity }
  })

  return [cart, tempIngredients]
}

export const removePredefinedCoffee = (id, cart) => {
  // filter the elements from the cart and keep only the ones different from the one we have to remove
  cart.predefined = cart.predefined.filter((elem) => { return elem.id !== id })
  return cart
}

export const removeCustomCoffee = (id, cart, tempIngredients) => {
  // remove custom coffee from cart
  const productIndex = cart.custom.findIndex((elem) => { return elem.id === id })
  const product = cart.custom.splice(productIndex, 1)[0]

  // remove ingredients from tempIngredients
  product.ingredients.forEach((ingredient) => {
    tempIngredients[ingredient] -= product.quantity
    if (tempIngredients[ingredient] === 0) { delete tempIngredients[ingredient] }
  })

  return [cart, tempIngredients]
}

export const increasePredefinedCoffee = (id, cart) => {
  const product = cart.predefined.find((elem) => { return elem.id === id })
  product.quantity++

  return cart
}

export const increaseCustomCoffee = (id, cart, tempIngredients) => {
  const product = cart.custom.find((elem) => { return elem.id === id })
  product.quantity++

  product.ingredients.forEach((ingredient) => { tempIngredients[ingredient]++ })
  console.log(cart, 'cart', tempIngredients, 'tempIngredients')
  return [cart, tempIngredients]
}

export const decreasePredefinedCoffee = (id, cart) => {
  const product = cart.predefined.find((elem) => { return elem.id === id })

  if (product.quantity === 1) {
    cart.predefined = cart.predefined.filter((elem) => { return elem.id !== id })
    return cart
  } else { product.quantity-- }

  return cart
}

export const decreaseCustomCoffee = (id, cart, tempIngredients) => {
  const product = cart.custom.find((elem) => { return elem.id === id })

  if (product.quantity === 1) {
    product.ingredients.forEach((ingredient) => {
      tempIngredients[ingredient]--
      if (tempIngredients[ingredient] === 0) { delete tempIngredients[ingredient] }
    })

    cart.custom = cart.custom.filter((elem) => { return elem.id !== id })
    return [cart, tempIngredients]
  } else {
    product.ingredients.forEach((ingredient) => { tempIngredients[ingredient]-- })
    product.quantity--
    console.log(cart, tempIngredients, 'decrease custom coffee')
    return [cart, tempIngredients]
  }
}

export const checkout = (cart, tempIngredients, stock) => {
  cart.predefined.forEach((elem) => { stock[elem.id]-- })

  for (const ingredient in tempIngredients) {
    stock[ingredient]--
  }

  return stock
}

export const totalSum = (cart) => {
  let sum = 0
  cart.forEach(product => { sum += product.quantity * product.price })

  return sum
}

// total products in cart
export const numberOfProductsInCart = products => {
  let sum = 0
  products.forEach(product => { sum += product.quantity })
  return sum
}
