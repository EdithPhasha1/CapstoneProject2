import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";

const Cart = () => {
  const { cartItems, getTotalCartAmount, selectedShippingMethod } =
    useContext(ShopContext);

  // Calculate total items count in cart
  const getTotalItemsCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  };

  return (
    <div className="checkout-success">
      <h1>Order Confirmation</h1>
      <h2>Thank you for your purchase!</h2>
      <p>Items ordered:</p>
      <ul>
        {PRODUCTS.map((product) => {
          const count = cartItems[product.id];
          if (count > 0) {
            return (
              <li key={product.id}>
                {product.name} - Quantity: {count}
              </li>
            );
          }
          return null;
        })}
      </ul>
      <p>Total Items: {getTotalItemsCount()}</p>
      <p>Subtotal: R{getTotalCartAmount().toFixed(2)}</p>
      <p>Shipping Method: {selectedShippingMethod}</p>
      <p>Your order will be shipped to the provided address.</p>
    </div>
  );
};

export default Cart;
