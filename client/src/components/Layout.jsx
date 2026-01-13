import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchCart } from "../redux/cartSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  //Fetch cart
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      
      <Navbar />

     
      <main
        className="container mt-4 fade-in"
        style={{ flex: 1 }}
      >
        {children}
      </main>

      
      <Footer />
    </div>
  );
};

export default Layout;
