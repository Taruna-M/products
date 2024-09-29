import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import ProductList from './Components/Display';
import AddProduct from './Components/Add';
import UpdateProduct from './Components/Update';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
