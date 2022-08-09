const cartKeyItem = 'detailProduts';

if (!JSON.parse(localStorage.getItem(cartKeyItem))) {
  localStorage.setItem(cartKeyItem, JSON.stringify([]));
}
const readCart = () => JSON.parse(localStorage.getItem(cartKeyItem));

const saveCart = (cartItems) => localStorage
  .setItem(cartKeyItem, JSON.stringify(cartItems));

export const getCartItems = () => {
  const cartItems = readCart();
  return (cartItems);
};

export const addItem = (item) => {
  if (item) {
    const cartItems = readCart();
    saveCart([...cartItems, item]);
  }
};

export const removeItem = (item) => {
  const cartItems = readCart();
  saveCart(cartItems.filter((s) => s.title !== item.title));
};
