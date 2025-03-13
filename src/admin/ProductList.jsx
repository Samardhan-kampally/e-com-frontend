import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warn, setWarn] = useState("");
  const [viewType, setViewType] = useState("card");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/products",
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
        if(error.status === 401){
          setWarn("Please Login Again")
          return
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setSuccess("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      if(err.status === 401)
        setWarn("please Login Again")
      setError("Error deleting product");
    }
  };

  const handleEdit = async (id) => {
    navigate(`/admin/product/${id}`)
  };

  const handleViewChange = (e) => {
    setViewType(e.target.value);
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

      {error && <div className="product-error">{error}</div>}
      {success && <div className="product-success">{success}</div>}
      {warn && <div className="product-warn">{warn}</div>}

      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="category-section">
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
                  className="edit-button"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
