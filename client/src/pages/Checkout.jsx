import { useSelector } from "react-redux";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../services/paymentService";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);

  
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>Your cart is empty</h4>
      </div>
    );
  }

  
  const totalAmount = cart.items.reduce(
    (acc, item) =>
      acc +
      (item?.product?.price || 0) * (item?.quantity || 1),
    0
  );

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (!window.Razorpay) {
        alert("Payment service unavailable");
        return;
      }

     //Creating razorpay order
      const orderData = await createRazorpayOrder(
        totalAmount,
        token
      );

      const options = {
        key: orderData.key,
        amount: orderData.razorpayOrder.amount,
        currency: "INR",
        name: "FluxBazaar",
        description: "Order Payment",
        order_id: orderData.razorpayOrder.id,

        handler: async function (response) {
          try {
            const verifyRes = await verifyRazorpayPayment(
              {
                razorpay_order_id:
                  response.razorpay_order_id,
                razorpay_payment_id:
                  response.razorpay_payment_id,
                razorpay_signature:
                  response.razorpay_signature,
              },
              token
            );

            if (verifyRes?.success) {
              

              const existingOrders = JSON.parse(
                localStorage.getItem("orders") || "[]"
              );

              const newOrder = {
                id: Date.now(),
                items: cart.items,
                total: totalAmount,
                createdAt: new Date().toLocaleString(),
                status: "Delivered",
              };

              const updatedOrders = [
                newOrder,
                ...existingOrders,
              ];

              localStorage.setItem(
                "orders",
                JSON.stringify(updatedOrders)
              );

              
              localStorage.removeItem("cart");

              
              window.location.href = "/orders";
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error(
              "Verification error:",
              err
            );
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#38BDF8",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment error");
    }
  };

  return (
    <div className="container py-4 py-md-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row g-4">
        
        <div className="col-12 col-lg-8">
          <div className="border rounded-3 p-3 p-md-4">
            <h5 className="fw-semibold mb-3">
              Order Summary
            </h5>

            {cart.items.map((item, index) => {
              const product = item?.product || {};
              const productId =
                product.id || product._id || index;

              return (
                <div
                  key={`${productId}-${index}`}
                  className="d-flex gap-3 align-items-center mb-3 pb-3 border-bottom"
                >
                  
                  <img
                    src={
                      product.image ||
                      product.images?.[0] ||
                      "/placeholder.png"
                    }
                    alt={
                      product.title ||
                      product.name ||
                      "Product"
                    }
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "/placeholder.png";
                    }}
                  />

                  
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-semibold">
                      {product.title ||
                        product.name ||
                        "Unnamed Product"}
                    </p>
                    <p className="text-muted mb-0 small">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                 
                  <div className="fw-semibold">
                    ₹
                    {(
                      (product.price || 0) *
                      (item.quantity || 1)
                    ).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        <div className="col-12 col-lg-4">
          <div className="border rounded-3 p-4">
            <h5 className="fw-bold mb-3">
              Price Details
            </h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">
                Subtotal
              </span>
              <span className="fw-semibold">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">
                Delivery
              </span>
              <span className="fw-semibold">
                Free
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total</span>
              <span>
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handlePayment}
              className="btn w-100 py-2"
              style={{
                backgroundColor: "#38BDF8",
                color: "#ffffff",
                borderRadius: "24px",
                fontWeight: "600",
              }}
            >
              Pay ₹{totalAmount.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
