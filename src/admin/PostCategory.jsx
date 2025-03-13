import React, { useState } from 'react'
import { useAuth } from '../services/auth-service/AuthContext';
import axios from 'axios';
import './PostCategory.css'

const PostCategory = () => { const { user } = useAuth();
const [formData, setFormData] = useState({
  name: '',
  description: ''
});
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const [warn, setWarn] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  if (!formData.name) {
    return setError('Category name is required');
  }

  try {
    console.log(formData,localStorage.getItem('TOKEN'))
    const response = await axios.post('http://localhost:8080/api/admin/category', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
    setSuccess('Category created successfully!');
    setFormData({ name: '', description: '' });
  } catch (err) {
    console.log(err)
    if(err.status === 401){
        setWarn('Please Login Again!!')
        return
    }
    setError(err.response.data || 'Error creating category');
  }
};

if (localStorage.getItem("USERROLE") !== 'ADMIN') {
  return <div>You must be an admin to access this page</div>;
}

return (
  <div className="category-form">
    <h2>Add New Category</h2>
    {error && <div className="error">{error}</div>}
    {success && <div className="success">{success}</div>}
    {warn && <div className="warn">{warn}</div>}
    
    <form onSubmit={handleSubmit}>
      <div className="category-form-group">
        <label>Category Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div className="category-form-group">
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      
      <button type="submit">Create Category</button>
    </form>
  </div>
);
}

export default PostCategory