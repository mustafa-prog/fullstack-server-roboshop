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

  // Remove one robot from the Cart
  removeOne(id) {
    // Find out if item under this id exists
    const item = { ...this.items[id] };
    if (!item) return;
    // If there is just one left, call removeAll()
    if (item.quantity === 1) return this.removeAll(id);
    // Decrement quantity by one OR
    item.quantity--;
    // Recalculate subTotal
    item.subTotal = item.quantity * item.product.price;
    // Update cart
    this.items = { ...this.items, [id]: item };
  }

  // Remove all robots of the same kind
  removeAll(id) {
    // Clone items
    const newItems = { ...this.items };
    // Delete the item by id
    delete newItems[id];
    // Update cart
    this.items = newItems;
  }

  // Class getter that returns the total price of items in cart
  get totalPrice() {
    return Object.values(this.items).reduce(
      (acc, item) => acc + item.subTotal,
      0
    );
  }

  // Class getter that returns the total number of items in cart
  get totalItemCount() {
    return Object.values(this.items).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }

  calcVAT(VAT) {
    const VATSum = (this.totalPrice / 100) * VAT;
    return {
      VATSum,
      finalPrice: VATSum + this.totalPrice,
    };
  }
}

module.exports = Cart;
