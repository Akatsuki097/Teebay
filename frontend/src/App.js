import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AllProductsPage from './pages/AllProductsPage'
import MyProductsPage from './pages/MyProductsPage'
import ProductFormPage from './pages/ProductFormPage'
import EditProductPage    from './pages/EditProductPage'
import ProductDetailPage from './pages/ProductDetailPage'
import UserActivityPage from './pages/UserActivityPage'


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/my-products" element={<MyProductsPage />} />
        <Route path="/activity" element={<UserActivityPage />} />        

        <Route path="/products/new" element={<ProductFormPage />} />
        <Route 
          path="/products/:id/edit" 
          element={<EditProductPage/>} 
        />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        
        
        </Routes>
      </div>
    </Router>
  );
}
