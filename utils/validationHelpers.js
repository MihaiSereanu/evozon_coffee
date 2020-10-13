// check if there is enough stock when increasing the quantity for a predefined coffee
export const validatePredefinedCoffee = (coffeeID, quantity, stock) => {
  return stock[coffeeID] > quantity
}

// check if there is enough stock when increasing the quantity for a custom coffee
export const validateCustomCoffee = (coffeeID, quantity, cart, stock, tempIngredients) => {
  const product = cart.custom.find(product => product.id === coffeeID)
  let shouldIncrease = true

  product.ingredients.forEach(ingredient => {
    if (tempIngredients[ingredient] >= stock[ingredient]) {
      shouldIncrease = false
    }
  })

  return shouldIncrease
}

// check if there is enough stock when adding a predefined coffee
export const validateAddToCartPredefined = (coffeeID, cart, stock) => {
  const product = cart.predefined.find(product => product.id === coffeeID)
  if (product) {
    if (product.quantity + 1 > stock[coffeeID]) return false
  }

  return true
}
