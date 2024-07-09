import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./styles/ProductList.css";
export default function ProductList({ products }) {
  return (
    <section className="products" style={{ marginTop: "40px" }}>

      <div className="product-grid">
        {products ? (
          products.map((product) => {
            if (product.active) {
              return <ProductCard key={product.id} product={product} />;
            }
          })
        ) : (
          <div className="spinner">
                <i className="fa-solid fa-spinner rotate" />
              </div>
        )}
      </div>
    </section>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
};
