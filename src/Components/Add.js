import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './add.css'; 

const AddProduct = () => {
    const navigate = useNavigate();
    const {email} = useParams();
    const [formData, setFormData] = useState({
      Prod_ID: '',
      Name: '',
      Price: '',
      Featured: false,
      Rating: 0.0,
      Company: '',
    });

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const storedEmail = sessionStorage.getItem('userEmail');
        if (!token || email !== storedEmail){
            navigate('*');
            return;
        }
    }, [email,navigate]);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = sessionStorage.getItem('token'); 
        const response = await axios.post('https://products-api-production-f11a.up.railway.app/addProd', formData, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        alert('Product Added');
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Prod_ID" value={formData.Prod_ID} onChange={handleChange} placeholder="Product ID" required />
        <input type="text" name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" required />
        <input type="number" name="Price" value={formData.Price} onChange={handleChange} placeholder="Price" required />
        <input type="number" name="Rating" value={formData.Rating} onChange={handleChange} placeholder="Rating" />
        <input type="text" name="Company" value={formData.Company} onChange={handleChange} placeholder="Company" required />
        <label>
          Featured:
          <input type="checkbox" name="Featured" checked={formData.Featured} onChange={(e) => setFormData({ ...formData, Featured: e.target.checked })} />
        </label>
        <button type="submit">Add Product</button>
      </form>
      <button onClick={() => navigate(`/products/${email}`)}>Return To Products</button>
    </div>
  );
};

export default AddProduct;
