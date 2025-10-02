const roundToTwo = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = roundToTwo(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // calculate shipping price
  state.shippingPrice = roundToTwo(state.itemsPrice > 100 ? 0 : 10);

  // calculate tax price
  state.taxPrice = roundToTwo(state.itemsPrice * 0.15);

  // calculate total price
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
