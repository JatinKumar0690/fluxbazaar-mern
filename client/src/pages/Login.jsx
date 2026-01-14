import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      navigate("/", {replace: true})
    }
  }, [navigate])
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const data = await loginUser({email, password});
      if(data.user && data.user.token) {
        localStorage.setItem("token", data.user.token);
        navigate("/")
      } else {
        console.error("Token not found in response", data);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      )
    }
  }
  return (
    <div>
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "32px",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
            }}
          >
            <h3 style={{ fontWeight: "700", marginBottom: "8px" }}>Login</h3>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              Welcome back to FluxBazaar
            </p>
            <form
            onSubmit={handleLogin}
            >
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#38BDF8",
                color: "#ffffff",
                border: "none",
                borderRadius: "24px",
                fontWeight: "600",
              }}
            >
              Login
            </button>
            </form>
            <p
              style={{
                marginTop: "16px",
                fontSize: "0.9rem",
                color: "#64748b",
                textAlign: "center",
              }}
            >
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#38BDF8", textDecoration: "none"}}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
