import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./styles/ProductList.css";
import { Spinner } from "@chakra-ui/react";
export default function ProductList({ products }) {
  return (
    <div className="product-list">
      <h1>Products (placeholder for testing)</h1>
      <div className="product-list__items">
        {products ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Spinner thickness={"5px"} emptyColor={"blue.500"} size={"xl"} />
        )}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
};
