const addToCart = (state, item) => {
  const sameItem = state.cart.find(product => product.id === item.id);

  if (sameItem) {
    return {
      ...state,
      cart: state.cart.map(book =>
        book.id === item.id
          ? {
              ...book,
              quantity: book.quantity + 1,
            }
          : book
      ),
      totalPrice: state.totalPrice + item.cost,
    };
  }
  return {
    ...state,
    cart: [...state.cart, item],
    totalPrice: state.totalPrice + item.cost,
  };
};

export default addToCart;
