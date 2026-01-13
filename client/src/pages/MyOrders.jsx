import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    setOrders(storedOrders);
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4 className="fw-bold mb-2">No Orders Yet</h4>
        <p className="text-muted mb-4">
          Looks like you haven't placed any orders.
        </p>
        <Link
          to="/products"
          className="btn"
          style={{
            backgroundColor: "#38BDF8",
            color: "#ffffff",
            borderRadius: "24px",
            padding: "10px 24px",
            fontWeight: "600",
          }}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <h2 className="fw-bold mb-4">My Orders</h2>

      <div className="row g-4">
        {orders.map((order) => (
          <div className="col-12" key={order.id}>
            <div className="border rounded-4 p-3 p-md-4">
              
              <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
                <div>
                  <p className="fw-semibold mb-1">
                    Order #{order.id}
                  </p>
                  <p className="text-muted small mb-0">
                    Placed on {order.createdAt}
                  </p>
                </div>

                <span
                  className="badge mt-2 mt-md-0"
                  style={{
                    backgroundColor: "#e0f2fe",
                    color: "#0369a1",
                    alignSelf: "flex-start",
                  }}
                >
                  Delivered
                </span>
              </div>

              
              {order.items.map((item, index) => {
                const product = item.product || {};
                return (
                  <div
                    key={`${order.id}-${index}`}
                    className="d-flex gap-3 align-items-center py-2 border-top"
                  >
                    <img
                      src={
                        product.image ||
                        product.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={product.title || product.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />

                    <div className="flex-grow-1">
                      <p className="fw-semibold mb-1">
                        {product.title ||
                          product.name ||
                          "Product"}
                      </p>
                      <p className="text-muted small mb-0">
                        Qty: {item.quantity}
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

              
              <div className="d-flex justify-content-between fw-bold pt-3 mt-3 border-top">
                <span>Total</span>
                <span>
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
