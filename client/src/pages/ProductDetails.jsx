import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleProduct } from "../services/productService";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getSingleProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product._id)); 
      alert("Item added to cart successfully!");
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-5">Product not found</p>;
  }

  return (
    <div style={{ padding: "40px 0" }}>
      <div className="container">
        <div className="row g-5 align-items-center">
          
          {/* Left Column: Image */}
          <div className="col-12 col-md-6">
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "16px",
                backgroundColor: "#ffffff",
                textAlign: "center"
              }}
            >
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  borderRadius: "12px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          
          <div className="col-12 col-md-6">
            <h2 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
              {product.name}
            </h2>

            <p style={{ color: "#64748b", marginBottom: "20px", lineHeight: "1.6" }}>
              {product.description}
            </p>

            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#38BDF8", marginBottom: "20px" }}>
              ₹{product.price}
            </div>

            <div style={{ marginBottom: "24px" }}>
                <p style={{ color: "#64748b", margin: "0" }}>
                  Category: <span style={{ color: "#0f172a", fontWeight: "600" }}>{product.category}</span>
                </p>
                <p style={{ color: product.stock > 0 ? "#22c55e" : "#ef4444", fontWeight: "600", marginTop: "4px" }}>
                  {product.stock > 0 ? "● In stock" : "○ Out of stock"}
                </p>
            </div>

            <div className="w-100">
             
              <button
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="btn-responsive"
                style={{
                  
                  display: "block",
                  width: "100%", 
                  maxWidth: "400px", 
                  padding: "16px 32px",
                  
                  
                  backgroundColor: product.stock > 0 
                    ? (isHovered ? "#0ea5e9" : "#38BDF8") 
                    : "#cbd5e1",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  
                
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  
                  
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: isHovered && product.stock > 0 
                    ? "0 10px 15px -3px rgba(56, 189, 248, 0.4)" 
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  transform: isHovered && product.stock > 0 ? "translateY(-2px)" : "none"
                }}
              >
                {product.stock === 0 ? "Sold Out" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;