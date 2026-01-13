import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  if (loading) {
    return (
      <div className="container py-5">
        <h2 className="fw-bold mb-4">All Products</h2>

        <div className="row g-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="col-6 col-md-4 col-lg-3 d-flex"
              key={`skeleton-${index}`}
            >
              <div className="border rounded-4 p-3 w-100">
                <div
                  className="bg-light rounded mb-3"
                  style={{ height: "180px" }}
                />
                <div
                  className="bg-light rounded mb-2"
                  style={{ height: "14px" }}
                />
                <div
                  className="bg-light rounded w-50"
                  style={{ height: "14px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="container py-5">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">All Products</h2>
        <span className="text-muted small">
          {products.length} items
        </span>
      </div>

      
      <div className="row g-4">
        {products.map((product, index) => {
          const productId = product?.id || product?._id || index;

          return (
            <div
              key={`${productId}-${index}`}
              className="col-6 col-md-4 col-lg-3 d-flex"
            >
             
              <div className="w-100 h-100">
                <ProductCard product={product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
