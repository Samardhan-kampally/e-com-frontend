import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../services/search/SearchContext";
import "./Customer.css";
import CartService from "../components/cart/CartService";

const Customer = () => {
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warn, setWarn] = useState("");
  const [viewType, setViewType] = useState("card");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(localStorage.getItem("TOKEN"));
        const response = await axios.get(
          "http://localhost:8080/api/customer/products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );
        console.log(response);

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.status === 401) {
          setWarn("Please Login Again");
          return;
        }
        setError("Error in Fetching Data");
      }
    };
    fetchProducts();
  }, []);

  const groupedProducts = products.reduce((groups, product) => {
    const category = product.categoryName || "Uncategorized";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  const handleViewChange = (e) => {
    setViewType(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      (product?.categoryName || "")
        .toLowerCase()
        .includes(searchQuery?.toLowerCase() || "") ||
      (product?.name || "")
        .toLowerCase()
        .includes(searchQuery?.toLowerCase() || "") ||
      (product?.description || "")
        .toLowerCase()
        .includes(searchQuery?.toLowerCase() || "")
  );

  const handleAddToCart = async (id) => {
    const data = {
      productId: id,
      userId: localStorage.getItem("USERID"),
    };

    try {
      console.log(data);
      const response = await CartService.addToCart(data);
      if (response.status === 201) {
        setSuccess("Added to Cart");
        setError("");
      }
    } catch (err) {
      if (err.status === 409) {
        setError(err.response.data);
        setSuccess("");
        return;
      }
      console.error("Error adding item:", err);
      setError("Error adding item to cart");
      setSuccess("");
    }
  };

  return (
    <div className="product-list">
      <div className="view-toggle">
        <label htmlFor="viewType">View Type: </label>
        <select id="viewType" value={viewType} onChange={handleViewChange}>
          <option value="card">Card View</option>
          <option value="list">List View</option>
        </select>
      </div>

      {filteredProducts.length === 0 && (
        <div className="product-error">No item found with "{searchQuery}"</div>
      )}
      {error && <div className="product-error">{error}</div>}
      {success && <div className="product-success">{success}</div>}
      {warn && <div className="product-warn">{warn}</div>}

      {searchQuery === undefined || searchQuery === "" ? (
        <div>
          {Object.entries(groupedProducts).map(
            ([category, categoryProducts]) => (
              <div key={category} className="category-section">
                <hr />
                <h2 className="category-heading">{category}</h2>
                <div className={`product-grid ${viewType}`}>
                  {categoryProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      {viewType === "list" && (
                        <img
                          className="list-img"
                          src={`data:image/jpeg;base64,${product.returnedImage}`}
                          alt={product.name}
                        />
                      )}
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        {viewType === "card" && (
                          <img
                            className="card-img"
                            src={`data:image/jpeg;base64,${product.returnedImage}`}
                            alt={product.name}
                          />
                        )}
                      </div>
                      <p className="product-price">${product.price}</p>
                      <button
                        className="add-cart-btn"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div>
          <div className="product-grid">
            <div className={`product-grid ${viewType}`}>
              {filteredProducts.map((product) => (

                <div key={product.id} className="product-card">
                      {viewType === "list" && (
                        <img
                          className="list-img"
                          src={`data:image/jpeg;base64,${product.returnedImage}`}
                          alt={product.name}
                        />
                      )}
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        {viewType === "card" && (
                          <img
                            className="card-img"
                            src={`data:image/jpeg;base64,${product.returnedImage}`}
                            alt={product.name}
                          />
                        )}
                      </div>
                      <p className="product-price">${product.price}</p>
                      <button
                        className="add-cart-btn"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
