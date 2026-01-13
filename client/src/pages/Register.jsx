import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({name, email, password});
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        <h3 style={{ fontWeight: "700", marginBottom: "8px" }}>
          Create Account
        </h3>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          Join FluxBazaar today
        </p>
        <form
        onSubmit={handleRegister}
        >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Password"
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
          Register
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
            Already have an account?{" "}
            <Link to="/login" style={{color: "#38BDF8", textDecoration: "none"}}>
            Login
            </Link>
        </p>
        </div>
    </div>
  );
};


export default Register;