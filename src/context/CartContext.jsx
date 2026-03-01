import { createContext, useContext, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Increase quantity if already in cart
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };
  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  // Clear cart after order
  const clearCart = () => {
    setCartItems([]);
  };
  // Get total items count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // Get total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);