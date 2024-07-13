import PropTypes from "prop-types";
import { API_URL } from "../helpers/constants";
import formatCurrency from "../helpers/formatCurrency";
import { useEffect, useState } from "react";

import { auth } from "../main";
export default function ProductCard({ product }) {
  const [amount, setAmount] = useState(1);
  const [refresh, setRefresh] = useState(false);
  

  

  const updateCart = (updatedCart) => {
    setRefresh(!refresh);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  function isInCart() {
    return (
      JSON.parse(localStorage.getItem("cart"))?.find(
        (item) => item.id === product.id
      ) || { amount: 0 }
    );
  }

  async function addToCart() {
    let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
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
    let updatedCart = JSON.parse(localStorage.getItem("cart")).filter(
      (item) => item.id !== product.id
    );
    updateCart(updatedCart);
  }
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{formatCurrency(product.price.value, product.price.currency)}</p>
      {isInCart().amount > 0 ? (
        <div
          style={{
            gap: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            type="button"
            className="buy-now"
            onClick={(e) => {
              e.preventDefault();
              removeFromCart();
            }}
          >
            Remove {isInCart().amount} from cart
          </button>
          <form
            action={`${API_URL}/cart-checkout`}
            method="POST"
            onSubmit={(e) => {
              localStorage.setItem("cart", JSON.stringify([]));
            }}
          >
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(
                JSON.parse(localStorage.getItem("cart"))?.map((i) => ({
                  price: i.default_price,
                  quantity: i.amount,
                }))
              )}
            />
            <button
              className="buy-now"
              onClick={(e) => {
                if (
                  JSON.parse(localStorage.getItem("cart")) == null ||
                  JSON.parse(localStorage.getItem("cart"))?.length == 0
                ) {
                  e.preventDefault();
                  alert("Cart is empty");
                }
              }}
              // style={{
              //   border: "none",
              //   backgroundColor: "transparent",
              //   cursor: "pointer",
              //   marginLeft: "30px",
              //   marginRight: "10px",
              // }}
            >
              <i className="fa-solid fa-cart-shopping"></i> checkout
            </button>
          </form>
        </div>
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
        style={{ display: isInCart().amount > 0 ? "none" : "inline" }}
      >
        <i className="fa-solid fa-cart-plus"></i>
        Add to Cart
      </button>
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
