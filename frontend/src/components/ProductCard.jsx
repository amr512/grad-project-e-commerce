import PropTypes from "prop-types";
import { API_URL } from "../helpers/constants";
import formatCurrency from "../helpers/formatCurrency";
import { useEffect, useState } from "react";

import { auth } from "../main";
export default function ProductCard({ product }) {
  const [amount, setAmount] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [cartRef, setCartRef] = useState();

  useEffect(() => {
  }, []);

  const updateCart = (updatedCart) => {
    setRefresh(!refresh);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  function isInCart() {
    return JSON.parse(localStorage.getItem("cart")).find((item) => item.id === product.id) || { amount: 0 };
  }

  async function addToCart() {
    let updatedCart = JSON.parse(localStorage.getItem("cart"))
    const index = updatedCart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      updatedCart[index] = {
        ...updatedCart[index],
        amount: updatedCart[index].amount + amount,
      };
    } else {
      updatedCart.push({ ...product, amount });
    }
    updateCart(updatedCart);
  }

  function removeFromCart() {
    let updatedCart = JSON.parse(localStorage.getItem("cart")).filter((item) => item.id !== product.id);
    updateCart(updatedCart);
  }
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} />
      <h4>
        {product.name}
      </h4>
      <p>{formatCurrency(product.price.value, product.price.currency)}</p>
      <form action={`${API_URL}/create-checkout-session/`} method="POST">
        <div>
          <input type="hidden" name="product_id" value={product.id} />
          <input type="hidden" name="price_id" value={product.default_price} />
          {isInCart().amount > 0 ? (
            <button
            type="button"
              className="buy-now remove"
              onClick={(e) => {
                e.preventDefault();
                removeFromCart();
              }}
            >
              Remove {isInCart().amount} from cart
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setAmount(amount - 1);
                }}
              >
                -
              </button>
              <input
                type="number"
                name="quantity"
                style={{ appearance: "textfield", color: "black" }}
                value={amount}
                min="1"
                
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setAmount(amount + 1);
                }}
              >
                +
              </button>
            </div>
          )}

          {/* <button type="submit" className="buy-now">
            Buy Now
          </button> */}
          <button
            className="buy-now"
            onClick={(e) => {
              e.preventDefault();
              addToCart();
            }}
            style={{display:((isInCart().amount > 0)? "none": "inline")}}
          >
            <i className="fa-solid fa-cart-plus"></i>
            Add to Cart
          </button>
        </div>
      </form>
    </div>
    // <div>
    //   <Card className="product-card">
    //     <CardBody>
    //       <Heading size={"md"}>{product.name}</Heading>
    //       <Image
    //         className="product-list__image"
    //         src={product.images[0]}
    //         alt={product.name}
    //         dropShadow={"2xl"}
    //       />
    //       <div className="product-list__details">
    //         <p>{product.description}</p>
    //         <p>
    //           Price:{" "}
    //           {formatCurrency(
    //             product.price.value,
    //             product.price.currency
    //           )}
    //         </p>
    //       </div>
    //       {/* <p>
    //           {product?.metadata.keys.map((e) => (
    //             <p key={e.key}>{e.key}: {e.value}</p>
    //           ))}
    //       </p> */}

    //             </CardBody>
    //   </Card>
    // </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    price: PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
    images: PropTypes.array.isRequired,
    // description: PropTypes.string.isRequired,
    metadata: PropTypes.object,
  }).isRequired,
};
