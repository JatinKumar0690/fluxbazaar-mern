import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-5">Loading cart...</p>;
  }

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return <p className="text-center mt-5">Your cart is empty</p>;
  }

  const subtotal = cart.items.reduce(
    (acc, item) =>
      acc +
      (item?.product?.price || 0) * (item?.quantity || 1),
    0
  );

  return (
    <div className="container py-4 py-md-5">
      <h2 className="fw-bold mb-4">Your Cart</h2>

      <div className="row g-4">
        
        <div className="col-12 col-lg-8">
          {cart.items.map((item, index) => {
            const product = item?.product || {};
            const productId = product.id || product._id || index;

            return (
              <div
                key={`${productId}-${index}`}
                className="d-flex flex-column flex-sm-row gap-3 p-3 mb-3 border rounded-3"
                style={{ backgroundColor: "#ffffff" }}
              >
                
                <img
                  src={
                    product.image ||
                    product.images?.[0] ||
                    "/placeholder.png"
                  }
                  alt={product.title || product.name || "Product"}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />

                
                <div className="flex-grow-1">
                  <h6 className="fw-semibold mb-1">
                    {product.title || product.name || "Unnamed Product"}
                  </h6>

                  <p className="text-muted mb-2">
                    ₹{product.price || 0}
                  </p>

                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <button
                      className="btn btn-light btn-sm"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            productId,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                    >
                      -
                    </button>

                    <span className="fw-semibold">
                      {item.quantity || 1}
                    </span>

                    <button
                      className="btn btn-light btn-sm"
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            productId,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      className="btn btn-link btn-sm text-danger ms-sm-3 p-0"
                      onClick={() =>
                        dispatch(removeFromCart(productId))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>

                
                <div
                  className="fw-bold text-sm-end"
                  style={{ minWidth: "80px" }}
                >
                  ₹
                  {(
                    (product.price || 0) * (item.quantity || 1)
                  ).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        
        <div className="col-12 col-lg-4">
          <div
            className="border rounded-3 p-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h5 className="fw-bold mb-3">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Delivery</span>
              <span className="fw-semibold">Free</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="btn w-100 py-2"
              style={{
                backgroundColor: "#38BDF8",
                color: "#ffffff",
                fontWeight: "600",
                borderRadius: "24px",
              }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
