import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";
import CategoryStrip from "../components/CategoryStrip";
import Loader from "../components/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <CategoryStrip />

      <section className="container py-5">
        <h3 className="fw-bold mb-4">Featured Products</h3>

        {loading ? (
          <Loader />
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div className="col-12 col-sm-6 col-md-3" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
