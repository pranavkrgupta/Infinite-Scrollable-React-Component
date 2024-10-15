import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchMoreData();
  }, [page]);

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://fakestoreapi.in/api/products?limit=10&page=${page}`
      );
      setProducts((prevProducts) => [...prevProducts, ...res.data.products]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wroong</p>}
    </div>
  );
}

export default App;
