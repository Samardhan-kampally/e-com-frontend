import React, { useEffect, useState } from "react";
import { useAuth } from "../services/auth-service/AuthContext";
import axios from "axios";
import "./PostProduct.css"
import { Link } from "react-router-dom";

const PostProduct = () => {
    
  const [formData, setFormData] = useState({
    category:'',
    name: "",
    price:'',
    description: "",
  });
  const [image,setImage] = useState(null)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warn, setWarn] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

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
          setCategories(response.data)
          setSuccess("Data Fetched");
        } catch (error) {
            console.log("Error in Fetching data",error)
          setError("Error in Fetching Data");
        }finally{
            setLoading(false)
        }
      };
    
      fetchCategories()    
      
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.category) {
      return setError("Please fill all the required fields");
    }

    try {
        const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (image) {
        data.append("image", image);
      }
      
      console.log(formData, localStorage.getItem("TOKEN"));
      const response = await axios.post(
        `http://localhost:8080/api/admin/product/${formData.category}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );
      setSuccess("Product Updated successfully!");
      setFormData({ name: "", description: "" ,price: "",category:""});
      setImage(null)
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        setWarn("Please Login Again!!");
        return;
      }
      setError(err.response.data || "Error Updating Product");
    }
  };

  
  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      {error && <div className="product-error">{error}</div>}
      {success && <div className="product-success">{success}</div>}
      {warn && <div className="product-warn">{warn}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">

      <div className="product-form-group">
        <label htmlFor="category">Category Name</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="product-form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          step="0.1"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

        <div className="product-form-group">
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="product-form-group">
          <label>Product Image:</label>
          <input 
            type="file" 
            name="image" 
            onChange={(e)=> setImage(e.target.files[0])} 
            accept="image/*" 
          />
        </div>

        <button type="submit">Create Product</button>
      </form>

      <Link to= "/admin/dashboard">Products List</Link>
    </div>
  );
};

export default PostProduct;
