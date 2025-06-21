import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProductItem({ product, onDelete, showDelete, showEdit, clickable = true, showReturn, onReturn }) {
  // State for delete confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate() 
  
  const handleReturnClick = e =>{
    onReturn();
  }
  
  const handleDeleteClick = e => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const cancelDelete = e => {
    e.stopPropagation();
    setConfirmOpen(false);
  };

  const confirmDelete = e => {
    e.stopPropagation();
    onDelete();
    setConfirmOpen(false);
  };

  const handleContainerClick = () => {
    if (clickable && showEdit) {
      navigate(`/products/${product.id}/edit`);
    }
  };

  return (

    <div 
      className={`border rounded-lg p-4 ${
        clickable 
          ? 'hover:shadow-lg cursor-pointer' 
          : 'cursor-default'  // Explicitly set default cursor
      }`}
      onClick={clickable ? handleContainerClick : undefined}
    >
    <div className="product-item p-4">
      {/* Title */}
      <h4 className="text-xl font-bold mb-1">{product.title}</h4>

      {/* Categories */}
      <p className="text-gray-500 text-sm mb-1">Categories: {product.category}</p>

      {/* Price & Rent */}
      <p className="text-gray-500 text-sm mb-4">
        Price: ${product.price}
        {product.rentalEndDate && (
          <> | Rent until: {new Date(product.rentalEndDate).toLocaleDateString()}</>
        )}
      </p>

      {/* Description */}
      <p className="text-gray-800 mb-4">{product.description}</p>

      {/* Actions */}
      <div className="flex space-x-4 text-sm">
        {showReturn && (
          <button onClick={handleReturnClick} className="text-red-600 hover:underline">
            Return
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-4 text-sm">
        {showDelete && (
          <button onClick={handleDeleteClick} className="text-red-600 hover:underline">
            Delete
          </button>
        )}
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <p className="text-center text-lg mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
                No
              </button>
              <button onClick={confirmDelete} className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default ProductItem;
