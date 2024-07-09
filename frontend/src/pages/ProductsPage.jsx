import { useEffect } from "react";
import { useState } from "react";
import ProductList from "../components/ProductList";
import { API_URL } from "../helpers/constants";
import car from "../images/car-adas.png";
import "./styles/products.css";
import Footer from "../components/Footer";
export default function ProductsPage() {
  const [products, setProducts] = useState();
  const params = new URLSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  if (params.has("success")) {
    alert("Payment successful");
  }
  if (params.has("canceled")) {
    alert("Payment canceled");
  }
  const fetchProducts = async () => {
    fetch(API_URL + "/products").then((response) =>
      response.json().then((data) => {
        console.log(data);
        setProducts(data);
      })
    );
  };
  useEffect(() => {
    fetchProducts();
  }, []);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <main>
      
      <section className="hero">
        <div className="hero-content">
          <h1>Explore the Future of Transportation</h1>
          <div className="countdown">
            <div className="countdown-item">
              <span>23</span>
              <span>Hours</span>
            </div>
            <div className="countdown-item">
              <span>05</span>
              <span>Days</span>
            </div>
            <div className="countdown-item">
              <span>59</span>
              <span>Minutes</span>
            </div>
            <div className="countdown-item">
              <span>35</span>
              <span>Seconds</span>
            </div>
          </div>
          <button className="buy-now">Buy Now!</button>
        </div>
        <div className="hero-image">
          <img src={car} alt="Futuristic Car" />
        </div>
      </section>
      <h2>Our Products</h2>
      <h3>Explore Our Products</h3>
      <input className="search" type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      <ProductList products={filteredProducts} />
    </main>
    </>
  );
}
