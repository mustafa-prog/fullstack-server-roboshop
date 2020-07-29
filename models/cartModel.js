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
          subTotal: 0,
        };

    // Increment quantity
    item.quantity += 1;
    // Update price total according to new quantity
    item.subTotal = item.quantity * item.product.price;

    // Add item to Cart
    this.items = { ...this.items, [id]: item };
  }

  removeOne(id) {
    const item = { ...this.items[id] };
    if (!item) return;
    if (item.quantity === 1) return this.removeAll();
    item.quantity--;
    item.subTotal = item.quantity * item.product.price;
    this.items = { ...this.items, [id]: item };
  }

  removeAll(id) {
    const newItems = { ...this.items };
    delete newItems[id];
    this.items = newItems;
  }

  get totalPrice() {
    return Object.values(this.items).reduce(
      (acc, item) => acc + item.subTotal,
      0
    );
  }

  get totalItemCount() {
    return Object.values(this.items).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }
}

module.exports = Cart;
