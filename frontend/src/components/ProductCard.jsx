import PropTypes from "prop-types";
import { API_URL } from "../helpers/constants";
import formatCurrency from "../helpers/formatCurrency";
import { useEffect, useState } from "react";

import { auth } from "../main";
export default function ProductCard({ product }) {
  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartRef, setCartRef] = useState();

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  function isInCart() {
    return JSON.parse(localStorage.getItem("cart"))?.find((item) => item.id === product.id) || { amount: 0 };
  }
  async function addToCart() {
    console.log(cart);
    let Cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = Cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      Cart = Cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, amount: item.amount + amount };
        } else {
          return item;
        }
      })
    } else {
      Cart.push({ ...product, amount });
    }
    setCart(Cart);
    localStorage.setItem("cart", JSON.stringify(Cart));
  }

  function removeFromCart() {
    let Cart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(Cart.filter((item) => item.id !== product.id));
    localStorage.setItem("cart", JSON.stringify(Cart.filter((item) => item.id !== product.id)));
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

          <button type="submit" className="buy-now">
            Buy Now
          </button>
          <button
            className="buy-now"
            onClick={(e) => {
              e.preventDefault();
              addToCart();
            }}
          >
            <i className="fa-solid fa-cart-plus"></i>
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
