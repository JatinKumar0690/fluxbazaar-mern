import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { clearCart } from "../redux/cartSlice.js";
import '../styles/Navbar.css'


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const token = localStorage.getItem("token");

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearCart());
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <>
      
      <nav className="navbar-main">
        <div className="navbar-inner" >
          
          <div className="navbar-left">
            <button
              className="hamburger"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </button>

            <Link to="/" className="logo">
              Flux<span>Bazaar</span>
            </Link>
          </div>

          
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            {token && <li><Link to="/orders">Orders</Link></li>}
          </ul>

         
          <div className="nav-actions">
            {token && (
              <Link to="/cart" className="cart-icon">
                <ShoppingCartIcon />
                {cartCount > 0 && <span>{cartCount}</span>}
              </Link>
            )}

            {!token ? (
              <Link to="/login" className="login-btn">
                <PersonOutlineIcon fontSize="small" />
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
      <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span className="drawer-logo">
            Flux<span>Bazaar</span>
          </span>
          <button onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-links">
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link>
          {token && (
            <Link to="/orders" onClick={() => setMobileOpen(false)}>Orders</Link>
          )}
        </div>

        <div className="drawer-footer">
          {token && (
            <Link to="/cart" onClick={() => setMobileOpen(false)}>
              Cart ({cartCount})
            </Link>
          )}

          {!token ? (
            <Link
              to="/login"
              className="drawer-login"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="drawer-logout">
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
