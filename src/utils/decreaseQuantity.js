const decreaseQuantity = (state, itemCost, itemId) => {
  let reducedPriceWithDiscount;
  let reducedTotalPrice;

  if (state.discountApplied) {
    reducedTotalPrice = state.cart
      .map(book => book.cost * book.quantity)
      .reduce((prev, cur) => prev + cur);

    reducedPriceWithDiscount =
      reducedTotalPrice - itemCost - (reducedTotalPrice - itemCost) * 0.2;
  }

  const sameItem = state.cart.find(product => product.id === itemId);

  if (sameItem && sameItem.quantity === 1 && state.cart.length === 1) {
    return {
      ...state,
      cart: [],
      totalPrice: 0,
      promoCode: '',
      discountApplied: false,
    };
  }
  if (sameItem && sameItem.quantity === 1) {
    return {
      ...state,
      cart: state.cart.filter(item => item.id !== itemId),
      totalPrice:
        state.discountApplied && state.totalPrice < itemCost
          ? 0
          : state.discountApplied && state.totalPrice > itemCost
          ? reducedPriceWithDiscount
          : !state.discountApplied && state.totalPrice < itemCost
          ? 0
          : state.totalPrice - itemCost,
    };
  } else {
    return {
      ...state,
      cart: state.cart.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      ),
      totalPrice: state.discountApplied
        ? reducedPriceWithDiscount
        : state.totalPrice - itemCost,
    };
  }
};

export default decreaseQuantity;
