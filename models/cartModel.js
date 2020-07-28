// Session state container for the shopping cart

class Cart {
  // If there is a previous cart in storage, use that
  constructor(cart = {}) {
    // Items should be a hash map object where the key is an item ID and the value a CartItem object
    // If there are previous cart items, use these
    this.items = cart.items || {};
  }

  // Add a Product as item to Cart
  add(id, product) {
    // If an item already exists in the cart...
    const item = this.items[id]
      ? // ...clone it ...
        { ...this.items[id] }
      : // ...otherwise, create an item
        {
          id,
          product,
          quantity: 0,
          priceTotal: 0,
        };

    // Increment quantity
    item.quantity += 1;
    // Update price total according to new quantity
    item.priceTotal = item.quantity * item.product.price;

    // Add item to Cart
    this.items = { ...this.items, [id]: item };
  }
}

module.exports = Cart;
