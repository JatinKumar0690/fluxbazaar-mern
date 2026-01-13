import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5500); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "70vh" }}
    >
      
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="404 Not Found"
        style={{ maxWidth: "300px", width: "100%" }}
      />

      <h2 className="fw-bold mt-4">Page Not Found</h2>
      <p className="text-muted">
        You'll be redirected to home shortly....
      </p>
    </div>
  );
};

export default NotFound;
