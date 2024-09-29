import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './display.css';  

const ProductList = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minRating, setMinRating] = useState(0);
    const [showFeatured, setShowFeatured] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const storedEmail = sessionStorage.getItem('userEmail');
        if (!token || email !== storedEmail){
            navigate('*');
            return;
        }
        fetchProducts();  
    }, [email,navigate]);

    
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://products-api-production-f11a.up.railway.app/getProds');
            setProducts(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`https://products-api-production-f11a.up.railway.app/deleteProd/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            fetchProducts(); 
        } catch (err) {
            console.error(err);
        }
    };

    
    const fetchFeaturedProducts = async () => {
        try {
            const response = await axios.get('https://products-api-production-f11a.up.railway.app/getFeaturedProd');
            setProducts(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    
    const fetchProductsByPrice = async (price) => {
        try {
            const response = await axios.get(`https://products-api-production-f11a.up.railway.app/getByPrice/${price}`);
            console.log(response.data)
            setProducts(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    
    const fetchProductsByRating = async (rating) => {
        try {
            const response = await axios.get(`https://products-api-production-f11a.up.railway.app/getByRating/${rating}`);
            console.log(response.data)
            setProducts(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    
    const handleFilter = () => {
        const maxPriceNum = parseFloat(maxPrice);  
    const minRatingNum = parseFloat(minRating); 
    
    if (showFeatured) {
        fetchFeaturedProducts();
    } else if (!isNaN(maxPriceNum) && maxPriceNum > 0) {
        fetchProductsByPrice(maxPriceNum);
    } else if (!isNaN(minRatingNum) && minRatingNum >= 0) {
        fetchProductsByRating(minRatingNum);
    } else {
        fetchProducts();  
    }
    };

    
    const resetFilters = () => {
        setMaxPrice('');
        setMinRating('');
        setShowFeatured(false);
        fetchProducts();
    };

    return (
        <div>
            <h2>Product List</h2>
            <div>
                <label>
                    Featured Only:
                    <input
                        type="checkbox"
                        checked={showFeatured}
                        onChange={(e) => setShowFeatured(e.target.checked)}
                    />
                </label>
                <br />

                <label>
                    Max Price:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Enter max price"
                    />
                </label>
                <br />

                <label>
                    Min Rating:
                    <input
                        type="number"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        placeholder="Enter min rating"
                    />
                </label>
                <br />

                <button onClick={handleFilter}>Apply Filters</button>
                <button onClick={resetFilters}>Reset Filters</button>
            </div>

            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.Name} - ${product.Price} - Rating: {product.Rating} - {product.Featured ? 'Featured' : 'Not Featured'} - Company: {product.Company}
                        <div>
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            <button onClick={() => navigate(`/update/${email}/${product._id}`)}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(`/add/${email}`)}>Add Product</button>
        </div>
    );
};

export default ProductList;
