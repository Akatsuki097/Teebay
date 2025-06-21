import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { MY_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from '../queries/product';
import ProductItem from '../components/ProductItem';

export default function MyProductsPage() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(MY_PRODUCTS_QUERY);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: MY_PRODUCTS_QUERY }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Products</h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            // TODO: implement logout logic
          }}
        >
          Logout
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-6">
  {data.myProducts.length > 0 ? (
    data.myProducts.map(product => (
      <ProductItem 
        key={product.id}
        product={product}
        showDelete={true}
        onDelete={() => deleteProduct({ 
          variables: { productId: product.id } 
        })}
        showEdit={true}  // Enable edit functionality
        clickable={true}
      />
    ))
  ) : (
          <p className="text-gray-500">You haven’t added any products yet.</p>
        )}
      </div>

      {/* Add Product Button */}
      <div className="mt-8 text-center">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded"
          onClick={() => navigate('/products/new')}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
