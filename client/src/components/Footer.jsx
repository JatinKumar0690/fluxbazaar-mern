const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "60px",
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h5 style={{ fontWeight: "700", color: "#0f172a" }}>
              Flux<span style={{ color: "#38BDF8" }}>Bazaar</span>
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Premium shopping experience powered by MERN.
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
              © {new Date().getFullYear()} FluxBazaar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
