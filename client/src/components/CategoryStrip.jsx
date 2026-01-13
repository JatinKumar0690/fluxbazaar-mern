import { Link } from "react-router-dom";

const categories = [
  {
    label: "Mobiles",
    value: "mobiles",
    icon: "https://cdn-icons-png.flaticon.com/512/545/545245.png",
  },
  {
    label: "Laptops",
    value: "laptops",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
  },
  {
    label: "Headphones",
    value: "headphones",
    icon: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
  },
  {
    label: "Watches",
    value: "watches",
    icon: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
  },
  {
    label: "Cameras",
    value: "cameras",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920290.png",
  },
  {
    label: "Accessories",
    value: "accessories",
    icon: "https://cdn-icons-png.flaticon.com/512/679/679720.png",
  },
];

const CategoryStrip = () => {
  return (
    <section className="bg-white border-bottom">
      <div className="container py-3">
        <div
          className="d-flex gap-4 overflow-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.value}
              to={`/products?category=${category.value}`}
              className="text-decoration-none text-center"
              style={{ minWidth: "90px" }}
            >
              {/* ICON */}
              <div
                className="mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#f8fafc",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0f2fe";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={category.icon}
                  alt={category.label}
                  style={{
                    width: "32px",
                    height: "32px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* LABEL */}
              <p
                className="mt-2 mb-0"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  color: "#0f172a",
                }}
              >
                {category.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;
