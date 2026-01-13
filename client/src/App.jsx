import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Products from "./pages/Products.jsx"
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";






function App() {
 return (
   <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess/></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
   </Router>
 )
}

export default App
