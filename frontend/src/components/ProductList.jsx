import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./styles/ProductList.css";
export default function ProductList({ products }) {
  return (
    <section className="products">
      <h2>Our Products</h2>
      <h3>Explore Our Products</h3>
      <div className="product-grid">
        {products ? (
          products.map((product) => 
            product.active?
              (<ProductCard key={product.id} product={product} />)
            :null
          )
          
        
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
