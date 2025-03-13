import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './UpdateProduct.css'

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    categoryId: "",
    categoryName: "",
    id: "",
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warn, setWarn] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/admin/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );
        console.log(response);
        setProduct(response.data);
        //   setSuccess("Data Fetched");
      } catch (error) {
        console.log("Error in Fetching data", error);
        setError("Error in Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/categories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );
        console.log(response);
        setCategories(response.data);
        //   setSuccess("Data Fetched");
      } catch (error) {
        console.log("Error in Fetching data", error);
        setError("Error in Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !product.name.trim() ||
      !product.description.trim() ||
      !product.price ||
      !product.categoryName
    ) {
      return setError("Please fill all the required fields");
    }

    try {
      const data = new FormData();
      data.append("name", product.name);
      data.append("description", product.description);
      data.append("price", product.price);
      data.append("category", product.categoryId);
      if (image) {
        data.append("image", image);
      }

      const categoryId = product.categoryId
      const productId = product.id
      console.log(product, localStorage.getItem("TOKEN"));
      const response = await axios.put(
        `http://localhost:8080/api/admin/${categoryId}/product/${productId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );
      setSuccess("Product created successfully!");
      //   setProduct({ name: "", description: "" ,price: "",category:""});
      //   setImage(null)

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        setWarn("Please Login Again!!");
        return;
      }
      setError(err.response.data || "Error creating Product");
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product: <span className="edit-product-heading"> {product.name}</span></h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      {warn && <div className="warn-message">{warn}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* {product.returnedImage && ( */}
          <div className="current-image">
            
            <img
           
              src={`data:image/jpeg;base64,${product.returnedImage}`}
              alt={product.name}
            />
          </div>
        {/* )} */}
        <div className="product-form-group">
          <label>Change Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="product-form-group">
          <label htmlFor="category">Category Name</label>
          <select
            id="categoryId"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a category</option>
            {loading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="product-form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="product-form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            step="0.1"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="product-form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Product</button>
      </form>

      <Link to="/admin/products">Products List</Link>
    </div>
  );
};

export default UpdateProduct;
