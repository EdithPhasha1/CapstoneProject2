import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

// Define a functional component named Product, receiving props
export const Product = (props) => {
  // Destructure props.data to get specific product details
  const { id, productName, price, productImage } = props.data;

  // Access addToCart function and cartItems state from ShopContext using useContext
  const { addToCart, cartItems } = useContext(ShopContext);

  // Determine the quantity of this product in the cart based on its id
  const cartItemCount = cartItems[id];

  // Render the product component with its details
  return (
    <div className="product">
      {/* Display the product image */}
      <img src={productImage} alt={productName} />

      {/* Display the product name and price */}
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> R{price}</p>
      </div>

      {/* Button to add the product to cart, with dynamic text based on cartItemCount */}
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        {/* Display "Add To Cart" text with quantity in parentheses if cartItemCount > 0 */}
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
