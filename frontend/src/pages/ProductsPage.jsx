import { useEffect } from "react";
import { useState } from "react";
import ProductList from "../components/ProductList";
import { API_URL } from "../helpers/constants";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const params = new URLSearchParams()
  if(params.has('success')){
    alert('Payment successful')
  }
  if(params.has('canceled')){
    alert('Payment canceled')
  }
  const fetchProducts = async () => {
    fetch(API_URL + "/products").then((response) =>
      response.json().then((data) => {
        console.log(data);
        setProducts(data)
      })
    );
  };
  useEffect(() => {
    fetchProducts();
  },[]);
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
