import PropTypes from "prop-types";
import "./ProductCard.css";
import formatNumber from "../helpers/formatNumber";
import { API_URL } from "../helpers/constants";
export default function ProductCard({ product }) {
  return (
    <div>
      <div className="product-card">
        <div className="product-list__image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-list__details">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {formatNumber(product.price.value/100, product.price.currency)}</p>
        </div>
        <form
          action={`${API_URL}/create-checkout-session/?price_id=${product.default_price}&product_id=${product.id}&quantity=1`}
          method="POST"
        >
            <input type="hidden" name="product_id" value={product.id} />
            <input type="hidden" name="price_id" value={product.default_price} />
            <input type="number" name="quantity" defaultValue={1} />
          <button type="submit">Buy</button>
        </form>
      </div>
    </div>
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
    description: PropTypes.string.isRequired,
  }).isRequired,
};
