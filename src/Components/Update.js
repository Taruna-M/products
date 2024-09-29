import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
      Prod_ID: '',
      Name: '',
      Price: '',
      Featured: false,
      Rating: '',
      Company: '',
    });

    useEffect(() => {
      fetchProduct();
    }, []);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://products-chi-blue.vercel.app/products-api-production-f11a.up.railway.app/getProds/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

    
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== '' && !(typeof formData[key] === 'boolean' && !formData[key])) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://products-chi-blue.vercel.app/products-api-production-f11a.up.railway.app/updateProd/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
};
  
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Prod_ID"
        value={formData.Prod_ID}
        onChange={handleChange}
        placeholder="Product ID (leave empty if not changing)"
      />
      <input
        type="text"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        placeholder="Name (leave empty if not changing)"
      />
      <input
        type="number"
        name="Price"
        value={formData.Price}
        onChange={handleChange}
        placeholder="Price (leave empty if not changing)"
      />
      <input
        type="text"
        name="Company"
        value={formData.Company}
        onChange={handleChange}
        placeholder="Company (leave empty if not changing)"
      />
      <input
        type="number"
        name="Rating"
        value={formData.Rating}
        onChange={handleChange}
        placeholder="Rating (leave empty if not changing)"
      />
      <label>
        Featured:
        <div>
          <label>
            <input
              type="checkbox"
              name="Featured"
              checked={formData.Featured}
              onChange={handleChange}
            />
            True
          </label>
          <label>
            <input
              type="checkbox"
              name="Featured"
              checked={!formData.Featured}
              onChange={() => setFormData({ ...formData, Featured: false })}
            />
            False
          </label>
        </div>
      </label>
      <button type="submit">Update Product</button>
    </form>
    <button onClick={() => navigate('/products')}>Return To Products</button>
    </div>
  );
};

export default UpdateProduct;
