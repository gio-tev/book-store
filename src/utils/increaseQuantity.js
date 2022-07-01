const increaseQuantity = (state, itemCost, itemId) => {
  let increasedPriceWithDiscount;
  let reducedTotalPrice;

  if (state.discountApplied) {
    reducedTotalPrice = state.cart
      .map(book => book.cost * book.quantity)
      .reduce((prev, cur) => prev + cur);

    increasedPriceWithDiscount =
      reducedTotalPrice + itemCost - (reducedTotalPrice + itemCost) * 0.2;
  }

  return {
    ...state,
    cart: state.cart.map(item =>
      item.id === itemId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    ),
    totalPrice: state.discountApplied
      ? increasedPriceWithDiscount
      : state.totalPrice + itemCost,
  };
};

export default increaseQuantity;
