import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px 30px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        }}
      >
        
        <CheckCircleIcon
          style={{
            fontSize: "90px",
            color: "#38BDF8",
            marginBottom: "16px",
          }}
        />

        
        <h2
          style={{
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "10px",
          }}
        >
          Payment Successful
        </h2>

        
        <p
          style={{
            color: "#64748b",
            fontSize: "0.95rem",
            marginBottom: "30px",
          }}
        >
          Your order has been placed successfully.  
          Thank you for shopping with <b>FluxBazaar</b>.
        </p>

        
        <div className="d-flex flex-column gap-3">
          <Link
            to="/orders"
            style={{
              backgroundColor: "#38BDF8",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "24px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            View My Orders
          </Link>

          <Link
            to="/products"
            style={{
              backgroundColor: "#f1f5f9",
              color: "#0f172a",
              padding: "12px",
              borderRadius: "24px",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
