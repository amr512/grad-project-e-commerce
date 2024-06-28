import PropTypes from 'prop-types'
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
    return (
        <div className="product-list">
            <h1>Products</h1>
            <div className="product-list__items">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired
}