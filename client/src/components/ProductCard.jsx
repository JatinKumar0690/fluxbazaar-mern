import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    id,
    _id,
    title,
    name,
    price = 0,
    image,
    images,
    description,
  } = product || {};

  const productId = id || _id;

  return (
    <div
      className="border rounded-4 p-3 h-100 d-flex flex-column"
      style={{
        backgroundColor: "#ffffff",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onClick={() => navigate(`/products/${productId}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      
      <div
        className="d-flex align-items-center justify-content-center mb-3"
        style={{ height: "180px" }}
      >
        <img
          src={image || images?.[0] || "/placeholder.png"}
          alt={title || name || "Product"}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
        />
      </div>

      
      <h6
        className="fw-semibold mb-1"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "40px",
        }}
      >
        {title || name || "Unnamed Product"}
      </h6>

      
      <p
        className="text-muted small mb-2"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "18px",
        }}
      >
        {description || "Premium quality product"}
      </p>

    
      <p className="fw-bold mb-3">₹{price}</p>

      <div className="mt-auto">
        <button
          className="btn w-100"
          style={{
            backgroundColor: "#38BDF8",
            color: "#ffffff",
            borderRadius: "24px",
            fontWeight: "600",
          }}
          onClick={(e) => {
            e.stopPropagation(); // 
            dispatch(addToCart(product));
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
